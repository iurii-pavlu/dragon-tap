# 🐲 Dragon Tap - Telegram WebApp MVP

A complete tap-to-earn dragon game built as a Telegram WebApp MVP, designed to match the **Gangsta Monkey UI 1:1** with dragon theming. Ready for Zalo Mini App port.

## 🎯 Project Overview

- **Platform**: Telegram WebApp (MVP), ready for Zalo Mini App
- **Design**: Gangsta Monkey UI clone with dragon theme
- **Tech Stack**: Next.js 15 + TypeScript + MongoDB + Tailwind CSS
- **Domain**: shrimphunters.com
- **Features**: Full game loop, Battle Pass, referrals, tasks, daily rewards, boosters, leaderboard

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Git

### 1. Environment Setup

```bash
# Clone and install
git clone <dragon-tap-repo>
cd dragon-tap
npm install

# Copy environment variables
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` with your values:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dragon-tap
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
NEXT_PUBLIC_APP_NAME=Shrimp Hunters Games
NEXT_PUBLIC_TELEGRAM_BOT_NAME=your_bot_name
NEXT_PUBLIC_BASE_URL=https://shrimphunters.com
```

### 3. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
npm start

# Lint and format
npm run lint
npm run format
```

## 🏗️ Architecture

### Frontend Structure
```
app/
├── (tabs)/           # Tab-based pages
│   ├── tap/          # Main game screen
│   ├── tasks/        # Task management
│   ├── games/        # Mini-games
│   ├── rating/       # Leaderboard
│   └── friends/      # Referral system
├── api/              # API routes
└── layout.tsx        # Root layout

components/
├── ui/               # Reusable UI components
└── dragon/           # Dragon-specific components

lib/
├── db.ts             # MongoDB connection
├── models.ts         # Mongoose schemas
├── auth.ts           # JWT authentication
├── game.ts           # Game logic utilities
├── i18n.ts           # Internationalization
└── telegram.ts       # Telegram WebApp SDK
```

### Database Models (MongoDB)

- **Users**: Profile, balance, energy, level
- **Abilities**: Multitap, energy cap, recharge speed, turbo
- **Tasks**: Mission system with rewards
- **TaskCompletions**: User task progress
- **DailyRewards**: Daily login rewards
- **LeaderboardSnapshots**: Ranking system
- **BattlePassSeason**: Season configuration
- **BattlePassProgress**: User battle pass progress
- **Referrals**: Friend invitation system

## 🎮 Game Features

### Core Mechanics
- **Dragon Tapping**: Interactive dragon with energy system
- **Energy Management**: 500 base energy, 1 per minute regeneration
- **Coin System**: Earn coins per tap with multipliers
- **Level Progression**: User leveling system

### Boosters
- **Multitap**: Increase coins per tap
- **Energy Limit**: Expand energy capacity
- **Recharging Speed**: Faster energy regeneration  
- **Turbo**: Temporary 3x coin multiplier

### Daily Systems
- **Daily Rewards**: 10-day progressive rewards
- **Tasks**: Subscribe, watch, custom missions
- **Energy Regeneration**: Automatic over time

### Social Features
- **Referral System**: Invite friends with bonus rewards
- **Leaderboard**: Global ranking by coins
- **Friends List**: Track invited players

### Battle Pass
- **3 Tiers**: Free, Advanced (39k VND), Luxury (59k VND)
- **XP System**: Earn through taps and tasks
- **Seasonal Rewards**: Time-limited content

## 🌐 Internationalization

### Supported Languages
- **English (EN)**: Default language
- **Vietnamese (VI)**: Full localization

### Language Management
- Content stored in `/content/{locale}.json`
- Client-side switching without page reload
- localStorage persistence

## 📱 Telegram WebApp Integration

### Features
- Telegram WebApp SDK integration
- User authentication via Telegram
- Theme adaptation to Telegram colors
- Native sharing capabilities
- Viewport management

