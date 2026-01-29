# Switch

A high-quality, unstyled React switch component that indicates whether a setting is on or off.

## Overview

The Switch represents on/off toggle functionality with two subcomponents.

## Basic Usage

```tsx
import { Switch } from '@base-ui/react/switch';

<Switch.Root>
  <Switch.Thumb />
</Switch.Root>
```

## Core Components

- **Switch.Root**: Container (renders as `<span>` with hidden `<input>`)
- **Switch.Thumb**: Movable toggle element (renders as `<span>`)

## Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `checked` | boolean | - | Controlled state |
| `defaultChecked` | boolean | false | Initial uncontrolled state |
| `onCheckedChange` | function | - | Toggle callback |
| `disabled` | boolean | false | Disable interaction |
| `readOnly` | boolean | false | Prevent user changes |
| `required` | boolean | false | Form requirement |
| `name` | string | - | Form field identifier |
| `value` | string | 'on' | Value when checked |
| `uncheckedValue` | string | - | Value when unchecked |

## Data Attributes

Both Root and Thumb support:
- `data-checked` / `data-unchecked`: Toggle state
- `data-disabled`: Disabled status
- `data-readonly`: Read-only status
- `data-focused`: Focus state (in Field.Root context)

## Controlled Example

```tsx
const [checked, setChecked] = React.useState(false);

<Switch.Root checked={checked} onCheckedChange={setChecked}>
  <Switch.Thumb />
</Switch.Root>
```

## With Label (Field Integration)

```tsx
import { Field } from '@base-ui/react/field';
import { Switch } from '@base-ui/react/switch';

<Field.Root>
  <Field.Label>
    <Switch.Root>
      <Switch.Thumb />
    </Switch.Root>
    Enable notifications
  </Field.Label>
</Field.Root>
```

## Dynamic Styling

```tsx
<Switch.Root
  className={(state) =>
    `switch ${state.checked ? 'switch-on' : 'switch-off'}`
  }
>
  <Switch.Thumb
    className={(state) =>
      `thumb ${state.checked ? 'thumb-on' : 'thumb-off'}`
    }
  />
</Switch.Root>
```

## Styling Example

```tsx
<Switch.Root className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 data-[checked]:bg-blue-600">
  <Switch.Thumb className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition data-[checked]:translate-x-6" />
</Switch.Root>
```

## Accessibility

The switch must include a meaningful label either via `<Field>` or `aria-label` attribute:

```tsx
<Switch.Root aria-label="Enable dark mode">
  <Switch.Thumb />
</Switch.Root>
```
