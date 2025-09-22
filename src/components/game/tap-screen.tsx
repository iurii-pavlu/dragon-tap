'use client'

import React, { useState, useCallback } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Package, 
  Flame, 
  Droplets,
  Mountain,
  Wind,
  Moon,
  Sun
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingCoin {
  id: number
  coins: number
  isCrit: boolean
  x: number
  y: number
}

const dragonIcons = {
  FIRE: Flame,
  WATER: Droplets,
  EARTH: Mountain,
  AIR: Wind,
  SHADOW: Moon,
  LIGHT: Sun,
}

const dragonGradients = {
  FIRE: 'dragon-gradient-fire',
  WATER: 'dragon-gradient-water',
  EARTH: 'dragon-gradient-earth',
  AIR: 'dragon-gradient-air',
  SHADOW: 'dragon-gradient-shadow',
  LIGHT: 'dragon-gradient-light',
}

export function TapScreen() {
  const { 
    dragonType, 
    dragonLevel, 
    energy, 
    tap, 
    afkBank,
    collectAfk,
    claws,
    scales,
    fire,
    wings,
    spirit
  } = useGameStore()
  
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>()
  const [isAnimating, setIsAnimating] = useState(false)
  const [coinCounter, setCoinCounter] = useState(0)

  const DragonIcon = dragonIcons[dragonType]
  const gradientClass = dragonGradients[dragonType]

  const handleTap = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (energy <= 0 || isAnimating) return

    setIsAnimating(true)
    
    const result = tap()
    if (result.coins > 0) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      const newCoin: FloatingCoin = {
        id: coinCounter,
        coins: result.coins,
        isCrit: result.isCrit,
        x,
        y,
      }
      
      setFloatingCoins(prev => [...(prev || []), newCoin])
      setCoinCounter(prev => prev + 1)
      
      // Remove floating coin after animation
      setTimeout(() => {
        setFloatingCoins(prev => prev?.filter(coin => coin.id !== newCoin.id) || [])
      }, 1000)
    }
    
    setTimeout(() => setIsAnimating(false), 100)
  }, [energy, isAnimating, tap, coinCounter])

  const handleAfkCollect = () => {
    const collected = collectAfk()
    if (collected > 0) {
      // Show collection animation
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
      {/* AFK Earnings Banner */}
      {afkBank > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <Button 
            onClick={handleAfkCollect}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Package className="w-4 h-4 mr-2" />
            Collect AFK Earnings: {afkBank.toLocaleString()} coins
          </Button>
        </motion.div>
      )}

      {/* Dragon Character */}
      <div className="relative">
        <motion.div
          className={cn(
            "relative w-48 h-48 rounded-full flex items-center justify-center cursor-pointer",
            "border-4 border-orange-500/50 shadow-2xl",
            gradientClass,
            "hover:scale-105 transition-transform duration-200",
            isAnimating && (floatingCoins?.some(c => c.isCrit) ? "crit-animation" : "tap-animation")
          )}
          onClick={handleTap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <DragonIcon className="w-24 h-24 text-white drop-shadow-lg" />
          
          {/* Dragon Level Badge */}
          <Badge className="absolute -top-2 -right-2 bg-slate-900 text-white border-orange-500">
            Lv. {dragonLevel}
          </Badge>
        </motion.div>

        {/* Floating Coins */}
        <AnimatePresence>
          {floatingCoins?.map((coin) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 1, scale: 1, x: coin.x, y: coin.y }}
              animate={{ 
                opacity: 0, 
                scale: 1.5, 
                y: coin.y - 100,
                x: coin.x + (Math.random() - 0.5) * 50
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn(
                "absolute pointer-events-none font-bold text-lg z-10",
                coin.isCrit 
                  ? "text-yellow-300 text-2xl" 
                  : "text-green-400"
              )}
              style={{ left: 0, top: 0 }}
            >
              +{coin.coins}
              {coin.isCrit && "✨"}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dragon Stats */}
      <div className="mt-6 w-full max-w-md">
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <h3 className="text-lg font-bold text-center text-white mb-4">
            {dragonType} Dragon
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">⚔️</div>
              <div className="text-xs text-slate-400">Claws</div>
              <div className="text-sm font-bold text-white">{claws}</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">🛡️</div>
              <div className="text-xs text-slate-400">Scales</div>
              <div className="text-sm font-bold text-white">{scales}</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">🔥</div>
              <div className="text-xs text-slate-400">Fire</div>
              <div className="text-sm font-bold text-white">{fire}</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">🦋</div>
              <div className="text-xs text-slate-400">Wings</div>
              <div className="text-sm font-bold text-white">{wings}</div>
            </div>
          </div>
          
          <div className="text-center mt-3 pt-3 border-t border-slate-700">
            <div className="text-2xl font-bold text-yellow-400">✨</div>
            <div className="text-xs text-slate-400">Spirit</div>
            <div className="text-sm font-bold text-white">{spirit}</div>
          </div>
        </Card>
      </div>

      {/* Shop Button */}
      <div className="mt-6 flex gap-3">
        <Button 
          variant="outline" 
          className="border-orange-500/50 hover:bg-orange-500/10"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Shop
        </Button>
        
        <Button 
          variant="outline" 
          className="border-purple-500/50 hover:bg-purple-500/10"
        >
          <Package className="w-4 h-4 mr-2" />
          Lootbox
        </Button>
      </div>

      {/* Tap Instruction */}
      {energy <= 0 && (
        <div className="mt-4 text-center">
          <p className="text-red-400 font-medium">No Energy!</p>
          <p className="text-sm text-slate-400">Wait for energy to regenerate</p>
        </div>
      )}
    </div>
  )
}