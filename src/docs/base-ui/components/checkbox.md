# Checkbox

A high-quality, unstyled React checkbox component that is easy to customize.

## Overview

Base UI's Checkbox provides flexible styling options with comprehensive accessibility support.

## Basic Usage

```tsx
import { Checkbox } from '@base-ui/react/checkbox';

<Checkbox.Root>
  <Checkbox.Indicator />
</Checkbox.Root>
```

## Core Components

- **Checkbox.Root**: The main checkbox element (renders as `<span>` with hidden `<input>`)
- **Checkbox.Indicator**: Visual indicator showing checked state (renders as `<span>`)

## Props (Root)

| Prop | Type | Purpose |
|------|------|---------|
| `defaultChecked` | boolean | Sets initial checked state (uncontrolled) |
| `checked` | boolean | Controls checked state (controlled) |
| `onCheckedChange` | function | Fires when user toggles checkbox |
| `indeterminate` | boolean | Enables mixed/partial state |
| `disabled` | boolean | Prevents user interaction |
| `readOnly` | boolean | Prevents toggling while visible |
| `required` | boolean | Marks as form requirement |
| `name` | string | Identifies field on form submission |
| `value` | string | Value of selected checkbox |
| `uncheckedValue` | string | Value submitted when unchecked |

## Data Attributes

The component responds to state with attributes for styling:
- `data-checked` / `data-unchecked`
- `data-disabled`, `data-readonly`, `data-required`
- `data-valid`, `data-invalid` (in Field.Root context)
- `data-dirty`, `data-touched`, `data-focused`

## Form Integration

```tsx
import { Field } from '@base-ui/react/field';
import { Checkbox } from '@base-ui/react/checkbox';

<Field.Root name="stayLoggedIn">
  <Field.Label>
    <Checkbox.Root>
      <Checkbox.Indicator />
    </Checkbox.Root>
    Stay logged in for 7 days
  </Field.Label>
</Field.Root>
```

## Indeterminate State

For parent checkboxes that represent partial selection:

```tsx
const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate');

<Checkbox.Root
  checked={checked}
  indeterminate={checked === 'indeterminate'}
  onCheckedChange={setChecked}
>
  <Checkbox.Indicator />
</Checkbox.Root>
```

## Accessibility

Every checkbox must have a meaningful label. Use `<Field>` with visible labels or the `aria-label` attribute:

```tsx
<Checkbox.Root aria-label="Accept terms">
  <Checkbox.Indicator />
</Checkbox.Root>
```

## Styling Example

```tsx
<Checkbox.Root className="flex size-5 items-center justify-center rounded border border-gray-300 data-[checked]:bg-gray-900 data-[checked]:border-gray-900">
  <Checkbox.Indicator className="text-white">
    <CheckIcon />
  </Checkbox.Indicator>
</Checkbox.Root>
```
