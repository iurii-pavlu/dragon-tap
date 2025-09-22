'use client'

import React, { useState } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BattlePass } from './battle-pass'
import { 
  Crown,
  Star,
  Calendar,
  ArrowRight
} from 'lucide-react'

export function BattlePassPreview() {
  const { battlePassLevel, battlePassSeason, hasAdvancedPass, hasLuxuryPass } = useGameStore()

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 cursor-pointer hover:bg-purple-900/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  {(hasAdvancedPass || hasLuxuryPass) && (
                    <Star className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-white">Battle Pass</div>
                  <div className="text-sm text-purple-300">
                    Season {battlePassSeason} • Level {battlePassLevel}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-400">12d 15h</span>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            
            {/* Pass Status */}
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary" className="bg-slate-700">
                Free
              </Badge>
              {hasAdvancedPass && (
                <Badge className="bg-purple-600">Advanced</Badge>
              )}
              {hasLuxuryPass && (
                <Badge className="bg-yellow-600">Luxury</Badge>
              )}
            </div>
          </Card>
        </DialogTrigger>
        
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Battle Pass - Season {battlePassSeason}
            </DialogTitle>
          </DialogHeader>
          <BattlePass />
        </DialogContent>
      </Dialog>
    </>
  )
}