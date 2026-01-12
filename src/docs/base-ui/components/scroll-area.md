# Scroll Area

A high-quality, unstyled React scroll area that provides a native scroll container with custom scrollbars.

## Overview

The Scroll Area enables custom-styled scrolling experiences while maintaining native scroll behavior.

## Basic Usage

```tsx
import { ScrollArea } from '@base-ui/react/scroll-area';

<ScrollArea.Root>
  <ScrollArea.Viewport>
    <ScrollArea.Content>
      {/* Scrollable content */}
    </ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `ScrollArea.Root` | Container grouping all parts |
| `ScrollArea.Viewport` | Scrollable container element |
| `ScrollArea.Content` | Wrapper for scrollable content |
| `ScrollArea.Scrollbar` | Vertical or horizontal scrollbar |
| `ScrollArea.Thumb` | Draggable scroll indicator |
| `ScrollArea.Corner` | Intersection of scrollbars |

## Key Props

### Root
| Prop | Default | Purpose |
|------|---------|---------|
| `overflowEdgeThreshold` | 0 | Pixels before overflow attributes apply |

### Scrollbar
| Prop | Default | Purpose |
|------|---------|---------|
| `orientation` | 'vertical' | 'vertical' or 'horizontal' |
| `keepMounted` | false | Keep in DOM when not scrollable |

## Data Attributes

### Root/Viewport
- `data-has-overflow-x` / `data-has-overflow-y`
- `data-overflow-x-start` / `data-overflow-x-end`
- `data-overflow-y-start` / `data-overflow-y-end`

### Scrollbar
- `data-orientation`: Direction
- `data-hovering`: Pointer over scroll area
- `data-scrolling`: During active scroll

## CSS Variables

```css
/* Available on Viewport */
--scroll-area-overflow-x-start
--scroll-area-overflow-x-end
--scroll-area-overflow-y-start
--scroll-area-overflow-y-end

/* Thumb dimensions */
--scroll-area-thumb-width
--scroll-area-thumb-height

/* Corner dimensions */
--scroll-area-corner-width
--scroll-area-corner-height
```

## Dual Scrollbars

```tsx
<ScrollArea.Root>
  <ScrollArea.Viewport>
    <ScrollArea.Content>
      {/* Content */}
    </ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar orientation="horizontal">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>
```

## Gradient Fade Effects

```css
.Viewport::after {
  content: '';
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(transparent, white);
  opacity: min(1, var(--scroll-area-overflow-y-end, 40) / 40);
  pointer-events: none;
  --scroll-area-overflow-y-end: inherit;
}
```

## Styling Example

```css
.Scrollbar {
  display: flex;
  padding: 2px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  opacity: 0;
  transition: opacity 150ms;
}

.Scrollbar[data-hovering],
.Scrollbar[data-scrolling] {
  opacity: 1;
}

.Thumb {
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  min-height: 40px;
}
```
