# Collapsible

A high-quality, unstyled React collapsible component that displays a panel controlled by a button.

## Overview

Base UI's Collapsible allows developers to create expandable content sections with full customization.

## Basic Usage

```tsx
import { Collapsible } from '@base-ui/react/collapsible';

<Collapsible.Root>
  <Collapsible.Trigger>Toggle</Collapsible.Trigger>
  <Collapsible.Panel>
    Content that can be shown or hidden
  </Collapsible.Panel>
</Collapsible.Root>
```

## Component Structure

- **Root**: Container for the collapsible
- **Trigger**: Button that toggles the panel (renders as `<button>`)
- **Panel**: Collapsible content area

## Props

### Root

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `defaultOpen` | boolean | `false` | Sets initial panel state |
| `open` | boolean | - | Controls panel state explicitly |
| `onOpenChange` | function | - | Callback when panel state changes |
| `disabled` | boolean | `false` | Disables user interaction |

### Panel

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `hiddenUntilFound` | boolean | `false` | Enables browser search compatibility |
| `keepMounted` | boolean | `false` | Preserves DOM element when hidden |

## Data Attributes

**Root/Trigger:**
- `data-open`: Panel is expanded
- `data-closed`: Panel is collapsed
- `data-disabled`: Collapsible is disabled
- `data-panel-open`: (Trigger only) Panel is open

**Panel:**
- `data-open` / `data-closed`: Current state
- `data-starting-style` / `data-ending-style`: Animation states

## CSS Variables

The panel provides variables for smooth animations:
- `--collapsible-panel-height`
- `--collapsible-panel-width`

## Animation Example

```css
.Panel {
  height: 0;
  overflow: hidden;
  transition: height 300ms ease;
}

.Panel[data-open] {
  height: var(--collapsible-panel-height);
}

.Panel[data-starting-style],
.Panel[data-ending-style] {
  height: 0;
}
```

## Controlled Example

```tsx
const [open, setOpen] = React.useState(false);

<Collapsible.Root open={open} onOpenChange={setOpen}>
  <Collapsible.Trigger>
    {open ? 'Hide' : 'Show'} content
  </Collapsible.Trigger>
  <Collapsible.Panel>
    Controlled collapsible content
  </Collapsible.Panel>
</Collapsible.Root>
```

## Browser Search Support

Enable `hiddenUntilFound` to allow browser find-in-page to reveal hidden content:

```tsx
<Collapsible.Panel hiddenUntilFound>
  This text can be found by browser search even when collapsed
</Collapsible.Panel>
```
