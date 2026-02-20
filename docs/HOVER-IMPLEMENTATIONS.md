# Hover Indicator Implementations

This document explains the two hover indicator implementations available for the Menu component system.

## Overview

The unified hover system provides a smooth animated background that follows the hovered menu item. Two implementation approaches are available:

| Implementation | Exit Animation | Architecture | Best For |
|----------------|----------------|--------------|----------|
| **Spring** | Fade out | Single indicator, spring physics | Polished feel with exit feedback |
| **Flip** | None (instant) | Per-item indicator, layoutId | Snappy, minimal overhead |

## Configuration

Enable unified hover and select implementation via `UnifiedHoverConfig`:

```tsx
const config: UnifiedHoverConfig = {
  enabled: true,
  implementation: 'spring', // or 'flip'
  stiffness: 550,
  damping: 34,
  mass: 0.8,
  background: 'tertiary',
  borderRadius: 12,
}
```

## Spring Implementation

**File:** `src/components/ui/core/primitives/menu/unified-hover.tsx`

### How It Works

1. **Single indicator element** always mounted at the container level
2. Uses `useSpring` for animating `x`, `y`, `width`, `height`, and `opacity`
3. On hover: calculates item position via `getBoundingClientRect()`, animates indicator to that position
4. On mouse leave: animates `opacity` to 0 (spring fade out)
5. First hover jumps to position instantly (no animation from 0,0)

### Architecture

```
UnifiedHoverContainer
├── UnifiedHoverIndicator (single, always mounted)
│   └── motion.div with spring-animated x/y/width/height/opacity
└── [Menu Items]
    └── Each item calls setHoveredItem(id, rect) on mouseEnter
```

### Key Code

```tsx
// Container renders single indicator
<UnifiedHoverContainer>
  <UnifiedHoverIndicator containerRef={containerRef} />
  {children}
</UnifiedHoverContainer>

// Item reports its position
const handleMouseEnter = () => {
  const rect = itemRef.current.getBoundingClientRect()
  ctx.setHoveredItem(item.id, { top, left, width, height })
}
```

### Pros
- Smooth exit animation (opacity fade)
- Single DOM element regardless of item count
- Direct control over all animation properties

### Cons
- More React overhead (refs, effects, manual calculations)
- 5 springs running constantly when enabled

---

## Flip Implementation

**File:** `src/components/ui/core/primitives/menu/flip-hover.tsx` (standalone)
**Integrated in:** `unified-hover.tsx` as `FlipHoverIndicator`

### How It Works

1. **Per-item indicator** rendered only when that item is hovered
2. Uses Motion's `layoutId` for automatic FLIP position animation
3. On hover: item renders `<FlipHoverIndicator />`, Motion handles position transition
4. On mouse leave: indicator unmounts (no exit animation)

### Architecture

```
UnifiedHoverContainer
└── [Menu Items]
    └── Each item conditionally renders FlipHoverIndicator
        └── motion.div with layoutId for automatic FLIP animation
```

### Key Code

```tsx
// Item renders indicator when hovered
{isFlipMode && isHovered && <FlipHoverIndicator />}

// FlipHoverIndicator uses layoutId
<motion.div
  layoutId={ctx.layoutIdPrefix}
  className="absolute inset-0 -z-10 bg-tertiary"
  transition={{ type: 'spring', ... }}
/>
```

### Pros
- Simpler code, leverages Motion's optimizations
- Less React state management
- Motion handles FLIP calculations internally

### Cons
- No exit animation (indicator disappears instantly)
- Element mounts/unmounts on hover state change
- layoutId can conflict across panels (needs unique prefixes)

---

## File Structure

```
src/components/ui/core/primitives/menu/
├── unified-hover.tsx      # Main file with both implementations
│   ├── UnifiedHoverProvider
│   ├── UnifiedHoverContainer
│   ├── UnifiedHoverIndicator (spring mode)
│   └── FlipHoverIndicator (flip mode)
├── flip-hover.tsx         # Standalone flip implementation (for reference)
├── menu-item.tsx          # Handles both modes via ctx.implementation
├── types.ts               # HoverImplementation type
└── index.ts               # Exports HoverImplementation
```

## Playground Testing

Toggle between implementations at:
`http://localhost:3002/playground/filter-menu`

1. Go to **Hover** panel
2. Enable **Unified Hover**
3. Select **Implementation**: Spring or Flip
4. Observe exit behavior when moving mouse away from menu

## Context API

The `UnifiedHoverContextValue` supports both modes:

```tsx
interface UnifiedHoverContextValue {
  enabled: boolean
  implementation: HoverImplementation  // 'spring' | 'flip'

  // Spring mode
  hoveredItemId: string | null
  hoveredItemRect: HoveredItemRect | null
  setHoveredItem: (id: string | null, rect: HoveredItemRect | null) => void

  // Flip mode
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  layoutIdPrefix: string

  config: UnifiedHoverConfig
  isActive: boolean
}
```

## Menu Item Behavior

`menu-item.tsx` checks implementation and behaves accordingly:

```tsx
const isFlipMode = ctx?.implementation === 'flip'

const handleMouseEnter = () => {
  if (isFlipMode) {
    ctx.setHoveredId(item.id)  // Just ID
  } else {
    ctx.setHoveredItem(item.id, rect)  // ID + position
  }
}

// Render
return (
  <Menu.Item onMouseEnter={handleMouseEnter}>
    {isFlipMode && isHovered && <FlipHoverIndicator />}
    {/* content */}
  </Menu.Item>
)
```

---

## Decision Guide

**Choose Spring when:**
- Exit animation is important for polish
- You want fine-grained control over animation
- Consistent with other spring-based animations in the app

**Choose Flip when:**
- Simpler implementation preferred
- Exit animation not needed
- Using Motion's layout animations elsewhere

---

*Last Updated: February 2026*
