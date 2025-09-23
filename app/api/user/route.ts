import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User, Abilities } from '@/lib/models'
import { getUserFromRequest } from '@/lib/auth'
import { calculateEnergyRegen, getMaxEnergy } from '@/lib/game'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const userId = getUserFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const abilities = await Abilities.findOne({ userId: user._id })
    if (!abilities) {
      return NextResponse.json(
        { success: false, error: 'User abilities not found' },
        { status: 404 }
      )
    }

    // Calculate current energy with regeneration
    const energyRegen = calculateEnergyRegen(user.lastEnergyRegen, abilities.rechargeSpeed)
    const maxEnergy = getMaxEnergy(abilities.energyCap)
    const currentEnergy = Math.min(user.energy + energyRegen, maxEnergy)

    // Update user if energy has regenerated
    if (energyRegen > 0) {
      user.energy = currentEnergy
      user.maxEnergy = maxEnergy
      user.lastEnergyRegen = new Date()
      await user.save()
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        level: user.level,
        coins: user.coins,
        energy: currentEnergy,
        maxEnergy: maxEnergy,
        lastEnergyRegen: user.lastEnergyRegen
      },
      abilities: {
        multitap: abilities.multitap,
        energyCap: abilities.energyCap,
        rechargeSpeed: abilities.rechargeSpeed,
        turbo: abilities.turbo
      }
    })

  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}