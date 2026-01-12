# Tooltip

A high-quality, unstyled React tooltip component that appears when an element is hovered or focused, showing a hint for sighted users.

## Overview

The Tooltip displays helpful hints when an element is hovered or focused. Not suitable as the sole means of conveying critical information.

## Basic Usage

```tsx
import { Tooltip } from '@base-ui/react/tooltip';

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>
          <Tooltip.Arrow />
          Tooltip content
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `Tooltip.Provider` | Manages shared delays across tooltips |
| `Tooltip.Root` | Groups tooltip components |
| `Tooltip.Trigger` | Element that activates tooltip |
| `Tooltip.Portal` | Renders in separate DOM location |
| `Tooltip.Positioner` | Positions relative to trigger |
| `Tooltip.Popup` | Content container |
| `Tooltip.Arrow` | Visual pointer |
| `Tooltip.Viewport` | Content transition container |

## Key Props

### Root
| Prop | Purpose |
|------|---------|
| `defaultOpen` / `open` | Control visibility |
| `onOpenChange` | State change callback |
| `trackCursorAxis` | Cursor following (`'none'`, `'x'`, `'y'`, `'both'`) |
| `disableHoverablePopup` | Close when leaving trigger |
| `disabled` | Disable tooltip |

### Trigger
| Prop | Default | Purpose |
|------|---------|---------|
| `delay` | 600 | Open delay (ms) |
| `closeDelay` | 0 | Close delay (ms) |
| `payload` | - | Data for render function |

### Positioner
| Prop | Default | Purpose |
|------|---------|---------|
| `side` | 'top' | Position side |
| `align` | 'center' | Alignment |
| `sideOffset` | 0 | Distance from anchor |
| `collisionAvoidance` | - | Viewport collision strategy |

## Provider for Shared Delays

```tsx
<Tooltip.Provider delay={300} closeDelay={100}>
  <Tooltip.Root>...</Tooltip.Root>
  <Tooltip.Root>...</Tooltip.Root>
</Tooltip.Provider>
```

## Controlled Mode

```tsx
const [open, setOpen] = React.useState(false);

<Tooltip.Root open={open} onOpenChange={setOpen}>
  <Tooltip.Trigger>Trigger</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Content</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>
```

## Detached Triggers

```tsx
const handle = Tooltip.createHandle();

<Tooltip.Trigger handle={handle}>Trigger</Tooltip.Trigger>
<Tooltip.Root handle={handle}>
  <Tooltip.Portal>...</Tooltip.Portal>
</Tooltip.Root>
```

## Cursor Tracking

```tsx
<Tooltip.Root trackCursorAxis="both">
  <Tooltip.Trigger>Hover and move</Tooltip.Trigger>
  ...
</Tooltip.Root>
```

## Data Attributes

- `data-open` / `data-closed`: Visibility state
- `data-side`: Position side
- `data-align`: Alignment
- `data-starting-style` / `data-ending-style`: Animation states
- `data-instant`: Skip animations

## CSS Variables

- `--transform-origin`: Anchor point for animations

## Best Practices

- Avoid using tooltips for essential information
- Don't use for "infotips" - use Popover with `openOnHover` instead
- Use Toast component for transient notifications
- Keep labels consistent between trigger text and tooltip content
