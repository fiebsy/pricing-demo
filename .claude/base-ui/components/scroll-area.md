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

## Zero Layout Shift Pattern

**Problem:** Native scrollbars cause layout shift when content becomes scrollable—items shift left to make room for the scrollbar.

**Solution:** Use Base UI ScrollArea with an absolutely positioned scrollbar that **overlays** content instead of displacing it.

### Why This Works

| Native Scrollbar | Base UI ScrollArea |
|-----------------|-------------------|
| Part of box model | Absolutely positioned overlay |
| Reduces content width | Content stays full width |
| Layout recalculation on appear | Only opacity changes |
| Causes visible shift | Zero layout shift |

### Implementation

```tsx
import { ScrollArea } from '@base-ui/react/scroll-area';

<ScrollArea.Root className="relative min-h-0 flex-1 overflow-hidden">
  <ScrollArea.Viewport className="h-full w-full overscroll-contain">
    <ScrollArea.Content>
      <div className="p-2.5">
        {/* Your content here - always full width */}
      </div>
    </ScrollArea.Content>
  </ScrollArea.Viewport>
  
  {/* Scrollbar overlays content via absolute positioning */}
  <ScrollArea.Scrollbar
    orientation="vertical"
    className="absolute top-1 right-0.5 bottom-1 flex w-1.5 touch-none select-none rounded-full p-px opacity-0 transition-opacity duration-150 data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
  >
    <ScrollArea.Thumb className="relative flex-1 rounded-full bg-fg-quaternary hover:bg-fg-quaternary_hover transition-colors duration-150" />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>
```

### Key Classes Explained

| Element | Classes | Purpose |
|---------|---------|---------|
| **Root** | `relative overflow-hidden` | Positioning context, clips content |
| **Root** | `min-h-0 flex-1` | Flex child that can shrink, fills space |
| **Viewport** | `h-full w-full` | Takes full space of root |
| **Scrollbar** | `absolute top-1 right-0.5 bottom-1` | Floats above content |
| **Scrollbar** | `opacity-0 data-[hovering]:opacity-100` | Hidden until hover/scroll |
| **Thumb** | `flex-1 rounded-full` | Fills scrollbar track |

### Common Use Cases

- **Control panels** with variable content height
- **Sidebars** with collapsible sections
- **Command menus** with dynamic item lists
- **Chat interfaces** with growing message history

---

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
