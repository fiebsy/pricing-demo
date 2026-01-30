# Filter Bar Positioning - Technical Analysis & Implementation

> **Purpose of this document:** Provide complete context for code review and optimization. The current implementation is functional but may benefit from refinement.

---

## 1. Objective

Position a floating filter status bar that displays filter information (e.g., "Showing 32 of 287 orders") with the following behavior:

### Required Behavior

| Scenario | Vertical Position | Horizontal Position |
|----------|-------------------|---------------------|
| **Table is tall** (extends past viewport) | Fixed 80px above viewport bottom | Centered on table |
| **Table is short** (bottom row above viewport threshold) | 80px below the table's last row | Centered on table |

### Key Constraints

1. **Horizontal centering must be relative to the table**, not the viewport. The application has a sidebar, so viewport-center ≠ table-center.
2. **Position must update on scroll** - as the user scrolls through a tall table, the bar stays at viewport bottom; as they scroll past a short table, it stays anchored below the table.
3. **No visual jumping** - the bar should not flash at incorrect positions during initial render or mode transitions.

---

## 2. The Problem: Sticky Header Coordinate System

### Initial Architecture (Failed)

The filter bar was originally rendered **inside** `StickyHeaderWrapper`:

```
StickyDataTable (index.tsx)
└── StickyHeaderWrapper (position: sticky; top: 12px)
    ├── NavigationArrows
    ├── FilterStatusBar ← was here
    └── TableHeader
└── TableBody
```

### Why It Failed

`StickyHeaderWrapper` has `position: sticky; top: 12px`. This creates a **shifting coordinate system**:

```
BEFORE STICKY KICKS IN:
┌─────────────────────────────┐
│  Page content above table   │
├─────────────────────────────┤
│  StickyHeaderWrapper        │ ← wrapperRect.top = 200px (varies with scroll)
│    └── FilterBar            │
├─────────────────────────────┤
│  TableBody                  │
└─────────────────────────────┘

AFTER STICKY KICKS IN (scrolled down):
┌─────────────────────────────┐
│  StickyHeaderWrapper        │ ← wrapperRect.top = 12px (clamped to headerGap)
│    └── FilterBar            │
├─────────────────────────────┤
│  TableBody (scrolled)       │
└─────────────────────────────┘
```

When calculating viewport-relative positions inside the sticky wrapper:
- `wrapperRect.top` changes from ~200px → 12px as you scroll
- Any calculation like `viewportBottom - wrapperTop` shifts by ~188px during this transition
- Result: The filter bar drifts upward into the middle of visible table rows

### Failed Approaches

| Approach | Strategy | Result |
|----------|----------|--------|
| **A: Smart Clamp** | `Math.min(contentPosition, viewportPosition)` | Bar drifted because both values shifted relative to the sticky wrapper |
| **B: Fixed/Absolute Toggle** | Switch `position: fixed` vs `absolute` based on table height | Fixed worked vertically, but `left: 50%` centered on viewport, not table |
| **B.1: Fixed + Calculated Left** | Use fixed positioning with JS-calculated horizontal center | Worked, but felt over-engineered |
| **C: Absolute with Viewport Math** | Calculate viewport position in wrapper coordinates | Drifted because wrapper coordinates shift during scroll |

---

## 3. The Solution: Render Outside Sticky Wrapper

### Current Architecture (Working)

```
StickyDataTable (index.tsx)
├── <div ref={tableContainerRef} className="relative">  ← stable coordinate system
│   ├── StickyHeaderWrapper (position: sticky)
│   │   ├── NavigationArrows
│   │   └── TableHeader
│   ├── TableBody (ref={bodyScrollRef})
│   └── FilterStatusBar ← NOW HERE (outside sticky, inside container)
```

### Why This Works

1. **`tableContainerRef`** points to a div with `position: relative` - this creates a **stable coordinate system** that doesn't shift during scroll.

2. **Absolute mode** (short table): `position: absolute` with `top` calculated relative to the stable container. `left: 50%` naturally centers on the container.

3. **Fixed mode** (tall table): `position: fixed` with `bottom: 80px`. Horizontal center is calculated using `bodyRect.left + bodyRect.width / 2` to get the table's center in viewport coordinates.

---

## 4. Implementation Details

### Files Modified

