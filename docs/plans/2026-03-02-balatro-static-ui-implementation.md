# Balatro Static UI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static visual replica of the Balatro card game with four screens (Main Menu, Blind Select, Game, Shop) using React Router, with no interaction logic.

**Architecture:** React Router v7 provides four routes; each route renders a Page component that composes smaller sub-components. All data is hardcoded mock values. Cards are drawn with CSS and Unicode suit symbols (no external sprite assets needed).

**Tech Stack:** React 19, TypeScript, Vite 8, TailwindCSS v4, React Router v7, Press Start 2P (Google Font)

---

## Task 1: Install Dependencies & Global Setup

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`
- Modify: `package.json` (via npm install)

**Step 1: Install React Router**

```bash
npm install react-router-dom
```

Expected: package-lock.json updated, react-router-dom listed in dependencies.

**Step 2: Add Press Start 2P font to `index.html`**

Add inside `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
```

**Step 3: Update `src/index.css` global styles**

Replace entire file content with:
```css
@import "tailwindcss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  height: 100%;
  background-color: #1a0a2e;
}

body {
  font-family: 'Press Start 2P', monospace;
  color: #ffffff;
  overflow: hidden;
}

/* Gold text glow utility */
.text-gold {
  color: #f5c842;
}

.glow-gold {
  text-shadow: 0 0 10px #f5c842, 0 0 20px #f5c842;
}

.glow-red {
  text-shadow: 0 0 10px #e03030, 0 0 20px #e03030;
  box-shadow: 0 0 10px #e03030;
}

.border-gold {
  border-color: #f5c842;
}

/* Fixed 1280x720 game viewport */
.game-viewport {
  width: 1280px;
  height: 720px;
  position: relative;
  overflow: hidden;
  background-color: #1a0a2e;
}
```

**Step 4: Delete `src/App.css`** (no longer needed)

```bash
rm src/App.css
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: install react-router-dom, add global styles and Press Start 2P font"
```

---

## Task 2: Router Configuration & App Entry

**Files:**
- Modify: `src/App.tsx`
- Create: `src/router.tsx`

**Step 1: Create `src/router.tsx`**

```tsx
import { createBrowserRouter } from 'react-router-dom'
import MainMenu from './pages/MainMenu/MainMenu'
import BlindSelect from './pages/BlindSelect/BlindSelect'
import Game from './pages/Game/Game'
import Shop from './pages/Shop/Shop'

export const router = createBrowserRouter([
  { path: '/', element: <MainMenu /> },
  { path: '/blind-select', element: <BlindSelect /> },
  { path: '/game', element: <Game /> },
  { path: '/shop', element: <Shop /> },
])
```

**Step 2: Replace `src/App.tsx`**

```tsx
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export default function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#0d0018]">
      <div className="game-viewport">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}
```

**Step 3: Create stub page files** (empty stubs so router doesn't error)

Create `src/pages/MainMenu/MainMenu.tsx`:
```tsx
export default function MainMenu() {
  return <div className="w-full h-full flex items-center justify-center text-white">Main Menu</div>
}
```

Create `src/pages/BlindSelect/BlindSelect.tsx`:
```tsx
export default function BlindSelect() {
  return <div className="w-full h-full flex items-center justify-center text-white">Blind Select</div>
}
```

Create `src/pages/Game/Game.tsx`:
```tsx
export default function Game() {
  return <div className="w-full h-full flex items-center justify-center text-white">Game</div>
}
```

Create `src/pages/Shop/Shop.tsx`:
```tsx
export default function Shop() {
  return <div className="w-full h-full flex items-center justify-center text-white">Shop</div>
}
```

**Step 4: Run dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:5173/` — should show "Main Menu" text.
Visit `http://localhost:5173/game` — should show "Game" text.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add React Router config with four page stubs"
```

---

## Task 3: Shared Card Component

**Files:**
- Create: `src/components/Card.tsx`

The Card component renders a playing card purely with CSS and Unicode. It accepts rank (e.g. `"A"`, `"K"`, `"10"`) and suit (`"♠"`,`"♥"`,`"♦"`,`"♣"`).

**Step 1: Create `src/components/Card.tsx`**

```tsx
interface CardProps {
  rank: string
  suit: '♠' | '♥' | '♦' | '♣'
  faceDown?: boolean
  selected?: boolean
  small?: boolean
}

const redSuits = new Set(['♥', '♦'])

