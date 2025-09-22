'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  CheckSquare, 
  Zap, 
  Trophy, 
  Gamepad2 
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'tap', label: 'Tap!', icon: Zap, isMain: true },
  { id: 'rating', label: 'Rating', icon: Trophy },
  { id: 'games', label: 'Games', icon: Gamepad2 },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 mobile-safe-area">
      <div className="flex justify-around items-center py-2 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center justify-center h-16 w-16 rounded-xl transition-all",
                isActive 
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                tab.isMain && "dragon-gradient-fire text-white shadow-lg scale-110"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={cn("w-6 h-6 mb-1", tab.isMain && "w-7 h-7")} />
              <span className={cn("text-xs font-medium", tab.isMain && "text-sm font-bold")}>
                {tab.label}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}