| File | Change |
|------|--------|
| `hooks/utils/use-filter-bar-position.ts` | Complete rewrite - new positioning logic |
| `index.tsx` | Added `tableContainerRef`, moved filter bar rendering outside sticky wrapper |
| `components/header/sticky-header-wrapper.tsx` | Removed filter bar props and rendering |
| `hooks/index.ts` | Added export for `useFilterBarPosition` |
| `hooks/utils/index.ts` | Added export for `useFilterBarPosition` |

### Hook Interface

```typescript
interface UseFilterBarPositionProps {
  /** Reference to the table container (has position: relative) */
  tableContainerRef: React.RefObject<HTMLDivElement>
  /** Reference to table body (for measuring table dimensions) */
  bodyRef: React.RefObject<HTMLDivElement>
  /** Distance from viewport bottom in fixed mode (default: 80px) */
  bottomOffset?: number
  /** Height of the filter bar for calculations (default: 40px) */
  barHeight?: number
}

interface FilterBarPosition {
  style: React.CSSProperties
  mode: 'fixed' | 'absolute'
  isReady: boolean  // Prevents flash at wrong position on initial render
}
```

### Core Logic

```typescript
const calculatePosition = useCallback(() => {
  const containerRect = container.getBoundingClientRect()
  const bodyRect = body.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // Where the bar WOULD be if fixed to viewport bottom
  const fixedBarY = viewportHeight - bottomOffset - barHeight

  // Where the table's bottom edge currently is
  const tableBottomY = bodyRect.bottom

  // Horizontal center of the table in viewport coordinates
  const tableCenterX = bodyRect.left + bodyRect.width / 2

  // DECISION: Is the table bottom above where the fixed bar would be?
  if (tableBottomY < fixedBarY) {
    // YES → Table is short, use absolute positioning below table
    const absoluteTop = bodyRect.bottom - containerRect.top + bottomOffset
    setPosition({
      mode: 'absolute',
      top: absoluteTop,
      isReady: true,
    })
  } else {
    // NO → Table is tall, use fixed positioning at viewport bottom
    setPosition({
      mode: 'fixed',
      bottom: bottomOffset,
      left: tableCenterX,
      isReady: true,
    })
  }
}, [tableContainerRef, bodyRef, bottomOffset, barHeight])
```

### Style Generation

```typescript
// Fixed mode - positioned relative to viewport
if (position.mode === 'fixed') {
  return {
    mode: 'fixed',
    isReady: position.isReady,
    style: {
      position: 'fixed',
      bottom: `${position.bottom}px`,
      left: `${position.left}px`,      // Calculated table center
      transform: 'translateX(-50%)',
      zIndex: 50,
    },
  }
}

// Absolute mode - positioned relative to table container
return {
  mode: 'absolute',
  isReady: position.isReady,
  style: {
    position: 'absolute',
    top: `${position.top}px`,
    left: '50%',                        // Natural centering on container
    transform: 'translateX(-50%)',
    zIndex: 50,
  },
}
```

### Event Listeners

```typescript
// ResizeObserver for content changes
const resizeObserver = new ResizeObserver(() => {
  requestAnimationFrame(calculatePosition)
})
resizeObserver.observe(body)
resizeObserver.observe(container)

// Scroll listener for position updates
window.addEventListener('scroll', handleScroll, { passive: true })

// Resize listener for viewport changes
window.addEventListener('resize', handleResize)
```

---

## 5. Usage

```tsx
import { StickyDataTable, FilterStatusBar, type ActiveFilter } from './sticky-data-table'

// Basic usage
<StickyDataTable
  data={data}
  columns={columns}
  filterStatusBar={
    <FilterStatusBar
      visibleCount={32}
      totalCount={287}
    />
  }
/>

// With active filter badges
const activeFilters: ActiveFilter[] = [
  { id: 'status', label: 'Collections' },
  { id: 'priority', label: 'Last Chance' },
]

<StickyDataTable
  data={data}
  columns={columns}
  filterStatusBar={
    <FilterStatusBar
      visibleCount={32}
      totalCount={287}
      activeFilters={activeFilters}
    />
  }
/>
```

The `filterStatusBar` prop accepts any ReactNode. The `FilterStatusBar` component is provided but not required.

---

## 6. FilterStatusBar Component

### Props

```typescript
interface FilterStatusBarProps {
  /** Current visible count */
  visibleCount: number
  /** Total count before filtering */
  totalCount: number
  /** Array of active filters to display as badges */
  activeFilters?: ActiveFilter[]
  /** Whether the bar should be visible */
  visible?: boolean
  /** Optional className for customization */
  className?: string
}

interface ActiveFilter {
  /** Unique identifier for the filter */
  id: string
  /** Display label for the filter badge */
  label: string
}
```

