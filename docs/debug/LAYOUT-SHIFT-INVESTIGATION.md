# Layout Shift Investigation: Stacking Nav + Table Motion

## Issue Summary

When clicking an expanded L1 navigation item (e.g., "Avengers") while scrolled down in the data table, there's a severe layout shift that causes the page to jump to scroll position 0. This does NOT happen in the standalone `stacking-nav-motion` component—only when integrated with `StickyDataTable`.

**Severity**: The scroll jumps from 1240px to 0px instantly, making the component unusable when scrolled.

---

## Environment

- **Framework**: Next.js 16 (App Router), React 19
- **Animation Library**: Motion (`motion/react`) - formerly Framer Motion
- **Component Library**: Base UI (`@base-ui/react`)
- **Styling**: Tailwind CSS v4

---

## Components Involved

### 1. Page Component
**Path**: `src/app/playground/stacking-nav-table-motion/page.tsx`

This is the playground page that combines:
- `StackingNav` - Animated hierarchical navigation
- `StickyDataTable` - Data table with sticky header and toolbar

### 2. StackingNav Component
**Path**: `src/components/ui/features/experimental/stacking-nav-motion/`

Key files:
- `index.ts` - Main export
- `components/item-renderer.tsx` - Renders individual nav items with motion
- `components/animated-item.tsx` - Animation wrapper
- `utils/item-state.ts` - Calculates animation state for each item
- `utils/animations.ts` - Animation utilities (transitions, delays, exits)
- `config.ts` - Default animation config
- `types.ts` - TypeScript definitions

### 3. StickyDataTable Component
**Path**: `src/components/ui/patterns/data-table/`

Features:
- Sticky header with toolbar
- ResizeObserver for scroll sync
- Integrated toolbar slot (where StackingNav lives)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│ Page (stacking-nav-table-motion/page.tsx)                   │
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ contentWrapperRef (height lock target)                 │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ StickyDataTable                                  │  │ │
│  │  │                                                  │  │ │
│  │  │  ┌─────────────────────────────────────────────┐ │  │ │
│  │  │  │ Sticky Toolbar                              │ │  │ │
│  │  │  │  ┌───────────────────────────────────────┐  │ │  │ │
│  │  │  │  │ <div style={{ contain: 'layout' }}>  │  │ │  │ │
│  │  │  │  │   <StackingNav />  ← Motion animations│  │ │  │ │
│  │  │  │  │ </div>                                │  │ │  │ │
│  │  │  │  └───────────────────────────────────────┘  │ │  │ │
│  │  │  └─────────────────────────────────────────────┘ │  │ │
│  │  │                                                  │  │ │
│  │  │  ┌─────────────────────────────────────────────┐ │  │ │
│  │  │  │ Table Body (scrollable)                     │ │  │ │
│  │  │  │   ... rows ...                              │ │  │ │
│  │  │  └─────────────────────────────────────────────┘ │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## The Problem in Detail

### Trigger Condition
1. User scrolls down so table rows are visible (scrollY > 500px)
2. User clicks on an **already expanded** L1 nav item to collapse it
3. The StackingNav animates the collapse
4. **SCROLL JUMPS TO 0**

### What Should Happen
The nav should collapse smoothly while scroll position remains stable.

### What Actually Happens
During the Motion layout animation, something triggers a scroll to position 0.

---

## Debug Logs Analysis

### Log Session 1: The Problem
```
[403742.6ms] [NAV CLICK] 👆 path=[marvel,avengers] {"scrollY":1240.5,"containWrapper":"found"}
[403743.3ms] [HEIGHT LOCK] 🔐 Locked {"lockedHeight":2265,"scrollY":1240.5}
[403880.1ms] [HEIGHT LOCK] 🔒 Waiting to release... {"lockedHeight":"2265px","scrollY":1240.5,"wrapperOffsetHeight":2265}
[404181.7ms] [HEIGHT LOCK] 📐 Measured {"lockedHeight":2265,"naturalHeight":965,"scrollY":0,"scrollMax":0}
[404182.1ms] [HEIGHT LOCK] 🎬 Animating height {"from":2265,"to":965,"scrollY":0}
[404190.3ms] [SCROLL] 📜 {"from":1240.5,"to":0,"delta":-1240.5,"heightLocked":true}
```

**Key observations:**
1. Nav click at scrollY=1240.5 ✓
2. Height locked at 2265px ✓
3. 137ms later: Still waiting, scrollY still 1240.5 ✓
4. **438ms later: scrollY is ALREADY 0** when we measure!
5. The scroll jump happened BEFORE our measurement, WHILE height was locked

