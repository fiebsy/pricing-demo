# Form

A high-quality, unstyled React form component with consolidated error handling.

## Overview

The Form component works alongside Field to manage validation and errors effectively.

## Basic Usage

```tsx
import { Form } from '@base-ui/react/form';
import { Field } from '@base-ui/react/field';

<Form onFormSubmit={(values) => console.log(values)}>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control type="email" required />
    <Field.Error />
  </Field.Root>
  <button type="submit">Submit</button>
</Form>
```

## Key Props

| Prop | Type | Purpose |
|------|------|---------|
| `errors` | object | Maps field names to error messages |
| `onFormSubmit` | function | Handles submission with form values as object |
| `validationMode` | string | 'onSubmit', 'onBlur', or 'onChange' |

## Submission Modes

### Using onFormSubmit (Recommended)

```tsx
<Form
  onFormSubmit={(values) => {
    // values is { email: 'user@example.com', name: 'John' }
    submitToServer(values);
  }}
>
  <Field.Root name="email">...</Field.Root>
  <Field.Root name="name">...</Field.Root>
</Form>
```

### Using Native onSubmit

```tsx
<Form
  onSubmit={(event) => {
    const formData = new FormData(event.currentTarget);
    // Use formData for submission
  }}
>
  ...
</Form>
```

## Server-Side Errors

```tsx
const [errors, setErrors] = React.useState({});

async function handleSubmit(values) {
  const result = await submitToServer(values);
  if (result.errors) {
    setErrors(result.errors);
  }
}

<Form errors={errors} onFormSubmit={handleSubmit}>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control />
    <Field.Error />
  </Field.Root>
</Form>
```

## With Zod Validation

```tsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function handleSubmit(values) {
  const result = schema.safeParse(values);
  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }
  // Submit valid data
}
```

## Validation Mode

```tsx
// Validate on submit (default), then on change after first validation
<Form validationMode="onSubmit">

// Validate when field loses focus
<Form validationMode="onBlur">

// Validate on every change
<Form validationMode="onChange">
```

## Complete Example

```tsx
<Form
  onFormSubmit={async (values) => {
    try {
      await createUser(values);
    } catch (error) {
      return { errors: error.fieldErrors };
    }
  }}
>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control type="email" required />
    <Field.Error match="valueMissing">Email is required</Field.Error>
    <Field.Error match="typeMismatch">Invalid email format</Field.Error>
  </Field.Root>

  <Field.Root name="password">
    <Field.Label>Password</Field.Label>
    <Field.Control type="password" required minLength={8} />
    <Field.Error match="valueMissing">Password is required</Field.Error>
    <Field.Error match="tooShort">Must be at least 8 characters</Field.Error>
  </Field.Root>

  <button type="submit">Create Account</button>
</Form>
```
