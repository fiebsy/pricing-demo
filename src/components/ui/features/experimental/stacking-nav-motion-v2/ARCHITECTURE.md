# StackingNav V2 - Animation Architecture

> Comprehensive documentation of the V2 animation state machine, timing system, and configuration options.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Navigation Phases](#navigation-phases)
4. [Item Animation Modes](#item-animation-modes)
5. [Animation Timeline](#animation-timeline)
6. [Configuration Reference](#configuration-reference)
7. [Component Structure](#component-structure)
8. [Timing Relationships](#timing-relationships)
9. [Customization Guide](#customization-guide)
10. [Debug Tools](#debug-tools)

---

## Overview

### V1 vs V2 Comparison

| Aspect | V1 | V2 |
|--------|-----|-----|
| Timing management | 4 independent hooks | 1 phase coordinator |
| State detection | Scattered across hooks | Centralized in `usePhaseCoordinator` |
| Derived states | Computed in each hook | Derived from phase in context |
| Level-All z-index | Fixed 90 | Dynamic: 95 active, 90 inactive |
| Debug visualization | Basic debug badges | Phase indicator + transition log |

### Key Principles

1. **Single Source of Truth**: All timing managed by `usePhaseCoordinator`
2. **Phase-Based Animation**: Navigation triggers phase transitions, phases control timing
3. **Pure State Computation**: `computeItemState()` is a pure function with no side effects
4. **Separation of Concerns**: Phase coordinator handles timing, renderers handle animation

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              StackingNav (Root)                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         usePhaseCoordinator                              ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────────┐  ││
│  │  │ activePath   │→ │ Phase State  │→ │ Derived States               │  ││
│  │  │ detection    │  │ Machine      │  │ - isCollapsing               │  ││
│  │  │              │  │              │  │ - promotingId                │  ││
│  │  │ expand?      │  │ IDLE         │  │ - isHoverSuppressed(level)   │  ││
│  │  │ collapse?    │  │ EXPANDING    │  │                              │  ││
│  │  │ promote?     │  │ EXPANDED     │  │                              │  ││
│  │  │              │  │ COLLAPSING   │  │                              │  ││
│  │  │              │  │ PROMOTING    │  │                              │  ││
│  │  └──────────────┘  └──────────────┘  └──────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                     ↓                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                           StackContext                                   ││
│  │  phase, phaseStartTime, isCollapsing, promotingId, isHoverSuppressed    ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                     ↓                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         StackLevel (Recursive)                           ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    ││
│  │  │ RootAnchor  │  │ LevelAll    │  │ ItemRenderer│  │ Children    │    ││
│  │  │ (L0 only)   │  │ Renderer    │  │ (per item)  │  │ (recursive) │    ││
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    ││
│  │                          ↓                ↓                              ││
│  │                 computeItemState()  →  ItemRenderState                   ││
│  │                 (pure function)         - animationMode                  ││
│  │                                         - isAnchored                     ││
│  │                                         - isPromoting                    ││
│  │                                         - targetOffset                   ││
│  │                                         - animationDelay                 ││
│  │                                         - zIndex                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Navigation Phases

### Phase State Machine

```
                    ┌──────────────────────────────────┐
                    │                                  │
                    ▼                                  │
              ┌──────────┐                             │
              │   IDLE   │ ◄─────────────────────┐    │
              └────┬─────┘                       │    │
                   │                             │    │
         click item with children                │    │
                   │                             │    │
                   ▼                             │    │
              ┌──────────┐                       │    │
              │EXPANDING │────── timeout ───────►│    │
              └────┬─────┘                       │    │
                   │                             │    │
              children visible                   │    │
                   │                             │    │
                   ▼                             │    │
              ┌──────────┐                       │    │
         ┌────│ EXPANDED │◄──────────────────┐  │    │
         │    └────┬─────┘                   │  │    │
         │         │                         │  │    │
   click │    click child                    │  │    │
 anchored│    with children            timeout  │    │
   item  │         │                         │  │    │
         │         ▼                         │  │    │
         │    ┌──────────┐                   │  │    │
         │    │PROMOTING │───────────────────┘  │    │
         │    └──────────┘                      │    │
         │                                      │    │
         ▼                                      │    │
    ┌──────────┐                                │    │
    │COLLAPSING│────────── timeout ─────────────┘    │
    └──────────┘                                     │
         │                                           │
         └───────────────────────────────────────────┘
```

### Phase Definitions

| Phase | Description | Entry Trigger | Exit Trigger | Duration |
|-------|-------------|---------------|--------------|----------|
| **IDLE** | No animation, resting state | Collapse complete, initial | Click item with children | 0 (instant) |
| **EXPANDING** | Children appearing with stagger | Click item with children (L0) | Timeout | `childEntryDelay + (count × stagger) + duration` |
| **EXPANDED** | Children visible, parent anchored | Expanding/Promoting complete | Click anchored item OR click child with children | 0 (resting) |
| **COLLAPSING** | Children exiting, parent unanchoring | Click anchored item | Timeout | `collapseLayoutDuration + 100ms buffer` |
| **PROMOTING** | Child becoming parent (has grandchildren) | Click child with children (L1+) | Timeout | `promotionDuration` |

### Phase Duration Calculation

```typescript
// From navigation-phase.ts
function calculatePhaseDuration(phase, config, childCount) {
  const { timeScale } = config

  switch (phase) {
    case EXPANDING:
      // Entry delay + stagger for all children + base animation duration
      const entryTime = childEntryDelay + childCount * stagger + duration
      return (entryTime * 1000) / timeScale

    case COLLAPSING:
      // Collapse layout + buffer for exit animations
      const collapseTime = collapseLayoutDuration + 0.1
      return (collapseTime * 1000) / timeScale

    case PROMOTING:
      return (promotionDuration * 1000) / timeScale

    default:
      return 0 // Resting states
  }
}
```

---

## Item Animation Modes

### Mode Overview

Each item in the navigation has an **animation mode** that determines how it animates. This is computed by `computeItemState()`.

| Mode | When Used | Initial State | Animate State | Delay |
|------|-----------|---------------|---------------|-------|
| **skip** | Leaf node active OR parent of leaf active | `undefined` | Instant position | 0 |
| **entry** | New child items appearing | Offset + scale + opacity:0 | Final position + scale:1 + opacity:1 | `childEntryDelay + index × stagger` |
| **anchor** | Item is anchored (has active child) | `false` (no initial) | Anchored offset | 0 |
| **promote** | Child becoming parent | `false` (no initial) | Scale keyframes [1, promotionScale, 1] | 0 |
| **collapse-reentry** | L0 siblings re-appearing during collapse | opacity:0 | opacity:1 | 0 |
| **default** | Normal items, not entering/promoting/anchoring | `false` (no initial) | Parent offset | 0 |

### Mode Selection Logic

```typescript
// Simplified from computeItemState()
function getAnimationMode(ctx) {
  const { isActive, isAnchored, isPromoting, isLeafNode, level, isCollapsingNow } = ctx

  // Skip animations for leaf nodes
  if (skipLeafAnimation && isLeafNode && isActive) return 'skip'
  if (skipLeafAnimation && activeChildIsLeaf && isActive) return 'skip'
  if (skipLeafAnimation && activeItemIsLeaf) return 'skip'

  // Anchored items
  if (isAnchored) return 'anchor'

  // Promoting items (child becoming parent)
  if (isPromoting) return 'promote'

  // L0 siblings re-appearing during collapse
  if (isCollapsingNow && level === 0 && !isActive) return 'collapse-reentry'

  // New child items entering
  if (level > 0 && !isActive && !isCollapsingNow) return 'entry'

  return 'default'
}
```

### Visual State Flow

```
Item States During Navigation:

IDLE (no selection)
├── All items at L0: mode='default', visible
└── No children visible

EXPANDING (clicked "Design" with children)
├── "All" (root): mode='anchor', slides to anchored offset
├── "Design": mode='default' → active, no longer visible (siblings hidden)
├── "Figma": mode='entry', appears with delay[0]
└── "Sketch": mode='entry', appears with delay[1]

EXPANDED (children visible)
├── "All" (root): mode='anchor', at anchored offset
├── "Design": mode='anchor' (if has active child) or mode='default' (if no active child)
├── Children: mode='default', visible
└── Grandchildren: hidden until clicked

PROMOTING (clicked "Tops" under "Apparel" - child with grandchildren)
├── "All" (root): mode='anchor'
├── "Apparel": mode='anchor'
├── "Tops": mode='promote', scale animation [1 → 1.08 → 1]
└── Grandchildren: mode='entry', appear after promotion

COLLAPSING (clicked anchored "Design")
├── "All" (root): mode='anchor' → unanchoring
├── "Design": exiting (instant exit)
├── Siblings ("Develop"): mode='collapse-reentry', fade in
└── Children: instant exit
```

---

## Animation Timeline

### Sequence: Click Item with Children (L0 → L1)

```
Time →  0ms     50ms    100ms   150ms   200ms   275ms   350ms
        │       │       │       │       │       │       │
Phase:  │◄─────────────── EXPANDING ──────────────────►│EXPANDED
        │                                               │
Root    │ anchor ──────────────────────────────────────►│ anchored
Anchor: │ slide to offset                               │ at offset
        │                                               │
Active  │ hide siblings ──────────────────────────────►│ siblings hidden
Item:   │ (instant)                                     │
        │                                               │
Child 0:│     ◄──── childEntryDelay ────►│◄── entry ──►│ visible
        │         (50ms default)         │  animation   │
        │                                │  (275ms)     │
Child 1:│     ◄──── delay + stagger ────►│◄── entry ──►│ visible
        │         (50ms + 0ms default)   │              │
        │                                               │
Hover:  │◄───────── suppressed ─────────────────────────│◄─ active
        │         (hoverDelay: 200ms)                   │
```

### Sequence: Click Child with Children (Promotion)

```
Time →  0ms     50ms    100ms   150ms   200ms   250ms   300ms
        │       │       │       │       │       │       │
Phase:  │◄──── PROMOTING ────►│◄────── EXPANDED ──────►│
        │                     │                         │
Parent: │ stays anchored ─────┼────────────────────────►│
        │ (no change)         │                         │
        │                     │                         │
Promote │◄─── scale ──────────┤                         │
Item:   │ [1 → 1.08 → 1]      │ scale complete          │
        │ (100ms default)     │                         │
        │ NO DELAY            │                         │
        │                     │                         │
Old     │ instant exit ───────┤                         │
Children│ (duration: 0)       │                         │
        │                     │                         │
New     │                     │◄─ entry ───────────────►│
Children│ (wait for promote)  │   with stagger          │
        │                     │                         │
```

### Sequence: Collapse (Click Anchored Item)

```
Time →  0ms     50ms    100ms   175ms   275ms
        │       │       │       │       │
Phase:  │◄────── COLLAPSING ──────────►│IDLE
        │                               │
Root    │ unanchor ─────────────────────│ at origin
Anchor: │ slide back to 0               │
        │                               │
Active  │ instant exit ─────────────────│ gone
Item:   │ (duration: 0)                 │
        │                               │
Children│ instant exit ─────────────────│ gone
        │ (duration: 0)                 │
        │                               │
Siblings│ fade in ──────────────────────│ visible
(L0):   │ mode='collapse-reentry'       │ opacity: 1
        │ opacity: 0 → 1                │
        │                               │
Layout: │◄─── collapseLayoutDuration ──►│
        │     (175ms default)           │
```

---

## Configuration Reference

### AnimationConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **type** | `'spring' \| 'tween'` | `'tween'` | Animation mechanism |
| **stiffness** | `number` | `500` | Spring stiffness (higher = snappier) |
| **damping** | `number` | `30` | Spring damping (higher = less bounce) |
| **duration** | `number` | `0.275` | Tween duration in seconds |
| **ease** | `EasingType` | `'expoOut'` | Easing function for tween |
| **promotionDuration** | `number` | `0.1` | Scale animation duration (seconds) |
| **promotionScale** | `number` | `1` | Scale factor (1 = disabled, 1.08 = 8% larger) |
| **stagger** | `number` | `0` | Delay between sibling entries (seconds) |
| **entryOffsetX** | `number` | `6` | Entry X offset in pixels |
| **entryOffsetY** | `number` | `10` | Entry Y offset in pixels |
| **childEntryDelay** | `number` | `0.05` | Initial delay before entry (seconds) |
| **entryScale** | `number` | `0.95` | Starting scale for entry |
| **exitScale** | `number` | `1` | Scale on exit |
| **exitUseCustomTiming** | `boolean` | `true` | Use independent exit timing |
| **exitDuration** | `number` | `0.025` | Exit duration (seconds) |
| **exitEase** | `EasingType` | `'expoOut'` | Exit easing |
| **exitDelay** | `number` | `0` | Delay before exit |
| **collapseLayoutDuration** | `number` | `0.175` | Collapse transition (seconds) |
| **skipLeafAnimation** | `boolean` | `true` | Skip animation for leaf nodes |
| **hoverDelay** | `number` | `0.2` | Delay before hover interactive (seconds) |
| **timeScale** | `number` | `1` | Slow-mo factor (0.1 = 10x slower) |

### StyleConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **peekOffset** | `number` | `8` | Anchored item offset in pixels |
| **anchoredOpacity** | `number` | `1` | Opacity of anchored items |
| **gap** | `'sm' \| 'md' \| 'lg'` | `'md'` | Spacing between items |
| **buttonSize** | `ButtonSize` | `'md'` | Button size |
| **buttonRoundness** | `ButtonRoundness` | `'pill'` | Corner style |
| **expandedVariant** | `ButtonVariant` | `'shine'` | Expanded parent style |
| **childVariant** | `ButtonVariant` | `'tertiary'` | Child item style |
| **anchoredVariant** | `ButtonVariant` | `'secondary'` | Anchored parent style |
| **selectedLeafVariant** | `ButtonVariant` | `'tab'` | Selected leaf style |
| **showLevelAll** | `boolean` | `true` | Show "All" at child levels |
| **levelAllLabel** | `string` | `'All'` | Label for level-all buttons |
| **levelAllActiveVariant** | `ButtonVariant` | `'tab'` | Active level-all style |
| **levelAllInactiveVariant** | `ButtonVariant` | `'tab'` | Inactive level-all style |

### EasingType Options

```typescript
type EasingType =
  | 'linear'
  | 'easeIn' | 'easeOut' | 'easeInOut'
  | 'circIn' | 'circOut' | 'circInOut'
  | 'backIn' | 'backOut' | 'backInOut'
  | 'anticipate'
  | 'expoIn' | 'expoOut' | 'expoInOut'
```

---

## Component Structure

### File Organization

```
stacking-nav-motion-v2/
├── index.ts                    # Public API exports
├── stacking-nav.tsx            # Root component
├── types.ts                    # All type definitions
├── config.ts                   # Constants, defaults
├── context.tsx                 # StackContext + LevelContext
├── ARCHITECTURE.md             # This document
│
├── state/                      # Centralized state management
│   ├── navigation-phase.ts     # Phase enum, duration calc
│   ├── use-phase-coordinator.ts # Single timing hook
│   └── transitions.ts          # Transition rules
│
├── components/                 # Presentational
│   ├── stack-level.tsx         # Level orchestrator
│   ├── item-renderer.tsx       # Motion wrapper for items
│   ├── level-all-renderer.tsx  # Motion wrapper for "All"
│   ├── level-all-item.tsx      # Visual "All" button
│   ├── root-anchor.tsx         # L0 anchor item
│   ├── animated-item.tsx       # Visual button component
│   └── phase-indicator.tsx     # Debug overlay
│
└── utils/
    ├── index.ts                # Barrel export
    ├── item-state.ts           # computeItemState (pure)
    ├── animations.ts           # Transition builders
    └── debug.ts                # Debug logging
```

### Data Flow

```
User Click
    │
    ▼
StackingNav.selectItem(level, id, hasChildren)
    │
    ▼
setActivePath([...path, id])
    │
    ▼
usePhaseCoordinator detects path change
    │
    ├── isExpand? → transitionTo(EXPANDING)
    ├── isCollapse? → transitionTo(COLLAPSING)
    └── isPromotion? → transitionTo(PROMOTING, { promotingId })
    │
    ▼
StackContext updated with:
    - phase
    - isCollapsing
    - promotingId
    - isHoverSuppressed
    │
    ▼
StackLevel re-renders
    │
    ├── For each item: computeItemState() → ItemRenderState
    │   - animationMode
    │   - isAnchored
    │   - targetOffset
    │   - animationDelay
    │   - zIndex
    │
    └── ItemRenderer receives state, applies Motion props
        - initial
        - animate
        - transition
        - exit
```

---

## Timing Relationships

### Current Behavior (V2)

```
PROMOTION SEQUENCE:
┌─────────────────────────────────────────────────────────────┐
│ 1. User clicks child with grandchildren                     │
│ 2. Phase → PROMOTING                                        │
│ 3. SIMULTANEOUSLY:                                          │
│    • Old children exit (instant, duration: 0)               │
│    • Promoting item scales [1 → promotionScale → 1]         │
│    • New children enter with childEntryDelay + stagger      │
│ 4. After promotionDuration → Phase → EXPANDED               │
└─────────────────────────────────────────────────────────────┘
```

### Desired: Sequential Animation

To make parent animation complete BEFORE children appear:

```
DESIRED PROMOTION SEQUENCE:
┌─────────────────────────────────────────────────────────────┐
│ 1. User clicks child with grandchildren                     │
│ 2. Phase → PROMOTING                                        │
│ 3. Old children exit (instant)                              │
│ 4. Promoting item scales [1 → promotionScale → 1]           │
│ 5. WAIT for promotionDuration                               │
│ 6. Phase → EXPANDING (new phase for children entry)         │
│ 7. New children enter with childEntryDelay + stagger        │
│ 8. Phase → EXPANDED                                         │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Options

#### Option A: Add childEntryDelay to equal promotionDuration

Quick fix - set `childEntryDelay >= promotionDuration`:

```typescript
// In playground or config
const animationConfig = {
  promotionDuration: 0.1,      // 100ms
  childEntryDelay: 0.1,        // Also 100ms - children wait for promotion
}
```

**Pros**: Simple, no code changes
**Cons**: Affects ALL child entries, not just promotion

#### Option B: Add PROMOTING_COMPLETE phase

Add a new phase between PROMOTING and EXPANDED:

```typescript
// New phase flow
PROMOTING → PROMOTING_COMPLETE → EXPANDED

// In use-phase-coordinator.ts
case NavigationPhase.PROMOTING:
  transitionTo(NavigationPhase.PROMOTING_COMPLETE, { trigger: 'promotion-scale-done' })
  break
case NavigationPhase.PROMOTING_COMPLETE:
  // Now trigger children entry
  transitionTo(NavigationPhase.EXPANDED, { trigger: 'children-entered' })
  break
```

**Pros**: Precise control, clear phases
**Cons**: More complex state machine

#### Option C: Delay children entry during promotion

In `computeItemState`, add extra delay when in PROMOTING phase:

```typescript
// In item-state.ts
const isPromotionPhase = phase === NavigationPhase.PROMOTING

const animationDelay =
  animationMode === 'entry'
    ? getChildDelay(index, animationConfig) + (isPromotionPhase ? animationConfig.promotionDuration : 0)
    : 0
```

**Pros**: Targeted fix, minimal changes
**Cons**: Requires passing phase to computeItemState

---

## Customization Guide

### Adding a New Animation Mode

1. Add mode to `AnimationMode` type in `types.ts`:
   ```typescript
   export type AnimationMode =
     | 'skip' | 'entry' | 'anchor' | 'promote'
     | 'collapse-reentry' | 'default'
     | 'your-new-mode'  // Add here
   ```

2. Update `computeItemState()` in `utils/item-state.ts`:
   ```typescript
   // Add detection logic
   if (yourCondition) {
     animationMode = 'your-new-mode'
   }
   ```

3. Update `ItemRenderer` in `components/item-renderer.tsx`:
   ```typescript
   // Add initial state case
   case 'your-new-mode':
     initial = { /* your initial */ }
     break

   // Add animate state case
   case 'your-new-mode':
     animateState = { /* your animate */ }
     break

   // Add transition case if needed
   if (animationMode === 'your-new-mode') {
     transition = { /* your transition */ }
   }
   ```

### Adding a New Phase

1. Add phase to `NavigationPhase` enum in `state/navigation-phase.ts`:
   ```typescript
   export enum NavigationPhase {
     IDLE = 'idle',
     // ... existing
     YOUR_PHASE = 'your-phase',
   }
   ```

2. Add valid transitions:
   ```typescript
   export const VALID_TRANSITIONS = {
     // ... existing
     [NavigationPhase.YOUR_PHASE]: [NavigationPhase.EXPANDED],
   }
   ```

3. Add duration calculation:
   ```typescript
   case NavigationPhase.YOUR_PHASE: {
     return (config.yourDuration * 1000) / scale
   }
   ```

4. Update `usePhaseCoordinator` to trigger and handle the new phase.

### Adding a New Config Option

1. Add to `AnimationConfig` or `StyleConfig` in `types.ts`
2. Add default value in `config.ts`
3. Add playground control in `playground/stacking-nav-motion-v2/panels/panel-config.ts`
4. Add to `PlaygroundConfig` type in `playground/config/types.ts`
5. Map playground value to component config in `page.tsx`

---

## Debug Tools

### Phase Indicator

Enable in playground: **Display → Phase Indicator (V2)**

Shows:
- Current phase with color
- Time elapsed in phase
- Last 3 transitions with timing

### Console Logging

Enable in playground: **Display → Show Debug**

Logs:
- `[PHASE]` - Phase transitions
- `[PROMOTE]` - Promotion animation details
- `[LEVEL]` - Level rendering info

### Debug Data Attributes

Items have data attributes for inspection:
- `data-item-id` - Item ID
- `data-item-level` - Nesting level
- `data-item-state` - Visual state (active, anchored, child, etc.)
- `data-hover-suppressed` - Whether hover is suppressed
- `data-level-all-active` - Level-All active state

### Slow-Mo Mode

Enable in playground: **Display → Slow-Mo (0.1x)**

Scales all durations by 10x for visual debugging.

---

## Z-Index Layers

```
150+    Promoting items (highest priority)
110-149 Active items (100 + 10 + level*10)
100-109 Normal items (100 + level*10)
95      Level-All when active
90      Level-All when inactive
10-89   Anchored items (10 + depth*10)
1-9     Base items
```

---

## Common Issues & Solutions

### Issue: Children appear before promotion completes

**Cause**: Children entry starts immediately, not waiting for promotion scale.
**Solution**: Increase `childEntryDelay` to match `promotionDuration`, or implement Option B/C from Timing Relationships.

### Issue: "All" button doesn't show active state

**Cause**: Z-index too low, or variant not applying.
**Solution**: V2 uses dynamic z-index (95 active, 90 inactive). Check `levelAllActiveVariant` config.

### Issue: Animations feel slow-to-fast

**Cause**: Exit animations causing delay before entry.
**Solution**: V2 uses instant exit by default. Check if `exitDuration` is > 0.

### Issue: Hover flash on new items

**Cause**: `hoverDelay` too short or not applied.
**Solution**: Increase `hoverDelay`. Check `data-hover-suppressed` attribute.

---

## Version History

- **V2.0** - Centralized phase state machine, instant exit, dynamic Level-All z-index
- **V2.1** - Fixed promotion delay, separated initial states by animation mode

---

*Last updated: February 2026*
