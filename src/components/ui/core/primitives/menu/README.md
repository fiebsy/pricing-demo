# Menu Component

A spring-animated dropdown menu with submenu navigation and unified hover effects. Built on Base UI primitives with configurable appearance, animations, and behavior.

## Overview

The Menu component provides:
- **Spring-based animations** for panel transitions (motion/react)
- **Submenu navigation** with sliding panel transitions
- **Unified hover indicator** - single animated background that glides between items using `layoutId`
- **Reveal animation** on open/close with scale + slide + fade
- **Height animation** between panels of different sizes
- **Configurable appearance** (shine, shadow, squircle, gradient)

### When to Use

| Use Case | Component |
|----------|-----------|
| Simple action menus | Menu with flat items |
| Nested category navigation | Menu with submenus |
| Polished hover effects | Menu with unified hover enabled |
| Filter/settings menus | FilterMenu (extends Menu) |

---

## Architecture

### File Structure

```
menu/
├── menu.tsx              # Main component
├── unified-hover.tsx     # Hover indicator system (~80 lines)
├── menu-item.tsx         # Item rendering (action, checkbox, submenu, separator)
├── menu-back-button.tsx  # Submenu navigation
├── types.ts              # Type definitions
├── config/               # Defaults and utilities
│   ├── defaults.ts
│   ├── spring.ts
│   ├── reveal.ts
│   ├── styles.ts
│   └── index.ts
├── hooks/
│   └── use-menu-animation.ts
├── index.ts              # Public exports
└── README.md             # This file
```

### Component Hierarchy

```
<BaseMenu.Root>
  <BaseMenu.Trigger>
    {trigger}
  </BaseMenu.Trigger>

  <AnimatePresence>
    <BaseMenu.Portal>
      <BaseMenu.Positioner>
        <BaseMenu.Popup>                    ← Reveal animation (scale + slide + fade)
          <motion.div>                      ← Height wrapper (spring-animated)
            <motion.div>                    ← Sliding strip (spring-animated translateX)
              <motion.div>                  ← Root panel (opacity)
                <UnifiedHoverProvider panelId="root">
                  <UnifiedHoverContainer>
                    {items.map(MenuItem)}   ← Each renders HoverIndicator when hovered
                  </UnifiedHoverContainer>
                </UnifiedHoverProvider>
              </motion.div>

              <motion.div>                  ← Submenu panel (opacity)
                <MenuBackButton />
                <UnifiedHoverProvider panelId="submenu">
                  <UnifiedHoverContainer>
                    {submenu.items.map(MenuItem)}
                  </UnifiedHoverContainer>
                </UnifiedHoverProvider>
              </motion.div>
            </motion.div>
          </motion.div>
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  </AnimatePresence>
</BaseMenu.Root>
```

---

## Animation System (3 Layers)

The menu uses three distinct animation layers:

### Layer 1: Reveal Animation

**What**: Scale + slide + fade on menu open/close
**Where**: `BaseMenu.Popup` via motion.div `render` prop
**Library**: motion/react `variants` + `AnimatePresence`

```tsx
const revealVariants = createRevealVariants({
  side: 'bottom',
  sideOffset: 6,
  scale: 0.4,
  slideRatio: 0.5,
  animateOnClose: true,
})
```

### Layer 2: Panel Sliding

**What**: Horizontal spring-animated transition between root and submenu
**Library**: motion/react `useMotionValue` + `animate()`

```tsx
const slideX = useMotionValue(0)
animate(slideX, inSubmenu ? -50 : 0, { type: 'spring', ...springConfig })
```

### Layer 3: Height Animation

**What**: Smooth container resizing between panels of different heights
**Library**: motion/react `useMotionValue` + `animate()`

```tsx
const containerHeight = useMotionValue(rootHeight)
animate(containerHeight, targetHeight, { type: 'spring', ...springConfig })
```

---

## Unified Hover System

### The `layoutId` Approach

The unified hover uses Motion's `layoutId` for automatic position animation. Each menu item conditionally renders the indicator when hovered, and Motion animates between positions automatically.

```tsx
// In menu-item.tsx
const isHovered = ctx?.hoveredId === item.id

return (
  <Menu.Item onMouseEnter={() => ctx?.setHoveredId(item.id)}>
    {isHovered && <HoverIndicator />}
    {/* content */}
  </Menu.Item>
)

// In unified-hover.tsx
export function HoverIndicator() {
  const ctx = useUnifiedHover()

  return (
    <motion.div
      layoutId={ctx.layoutIdPrefix}
      className="absolute inset-0 bg-tertiary -z-10"
      transition={{ type: 'spring', ...ctx.springConfig }}
    />
  )
}
```

### Benefits

