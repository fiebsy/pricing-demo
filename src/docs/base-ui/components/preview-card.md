# Preview Card

A high-quality, unstyled React preview card component that is a popup that appears when a link is hovered, showing a preview for sighted users.

## Overview

The Preview Card displays a preview popup when hovering over a link, useful for showing additional context.

## Basic Usage

```tsx
import { PreviewCard } from '@base-ui/react/preview-card';

<PreviewCard.Root>
  <PreviewCard.Trigger href="/article">
    Read this article
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>
        <PreviewCard.Arrow />
        <img src="/preview.jpg" alt="Article preview" />
        <h3>Article Title</h3>
        <p>Brief description...</p>
      </PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `PreviewCard.Root` | Container (doesn't render HTML) |
| `PreviewCard.Trigger` | Link that activates preview (`<a>`) |
| `PreviewCard.Portal` | Renders popup elsewhere |
| `PreviewCard.Backdrop` | Optional overlay |
| `PreviewCard.Positioner` | Positions popup |
| `PreviewCard.Popup` | Preview content container |
| `PreviewCard.Arrow` | Visual pointer |

## Key Props

### Trigger
| Prop | Default | Purpose |
|------|---------|---------|
| `delay` | 600 | Open delay (ms) |
| `closeDelay` | 300 | Close delay (ms) |

### Positioner
| Prop | Default | Purpose |
|------|---------|---------|
| `side` | 'bottom' | Position side |
| `align` | 'center' | Alignment |
| `sideOffset` | 0 | Distance from anchor |
| `collisionAvoidance` | - | Viewport handling |
| `sticky` | - | Keep visible when anchor scrolls |

### Root
| Prop | Purpose |
|------|---------|
| `defaultOpen` | Initial state |
| `open` | Controlled state |
| `onOpenChange` | State change callback |
| `onOpenChangeComplete` | Callback after animations |

## Data Attributes

- `data-open` / `data-closed`: Visibility state
- `data-starting-style` / `data-ending-style`: Animation states
- `data-side`: Position side
- `data-align`: Alignment
- `data-popup-open`: Present on trigger when open

## Controlled Example

```tsx
const [open, setOpen] = React.useState(false);

<PreviewCard.Root open={open} onOpenChange={setOpen}>
  <PreviewCard.Trigger href="/page">
    Hover for preview
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>
        <PreviewCard.Arrow />
        Preview content
      </PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>
```

## CSS Variables

```css
/* Available on Positioner/Popup */
--transform-origin  /* Anchor point for animations */
```

## Styling Example

```css
.Popup {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  transform-origin: var(--transform-origin);
  transition: opacity 200ms, transform 200ms;
}

.Popup[data-starting-style],
.Popup[data-ending-style] {
  opacity: 0;
  transform: scale(0.95);
}
```
