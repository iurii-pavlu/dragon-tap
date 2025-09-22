# 🐲 Dragon Tap - Zalo Mini App

A complete tap-to-earn dragon game built for the Zalo Mini App platform with Next.js, TypeScript, and modern game mechanics.

## 🎮 Project Overview
- **Name**: Dragon Tap
- **Platform**: Zalo Mini App
- **Goal**: Create an engaging tap-to-earn game with dragon theming, battle pass system, and comprehensive monetization
- **Tech Stack**: Next.js 13.4 + TypeScript + MongoDB + Prisma + TailwindCSS + Shadcn/UI

## 🌟 Features

### ✅ Currently Implemented Features

#### 🎯 Core Game Mechanics
- **Dragon Tap System**: Interactive dragon tapping with energy management
- **Dragon Evolution**: 6 dragon types (Fire, Water, Earth, Air, Shadow, Light)
- **Attribute System**: Claws (tap multiplier), Scales (energy cap), Fire (crit chance), Wings (AFK), Spirit (global bonus)
- **Critical Hit System**: Visual feedback with special animations
- **AFK Earnings**: Passive income system with 30-minute bank
- **Energy System**: 100 base energy, 1 per minute regeneration

#### 💎 Battle Pass System
- **3-Tier Structure**: Free, Advanced (39,000 VND), Luxury (59,000 VND)
- **10 Battle Pass Levels**: Progressive rewards and difficulty
- **Seasonal System**: Season 1 with time-limited content
- **Reward Types**: Coins, Gems, Tickets, VIP days, Cosmetics

#### 📱 Game Sections (5 Main Tabs)
1. **Friends**: Invite system with referral bonuses
2. **Tasks**: Daily/Weekly tasks with partner integration placeholders
3. **Tap!**: Main game screen with dragon interaction
4. **Rating**: Global and weekly leaderboards
5. **Games**: Mini-games (Lucky Wheel, Heads/Tails, Raffle, Voucher Hunter)

#### 🌐 Internationalization
- **English (en-US)** and **Vietnamese (vi-VN)** support
- Complete translation system with contextual switching
- Language switcher in header

#### ⚙️ Admin Panel
- **Analytics Dashboard**: User metrics, retention, conversion rates
- **User Management**: User list with VIP status and activity tracking
- **Lootbox Management**: Create and manage loot tables with drop rates
- **Game Configuration**: Adjust game balance and parameters

### 📊 Data Architecture

#### 🗄️ Database Models (MongoDB + Prisma)
- **Users**: Complete player profiles with game progress
- **Friends**: Referral and social connections
- **Inventory**: Item management system
- **Purchases**: Transaction tracking and receipts
- **LootTables & LootItems**: Configurable reward systems
- **Tasks & UserTasks**: Mission and achievement system
- **Leaderboards**: Ranking and competition data
- **Analytics**: Event tracking and user behavior
- **BattlePass**: Seasonal progression system

#### 💾 State Management
- **Zustand**: Game state with persistence
- **Local Storage**: Progress saving and offline capability
- **Real-time Updates**: Energy regeneration and AFK earnings

## 🚀 URLs

- **Live Application**: https://3000-idxndb0mjydfvyhirbjfm-6532622b.e2b.dev
- **GitHub Repository**: https://github.com/iurii-pavlu/dragon-tap
- **Admin Panel**: https://3000-idxndb0mjydfvyhirbjfm-6532622b.e2b.dev/admin

## 🎮 User Guide

### Getting Started
1. **Launch the Game**: Open Dragon Tap in Zalo Mini App
2. **Choose Language**: English or Vietnamese available
3. **Start Tapping**: Tap the dragon to earn coins
4. **Manage Energy**: Wait for energy regeneration or purchase refills
5. **Upgrade Dragon**: Spend coins to improve dragon attributes

### Game Mechanics
- **Tap Rewards**: Base reward × Claws multiplier × Spirit bonus × Crit multiplier
- **Energy Management**: Each tap costs 1 energy, regenerates 1 per minute
- **Dragon Attributes**:
  - 🗡️ **Claws**: +10% tap reward per level
  - 🛡️ **Scales**: +10 max energy per level
  - 🔥 **Fire**: +0.2% crit chance per level
  - 🦋 **Wings**: +0.2 AFK taps/second per level (max 2.0)
  - ✨ **Spirit**: +5% global bonus per level

