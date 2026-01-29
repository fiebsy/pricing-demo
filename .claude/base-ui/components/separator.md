# Separator

A high-quality, unstyled React separator component that is accessible to screen readers.

## Overview

The Separator visually and semantically divides content while remaining accessible.

## Basic Usage

```tsx
import { Separator } from '@base-ui/react/separator';

<Separator />
```

## Key Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `orientation` | string | 'horizontal' | 'horizontal' or 'vertical' |
| `className` | string \| function | - | Static or state-based classes |
| `style` | object \| function | - | Static or dynamic styles |
| `render` | element | - | Custom rendered element |

## Horizontal Separator

```tsx
<div>
  <p>Content above</p>
  <Separator className="my-4 h-px bg-gray-200" />
  <p>Content below</p>
</div>
```

## Vertical Separator

```tsx
<nav className="flex items-center gap-4">
  <a href="/">Home</a>
  <Separator orientation="vertical" className="h-4 w-px bg-gray-300" />
  <a href="/about">About</a>
  <Separator orientation="vertical" className="h-4 w-px bg-gray-300" />
  <a href="/contact">Contact</a>
</nav>
```

## Styling Example

```css
/* Horizontal */
.Separator[data-orientation="horizontal"] {
  height: 1px;
  width: 100%;
  background-color: var(--color-gray-200);
  margin: 1rem 0;
}

/* Vertical */
.Separator[data-orientation="vertical"] {
  width: 1px;
  height: 100%;
  background-color: var(--color-gray-200);
  margin: 0 0.5rem;
}
```

## Data Attributes

- `data-orientation`: 'horizontal' or 'vertical'

## Common Use Cases

- Navigation menu dividers (vertical separators between links)
- Content sectioning in layouts
- Visual organization of list items
- Toolbar button groups

## Accessibility

The Separator uses proper ARIA role (`separator`) to convey meaning to assistive technologies.