### Log Session 2: Earlier Attempt
```
[16210.0ms] [NAV CLICK] 👆 path=[marvel,avengers] {"scrollY":1023.5,"containWrapper":"found"}
[16210.7ms] [HEIGHT LOCK] 🔐 Locked {"lockedHeight":2265,"scrollY":1023.5}
[16364.8ms] [HEIGHT LOCK] 🔒 Waiting to release... {"lockedHeight":"2265px","scrollY":1023.5,"wrapperOffsetHeight":2265}
[16666.4ms] [HEIGHT LOCK] 🔓 Releasing {"scrollY":1023.5,"minHeightBefore":"2265px"}
[16667.6ms] [HEIGHT LOCK] ✅ Released {"scrollY":0,"wrapperOffsetHeight":965}
```

**Key observation:** ScrollY was 1023.5 just before release, then 0 immediately after. The jump happens in <2ms.

---

## Three Competing Systems

The hypothesis is that three systems are fighting for control:

### 1. Motion's `layout="position"`
- Located in `item-renderer.tsx` line 138: `layout={!isAnchored ? 'position' : false}`
- Motion measures DOM positions and animates layout changes
- When items exit/enter, Motion recalculates positions

### 2. Height Lock Mechanism
- Located in `page.tsx` lines 170-230
- Locks `minHeight` on wrapper before data changes
- Releases after animation completes
- **Problem**: Scroll jumps WHILE lock is engaged

### 3. Table's ResizeObserver
- Located in StickyDataTable internals
- Fires during filtering, triggers scroll sync recalculations
- May be reacting to layout changes from Motion

---

## Attempted Solutions

### Attempt 1: CSS Containment
**File**: `page.tsx` line 640
```tsx
<div style={{ contain: 'layout' }}>
  <StackingNav ... />
</div>
```
**Result**: ❌ Did not prevent scroll jump

### Attempt 2: Simplified Height Lock (300ms timeout)
```tsx
useEffect(() => {
  const timeout = setTimeout(() => {
    heightLockRef.current = false
    wrapper.style.transition = ''
    wrapper.style.minHeight = ''
  }, 300)
  return () => clearTimeout(timeout)
}, [filteredData])
```
**Result**: ❌ Scroll jumped before timeout fired

### Attempt 3: Animated Height Transition
```tsx
// Animate minHeight from locked → natural over 300ms
wrapper.style.transition = 'min-height 300ms ease-out'
wrapper.style.minHeight = `${naturalHeight}px`
```
**Result**: ❌ Scroll jump happens during Motion animation, before our height transition

### Attempt 4: overflow-anchor: none
```tsx
<div style={{ contain: 'layout', overflowAnchor: 'none' }}>
```
**Result**: ❌ Did not prevent scroll jump

### Attempt 5: Scroll Position Restore
```tsx
// Save scroll on click, restore if it jumps
const savedScrollY = window.scrollY
scrollLockRef.current = savedScrollY
// ... check every 100ms and restore if jumped
```
**Result**: ❌ Scroll jump still happens, restoration not triggered (scroll already at 0 by the time we check)

---

## Current Code State

### Height Lock Effect (page.tsx ~170-230)
```tsx
useEffect(() => {
  const wrapper = contentWrapperRef.current
  if (!heightLockRef.current || !wrapper) return

  const lockedHeight = parseFloat(wrapper.style.minHeight) || 0

  const timeout = setTimeout(() => {
    wrapper.style.minHeight = ''
    const naturalHeight = wrapper.offsetHeight

    if (naturalHeight >= lockedHeight) {
      heightLockRef.current = false
      return
    }

    // Animate height down
    wrapper.style.minHeight = `${lockedHeight}px`
    void wrapper.offsetHeight
    wrapper.style.transition = 'min-height 300ms ease-out'
    wrapper.style.minHeight = `${naturalHeight}px`

    const cleanup = () => {
      wrapper.style.transition = ''
      wrapper.style.minHeight = ''
      heightLockRef.current = false
    }

    wrapper.addEventListener('transitionend', cleanup, { once: true })
    setTimeout(cleanup, 350)
  }, 300)

  return () => clearTimeout(timeout)
}, [filteredData, debugLog])
```

### Nav Click Handler (page.tsx ~390-440)
```tsx
const handleSelectionChange = useCallback((path: ActivePath) => {
  const savedScrollY = window.scrollY
  scrollLockRef.current = savedScrollY

  // Lock container height
  const wrapper = contentWrapperRef.current
  if (wrapper) {
    wrapper.style.minHeight = `${wrapper.offsetHeight}px`
    heightLockRef.current = true
  }

  startTransition(() => {
    setCurrentPath(path)
  })

  // Attempt to restore scroll (not working)
  const restoreScroll = () => {
    if (scrollLockRef.current !== null && Math.abs(window.scrollY - scrollLockRef.current) > 50) {
      window.scrollTo({ top: scrollLockRef.current, behavior: 'instant' })
    }
  }
  // ... timeouts at 100, 200, 300, 400ms
}, [startTransition, debugLog])
```

