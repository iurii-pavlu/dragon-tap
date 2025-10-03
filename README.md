# 🐉 Dragon Tap - Complete Ecosystem v2.0

**The Ultimate Tap-to-Earn Game Management System**

[![Version](https://img.shields.io/badge/version-2.0.0-blue)](https://github.com/iurii-pavlu/dragon-tap)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 Project Overview

Dragon Tap is a comprehensive tap-to-earn game ecosystem built for **Telegram Mini Apps** and **Zalo Mini Apps**, featuring a complete game frontend and powerful admin dashboard for management and analytics.

### 🌟 What's Included

| Component | Technology | Purpose | Status |
|-----------|-----------|---------|--------|
| **Game** | React + Vite | Player-facing tap-to-earn game | ✅ Complete |
| **Admin** | Next.js + TypeScript | Management dashboard | ✅ Complete |
| **Database** | MongoDB Atlas | Unified data storage | ✅ Connected |

---

## 🎮 Game Frontend (`/game`)

### Features
- 🐲 **Tap-to-Earn Mechanics** - Interactive dragon tapping with energy system
- 💎 **Lootbox System** - 4 rarity tiers with animated reveals
- 👥 **Social Features** - Referral system and leaderboards
- 🎯 **Daily Rewards** - 10-day streak system (500 → 5M coins)
- 🎮 **Mini-Games** - Lucky Wheel, Heads or Tails, Raffle, Voucher Hunter
- 🌐 **Dual Language** - Vietnamese (vi-VN) and English (en-US)
- 📱 **Platform Ready** - Telegram Mini Apps & Zalo Mini Apps integration

### Technology Stack
- React 18.2
- Vite build tool
- Tailwind CSS
- Lucide React icons
- LocalStorage persistence

### Quick Start
```bash
cd game
npm install
npm run dev
```

**Live URL:** https://dragon.shrimphunters.com

---

## 🛡️ Admin Panel (`/admin`)

### Features
- 🔐 **JWT Authentication** - Secure login with role-based access
- 👥 **RBAC System** - 4 roles (Viewer, Analyst, Live-ops, Admin)
- 📊 **Analytics Dashboard** - 10 comprehensive sections
  1. Overview - DAU/WAU/MAU, revenue, retention
  2. Acquisition - Install sources, K-factor, FTUE funnel
  3. Monetization - Stars/TON revenue tracking
  4. Ads - Performance metrics and eCPM
  5. Gameplay & Economy - Player behavior analysis
  6. Gacha Transparency - Drop rates and pity counters
  7. Live-ops & Tasks - Task management and promos
  8. Stability & Performance - API health monitoring
  9. Player Support - User tools and moderation
  10. Admin Tools - System management
- 🗄️ **MongoDB Integration** - 12 collections with proper indexes
- 📝 **Audit Logging** - Complete action history tracking
- 📱 **Responsive Design** - Mobile, tablet, and desktop support

### Technology Stack
- Next.js 15.5 with App Router
- TypeScript
- Tailwind CSS
- MongoDB with connection pooling
- JWT + bcrypt authentication
- Recharts for visualizations

### Quick Start
```bash
cd admin
npm install
cp .env.local.example .env.local
# Edit .env.local with your credentials
npm run dev
```

**Live URL:** https://admin.shrimphunters.com

**Default Login:**
- Email: admin@shrimphunters.com
- Password: ChangeMe123!

⚠️ **Change password immediately after first login!**

---

## 🗄️ Database Architecture

### MongoDB Collections (12 Total)

| Collection | Purpose | Key Indexes |
|------------|---------|-------------|
| `users` | Player accounts | tg_id, referral_code |
| `progress` | Game state | user_id |
| `inventory` | Items & cosmetics | user_id |
| `loot_tables` | Drop configurations | box_id |
| `payments` | Transaction history | user_id, status |
| `ads` | Ad performance | user_id, completed_at |
| `tasks` | Task definitions | task_id, type |
| `leaderboards` | Rankings | board_id, scores |
| `events_analytics` | Event tracking | event_name, user_id, ts |
| `roles` | Admin users | user_id+role |
| `audit_logs` | Action history | actor_id, action, ts |
| `reports_cache` | Cached reports | key, TTL |

---

## 🚀 Deployment

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Vercel account (recommended)
- Domain: shrimphunters.com

### Game Deployment
```bash
cd game
npm install
npm run build
vercel --prod
# Configure custom domain: dragon.shrimphunters.com
```

### Admin Deployment
```bash
cd admin
npm install
# Add environment variables to Vercel dashboard
npm run build
vercel --prod
# Configure custom domain: admin.shrimphunters.com
```

### Environment Variables

**Game (.env):**
```env
VITE_TELEGRAM_BOT_TOKEN=your-bot-token
VITE_MONGODB_PUBLIC_KEY=your-mongodb-key
VITE_APP_URL=https://dragon.shrimphunters.com
```

**Admin (.env.local):**
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
NEXTAUTH_SECRET=your-secret
ADMIN_EMAIL=admin@shrimphunters.com
NEXT_PUBLIC_GAME_URL=https://dragon.shrimphunters.com
```

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────┐
│              shrimphunters.com                      │
│                 Main Website                         │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
┌───────▼───────┐             ┌────────▼────────┐
│  Game Frontend │             │  Admin Panel    │
│  dragon.shrimp │             │ admin.shrimp    │
│  hunters.com   │             │ hunters.com     │
│                │             │                 │
│  React + Vite  │             │  Next.js + TS   │
│  Port: 3000    │             │  Port: 3001     │
└───────┬────────┘             └────────┬────────┘
        │                               │
        └───────────────┬───────────────┘
                        │
                ┌───────▼────────┐
                │  MongoDB Atlas  │
                │  dragon_tap DB  │
                │  12 Collections │
                └─────────────────┘
```

---

## 📝 Documentation

### Main Docs
- **README.md** - This file (project overview)
- **CHANGELOG.md** - Version history
- **docs/Technical_Spec.docx** - Complete technical specification

### Game Docs
- **game/README.md** - Game setup and features
- **game/SETUP.md** - Quick start guide
- **game/ASSETS.md** - Asset replacement guide
- **game/Version Control/** - Development history

### Admin Docs
- **admin/README.md** - Admin panel guide
- **admin/DEPLOYMENT.md** - Deployment instructions
- **admin/VERSION.md** - v1.0.0 release notes
- **admin/CHANGELOG.md** - Admin version history

---

## 🔐 Security

### Authentication
- JWT tokens with 24-hour expiry
- bcrypt password hashing (10 rounds)
- Telegram initData validation (HMAC)
- Protected API routes

### Authorization
- 4-tier RBAC system
- Permission-based UI rendering
- Audit logging for all admin actions
- Role-specific access controls

### Best Practices
- Environment variables for secrets
- IP allowlisting for MongoDB
- Rate limiting on sensitive endpoints
- Regular security audits

---

## 🎯 KPIs & Metrics

### User Metrics
- **DAU/WAU/MAU** - Active user tracking
- **Retention** - D1, D7, D30 rates
- **Engagement** - Taps/session, time spent

### Revenue Metrics
- **ARPDAU** - Average revenue per DAU
- **ARPPU** - Average revenue per paying user
- **LTV** - Lifetime value tracking
- **Conversion** - Free-to-paid rates

### Performance Metrics
- **API Latency** - P95, P99 response times
- **Error Rates** - System stability
- **Crash-Free %** - Client stability

---

## 🛣️ Roadmap

### Version 2.1.0 (Next Quarter)
- [ ] Complete all 9 admin dashboard sections
- [ ] Real-time data synchronization
- [ ] Redis caching layer
- [ ] Advanced analytics with charts
- [ ] CSV export functionality

### Version 2.2.0
- [ ] TOTP 2FA for admin users
- [ ] User CRUD operations in admin
- [ ] Live-ops content editor
- [ ] Promo code generator
- [ ] A/B testing framework

### Version 3.0.0
- [ ] Real-time WebSocket updates
- [ ] Machine learning insights
- [ ] Mobile admin app
- [ ] Multi-game support
- [ ] Advanced player segmentation

---

## 👥 Team

**Shrimp Hunters Studio**
- Project Lead: Dragon Tap Team
- Developer: iurii-pavlu
- Platform: Telegram & Zalo Mini Apps

---

## 📞 Support

- **Documentation:** See `/game` and `/admin` README files
- **Issues:** https://github.com/iurii-pavlu/dragon-tap/issues
- **Email:** admin@shrimphunters.com

---

## 📄 License

MIT License - Shrimp Hunters Studio

---

## 🎉 Quick Links

| Resource | URL |
|----------|-----|
| **Game** | https://dragon.shrimphunters.com |
| **Admin** | https://admin.shrimphunters.com |
| **Main Site** | https://shrimphunters.com |
| **GitHub** | https://github.com/iurii-pavlu/dragon-tap |
| **Technical Spec** | [docs/Technical_Spec.docx](docs/Technical_Spec.docx) |

---

**Dragon Tap v2.0** - Complete tap-to-earn ecosystem with game and admin panel
**Last Updated:** October 3, 2025
**Status:** ✅ Production Ready

🐉 **Tap, Earn, Manage** - The complete solution for tap-to-earn games!
