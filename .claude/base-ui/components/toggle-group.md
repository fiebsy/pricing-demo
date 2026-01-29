# Toggle Group

A high-quality, unstyled React toggle group component that provides shared state to a series of toggle buttons.

## Overview

The Toggle Group manages state across multiple toggle buttons, supporting single or multiple selection.

## Basic Usage

```tsx
import { ToggleGroup, Toggle } from '@base-ui/react/toggle-group';

<ToggleGroup defaultValue={['bold']}>
  <Toggle value="bold">B</Toggle>
  <Toggle value="italic">I</Toggle>
  <Toggle value="underline">U</Toggle>
</ToggleGroup>
```

## Key Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `defaultValue` | any[] | - | Initial selected values |
| `value` | any[] | - | Controlled selected values |
| `onValueChange` | function | - | Selection change callback |
| `multiple` | boolean | false | Enable multi-selection |
| `disabled` | boolean | false | Disable all toggles |
| `orientation` | string | 'horizontal' | Layout direction |
| `loopFocus` | boolean | true | Wrap keyboard focus |

## Data Attributes

- `data-orientation`: Layout direction
- `data-disabled`: Disabled state
- `data-multiple`: Multi-selection enabled

## Single Selection

```tsx
<ToggleGroup defaultValue={['left']}>
  <Toggle value="left">Left</Toggle>
  <Toggle value="center">Center</Toggle>
  <Toggle value="right">Right</Toggle>
</ToggleGroup>
```

## Multiple Selection

```tsx
<ToggleGroup multiple defaultValue={['bold', 'italic']}>
  <Toggle value="bold">Bold</Toggle>
  <Toggle value="italic">Italic</Toggle>
  <Toggle value="underline">Underline</Toggle>
</ToggleGroup>
```

## Controlled Example

```tsx
const [value, setValue] = React.useState(['option1']);

<ToggleGroup value={value} onValueChange={setValue}>
  <Toggle value="option1">Option 1</Toggle>
  <Toggle value="option2">Option 2</Toggle>
</ToggleGroup>
```

## Vertical Orientation

```tsx
<ToggleGroup orientation="vertical" defaultValue={['item1']}>
  <Toggle value="item1">Item 1</Toggle>
  <Toggle value="item2">Item 2</Toggle>
  <Toggle value="item3">Item 3</Toggle>
</ToggleGroup>
```

## Styling Example

```tsx
<ToggleGroup
  className="flex rounded-md border border-gray-200"
  defaultValue={['left']}
>
  <Toggle
    value="left"
    className="px-3 py-2 border-r border-gray-200 data-[pressed]:bg-gray-100"
  >
    Left
  </Toggle>
  <Toggle
    value="center"
    className="px-3 py-2 border-r border-gray-200 data-[pressed]:bg-gray-100"
  >
    Center
  </Toggle>
  <Toggle
    value="right"
    className="px-3 py-2 data-[pressed]:bg-gray-100"
  >
    Right
  </Toggle>
</ToggleGroup>
```

## Keyboard Navigation

- Arrow keys navigate between toggles
- Space/Enter activates the focused toggle
- Tab moves focus in/out of the group
