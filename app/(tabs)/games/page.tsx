"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"

const games = [
  {
    id: 'lucky-wheel',
    title: 'Lucky Wheel',
    description: 'Spin the wheel for dragon treasures',
    icon: '🎡',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'heads-tails', 
    title: 'Heads or Tails',
    description: 'Double or nothing coin gambling',
    icon: '🪙',
    gradient: 'from-coin to-amber-500'
  },
  {
    id: 'raffle',
    title: 'Raffle', 
    description: 'Ticket-based prize draws',
    icon: '🎫',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ton-hunter',
    title: 'TON Hunter',
    description: 'Hunt for TON rewards',
    icon: '💎',
    gradient: 'from-indigo-500 to-purple-500'
  }
]

export default function GamesPage() {
  const { t } = useTranslations()

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Games Grid */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-4">
          {games.map(game => (
            <Card key={game.id} className="card-shadow overflow-hidden">
              <div className={`h-24 bg-gradient-to-r ${game.gradient} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl mb-1">{game.icon}</div>
                </div>
                <div className="absolute top-4 right-4">
                  <Button variant="secondary" size="sm">
                    {t('games.play')}
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-text-primary mb-2">
                  {t(`games.${game.id.replace('-', '')}`) || game.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {game.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-text-muted">
                    Coming Soon
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    {t('games.play')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Message */}
        <Card className="card-shadow mt-6">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="font-semibold text-text-primary mb-2">
              More Games Coming Soon!
            </h3>
            <p className="text-sm text-text-secondary">
              We're working on exciting new games for you to enjoy. Stay tuned!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}