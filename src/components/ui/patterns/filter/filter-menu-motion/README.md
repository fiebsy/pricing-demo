# FilterMenuMotion

A filter menu component with Motion Dev animations, built on Base UI Menu primitives.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  FilterMenuMotion                                           │
│  ├── Base UI Menu.Root (accessibility, keyboard nav)        │
│  ├── AnimatePresence (exit animations)                      │
│  └── Menu.Popup with motion.div (reveal animation)          │
│       └── SlidingPanelContainer (height + slide)            │
│            ├── Root Panel (filter categories)               │
│            └── Submenu Panel (filter options)               │
└─────────────────────────────────────────────────────────────┘
```

## Key Patterns

### Base UI + Motion Dev Integration

We use the `render` prop pattern to compose Motion with Base UI:

```tsx
<Menu.Popup
  render={
    <motion.div
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ transformOrigin: 'var(--transform-origin)' }}
    />
  }
>
```

Key points:
- `render` prop replaces Base UI's default element with motion.div
- `--transform-origin` CSS variable from Base UI for natural scaling
- `AnimatePresence` with `keepMounted` portal for exit animations
- `initial={false}` prevents animation on first render for mounted components

### Sliding Panel System

The menu uses a "sliding strip" approach for submenu navigation:

```
┌──────────────────────────────────────┐
│  Height-animated container           │
│  ┌────────────────────────────────┐  │
│  │  Sliding strip (200% width)    │  │
│  │  ┌──────────┐ ┌──────────┐     │  │
│  │  │  Root    │ │ Submenu  │     │  │
│  │  │  Panel   │ │ Panel    │     │  │
│  │  └──────────┘ └──────────┘     │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

- **Outer container**: Animates height using `motion.div` with `animate={{ height }}`
- **Inner strip**: 200% width, slides left (`x: -50%`) to show submenu
- **Both panels mounted**: Enables smooth transitions without remounting

### Height Animation

Height animation uses Motion's declarative approach:

```tsx
<motion.div
  initial={false}
  animate={{ height: targetHeight }}
  transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
>
```

Measurement strategy:
1. `ResizeObserver` tracks panel size changes
2. `useLayoutEffect` with double RAF ensures DOM is ready
3. `scrollHeight` measures true content height
4. `items-start` on flex container prevents equal-height stretching

## File Structure

```
filter-menu-motion/
├── filter-menu-motion.tsx   # Main component
├── types.ts                 # TypeScript interfaces
├── animation-config.ts      # Animation defaults and utilities
├── utils.ts                 # Helper functions
├── default-items.ts         # Demo filter items
├── index.ts                 # Module exports
├── components/
│   ├── index.ts             # Component exports
│   ├── sliding-panel-container.tsx  # Height + slide animation
│   ├── animated-menu-item.tsx       # Individual menu items
│   ├── animated-panel.tsx           # Panel wrapper with opacity
│   ├── filter-menu-header.tsx       # "Filter by" header
│   ├── back-button.tsx              # Submenu back navigation
│   └── filter-trigger.tsx           # Default trigger button
└── README.md                # This file
```

## Animation Configuration

```typescript
interface MotionAnimationConfig {
  // Popup reveal
  revealDuration: number      // 200ms - popup appear duration
  revealScale: number         // 0.4 - scale from this value
  revealSlideY: number        // 8px - slide distance

  // Spring physics (when useSpring: true)
  useSpring: boolean          // true - use spring instead of timed
  springStiffness: number     // 400
  springDamping: number       // 30

  // Panel transitions
  slideDuration: number       // 280ms - horizontal slide
  panelExitScale: number      // 0.96 - outgoing panel scale
  panelEnterScale: number     // 0.96 - incoming panel scale
  panelScaleOrigin: string    // 'center'

  // Height animation
  animateHeight: boolean      // true - enable height animation
  heightDuration: number      // 280ms - height transition

  // Item animations
  opacityDuration: number     // 220ms - item fade duration
  enableItemStagger: boolean  // true - stagger item appearance
  itemStagger: number         // 30ms - delay between items
  panelCrossfadeDuration: number // 150ms - panel opacity crossfade
}
```

### Default Values

```typescript
export const DEFAULT_MOTION_ANIMATION: MotionAnimationConfig = {
  revealDuration: 200,
  revealScale: 0.4,
  revealSlideY: 8,
  useSpring: true,
  springStiffness: 400,
  springDamping: 30,
  slideDuration: 280,
  panelExitScale: 0.96,
  panelEnterScale: 0.96,
  panelScaleOrigin: 'center',
  animateHeight: true,
  heightDuration: 280,
  opacityDuration: 220,
  enableItemStagger: true,
  itemStagger: 30,
  panelCrossfadeDuration: 150,
}
```

### Easing

```typescript
// Smooth deceleration curve (ease-out-expo equivalent)
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
```

## Usage

```tsx
import { FilterMenuMotion } from '@/components/ui/prod/base/filter/filter-menu-motion'

function MyComponent() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  return (
    <FilterMenuMotion
      items={[
        { id: 'status', label: 'Status', type: 'submenu', items: [...] },
        { id: 'priority', label: 'Priority', type: 'submenu', items: [...] },
      ]}
      activeFilterIds={activeFilters}
      onFilterSelect={(id) => {
        setActiveFilters(prev =>
          prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
      }}
      animation={{
        heightDuration: 300, // Override specific values
      }}
    />
  )
}
```

## Debugging

Enable debug logs by setting `debug={true}` on `SlidingPanelContainer`:

```
[SlidingPanel] 📏 Root height: 249
[SlidingPanel] 📏 Submenu height: 169
[SlidingPanel] 🎯 Target height: 169 { inSubmenu: true, rootHeight: 249, submenuHeight: 169 }
[SlidingPanel] 🔄 Submenu changed: status
```

## Common Issues

### Height not animating

1. Check `animateHeight: true` in config
2. Ensure `items-start` is on the flex container (prevents equal-height stretching)
3. Verify submenu content is rendered before measurement

### Panels same height

The flex container stretches children to equal height by default. Fixed with `items-start`:

```tsx
<motion.div className="flex w-[200%] items-start">
```

### Exit animation not working

Ensure:
1. `AnimatePresence` wraps the conditional render
2. `keepMounted` on `Menu.Portal`
3. `exit` prop animates `opacity` (required for Base UI detection)

## Related Documentation

- Motion Dev: https://motion.dev/docs
- Base UI: https://base-ui.com