### Usage
```typescript
import { telegramWebApp } from '@/lib/telegram'

// Check if running in Telegram
if (telegramWebApp.isAvailable()) {
  telegramWebApp.expand()
  const user = telegramWebApp.getUser()
}
```

## 🔧 Game Configuration

### Economy Settings (`/config/economy.json`)
```json
{
  "energyCap": 500,
  "tapBase": 1,
  "turboMultiplier": 3,
  "boosterPrices": {
    "multitap": [4000, 12000, 30000, ...],
    "energyCap": [200, 600, 1500, ...],
    "recharge": [2000, 6000, 15000, ...]
  },
  "dailyRewards": [500, 1000, 2500, 5000, ...]
}
```

### Customizable Parameters
- Energy capacity and regeneration
- Tap rewards and multipliers
- Booster prices and effects
- Daily reward amounts
- Battle pass pricing

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

2. **Environment Variables**
   Set all environment variables in Vercel dashboard

3. **Custom Domain**
   Configure `shrimphunters.com` in Vercel domain settings

### MongoDB Atlas Setup

1. Create MongoDB Atlas cluster
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for development)
4. Get connection string for `MONGODB_URI`

## 📊 Performance Targets

### Lighthouse Scores (Target ≥95)
- **Performance**: ≥95
- **SEO**: ≥95  
- **Accessibility**: ≥95
- **Best Practices**: ≥95

### Mobile Optimization
- Touch-friendly tap targets
- Responsive design (mobile-first)
- Fast loading times
- Offline capability consideration

## 🔐 Security

### Authentication
- JWT tokens with HttpOnly cookies
- Rate limiting on API routes
- Input validation with Zod schemas

### Data Protection
- Sanitized user inputs
- Secure MongoDB queries
- Environment variable protection

## 🧪 Testing Checklist

### UI/UX Verification
- [ ] Pixel-perfect match with Gangsta Monkey design
- [ ] All tabs functional and responsive
- [ ] Dragon tap animation and feedback
- [ ] Energy depletion and regeneration
- [ ] Coin earning and display

### Game Mechanics
- [ ] Multitap booster increases coins per tap
- [ ] Energy system working correctly
- [ ] Daily rewards reset logic
- [ ] Battle pass XP and rewards
- [ ] Referral system functionality

### Localization
- [ ] EN/VI language switching
- [ ] All UI text translated
- [ ] Currency and number formatting

### Telegram Integration
- [ ] WebApp SDK initialization
- [ ] User data retrieval
- [ ] Theme adaptation
- [ ] Sharing functionality

## 📈 Next Steps

### Priority 1: Zalo Mini App Port
1. **Zalo SDK Integration**: Replace Telegram SDK
2. **ZaloPay Implementation**: Payment processing
3. **Platform Optimization**: Bundle size and performance
4. **Submission Preparation**: App store requirements

### Priority 2: Game Expansion
1. **Mini-games Implementation**: Lucky wheel, heads/tails, raffle
2. **Advanced Battle Pass**: More seasons and rewards
3. **Guild System**: Team-based gameplay
4. **Events**: Special time-limited content

### Priority 3: Monetization
1. **In-app Purchases**: Energy, boosters, cosmetics
2. **Advertisement Integration**: Rewarded video ads
3. **VIP Subscription**: Premium benefits
4. **Partner Integration**: Brand collaborations

## 🔗 Links

- **Live Demo**: Will be available after deployment
- **Repository**: `<dragon-tap>`
- **Domain**: shrimphunters.com
- **Documentation**: This README

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Commit changes: `git commit -m "Add new feature"`
3. Push to branch: `git push origin feature/new-feature`
4. Create Pull Request

## 📄 License

This project is proprietary software for Shrimp Hunters Games.

---

**Dragon Tap** - Built with ❤️ for Telegram WebApp and Zalo Mini App platforms