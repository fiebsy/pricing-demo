# Fieldset

A high-quality, unstyled React fieldset component that wraps native fieldset functionality with an easily customizable legend.

## Overview

The Fieldset groups related form controls with an accessible legend.

## Basic Usage

```tsx
import { Fieldset } from '@base-ui/react/fieldset';

<Fieldset.Root>
  <Fieldset.Legend>Personal Information</Fieldset.Legend>
  {/* Form fields */}
</Fieldset.Root>
```

## Core Components

| Component | Element | Purpose |
|-----------|---------|---------|
| `Fieldset.Root` | `<fieldset>` | Groups fieldset content |
| `Fieldset.Legend` | `<div>` | Accessible label |

## Key Props

Both components accept:

| Prop | Type | Purpose |
|------|------|---------|
| `className` | string \| function | CSS classes |
| `style` | object \| function | Inline styles |
| `render` | element | Custom element |

## With Form Fields

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Contact Details</Fieldset.Legend>

  <Field.Root>
    <Field.Label>Name</Field.Label>
    <Field.Control />
  </Field.Root>

  <Field.Root>
    <Field.Label>Email</Field.Label>
    <Field.Control type="email" />
  </Field.Root>
</Fieldset.Root>
```

## With Radio Group

```tsx
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

## With Checkbox Group

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Notifications</Fieldset.Legend>

  <Field.Root>
    <Checkbox.Root name="email">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <Field.Label>Email notifications</Field.Label>
  </Field.Root>

  <Field.Root>
    <Checkbox.Root name="sms">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <Field.Label>SMS notifications</Field.Label>
  </Field.Root>
</Fieldset.Root>
```

## Styling Example

```css
.Fieldset {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.Legend {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-gray-900);
}
```
