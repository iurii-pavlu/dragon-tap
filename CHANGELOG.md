# Changelog

All notable changes to the Dragon Tap project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-03

### 🎉 Major Release - Unified Ecosystem

This release combines the Dragon Tap game and admin panel into a single, cohesive repository with a unified architecture and deployment strategy.

### Added

#### Project Structure
- **Monorepo Architecture** - Unified `/game` and `/admin` directories
- **Shared Documentation** - Central `/docs` folder for technical specs
- **Root Configuration** - Centralized package.json and configuration
- **Comprehensive README** - Complete project overview and setup guide

#### Game Frontend (`/game`)
- React 18.2 + Vite build system
- Tap-to-earn core mechanics with energy system
- 4-tier lootbox system (Common, Rare, Epic, Legendary)
- Daily rewards with 10-day streak
- 5 main navigation tabs (Friends, Tasks, Tap, Rating, Games)
- Vietnamese and English localization
- Telegram and Zalo Mini Apps integration ready
- LocalStorage persistence
- MongoDB API utilities
- Complete documentation set

#### Admin Panel (`/admin`)
- Next.js 15.5 with TypeScript
- JWT-based authentication
- 4-tier RBAC system (Viewer, Analyst, Live-ops, Admin)
- 10 dashboard sections
- MongoDB integration with 12 collections
- Audit logging system
- Responsive design for all devices
- API routes for authentication and stats
- Complete documentation and deployment guides

#### Database
- MongoDB Atlas integration
- 12 properly indexed collections
- Connection pooling and caching
- Migration utilities ready

### Infrastructure
- Git version control with proper .gitignore
- Vercel deployment configuration for both apps
- Environment variable templates
- Security best practices implemented
- Backup and restore procedures documented

### Documentation
- Comprehensive README.md
- CHANGELOG.md (this file)
- Technical specification document
- Game-specific documentation
- Admin panel documentation
- API reference guides
- Deployment instructions
- Security guidelines

### Technical Improvements
- TypeScript for type safety (admin)
- Modern React patterns (game)
- Modular code organization
- Proper error handling
- Performance optimizations
- Mobile-first responsive design

---

## [1.0.0] - 2025-09-24

### Initial Releases

#### Game v1.0.0
- Initial React + Vite game implementation
- Basic tap mechanics
- Energy system
- Daily rewards
- Lootbox structure
- UI/UX design
- Dual language support

#### Admin v1.0.0
- Initial Next.js admin panel
- Authentication system
- Basic dashboard
- MongoDB connection
- User management foundations

---

## [Unreleased]

### Planned for 2.1.0
- [ ] Complete all 9 admin dashboard sections
- [ ] Real-time data synchronization
- [ ] Redis caching implementation
- [ ] Interactive charts with Recharts
- [ ] CSV export functionality
- [ ] Date range selectors
- [ ] Advanced filtering options
- [ ] User search and pagination

### Planned for 2.2.0
- [ ] TOTP 2FA implementation
- [ ] User CRUD operations
- [ ] Role management UI
- [ ] Password change functionality
- [ ] IP allowlisting
- [ ] Rate limiting on APIs
- [ ] Email notifications
- [ ] Webhook management

### Planned for 2.3.0
- [ ] Live-ops content editor
- [ ] Loot table configuration UI
- [ ] Task creation and management
- [ ] Promo code generator
- [ ] Banner management system
- [ ] A/B testing framework
- [ ] Feature flags system

### Planned for 3.0.0
- [ ] Real-time WebSocket connections
- [ ] Machine learning analytics
- [ ] Predictive user behavior models
- [ ] Automated anomaly detection
- [ ] Mobile admin application
- [ ] Multi-language admin interface
- [ ] Advanced player segmentation
- [ ] Custom report builder
- [ ] Multi-game support

---

## Version Comparison

| Version | Release Date | Game | Admin | Database | Status |
|---------|-------------|------|-------|----------|--------|
| 2.0.0 | 2025-10-03 | ✅ Complete | ✅ Complete | ✅ Configured | 🚀 Released |
| 1.0.0 | 2025-09-24 | ✅ Basic | ✅ Basic | ⏳ Setup | 📦 Archived |

---

## Migration Guide

### Upgrading from 1.x to 2.0

#### For Game Frontend
1. Move game files to `/game` directory
2. Update import paths if necessary
3. Review new MongoDB integration
4. Test all game mechanics

#### For Admin Panel
1. Move admin files to `/admin` directory
2. Update environment variables
3. Review new authentication flow
4. Test all dashboard sections

#### Database
1. Ensure MongoDB Atlas is configured
2. Run database initialization
3. Verify all 12 collections exist
4. Test connection from both apps

---

## Breaking Changes

### 2.0.0
- **Repository Structure** - Files relocated to `/game` and `/admin`
- **Environment Variables** - New naming conventions
- **API Endpoints** - Updated paths for admin panel
- **Authentication** - JWT implementation replaced previous method

---

## Security Updates

### 2.0.0
- Implemented JWT authentication with 24-hour expiry
- Added bcrypt password hashing (10 rounds)
- Enabled RBAC with 4 permission levels
- Added comprehensive audit logging
- Configured secure MongoDB connection
- Environment variable protection
- Protected API routes

---

## Performance Improvements

### 2.0.0
- Vite build optimization for game
- Next.js 15 App Router for admin
- MongoDB connection pooling
- LocalStorage caching for game state
- Lazy loading for dashboard sections
- Image and asset optimization
- Bundle size reduction

---

## Known Issues

### 2.0.0
- None at release time

### Future Considerations
- Real-time dashboard updates require WebSocket implementation
- Some dashboard sections show mock data pending backend integration
- Redis caching not yet implemented (optional for v2.0)
- TOTP 2FA planned for v2.2.0

---

## Contributors

- **iurii-pavlu** - Lead Developer
- **Shrimp Hunters Studio** - Product Owner
- **Claude AI** - Development Assistant

---

## Resources

- **Repository:** https://github.com/iurii-pavlu/dragon-tap
- **Game URL:** https://dragon.shrimphunters.com
- **Admin URL:** https://admin.shrimphunters.com
- **Main Site:** https://shrimphunters.com

---

**Maintained by Shrimp Hunters Studio**
**License:** MIT
