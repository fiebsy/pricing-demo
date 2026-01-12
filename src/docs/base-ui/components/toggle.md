# Toggle

A high-quality, unstyled React toggle component that displays a two-state button that can be on or off.

## Overview

The Toggle creates a two-state button that can be pressed or unpressed.

## Basic Usage

```tsx
import { Toggle } from '@base-ui/react/toggle';

<Toggle defaultPressed={false}>
  <HeartIcon />
</Toggle>
```

## Key Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `value` | string | - | Identifier for toggle groups |
| `pressed` | boolean | - | Controlled state |
| `defaultPressed` | boolean | false | Initial uncontrolled state |
| `onPressedChange` | function | - | State change callback |
| `disabled` | boolean | false | Disable interaction |
| `render` | function | - | Custom element rendering |

## Data Attributes

- `data-pressed`: Applied when toggle is pressed

## Controlled Example

```tsx
const [pressed, setPressed] = React.useState(false);

<Toggle pressed={pressed} onPressedChange={setPressed}>
  {pressed ? 'On' : 'Off'}
</Toggle>
```

## With Icons

```tsx
<Toggle defaultPressed={false}>
  {(state) =>
    state.pressed ? <HeartFilledIcon /> : <HeartOutlineIcon />
  }
</Toggle>
```

## Using Render Prop

```tsx
<Toggle
  render={(props, state) => (
    <button {...props}>
      {state.pressed ? 'Active' : 'Inactive'}
    </button>
  )}
/>
```

## Styling Example

```tsx
<Toggle
  className="flex size-10 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 data-[pressed]:bg-blue-100 data-[pressed]:text-blue-600 data-[pressed]:border-blue-200"
>
  <StarIcon />
</Toggle>
```

## Accessibility

The toggle renders as a native `<button>` element with proper ARIA attributes. Use `aria-label` for icon-only toggles:

```tsx
<Toggle aria-label="Add to favorites">
  <HeartIcon />
</Toggle>
```
