# Field

A high-quality, unstyled React field component that provides labeling and validation for form controls.

## Overview

The Field component provides accessible labeling, validation, and state management for form controls.

## Basic Usage

```tsx
import { Field } from '@base-ui/react/field';

<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" required />
  <Field.Description>We'll never share your email.</Field.Description>
  <Field.Error />
</Field.Root>
```

## Core Components

| Component | Purpose | Element |
|-----------|---------|---------|
| `Field.Root` | Container grouping all parts | `<div>` |
| `Field.Label` | Associated form label | `<label>` |
| `Field.Control` | Form input element | `<input>` |
| `Field.Description` | Helper text | `<p>` |
| `Field.Error` | Validation messages | `<div>` |
| `Field.Item` | Groups checkbox/radio items | `<div>` |
| `Field.Validity` | Custom validity rendering | Function |

## Key Props (Root)

| Prop | Type | Purpose |
|------|------|---------|
| `name` | string | Field identifier |
| `validate` | function | Custom validation returning error or null |
| `validationMode` | string | 'onSubmit', 'onBlur', or 'onChange' |
| `validationDebounceTime` | number | Delay validation (ms) |
| `dirty` | boolean | Value has changed |
| `touched` | boolean | Field has been focused |
| `invalid` | boolean | Field is invalid |

## Custom Validation

```tsx
<Field.Root
  validate={(value) => {
    if (value.length < 3) {
      return 'Must be at least 3 characters';
    }
    return null;
  }}
>
  <Field.Label>Username</Field.Label>
  <Field.Control />
  <Field.Error />
</Field.Root>
```

## Async Validation

```tsx
<Field.Root
  validate={async (value) => {
    const exists = await checkUsername(value);
    return exists ? 'Username already taken' : null;
  }}
  validationDebounceTime={500}
>
  <Field.Label>Username</Field.Label>
  <Field.Control />
  <Field.Error />
</Field.Root>
```

## Error Matching

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" required />
  <Field.Error match="valueMissing">Email is required</Field.Error>
  <Field.Error match="typeMismatch">Enter a valid email</Field.Error>
</Field.Root>
```

## Data Attributes

Components expose:
- `data-valid` / `data-invalid`: Validation state
- `data-dirty`: Value changed from initial
- `data-touched`: Field has been focused
- `data-focused`: Currently focused
- `data-disabled`: Field is disabled
- `data-filled`: Has a value

## With Other Components

```tsx
<Field.Root>
  <Field.Label>Accept Terms</Field.Label>
  <Checkbox.Root>
    <Checkbox.Indicator />
  </Checkbox.Root>
  <Field.Error match="valueMissing">
    You must accept the terms
  </Field.Error>
</Field.Root>
```

## Controlled Example

```tsx
const [value, setValue] = React.useState('');

<Field.Root>
  <Field.Label>Name</Field.Label>
  <Field.Control
    value={value}
    onValueChange={setValue}
  />
</Field.Root>
```
