# Button Animation V3 - Positioning Architecture

> Complete guide to understanding the multi-level stacking navigation component with peek-behind anchoring and child-to-parent promotion animations.

---

## Table of Contents

1. [Overview](#overview)
2. [Visual Model](#visual-model)
3. [Positioning Strategy](#positioning-strategy)
4. [Animation States](#animation-states)
5. [Component Architecture](#component-architecture)
6. [Configuration](#configuration)
7. [Debug Tools](#debug-tools)
8. [Common Issues & Solutions](#common-issues--solutions)

---

## Overview

Button Animation V3 implements a **multi-level expandable navigation** with these key features:

- **Infinite nesting support** - Navigate 4+ levels deep
- **Peek-behind stacking** - Anchored parents show a "peek" (8px) from behind children
- **Child-to-parent promotion** - Smooth animations when a child becomes a parent
- **O(1) performance** - State size doesn't grow with depth

### Key Concept: The Peek-Behind Pattern

```
Initial:     [All]  [Design]  [Develop]  [Deploy]

After clicking Design:
             [All]  [Design ×]  [Figma]  [Sketch]  [Adobe XD]
             ↑       ↑          └─────────────────────────────┘
             │       └── Active parent (inline-flex)
             └── Anchored at left: 0px (absolute)

After clicking Figma:
             [All] [Design] [Figma ×]  [Components]  [Prototypes]  [Tokens]
             ↑      ↑        ↑          └───────────────────────────────────┘
             │      │        └── Active parent (inline-flex)
             │      └── Anchored at x: 8px (absolute)
             └── Anchored at x: 0px (absolute)
```

---

## Visual Model

### State Transitions

```
┌─────────────────────────────────────────────────────────────────────┐
│                        POSITIONING MODEL                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ANCHORED ITEMS (absolute position, peek-behind stack)              │
│  ┌────────┐                                                         │
│  │  All   │  ← x: 0px  (depth 0)                                   │
│  └────────┘                                                         │
│     ┌────────┐                                                      │
│     │ Design │  ← x: 8px  (depth 1)                                │
│     └────────┘                                                      │
│        ┌────────┐                                                   │
│        │ Figma  │  ← x: 16px (depth 2)                             │
│        └────────┘                                                   │
│                                                                      │
│  ACTIVE PARENT + CHILDREN (inline-flex, natural flow)               │
│           ┌────────────────────────────────────────────────────┐   │
│           │ [Components ×] [Prototypes] [Tokens]               │   │
│           └────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Offset Calculations

| Anchored Item | Depth | Offset Formula        | Result |
|---------------|-------|----------------------|--------|
| All           | 0     | `peekOffset * 0`     | 0px    |
| Design        | 1     | `peekOffset * 1`     | 8px    |
| Figma         | 2     | `peekOffset * 2`     | 16px   |
| Components    | 3     | `peekOffset * 3`     | 24px   |

**Children start position:** `peekOffset * anchorCount` (e.g., with 3 anchors: 24px)

---

## Positioning Strategy

### The Two Positioning Modes

```typescript
// 1. ANCHORED ITEMS - Absolute positioning with animated x offset
const shouldUseAbsolute = isAnchored

if (shouldUseAbsolute) {
  // Uses: position: absolute, left: 0, transform: translateX(offset)
  className = 'absolute top-0 left-0 inline-flex'
  animate = { x: anchoredOffset }  // Animated via Framer Motion
}

// 2. ACTIVE PARENT + CHILDREN - Natural flex flow
if (!shouldUseAbsolute) {
  // Uses: position: relative (default), inline-flex
  className = 'inline-flex'
  animate = { x: 0 }  // No offset, flows naturally
}
```

### Why This Works

1. **Anchored items** use `position: absolute` and stack via `translateX(offset)`
2. **Active parent** remains in flex flow, positioned after anchored items
3. **Children** are rendered as siblings in the flex container, flowing naturally to the right
4. **Flex container** has `position: relative` for absolute children to anchor to

### Code Implementation

```tsx
// StackLevel.tsx - Anchor positioning
<motion.div
  className={isAnchored ? 'absolute top-0 left-0 inline-flex' : 'inline-flex'}
  animate={{ 
    x: isAnchored ? anchoredOffset : 0,  // Key: animate x, not style.left
    opacity: 1 
  }}
>
  <AnimatedItem ... />
</motion.div>

// Children flow naturally (no wrapper div)
{activeItem?.children && (
  <StackLevel items={activeItem.children} ... />
)}
```

---

## Animation States

### The 5 Animation States

```typescript
export enum AnimationState {
  IDLE = 'idle',           // Root level, not selected
  PARENT = 'parent',       // Has children, none expanded
  ANCHORED = 'anchored',   // Children are expanded, pushed back
  CHILD = 'child',         // Child item, not selected
  PROMOTING = 'promoting', // Child becoming parent (transitional)
}
```

### State Transition Diagram

```
                    ┌─────────────────┐
                    │      IDLE       │
                    │  (root items)   │
                    └────────┬────────┘
                             │ click (has children)
                             ▼
                    ┌─────────────────┐
                    │     PARENT      │
                    │  (expanded)     │
                    └────────┬────────┘
                             │ child selected
                             ▼
    ┌─────────────────┐     ┌─────────────────┐
    │    ANCHORED     │◄────│     CHILD       │
    │ (peek-behind)   │     │  (selectable)   │
    └─────────────────┘     └────────┬────────┘
                                     │ click (has children)
                                     ▼
                            ┌─────────────────┐
                            │   PROMOTING     │
                            │ (child→parent)  │
                            └────────┬────────┘
                                     │ animation complete
                                     ▼
                            ┌─────────────────┐
                            │     PARENT      │
                            └─────────────────┘
```

### Visual Properties by State

| State     | Opacity | Z-Index | Position | Transform      |
|-----------|---------|---------|----------|----------------|
| IDLE      | 1.0     | 1       | relative | none           |
| PARENT    | 1.0     | 100     | relative | none           |
| ANCHORED  | 0.6     | 10+depth| absolute | translateX(offset) |
| CHILD     | 1.0     | 100     | relative | none           |
| PROMOTING | 1.0     | 150     | relative | scale(1.08)    |

---

## Component Architecture

### File Structure

```
src/components/ui/prod/base/button-animation-v3/
├── ButtonAnimationV3.tsx      # Main component, context providers
├── components/
│   ├── StackLevel.tsx         # Recursive level renderer (key positioning logic)
│   ├── AnimatedItem.tsx       # Individual button with state styling
│   └── DebugOverlay.tsx       # Debug state display
├── context.tsx                # StackContext, LevelContext
├── config.ts                  # Default configs, constants
├── types.ts                   # TypeScript definitions
├── utils/
│   ├── animations.ts          # Animation helpers
│   └── states.ts              # State determination logic
└── debug/
    └── AnchorPositionDebugger.tsx  # Visual position debugger
```

### Data Flow

```
ButtonAnimationV3
    │
    ├── StackContext.Provider (global state: activePath, configs)
    │
    └── LevelContext.Provider (level-specific: level, parentId)
            │
            └── StackLevel (recursive)
                    │
                    ├── Anchor Item (All button at root)
                    │
                    ├── Regular Items (mapped)
                    │       │
                    │       └── AnimatedItem
                    │
                    └── Children StackLevel (recursive)
```

### Key Props Flow

```typescript
// ButtonAnimationV3 → StackLevel
interface StackLevelProps {
  items: StackItem[]           // Items at this level
  parentLevelIndices?: number[] // For numbering (1.A.1)
}

// StackLevel → AnimatedItem
interface AnimatedItemProps {
  item: StackItem
  index: number
  levelIndices: number[]
  isAnchored: boolean
  isPromoting?: boolean
}
```

---

## Configuration

### Animation Config

```typescript
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  // Spring physics
  stiffness: 500,        // Higher = snappier
  damping: 30,           // Higher = less bouncy
  
  // Promotion animation
  promotionDuration: 0.4, // seconds
  promotionScale: 1.08,   // Scale factor during promotion
  
  // Child entry
  stagger: 0.025,         // Delay between children (seconds)
  entryDistance: 12,      // Pixels to slide in from
  childEntryDelay: 0.05,  // Initial delay before stagger
  
  // Exit
  exitDuration: 0.15,
}
```

### Style Config

```typescript
export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  peekOffset: 8,           // Pixels each anchor shows (CRITICAL)
  anchoredOpacity: 0.6,    // Anchored items fade
  gap: 'md',               // Gap between items ('sm'|'md'|'lg')
  expandedVariant: 'shine', // Active parent style
  childVariant: 'tertiary', // Child button style
  anchoredVariant: 'secondary', // Anchored button style
}
```

### Adjusting the Peek Offset

The `peekOffset` value controls how much each anchored item "peeks" out:

```typescript
// Small peek (subtle stacking)
peekOffset: 4   // 4px per level

// Default peek
peekOffset: 8   // 8px per level

// Large peek (more visible stacking)
peekOffset: 16  // 16px per level
```

---

## Debug Tools

### Enabling Debug Mode

```tsx
<ButtonAnimationV3
  items={items}
  showDebug={true}  // Enables all debug overlays
/>
```

### Debug Panel Information

The debug panel shows:

1. **Active Path** - Current selection path (e.g., `design → figma`)
2. **Anchor Stack** - All anchored items with their offsets
3. **Expected Offsets** - Calculated positions for next anchor and children
4. **Position Discrepancies** - Any mismatches between expected and actual

### Console Logging

When `showDebug` is enabled, detailed logs appear in console:

```javascript
🔍 [StackLevel] Level 0 Render
   Items: ['all', 'design', 'develop', 'deploy']
   Active Path: ['design', 'figma']
   Active ID at this level: design

📍 [Button] design
   State: { isActive: true, isAnchored: true, hasChildren: 3 }
   Position Strategy: { positioning: 'absolute (anchored)', anchoredOffset: '8px' }
```

---

## Common Issues & Solutions

### Issue 1: Children Overlapping Parent

**Symptom:** Children appear on top of the parent button instead of to the right.

**Cause:** Children container using absolute positioning with small offsets.

**Solution:** Children should flow naturally in flex, not use absolute positioning:

```tsx
// ❌ Wrong - absolute positioning for children
<div className="absolute" style={{ left: childrenOffset }}>
  <StackLevel items={children} />
</div>

// ✅ Correct - natural flex flow
<StackLevel items={children} />  // Renders inline
```

### Issue 2: Anchor Not Sliding to Position

**Symptom:** Anchored items don't animate to their offset position.

**Cause:** Using `style.left` instead of animated `x` transform.

**Solution:** Use Framer Motion's `animate` prop for the offset:

```tsx
// ❌ Wrong - style.left doesn't animate
<motion.div style={{ left: offset }}>

// ✅ Correct - animate x transform
<motion.div 
  className="absolute top-0 left-0"
  animate={{ x: offset }}
>
```

### Issue 3: Inconsistent Animation Timing

**Symptom:** Deep level selections animate differently than root level.

**Cause:** Different delay/timing for child entries.

**Solution:** Apply delays only for initial entry, not active items:

```tsx
const isInitialEntry = level > 0 && !isActive
const animationDelay = isInitialEntry ? getChildDelay(index, config) : 0
```

### Issue 4: Z-Index Stacking Issues

**Symptom:** Newer anchored items appear behind older ones.

**Cause:** All anchored items have same z-index.

**Solution:** Increment z-index based on depth:

```tsx
export function getAnchoredZIndex(depth: number): number {
  return Z_INDEX.ANCHORED_BASE + depth * Z_INDEX.ANCHORED_INCREMENT
  // e.g., 10 + 0*10 = 10, 10 + 1*10 = 20, 10 + 2*10 = 30
}
```

---

## Quick Reference

### The Golden Rules

1. **Only anchored items use absolute positioning** - Everything else flows in flex
2. **Use `animate={{ x: offset }}` not `style={{ left: offset }}`** - For smooth animations
3. **Children are siblings, not nested** - They render at the same level in the DOM
4. **peekOffset controls visibility** - Higher value = more of each anchor visible

### State Determination Logic

```typescript
function determineState(item, level, activePath) {
  const isInPath = activePath[level] === item.id
  const hasActiveChild = activePath.length > level + 1
  
  if (!isInPath) return level > 0 ? 'child' : 'idle'
  if (hasActiveChild && item.children?.length) return 'anchored'
  if (item.children?.length) return 'parent'
  return 'child'  // Terminal selection
}
```

### Position Calculation

```typescript
function getPosition(state, depth) {
  switch (state) {
    case 'anchored':
      return { position: 'absolute', x: peekOffset * depth }
    default:
      return { position: 'relative', x: 0 }
  }
}
```

---

## Changelog

| Version | Date       | Changes |
|---------|------------|---------|
| 3.0.0   | 2026-01-29 | Initial V3 with flex-based children positioning |
| 3.0.1   | 2026-01-29 | Fixed anchor offset to use animated x transform |

---

*Documentation maintained by the development team. Last updated: January 29, 2026.*
