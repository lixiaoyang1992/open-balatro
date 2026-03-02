# Balatro Static UI Design

**Date:** 2026-03-02
**Scope:** PC-only web client, React static interface (no interaction logic)

---

## Overview

Build a static visual replica of the Balatro card game UI using React + Vite + TypeScript + TailwindCSS v4. All four major screens are covered. No game logic or interactivity — pure layout and visual fidelity.

---

## Tech Stack

| Layer       | Choice                                   |
| ----------- | ---------------------------------------- |
| Framework   | React 19 + TypeScript                    |
| Build       | Vite 8                                   |
| Styling     | TailwindCSS v4                           |
| Routing     | React Router v7                          |
| Card assets | CSS-drawn (Unicode suit symbols) for now |

---

## Routes

| Path            | Screen          |
| --------------- | --------------- |
| `/`             | Main Menu       |
| `/blind-select` | Blind Selection |
| `/game`         | Main Game       |
| `/shop`         | Shop            |

Navigation between screens via `<Link>` components (no programmatic routing in static phase).

---

## Directory Structure

```
src/
├── pages/
│   ├── MainMenu/
│   │   └── MainMenu.tsx
│   ├── BlindSelect/
│   │   └── BlindSelect.tsx
│   ├── Game/
│   │   ├── Game.tsx
│   │   └── components/
│   │       ├── ScorePanel.tsx
│   │       ├── JokerBar.tsx
│   │       ├── HandTypeDisplay.tsx
│   │       ├── PlayArea.tsx
│   │       ├── HandArea.tsx
│   │       ├── ActionButtons.tsx
│   │       └── RoundInfo.tsx
│   └── Shop/
│       ├── Shop.tsx
│       └── components/
│           ├── ShopSlot.tsx
│           └── PackSlot.tsx
├── components/
│   ├── Card.tsx        # Reusable playing card (CSS-drawn)
│   └── JokerCard.tsx   # Joker card placeholder
├── router.tsx
└── App.tsx
```

---

## Visual Specification

| Element           | Value                                        |
| ----------------- | -------------------------------------------- |
| Background        | `#1a0a2e` (deep purple-black)                |
| Primary text      | White / off-white                            |
| Font              | `Press Start 2P` (Google Fonts, pixel style) |
| Accent color      | `#f5c842` (gold)                             |
| Danger / Boss     | `#e03030` (red)                              |
| Buttons           | Dark bg + gold border                        |
| Viewport          | Fixed 1280×720, centered                     |
| Playing card size | ~70×98px in hand area                        |
| Joker card size   | ~80×80px, gold border                        |

---

## Screen Designs

### Main Menu (`/`)

- Deep gradient background (black → purple-red)
- Centered vertical layout
- Large glowing "Balatro" title in gold
- Three buttons: **New Run**, **Continue**, **Options**
- Buttons: rounded rectangle, dark bg, gold border

### Blind Select (`/blind-select`)

- Top: "Ante 1" label
- Three cards side by side: Small Blind / Big Blind / Boss Blind
- Each card: blind name, score target, gold reward
- Boss Blind: red highlight / glow effect
- "Select" button under each card

### Main Game (`/game`)

```
┌──────────────────────────────────────────────────────────┐
│  [Joker slot ×5]                    [$ coins] [consumable]│
├────────────┬─────────────────────────┬────────────────────┤
│ Score Panel│     Play Area (5 cards) │ Hand Type Display  │
│ Blind name │                         │ "High Card"        │
│ Target: 300│                         │                    │
│ Score: 0   │                         │ Hands left: 4      │
│            │                         │ Discards left: 3   │
├────────────┴─────────────────────────┴────────────────────┤
│              Hand Area (8 cards horizontal)               │
│    [Play Hand]                          [Discard]         │
└──────────────────────────────────────────────────────────┘
```

### Shop (`/shop`)

- Top bar: gold coin count, "Shop" title
- Main area: 2–3 item slots (joker / consumable / planet card), each showing card + price tag
- Right section: 2 Booster Pack slots
- Bottom: **Next Round** button

---

## Static Mock Data

All data is hardcoded in each page component.

| Data               | Value                                                           |
| ------------------ | --------------------------------------------------------------- |
| Hand cards         | A♠ K♥ Q♦ J♣ 10♠ 9♥ 8♦ 7♣                                        |
| Jokers             | Joker / Greedy Joker / Wrathful Joker (3 slots filled, 2 empty) |
| Score target       | 300                                                             |
| Current score      | 0                                                               |
| Hands remaining    | 4                                                               |
| Discards remaining | 3                                                               |
| Coins              | $4                                                              |
| Shop items         | Scary Face (joker, $6), Death (tarot, $3)                       |
| Booster packs      | Arcana Pack ($4), Standard Pack ($4)                            |

---

## Card Component Design

Playing cards are drawn purely with CSS and Unicode:

- White background, rounded corners, colored suit symbol
- Red suits (♥♦) in red, black suits (♠♣) in dark
- Rank in top-left and bottom-right corners
- Back side: dark purple with pattern

Joker cards use a dark colored placeholder block with:

- Gold border
- Name text centered
- Fixed square dimensions

---

## Out of Scope

- Game logic, state management, reducers
- Animations and transitions
- Responsive/mobile layout
- Real card sprite sheets
- Sound effects
