# Progress

A high-quality, unstyled React progress bar component that displays the status of a task that takes a long time.

## Overview

The Progress component displays task completion status with accessible screen reader support.

## Basic Usage

```tsx
import { Progress } from '@base-ui/react/progress';

<Progress.Root value={60}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

## Core Components

| Component | Purpose |
|-----------|---------|
| `Progress.Root` | Container with ARIA attributes |
| `Progress.Track` | Container for the indicator |
| `Progress.Indicator` | Visual progress representation |
| `Progress.Value` | Text display of progress |
| `Progress.Label` | Accessible label |

## Key Props (Root)

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `value` | number \| null | 0 | Current value; null = indeterminate |
| `min` | number | 0 | Minimum value |
| `max` | number | 100 | Maximum value |
| `locale` | string | - | Number formatting locale |
| `format` | object | - | Intl.NumberFormatOptions |
| `getAriaValueText` | function | - | Custom accessible text |

## With Label and Value

```tsx
<Progress.Root value={75}>
  <Progress.Label>Loading...</Progress.Label>
  <Progress.Value />
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

## Indeterminate State

```tsx
<Progress.Root value={null}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

## Custom Formatting

```tsx
<Progress.Root
  value={0.75}
  min={0}
  max={1}
  format={{ style: 'percent' }}
>
  <Progress.Value /> {/* Displays "75%" */}
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

## Data Attributes

- `data-complete`: Progress is at max value
- `data-indeterminate`: Value is null
- `data-progressing`: Value is between min and max

## Styling Example

```css
.Track {
  position: relative;
  height: 4px;
  background: var(--color-gray-200);
  border-radius: 9999px;
  overflow: hidden;
}

.Indicator {
  background: var(--color-blue-500);
  height: 100%;
  transition: width 500ms ease;
}

.Indicator[data-indeterminate] {
  animation: indeterminate 1.5s infinite;
}

@keyframes indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
```

## Controlled Example

```tsx
const [progress, setProgress] = React.useState(0);

React.useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => Math.min(prev + 10, 100));
  }, 500);
  return () => clearInterval(interval);
}, []);

<Progress.Root value={progress}>
  <Progress.Track>
    <Progress.Indicator style={{ width: `${progress}%` }} />
  </Progress.Track>
</Progress.Root>
```
