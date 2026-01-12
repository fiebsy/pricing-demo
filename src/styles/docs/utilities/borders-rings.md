# Borders & Rings

Border, ring, and outline utilities for focus states and decorative styling.

## Overview

These utilities handle element borders, focus rings, and outlines using semantic color tokens. All automatically adapt to dark mode.

**File Locations:**
- `src/styles/utilities/borders.css`
- `src/styles/utilities/rings.css`
- `src/styles/utilities/outlines.css`

## Border Utilities

### Basic Borders

Borders use the `border-{color}` pattern with semantic tokens:

```tsx
// Standard border
<div className="border border-primary rounded-lg">
  Default border
</div>

// Subtle border
<div className="border border-secondary rounded-lg">
  Subtle border
</div>

// Very subtle border
<div className="border border-tertiary rounded-lg">
  Minimal border
</div>
```

### Border Widths

Combine with Tailwind's width utilities:

```tsx
<div className="border border-primary">1px default</div>
<div className="border-2 border-primary">2px border</div>
<div className="border-4 border-brand">4px accent</div>
<div className="border-t border-primary">Top only</div>
<div className="border-b-2 border-secondary">Bottom 2px</div>
```

### Border Colors

| Utility | Usage |
|---------|-------|
| `border-primary` | Standard borders |
| `border-secondary` | Subtle borders |
| `border-tertiary` | Very subtle borders |
| `border-brand` | Brand accent |
| `border-brand_alt` | Alternative brand |
| `border-brand-solid` | Solid brand color |
| `border-error` | Error states |
| `border-error_subtle` | Subtle error |
| `border-disabled` | Disabled elements |
| `border-disabled_subtle` | Subtle disabled |

### Border Patterns

```tsx
// Card border
<div className="border border-primary rounded-xl bg-secondary">
  Card content
</div>

// Divider
<hr className="border-t border-secondary my-4" />

// Input border
<input className="border border-primary rounded-md focus:border-brand" />

// Selected state
<div className="border-2 border-brand rounded-lg">
  Selected item
</div>

// Error state
<input className="border border-error rounded-md" />
```

### Chart Borders

For data visualization elements:

```tsx
<div className="border-2 border-chart-1">Chart 1</div>
<div className="border-2 border-chart-2">Chart 2</div>
<div className="border-2 border-chart-1-muted">Muted</div>
```

## Ring Utilities

Rings create box-shadow-based borders, typically for focus states. They don't affect layout.

### Basic Rings

```tsx
// Focus ring on interactive elements
<button className="focus:ring-2 ring-brand focus:outline-none">
  Button
</button>

// Ring widths
<div className="ring-1 ring-primary">1px ring</div>
<div className="ring-2 ring-primary">2px ring</div>
<div className="ring ring-primary">3px ring (default)</div>
<div className="ring-4 ring-brand">4px ring</div>
```

### Ring Colors

| Utility | Usage |
|---------|-------|
| `ring-primary` | Default focus ring |
| `ring-secondary` | Subtle ring |
| `ring-tertiary` | Very subtle ring |
| `ring-brand` | Brand focus |
| `ring-brand-primary` | Emphasized brand |
| `ring-brand-solid` | Solid brand |
| `ring-error` | Error focus |
| `ring-error_subtle` | Subtle error |
| `ring-disabled` | Disabled state |

### Focus Ring Patterns

```tsx
// Standard focus pattern
<button className="
  focus:ring-2
  focus:ring-brand
  focus:outline-none
  rounded-md
">
  Primary Button
</button>

// With ring offset
<button className="
  focus:ring-2
  focus:ring-brand
  focus:ring-offset-2
  focus:outline-none
  rounded-md
">
  Offset Ring
</button>

// Input focus
<input className="
  border border-primary
  focus:ring-2 focus:ring-brand
  focus:border-transparent
  rounded-md
" />

// Error focus
<input className="
  border border-error
  focus:ring-2 focus:ring-error_subtle
  rounded-md
" />
```

