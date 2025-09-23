"use client"

import * as React from "react"
import { DragonTap } from "@/components/dragon/dragon-tap"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "@/hooks/use-translations"
import { formatNumber } from "@/lib/utils"
import Image from "next/image"

export default function TapPage() {
  const { t } = useTranslations()
  
  // Mock data - replace with real state management
  const [userState, setUserState] = React.useState({
    name: "Dragon Hunter",
    level: 1,
    coins: 1000,
    energy: 500,
    maxEnergy: 500,
    coinsPerTap: 1
  })

  const [tapEffects, setTapEffects] = React.useState<Array<{id: number, coins: number}>>([])
  const [isAnimating, setIsAnimating] = React.useState(false)

  const handleTap = React.useCallback(() => {
    if (userState.energy <= 0) return

    const coinsEarned = userState.coinsPerTap
    
    setUserState(prev => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      energy: Math.max(0, prev.energy - 1)
    }))

    // Add floating coin effect
    const effect = { id: Date.now(), coins: coinsEarned }
    setTapEffects(prev => [...prev, effect])
    setTimeout(() => {
      setTapEffects(prev => prev.filter(e => e.id !== effect.id))
    }, 1000)

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
  }, [userState.energy, userState.coinsPerTap])

  const energyPercentage = (userState.energy / userState.maxEnergy) * 100

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Top Status Slab */}
      <div className="px-4 py-4">
        <Card className="status-slab">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-coin to-amber-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-background">
                    {userState.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{userState.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="level" className="text-xs">
                      {t('common.level')} {userState.level}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="coin" size="sm">
                {t('tap.getLucky')}
              </Button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Image src="/assets/coin.svg" alt="Coins" width={20} height={20} />
                <span className="text-lg font-bold text-coin">{formatNumber(userState.coins)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/assets/energy.svg" alt="Energy" width={16} height={16} />
                <span className="text-sm font-medium text-energy">
                  {userState.energy}/{userState.maxEnergy}
                </span>
              </div>
            </div>

            <Progress value={energyPercentage} variant="energy" className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Dragon Tap Area */}
      <div className="flex-1 flex items-center justify-center relative px-4">
        <DragonTap 
          onTap={handleTap}
          isAnimating={isAnimating}
          className="relative"
        />
        
        {/* Floating coin effects */}
        {tapEffects.map(effect => (
          <div
            key={effect.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              animation: 'coin-float 0.8s ease-out forwards'
            }}
          >
            <div className="flex items-center gap-1 text-coin font-bold text-lg">
              <Image src="/assets/coin.svg" alt="Coin" width={16} height={16} />
              +{effect.coins}
            </div>
          </div>
        ))}

        {/* Energy depleted message */}
        {userState.energy === 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Badge variant="destructive">
              {t('tap.energyFull')}
            </Badge>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-3">
            <span className="text-xs font-semibold">{t('tap.inventory')}</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-3">
            <span className="text-xs font-semibold">{t('tap.boosters')}</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-3">
            <span className="text-xs font-semibold">{t('tap.dailyRewards')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}