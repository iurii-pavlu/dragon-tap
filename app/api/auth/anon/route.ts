import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User, Abilities } from '@/lib/models'
import { signJWT } from '@/lib/auth'
import { z } from 'zod'

const CreateUserSchema = z.object({
  name: z.string().min(1).max(50),
  avatarUrl: z.string().url().optional(),
  tgId: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, avatarUrl, tgId } = CreateUserSchema.parse(body)

    // Check if user already exists by tgId (if provided)
    let existingUser = null
    if (tgId) {
      existingUser = await User.findOne({ tgId })
      if (existingUser) {
        const token = signJWT({ userId: existingUser._id.toString() })
        const response = NextResponse.json({
          success: true,
          user: {
            _id: existingUser._id,
            name: existingUser.name,
            avatarUrl: existingUser.avatarUrl,
            level: existingUser.level,
            coins: existingUser.coins,
            energy: existingUser.energy,
            maxEnergy: existingUser.maxEnergy
          }
        })
        
        response.cookies.set('auth-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 // 30 days
        })
        
        return response
      }
    }

    // Create new user
    const user = new User({
      name,
      avatarUrl,
      tgId,
      level: 1,
      coins: 1000, // Starting coins
      energy: 500,
      maxEnergy: 500,
      lastEnergyRegen: new Date()
    })

    await user.save()

    // Create default abilities
    const abilities = new Abilities({
      userId: user._id,
      multitap: 1,
      energyCap: 1,
      rechargeSpeed: 1,
      turbo: 0
    })

    await abilities.save()

    const token = signJWT({ userId: user._id.toString() })

    const response = NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        level: user.level,
        coins: user.coins,
        energy: user.energy,
        maxEnergy: user.maxEnergy
      }
    })
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })
    
    return response

  } catch (error) {
    console.error('Auth error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}