# Toolbar

A high-quality, unstyled React toolbar component that groups interactive controls in a single container.

## Overview

The Toolbar provides accessible grouping of buttons and controls with keyboard navigation.

## Basic Usage

```tsx
import { Toolbar } from '@base-ui/react/toolbar';

<Toolbar.Root>
  <Toolbar.Button>Bold</Toolbar.Button>
  <Toolbar.Button>Italic</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Align Left</Toolbar.Button>
  <Toolbar.Button>Align Center</Toolbar.Button>
</Toolbar.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `Toolbar.Root` | Container for toolbar items |
| `Toolbar.Button` | Interactive button |
| `Toolbar.Link` | Navigation link |
| `Toolbar.Input` | Native input |
| `Toolbar.Group` | Groups related items |
| `Toolbar.Separator` | Visual divider |

## Key Props

### Root
| Prop | Default | Purpose |
|------|---------|---------|
| `loopFocus` | true | Wrap focus at ends |
| `orientation` | 'horizontal' | Layout direction |
| `disabled` | false | Disable entire toolbar |

### Button
| Prop | Default | Purpose |
|------|---------|---------|
| `focusableWhenDisabled` | true | Keep focusable when disabled |
| `nativeButton` | true | Render as `<button>` |
| `disabled` | false | Disable button |

## With Toggle Group

```tsx
<Toolbar.Root>
  <ToggleGroup defaultValue={['bold']}>
    <Toolbar.Button render={<Toggle value="bold" />}>B</Toolbar.Button>
    <Toolbar.Button render={<Toggle value="italic" />}>I</Toolbar.Button>
  </ToggleGroup>
  <Toolbar.Separator />
  <Toolbar.Button>Undo</Toolbar.Button>
</Toolbar.Root>
```

## With Menu

```tsx
<Toolbar.Root>
  <Menu.Root>
    <Toolbar.Button render={<Menu.Trigger />}>
      Options
    </Toolbar.Button>
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
</Toolbar.Root>
```

## With Tooltip

```tsx
<Toolbar.Root>
  <Tooltip.Root>
    <Tooltip.Trigger render={<Toolbar.Button />}>
      <BoldIcon />
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>Bold (Ctrl+B)</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Toolbar.Root>
```

## Data Attributes

- `data-orientation`: 'horizontal' or 'vertical'
- `data-disabled`: Present when disabled
- `data-focusable`: Present when focusable while disabled

## Keyboard Navigation

- Arrow keys: Navigate between items
- Tab: Move focus in/out of toolbar
- Focus loops when reaching ends (if `loopFocus` is true)

## Input Placement

Use only one input and place it as the last element, since arrow keys navigate both cursor and toolbar focus.
