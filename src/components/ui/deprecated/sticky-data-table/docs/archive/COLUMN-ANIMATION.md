# Column Animation System (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived. See [../ARCHITECTURE.md](../ARCHITECTURE.md) for current animation system documentation.

---

> Comprehensive documentation for the StickyDataTable column show/hide animation system.

## Table of Contents

1. [Overview](#overview)
2. [Animation Types](#animation-types)
3. [Architecture](#architecture)
4. [State Flow](#state-flow)
5. [Files Reference](#files-reference)
6. [Debug Logging](#debug-logging)
7. [CSS Animations](#css-animations)
8. [FLIP Technique](#flip-technique)
9. [Performance Considerations](#performance-considerations)
10. [Testing & Auditing](#testing--auditing)
11. [Known Issues](#known-issues)
12. [Future Improvements](#future-improvements)

---

## Overview

The column animation system provides smooth visual feedback when users show/hide columns in the StickyDataTable. It consists of two main animation techniques:

1. **Enter/Leave Animations** - CSS keyframe animations for the column being added/removed
2. **FLIP Animations** - Web Animations API (WAAPI) for neighboring columns that shift position

### Design Principles

Following `/docs/frontend/ANIMATION-PREFERENCES.md`:

| Tier | Technique | Properties | Used For |
|------|-----------|------------|----------|
| **S-Tier** | CSS Only | `transform`, `opacity` | Enter/leave animations |
| **B-Tier** | FLIP + WAAPI | `transform` | Neighbor column shifts |

- No Framer Motion dependency
- GPU-accelerated transforms only
- `prefers-reduced-motion` respected
- 300ms duration (perceptible but not slow)

---

## Animation Types

### 1. Column Enter Animation

When a column is added (made visible):

```css
@keyframes column-enter {
  from {
    opacity: 0;
    transform: translateX(-2rem) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
```

- **Duration**: 300ms
- **Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)` (ease-out)
- **Class**: `.animate-column-add`
- **Data attribute**: `[data-column-entering]`

### 2. Column Leave Animation

When a column is removed (hidden):

```css
@keyframes column-leave {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-2rem) scale(0.95);
  }
}
```

- **Duration**: 250ms
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in)
- **Class**: `.animate-column-remove`
- **Data attribute**: `[data-column-leaving]`
- **Note**: `pointer-events: none` prevents interaction during exit

### 3. FLIP Neighbor Shift

When columns are added/removed, neighboring columns shift position. FLIP makes this smooth:

```typescript
// Pseudo-code for FLIP
const oldPosition = column.getBoundingClientRect().left
// DOM updates...
const newPosition = column.getBoundingClientRect().left
const delta = oldPosition - newPosition

column.animate([
  { transform: `translateX(${delta}px)` },
  { transform: 'translateX(0)' }
], { duration: 300, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' })
```

---

## Architecture

### Component Hierarchy

```
StickyDataTable (index.tsx)
├── useStickyDataTable (hook) - orchestrates all state
│   └── useColumns (hook) - manages visibility & animation state
│       ├── visibleColumnKeys: Set<string>
│       ├── leavingColumnKeys: Set<string>
│       ├── enteringColumnKeys: Set<string>
│       └── columnChange: { columnKey, action, timestamp }
│
├── TableHeader
│   ├── useAutoColumnFlip (hook) - FLIP for header cells
│   └── HeaderCell (per column)
│       ├── data-column-key="columnKey"
│       ├── data-column-entering (when entering)
│       ├── data-column-leaving (when leaving)
│       └── className includes animate-column-add/remove
│
└── TableBody
    ├── useAutoColumnFlip (hook) - FLIP for body cells
    └── TableRow (per row)
        └── TableCell (per column)
            ├── data-column-key="columnKey"
            ├── data-column-entering (when entering)
            ├── data-column-leaving (when leaving)
            └── className includes animate-column-add/remove
```

### External Integration

When using `useColumnConfiguration` externally:

```
useColumnConfiguration (external hook)
├── visibleKeys: Set<string>
├── toggleColumn(key) - updates visibleKeys
└── leavingKeys, columnChange (own animation state - NOT USED by table)

         │
         ▼ passes [...visibleKeys] as defaultVisibleColumns prop

StickyDataTable
└── useColumns
    └── Sync effect detects changes in defaultVisibleColumns
        └── Sets enteringColumnKeys / leavingColumnKeys
```

**Important**: `useColumnConfiguration` has its own animation state, but the table's internal `useColumns` hook manages the actual animation classes. The sync effect bridges external state to internal animation state.

---

## State Flow

### Column Toggle Flow (External State)

```
1. User clicks toggle in ColumnConfigPanel
   │
   ▼
2. columnConfig.toggleColumn(key) called
   │
   ▼
3. useColumnConfiguration.visibleKeys updated
   │
   ▼
4. Parent component re-renders
   │
   ▼
5. StickyDataTable receives new defaultVisibleColumns prop
   │
   ▼
6. useColumns sync effect runs:
   - Compares visibleColumnKeysRef.current vs defaultVisibleColumns
   - If different:
     - Calculates added/removed columns
     - Sets enteringColumnKeys (for added)
     - Sets leavingColumnKeys (for removed)
     - Sets columnChange (for grid transition)
     - Updates visibleColumnKeys state
   │
   ▼
7. Components re-render with animation state:
   - Cells receive enteringColumnKeys/leavingColumnKeys as props
   - getColumnAnimationClass() returns 'animate-column-add' or 'animate-column-remove'
   - getColumnAnimationDataAttrs() returns data-column-entering or data-column-leaving
   │
   ▼
8. CSS animations play (300ms enter, 250ms leave)
   │
   ▼
9. useAutoColumnFlip detects position changes:
   - Captures old positions
   - After DOM update, calculates deltas
   - Animates neighbors via WAAPI
   │
   ▼
10. Cleanup effects clear animation state after duration
```

### Column Toggle Flow (Internal State)

When using the table's built-in column control panel:

```
1. User clicks toggle in ColumnControlPanel
   │
   ▼
2. onToggleColumn(key) → useColumns.toggleColumn(key)
   │
   ▼
3. toggleColumn directly sets:
   - enteringColumnKeys or leavingColumnKeys
   - columnChange
   - visibleColumnKeys
   │
   ▼
4. (Same as steps 7-10 above)
```

---

## Files Reference

### Core Animation Files

| File | Purpose |
|------|---------|
| `hooks/use-columns.ts` | Manages visibility state, enteringColumnKeys, leavingColumnKeys |
| `hooks/use-auto-column-flip.ts` | Auto-FLIP hook for detecting changes and animating shifts |
| `hooks/use-column-flip.ts` | Manual FLIP hook (not currently used) |
| `utils/styles.ts` | `getColumnAnimationClass()`, `getColumnAnimationDataAttrs()` |
| `/src/styles/utilities/animations.css` | CSS keyframes and animation classes |

### Component Files

| File | Animation Role |
|------|----------------|
| `components/table-header.tsx` | Uses useAutoColumnFlip, spreads animationDataAttrs on cells |
| `components/table-body.tsx` | Uses useAutoColumnFlip |
| `components/table-cell.tsx` | Receives animation props, applies classes and data attrs |
| `components/table-row.tsx` | Passes animation props to TableCell |

### Configuration

| File | Constants |
|------|-----------|
| `config.ts` | `ANIMATION_CONFIG.COLUMN_ENTER_DURATION` (300ms), `COLUMN_LEAVE_DURATION` (250ms), etc. |

---

## Debug Logging

### Current Debug Logs

When `NODE_ENV === 'development'`, the following logs appear:

#### Sync Effect (use-columns.ts)

```javascript
🔄 [useColumns] Sync effect triggered { defaultVisibleColumnsLength, columnsLength }
🔍 [useColumns] Comparing keys: { currentCount, externalCount, match, currentSample, externalSample }
✨ [useColumns] CHANGES DETECTED: { added, removed }
[useColumns] Set enteringColumnKeys: [...]
[useColumns] Set leavingColumnKeys: [...]
```

#### Toggle Function (use-columns.ts)

```javascript
[useColumns] toggleColumn called for "columnKey", wasVisible: true/false
[useColumns] Column "columnKey" marked as ENTERING/LEAVING
```

#### Animation Class (utils/styles.ts)

```javascript
[Animation] Column "columnKey" ENTERING - applying animate-column-add
[Animation] Column "columnKey" LEAVING - applying animate-column-remove
```

#### FLIP (use-auto-column-flip.ts)

```javascript
[AutoFLIP] Initial capture: N columns
[AutoFLIP] Columns changed! { prev, next, added, removed }
[AutoFLIP] Column "columnKey" is NEW - skipping FLIP
[AutoFLIP] Animating "columnKey" shift: Npx
[AutoFLIP] Started N shift animations
```

#### Cell Components

```javascript
[HeaderCell] Column "columnKey" has animation class: "animate-column-add"
[TableCell] Column "columnKey" has animation class: "animate-column-add"
```

### Interpreting Logs

| Log Pattern | Meaning |
|-------------|---------|
| `🔄` appears but no `✨` | Keys matched, no actual change detected |
| `✨` appears but no `[Animation]` | Animation state set but not reaching cells |
| `[Animation]` appears but no visual | CSS not loaded or specificity issue |
| `[AutoFLIP] Started 0 animations` | No columns moved (or all skipped) |

---

## CSS Animations

### File Location

`/src/styles/utilities/animations.css`

### Animation Classes

```css
/* Enter animation */
.animate-column-add {
  animation: column-enter 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

/* Leave animation */
.animate-column-remove {
  animation: column-leave 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  pointer-events: none;
}

/* Data attribute variants (Tailwind v4 compatible) */
[data-column-entering] { ... }
[data-column-leaving] { ... }

/* Motion-reduce support */
@media (prefers-reduced-motion: reduce) {
  .animate-column-add,
  .animate-column-remove {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

### Import Chain

```
/src/styles/globals.css
  └── @import './utilities/animations.css'
```

---

## FLIP Technique

### What is FLIP?

**F**irst, **L**ast, **I**nvert, **P**lay - a technique for smooth layout animations:

1. **First**: Record element positions before change
2. **Last**: Let DOM update to new positions
3. **Invert**: Calculate delta and apply inverse transform (element appears in old position)
4. **Play**: Animate transform to 0 (element smoothly moves to new position)

### Implementation (use-auto-column-flip.ts)

```typescript
export function useAutoColumnFlip(
  containerRef: React.RefObject<HTMLElement>,
  columnKeys: Set<string> | string[],
  options?: UseAutoColumnFlipOptions
)
```

The hook:
1. Stores previous positions in a ref after each stable render
2. Uses `useLayoutEffect` to detect when column keys change
3. Queries all `[data-column-key]` elements
4. Calculates X deltas between old and new positions
5. Skips columns with `data-column-entering` or `data-column-leaving` (they have their own animation)
6. Uses WAAPI to animate remaining columns

### Why WAAPI?

- No layout thrashing (positions captured once)
- GPU-accelerated transforms
- Cancelable if columns change again mid-animation
- No React state updates during animation

---

## Performance Considerations

### Good Practices (Current)

- **S-Tier only**: Only `transform` and `opacity` are animated
- **No filter effects**: Removed `filter: brightness()` that caused micro-stutters
- **Memoization**: Components use `memo()` with custom comparisons
- **Data attributes**: Used for CSS selectors, avoiding class string manipulation
- **WAAPI**: Native browser animation API, no JS animation loops

### Potential Concerns

| Concern | Mitigation |
|---------|------------|
| Many rows = many FLIP calculations | FLIP only calculates visible DOM elements |
| New array reference every render | Sync effect compares content, not reference |
| Animation cleanup timers | Cleared on unmount via effect cleanup |

### Metrics to Monitor

- Time to first animation frame
- Total animation duration (should be ~300ms)
- Any dropped frames during animation
- Memory usage with many columns

---

## Testing & Auditing

### Manual Testing Checklist

- [ ] Toggle single column ON - should fade/slide in from left
- [ ] Toggle single column OFF - should fade/slide out to left
- [ ] Toggle multiple columns rapidly - should not break
- [ ] Check neighbor columns shift smoothly (FLIP)
- [ ] Test with `prefers-reduced-motion: reduce` - animations should be instant
- [ ] Verify console shows expected debug logs
- [ ] Check no layout shift/jank during animation

### Automated Testing Ideas

```typescript
// Example test structure
describe('Column Animation', () => {
  it('should set enteringColumnKeys when column is added', () => {
    // Render table with columns A, B, C
    // Toggle column D visible
    // Assert enteringColumnKeys contains 'D'
  })

  it('should set leavingColumnKeys when column is removed', () => {
    // Render table with columns A, B, C
    // Toggle column B hidden
    // Assert leavingColumnKeys contains 'B'
  })

  it('should apply animation class to entering column', () => {
    // Query cell element
    // Assert classList contains 'animate-column-add'
  })

  it('should clear animation state after duration', async () => {
    // Toggle column
    // Wait 350ms
    // Assert enteringColumnKeys is empty
  })
})
```

### Browser DevTools Audit

1. **Performance Tab**: Record while toggling columns
   - Check for long frames (>16ms)
   - Verify transforms are composited (green in paint profiler)

2. **Elements Tab**: Inspect animated element
   - Verify `data-column-entering` appears
   - Verify `animate-column-add` class appears
   - Check computed animation properties

3. **Console Tab**: Filter for `[useColumns]` and `[AutoFLIP]`
   - Verify expected log sequence

---

## Known Issues

### 1. External State Sync Timing

**Issue**: When using `useColumnConfiguration` externally, there's a potential race condition where the sync effect might see stale ref values.

**Symptoms**: `match: true` even when columns changed

**Workaround**: The ref is updated in a separate effect. If timing issues occur, consider using `flushSync` or restructuring the state updates.

### 2. Body FLIP with Many Rows

**Issue**: FLIP queries all `[data-column-key]` elements, which could be slow with 100+ rows.

**Symptoms**: Slight delay before FLIP animation starts

**Workaround**: Consider limiting FLIP to first N rows, or using virtualization.

### 3. CSS Specificity

**Issue**: If other CSS overrides the animation classes, animations won't play.

**Symptoms**: Debug logs show animation class applied but no visual animation

**Fix**: Ensure `animations.css` is imported and not overridden.

---

## Future Improvements

### Short-term

- [ ] Add visual regression tests for animations
- [ ] Create Storybook story demonstrating animations
- [ ] Add animation speed control prop (fast/normal/slow)

### Medium-term

- [ ] Virtualized row support for FLIP
- [ ] Column width resize animation
- [ ] Column reorder drag animation

### Long-term

- [ ] Extract animation system as reusable hook
- [ ] Support custom animation keyframes via props
- [ ] Investigate View Transitions API when widely supported

---

## Quick Reference

### Enable/Disable Animation

```typescript
// Animation is automatic. To disable:
// 1. Set prefers-reduced-motion in browser
// 2. Or modify animations.css to set animation: none
```

### Timing Constants (config.ts)

```typescript
ANIMATION_CONFIG = {
  COLUMN_ENTER_DURATION: 300,      // Enter animation length
  COLUMN_LEAVE_DURATION: 250,      // Leave animation length
  COLUMN_SHIFT_DURATION: 300,      // FLIP shift length
  COLUMN_ANIMATION_DURATION: 300,  // Grid template transition
  COLUMN_REMOVE_DELAY: 250,        // Delay before removing from DOM
  COLUMN_CHANGE_CLEAR_DELAY: 350,  // Clear columnChange state
  LEAVING_COLUMN_CLEAR_DELAY: 250, // Clear leavingColumnKeys
}
```

### Key Functions

```typescript
// Get animation class for a column
getColumnAnimationClass(columnKey, leavingKeys, columnChange, enteringKeys)
// Returns: '' | 'animate-column-add' | 'animate-column-remove'

// Get data attributes for a column
getColumnAnimationDataAttrs(columnKey, leavingKeys, enteringKeys)
// Returns: { 'data-column-key': string, 'data-column-entering'?: '', 'data-column-leaving'?: '' }
```

---

*Last updated: December 2024*
*Author: Claude Code*
