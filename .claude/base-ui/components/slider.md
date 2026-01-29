# Slider

A high-quality, unstyled React slider component that works like a range input and is easy to style.

## Overview

The Slider supports single values, ranges, and extensive customization through CSS or Tailwind.

## Basic Usage

```tsx
import { Slider } from '@base-ui/react/slider';

<Slider.Root defaultValue={50}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

## Component Structure

```
Slider.Root
├── Slider.Value
├── Slider.Control
│   └── Slider.Track
│       ├── Slider.Indicator
│       └── Slider.Thumb
```

## Key Props (Root)

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `defaultValue` | `number \| number[]` | - | Initial value(s) |
| `value` | `number \| number[]` | - | Controlled value |
| `onValueChange` | function | - | Fires during interaction |
| `onValueCommitted` | function | - | Fires on pointer release |
| `step` | number | 1 | Step granularity |
| `min` | number | 0 | Minimum value |
| `max` | number | 100 | Maximum value |
| `thumbAlignment` | string | 'center' | 'center', 'edge', or 'edge-client-only' |
| `thumbCollisionBehavior` | string | 'none' | 'push', 'swap', or 'none' |
| `orientation` | string | 'horizontal' | 'horizontal' or 'vertical' |
| `disabled` | boolean | false | Disable interaction |

## Range Slider

```tsx
<Slider.Root defaultValue={[25, 75]}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb index={0} />
      <Slider.Thumb index={1} />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

## With Value Display

```tsx
<Slider.Root defaultValue={50}>
  <Slider.Value />
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

## Controlled Example

```tsx
const [value, setValue] = React.useState(50);

<Slider.Root value={value} onValueChange={setValue}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

## Field Integration

```tsx
<Field.Root>
  <Slider.Root defaultValue={50}>
    <Field.Label>Volume</Field.Label>
    <Slider.Value />
    <Slider.Control>
      <Slider.Track>
        <Slider.Indicator />
        <Slider.Thumb />
      </Slider.Track>
    </Slider.Control>
  </Slider.Root>
</Field.Root>
```

## Data Attributes

- `data-dragging`: Thumb is being dragged
- `data-disabled`: Slider is disabled
- `data-orientation`: 'horizontal' or 'vertical'

## CSS Variables

- `--slider-thumb-*`: Thumb positioning
- `--slider-indicator-*`: Indicator dimensions

## Accessibility

Use `aria-label` or wrap within `Field`/`Fieldset` for proper labeling. The Thumb accepts `getAriaLabel` and `getAriaValueText` callbacks for dynamic screen reader text.
