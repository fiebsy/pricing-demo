# Menu

A high-quality, unstyled React menu component that displays list of actions in a dropdown, enhanced with keyboard navigation.

## Overview

The Menu component provides accessible dropdown menus with keyboard navigation, hover states, and support for complex item types.

## Basic Usage

```tsx
import { Menu } from '@base-ui/react/menu';

<Menu.Root>
  <Menu.Trigger>Actions</Menu.Trigger>
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item>Delete</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

## Core Components

- **Root**: Container managing state and focus
- **Trigger**: Button that opens the menu
- **Portal**: Moves popup to different DOM location
- **Positioner**: Handles positioning against trigger
- **Popup**: Container for menu items
- **Item**: Individual interactive menu option
- **Separator**: Visual divider between items
- **Group/GroupLabel**: Organize related items
- **Arrow**: Visual pointer to trigger

## Item Types

### Standard Item
```tsx
<Menu.Item onClick={() => handleAction()}>
  Action Item
</Menu.Item>
```

### Checkbox Item
```tsx
<Menu.CheckboxItem checked={checked} onCheckedChange={setChecked}>
  <Menu.CheckboxItemIndicator />
  Toggle Option
</Menu.CheckboxItem>
```

### Radio Items
```tsx
<Menu.RadioGroup value={value} onValueChange={setValue}>
  <Menu.RadioItem value="option1">
    <Menu.RadioItemIndicator />
    Option 1
  </Menu.RadioItem>
  <Menu.RadioItem value="option2">
    <Menu.RadioItemIndicator />
    Option 2
  </Menu.RadioItem>
</Menu.RadioGroup>
```

### Submenu
```tsx
<Menu.SubmenuRoot>
  <Menu.SubmenuTrigger>More Options</Menu.SubmenuTrigger>
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Nested Item</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.SubmenuRoot>
```

## Key Props

### Root
| Prop | Default | Purpose |
|------|---------|---------|
| `highlightItemOnHover` | true | Highlight items on hover |
| `loopFocus` | true | Loop keyboard focus |
| `modal` | true | Enable modal behavior |
| `orientation` | 'vertical' | Navigation direction |

### Trigger
| Prop | Default | Purpose |
|------|---------|---------|
| `openOnHover` | false | Open on hover |
| `delay` | 100 | Hover delay (ms) |
| `disabled` | false | Disable interaction |

### Positioner
| Prop | Default | Purpose |
|------|---------|---------|
| `side` | 'bottom' | Position relative to trigger |
| `align` | 'center' | Alignment option |
| `sideOffset` | 0 | Distance from trigger |

### Item
| Prop | Default | Purpose |
|------|---------|---------|
| `closeOnClick` | true | Close menu on click |
| `disabled` | false | Disable item |

## Data Attributes

- `data-highlighted`: Item under focus/hover
- `data-popup-open`: Trigger when menu is open
- `data-checked`/`data-unchecked`: Radio/checkbox state
- `data-side`, `data-align`: Positioning information

## CSS Variables

Positioner exposes:
- `--anchor-width`, `--anchor-height`
- `--available-width`, `--available-height`
- `--transform-origin`

## Open on Hover

```tsx
<Menu.Trigger openOnHover delay={200}>
  Hover me
</Menu.Trigger>
```

## Detached Triggers

```tsx
const handle = Menu.createHandle();

<Menu.Trigger handle={handle}>Open Menu</Menu.Trigger>
<Menu.Root handle={handle}>
  <Menu.Portal>...</Menu.Portal>
</Menu.Root>
```
