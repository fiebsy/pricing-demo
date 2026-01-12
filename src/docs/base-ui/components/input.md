# Input

A high-quality, unstyled React input component.

## Overview

The Input component renders a native `<input>` element that automatically works with Field for form integration.

## Basic Usage

```tsx
import { Input } from '@base-ui/react/input';

<Input placeholder="Enter your name" />
```

## Key Props

| Prop | Type | Purpose |
|------|------|---------|
| `defaultValue` | string \| number | Initial value |
| `onValueChange` | function | Value change callback |
| `className` | string \| function | Static or state-based classes |
| `style` | object \| function | Static or dynamic styles |
| `render` | element | Custom rendered element |

## Data Attributes

When used within `Field.Root`:
- `data-disabled`: Input is disabled
- `data-valid` / `data-invalid`: Validation state
- `data-dirty`: Value has changed
- `data-touched`: Input has been focused
- `data-filled`: Input has a value
- `data-focused`: Input is focused

## With Field

```tsx
import { Field } from '@base-ui/react/field';
import { Input } from '@base-ui/react/input';

<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input type="email" required />
  <Field.Error />
</Field.Root>
```

## Dynamic Styling

```tsx
<Input
  className={(state) =>
    `input ${state.focused ? 'input-focused' : ''} ${state.invalid ? 'input-error' : ''}`
  }
/>
```

## Styling Example

```tsx
<Input
  placeholder="Name"
  className="h-10 w-full rounded-md border border-gray-300 px-3 text-base focus:border-blue-500 focus:outline-none data-[invalid]:border-red-500"
/>
```

## Accessibility

The input requires a meaningful label. Use `<Field>` to provide a visible text label, or use the `aria-label` attribute:

```tsx
<Input aria-label="Search" type="search" placeholder="Search..." />
```
