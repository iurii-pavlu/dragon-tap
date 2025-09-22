'use client'

import React from 'react'
import { useGameStore } from '@/stores/gameStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Crown,
  Star,
  Gift,
  Lock,
  CheckCircle,
  Coins,
  Gem,
  Ticket,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface BattlePassTier {
  level: number
  expRequired: number
  freeReward: {
    type: 'coins' | 'gems' | 'tickets' | 'energy' | 'cosmetic'
    amount: number
    name?: string
  } | null
  advancedReward: {
    type: 'coins' | 'gems' | 'tickets' | 'energy' | 'cosmetic' | 'vip'
    amount: number
    name?: string
  } | null
  luxuryReward: {
    type: 'coins' | 'gems' | 'tickets' | 'energy' | 'cosmetic' | 'vip'
    amount: number
    name?: string
  } | null
}

const battlePassTiers: BattlePassTier[] = [
  {
    level: 1,
    expRequired: 100,
    freeReward: { type: 'coins', amount: 1000 },
    advancedReward: { type: 'coins', amount: 2500 },
    luxuryReward: { type: 'coins', amount: 5000 }
  },
  {
    level: 2,
    expRequired: 250,
    freeReward: null,
    advancedReward: { type: 'gems', amount: 10 },
    luxuryReward: { type: 'gems', amount: 30 }
  },
  {
    level: 3,
    expRequired: 500,
    freeReward: { type: 'coins', amount: 2500 },
    advancedReward: { type: 'coins', amount: 5000 },
    luxuryReward: { type: 'coins', amount: 10000 }
  },
  {
    level: 4,
    expRequired: 800,
    freeReward: null,
    advancedReward: { type: 'tickets', amount: 5 },
    luxuryReward: { type: 'tickets', amount: 10 }
  },
  {
    level: 5,
    expRequired: 1200,
    freeReward: { type: 'gems', amount: 50 },
    advancedReward: { type: 'gems', amount: 200 },
    luxuryReward: { type: 'gems', amount: 600 }
  },
  {
    level: 6,
    expRequired: 1600,
    freeReward: null,
    advancedReward: { type: 'cosmetic', amount: 1, name: 'Fire Dragon Skin' },
    luxuryReward: { type: 'cosmetic', amount: 1, name: 'Legendary Fire Aura' }
  },
  {
    level: 7,
    expRequired: 2000,
    freeReward: { type: 'coins', amount: 100000 },
    advancedReward: { type: 'coins', amount: 500000 },
    luxuryReward: { type: 'coins', amount: 1000000 }
  },
  {
    level: 8,
    expRequired: 2500,
    freeReward: null,
    advancedReward: { type: 'vip', amount: 7, name: '1 Week VIP' },
    luxuryReward: { type: 'vip', amount: 14, name: '2 Week VIP' }
  },
  {
    level: 9,
    expRequired: 3000,
    freeReward: { type: 'gems', amount: 1000 },
    advancedReward: { type: 'gems', amount: 5000 },
    luxuryReward: { type: 'gems', amount: 10000 }
  },
  {
    level: 10,
    expRequired: 5000,
    freeReward: { type: 'coins', amount: 5000000 },
    advancedReward: { type: 'cosmetic', amount: 1, name: 'Master Dragon Title' },
    luxuryReward: { type: 'cosmetic', amount: 1, name: 'Mythical Dragon Avatar' }
  }
]

function RewardIcon({ type }: { type: string }) {
  switch (type) {
    case 'coins':
      return <Coins className="w-4 h-4 text-yellow-400" />
    case 'gems':
      return <Gem className="w-4 h-4 text-purple-400" />
    case 'tickets':
      return <Ticket className="w-4 h-4 text-blue-400" />
    case 'energy':
      return <Zap className="w-4 h-4 text-green-400" />
    case 'cosmetic':
      return <Crown className="w-4 h-4 text-orange-400" />
    case 'vip':
      return <Star className="w-4 h-4 text-amber-400" />
    default:
      return <Gift className="w-4 h-4 text-slate-400" />
  }
}

function RewardCard({ 
  reward, 
  tier, 
  isUnlocked, 
  isClaimed,
  onClaim 
}: { 
  reward: BattlePassTier['freeReward'] | BattlePassTier['advancedReward'] | BattlePassTier['luxuryReward']
  tier: 'free' | 'advanced' | 'luxury'
  isUnlocked: boolean
  isClaimed: boolean
  onClaim?: () => void
}) {
  if (!reward) {
    return (
      <div className="p-2 rounded border-2 border-dashed border-slate-600 bg-slate-800/30 min-h-[60px] flex items-center justify-center">
        <span className="text-xs text-slate-500">No reward</span>
      </div>
    )
  }

  const tierColors = {
    free: 'border-slate-500 bg-slate-800/50',
    advanced: 'border-purple-500 bg-purple-900/20',
    luxury: 'border-yellow-500 bg-yellow-900/20'
  }

  const tierTextColors = {
    free: 'text-slate-300',
    advanced: 'text-purple-300',
    luxury: 'text-yellow-300'
  }

  return (
    <div className={cn(
      "p-2 rounded border-2 min-h-[60px] flex flex-col items-center justify-center relative",
      tierColors[tier]
    )}>
      {isClaimed && (
        <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-slate-900 rounded-full" />
      )}
      {!isUnlocked && (
        <Lock className="absolute -top-1 -right-1 w-4 h-4 text-slate-500 bg-slate-900 rounded-full" />
      )}
      
      <RewardIcon type={reward.type} />
      <span className={cn("text-xs font-medium text-center mt-1", tierTextColors[tier])}>
        {reward.name || `${reward.amount.toLocaleString()}`}
      </span>
      
      {isUnlocked && !isClaimed && onClaim && (
        <Button 
          size="sm" 
          onClick={onClaim}
          className="mt-1 h-6 text-xs dragon-gradient-fire text-white"
        >
          Claim
        </Button>
      )}
    </div>
  )
}

