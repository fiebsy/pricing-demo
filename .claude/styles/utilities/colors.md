# Color Utilities

Semantic color utilities for text, backgrounds, borders, rings, and outlines.

## Overview

Color utilities are generated from property tokens defined in `theme.css`. They use semantic names instead of raw color values, enabling automatic dark mode support.

**File Location:** `src/styles/utilities/colors.css`

## Text Colors

### Primary Text Hierarchy

```tsx
<p className="text-primary">Main content text</p>
<p className="text-secondary">Supporting text</p>
<p className="text-tertiary">Muted text</p>
<p className="text-quaternary">Very muted text</p>
<p className="text-disabled">Disabled state</p>
```

### Text Hover States

```tsx
<a className="text-secondary hover:text-secondary_hover">Link</a>
<a className="text-tertiary hover:text-tertiary_hover">Subtle link</a>
```

### Brand Text

```tsx
<span className="text-brand-primary">Brand emphasis</span>
<span className="text-brand-secondary">Brand accent</span>
<span className="text-brand-tertiary">Subtle brand</span>
<a className="text-brand-secondary hover:text-brand-secondary_hover">Brand link</a>
```

### Status Text

```tsx
<span className="text-error-primary">Error message</span>
<span className="text-success-primary">Success message</span>
<span className="text-warning-primary">Warning message</span>
```

### Special Text

```tsx
<span className="text-white">White text (on dark bg)</span>
<input className="placeholder:text-placeholder" />
<input className="placeholder:text-placeholder_subtle" />
```

### On-Brand Text (for brand backgrounds)

```tsx
<div className="bg-brand-solid">
  <p className="text-primary_on-brand">Primary on brand</p>
  <p className="text-secondary_on-brand">Secondary on brand</p>
</div>
```

### Foreground Text (Icons)

Use `text-fg-*` for icon colors:

```tsx
<Icon className="text-fg-primary" />
<Icon className="text-fg-secondary" />
<Icon className="text-fg-tertiary" />
<Icon className="text-fg-quaternary" />
<Icon className="text-fg-disabled" />
<Icon className="text-fg-brand-primary" />
<Icon className="text-fg-error-primary" />
<Icon className="text-fg-success-primary" />
<Icon className="text-fg-warning-primary" />
```

### Chart Text Colors

```tsx
<span className="text-chart-1">Chart 1 label</span>
<span className="text-chart-2">Chart 2 label</span>
<span className="text-chart-3">Chart 3 label</span>
<span className="text-chart-4">Chart 4 label</span>
<span className="text-chart-warning">Warning label</span>
<span className="text-chart-error">Error label</span>
```

## Background Colors

### Primary Background Hierarchy

```tsx
<div className="bg-primary">Main content area</div>
<div className="bg-secondary">Cards, inputs</div>
<div className="bg-tertiary">Sections</div>
<div className="bg-quaternary">Maximum emphasis</div>
```

### Background Hover States

```tsx
<button className="bg-primary hover:bg-primary_hover">Button</button>
<button className="bg-secondary hover:bg-secondary_hover">Card</button>
```

### Background Variants

```tsx
<div className="bg-active">Active/selected state</div>
<div className="bg-disabled">Disabled state</div>
<div className="bg-disabled_subtle">Subtle disabled</div>
<div className="bg-overlay">Backdrop overlay</div>
```

### Intermediate Steps

Fine-grained control between levels:

```tsx
<div className="bg-primary_s1">Step toward secondary</div>
<div className="bg-secondary_p1">Step toward primary</div>
<div className="bg-secondary_t1">Step toward tertiary</div>
<div className="bg-secondary_t2">Two steps toward tertiary</div>
<div className="bg-secondary_subtle">Very subtle secondary</div>
```

### Brand Backgrounds

```tsx
<div className="bg-brand-primary">Light brand bg</div>
<div className="bg-brand-secondary">Accent brand bg</div>
<button className="bg-brand-solid">Solid brand button</button>
<button className="bg-brand-solid hover:bg-brand-solid_hover">With hover</button>
<section className="bg-brand-section">Brand section</section>
```

### Status Backgrounds

```tsx
<div className="bg-error-primary">Light error</div>
<div className="bg-error-secondary">Strong error</div>
<button className="bg-error-solid">Error button</button>

<div className="bg-success-primary">Light success</div>
<div className="bg-success-secondary">Strong success</div>
<button className="bg-success-solid">Success button</button>

<div className="bg-warning-primary">Light warning</div>
<div className="bg-warning-secondary">Strong warning</div>
<button className="bg-warning-solid">Warning button</button>
```

### Inverted Backgrounds

For opposite contrast (dark in light mode, light in dark):

