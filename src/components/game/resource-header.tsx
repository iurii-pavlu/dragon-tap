'use client'

import React from 'react'
import { useGameStore } from '@/stores/gameStore'
import { useLocaleStore } from '@/stores/localeStore'
import { t } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Coins, 
  Gem, 
  Ticket, 
  Zap, 
  Crown,
  Plus 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ResourceHeader() {
  const { 
    coins, 
    gems, 
    tickets, 
    energy, 
    maxEnergy, 
    isVip,
    vipExpiresAt,
    updateEnergyRegen 
  } = useGameStore()
  
  const { locale } = useLocaleStore()

  // Update energy on component mount and periodically
  React.useEffect(() => {
    updateEnergyRegen()
    const interval = setInterval(updateEnergyRegen, 60000) // Every minute
    return () => clearInterval(interval)
  }, [updateEnergyRegen])

  const energyPercentage = (energy / maxEnergy) * 100

  return (
    <div className="p-4 space-y-3">
      {/* Language Switcher */}
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>
      
      {/* Main Resources Row */}
      <div className="flex justify-between items-center gap-2">
        {/* Coins */}
        <Card className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 flex-1">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-white text-sm">
            {coins.toLocaleString()}
          </span>
        </Card>

        {/* Gems */}
        <Card className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <Gem className="w-5 h-5 text-purple-400" />
          <span className="font-bold text-white text-sm">
            {gems.toLocaleString()}
          </span>
        </Card>

        {/* Tickets */}
        <Card className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <Ticket className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-white text-sm">
            {tickets}
          </span>
        </Card>

        {/* VIP Status */}
        {isVip && (
          <Card className="flex items-center gap-1 px-2 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400">VIP</span>
          </Card>
        )}
      </div>

      {/* Energy Bar */}
      <Card className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-white">Energy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              {energy}/{maxEnergy}
            </span>
            <Button size="sm" variant="outline" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <Progress 
          value={energyPercentage} 
          className={cn(
            "h-2 bg-slate-700",
            energyPercentage > 80 ? "[&>div]:bg-green-500" :
            energyPercentage > 40 ? "[&>div]:bg-yellow-500" : 
            "[&>div]:bg-red-500"
          )}
        />
        <div className="text-xs text-slate-400 mt-1 text-center">
          {energy < maxEnergy ? "Regenerating 1 per minute" : "Energy Full!"}
        </div>
      </Card>
    </div>
  )
}