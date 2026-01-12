# Checkbox Group

A high-quality, unstyled React checkbox group component that manages shared state across multiple checkboxes.

## Overview

The Checkbox Group provides shared state to a series of checkboxes, enabling coordinated selection patterns.

## Basic Usage

```tsx
import { CheckboxGroup, Checkbox } from '@base-ui/react/checkbox-group';

<CheckboxGroup defaultValue={['option1']}>
  <Checkbox.Root value="option1">
    <Checkbox.Indicator />
    Option 1
  </Checkbox.Root>
  <Checkbox.Root value="option2">
    <Checkbox.Indicator />
    Option 2
  </Checkbox.Root>
</CheckboxGroup>
```

## Key Props

| Prop | Type | Purpose |
|------|------|---------|
| `defaultValue` | string[] | Initial selected values |
| `value` | string[] | Controlled selected values |
| `onValueChange` | function | Selection change callback |
| `allValues` | string[] | All available values (for parent pattern) |
| `disabled` | boolean | Disable all checkboxes |

## Parent Checkbox Pattern

Create a master checkbox controlling child selections:

```tsx
const allOptions = ['a', 'b', 'c'];
const [selected, setSelected] = React.useState<string[]>(['a']);

<CheckboxGroup
  value={selected}
  onValueChange={setSelected}
  allValues={allOptions}
>
  {/* Parent checkbox */}
  <Checkbox.Root parent>
    <Checkbox.Indicator>
      {(state) =>
        state.indeterminate ? <MinusIcon /> : <CheckIcon />
      }
    </Checkbox.Indicator>
    Select All
  </Checkbox.Root>

  {/* Child checkboxes */}
  <Checkbox.Root value="a">
    <Checkbox.Indicator />
    Option A
  </Checkbox.Root>
  <Checkbox.Root value="b">
    <Checkbox.Indicator />
    Option B
  </Checkbox.Root>
  <Checkbox.Root value="c">
    <Checkbox.Indicator />
    Option C
  </Checkbox.Root>
</CheckboxGroup>
```

## Indeterminate State

The parent checkbox shows an indeterminate state when some (but not all) children are selected.

## With Fieldset

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Notifications</Fieldset.Legend>
  <CheckboxGroup defaultValue={['email']}>
    <Field.Root>
      <Checkbox.Root value="email">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <Field.Label>Email</Field.Label>
    </Field.Root>
    <Field.Root>
      <Checkbox.Root value="sms">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <Field.Label>SMS</Field.Label>
    </Field.Root>
  </CheckboxGroup>
</Fieldset.Root>
```

## Controlled Example

```tsx
const [selected, setSelected] = React.useState(['option1']);

<CheckboxGroup value={selected} onValueChange={setSelected}>
  <Checkbox.Root value="option1">Option 1</Checkbox.Root>
  <Checkbox.Root value="option2">Option 2</Checkbox.Root>
</CheckboxGroup>
```

## Accessibility

Form controls must have an accessible name. Use visible labels, `<Fieldset>` components, or `aria-label` attributes.