export function BattlePass() {
  const { 
    battlePassLevel, 
    battlePassExp, 
    battlePassSeason,
    hasAdvancedPass, 
    hasLuxuryPass,
    updateCoins,
    updateGems,
    updateTickets
  } = useGameStore()

  const currentTier = battlePassTiers.find(t => t.level === battlePassLevel) || battlePassTiers[0]
  const nextTier = battlePassTiers.find(t => t.level === battlePassLevel + 1)
  const progressPercentage = nextTier ? (battlePassExp / nextTier.expRequired) * 100 : 100

  const handleClaimReward = (reward: any, tier: string) => {
    switch (reward.type) {
      case 'coins':
        updateCoins(reward.amount)
        break
      case 'gems':
        updateGems(reward.amount)
        break
      case 'tickets':
        updateTickets(reward.amount)
        break
      // Add other reward types as needed
    }
    // Here you would also update the claimed status in the database
  }

  const handlePurchasePass = (type: 'advanced' | 'luxury') => {
    // Here you would integrate with ZaloPay
    const prices = { advanced: 39000, luxury: 59000 } // VND
    console.log(`Purchase ${type} pass for ${prices[type]} VND`)
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Battle Pass</h2>
            <p className="text-purple-300">Season {battlePassSeason} • 12d 15h remaining</p>
          </div>
          <Badge className="bg-yellow-500 text-black">
            Level {battlePassLevel}
          </Badge>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-white mb-2">
            <span>Progress</span>
            <span>{battlePassExp}/{nextTier?.expRequired || 'MAX'}</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-blue-500"
          />
        </div>

        <p className="text-sm text-slate-300">
          Complete tasks and tap to earn Battle Pass XP!
        </p>
      </Card>

      {/* Pass Types */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 bg-slate-800/50 border-slate-600">
          <div className="text-center">
            <div className="text-sm font-medium text-slate-300 mb-1">Free</div>
            <div className="text-xs text-slate-500">Always available</div>
            <Badge variant="secondary" className="mt-2 w-full bg-slate-700">
              Active
            </Badge>
          </div>
        </Card>
        
        <Card className={cn(
          "p-3 border-2",
          hasAdvancedPass 
            ? "bg-purple-900/20 border-purple-500" 
            : "bg-slate-800/50 border-slate-600"
        )}>
          <div className="text-center">
            <div className="text-sm font-medium text-purple-300 mb-1">Advanced</div>
            <div className="text-xs text-purple-400">39,000 VND</div>
            {hasAdvancedPass ? (
              <Badge className="mt-2 w-full bg-purple-600">Active</Badge>
            ) : (
              <Button 
                size="sm" 
                onClick={() => handlePurchasePass('advanced')}
                className="mt-2 w-full h-6 text-xs bg-purple-600 hover:bg-purple-700"
              >
                Buy
              </Button>
            )}
          </div>
        </Card>
        
        <Card className={cn(
          "p-3 border-2",
          hasLuxuryPass 
            ? "bg-yellow-900/20 border-yellow-500" 
            : "bg-slate-800/50 border-slate-600"
        )}>
          <div className="text-center">
            <div className="text-sm font-medium text-yellow-300 mb-1">Luxury</div>
            <div className="text-xs text-yellow-400">59,000 VND</div>
            {hasLuxuryPass ? (
              <Badge className="mt-2 w-full bg-yellow-600">Active</Badge>
            ) : (
              <Button 
                size="sm" 
                onClick={() => handlePurchasePass('luxury')}
                className="mt-2 w-full h-6 text-xs bg-yellow-600 hover:bg-yellow-700"
              >
                Buy
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Battle Pass Tiers */}
      <div className="space-y-3">
        {battlePassTiers.map((tier) => {
          const isUnlocked = battlePassLevel >= tier.level
          const isClaimed = false // This should come from user data
          
          return (
            <Card key={tier.level} className="p-4 bg-slate-800/50 border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={isUnlocked ? "default" : "secondary"}>
                    {tier.level}
                  </Badge>
                  <span className="text-sm text-white">
                    {tier.expRequired.toLocaleString()} XP
                  </span>
                </div>
                {isUnlocked && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {/* Free Reward */}
                <RewardCard
                  reward={tier.freeReward}
                  tier="free"
                  isUnlocked={isUnlocked}
                  isClaimed={isClaimed}
                  onClaim={() => tier.freeReward && handleClaimReward(tier.freeReward, 'free')}
                />
                
                {/* Advanced Reward */}
                <RewardCard
                  reward={tier.advancedReward}
                  tier="advanced"
                  isUnlocked={isUnlocked && hasAdvancedPass}
                  isClaimed={isClaimed}
                  onClaim={() => tier.advancedReward && handleClaimReward(tier.advancedReward, 'advanced')}
                />
                
                {/* Luxury Reward */}
                <RewardCard
                  reward={tier.luxuryReward}
                  tier="luxury"
                  isUnlocked={isUnlocked && hasLuxuryPass}
                  isClaimed={isClaimed}
                  onClaim={() => tier.luxuryReward && handleClaimReward(tier.luxuryReward, 'luxury')}
                />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}