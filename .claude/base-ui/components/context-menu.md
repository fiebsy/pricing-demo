# Context Menu

A high-quality, unstyled React context menu component that appears at the pointer on right click or long press.

## Overview

The Context Menu appears at the pointer position when triggered by right-click or long press.

## Basic Usage

```tsx
import { ContextMenu } from '@base-ui/react/context-menu';

<ContextMenu.Root>
  <ContextMenu.Trigger>
    Right-click this area
  </ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Item>Cut</ContextMenu.Item>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `ContextMenu.Root` | Context menu container |
| `ContextMenu.Trigger` | Area that activates menu |
| `ContextMenu.Portal` | Renders in portal |
| `ContextMenu.Positioner` | Positions at pointer |
| `ContextMenu.Popup` | Menu container |
| `ContextMenu.Item` | Menu option |
| `ContextMenu.Separator` | Visual divider |
| `ContextMenu.SubmenuRoot` | Nested menu container |
| `ContextMenu.SubmenuTrigger` | Opens submenu |

## Key Props

### Root
| Prop | Default | Purpose |
|------|---------|---------|
| `open` / `defaultOpen` | - | Control visibility |
| `onOpenChange` | - | State change callback |
| `highlightItemOnHover` | true | Pointer highlighting |
| `loopFocus` | true | Focus loops at ends |

### Positioner
| Prop | Default | Purpose |
|------|---------|---------|
| `side` | 'bottom' | Position side |
| `align` | 'center' | Alignment |
| `sideOffset` | 0 | Distance from pointer |

### Item
| Prop | Default | Purpose |
|------|---------|---------|
| `closeOnClick` | true | Close on selection |
| `disabled` | false | Disable interaction |

## Nested Menus

```tsx
<ContextMenu.Popup>
  <ContextMenu.Item>Cut</ContextMenu.Item>
  <ContextMenu.Item>Copy</ContextMenu.Item>
  <ContextMenu.Separator />
  <ContextMenu.SubmenuRoot>
    <ContextMenu.SubmenuTrigger>
      More Options
    </ContextMenu.SubmenuTrigger>
    <ContextMenu.Portal>
      <ContextMenu.Positioner>
        <ContextMenu.Popup>
          <ContextMenu.Item>Option A</ContextMenu.Item>
          <ContextMenu.Item>Option B</ContextMenu.Item>
        </ContextMenu.Popup>
      </ContextMenu.Positioner>
    </ContextMenu.Portal>
  </ContextMenu.SubmenuRoot>
</ContextMenu.Popup>
```

## Data Attributes

- `data-highlighted`: Item is highlighted
- `data-open`: Menu is open
- `data-disabled`: Item is disabled

## Keyboard Navigation

- Arrow keys: Navigate items
- Escape: Close menu
- Enter/Space: Select item
- Type to search: Quick selection