```tsx
<div className="bg-inverted-primary">Primary inverted</div>
<div className="bg-inverted-secondary">Secondary inverted</div>
<div className="bg-inverted-tertiary">Tertiary inverted</div>
```

### Chart Backgrounds

```tsx
<div className="bg-chart-1">Chart 1 (Green)</div>
<div className="bg-chart-1-muted">Muted variant</div>
<div className="bg-chart-1-alpha-10">10% opacity</div>
<div className="bg-chart-1-alpha-20">20% opacity</div>
<div className="bg-chart-1-alpha-30">30% opacity</div>
<div className="bg-chart-1-alpha-50">50% opacity</div>
```

### Utility Backgrounds

Direct palette access (for charts, special cases):

```tsx
<div className="bg-utility-brand-500">Direct brand 500</div>
<div className="bg-utility-error-300">Direct error 300</div>
<div className="bg-utility-success-600">Direct success 600</div>
```

## Border Colors

### Primary Border Hierarchy

```tsx
<div className="border border-primary">Standard border</div>
<div className="border border-secondary">Subtle border</div>
<div className="border border-tertiary">Very subtle</div>
```

### Special Borders

```tsx
<div className="border border-brand">Brand accent</div>
<div className="border border-brand_alt">Alt brand</div>
<div className="border-2 border-brand-solid">Solid brand</div>
<div className="border border-error">Error state</div>
<div className="border border-error_subtle">Subtle error</div>
<div className="border border-disabled">Disabled</div>
```

### Chart Borders

```tsx
<div className="border border-chart-1">Chart 1 border</div>
<div className="border border-chart-1-muted">Muted variant</div>
```

## Ring Colors (Focus)

Focus rings for keyboard navigation:

```tsx
<button className="focus:ring-1 ring-primary">Primary ring</button>
<button className="focus:ring-2 ring-brand">Brand ring</button>
<button className="focus:ring-2 ring-brand-primary">Brand primary</button>
<input className="focus:ring-2 ring-error">Error ring</input>
```

### All Ring Tokens

```tsx
ring-primary          // Standard focus
ring-secondary        // Subtle focus
ring-tertiary         // Very subtle
ring-brand            // Brand accent
ring-brand-primary    // Brand emphasis
ring-brand-solid      // Solid brand
ring-error            // Error state
ring-error_subtle     // Subtle error
ring-disabled         // Disabled
ring-chart-1          // Chart colors
ring-chart-1-muted    // Muted chart
```

## Outline Colors

For outline-style focus indicators:

```tsx
<button className="focus:outline-2 outline-primary">Primary</button>
<button className="focus:outline-2 outline-brand">Brand</button>
<input className="focus:outline-2 outline-error">Error</input>
```

### All Outline Tokens

```tsx
outline-primary
outline-secondary
outline-tertiary
outline-brand
outline-brand-solid
outline-error
outline-error_subtle
outline-disabled
```

## On-Inverted Text

Text colors for use on inverted backgrounds:

```tsx
<div className="bg-inverted-primary">
  <p className="text-on-inverted-primary">Primary text</p>
  <p className="text-on-inverted-secondary">Secondary text</p>
  <p className="text-on-inverted-tertiary">Tertiary text</p>
  <p className="text-on-inverted-quaternary">Quaternary text</p>
</div>
```

## Common Patterns

### Card with All Color Types

```tsx
<div className="
  bg-secondary
  border border-primary
  rounded-xl
">
  <h3 className="text-primary">Title</h3>
  <p className="text-secondary">Description</p>
  <Icon className="text-fg-tertiary" />
</div>
```

### Interactive Element

```tsx
<button className="
  bg-secondary
  hover:bg-secondary_hover
  border border-primary
  text-primary
  focus:ring-2 ring-brand
">
  Click me
</button>
```

### Status Badge Set

```tsx
<span className="bg-success-primary text-success-primary">Active</span>
<span className="bg-warning-primary text-warning-primary">Pending</span>
<span className="bg-error-primary text-error-primary">Failed</span>
```

### Input with States

```tsx
{/* Default */}
<input className="bg-secondary border-primary text-primary placeholder:text-placeholder" />

{/* Focused */}
<input className="bg-secondary border-brand ring-2 ring-brand" />

{/* Error */}
<input className="bg-secondary border-error ring-2 ring-error_subtle" />

{/* Disabled */}
<input className="bg-disabled border-disabled text-disabled" disabled />
```

## Related

- [Colors Token Reference](../tokens/colors.md): Complete token definitions
- [Migration Rules](../getting-started/migration-rules.md): Converting from hardcoded colors
- [Borders & Rings](./borders-rings.md): Detailed border utilities
