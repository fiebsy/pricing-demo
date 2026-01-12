# Select Control

Dropdown selection with optional color swatches and descriptions.

## Overview

The select control provides a dropdown menu for choosing from a predefined list of options. It supports color swatches for visual selection and optional descriptions for each option.

## Basic Usage

```typescript
const control: SelectControl = {
  id: 'variant',
  type: 'select',
  label: 'Variant',
  value: 'default',
  options: [
    { label: 'Default', value: 'default' },
    { label: 'Compact', value: 'compact' },
    { label: 'Expanded', value: 'expanded' },
  ],
}
```

## With Color Swatches

Enable `showColorSwatch` and provide `color` values:

```typescript
{
  id: 'theme',
  type: 'select',
  label: 'Theme',
  value: 'blue',
  showColorSwatch: true,
  options: [
    { label: 'Blue', value: 'blue', color: '#3b82f6' },
    { label: 'Green', value: 'green', color: '#22c55e' },
    { label: 'Purple', value: 'purple', color: '#a855f7' },
  ],
}
```

## Color Select Variant

For more prominent color selection, use `color-select`:

```typescript
const control: ColorSelectControl = {
  id: 'accentColor',
  type: 'color-select',
  label: 'Accent Color',
  value: 'brand',
  swatchSize: 'md',
  options: [
    { label: 'Brand', value: 'brand', color: 'var(--color-brand)' },
    { label: 'Success', value: 'success', color: 'var(--color-success)' },
    { label: 'Warning', value: 'warning', color: 'var(--color-warning)' },
    { label: 'Error', value: 'error', color: 'var(--color-error)' },
  ],
}
```

## Type Definitions

### SelectControl

```typescript
interface SelectControl extends ControlBase {
  type: 'select'
  value: string
  options: Array<{
    label: string
    value: string
    color?: string
    description?: string
  }>
  showColorSwatch?: boolean
}
```

### ColorSelectControl

```typescript
interface ColorSelectControl extends ControlBase {
  type: 'color-select'
  value: string
  options: Array<{
    label: string
    value: string
    color?: string
    description?: string
  }>
  swatchSize?: 'xs' | 'sm' | 'md'
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `label` | `string` | Yes | Display label |
| `value` | `string` | Yes | Current selected value |
| `options` | `Option[]` | Yes | Available choices |
| `showColorSwatch` | `boolean` | No | Show color swatches (select) |
| `swatchSize` | `'xs' \| 'sm' \| 'md'` | No | Swatch size (color-select) |
| `description` | `string` | No | Helper text |
| `disabled` | `boolean` | No | Disable control |

### Option Properties

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Display text |
| `value` | `string` | Yes | Option value |
| `color` | `string` | No | CSS color for swatch |
| `description` | `string` | No | Secondary text |

## CSS Variable Colors

Color values support CSS custom properties:

```typescript
{
  label: 'Primary',
  value: 'primary',
  color: 'var(--color-text-primary)',
}
```

The ColorSwatch component resolves CSS variables at runtime using `getComputedStyle`.

## Common Patterns

### Enum Selection

```typescript
{
  id: 'alignment',
  type: 'select',
  label: 'Alignment',
  value: 'left',
  options: [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
  ],
}
```

### With Descriptions

```typescript
{
  id: 'animation',
  type: 'select',
  label: 'Animation',
  value: 'spring',
  options: [
    { label: 'Spring', value: 'spring', description: 'Bouncy, natural feel' },
    { label: 'Ease', value: 'ease', description: 'Smooth acceleration' },
    { label: 'Linear', value: 'linear', description: 'Constant speed' },
  ],
}
```

---

## Related

- [Slider Control](./slider.md) - Numeric ranges
- [Toggle Control](./toggle.md) - Boolean values
- [Types](../api/types.md) - Full type definitions
