# Meter

A high-quality, unstyled React meter component that provides a graphical display of a numeric value.

## Overview

The Meter displays a scalar measurement within a known range, like disk usage or password strength.

## Basic Usage

```tsx
import { Meter } from '@base-ui/react/meter';

<Meter.Root value={75}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

## Core Components

| Component | Element | Purpose |
|-----------|---------|---------|
| `Meter.Root` | - | Container and state manager |
| `Meter.Label` | `<span>` | Accessible label |
| `Meter.Track` | `<div>` | Range container |
| `Meter.Indicator` | `<div>` | Visual meter bar |
| `Meter.Value` | `<span>` | Current value display |

## Key Props (Root)

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `value` | number | - | Current numeric value |
| `min` | number | 0 | Minimum value |
| `max` | number | 100 | Maximum value |
| `aria-valuetext` | string | - | User-friendly description |
| `getAriaValueText` | function | - | Dynamic text alternative |
| `locale` | string | - | Number formatting locale |
| `format` | object | - | Intl.NumberFormatOptions |

## With Label and Value

```tsx
<Meter.Root value={60}>
  <Meter.Label>Storage Used</Meter.Label>
  <Meter.Value />
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

## Custom Formatting

```tsx
<Meter.Root
  value={0.6}
  min={0}
  max={1}
  format={{ style: 'percent' }}
>
  <Meter.Value /> {/* Displays "60%" */}
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

## Dynamic Value Text

```tsx
<Meter.Root
  value={75}
  getAriaValueText={(value, max) => `${value} of ${max} GB used`}
>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

## Styling Example

```css
.Track {
  height: 8px;
  background: var(--color-gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.Indicator {
  height: 100%;
  background: var(--color-blue-500);
  transition: width 300ms ease;
}

/* Color based on value */
.Indicator[data-value="low"] { background: var(--color-green-500); }
.Indicator[data-value="medium"] { background: var(--color-yellow-500); }
.Indicator[data-value="high"] { background: var(--color-red-500); }
```

## Data Attributes

Dynamic styling via state functions:

```tsx
<Meter.Indicator
  className={(state) =>
    `indicator ${state.value > 80 ? 'indicator-warning' : ''}`
  }
/>
```
