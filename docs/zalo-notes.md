# 📱 Zalo Mini App Port - Technical Notes

## Overview
This document outlines the technical requirements and changes needed to port Dragon Tap from Telegram WebApp to Zalo Mini App platform.

## 🔧 Zalo Mini App Requirements

### Bundle Size Limits
- **Total app size**: Maximum 20MB
- **JavaScript bundle**: Recommended < 2MB
- **Images**: Optimize all images, use WebP format
- **Fonts**: Limit custom fonts, prefer system fonts

### App Configuration (`app-config.json`)
Required configuration file for Zalo submission:

```json
{
  "app": {
    "appName": "Dragon Tap",
    "headerTitle": "Dragon Tap",
    "headerColor": "#0B0B0B",
    "statusBarColor": "#0B0B0B", 
    "tabBar": {
      "backgroundColor": "#111111",
      "borderTopColor": "#27272A",
      "selectedColor": "#F9A825",
      "color": "#A1A1AA"
    }
  },
  "pages": [
    "pages/tap/index",
    "pages/tasks/index", 
    "pages/games/index",
    "pages/rating/index",
    "pages/friends/index"
  ]
}
```

### Navigation System
- **Back button behavior**: Handle Zalo's back button events
- **Tab navigation**: Use Zalo's native tab bar system
- **Page transitions**: Follow Zalo's navigation patterns

### Performance Requirements
- **Loading time**: < 3 seconds on 3G network
- **Memory usage**: < 100MB peak memory
- **FPS**: Maintain 60fps during interactions
- **Battery usage**: Optimize for minimal battery drain

## 🔄 Code Changes Required

### 1. SDK Integration
Replace Telegram WebApp SDK with Zalo Mini App SDK:

```typescript
// Current: Telegram WebApp
import { telegramWebApp } from '@/lib/telegram'

// New: Zalo Mini App  
import { ZaloMiniApp } from '@/lib/zalo'
```

### 2. Authentication Flow
Update authentication to use Zalo OAuth:

```typescript
// Zalo user authentication
const zaloAuth = {
  getUserInfo: () => ZaloMiniApp.getUserInfo(),
  login: () => ZaloMiniApp.authorize(),
  logout: () => ZaloMiniApp.logout()
}
```

### 3. Payment Integration
Integrate ZaloPay for in-app purchases:

```typescript
// ZaloPay integration
const payment = {
  createOrder: (amount, description) => ZaloPay.createOrder({
    amount,
    description,
    item: JSON.stringify(battlePassData)
  }),
  processPayment: (orderToken) => ZaloPay.pay(orderToken)
}
```

### 4. Native Features
- **Sharing**: Use Zalo's native sharing APIs
- **Contacts**: Access Zalo friend list for referrals
- **Notifications**: Zalo push notification system
- **Storage**: Zalo's local storage APIs

## 📦 Bundle Optimization

### Code Splitting
```typescript
// Lazy load heavy components
const GameComponents = lazy(() => import('./games/GameComponents'))
const BattlePassSystem = lazy(() => import('./battlepass/BattlePassSystem'))
```

### Image Optimization
- Convert all images to WebP format
- Implement responsive images with multiple sizes
- Use Zalo's image CDN for external images

### Font Optimization  
- Remove custom fonts, use system fonts
- Implement font-display: swap for web fonts
- Minimize font variations used

## 🎨 UI/UX Adaptations

### Zalo Design Guidelines
- Follow Zalo's design system colors and components
- Adapt to Zalo's standard spacing and typography
- Ensure compatibility with Zalo's dark/light theme switching

### Touch Interactions
- Implement Zalo's standard touch gestures
- Optimize tap targets for mobile (minimum 44px)
- Add haptic feedback for important interactions

### Responsive Design
- Support multiple screen sizes (iPhone SE to iPad)
- Test on Zalo's supported device list
- Ensure proper safe area handling

## 🔐 Security & Privacy

### Data Protection
- Implement Zalo's data privacy requirements
- Encrypt sensitive user data
- Follow Zalo's data retention policies

### API Security
- Use Zalo's authentication tokens
- Implement rate limiting for API calls
- Validate all user inputs server-side

## 📊 Analytics & Monitoring

### Zalo Analytics
- Integrate Zalo's built-in analytics
- Track user engagement metrics
- Monitor app performance metrics

### Custom Analytics
- User retention and session length
- Game progression analytics  
- Monetization conversion tracking

## ⚡ Performance Monitoring

### Key Metrics
- **App launch time**: < 2 seconds
- **Page transition time**: < 500ms
- **API response time**: < 1 second
- **Memory usage**: Monitor and optimize

### Optimization Strategies
- Implement virtual scrolling for large lists
- Use React.memo for expensive components
- Optimize re-renders with useMemo and useCallback

## 🧪 Testing Checklist

### Functionality Testing
- [ ] All game mechanics work on Zalo platform
- [ ] Payment flow completes successfully
- [ ] Social sharing works with Zalo contacts
- [ ] Offline functionality (limited)

### Performance Testing  
- [ ] App loads within 3 seconds on 3G
- [ ] Smooth 60fps during dragon tapping
- [ ] Memory usage stays under 100MB
- [ ] Battery usage is optimized

### Compatibility Testing
- [ ] Works on all Zalo-supported devices
- [ ] Compatible with different Zalo app versions
- [ ] Handles various network conditions

### User Experience Testing
- [ ] Navigation follows Zalo patterns
- [ ] Touch interactions feel native
- [ ] Text is readable on all screen sizes
- [ ] Loading states are informative

## 📋 Submission Requirements

### App Store Materials
- App icon (multiple sizes)
- Screenshots (required sizes)
- App description in Vietnamese and English
- Privacy policy and terms of service

### Technical Review
- Code security audit
- Performance benchmark results
- Accessibility compliance report
- API documentation

## 🚀 Deployment Strategy

### Staging Environment
1. Deploy to Zalo Mini App sandbox
2. Conduct thorough testing
3. Performance profiling and optimization
4. Beta user testing

### Production Release
1. Submit to Zalo App Store
2. Monitor launch metrics
3. Gradual rollout to users
4. Post-launch optimization

## 📈 Success Metrics

### Technical KPIs
- **Crash rate**: < 0.1%
- **Load time**: < 3 seconds (95th percentile)
- **User rating**: > 4.5 stars
- **Performance score**: > 90

### Business KPIs  
- **DAU retention**: > 40% (Day 7)
- **Session length**: > 5 minutes average
- **Conversion rate**: > 2% (battle pass purchases)
- **Viral coefficient**: > 0.3 (referral system)

---

This document should be updated as Zalo Mini App requirements evolve and during the development process.