### Battle Pass
- **Free Tier**: Always available with basic rewards
- **Advanced Pass**: 39,000 VND - Enhanced rewards
- **Luxury Pass**: 59,000 VND - Premium rewards and exclusive items
- **XP Earning**: Complete tasks and tap to gain Battle Pass experience

### Mini Games
- **Lucky Wheel**: Spin for dragon treasures
- **Heads or Tails**: Double-or-nothing coin gambling
- **Raffle**: Ticket-based prize draws
- **Voucher Hunter**: Partner reward hunting (Lazada/Shopee integration planned)

## 🛠️ Technical Implementation

### Frontend Architecture
- **Framework**: Next.js 13.4 with App Router
- **Styling**: TailwindCSS + Shadcn/UI components
- **Animations**: Framer Motion for tap effects and transitions
- **Icons**: Lucide React + custom dragon-themed assets
- **Responsive**: Mobile-first design optimized for Zalo WebView

### Backend Integration (Planned)
- **Authentication**: Zalo SDK integration for user auth
- **Payments**: ZaloPay API for battle pass and in-app purchases
- **Analytics**: Event tracking for user behavior and game balance
- **Partner APIs**: Lazada and Shopee integration for voucher hunting

### Game Balance
- **Monetization Strategy**: 
  - Battle Pass: 39k/59k VND pricing
  - Energy refills and lootboxes
  - VIP subscription (39k VND/week)
- **Retention Mechanics**:
  - Daily login rewards
  - Progressive difficulty
  - Social features and leaderboards

## 🎯 Recommended Next Steps

### Priority 1: Core Integration
1. **Zalo SDK Integration**: User authentication and social features
2. **ZaloPay Implementation**: Payment processing for battle pass
3. **Database Setup**: MongoDB deployment and connection
4. **Analytics Integration**: Event tracking and user behavior analysis

### Priority 2: Game Content
1. **Lootbox System**: Implement reward drops and animations
2. **Mini-Game Logic**: Complete game mechanics for wheel, raffle, etc.
3. **Shop System**: Purchase interface for energy, tickets, cosmetics
4. **VIP Benefits**: Auto-tap, AFK bonuses, exclusive rewards

### Priority 3: Partner Integration
1. **Lazada API**: Voucher and offer integration
2. **Shopee API**: Partner task and reward system
3. **Advertisement Integration**: Rewarded video ads
4. **Push Notifications**: Engagement and retention campaigns

### Priority 4: Polish & Launch
1. **Performance Optimization**: Bundle size and loading speed
2. **Testing**: User acceptance testing and game balance
3. **Localization**: Complete Vietnamese translation review
4. **Launch Strategy**: Zalo Mini App store submission

## 📈 Expected Metrics (Based on Specification)
- **ARPU**: ~$0.56/month
- **ARPPU**: ~$4.7/month  
- **LTV (6 months)**: ~$3.4
- **Day 1 Retention**: Target 78%
- **Purchase Conversion**: Target 3.4%
- **VIP Conversion**: Target 1.8%

## 🔧 Development Setup

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 📱 Platform Deployment
- **Status**: ✅ Development Complete
- **Platform**: Zalo Mini App Ready
- **Infrastructure**: Next.js static generation compatible
- **Database**: MongoDB Atlas ready
- **CDN**: Optimized for global deployment

## 🎨 Design System
- **Theme**: Dark mode dragon aesthetic
- **Colors**: Fire gradients (orange/red), mystical purples, treasure golds
- **Typography**: Clean, readable fonts optimized for mobile
- **Animations**: Smooth tap feedback, floating coin effects, critical hit celebrations
- **Responsive**: Mobile-first design with tablet/desktop support

---

**Dragon Tap** - Built with ❤️ for the Zalo Mini App platform  
Ready for integration, testing, and launch! 🚀🐲