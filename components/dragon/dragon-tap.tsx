"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DragonTapProps {
  onTap: () => void
  isAnimating?: boolean
  className?: string
}

export function DragonTap({ onTap, isAnimating, className }: DragonTapProps) {
  const [tapAnimating, setTapAnimating] = React.useState(false)

  const handleTap = () => {
    onTap()
    setTapAnimating(true)
    setTimeout(() => setTapAnimating(false), 200)
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <button
        onClick={handleTap}
        className={cn(
          "relative transition-transform duration-200 ease-out select-none",
          "tap-feedback",
          tapAnimating && "tap-animation",
          isAnimating && "crit-animation"
        )}
        style={{ touchAction: 'manipulation' }}
      >
        <Image
          src="/assets/dragon/placeholder.svg"
          alt="Dragon"
          width={200}
          height={200}
          className="w-48 h-48 md:w-56 md:h-56"
          priority
        />
        
        {/* Tap effect overlay */}
        <div className="absolute inset-0 rounded-full bg-coin opacity-0 pointer-events-none animate-ping" 
             style={{ 
               animation: tapAnimating ? 'ping 0.2s ease-out' : 'none',
               opacity: tapAnimating ? 0.3 : 0
             }}
        />
      </button>
    </div>
  )
}