import economy from '../config/economy.json';

export function calculateEnergyRegen(lastRegenTime: Date, rechargeLevel: number = 1): number {
  const now = Date.now();
  const lastRegen = new Date(lastRegenTime).getTime();
  const timeDiff = now - lastRegen;
  
  // Base regen: 1 energy per minute (60000ms)
  const baseRegenRate = economy.energyRegenInterval; // 60000ms
  const regenMultiplier = 1 + (rechargeLevel - 1) * 0.2; // 20% faster per level
  const actualRegenRate = baseRegenRate / regenMultiplier;
  
  const energyToRegen = Math.floor(timeDiff / actualRegenRate);
  
  return energyToRegen;
}

export function getMaxEnergy(energyCapLevel: number = 1): number {
  const baseEnergy = economy.energyCap;
  const bonusPerLevel = 50; // +50 energy per level
  return baseEnergy + (energyCapLevel - 1) * bonusPerLevel;
}

export function getCoinsPerTap(multitapLevel: number = 1): number {
  const baseTap = economy.tapBase;
  return baseTap * multitapLevel;
}

export function getBoosterPrice(boosterType: keyof typeof economy.boosterPrices, level: number): number {
  const prices = economy.boosterPrices[boosterType];
  if (level < 1 || level > prices.length) {
    return Infinity; // Max level reached
  }
  return prices[level - 1];
}

export function getDailyReward(day: number): number {
  if (day < 1 || day > economy.dailyRewards.length) {
    return 0;
  }
  return economy.dailyRewards[day - 1];
}

export function calculateBattlePassXP(action: 'tap' | 'task', amount: number = 1): number {
  switch (action) {
    case 'tap':
      return Math.floor(amount / 10); // 1 XP per 10 taps
    case 'task':
      return 100; // 100 XP per task completion
    default:
      return 0;
  }
}

export function getBattlePassLevel(xp: number): number {
  // Every 1000 XP = 1 level
  return Math.floor(xp / 1000) + 1;
}

export function getXPForNextLevel(xp: number): number {
  const currentLevel = getBattlePassLevel(xp);
  const xpForNextLevel = currentLevel * 1000;
  return xpForNextLevel - xp;
}

export function validateTapRequest(energy: number, taps: number): boolean {
  return energy >= taps && taps > 0 && taps <= 50; // Max 50 taps per request
}

export function generateReferralCode(userId: string): string {
  // Simple hash-based referral code
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).toUpperCase().substring(0, 8);
}