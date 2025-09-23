"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/hooks/use-translations"
import { formatNumber } from "@/lib/utils"
import Image from "next/image"

const mockTasks = [
  {
    id: 1,
    title: "Follow us on Twitter",
    description: "Follow @ShrimpHunters on Twitter",
    reward: 5000,
    partner: "Twitter",
    completed: false
  },
  {
    id: 2,
    title: "Join Telegram Channel",
    description: "Join our official Telegram channel",
    reward: 3000,
    partner: "Telegram", 
    completed: false
  },
  {
    id: 3,
    title: "Watch Dragon Tutorial",
    description: "Complete the dragon training tutorial",
    reward: 2500,
    partner: null,
    completed: true
  }
]

export default function TasksPage() {
  const { t } = useTranslations()
  const [activeTab, setActiveTab] = React.useState<'our' | 'partners'>('our')

  const ourTasks = mockTasks.filter(task => !task.partner)
  const partnerTasks = mockTasks.filter(task => task.partner)
  const currentTasks = activeTab === 'our' ? ourTasks : partnerTasks

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Tab Navigation */}
      <div className="px-4 py-4">
        <div className="flex rounded-lg bg-surface border border-border p-1">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('our')}
            className={`flex-1 py-2 text-sm font-semibold tracking-tight ${
              activeTab === 'our' 
                ? 'bg-coin text-background' 
                : 'text-text-secondary'
            }`}
          >
            {t('tasks.ourTasks')}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('partners')}
            className={`flex-1 py-2 text-sm font-semibold tracking-tight ${
              activeTab === 'partners' 
                ? 'bg-coin text-background' 
                : 'text-text-secondary'
            }`}
          >
            {t('tasks.partners')}
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 px-4 pb-6">
        <div className="space-y-3">
          {currentTasks.map(task => (
            <Card key={task.id} className="card-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-coin to-amber-500 flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary text-sm mb-1 truncate">
                        {task.title}
                      </h3>
                      <p className="text-xs text-text-secondary mb-2">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="reward" className="text-xs">
                          <Image src="/assets/coin.svg" alt="Coin" width={12} height={12} className="mr-1" />
                          {formatNumber(task.reward)}
                        </Badge>
                        {task.partner && (
                          <Badge variant="outline" className="text-xs">
                            {task.partner}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-3">
                    {task.completed ? (
                      <Badge variant="secondary" className="text-xs">
                        {t('tasks.completed')}
                      </Badge>
                    ) : (
                      <Button variant="coin" size="sm">
                        GET
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentTasks.length === 0 && (
          <Card className="card-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-text-primary mb-2">
                No tasks available
              </h3>
              <p className="text-sm text-text-secondary">
                Check back later for new tasks and rewards!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}