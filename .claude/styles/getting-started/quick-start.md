# Quick Start

Get started with PAYVA's semantic design tokens in 5 minutes.

## Overview

The style system uses **semantic tokens** instead of raw color values. This ensures consistency, supports dark mode automatically, and makes the codebase maintainable.

## Basic Usage

### Backgrounds

```tsx
// Layer 1: Main content area
<div className="bg-primary" />

// Layer 2: Cards, inputs, subtle distinction
<div className="bg-secondary" />

// Layer 3: Emphasized sections
<div className="bg-tertiary" />

// Layer 4: Maximum emphasis
<div className="bg-quaternary" />
```

### Text Colors

```tsx
// Primary content
<p className="text-primary">Main heading</p>

// Supporting content
<p className="text-secondary">Description text</p>

// Muted/tertiary
<p className="text-tertiary">Helper text</p>

// Disabled state
<p className="text-disabled">Unavailable option</p>
```

### Borders

```tsx
// Standard border
<div className="border border-primary rounded-lg" />

// Subtle border
<div className="border border-secondary rounded-lg" />

// Brand accent
<div className="border-2 border-brand rounded-lg" />
```

### Status Colors

```tsx
// Error states
<div className="bg-error-primary text-error-primary" />

// Success states
<div className="bg-success-primary text-success-primary" />

// Warning states
<div className="bg-warning-primary text-warning-primary" />

// Brand emphasis
<div className="bg-brand-primary text-brand-primary" />
```

## Focus States

Use `ring-*` utilities for focus indicators:

```tsx
<button className="focus:ring-2 focus:ring-brand focus:outline-none">
  Click me
</button>

// With offset
<input className="focus:ring-2 focus:ring-brand focus:ring-offset-2" />
```

## Hover States

Semantic hover variants are available:

```tsx
<button className="bg-secondary hover:bg-secondary_hover">
  Hover me
</button>

<a className="text-secondary hover:text-secondary_hover">
  Link text
</a>
```

## The Token Hierarchy

```
Base Colors (raw RGB)
    ↓
Semantic Tokens (--color-bg-primary)
    ↓
Property Tokens (--background-color-primary)
    ↓
Tailwind Utilities (bg-primary)
```

This hierarchy enables:
- **Dark mode**: Tokens automatically swap in `.dark-mode`
- **Consistency**: Same utility, different context = correct color
- **Maintainability**: Change once, update everywhere

## Common Patterns

### Card Component

```tsx
<div className="bg-secondary border border-primary rounded-xl p-4 shadow-sm">
  <h3 className="text-primary text-lg font-medium">Title</h3>
  <p className="text-secondary mt-2">Description</p>
</div>
```

### Input Field

```tsx
<input
  className="
    bg-secondary
    border border-primary
    rounded-md
    px-3 py-2
    text-primary
    placeholder:text-placeholder
    focus:ring-2 focus:ring-brand focus:border-transparent
  "
  placeholder="Enter text..."
/>
```

### Button

```tsx
// Primary button
<button className="bg-brand-solid hover:bg-brand-solid_hover text-white rounded-lg px-4 py-2">
  Primary Action
</button>

// Secondary button
<button className="bg-secondary hover:bg-secondary_hover text-primary border border-primary rounded-lg px-4 py-2">
  Secondary Action
</button>

// Destructive button
<button className="bg-error-solid hover:bg-error-solid_hover text-white rounded-lg px-4 py-2">
  Delete
</button>
```

## What NOT to Do

```tsx
// BAD: Hardcoded colors
<div className="bg-gray-100 text-gray-900 border-gray-300" />

// GOOD: Semantic tokens
<div className="bg-secondary text-primary border-primary" />

// BAD: CSS variables directly
<div style={{ backgroundColor: 'var(--color-bg-primary)' }} />

// GOOD: Tailwind utilities
<div className="bg-primary" />

// BAD: Dark mode variants
<div className="bg-white dark:bg-gray-900" />

// GOOD: Automatic via tokens
<div className="bg-primary" /> // Handles both modes
```

## Next Steps

- [Dark Mode](./dark-mode.md): Understanding theme switching
- [Migration Rules](./migration-rules.md): Converting existing code
- [Colors](../tokens/colors.md): Deep dive into the color system
