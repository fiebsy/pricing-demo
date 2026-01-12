# Slider Control

Numeric range input with slider track and direct text input.

## Overview

The slider control provides a visual range selector combined with a text input for precise values. Values are automatically clamped and snapped to the step value.

## Basic Usage

```typescript
const control: SliderControl = {
  id: 'opacity',
  type: 'slider',
  label: 'Opacity',
  value: 100,
  min: 0,
  max: 100,
  step: 1,
}
```

## With Format Label

Display units or transform values:

```typescript
// Percentage display
{
  id: 'opacity',
  type: 'slider',
  label: 'Opacity',
  value: 100,
  min: 0,
  max: 100,
  step: 1,
  formatLabel: (v) => `${v}%`,
}

// Pixel values
{
  id: 'padding',
  type: 'slider',
  label: 'Padding',
  value: 16,
  min: 0,
  max: 64,
  step: 4,
  formatLabel: (v) => `${v}px`,
}

// Milliseconds
{
  id: 'duration',
  type: 'slider',
  label: 'Duration',
  value: 300,
  min: 0,
  max: 1000,
  step: 50,
  formatLabel: (v) => `${v}ms`,
}
```

## Type Definition

```typescript
interface SliderControl extends ControlBase {
  type: 'slider'
  value: number
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `label` | `string` | Yes | Display label |
| `value` | `number` | Yes | Current value |
| `min` | `number` | Yes | Minimum value |
| `max` | `number` | Yes | Maximum value |
| `step` | `number` | Yes | Increment amount |
| `formatLabel` | `(v: number) => string` | No | Value formatter |
| `description` | `string` | No | Helper text |
| `disabled` | `boolean` | No | Disable control |

## Behavior

### Text Input

- Accepts numeric input with optional formatting suffix
- Parses numbers from formatted strings (e.g., "16px" → 16)
- Commits on blur or Enter key
- Cancels on Escape key
- Clamps to min/max range
- Snaps to nearest step value

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter` | Commit current input value |
| `Escape` | Cancel and restore previous value |

## Common Patterns

### Spacing Scale

```typescript
{
  id: 'gap',
  type: 'slider',
  label: 'Gap',
  value: 16,
  min: 0,
  max: 48,
  step: 4,
  formatLabel: (v) => `${v}px`,
}
```

### Decimal Values

```typescript
{
  id: 'scale',
  type: 'slider',
  label: 'Scale',
  value: 1,
  min: 0.5,
  max: 2,
  step: 0.1,
  formatLabel: (v) => `${v}x`,
}
```

---

## Related

- [Select Control](./select.md) - Dropdown selection
- [Types](../api/types.md) - Full type definitions
