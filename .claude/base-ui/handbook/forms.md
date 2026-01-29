# Forms

A guide to building forms with Base UI components.

Base UI form components extend the native constraint validation API, enabling developers to construct forms for user input collection and interface control. These components seamlessly integrate with third-party libraries like React Hook Form and TanStack Form.

## Essential Components

### Field Structure

`<Field.Root>` serves as the container for form fields:

```tsx
import { Field } from '@base-ui/react/field';

<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" required />
  <Field.Description>We'll never share your email.</Field.Description>
  <Field.Error />
</Field.Root>
```

Components:
- `<Field.Root>` - Container for the field
- `<Field.Label>` - Label element for the control
- `<Field.Control>` - The actual input element
- `<Field.Description>` - Helper text
- `<Field.Error>` - Validation error message

### Grouping Controls

`<Fieldset.Root>` and `<Fieldset.Legend>` organize multiple related inputs, particularly useful for checkbox groups, radio groups, and multi-thumb sliders:

```tsx
import { Fieldset } from '@base-ui/react/fieldset';
import { Checkbox } from '@base-ui/react/checkbox';

<Fieldset.Root>
  <Fieldset.Legend>Notifications</Fieldset.Legend>
  <Field.Root>
    <Checkbox.Root />
    <Field.Label>Email notifications</Field.Label>
  </Field.Root>
  <Field.Root>
    <Checkbox.Root />
    <Field.Label>SMS notifications</Field.Label>
  </Field.Root>
</Fieldset.Root>
```

### Form Container

`<Form>` wraps all fields and manages submission:

```tsx
import { Form } from '@base-ui/react/form';

<Form onFormSubmit={(values) => console.log(values)}>
  <Field.Root>
    <Field.Label>Name</Field.Label>
    <Field.Control name="name" required />
  </Field.Root>
  <button type="submit">Submit</button>
</Form>
```

## Validation

### Native Validation

Leverage HTML attributes for built-in constraint validation:

```tsx
<Field.Control
  required
  minLength={3}
  maxLength={50}
  pattern="[A-Za-z]+"
/>
```

### Custom Validation

Pass asynchronous or synchronous functions to the `validate` prop:

```tsx
<Field.Root
  validate={(value) => {
    if (value.length < 3) {
      return 'Must be at least 3 characters';
    }
    return null;
  }}
>
  <Field.Control />
</Field.Root>
```

### Validation Modes

Configure timing via `validationMode`:
- `"onSubmit"` - Validate when form is submitted (default)
- `"onBlur"` - Validate when field loses focus
- `"onChange"` - Validate on every change

```tsx
<Field.Root validationMode="onBlur">
  <Field.Control />
</Field.Root>
```

### Server-Side Validation

The `errors` prop accepts server validation results:

```tsx
const [errors, setErrors] = React.useState({});

<Form errors={errors} onClearErrors={() => setErrors({})}>
  <Field.Root name="email">
    <Field.Control />
    <Field.Error />
  </Field.Root>
</Form>
```

## Form Submission

### Using onFormSubmit

The `onFormSubmit` handler receives form values as a JavaScript object:

```tsx
<Form
  onFormSubmit={(values) => {
    // values is { name: 'John', email: 'john@example.com' }
    submitToServer(values);
  }}
>
  ...
</Form>
```

### Using Native onSubmit

Use native `onSubmit` with `FormData` for direct server posting:

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

## Third-Party Integration

### React Hook Form

Use `<Controller>` to wrap Base UI components:

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Field } from '@base-ui/react/field';

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Field.Control {...field} />
          </Field.Root>
        )}
      />
    </form>
  );
}
```

### TanStack Form

Leverage `form.Field` with children render props:

```tsx
import { useForm } from '@tanstack/react-form';
import { Field } from '@base-ui/react/field';

function MyForm() {
  const form = useForm({
    defaultValues: { email: '' },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <form.Field name="email">
        {(field) => (
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Field.Control
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </Field.Root>
        )}
      </form.Field>
    </form>
  );
}
```

## Integration with Base UI Components

Base UI form controls like Checkbox, Switch, Radio, Select, Slider, and NumberField work seamlessly with Field:

```tsx
<Field.Root>
  <Field.Label>Accept terms</Field.Label>
  <Checkbox.Root>
    <Checkbox.Indicator />
  </Checkbox.Root>
  <Field.Error match="valueMissing">
    You must accept the terms
  </Field.Error>
</Field.Root>
```

For complete documentation, see [base-ui.com/react/handbook/forms](https://base-ui.com/react/handbook/forms).
