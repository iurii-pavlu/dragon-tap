import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User, Abilities } from '@/lib/models'
import { getUserFromRequest } from '@/lib/auth'
import { validateTapRequest, getCoinsPerTap } from '@/lib/game'
import { z } from 'zod'

const TapSchema = z.object({
  taps: z.number().int().min(1).max(50)
})

// Rate limiting (simple in-memory store - use Redis in production)
const tapLimits = new Map<string, { count: number, resetTime: number }>()
const MAX_TAPS_PER_MINUTE = 300

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const userLimit = tapLimits.get(userId)
  
  if (!userLimit || now > userLimit.resetTime) {
    tapLimits.set(userId, { count: 1, resetTime: now + 60000 }) // 1 minute
    return true
  }
  
  if (userLimit.count >= MAX_TAPS_PER_MINUTE) {
    return false
  }
  
  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const userId = getUserFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rate limiting
    if (!checkRateLimit(userId)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { taps } = TapSchema.parse(body)

    const user = await User.findById(userId)
    const abilities = await Abilities.findOne({ userId: user._id })
    
    if (!user || !abilities) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Validate tap request
    if (!validateTapRequest(user.energy, taps)) {
      return NextResponse.json(
        { success: false, error: 'Insufficient energy or invalid taps' },
        { status: 400 }
      )
    }

    // Calculate coins earned
    const coinsPerTap = getCoinsPerTap(abilities.multitap)
    const coinsEarned = coinsPerTap * taps

    // Update user
    user.coins += coinsEarned
    user.energy -= taps
    user.lastEnergyRegen = new Date()

    await user.save()

    return NextResponse.json({
      success: true,
      coinsEarned,
      totalCoins: user.coins,
      energyLeft: user.energy,
      coinsPerTap
    })

  } catch (error) {
    console.error('Tap error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}