### Ring Offset Colors

Control the gap color between element and ring:

```tsx
// On white background
<button className="ring-2 ring-brand ring-offset-2 ring-offset-white">
  Button
</button>

// On colored background
<div className="bg-brand-solid p-4">
  <button className="ring-2 ring-white ring-offset-2 ring-offset-brand-600">
    Button on brand
  </button>
</div>
```

### Chart Rings

```tsx
<div className="ring-2 ring-chart-1">Chart 1 ring</div>
<div className="ring-2 ring-chart-1-muted">Muted ring</div>
```

## Outline Utilities

Outlines don't take up space and are useful for focus indicators that shouldn't shift layout.

### Basic Outlines

```tsx
<button className="focus:outline-2 focus:outline-brand">
  Outlined focus
</button>

// Outline offset
<button className="focus:outline-2 focus:outline-offset-2 focus:outline-brand">
  Offset outline
</button>
```

### Outline Colors

| Utility | Usage |
|---------|-------|
| `outline-primary` | Default outline |
| `outline-secondary` | Subtle outline |
| `outline-tertiary` | Very subtle |
| `outline-brand` | Brand accent |
| `outline-brand-solid` | Solid brand |
| `outline-error` | Error state |
| `outline-error_subtle` | Subtle error |
| `outline-disabled` | Disabled |

### Outline Patterns

```tsx
// Keyboard focus indicator
<a className="
  focus-visible:outline-2
  focus-visible:outline-brand
  focus-visible:outline-offset-2
" href="#">
  Link with keyboard focus
</a>

// Form input outline
<input className="
  focus:outline-2
  focus:outline-brand
  focus:outline-offset-0
  border-0
" />
```

## Choosing Between Border, Ring, and Outline

| Property | Layout Impact | Radius | Best For |
|----------|---------------|--------|----------|
| Border | Yes (adds width) | Follows element | Decorative borders |
| Ring | No (box-shadow) | Follows element | Focus states |
| Outline | No (outside box) | Can differ | Focus, doesn't follow radius |

### Decision Guide

```tsx
// Use BORDER for:
// - Card edges
// - Dividers
// - Input fields (default state)
<div className="border border-primary rounded-lg" />

// Use RING for:
// - Focus indicators (best for rounded elements)
// - Interactive states that shouldn't shift layout
<button className="focus:ring-2 ring-brand rounded-full" />

// Use OUTLINE for:
// - Focus indicators on elements without border-radius
// - When you need to outline parent without affecting children
<a className="focus:outline-2 outline-brand" />
```

## Combined Patterns

### Input Field Complete

```tsx
<input className="
  // Base
  bg-secondary
  border border-primary
  rounded-md
  px-3 py-2
  text-primary
  placeholder:text-placeholder

  // Focus
  focus:border-transparent
  focus:ring-2 focus:ring-brand

  // Error (conditional)
  // border-error focus:ring-error_subtle

  // Disabled
  disabled:bg-disabled
  disabled:border-disabled
  disabled:text-disabled
" />
```

### Button Complete

```tsx
<button className="
  // Base
  bg-brand-solid
  rounded-lg
  px-4 py-2
  text-white

  // Hover
  hover:bg-brand-solid_hover

  // Focus
  focus:ring-2 focus:ring-brand focus:ring-offset-2
  focus:outline-none

  // Disabled
  disabled:bg-disabled
  disabled:text-disabled
  disabled:cursor-not-allowed
">
  Button
</button>
```

### Selectable Card

```tsx
<div className={cn(
  "border-2 rounded-xl p-4 cursor-pointer transition-colors",
  isSelected
    ? "border-brand bg-brand-primary"
    : "border-primary bg-secondary hover:border-secondary"
)}>
  Card content
</div>
```

## Related

- [Colors](./colors.md): Color utilities reference
- [Effects](./effects.md): Shine borders, depth gradients
- [All Utilities](../reference/all-utilities.md): Complete utility list
