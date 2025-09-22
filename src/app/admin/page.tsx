'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Settings,
  Package,
  BarChart3,
  Activity,
  Coins,
  Gem,
  Crown,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'

// Mock data for admin dashboard
const mockAnalytics = {
  totalUsers: 15847,
  activeUsers: 8932,
  newUsersToday: 234,
  revenue: 1247500, // VND
  retention: {
    day1: 78,
    day7: 45,
    day30: 23
  },
  conversion: {
    registration: 12.3,
    purchase: 3.4,
    vip: 1.8
  }
}

const mockUsers = [
  { id: 1, name: 'DragonMaster', level: 15, coins: 1250000, vip: true, lastActive: '5 min ago' },
  { id: 2, name: 'FireBreather', level: 12, coins: 890000, vip: false, lastActive: '1 hour ago' },
  { id: 3, name: 'ScaleLord', level: 18, coins: 2100000, vip: true, lastActive: '2 hours ago' },
  { id: 4, name: 'WingCommander', level: 8, coins: 450000, vip: false, lastActive: '1 day ago' },
]

const mockLootboxes = [
  { 
    id: 1, 
    name: 'Common Dragon Chest', 
    price: 9000, 
    currency: 'VND',
    rewards: [
      { item: 'Coins', chance: 70, amount: '1000-5000' },
      { item: 'Gems', chance: 20, amount: '10-50' },
      { item: 'Tickets', chance: 10, amount: '1-3' }
    ]
  },
  { 
    id: 2, 
    name: 'Epic Dragon Chest', 
    price: 79000, 
    currency: 'VND',
    rewards: [
      { item: 'Coins', chance: 50, amount: '10000-50000' },
      { item: 'Gems', chance: 30, amount: '100-500' },
      { item: 'VIP Days', chance: 15, amount: '1-7' },
      { item: 'Legendary Skin', chance: 5, amount: '1' }
    ]
  }
]

function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{mockAnalytics.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </Card>
        
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Users</p>
              <p className="text-2xl font-bold text-white">{mockAnalytics.activeUsers.toLocaleString()}</p>
            </div>
            <Activity className="w-8 h-8 text-green-400" />
          </div>
        </Card>
        
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Revenue (VND)</p>
              <p className="text-2xl font-bold text-white">{mockAnalytics.revenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-400" />
          </div>
        </Card>
        
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">New Today</p>
              <p className="text-2xl font-bold text-white">{mockAnalytics.newUsersToday}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Retention & Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">User Retention</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Day 1</span>
                <span className="text-white">{mockAnalytics.retention.day1}%</span>
              </div>
              <Progress value={mockAnalytics.retention.day1} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Day 7</span>
                <span className="text-white">{mockAnalytics.retention.day7}%</span>
              </div>
              <Progress value={mockAnalytics.retention.day7} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Day 30</span>
                <span className="text-white">{mockAnalytics.retention.day30}%</span>
              </div>
              <Progress value={mockAnalytics.retention.day30} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Conversion Rates</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Registration</span>
              <Badge className="bg-green-600">{mockAnalytics.conversion.registration}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">First Purchase</span>
              <Badge className="bg-blue-600">{mockAnalytics.conversion.purchase}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">VIP Upgrade</span>
              <Badge className="bg-yellow-600">{mockAnalytics.conversion.vip}%</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function UsersTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">User Management</h3>
        <Button className="dragon-gradient-fire text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="space-y-3">
        {mockUsers.map((user) => (
          <Card key={user.id} className="p-4 bg-slate-800/50 border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <span className="text-white font-bold">{user.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{user.name}</span>
                    {user.vip && <Crown className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="text-sm text-slate-400">
                    Level {user.level} • {user.coins.toLocaleString()} coins
                  </div>
                  <div className="text-xs text-slate-500">
                    Last active: {user.lastActive}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function LootboxTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Lootbox Management</h3>
        <Button className="dragon-gradient-fire text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Lootbox
        </Button>
      </div>

      <div className="space-y-4">
        {mockLootboxes.map((lootbox) => (
          <Card key={lootbox.id} className="p-6 bg-slate-800/50 border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white">{lootbox.name}</h4>
                <p className="text-sm text-slate-400">
                  Price: {lootbox.price.toLocaleString()} {lootbox.currency}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium text-white">Reward Table:</h5>
              {lootbox.rewards.map((reward, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                  <span className="text-sm text-slate-300">{reward.item}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">{reward.amount}</span>
                    <Badge 
                      variant="secondary" 
                      className={
                        reward.chance >= 50 ? "bg-green-600" :
                        reward.chance >= 20 ? "bg-yellow-600" :
                        reward.chance >= 5 ? "bg-orange-600" : "bg-red-600"
                      }
                    >
                      {reward.chance}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dragon Tap Admin Panel</h1>
          <p className="text-slate-400">Manage your game, users, and analytics</p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="lootbox">
              <Package className="w-4 h-4 mr-2" />
              Lootboxes
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <DashboardTab />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UsersTab />
          </TabsContent>

          <TabsContent value="lootbox" className="mt-6">
            <LootboxTab />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Game Configuration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Base Tap Reward</label>
                    <input 
                      type="number" 
                      className="w-full p-2 bg-slate-700 text-white rounded border border-slate-600"
                      defaultValue="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Energy Capacity</label>
                    <input 
                      type="number" 
                      className="w-full p-2 bg-slate-700 text-white rounded border border-slate-600"
                      defaultValue="100"
                    />
                  </div>
                </div>
                <Button className="dragon-gradient-fire text-white">
                  Save Configuration
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}