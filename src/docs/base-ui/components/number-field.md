# Number Field

A high-quality, unstyled React number field component with increment and decrement buttons, and a scrub area.

## Overview

The Number Field provides numeric input with stepping controls and drag-to-adjust functionality.

## Basic Usage

```tsx
import { NumberField } from '@base-ui/react/number-field';

<NumberField.Root>
  <NumberField.Group>
    <NumberField.Decrement>-</NumberField.Decrement>
    <NumberField.Input />
    <NumberField.Increment>+</NumberField.Increment>
  </NumberField.Group>
</NumberField.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `NumberField.Root` | State management container |
| `NumberField.ScrubArea` | Drag zone for value adjustment |
| `NumberField.ScrubAreaCursor` | Custom cursor display |
| `NumberField.Group` | Button and input wrapper |
| `NumberField.Input` | Native number input |
| `NumberField.Increment` | Increase button |
| `NumberField.Decrement` | Decrease button |

## Key Props (Root)

| Prop | Type | Purpose |
|------|------|---------|
| `value` | number | Controlled value |
| `defaultValue` | number | Initial uncontrolled value |
| `onValueChange` | function | Value change callback |
| `onValueCommitted` | function | Fires on blur or pointer release |
| `step` | number | Standard increment (default: 1) |
| `smallStep` | number | Shift-key increment |
| `largeStep` | number | Page Up/Down increment |
| `min` | number | Minimum value |
| `max` | number | Maximum value |
| `format` | object | Intl.NumberFormatOptions |
| `locale` | string | Formatting locale |
| `allowWheelScrub` | boolean | Enable mouse wheel adjustment |

## With Scrub Area

```tsx
<NumberField.Root>
  <NumberField.ScrubArea direction="horizontal">
    <label>Quantity</label>
    <NumberField.ScrubAreaCursor />
  </NumberField.ScrubArea>
  <NumberField.Group>
    <NumberField.Decrement>-</NumberField.Decrement>
    <NumberField.Input />
    <NumberField.Increment>+</NumberField.Increment>
  </NumberField.Group>
</NumberField.Root>
```

## ScrubArea Props

| Prop | Default | Purpose |
|------|---------|---------|
| `direction` | 'horizontal' | 'horizontal' or 'vertical' |
| `pixelSensitivity` | 2 | Movement threshold |
| `teleportDistance` | - | Cursor wrapping distance |

## Change Reasons

The `onValueChange` callback includes a `reason`:
- `'input-change'`, `'input-clear'`, `'input-paste'`
- `'keyboard'`, `'increment-press'`, `'decrement-press'`
- `'wheel'`, `'scrub'`
- `'input-blur'` (formatting/clamping)

## Data Attributes

- `data-disabled`, `data-readonly`, `data-required`
- `data-valid`, `data-invalid`
- `data-dirty`, `data-touched`, `data-filled`, `data-focused`
- `data-scrubbing`: During drag interactions

## Currency Formatting

```tsx
<NumberField.Root
  format={{
    style: 'currency',
    currency: 'USD',
  }}
>
  <NumberField.Input />
</NumberField.Root>
```

## Field Integration

```tsx
<Field.Root>
  <Field.Label>Quantity</Field.Label>
  <NumberField.Root>
    <NumberField.Group>
      <NumberField.Decrement>-</NumberField.Decrement>
      <NumberField.Input />
      <NumberField.Increment>+</NumberField.Increment>
    </NumberField.Group>
  </NumberField.Root>
  <Field.Error />
</Field.Root>
```

## Accessibility

The input must have a meaningful label. Use `<Field>` for visible labels or `aria-label` as fallback.
