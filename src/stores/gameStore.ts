import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DragonType = 'FIRE' | 'WATER' | 'EARTH' | 'AIR' | 'SHADOW' | 'LIGHT'

interface GameState {
  // User Data
  userId: string | null
  username: string
  displayName: string
  avatar: string | null
  
  // Resources
  coins: number
  gems: number
  tickets: number
  energy: number
  maxEnergy: number
  lastEnergyUpdate: number
  
  // Dragon
  dragonType: DragonType
  dragonLevel: number
  dragonExp: number
  
  // Tap Stats
  baseTap: number
  tapMultiplier: number
  critChance: number
  critMultiplier: number
  afkTapsPerSecond: number
  spiritBonus: number
  
  // Upgrades (Dragon Attributes)
  claws: number
  scales: number
  fire: number
  wings: number
  spirit: number
  
  // Premium
  isVip: boolean
  vipExpiresAt: number | null
  
  // Battle Pass
  battlePassLevel: number
  battlePassExp: number
  battlePassSeason: number
  hasAdvancedPass: boolean
  hasLuxuryPass: boolean
  
  // Stats
  totalTaps: number
  totalCoinsEarned: number
  dailyStreakCount: number
  lastDailyReward: number | null
  
  // AFK Bank
  afkBank: number
  lastAfkCollection: number
  
  // Actions
  setUser: (user: any) => void
  updateCoins: (amount: number) => void
  updateGems: (amount: number) => void
  updateTickets: (amount: number) => void
  updateEnergy: (amount: number) => void
  tap: () => { coins: number; isCrit: boolean }
  upgradeAttribute: (attribute: string, cost: number) => boolean
  collectAfk: () => number
  updateEnergyRegen: () => void
  reset: () => void
}

