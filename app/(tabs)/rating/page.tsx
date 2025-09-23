"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/hooks/use-translations"
import { formatNumber } from "@/lib/utils"
import Image from "next/image"

const mockLeaderboard = [
  { rank: 1, name: "DragonMaster", coins: 15000000, avatar: "🐲" },
  { rank: 2, name: "CoinHunter", coins: 12500000, avatar: "👑" },
  { rank: 3, name: "TapKing", coins: 10000000, avatar: "⚡" },
  { rank: 4, name: "GoldDigger", coins: 8750000, avatar: "💰" },
  { rank: 5, name: "EnergyMaster", coins: 7500000, avatar: "🔋" },
  { rank: 6, name: "SwiftTapper", coins: 6250000, avatar: "👆" },
  { rank: 7, name: "DragonSlayer", coins: 5000000, avatar: "⚔️" },
  { rank: 8, name: "CoinCollector", coins: 4250000, avatar: "🪙" },
  { rank: 9, name: "TapMaster", coins: 3500000, avatar: "🎯" },
  { rank: 10, name: "FireDragon", coins: 2750000, avatar: "🔥" }
]

export default function RatingPage() {
  const { t } = useTranslations()
  const currentUser = { rank: 156, name: "You", coins: 1000 }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500"
    if (rank === 2) return "text-gray-400" 
    if (rank === 3) return "text-amber-600"
    return "text-text-secondary"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "👑"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Your Rank Card */}
      <div className="px-4 py-4">
        <Card className="status-slab border-coin/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-coin to-amber-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-background">Y</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t('rating.myRank')}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="coin" className="text-xs">
                      #{currentUser.rank}
                    </Badge>
                    <span className="text-sm text-text-secondary">
                      <Image src="/assets/coin.svg" alt="Coins" width={14} height={14} className="inline mr-1" />
                      {formatNumber(currentUser.coins)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <div className="flex-1 px-4 pb-6">
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-text-primary">
              {t('rating.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {mockLeaderboard.map((user, index) => (
                <div 
                  key={user.rank}
                  className={`flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0 ${
                    index < 3 ? 'bg-surface/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 text-center font-bold ${getRankColor(user.rank)}`}>
                      {getRankIcon(user.rank)}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
                      <span className="text-sm">{user.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-coin font-bold text-sm">
                    <Image src="/assets/coin.svg" alt="Coins" width={16} height={16} />
                    {formatNumber(user.coins)}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="p-4 pt-2">
              <button className="w-full py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                Load more players...
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}