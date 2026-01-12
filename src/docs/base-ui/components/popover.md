# Popover

A high-quality, unstyled React popover component that displays an accessible popup anchored to a button.

## Overview

The Popover provides flexible positioning, animation support, and handles multiple trigger scenarios with full keyboard accessibility.

## Basic Usage

```tsx
import { Popover } from '@base-ui/react/popover';

<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Popover Title</Popover.Title>
        <Popover.Description>Content here</Popover.Description>
        <Popover.Close>Close</Popover.Close>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

## Key Features

- Multiple trigger support
- Detached triggers via handles
- Content animations between triggers
- Modal support with focus trapping
- Collision avoidance

## Component Anatomy

| Component | Purpose |
|-----------|---------|
| `Popover.Root` | Container managing state |
| `Popover.Trigger` | Button that opens popover |
| `Popover.Portal` | Renders outside normal DOM |
| `Popover.Backdrop` | Optional overlay |
| `Popover.Positioner` | Handles positioning |
| `Popover.Popup` | Content container |
| `Popover.Arrow` | Visual pointer |
| `Popover.Viewport` | Content transition container |
| `Popover.Title` | Heading |
| `Popover.Description` | Supporting text |
| `Popover.Close` | Dismiss button |

## Core Props

### Root
| Prop | Purpose |
|------|---------|
| `open` / `defaultOpen` | Control open state |
| `onOpenChange` | State change callback |
| `modal` | Enable modal behavior |

### Trigger
| Prop | Default | Purpose |
|------|---------|---------|
| `openOnHover` | false | Open on hover |
| `delay` | 300 | Hover delay (ms) |
| `payload` | - | Data passed to popover |

### Positioner
| Prop | Default | Purpose |
|------|---------|---------|
| `side` | 'bottom' | Position side |
| `align` | 'center' | Alignment |
| `sideOffset` | 0 | Distance from anchor |
| `collisionAvoidance` | - | Viewport collision strategy |

## Controlled Mode

```tsx
const [open, setOpen] = React.useState(false);

<Popover.Root open={open} onOpenChange={setOpen}>
  <Popover.Trigger>Toggle</Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>Content</Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

## Detached Triggers

```tsx
const handle = Popover.createHandle();

<Popover.Trigger handle={handle}>Open</Popover.Trigger>
<Popover.Root handle={handle}>
  <Popover.Portal>...</Popover.Portal>
</Popover.Root>
```

## Multiple Triggers with Payload

```tsx
const handle = Popover.createHandle<{ type: string }>();

<Popover.Trigger handle={handle} payload={{ type: 'edit' }}>Edit</Popover.Trigger>
<Popover.Trigger handle={handle} payload={{ type: 'delete' }}>Delete</Popover.Trigger>

<Popover.Root handle={handle}>
  {({ payload }) => (
    <Popover.Portal>
      <Popover.Positioner>
        <Popover.Popup>
          Action: {payload?.type}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  )}
</Popover.Root>
```

## CSS Variables

Positioner exposes:
- `--positioner-width`, `--positioner-height`
- `--anchor-width`, `--anchor-height`
- `--available-width`, `--available-height`
- `--transform-origin`

## Data Attributes

- `data-open` / `data-closed`: Visibility state
- `data-side`: Position side
- `data-align`: Alignment
- `data-starting-style` / `data-ending-style`: Animation states
- `data-popup-open`: Present on trigger when open
