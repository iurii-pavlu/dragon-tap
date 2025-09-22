'use client'

import React, { useState, useEffect } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { ResourceHeader } from '@/components/game/resource-header'
import { TapScreen } from '@/components/game/tap-screen'
import { BottomNavigation } from '@/components/ui/bottom-navigation'
import { BattlePassPreview } from '@/components/game/battle-pass-preview'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  CheckSquare, 
  Trophy, 
  Gamepad2,
  UserPlus,
  Gift,
  Target,
  Calendar,
  Crown,
  Coins
} from 'lucide-react'

// Placeholder components for other tabs
function FriendsTab() {
  return (
    <div className="p-4 space-y-4">
      <Card className="p-6 text-center bg-slate-800/50 border-slate-700">
        <UserPlus className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Invite Friends</h2>
        <p className="text-slate-400 mb-4">
          Invite friends and earn coins together! 
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-lg border border-green-500/30">
            <Coins className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-sm text-green-400 font-medium">You & Friend</div>
            <div className="text-lg font-bold text-white">+5,000</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg border border-purple-500/30">
            <Crown className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-sm text-purple-400 font-medium">Friend Premium</div>
            <div className="text-lg font-bold text-white">+25,000</div>
          </div>
        </div>
        <Button className="w-full dragon-gradient-fire text-white">
          Copy Invite Link
        </Button>
      </Card>
      
      {/* Battle Pass Preview */}
      <BattlePassPreview />
    </div>
  )
}

function TasksTab() {
  const mockTasks = [
    { id: 1, title: 'Daily Check-in', reward: 500, progress: 1, max: 1, completed: true },
    { id: 2, title: 'Tap 100 times', reward: 1000, progress: 75, max: 100, completed: false },
    { id: 3, title: 'Subscribe to BRINGOLD', reward: 50000, progress: 0, max: 1, completed: false },
    { id: 4, title: 'Watch 3 Ads', reward: 2000, progress: 2, max: 3, completed: false },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Daily Tasks</h2>
        <Card className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-400" />
              <div>
                <div className="font-bold text-white">Daily Rewards</div>
                <div className="text-sm text-orange-300">Day 2 • Streak: 2 days</div>
              </div>
            </div>
            <Button className="dragon-gradient-fire text-white">
              Claim 1,000
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Tasks</h3>
        {mockTasks.map((task) => (
          <Card key={task.id} className="p-4 bg-slate-800/50 border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium text-white">{task.title}</div>
                <div className="text-sm text-yellow-400">
                  <Coins className="w-4 h-4 inline mr-1" />
                  +{task.reward.toLocaleString()}
                </div>
              </div>
              <Button 
                size="sm" 
                disabled={task.completed}
                className={task.completed ? "bg-green-600" : "dragon-gradient-fire text-white"}
              >
                {task.completed ? "✓ Done" : "Get"}
              </Button>
            </div>
            {!task.completed && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white">{task.progress}/{task.max}</span>
                </div>
                <Progress value={(task.progress / task.max) * 100} className="h-2" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function RatingTab() {
  const mockLeaderboard = [
    { rank: 1, name: "DragonMaster", score: 978, isUser: false },
    { rank: 2, name: "FireBreather", score: 845, isUser: false },
    { rank: 3, name: "You", score: 163, isUser: true },
    { rank: 4, name: "ScaleLord", score: 156, isUser: false },
    { rank: 5, name: "WingCommander", score: 144, isUser: false },
  ]

  return (
    <div className="p-4 space-y-4">
      <Card className="p-6 text-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-white mb-1">Leaderboard</h2>
        <p className="text-sm text-yellow-300">Weekly Contest • Season 1</p>
      </Card>

      <div className="space-y-2">
        {mockLeaderboard.map((player) => (
          <Card key={player.rank} className={`p-4 ${player.isUser ? 'bg-orange-500/20 border-orange-500' : 'bg-slate-800/50 border-slate-700'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge 
                  variant={player.rank <= 3 ? "default" : "secondary"}
                  className={
                    player.rank === 1 ? "bg-yellow-500 text-black" :
                    player.rank === 2 ? "bg-gray-400 text-black" :
                    player.rank === 3 ? "bg-orange-600 text-white" :
                    "bg-slate-600"
                  }
                >
                  #{player.rank}
                </Badge>
                <span className={`font-medium ${player.isUser ? 'text-orange-300' : 'text-white'}`}>
                  {player.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-white">{player.score}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function GamesTab() {
  const games = [
    { id: 'wheel', name: 'Lucky Wheel', icon: '🎰', description: 'Spin for dragon treasures!' },
    { id: 'coin', name: 'Heads or Tails', icon: '🪙', description: 'Double or nothing!' },
    { id: 'raffle', name: 'Raffle', icon: '🎫', description: 'Win big prizes!' },
    { id: 'hunter', name: 'Voucher Hunter', icon: '🎯', description: 'Hunt for partner rewards!' },
  ]

  return (
    <div className="p-4 space-y-4">
      <Card className="p-6 text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
        <Gamepad2 className="w-12 h-12 text-purple-400 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-white mb-1">Mini Games</h2>
        <p className="text-sm text-purple-300">Test your luck and skills!</p>
      </Card>

      <div className="grid grid-cols-1 gap-3">
        {games.map((game) => (
          <Card key={game.id} className="p-4 bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{game.icon}</div>
                <div>
                  <div className="font-medium text-white">{game.name}</div>
                  <div className="text-sm text-slate-400">{game.description}</div>
                </div>
              </div>
              <Button className="dragon-gradient-fire text-white">
                Play
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('tap')
  const { setUser } = useGameStore()

  // Initialize user on load
  useEffect(() => {
    // Simulate user login - replace with actual Zalo auth
    const mockUser = {
      id: '1',
      username: 'dragontapper',
      displayName: 'Dragon Tapper',
      avatar: null,
      coins: 163237,
      gems: 16,
      tickets: 1615,
      energy: 100,
      maxEnergy: 100,
    }
    setUser(mockUser)
  }, [setUser])

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'friends':
        return <FriendsTab />
      case 'tasks':
        return <TasksTab />
      case 'tap':
        return <TapScreen />
      case 'rating':
        return <RatingTab />
      case 'games':
        return <GamesTab />
      default:
        return <TapScreen />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <ResourceHeader />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderActiveTab()}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}