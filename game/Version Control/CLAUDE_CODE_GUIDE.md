# Claude Code - Quick Reference Guide

## Project: Dragon Tap v1.0.0
**For use with Claude Code via terminal**

---

## 📍 Project Location
```bash
cd "/Users/georgepavlu/DragonTap 4.5"
```

---

## 🚀 Quick Start Commands

### Development
```bash
# Start dev server (port 3000)
npm run dev

# Start on different port
npm run dev -- --port 3001

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Dependencies
```bash
# Install all dependencies
npm install

# Add new package
npm install [package-name]

# Add dev dependency
npm install -D [package-name]

# Update dependencies
npm update
```

### Git Operations
```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "message"

# Push to GitHub
git push origin main

# Create new branch
git checkout -b branch-name
```

---

## 📁 File Structure Overview

```
DragonTap 4.5/
├── src/
│   ├── App.jsx              ← Main application (600+ lines)
│   ├── index.js             ← Entry point
│   ├── styles/
│   │   └── index.css        ← Tailwind imports
│   └── utils/
│       ├── api.js           ← MongoDB integration
│       └── telegram.js      ← Telegram SDK
├── public/
│   ├── index.html           ← HTML template
│   └── assets/images/       ← Add artwork here
├── Version Control/
│   └── VERSION_1.0.0.md     ← This version's docs
├── .env                     ← API keys (DON'T COMMIT)
├── package.json             ← Dependencies
├── vite.config.js           ← Build config
├── tailwind.config.js       ← Styling config
└── README.md                ← User documentation
```

---

## 🔑 Key Files to Edit

### 1. Main Application (`src/App.jsx`)
**Contains:** All game logic, UI, state management  
**Lines:** ~600  
**State Variables:**
- `coins` - Total coins earned
- `energy` - Current energy (0-500)
- `level` - Player level
- `dailyStreak` - Daily reward streak
- `activeTab` - Current navigation tab
- `showOnboarding` - First-time user flag

**Key Functions:**
- `handleTap()` - Tap mechanics
- `openLootbox()` - Lootbox rewards
- `claimDailyReward()` - Daily rewards
- `completeOnboarding()` - Tutorial completion

### 2. MongoDB API (`src/utils/api.js`)
**Functions Available:**
- `createUser(userData)`
- `getUser(userId)`
- `updateUser(userId, updates)`
- `saveProgress(userId, progressData)`
- `getLeaderboard(type, limit)`
- `syncWithMongoDB(userId, localData)`

**Status:** Ready but not connected (needs MongoDB App ID)

### 3. Telegram SDK (`src/utils/telegram.js`)
**Functions Available:**
- `initTelegramWebApp()`
- `getTelegramUser()`
- `hapticFeedback(type)`
- `shareApp(referralCode)`
- `getStartParameter()`

**Status:** Ready but not tested in Telegram

---

## 🎮 Game Mechanics Reference

### Energy System
- Base capacity: 500
- Regeneration: 1 per second
- Cost per tap: 1 energy
- Refill methods: Natural regen, ads (future), purchase (future)

### Tap Mechanics
- Base value: 1 coin per tap
- Requires: 1 energy
- Animation: Floating +1 text, fades in 1 second
- Upgrades: Tap power (future), crit chance (future)

### Daily Rewards
- Day 1-9: Increasing coin rewards
- Day 10: 5,000,000 coins (mega reward)
- Reset: If missed a day
- Persistence: Stored in localStorage

### Lootboxes
- Common: 1,000 coins + 1 ticket (9,000₫)
- Rare: 5,000 coins + 2 tickets (79,000₫)
- Epic: 20,000 coins + 5 tickets
- Legendary: 100,000 coins + 10 tickets

### LocalStorage
- Key: `'dragonTapData'`
- Data: `{coins, energy, level, dailyStreak, gems, lastLogin, hasSeenOnboarding}`
- Auto-save: On every state change

---

## 🐛 Common Issues & Solutions

### Issue: Port 3000 already in use
```bash
# Solution 1: Use different port
npm run dev -- --port 3001

# Solution 2: Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: Dependencies won't install
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails
```bash
# Check for syntax errors
npm run lint

# Clean build
rm -rf dist
npm run build
```

### Issue: Changes not reflecting
```bash
# Hard refresh in browser
# macOS: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Restart dev server
# Ctrl + C (stop)
npm run dev
```

---

## 📝 Making Changes

### Adding a New Feature
1. Open `src/App.jsx`
2. Add state if needed: `const [newState, setNewState] = useState(defaultValue);`
3. Add function logic
4. Update UI in return statement
5. Test locally
6. Commit changes

### Connecting MongoDB
1. Get MongoDB App ID from Atlas
2. Update `.env`: `VITE_MONGODB_APP_ID=data-xxxxx`
3. In `src/App.jsx`, import: `import api from './utils/api';`
4. Call functions: `await api.syncWithMongoDB(userId, gameData);`
5. Test connection

### Adding New Translation
1. Open `src/App.jsx`
2. Find `translations` object
3. Add to both `en` and `vi`:
```javascript
const translations = {
  en: { newKey: "English text" },
  vi: { newKey: "Vietnamese text" }
};
```
4. Use: `{t.newKey}`

### Replacing Emoji with Image
1. Add image to `public/assets/images/`
2. Find emoji in code (e.g., search for "🐉")
3. Replace with:
```jsx
<img src="/assets/images/dragon.png" alt="Dragon" className="w-72 h-72" />
```

---

## 🧪 Testing Checklist

Before committing code:
- [ ] `npm run dev` works without errors
- [ ] All tabs navigate correctly
- [ ] Tap functionality works
- [ ] Energy regenerates
- [ ] LocalStorage persists on refresh
- [ ] Daily rewards can be claimed
- [ ] Lootboxes open correctly
- [ ] Language switcher works
- [ ] Responsive on mobile (use browser dev tools)
- [ ] No console errors

---

## 📊 Important Constants

### File Paths
- Main app: `src/App.jsx`
- Entry: `src/index.js`
- Styles: `src/styles/index.css`
- MongoDB: `src/utils/api.js`
- Telegram: `src/utils/telegram.js`
- HTML: `public/index.html`
- Assets: `public/assets/images/`

### State Keys
- LocalStorage: `'dragonTapData'`
- Active tab values: `'friends'`, `'tasks'`, `'tap'`, `'rating'`, `'games'`
- Language values: `'en'`, `'vi'`

### Configuration
- Dev port: 3000
- Max energy: 500
- Energy regen: 1/second
- Base tap power: 1
- Initial gems: 1615

---

## 🔄 Version Control Workflow

### When Starting New Version
1. Read previous version notes in `Version Control/`
2. Create new version file: `VERSION_X.X.X.md`
3. Document changes as you make them
4. Update version in `package.json`

### When Completing Version
1. Update `VERSION_X.X.X.md` with final status
2. List all changes made
3. Document any new issues
4. Plan next version features
5. Commit with message: "Release vX.X.X"

---

## 🎯 Next Version (1.1.0) Priority Tasks

1. **MongoDB Connection**
   - Update `.env` with App ID
   - Test API functions in `src/utils/api.js`
   - Implement sync on app load
   - Add error handling

2. **Telegram Integration**
   - Test in Telegram app
   - Implement haptic feedback
   - Add user authentication
   - Test share functionality

3. **Refactoring**
   - Split App.jsx into components
   - Create separate screen components
   - Extract game logic to hooks
   - Improve code organization

---

## 💡 Development Tips

1. **Use Browser DevTools**
   - Console for errors
   - Network tab for API calls
   - Application tab for LocalStorage
   - Device toolbar for mobile testing

2. **Keep Terminal Open**
   - Watch for errors
   - See console.log output
   - Hot reload notifications

3. **Test Frequently**
   - After each feature
   - Before committing
   - On different screen sizes

4. **Document Changes**
   - Update VERSION file
   - Add comments to complex code
   - Update README if needed

5. **Backup Before Major Changes**
   ```bash
   git add .
   git commit -m "Backup before [change]"
   ```

---

## 📞 Quick Help

- **Full docs:** `README.md`
- **Asset guide:** `ASSETS.md`
- **Setup guide:** `SETUP.md`
- **Version history:** `Version Control/VERSION_1.0.0.md`
- **Project status:** `PROJECT_COMPLETE.md`

---

**Last Updated:** October 3, 2025  
**Current Version:** 1.0.0  
**For:** Claude Code Terminal Access