### Visual Structure

```
┌──────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← progress fill
│ Showing 32 of 287 orders │ [Collections] [Last Chance]          │
└──────────────────────────────────────────────────────────────────┘
```

### Features

- **Progress fill background** - fills from left based on `visibleCount / totalCount` percentage
- **"Showing X of Y orders"** - clear count display
- **Filter badges** - uses design system `Badge` component with `size="xs"`
- **Auto-hide** - only shows when `visibleCount !== totalCount` or `activeFilters.length > 0`

### Customization

The `FilterStatusBar` component can be completely replaced with a custom implementation. The positioning hook (`useFilterBarPosition`) handles all positioning logic - you just need to pass any ReactNode to the `filterStatusBar` prop.

---

## 7. Rendering Flow

```tsx
// In index.tsx
<div className={className}>
  {/* Toolbar (optional, above table) */}

  <div className="relative" ref={tableContainerRef}>
    {/* Inner wrappers for gradient overlay */}
    <div className="relative">
      <div className="relative">
        <GradientOverlay />
        <StickyHeaderWrapper ... />  {/* No filter bar here anymore */}
        <TableBody ref={bodyScrollRef} ... />
      </div>
    </div>

    {/* Filter bar - OUTSIDE sticky wrapper, INSIDE table container */}
    {filterStatusBar && filterBarPosition.isReady && (
      <div style={{ ...filterBarPosition.style, pointerEvents: 'auto' }}>
        {filterStatusBar}
      </div>
    )}
  </div>
</div>
```

---

## 8. Edge Cases Handled

| Case | Handling |
|------|----------|
| **Initial render** | `isReady: false` prevents rendering until position is calculated |
| **Refs not ready** | Retry mechanism polls until refs are populated |
| **Sidebar present** | Uses `bodyRect` (not viewport) for horizontal centering |
| **Window resize** | Recalculates on `resize` event |
| **Table content changes** | `ResizeObserver` on body triggers recalculation |
| **Rapid scrolling** | `requestAnimationFrame` debounces calculations |

---

## 9. Future Enhancements

### Planned: Filter Badge Integration

Currently, the `activeFilters` prop must be manually constructed from your filter state. A future enhancement could:

1. **Auto-derive from `useTableFilters`** - automatically extract active filter labels from the filter state
2. **Filter config integration** - use filter configuration to get display labels for active filters

Example of manual integration today:

```tsx
// Derive activeFilters from your filter state
const activeFilters = useMemo(() => {
  const filters: ActiveFilter[] = []

  if (filterState.status) {
    filters.push({ id: 'status', label: filterState.status })
  }
  if (filterState.category) {
    filters.push({ id: 'category', label: filterState.category })
  }
  // ... etc

  return filters
}, [filterState])

<FilterStatusBar
  visibleCount={filteredData.length}
  totalCount={data.length}
  activeFilters={activeFilters}
/>
```

---

## 10. Areas for Potential Optimization

The current implementation is functional. Areas a reviewer might evaluate:

1. **Event listener overhead** - Three listeners (scroll, resize, ResizeObserver) all trigger recalculation. Could these be consolidated or throttled more aggressively?

2. **Mode transition smoothness** - When switching between fixed/absolute, there may be a single-frame position jump. Could CSS transitions smooth this?

3. **Initial position flash prevention** - Currently using `isReady` flag. Is there a more elegant CSS-based approach?

4. **Calculation frequency** - Every scroll event triggers a full recalculation. Is there a way to skip calculations when we know the mode won't change?

5. **Memory/cleanup** - Are the ResizeObserver and event listeners being properly cleaned up?

6. **CSS-only alternative** - Could `position: sticky; bottom: X` achieve similar behavior without JS calculations? (Note: tested and does not work for this use case due to horizontal centering requirements)

---

## 11. File Reference

| File | Location |
|------|----------|
| Position hook | `hooks/utils/use-filter-bar-position.ts` |
| Main component | `index.tsx` |
| Filter bar UI | `components/status/filter-status-bar.tsx` |
| Sticky wrapper | `components/header/sticky-header-wrapper.tsx` |
| Hook exports | `hooks/index.ts`, `hooks/utils/index.ts` |

---

*Last updated: January 2025*