### Item Renderer Motion Config (item-renderer.tsx ~135-150)
```tsx
<motion.div
  key={item.id}
  layout={!isAnchored ? 'position' : false}  // ← SUSPECT
  initial={initial}
  animate={animateState}
  exit={exitAnimation}
  transition={transition}
  ...
/>
```

---

## How to Reproduce

1. Navigate to `http://localhost:3002/playground/stacking-nav-table-motion`
2. Scroll down so table rows are visible beneath the sticky header (~500-1500px)
3. Click "Marvel" to expand (shows child items: Avengers, X-Men, etc.)
4. While still scrolled, click "Marvel" again OR click "Avengers"
5. **Observe**: Page jumps to scroll position 0

**Control Panel Settings** (for consistent reproduction):
- Entry tab → Timing → Delay: 0-50ms (default)
- Exit tab → Collapse Mode: Synchronized
- Animation tab → Type: Spring or Easing (both affected)

---

## Debug Tools Available

### Copy Logs Button
Top-left corner has "📋 Copy Logs" button that copies timestamped debug logs.

### Console Logging
- `[NAV CLICK]` - When nav item is clicked
- `[HEIGHT LOCK]` - Height lock state changes
- `[SCROLL]` - Scroll position changes (delta > 5px)
- `[CHILD ENTRY]` - Child item animation delay calculation

### showNavDebug Toggle
Control Panel → Display tab → "Show Debug" toggle enables additional logging.

---

## Questions for Investigation

### Motion-specific Questions

1. **Does `layout="position"` cause scroll jumps?**
   - Motion docs mention layout animations can cause "visual glitches"
   - Is there a way to isolate layout animations from affecting scroll?

2. **Is there a `layoutScroll` or similar prop?**
   - Some versions of Framer Motion had scroll-aware layout animations
   - Does Motion have equivalent?

3. **Can we use `layoutId` instead of `layout`?**
   - Would shared layout animations behave differently?

4. **AnimatePresence scroll behavior**
   - How does AnimatePresence interact with scroll during exit animations?
   - Is there a prop to prevent scroll adjustment?

5. **LayoutGroup isolation**
   - Can `LayoutGroup` isolate animations from affecting parent scroll?
   - Does it have a "root" or "isolated" mode?

### Alternative Approaches to Investigate

1. **Replace `layout="position"` with manual position animations**
   - Calculate positions manually, animate with x/y transforms only
   - Avoid Motion's layout measurement entirely

2. **Use CSS transforms exclusively**
   - No layout animations, only opacity/transform
   - Would require restructuring component

3. **Clip-path approach** (previously used in older version)
   - Hide children with clip-path instead of AnimatePresence
   - File reference: `deprecated/stacking-nav-legacy/`

4. **Portal the nav outside sticky context**
   - Render nav in a portal, position absolutely
   - Avoid sticky + layout animation interaction

---

## File References

| Purpose | Path |
|---------|------|
| Main playground page | `src/app/playground/stacking-nav-table-motion/page.tsx` |
| StackingNav entry | `src/components/ui/features/experimental/stacking-nav-motion/index.ts` |
| Item renderer (Motion) | `src/components/ui/features/experimental/stacking-nav-motion/components/item-renderer.tsx` |
| Animation utilities | `src/components/ui/features/experimental/stacking-nav-motion/utils/animations.ts` |
| Item state calculation | `src/components/ui/features/experimental/stacking-nav-motion/utils/item-state.ts` |
| Animation config types | `src/components/ui/features/experimental/stacking-nav-motion/types.ts` |
| Default config | `src/components/ui/features/experimental/stacking-nav-motion/config.ts` |
| Panel config (controls) | `src/app/playground/stacking-nav-table-motion/panels/panel-config.ts` |
| Standalone working version | `src/app/playground/stacking-nav-motion/page.tsx` |
| Motion docs | `.claude/motion-dev/` |

---

## Key Insight

The scroll jump happens:
- **DURING** the Motion layout animation
- **BEFORE** our height lock releases
- **WHILE** `heightLocked === true`

This means the issue is NOT with our height locking mechanism. The issue is Motion's `layout="position"` animations somehow triggering a scroll recalculation that resets to 0.

The standalone `stacking-nav-motion` playground does NOT have this issue because there's no StickyDataTable involved—suggesting the interaction between Motion layout animations and the sticky positioning context is the root cause.

---

## Next Steps

1. Research Motion docs for scroll-aware layout animation options
2. Test disabling `layout="position"` entirely to confirm it's the cause
3. Investigate LayoutGroup isolation
4. Consider alternative animation approaches that don't use layout animations
5. Check if there's a way to "freeze" scroll during layout animations
