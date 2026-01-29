# Navigation Menu

A high-quality, unstyled React navigation menu component that displays a collection of links and menus for website navigation.

## Overview

The Navigation Menu provides accessible dropdown navigation with nested menu support.

## Basic Usage

```tsx
import { NavigationMenu } from '@base-ui/react/navigation-menu';

<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner>
          <NavigationMenu.Popup>
            <NavigationMenu.Link href="/products/a">Product A</NavigationMenu.Link>
            <NavigationMenu.Link href="/products/b">Product B</NavigationMenu.Link>
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `NavigationMenu.Root` | Container (`<nav>` or `<div>` when nested) |
| `NavigationMenu.List` | Item container (`<ul>`) |
| `NavigationMenu.Item` | Menu item (`<li>`) |
| `NavigationMenu.Trigger` | Opens popup (`<button>`) |
| `NavigationMenu.Content` | Popup content |
| `NavigationMenu.Link` | Navigation link |
| `NavigationMenu.Portal` | Renders outside DOM flow |
| `NavigationMenu.Positioner` | Handles positioning |
| `NavigationMenu.Popup` | Popup container |
| `NavigationMenu.Arrow` | Visual pointer |

## Key Props

### Root
| Prop | Default | Purpose |
|------|---------|---------|
| `value` / `defaultValue` | - | Control open state |
| `orientation` | 'horizontal' | Layout direction |
| `delay` | 50 | Open delay (ms) |
| `closeDelay` | 50 | Close delay (ms) |

### Positioner
| Prop | Default | Purpose |
|------|---------|---------|
| `side` | 'bottom' | Position side |
| `align` | 'center' | Alignment |
| `sideOffset` | 0 | Distance from anchor |
| `collisionAvoidance` | - | Viewport edge handling |

### Link
| Prop | Default | Purpose |
|------|---------|---------|
| `closeOnClick` | - | Close menu on click |
| `active` | - | Mark as current page |

## Nested Menus

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Category</NavigationMenu.Trigger>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner>
          <NavigationMenu.Popup>
            <NavigationMenu.Root>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>Subcategory</NavigationMenu.Trigger>
                  <NavigationMenu.Portal>
                    <NavigationMenu.Positioner>
                      <NavigationMenu.Popup>
                        <NavigationMenu.Link href="/item">Item</NavigationMenu.Link>
                      </NavigationMenu.Popup>
                    </NavigationMenu.Positioner>
                  </NavigationMenu.Portal>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

## Framework Integration

Use `render` prop for Next.js Link or other routing:

```tsx
import NextLink from 'next/link';

<NavigationMenu.Link render={<NextLink href="/about" />}>
  About
</NavigationMenu.Link>
```

## Data Attributes

- `data-popup-open`: Trigger/content state
- `data-starting-style` / `data-ending-style`: Animation states
- `data-side` / `data-align`: Positioning info
- `data-active`: Active link indicator
