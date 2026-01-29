# Radio

A high-quality, unstyled React radio button component that is easy to style.

## Overview

The Radio component provides accessible radio controls for selecting one option from a group.

## Basic Usage

```tsx
import { RadioGroup, Radio } from '@base-ui/react/radio-group';

<RadioGroup defaultValue="option1">
  <Radio.Root value="option1">
    <Radio.Indicator />
    Option 1
  </Radio.Root>
  <Radio.Root value="option2">
    <Radio.Indicator />
    Option 2
  </Radio.Root>
</RadioGroup>
```

## Core Components

### RadioGroup

Wrapper managing shared state across radio buttons.

| Prop | Type | Purpose |
|------|------|---------|
| `defaultValue` | string | Initial selection |
| `value` | string | Controlled selection |
| `onValueChange` | function | Selection change callback |
| `disabled` | boolean | Disable all radios |
| `readOnly` | boolean | Prevent changes |
| `required` | boolean | Form requirement |
| `inputRef` | ref | Access hidden input |

### Radio.Root

Individual radio button.

| Prop | Type | Purpose |
|------|------|---------|
| `value` | string | Unique identifier |
| `disabled` | boolean | Disable this radio |
| `readOnly` | boolean | Prevent changes |

### Radio.Indicator

Visual selection indicator.

| Prop | Default | Purpose |
|------|---------|---------|
| `keepMounted` | false | Keep in DOM when unchecked |

## Data Attributes

- `data-checked` / `data-unchecked`: Selection state
- `data-disabled`: Disabled state
- `data-readonly`: Read-only state
- `data-required`: Required state
- `data-valid` / `data-invalid`: Validation state
- `data-dirty` / `data-touched`: Form interaction state
- `data-focused`: Focus state

## With Fieldset

```tsx
import { Fieldset } from '@base-ui/react/fieldset';

<Fieldset.Root>
  <Fieldset.Legend>Select a plan</Fieldset.Legend>
  <RadioGroup defaultValue="basic">
    <Field.Root>
      <Radio.Root value="basic">
        <Radio.Indicator />
      </Radio.Root>
      <Field.Label>Basic</Field.Label>
    </Field.Root>
    <Field.Root>
      <Radio.Root value="pro">
        <Radio.Indicator />
      </Radio.Root>
      <Field.Label>Pro</Field.Label>
    </Field.Root>
  </RadioGroup>
</Fieldset.Root>
```

## Controlled Example

```tsx
const [value, setValue] = React.useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <Radio.Root value="option1">
    <Radio.Indicator />
    Option 1
  </Radio.Root>
  <Radio.Root value="option2">
    <Radio.Indicator />
    Option 2
  </Radio.Root>
</RadioGroup>
```

## Styling Example

```tsx
<Radio.Root className="flex size-5 items-center justify-center rounded-full border-2 border-gray-300 data-[checked]:border-blue-500">
  <Radio.Indicator className="size-2.5 rounded-full bg-blue-500" />
</Radio.Root>
```

## Accessibility

Radio group and individual Radio elements must have a meaningful label. Use `<Fieldset>` and `<Field>` components or `aria-label` attributes for proper labeling.
