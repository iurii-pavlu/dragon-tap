# 🐉 Dragon Tap - Tap-to-Earn Mini App

A complete tap-to-earn game built for **Telegram Mini Apps** and **Zalo Mini Apps** with React, featuring a dragon theme, progression system, lootboxes, referrals, and mini-games.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎮 Core Gameplay
- Tap-to-earn system with energy consumption
- Energy regeneration (1 per second)
- Coin and gem currencies
- Level progression system
- Animated tap effects with floating numbers

### 💎 Monetization
- Lootbox System: 4 rarity tiers with animated reveals
- In-App Purchases: Energy refills, tickets, VIP subscriptions
- Rewarded Ads: Up to 6/day for energy refills

### 👥 Social Features
- Referral System: Earn coins for inviting friends
- Friend Leveling Bonuses
- Premium Friend Rewards
- Global Leaderboard

### 🎯 Daily Engagement
- Daily Rewards: 10-day streak system (500 → 5M coins)
- Daily Tasks: Login, taps, ads, mini-games
- Partner Tasks

### 🌐 Localization
- Vietnamese (vi-VN)
- English (en-US)

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 Platform Integration

### Telegram Mini App

1. Add Telegram Web App script (already in index.html)
2. Initialize in your app (see src/utils/telegram.js)
3. Create bot with @BotFather
4. Set web app URL

Your bot token: `8483505037:AAHZ2a14o39B3GyUai2yNtiHXnGnDpPFnFQ`

### MongoDB Integration

Update `.env` with your MongoDB credentials:
```env
VITE_MONGODB_PUBLIC_KEY=ogxlxbog
VITE_MONGODB_PRIVATE_KEY=089df13b-5be3-4347-8fad-4d1c17e6a725
```

API functions available in `src/utils/api.js`

## 🎨 Asset Replacement

Currently using emoji placeholders (🐉🪙💎📦). Replace with your artwork:

1. Add images to `public/assets/images/`
2. Replace emoji in `src/App.jsx`
3. Example: `🐉` → `<img src="/assets/images/dragon.png" />`

## 📊 Game Balance

- Base tap: 1 coin
- Energy: 500 max, 1/second regen
- Free player: ~600-700 coins/day
- ARPU target: $0.56/month

## 🔧 Tech Stack

- React 18.2
- Vite
- Tailwind CSS
- Lucide React (icons)
- LocalStorage (→ MongoDB ready)

## 📦 Deployment

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
Drag & drop `dist/` folder to Netlify

## 👤 Author

**GeorgePavlu**
- GitHub: [@Georgepavl](https://github.com/Georgepavl)

## 📄 License

MIT License

---

**Status:** ✅ Demo Ready | 🔄 Backend Integration Pending | 🎨 Assets Need Replacement
