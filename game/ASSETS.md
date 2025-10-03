# 🎨 Asset Replacement Guide

## Current Status: Emoji Placeholders

The app is fully functional but uses emoji placeholders. This guide shows you exactly what to replace and where.

## 📋 Asset List

### Priority 1 - High Impact (Replace First)

| Asset | Current | Location in Code | Recommended Size | Format |
|-------|---------|------------------|------------------|--------|
| Dragon Character | 🐉 | `src/App.jsx` line ~280 | 512x512px | PNG/SVG |
| Coin Icon | 🪙 | Multiple locations | 64x64px | PNG |
| Gem Icon | 💎 | Multiple locations | 64x64px | PNG |
| Common Lootbox | 📦 | `src/App.jsx` lootbox section | 256x256px | PNG |
| Rare Lootbox | 📦 | `src/App.jsx` lootbox section | 256x256px | PNG |
| Epic Lootbox | 📦 | `src/App.jsx` lootbox section | 256x256px | PNG |
| Legendary Lootbox | 📦 | `src/App.jsx` lootbox section | 256x256px | PNG |

### Priority 2 - Medium Impact

| Asset | Current | Recommended Size |
|-------|---------|------------------|
| Gift Icon | 🎁 | 128x128px |
| Ticket Icon | 🎫 | 64x64px |
| Energy Icon | ⚡ | 48x48px |
| Trophy Icon | 🏆 | 128x128px |

## 🔍 Find & Replace Instructions

### Step 1: Add Assets to Project

Place your assets in:
```
public/assets/images/
├── dragon-character.png
├── coin-icon.png
├── gem-icon.png
├── lootbox-common.png
├── lootbox-rare.png
├── lootbox-epic.png
└── lootbox-legendary.png
```

### Step 2: Replace in Code

#### Dragon Character
**Find:**
```jsx
<div className="relative w-full h-full flex items-center justify-center text-9xl">🐉</div>
```

**Replace with:**
```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <img src="/assets/images/dragon-character.png" alt="Dragon" className="w-72 h-72" />
</div>
```

#### Coin Icon
**Find:** `🪙` (appears multiple times)

**Replace with:**
```jsx
<img src="/assets/images/coin-icon.png" alt="Coin" className="w-6 h-6" />
```

#### Gem Icon
**Find:** `💎`

**Replace with:**
```jsx
<img src="/assets/images/gem-icon.png" alt="Gem" className="w-6 h-6" />
```

#### Lootboxes
**Find:**
```jsx
<div className="text-6xl mb-4">📦</div>
```

**Replace with:**
```jsx
<div className="mb-4">
  <img src="/assets/images/lootbox-common.png" alt="Lootbox" className="w-24 h-24 mx-auto" />
</div>
```

(Use appropriate lootbox image: common, rare, epic, legendary)

## 📐 Asset Specifications

### Dragon Character
- Size: 512x512px
- Format: PNG with transparency
- Style: Vibrant, mythical, Vietnamese dragon inspired
- Animation frames (optional): 3-5 frames for idle animation

### Coins & Gems
- Size: 64x64px
- Format: PNG with transparency
- Style: Glossy, 3D effect
- Should be easily distinguishable

### Lootboxes
- Size: 256x256px
- Format: PNG with transparency
- Variations:
  - Common: Gray/Silver theme
  - Rare: Blue theme
  - Epic: Purple/Pink theme
  - Legendary: Gold/Orange theme

## 🎨 Design Guidelines

### Color Palette
- Primary: Gold (#FFD700), Orange (#FF8C00)
- Accent: Red (#DC143C)
- Background: Dark Gray (#111827), Black (#000000)
- Success: Green (#10B981)
- Rare: Blue (#3B82F6)
- Epic: Purple (#A855F7)
- Legendary: Gold gradient

### Style Recommendations
- Keep consistent with dark theme
- Use vibrant colors for interactive elements
- Add subtle glow effects for premium items
- Maintain clear silhouettes for mobile visibility

## 🔧 Image Optimization

Before adding to project:
1. Compress images (use TinyPNG or similar)
2. Convert to WebP format for better performance
3. Keep under 200KB per image
4. Ensure transparency is properly set

## 📝 Naming Convention

Use descriptive, lowercase names with hyphens:
- ✅ `dragon-character.png`
- ✅ `lootbox-legendary.png`
- ❌ `DragonChar.png`
- ❌ `box1.png`

## 🚀 After Replacement

1. Test on mobile devices
2. Check image loading performance
3. Verify transparency works correctly
4. Ensure images scale properly
5. Test on different screen sizes

## 📦 Asset Delivery Format

If commissioning artwork, request:
- Original files (.AI, .PSD, .SKETCH)
- Exported PNGs at 2x resolution (@2x)
- SVG versions where applicable
- Asset pack with all variations

---

**Need Help?** Check the [README.md](./README.md) for complete setup instructions.
