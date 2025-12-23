# 🌈 Water Sort Puzzle

A mobile-first color sorting puzzle game built with **TypeScript + React + Vite**.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Tests](https://img.shields.io/badge/tests-34%20passed-success)

## 🎮 Game Overview

Water Sort Puzzle is a relaxing color sorting game where you pour colored layers between bottles until each bottle contains only one color or is empty. The game features:

- **35 levels** with progressive difficulty (easy → hard)
- **Pure game logic** separated from UI (reusable in other contexts)
- **Accessibility features** (color-blind mode, reduced motion)
- **Mobile-first design** with touch-optimized controls
- **Local persistence** for progress and settings

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 How to Play

1. **Tap a bottle** to select it (highlighted with golden glow)
2. **Tap another bottle** to pour from the first into the second
3. **Rules:**
   - Can only pour onto matching colors or empty bottles
   - Can't pour into full bottles
   - Maximum contiguous block of same color pours at once
4. **Win condition:** All bottles either empty or completely full with one color

## 🎯 Features

### Core Game Mechanics
- ✅ **4-layer bottles** with discrete color tokens
- ✅ **Smart pouring** - automatically pours maximum contiguous block
- ✅ **Undo/Redo** - complete move history with reversible operations
- ✅ **Win detection** - automatic level completion
- ✅ **Move counter** - track your efficiency
- ✅ **Best moves** - compare against your personal best

### Levels & Progression
- ✅ **35 levels total**
  - 15 handcrafted levels
  - 20 procedurally generated levels
- ✅ **Progressive difficulty**
  - Easy: 2-3 colors, 4-5 bottles
  - Medium: 4-5 colors, 5-7 bottles
  - Hard: 6-8 colors, 7-9 bottles
- ✅ **Level unlocking** - beat a level to unlock the next
- ✅ **Level generator** - deterministic seeded generator for endless play

### User Experience
- ✅ **Touch-optimized** - minimum 48px touch targets
- ✅ **Responsive layout** - works on phones, tablets, and desktop
- ✅ **Pour animations** - smooth 300ms transitions (can be disabled)
- ✅ **Visual feedback** - selection glow, invalid move shake
- ✅ **Win overlay** - celebration screen with next level/replay options
- ✅ **Settings panel** - customize your experience

### Accessibility
- ✅ **Color-blind mode** - pattern overlays on colors (/, \, x, +, o, -, |)
- ✅ **Reduced motion** - instant state updates for motion sensitivity
- ✅ **Semantic HTML** - proper ARIA labels and roles
- ✅ **Keyboard navigation** - full keyboard support
- ✅ **Sound toggle** - prepared for future sound effects

### Technical Excellence
- ✅ **Pure logic layer** - no React dependencies in game logic
- ✅ **Type-safe** - full TypeScript coverage with strict mode
- ✅ **34 comprehensive tests** - 100% pass rate
- ✅ **Immutable operations** - all state changes return new objects
- ✅ **Local persistence** - progress saved to localStorage
- ✅ **Small bundle** - ~50KB gzipped

## 🏗️ Project Structure

```
src/
├── logic/              # Pure game logic (no React)
│   ├── types.ts        # Type definitions (ColorId, Board, MoveRecord, etc.)
│   ├── rules.ts        # Game rules (canPour, pour, undo, isSolved, etc.)
│   ├── rules.test.ts   # 34 comprehensive tests
│   └── generator.ts    # Level generator with seeded randomness
├── levels/
│   └── levels.ts       # 35 prebuilt levels + level utilities
├── storage/
│   └── storage.ts      # LocalStorage persistence layer
├── ui/                 # React components
│   ├── BoardView.tsx   # Game board container
│   ├── BottleView.tsx  # Individual bottle with patterns
│   ├── WinOverlay.tsx  # Victory screen
│   ├── SettingsPanel.tsx   # Settings modal
│   └── LevelSelect.tsx     # Level selection screen
├── App.tsx             # Main application component
├── main.tsx            # React entry point
└── index.css           # Global styles with CSS variables
```

## 🧪 Testing

The game includes 34 comprehensive unit tests covering:

- Pour mechanics (empty, matching colors, capacity limits)
- Invalid move detection
- Undo/redo operations
- Win condition detection
- Color count preservation (invariants)
- Legal move enumeration
- Board immutability

```bash
npm test           # Run tests once
npm run test:watch # Run tests in watch mode
```

## 🎨 Technology Stack

- **TypeScript 5.2** - Type safety and better DX
- **React 18.2** - UI framework
- **Vite 5.0** - Fast build tool and dev server
- **Vitest 1.0** - Unit testing framework
- **CSS3** - Styling with CSS variables and animations

## 📱 Mobile Optimization

- **Viewport settings** - Proper meta tags for mobile browsers
- **Safe area insets** - Handles notches and home indicators
- **Touch gestures** - No hover-only interactions
- **Responsive grid** - Auto-adjusts columns based on screen width
- **Performance** - Hardware-accelerated CSS animations
- **Orientation** - Works in both portrait and landscape

## 🎮 Game Logic API

The pure logic layer can be imported and used independently:

```typescript
import { canPour, pour, undo, isSolved, getLegalMoves } from './logic/rules';

// Check if a pour is legal
const isLegal = canPour(board, capacity, sourceIndex, targetIndex);

// Perform a pour
const { board: newBoard, move } = pour(board, capacity, sourceIndex, targetIndex);

// Undo a move
const previousBoard = undo(currentBoard, move);

// Check if puzzle is solved
const won = isSolved(board, capacity);

// Get all legal moves
const moves = getLegalMoves(board, capacity);
```

## 🔧 Configuration

### Capacity
Default bottle capacity is 4 layers. This can be changed per level in `levels.ts`.

### Colors
Colors are defined as strings (ColorId). Predefined colors include:
- red (#ef4444)
- blue (#3b82f6)
- green (#22c55e)
- yellow (#eab308)
- purple (#a855f7)
- orange (#f97316)
- pink (#ec4899)
- color0-color8 (for generated levels)

### CSS Variables
Customize the theme in `index.css`:
```css
:root {
  --primary-color: #3b82f6;
  --bg-color: #0f172a;
  --bottle-width: 70px;
  --bottle-height: 200px;
  /* ... more variables */
}
```

## 🚢 Deployment

The game is a static site that can be deployed anywhere:

```bash
npm run build
# Upload dist/ folder to your host
```

Compatible with:
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting

## 🤝 Contributing

This is a complete, production-ready implementation. Future enhancements could include:

- Sound effects (toggle already in place)
- Hint system (getLegalMoves already implemented)
- Daily challenges
- Move limit per level
- Star rating system
- Social sharing

## 📄 License

MIT License - feel free to use this code for learning or your own projects.

## 🙏 Acknowledgments

Built as a demonstration of:
- Clean architecture with separated concerns
- Type-safe game logic
- Accessible UI design
- Mobile-first responsive development
- Comprehensive testing practices

---

**Enjoy the game! 🎉**