const initialState = {
  userId: null,
  username: '',
  displayName: 'Dragon Tapper',
  avatar: null,
  coins: 0,
  gems: 0,
  tickets: 0,
  energy: 100,
  maxEnergy: 100,
  lastEnergyUpdate: Date.now(),
  dragonType: 'FIRE' as DragonType,
  dragonLevel: 1,
  dragonExp: 0,
  baseTap: 1,
  tapMultiplier: 1.0,
  critChance: 0.01,
  critMultiplier: 10.0,
  afkTapsPerSecond: 0.0,
  spiritBonus: 1.0,
  claws: 0,
  scales: 0,
  fire: 0,
  wings: 0,
  spirit: 0,
  isVip: false,
  vipExpiresAt: null,
  battlePassLevel: 0,
  battlePassExp: 0,
  battlePassSeason: 1,
  hasAdvancedPass: false,
  hasLuxuryPass: false,
  totalTaps: 0,
  totalCoinsEarned: 0,
  dailyStreakCount: 0,
  lastDailyReward: null,
  afkBank: 0,
  lastAfkCollection: Date.now(),
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => {
        set({
          userId: user.id,
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          coins: user.coins || 0,
          gems: user.gems || 0,
          tickets: user.tickets || 0,
          energy: user.energy || 100,
          maxEnergy: user.maxEnergy || 100,
          lastEnergyUpdate: user.lastEnergyUpdate ? new Date(user.lastEnergyUpdate).getTime() : Date.now(),
          dragonType: user.dragonType || 'FIRE',
          dragonLevel: user.dragonLevel || 1,
          dragonExp: user.dragonExp || 0,
          baseTap: user.baseTap || 1,
          tapMultiplier: user.tapMultiplier || 1.0,
          critChance: user.critChance || 0.01,
          critMultiplier: user.critMultiplier || 10.0,
          afkTapsPerSecond: user.afkTapsPerSecond || 0.0,
          spiritBonus: user.spiritBonus || 1.0,
          claws: user.claws || 0,
          scales: user.scales || 0,
          fire: user.fire || 0,
          wings: user.wings || 0,
          spirit: user.spirit || 0,
          isVip: user.isVip || false,
          vipExpiresAt: user.vipExpiresAt ? new Date(user.vipExpiresAt).getTime() : null,
          battlePassLevel: user.battlePassLevel || 0,
          battlePassExp: user.battlePassExp || 0,
          battlePassSeason: user.battlePassSeason || 1,
          hasAdvancedPass: user.hasAdvancedPass || false,
          hasLuxuryPass: user.hasLuxuryPass || false,
          totalTaps: user.totalTaps || 0,
          totalCoinsEarned: user.totalCoinsEarned || 0,
          dailyStreakCount: user.dailyStreakCount || 0,
          lastDailyReward: user.lastDailyReward ? new Date(user.lastDailyReward).getTime() : null,
          afkBank: user.afkBank || 0,
          lastAfkCollection: user.lastAfkCollection ? new Date(user.lastAfkCollection).getTime() : Date.now(),
        })
      },

      updateCoins: (amount) => {
        set((state) => ({
          coins: Math.max(0, state.coins + amount),
          totalCoinsEarned: amount > 0 ? state.totalCoinsEarned + amount : state.totalCoinsEarned,
        }))
      },

      updateGems: (amount) => {
        set((state) => ({ gems: Math.max(0, state.gems + amount) }))
      },

      updateTickets: (amount) => {
        set((state) => ({ tickets: Math.max(0, state.tickets + amount) }))
      },

      updateEnergy: (amount) => {
        set((state) => ({
          energy: Math.max(0, Math.min(state.maxEnergy, state.energy + amount)),
          lastEnergyUpdate: Date.now(),
        }))
      },

      tap: () => {
        const state = get()
        
        if (state.energy <= 0) {
          return { coins: 0, isCrit: false }
        }

        // Calculate tap reward based on dragon attributes
        const clawsMultiplier = 1 + (state.claws * 0.1) // +10% per claw level
        const spiritMultiplier = 1 + (state.spirit * 0.05) // +5% global bonus per spirit level
        const critChance = Math.min(0.2, 0.01 + (state.fire * 0.002)) // +0.2% crit per fire level, max 20%
        
        const isCrit = Math.random() < critChance
        const critMultiplier = isCrit ? state.critMultiplier : 1
        
        const coins = Math.floor(
          state.baseTap * clawsMultiplier * spiritMultiplier * critMultiplier
        )
        
        set((state) => ({
          coins: state.coins + coins,
          energy: state.energy - 1,
          totalTaps: state.totalTaps + 1,
          totalCoinsEarned: state.totalCoinsEarned + coins,
          lastEnergyUpdate: Date.now(),
        }))

        return { coins, isCrit }
      },

      upgradeAttribute: (attribute: string, cost: number) => {
        const state = get()
        
        if (state.coins < cost) {
          return false
        }

        set((state) => {
          const newState = { ...state, coins: state.coins - cost }
          
          switch (attribute) {
            case 'claws':
              newState.claws += 1
              break
            case 'scales':
              newState.scales += 1
              newState.maxEnergy = 100 + (newState.scales * 10)
              break
            case 'fire':
              newState.fire += 1
              break
            case 'wings':
              newState.wings += 1
              newState.afkTapsPerSecond = Math.min(2.0, newState.wings * 0.2)
              break
            case 'spirit':
              newState.spirit += 1
              break
          }
          
          return newState
        })

        return true
      },

      collectAfk: () => {
        const state = get()
        const now = Date.now()
        const timeDiff = now - state.lastAfkCollection
        const afkMinutes = Math.min(30, timeDiff / (1000 * 60)) // Max 30 minutes
        
        const afkCoins = Math.floor(afkMinutes * 60 * state.afkTapsPerSecond * state.baseTap)
        
        set({
          coins: state.coins + afkCoins,
          afkBank: 0,
          lastAfkCollection: now,
          totalCoinsEarned: state.totalCoinsEarned + afkCoins,
        })

        return afkCoins
      },

      updateEnergyRegen: () => {
        const state = get()
        const now = Date.now()
        const timeDiff = now - state.lastEnergyUpdate
        const minutesPassed = timeDiff / (1000 * 60)
        const energyToAdd = Math.floor(minutesPassed) // 1 energy per minute
        
        if (energyToAdd > 0 && state.energy < state.maxEnergy) {
          set({
            energy: Math.min(state.maxEnergy, state.energy + energyToAdd),
            lastEnergyUpdate: now,
          })
        }
      },

      reset: () => set(initialState),
    }),
    {
      name: 'dragon-tap-game',
    }
  )
)