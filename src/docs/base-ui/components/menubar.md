# Menubar

A high-quality, unstyled React menubar component that contains application commands and options.

## Overview

The Menubar provides horizontal navigation with keyboard controls and accessibility features for application menus.

## Basic Usage

```tsx
import { Menubar, Menu } from '@base-ui/react/menubar';

<Menubar>
  <Menu.Root>
    <Menu.Trigger>File</Menu.Trigger>
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item>New</Menu.Item>
          <Menu.Item>Open</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Save</Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>

  <Menu.Root>
    <Menu.Trigger>Edit</Menu.Trigger>
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item>Undo</Menu.Item>
          <Menu.Item>Redo</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Cut</Menu.Item>
          <Menu.Item>Copy</Menu.Item>
          <Menu.Item>Paste</Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
</Menubar>
```

## Key Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `loopFocus` | boolean | true | Cycles focus to first after last |
| `modal` | boolean | true | Modal interaction mode |
| `disabled` | boolean | false | Disable entire menubar |
| `orientation` | string | 'horizontal' | Layout direction |

## With Submenus

```tsx
<Menu.Popup>
  <Menu.Item>New File</Menu.Item>
  <Menu.SubmenuRoot>
    <Menu.SubmenuTrigger>
      Open Recent
    </Menu.SubmenuTrigger>
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item>document1.txt</Menu.Item>
          <Menu.Item>document2.txt</Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.SubmenuRoot>
</Menu.Popup>
```

## Data Attributes

- `data-highlighted`: Item is highlighted
- `data-popup-open`: Menu is open
- `data-disabled`: Item is disabled

## Keyboard Navigation

- Left/Right arrows: Navigate between menus
- Up/Down arrows: Navigate within open menu
- Enter/Space: Open menu or select item
- Escape: Close menu