- **Simple**: ~80 lines vs 400+ lines with manual springs
- **No coordination**: Each panel has independent hover state via unique `panelId`
- **No race conditions**: No hover suppression or remeasurement needed
- **Automatic animation**: Motion handles position interpolation

### Panel Isolation

Each panel has its own `UnifiedHoverProvider` with a unique `panelId`:

```tsx
<UnifiedHoverProvider panelId="root">...</UnifiedHoverProvider>
<UnifiedHoverProvider panelId="submenu">...</UnifiedHoverProvider>
```

This creates separate `layoutId` values (`"hover-root"`, `"hover-submenu"`) preventing cross-panel animation.

---

## Configuration Reference

### MenuProps

```tsx
interface MenuProps {
  items: MenuItem[]
  trigger: ReactNode | ((state: TriggerState) => ReactNode)
  header?: ReactNode
  width?: number                     // default: 240
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number                // default: 6
  alignOffset?: number               // default: 0
  open?: boolean                     // Controlled mode
  onOpenChange?: (open: boolean) => void
  onSelect?: (item: MenuItemAction) => void
  appearance?: MenuAppearance
  animation?: AnimationConfig
  features?: MenuFeatures
  unifiedHover?: UnifiedHoverConfig
  className?: string
}
```

### AnimationConfig

```tsx
interface AnimationConfig {
  // Spring settings
  springPreset?: 'default' | 'snappy' | 'smooth' | 'bouncy' | 'custom'
  springStiffness?: number    // default: 650 (custom only)
  springDamping?: number      // default: 38 (custom only)
  springMass?: number         // default: 0.9 (custom only)

  // Options
  animateHeight?: boolean     // default: true

  // Reveal animation
  revealDuration?: number     // default: 200 (ms)
  revealScale?: number        // default: 0.4 (40%)
  revealSlideRatio?: number   // default: 0.5
  animateOnClose?: boolean    // default: true
}
```

### UnifiedHoverConfig

```tsx
interface UnifiedHoverConfig {
  enabled: boolean            // default: false
  stiffness: number           // default: 550
  damping: number             // default: 34
  mass: number                // default: 0.8
  background: string          // default: 'tertiary'
  borderRadius: number        // default: 12 (px)
}
```

### MenuFeatures

```tsx
interface MenuFeatures {
  submenu?: boolean           // default: true
  animateHeight?: boolean     // default: true
  revealAnimation?: boolean   // default: true
  unifiedHover?: boolean      // default: false (shorthand toggle)
}
```

### Spring Presets

| Preset | Stiffness | Damping | Mass | Character |
|--------|-----------|---------|------|-----------|
| `default` | 650 | 38 | 0.9 | Balanced, minimal overshoot |
| `snappy` | 700 | 28 | 0.8 | Quick response, subtle bounce |
| `smooth` | 400 | 30 | 1.0 | Gentle, relaxed |
| `bouncy` | 600 | 20 | 1.0 | Playful, visible overshoot |

---

## Usage Examples

### Basic Menu

```tsx
import { Menu } from '@/components/ui/core/primitives/menu'

const items = [
  { id: 'edit', label: 'Edit', icon: Edit01Icon },
  { id: 'duplicate', label: 'Duplicate', icon: Copy01Icon },
  { type: 'separator', id: 'sep-1' },
  { id: 'delete', label: 'Delete', icon: Delete01Icon },
]

<Menu
  items={items}
  trigger={<Button>Actions</Button>}
  onSelect={(item) => console.log('Selected:', item.id)}
/>
```

### Enabling Unified Hover

```tsx
// Method 1: Via features shorthand
<Menu
  items={items}
  trigger={<Button>Menu</Button>}
  features={{ unifiedHover: true }}
/>

// Method 2: With custom spring config
<Menu
  items={items}
  trigger={<Button>Menu</Button>}
  unifiedHover={{
    enabled: true,
    stiffness: 600,
    damping: 30,
    mass: 0.7,
  }}
/>
```

### Custom Spring Configuration

```tsx
<Menu
  items={items}
  trigger={<Button>Bouncy</Button>}
  animation={{ springPreset: 'bouncy' }}
/>
```

---

## Accessibility

- Uses Base UI Menu primitives (proper ARIA roles)
- Respects `prefers-reduced-motion`:
  - Springs use instant transitions
  - Unified hover indicator hidden
- Keyboard navigation supported
- Focus visible styles included

---

## Base UI Foundation

Built on Base UI Menu primitives:
- `Menu.Root`, `Menu.Trigger`, `Menu.Portal`, `Menu.Positioner`
- `Menu.Popup`, `Menu.Item`, `Menu.CheckboxItem`

Data attributes: `data-highlighted`, `data-popup-open`, `data-checked`

CSS variables: `--anchor-width`, `--transform-origin`, etc.
