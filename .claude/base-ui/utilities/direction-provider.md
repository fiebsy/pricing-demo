# Direction Provider

A utility component that provides text direction context to Base UI components.

## Overview

Direction Provider enables RTL (right-to-left) support for Base UI components by providing direction context throughout your component tree.

## Basic Usage

```tsx
import { DirectionProvider } from '@base-ui/react/direction-provider';

<DirectionProvider direction="rtl">
  <App />
</DirectionProvider>
```

## Key Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `direction` | 'ltr' \| 'rtl' | 'ltr' | Text direction |
| `children` | ReactNode | - | Components that use direction |

## How It Works

When wrapped in DirectionProvider, Base UI components automatically adjust:
- Positioning (side: 'start' becomes right in RTL)
- Arrow directions
- Keyboard navigation (arrow keys reversed)
- Scroll directions

## Example with Popover

```tsx
<DirectionProvider direction="rtl">
  <Popover.Root>
    <Popover.Trigger>فتح</Popover.Trigger>
    <Popover.Portal>
      <Popover.Positioner side="start">
        {/* In RTL, 'start' positions to the right */}
        <Popover.Popup>
          <Popover.Arrow />
          محتوى النافذة
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  </Popover.Root>
</DirectionProvider>
```

## Dynamic Direction

```tsx
const [direction, setDirection] = React.useState<'ltr' | 'rtl'>('ltr');

<DirectionProvider direction={direction}>
  <button onClick={() => setDirection(d => d === 'ltr' ? 'rtl' : 'ltr')}>
    Toggle Direction
  </button>
  <App />
</DirectionProvider>
```

## Usage with HTML dir

You can also use the HTML `dir` attribute, which Base UI respects:

```tsx
<html dir="rtl">
  <body>
    <App />
  </body>
</html>
```

DirectionProvider is useful when you need to override the document direction for specific sections of your app.

## Affected Components

Components that respond to direction context:
- All popup positioning (Popover, Tooltip, Menu, Select, etc.)
- Slider and NumberField
- Navigation components
- Any component with 'start'/'end' positioning
