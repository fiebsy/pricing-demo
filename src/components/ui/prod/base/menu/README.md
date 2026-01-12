# Menu Component

Base dropdown menu component with reveal animation, panel navigation, and configurable appearance. Built on [Base UI's Menu primitive](https://base-ui.com/react/components/menu).

## Architecture

```
menu/
├── menu.tsx              # Main component with panel navigation
├── menu-item.tsx         # Individual item renderer
├── menu-back-button.tsx  # Submenu navigation
├── menu-transitions.css  # CSS-driven panel animations
├── config.ts             # Appearance & animation defaults
├── types.ts              # TypeScript definitions
└── index.ts              # Public exports
```

## Quick Start

```tsx
import { Menu } from '@/modules/design-system/v2/components/ui/prod/base/menu'
import Edit01Icon from '@hugeicons-pro/core-stroke-rounded/Edit01Icon'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'

<Menu
  items={[
    { id: 'edit', label: 'Edit', icon: Edit01Icon },
    { id: 'delete', label: 'Delete', icon: Delete01Icon },
  ]}
  trigger={<button>Actions</button>}
  onSelect={(item) => handleAction(item.id)}
/>
```

## Features

### Reveal Animation
Menu opens with a combined scale + slide + fade animation originating from the trigger. Configurable via `USE_LEGACY_ANIMATION` flag in `config.ts`:

- **Legacy mode** (default): Custom CSS keyframe injection with 40% scale start
- **Tailwind mode**: Standard animate classes with 95% scale start

### Panel Navigation
Submenus slide in horizontally using a "sliding strip" technique:
- 200% width container with both panels side-by-side
- `translateX(-50%)` moves to submenu panel
- Height animates smoothly between panels

### Item Types

| Type | Description | Key Props |
|------|-------------|-----------|
| `action` | Clickable item | `onClick`, `shortcut`, `selected` |
| `checkbox` | Toggle with persistent state | `checked`, `onCheckedChange` |
| `submenu` | Nested panel | `items`, `description`, `activeCount` |
| `separator` | Visual divider | — |
| `label` | Section header | — |

```tsx
const items: MenuItem[] = [
  { id: 'save', label: 'Save', icon: Save01Icon, shortcut: '⌘S' },
  { id: 'notify', type: 'checkbox', label: 'Notifications', checked: true, onCheckedChange: setNotify },
  { type: 'separator', id: 'sep-1' },
  {
    id: 'more',
    type: 'submenu',
    label: 'More Options',
    items: [
      { id: 'archive', label: 'Archive' },
      { id: 'export', label: 'Export' },
    ],
  },
]
```

## Props

### MenuProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenuItem[]` | required | Menu items to display |
| `trigger` | `ReactNode` | required | Element that opens the menu |
| `header` | `ReactNode` | — | Content above menu items |
| `width` | `number` | `240` | Menu width in pixels |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Position relative to trigger |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment on the side axis |
| `sideOffset` | `number` | `6` | Gap from trigger (px) |
| `alignOffset` | `number` | `0` | Offset along alignment axis |
| `appearance` | `MenuAppearance` | see below | Visual styling |
| `animation` | `AnimationConfig` | see below | Transition timing |
| `onOpenChange` | `(open: boolean) => void` | — | Called on open/close |
| `onSelect` | `(item: MenuItemAction) => void` | — | Called when action selected |

### MenuAppearance

```tsx
const DEFAULT_APPEARANCE = {
  borderRadius: '2xl',      // none | sm | md | lg | xl | 2xl
  shadow: '2xl',            // none | sm | md | lg | xl | 2xl
  shine: 'shine-2-subtle',  // shine class or 'none'
  background: 'primary',    // primary | secondary | tertiary | quaternary
  gradient: 'subtle-depth-md', // none | subtle-depth-sm/md/lg/xl
  gradientColor: 'tertiary',
  squircle: true,           // Smooth corners
}
```

### AnimationConfig

```tsx
const DEFAULT_ANIMATION = {
  duration: 280,            // Panel slide duration (ms)
  easing: EASING_EXPO_OUT,  // cubic-bezier(0.16, 1, 0.3, 1)
  animateHeight: true,      // Animate height between panels
  opacityMode: 'crossfade', // Panel transition mode
  opacityDuration: 220,     // Fade duration (ms)
  quickOutDuration: 80,     // Outgoing fade speed
}
```

## Opacity Modes

Panel transitions support multiple animation strategies:

| Mode | Description |
|------|-------------|
| `crossfade` | Both panels fade simultaneously (default) |
| `quick-out-fade-in` | Outgoing fades fast, incoming fades with delay |
| `instant-out-fade-in` | Outgoing instant, incoming fades |
| `sequential` | Outgoing completes before incoming starts |
| `instant` | No fade animation |
| `none` | Both panels visible (debug) |

## CSS Architecture

Animations are CSS-driven via data attributes for optimal performance:

```css
/* Height animation */
.menu-height-wrapper {
  height: var(--menu-target-height);
  transition: var(--menu-height-transition);
}

/* Panel sliding */
.menu-sliding-strip {
  transform: translateX(0);
  transition: transform var(--menu-slide-duration) var(--menu-slide-easing);
}

[data-menu-view="submenu"] .menu-sliding-strip {
  transform: translateX(-50%);
}
```

### Data Attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-menu-view` | `root` \| `submenu` | Current panel |
| `data-menu-direction` | `forward` \| `back` | Navigation direction |
| `data-menu-mode` | opacity mode value | Animation strategy |
| `data-state` | `open` \| `closed` | Menu open state |
| `data-side` | position value | Popup placement |

## Accessibility

- Full keyboard navigation (↑↓ arrows, Enter, Escape)
- `aria-haspopup="menu"` on trigger
- Focus management between panels
- `motion-reduce:transition-none` respects user preferences

## Extending

The Menu component is designed as a foundation. See `FilterMenu` for a derivative example that adds:
- Default "Add a filter" trigger
- Active filter tracking (checkmarks, badges)
- Filter-specific callbacks

```tsx
// Create a derivative
export const CustomMenu: React.FC<CustomMenuProps> = (props) => {
  const transformedItems = useMemo(
    () => transformItems(props.items),
    [props.items]
  )

  return (
    <Menu
      items={transformedItems}
      trigger={props.trigger ?? <CustomTrigger />}
      appearance={{ ...DEFAULT_APPEARANCE, ...props.appearance }}
    />
  )
}
```

## Files Reference

| File | Purpose |
|------|---------|
| `menu.tsx` | Main component, state management, panel navigation |
| `menu-item.tsx` | Renders action/checkbox/submenu/separator/label items |
| `menu-back-button.tsx` | Back navigation with title and separator |
| `menu-transitions.css` | All CSS transitions for panels |
| `config.ts` | Defaults, class maps, utility functions |
| `types.ts` | TypeScript interfaces and type unions |