export default function Card({ rank, suit, faceDown = false, selected = false, small = false }: CardProps) {
  const isRed = redSuits.has(suit)
  const suitColor = isRed ? '#e03030' : '#1a1a2e'
  const width = small ? 52 : 70
  const height = small ? 73 : 98

  if (faceDown) {
    return (
      <div
        style={{ width, height }}
        className="rounded-lg border-2 border-[#3a2060] bg-[#2a1050] flex items-center justify-center flex-shrink-0"
      >
        <div className="w-3/4 h-3/4 border border-[#5a3090] rounded" />
      </div>
    )
  }

  return (
    <div
      style={{ width, height, outline: selected ? '2px solid #f5c842' : 'none', outlineOffset: 2 }}
      className={`
        rounded-lg border-2 border-[#cccccc] bg-white flex flex-col justify-between p-1 flex-shrink-0
        ${selected ? '-translate-y-2' : ''}
        transition-transform duration-100
      `}
    >
      {/* Top-left rank + suit */}
      <div className="flex flex-col items-start leading-none" style={{ color: suitColor, fontSize: small ? 9 : 11, fontFamily: 'monospace' }}>
        <span className="font-bold">{rank}</span>
        <span>{suit}</span>
      </div>
      {/* Center suit */}
      <div className="flex items-center justify-center" style={{ color: suitColor, fontSize: small ? 20 : 28 }}>
        {suit}
      </div>
      {/* Bottom-right rank + suit (rotated) */}
      <div className="flex flex-col items-end leading-none rotate-180" style={{ color: suitColor, fontSize: small ? 9 : 11, fontFamily: 'monospace' }}>
        <span className="font-bold">{rank}</span>
        <span>{suit}</span>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/Card.tsx
git commit -m "feat: add shared Card component with CSS-drawn playing cards"
```

---

## Task 4: Shared JokerCard Component

**Files:**
- Create: `src/components/JokerCard.tsx`

**Step 1: Create `src/components/JokerCard.tsx`**

```tsx
interface JokerCardProps {
  name?: string
  empty?: boolean
}

export default function JokerCard({ name, empty = false }: JokerCardProps) {
  if (empty) {
    return (
      <div className="w-[80px] h-[80px] rounded-lg border-2 border-dashed border-[#3a2060] bg-[#1a0a2e] flex items-center justify-center flex-shrink-0">
        <span className="text-[#3a2060] text-[10px]">+</span>
      </div>
    )
  }

  return (
    <div className="w-[80px] h-[80px] rounded-lg border-2 border-[#f5c842] bg-[#2a1050] flex flex-col items-center justify-center gap-1 flex-shrink-0 p-1">
      {/* Joker icon placeholder */}
      <div className="w-10 h-10 rounded-full bg-[#3a2060] flex items-center justify-center text-[#f5c842] text-lg">
        🃏
      </div>
      {name && (
        <span className="text-[7px] text-[#f5c842] text-center leading-tight line-clamp-2">{name}</span>
      )}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/JokerCard.tsx
git commit -m "feat: add shared JokerCard component"
```

---

## Task 5: Main Menu Page

**Files:**
- Modify: `src/pages/MainMenu/MainMenu.tsx`

**Step 1: Replace `src/pages/MainMenu/MainMenu.tsx`**

```tsx
import { Link } from 'react-router-dom'

export default function MainMenu() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-8"
      style={{ background: 'radial-gradient(ellipse at center, #3a0a5e 0%, #1a0a2e 60%, #0d0018 100%)' }}
    >
      {/* Title */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <h1
          className="text-[64px] glow-gold"
          style={{ color: '#f5c842', fontFamily: "'Press Start 2P', monospace", letterSpacing: '0.05em' }}
        >
          BALATRO
        </h1>
        <p style={{ color: '#a080d0', fontSize: 10, fontFamily: "'Press Start 2P', monospace" }}>
          open-source web edition
        </p>
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col items-center gap-4">
        <MenuButton to="/blind-select" label="New Run" primary />
        <MenuButton to="/game" label="Continue" />
        <MenuButton to="/" label="Options" />
      </div>

      {/* Version */}
      <p
        className="absolute bottom-6"
        style={{ color: '#5a4070', fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
      >
        v0.0.1-dev
      </p>
    </div>
  )
}

function MenuButton({ to, label, primary }: { to: string; label: string; primary?: boolean }) {
  return (
    <Link
      to={to}
      className={`
        w-64 py-3 text-center rounded border-2 transition-all duration-150
        hover:bg-[#f5c842] hover:text-[#1a0a2e]
        ${primary
          ? 'border-[#f5c842] text-[#f5c842] bg-[#2a1050]'
          : 'border-[#5a3090] text-[#a080d0] bg-[#1a0a2e]'
        }
      `}
      style={{ fontSize: 12, fontFamily: "'Press Start 2P', monospace" }}
    >
      {label}
    </Link>
  )
}
```

**Step 2: Verify in browser**

Visit `http://localhost:5173/` — should show Balatro title with gold glow and three menu buttons.

**Step 3: Commit**

```bash
git add src/pages/MainMenu/MainMenu.tsx
git commit -m "feat: implement Main Menu page"
```

---

## Task 6: Blind Select Page

**Files:**
- Modify: `src/pages/BlindSelect/BlindSelect.tsx`

**Step 1: Replace `src/pages/BlindSelect/BlindSelect.tsx`**

```tsx
import { Link } from 'react-router-dom'

const BLINDS = [
  {
    id: 'small',
    name: 'Small Blind',
    target: 300,
    reward: 3,
    description: 'No special effect',
    color: '#a0c040',
    boss: false,
  },
  {
    id: 'big',
    name: 'Big Blind',
    target: 900,
    reward: 4,
    description: 'No special effect',
    color: '#f5c842',
    boss: false,
  },
  {
    id: 'boss',
    name: 'The Wall',
    target: 2000,
    reward: 5,
    description: 'All played cards have -1 Hand Size',
    color: '#e03030',
    boss: true,
  },
]

export default function BlindSelect() {
  return (
    <div
      className="w-full h-full flex flex-col items-center"
      style={{ background: 'radial-gradient(ellipse at center, #2a0a4e 0%, #1a0a2e 100%)' }}
    >
      {/* Header */}
      <div className="mt-12 mb-10 flex flex-col items-center gap-2">
        <p style={{ color: '#a080d0', fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}>ANTE 1 / 8</p>
        <h2 style={{ color: '#f5c842', fontSize: 20, fontFamily: "'Press Start 2P', monospace" }}>
          Select Blind
        </h2>
      </div>

      {/* Blind Cards */}
      <div className="flex gap-8 items-start">
        {BLINDS.map((blind) => (
          <BlindCard key={blind.id} blind={blind} />
        ))}
      </div>

      {/* Back */}
      <Link
        to="/"
        className="absolute bottom-8 left-8 text-[#5a4070] hover:text-[#a080d0]"
        style={{ fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}
      >
        ← Back
      </Link>
    </div>
  )
}

function BlindCard({ blind }: { blind: typeof BLINDS[0] }) {
  return (
    <div
      className={`flex flex-col items-center gap-4 p-6 rounded-xl border-2 w-[220px] ${blind.boss ? 'glow-red' : ''}`}
      style={{
        borderColor: blind.color,
        backgroundColor: blind.boss ? '#2a0808' : '#1e0a38',
      }}
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2"
        style={{ borderColor: blind.color, backgroundColor: blind.boss ? '#3a0808' : '#2a1050' }}
      >
        {blind.boss ? '💀' : '🎯'}
      </div>

      {/* Name */}
      <h3 style={{ color: blind.color, fontSize: 10, fontFamily: "'Press Start 2P', monospace", textAlign: 'center' }}>
        {blind.name}
      </h3>

      {/* Target */}
      <div className="flex flex-col items-center gap-1">
        <p style={{ color: '#a080d0', fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}>Score at least</p>
        <p style={{ color: '#ffffff', fontSize: 16, fontFamily: "'Press Start 2P', monospace" }}>
          {blind.target.toLocaleString()}
        </p>
      </div>

      {/* Description */}
      {blind.boss && (
        <p style={{ color: '#e07070', fontSize: 7, fontFamily: "'Press Start 2P', monospace", textAlign: 'center', lineHeight: 1.6 }}>
          {blind.description}
        </p>
      )}

      {/* Reward */}
      <div className="flex items-center gap-1">
        <span style={{ fontSize: 8, color: '#a080d0', fontFamily: "'Press Start 2P', monospace" }}>Reward:</span>
        <span style={{ fontSize: 10, color: '#f5c842', fontFamily: "'Press Start 2P', monospace" }}>${blind.reward}</span>
      </div>

      {/* Select Button */}
      <Link
        to="/game"
        className="w-full py-2 text-center rounded border-2 hover:opacity-80 transition-opacity"
        style={{
          borderColor: blind.color,
          color: blind.color,
          fontSize: 9,
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        Select
      </Link>

      {/* Skip (non-boss only) */}
      {!blind.boss && (
        <button
          style={{ color: '#5a4070', fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
          className="hover:text-[#a080d0] transition-colors"
        >
          Skip →
        </button>
      )}
    </div>
  )
}
```

**Step 2: Verify in browser**

Visit `http://localhost:5173/blind-select` — three blind cards visible, boss blind has red glow.

**Step 3: Commit**

```bash
git add src/pages/BlindSelect/BlindSelect.tsx
git commit -m "feat: implement Blind Select page"
```

---

## Task 7: Game Page — Layout Skeleton & ScorePanel

**Files:**
- Modify: `src/pages/Game/Game.tsx`
- Create: `src/pages/Game/components/ScorePanel.tsx`

**Step 1: Create `src/pages/Game/components/ScorePanel.tsx`**

```tsx
export default function ScorePanel() {
  return (
    <div
      className="flex flex-col items-center gap-3 p-4 rounded-lg border border-[#3a2060] bg-[#150828]"
      style={{ width: 180, height: '100%' }}
    >
      {/* Blind name */}
      <div className="flex flex-col items-center gap-1">
        <p style={{ color: '#a080d0', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>BLIND</p>
        <p style={{ color: '#f5c842', fontSize: 9, fontFamily: "'Press Start 2P', monospace", textAlign: 'center' }}>
          Small Blind
        </p>
      </div>

      <hr className="w-full border-[#3a2060]" />

      {/* Score target */}
      <div className="flex flex-col items-center gap-1">
        <p style={{ color: '#a080d0', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>SCORE AT LEAST</p>
        <p style={{ color: '#ffffff', fontSize: 14, fontFamily: "'Press Start 2P', monospace" }}>300</p>
      </div>

      {/* Current score */}
      <div
        className="flex flex-col items-center gap-1 w-full py-3 rounded-lg border border-[#f5c842]"
        style={{ background: '#1e1040' }}
      >
        <p style={{ color: '#a080d0', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>ROUND SCORE</p>
        <p style={{ color: '#f5c842', fontSize: 20, fontFamily: "'Press Start 2P', monospace" }}>0</p>
      </div>

      <hr className="w-full border-[#3a2060]" />

      {/* Coins */}
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 16 }}>🪙</span>
        <span style={{ color: '#f5c842', fontSize: 14, fontFamily: "'Press Start 2P', monospace" }}>$4</span>
      </div>

      {/* Ante info */}
      <div className="mt-auto flex flex-col items-center gap-1">
        <p style={{ color: '#5a4070', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>ANTE 1/8</p>
        <p style={{ color: '#5a4070', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>ROUND 1</p>
      </div>
    </div>
  )
}
```

**Step 2: Replace `src/pages/Game/Game.tsx` with layout skeleton**

```tsx
import ScorePanel from './components/ScorePanel'

export default function Game() {
  return (
    <div className="w-full h-full flex flex-col bg-[#1a0a2e]">
      {/* Top bar: Joker slots + consumables */}
      <div className="flex items-center px-4 py-2 bg-[#0d0018] border-b border-[#3a2060] h-[100px]">
        <span style={{ color: '#5a4070', fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}>
          [JokerBar — Task 8]
        </span>
      </div>

      {/* Middle: ScorePanel + PlayArea + RoundInfo */}
      <div className="flex flex-1 gap-3 p-3 overflow-hidden">
        <ScorePanel />

        {/* Play Area */}
        <div className="flex-1 flex flex-col items-center justify-center rounded-lg border border-[#3a2060] bg-[#150828]">
          <span style={{ color: '#5a4070', fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}>
            [PlayArea — Task 9]
          </span>
        </div>

        {/* Right: HandType + RoundInfo */}
        <div
          className="flex flex-col items-center justify-between rounded-lg border border-[#3a2060] bg-[#150828] p-4"
          style={{ width: 160 }}
        >
          <span style={{ color: '#5a4070', fontSize: 9, fontFamily: "'Press Start 2P', monospace", textAlign: 'center' }}>
            [HandType + RoundInfo — Task 10]
          </span>
        </div>
      </div>

      {/* Bottom: Hand + Action buttons */}
      <div className="flex flex-col items-center px-4 pb-3 bg-[#0d0018] border-t border-[#3a2060]">
        <div className="flex items-center justify-center h-[120px]">
          <span style={{ color: '#5a4070', fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}>
            [HandArea — Task 11]
          </span>
        </div>
        <div className="flex gap-8">
          <span style={{ color: '#5a4070', fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}>
            [ActionButtons — Task 12]
          </span>
        </div>
      </div>
    </div>
  )
}
```

**Step 3: Verify in browser**

Visit `http://localhost:5173/game` — ScorePanel visible on left, placeholder text for other areas.

**Step 4: Commit**

```bash
git add src/pages/Game/
git commit -m "feat: add Game page layout skeleton and ScorePanel"
```

---

## Task 8: Game Page — JokerBar

**Files:**
- Create: `src/pages/Game/components/JokerBar.tsx`
- Modify: `src/pages/Game/Game.tsx`

**Step 1: Create `src/pages/Game/components/JokerBar.tsx`**

```tsx
import JokerCard from '../../../components/JokerCard'

const MOCK_JOKERS = [
  { name: 'Joker' },
  { name: 'Greedy Joker' },
  { name: 'Wrathful Joker' },
]

const TOTAL_SLOTS = 5

export default function JokerBar() {
  return (
    <div className="flex items-center gap-3 flex-1">
      <p style={{ color: '#a080d0', fontSize: 8, fontFamily: "'Press Start 2P', monospace", marginRight: 8 }}>
        JOKERS
      </p>
      {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
        const joker = MOCK_JOKERS[i]
        return joker
          ? <JokerCard key={i} name={joker.name} />
          : <JokerCard key={i} empty />
      })}
    </div>
  )
}
```

**Step 2: Update top bar in `src/pages/Game/Game.tsx`**

Replace the top bar `<div>` content:
```tsx
{/* Top bar: Joker slots + consumables */}
<div className="flex items-center justify-between px-4 py-2 bg-[#0d0018] border-b border-[#3a2060] h-[100px]">
  <JokerBar />
  <div className="flex flex-col items-end gap-1">
    <p style={{ color: '#a080d0', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>CONSUMABLES</p>
    <div className="flex gap-2">
      <div className="w-[52px] h-[52px] rounded border border-dashed border-[#3a2060] flex items-center justify-center">
        <span style={{ color: '#3a2060', fontSize: 18 }}>+</span>
      </div>
      <div className="w-[52px] h-[52px] rounded border border-dashed border-[#3a2060] flex items-center justify-center">
        <span style={{ color: '#3a2060', fontSize: 18 }}>+</span>
      </div>
    </div>
  </div>
</div>
```

Add import at top of Game.tsx:
```tsx
import JokerBar from './components/JokerBar'
```

**Step 3: Commit**

```bash
git add src/pages/Game/
git commit -m "feat: add JokerBar component to Game page"
```

---

## Task 9: Game Page — PlayArea & HandTypeDisplay & RoundInfo

**Files:**
- Create: `src/pages/Game/components/PlayArea.tsx`
- Create: `src/pages/Game/components/HandTypeDisplay.tsx`
- Create: `src/pages/Game/components/RoundInfo.tsx`
- Modify: `src/pages/Game/Game.tsx`

**Step 1: Create `src/pages/Game/components/PlayArea.tsx`**

```tsx
import Card from '../../../components/Card'

const PLAYED_CARDS = [
  { rank: 'A', suit: '♠' as const },
  { rank: 'A', suit: '♥' as const },
  { rank: 'A', suit: '♦' as const },
]

export default function PlayArea() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center rounded-lg border border-[#3a2060] bg-[#150828] gap-4">
      <p style={{ color: '#5a4070', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>PLAYED CARDS</p>
      <div className="flex gap-3 items-center">
        {PLAYED_CARDS.map((card, i) => (
          <Card key={i} rank={card.rank} suit={card.suit} />
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Create `src/pages/Game/components/HandTypeDisplay.tsx`**

```tsx
export default function HandTypeDisplay() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p style={{ color: '#a080d0', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>HAND</p>
      <p style={{ color: '#f5c842', fontSize: 11, fontFamily: "'Press Start 2P', monospace", textAlign: 'center', lineHeight: 1.5 }}>
        Three of a Kind
      </p>
      <div className="flex gap-2 mt-1">
        <div className="flex flex-col items-center">
          <span style={{ color: '#a080d0', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>×</span>
          <span style={{ color: '#ffffff', fontSize: 12, fontFamily: "'Press Start 2P', monospace" }}>30</span>
          <span style={{ color: '#5a4070', fontSize: 6, fontFamily: "'Press Start 2P', monospace" }}>chips</span>
        </div>
        <span style={{ color: '#f5c842', fontSize: 16, fontFamily: "'Press Start 2P', monospace", alignSelf: 'center' }}>×</span>
        <div className="flex flex-col items-center">
          <span style={{ color: '#a080d0', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>×</span>
          <span style={{ color: '#f5c842', fontSize: 12, fontFamily: "'Press Start 2P', monospace" }}>3</span>
          <span style={{ color: '#5a4070', fontSize: 6, fontFamily: "'Press Start 2P', monospace" }}>mult</span>
        </div>
      </div>
    </div>
  )
}
```

**Step 3: Create `src/pages/Game/components/RoundInfo.tsx`**

```tsx
interface InfoPillProps {
  label: string
  value: number
}

function InfoPill({ label, value }: InfoPillProps) {
  return (
    <div className="w-full flex flex-col items-center gap-1 py-2 rounded border border-[#3a2060] bg-[#1e1040]">
      <span style={{ color: '#a080d0', fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}>{label}</span>
      <span style={{ color: '#ffffff', fontSize: 16, fontFamily: "'Press Start 2P', monospace" }}>{value}</span>
    </div>
  )
}

export default function RoundInfo() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <InfoPill label="HANDS" value={4} />
      <InfoPill label="DISCARDS" value={3} />
    </div>
  )
}
```

**Step 4: Update right panel in `src/pages/Game/Game.tsx`**

Replace right panel `<div>` content and add imports:

```tsx
import HandTypeDisplay from './components/HandTypeDisplay'
import RoundInfo from './components/RoundInfo'
import PlayArea from './components/PlayArea'
```

Right panel:
```tsx
{/* Right: HandType + RoundInfo */}
<div
  className="flex flex-col items-center justify-between rounded-lg border border-[#3a2060] bg-[#150828] p-4"
  style={{ width: 160 }}
>
  <HandTypeDisplay />
  <RoundInfo />
</div>
```

Middle section:
```tsx
{/* Play Area */}
<PlayArea />
```

**Step 5: Commit**

```bash
git add src/pages/Game/
git commit -m "feat: add PlayArea, HandTypeDisplay, RoundInfo components"
```

---

## Task 10: Game Page — HandArea & ActionButtons

**Files:**
- Create: `src/pages/Game/components/HandArea.tsx`
- Create: `src/pages/Game/components/ActionButtons.tsx`
- Modify: `src/pages/Game/Game.tsx`

**Step 1: Create `src/pages/Game/components/HandArea.tsx`**

```tsx
import Card from '../../../components/Card'

const HAND_CARDS = [
  { rank: 'A', suit: '♠' as const, selected: true },
  { rank: 'K', suit: '♥' as const, selected: false },
  { rank: 'Q', suit: '♦' as const, selected: false },
  { rank: 'J', suit: '♣' as const, selected: false },
  { rank: '10', suit: '♠' as const, selected: true },
  { rank: '9', suit: '♥' as const, selected: true },
  { rank: '8', suit: '♦' as const, selected: false },
  { rank: '7', suit: '♣' as const, selected: false },
]

export default function HandArea() {
  return (
    <div className="flex items-end justify-center gap-1 px-4 h-[120px]">
      {HAND_CARDS.map((card, i) => (
        <Card key={i} rank={card.rank} suit={card.suit} selected={card.selected} small />
      ))}
    </div>
  )
}
```

**Step 2: Create `src/pages/Game/components/ActionButtons.tsx`**

```tsx
export default function ActionButtons() {
  return (
    <div className="flex gap-6 pb-2">
      <button
        className="px-8 py-3 rounded border-2 border-[#4060e0] bg-[#1a2060] text-white hover:bg-[#4060e0] transition-colors"
        style={{ fontSize: 10, fontFamily: "'Press Start 2P', monospace" }}
      >
        Play Hand
      </button>
      <button
        className="px-8 py-3 rounded border-2 border-[#e04040] bg-[#200a0a] text-[#e07070] hover:bg-[#401010] transition-colors"
        style={{ fontSize: 10, fontFamily: "'Press Start 2P', monospace" }}
      >
        Discard
      </button>
    </div>
  )
}
```

**Step 3: Update bottom section in `src/pages/Game/Game.tsx`**

Add imports:
```tsx
import HandArea from './components/HandArea'
import ActionButtons from './components/ActionButtons'
```

Replace bottom section:
```tsx
{/* Bottom: Hand + Action buttons */}
<div className="flex flex-col items-center bg-[#0d0018] border-t border-[#3a2060]">
  <HandArea />
  <ActionButtons />
</div>
```

**Step 4: Verify game page**

Visit `http://localhost:5173/game` — full game layout with jokers, score panel, play area, hand cards, and buttons.

**Step 5: Commit**

```bash
git add src/pages/Game/
git commit -m "feat: complete Game page with HandArea and ActionButtons"
```

---

## Task 11: Shop Page

**Files:**
- Modify: `src/pages/Shop/Shop.tsx`
- Create: `src/pages/Shop/components/ShopSlot.tsx`
- Create: `src/pages/Shop/components/PackSlot.tsx`

**Step 1: Create `src/pages/Shop/components/ShopSlot.tsx`**

```tsx
import JokerCard from '../../../components/JokerCard'

interface ShopSlotProps {
  name: string
  type: 'joker' | 'tarot' | 'planet'
  price: number
  empty?: boolean
}

const TYPE_COLORS: Record<string, string> = {
  joker: '#f5c842',
  tarot: '#c080f0',
  planet: '#40c0f0',
}

const TYPE_ICONS: Record<string, string> = {
  joker: '🃏',
  tarot: '🔮',
  planet: '🪐',
}

export default function ShopSlot({ name, type, price, empty = false }: ShopSlotProps) {
  if (empty) {
    return (
      <div className="flex flex-col items-center gap-2 opacity-40">
        <div className="w-[90px] h-[120px] rounded-lg border-2 border-dashed border-[#3a2060] bg-[#150828]" />
        <div className="w-16 h-6 rounded bg-[#1e1040] border border-[#3a2060]" />
      </div>
    )
  }

  const color = TYPE_COLORS[type]

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Card */}
      <div
        className="w-[90px] h-[120px] rounded-lg border-2 flex flex-col items-center justify-center gap-2 p-2"
        style={{ borderColor: color, backgroundColor: '#1e0a38' }}
      >
        <span style={{ fontSize: 32 }}>{TYPE_ICONS[type]}</span>
        <span style={{ color, fontSize: 7, fontFamily: "'Press Start 2P', monospace", textAlign: 'center', lineHeight: 1.5 }}>
          {name}
        </span>
        <span style={{ color: '#5a4070', fontSize: 6, fontFamily: "'Press Start 2P', monospace", textTransform: 'uppercase' }}>
          {type}
        </span>
      </div>

      {/* Price tag */}
      <div
        className="px-3 py-1 rounded border"
        style={{ borderColor: '#f5c842', backgroundColor: '#2a1a00' }}
      >
        <span style={{ color: '#f5c842', fontSize: 10, fontFamily: "'Press Start 2P', monospace" }}>${price}</span>
      </div>

      {/* Buy button */}
      <button
        className="px-4 py-1 rounded border border-[#3a8060] bg-[#0a2010] text-[#60d090] hover:bg-[#1a4020] transition-colors"
        style={{ fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
      >
        Buy
      </button>
    </div>
  )
}
```

**Step 2: Create `src/pages/Shop/components/PackSlot.tsx`**

```tsx
interface PackSlotProps {
  name: string
  price: number
  description: string
}

export default function PackSlot({ name, price, description }: PackSlotProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-[100px] h-[70px] rounded-lg border-2 border-[#8060c0] bg-[#1e1040] flex flex-col items-center justify-center gap-1 p-2"
      >
        <span style={{ fontSize: 24 }}>🎁</span>
        <span style={{ color: '#c0a0f0', fontSize: 7, fontFamily: "'Press Start 2P', monospace", textAlign: 'center' }}>
          {name}
        </span>
      </div>
      <span style={{ color: '#8060a0', fontSize: 6, fontFamily: "'Press Start 2P', monospace", textAlign: 'center', maxWidth: 100, lineHeight: 1.5 }}>
        {description}
      </span>
      <div className="flex items-center gap-2">
        <span style={{ color: '#f5c842', fontSize: 9, fontFamily: "'Press Start 2P', monospace" }}>${price}</span>
        <button
          className="px-3 py-1 rounded border border-[#3a8060] bg-[#0a2010] text-[#60d090] hover:bg-[#1a4020] transition-colors"
          style={{ fontSize: 7, fontFamily: "'Press Start 2P', monospace" }}
        >
          Buy
        </button>
      </div>
    </div>
  )
}
```

**Step 3: Replace `src/pages/Shop/Shop.tsx`**

```tsx
import { Link } from 'react-router-dom'
import ShopSlot from './components/ShopSlot'
import PackSlot from './components/PackSlot'

export default function Shop() {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: '#1a0a2e' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-[#0d0018] border-b border-[#3a2060]">
        <h2 style={{ color: '#f5c842', fontSize: 18, fontFamily: "'Press Start 2P', monospace" }}>
          SHOP
        </h2>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 20 }}>🪙</span>
          <span style={{ color: '#f5c842', fontSize: 18, fontFamily: "'Press Start 2P', monospace" }}>$4</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-8 px-10 py-8">
        {/* Left: Items for sale */}
        <div className="flex flex-col gap-4 flex-1">
          <p style={{ color: '#a080d0', fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}>FOR SALE</p>
          <div className="flex gap-6 items-start">
            <ShopSlot name="Scary Face" type="joker" price={6} />
            <ShopSlot name="Death" type="tarot" price={3} />
            <ShopSlot name="Mercury" type="planet" price={3} />
            <ShopSlot empty name="" type="joker" price={0} />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-[#3a2060]" />

        {/* Right: Booster Packs */}
        <div className="flex flex-col gap-4" style={{ minWidth: 240 }}>
          <p style={{ color: '#a080d0', fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}>BOOSTER PACKS</p>
          <div className="flex gap-6 items-start">
            <PackSlot name="Arcana Pack" price={4} description="Choose 1 of 3 Tarot cards" />
            <PackSlot name="Standard Pack" price={4} description="Choose 1 of 3 playing cards" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-8 py-4 bg-[#0d0018] border-t border-[#3a2060]">
        <Link
          to="/game"
          style={{ color: '#5a4070', fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}
          className="hover:text-[#a080d0] transition-colors"
        >
          ← Back to Game
        </Link>
        <Link
          to="/blind-select"
          className="px-8 py-3 rounded border-2 border-[#f5c842] bg-[#2a1a00] text-[#f5c842] hover:bg-[#3a2800] transition-colors"
          style={{ fontSize: 10, fontFamily: "'Press Start 2P', monospace" }}
        >
          Next Round →
        </Link>
      </div>
    </div>
  )
}
```

**Step 4: Verify in browser**

Visit `http://localhost:5173/shop` — shop with item cards, price tags, and booster packs visible.

**Step 5: Commit**

```bash
git add src/pages/Shop/
git commit -m "feat: implement Shop page with ShopSlot and PackSlot components"
```

---

## Task 12: Wire Up Navigation & Final Verification

**Files:**
- Modify: `src/pages/Game/Game.tsx` (add shop link)

**Step 1: Add navigation link to shop in Game page**

In `Game.tsx`, update the ActionButtons section to include a link to the shop (simulating end of round). After ActionButtons, add:

```tsx
<Link
  to="/shop"
  style={{ color: '#5a4070', fontSize: 7, fontFamily: "'Press Start 2P', monospace", marginTop: 4 }}
  className="hover:text-[#a080d0] transition-colors"
>
  End Round →
</Link>
```

Add import at top of Game.tsx:
```tsx
import { Link } from 'react-router-dom'
```

**Step 2: Full navigation flow test**

Verify the complete flow in browser:
1. `/` → Main Menu — click "New Run" → goes to `/blind-select`
2. `/blind-select` → click "Select" on any blind → goes to `/game`
3. `/game` → click "End Round →" → goes to `/shop`
4. `/shop` → click "Next Round →" → goes to `/blind-select`
5. `/shop` → click "← Back to Game" → goes to `/game`

**Step 3: Run build check**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: wire up navigation flow across all screens, complete static UI"
```

---

## Summary

After all tasks complete, you will have:

| Screen | Route | Status |
|--------|-------|--------|
| Main Menu | `/` | Gold title, 3 nav buttons |
| Blind Select | `/blind-select` | 3 blind cards with boss highlight |
| Game | `/game` | Full game layout with all panels |
| Shop | `/shop` | Items + booster packs + navigation |

All four screens are navigable via React Router. No game logic — pure static UI matching Balatro's visual style.
