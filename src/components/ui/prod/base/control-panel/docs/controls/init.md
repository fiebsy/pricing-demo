# Controls

Individual control primitives for building configuration interfaces.

---

## Topics

- [Slider](./slider.md): Numeric range with direct input and formatting
- [Select](./select.md): Dropdown menus with color swatch support
- [Toggle](./toggle.md): Boolean checkbox controls
- [Custom](./custom.md): Render arbitrary React content

---

## Quick Reference

| Control Type | Use Case | Value Type |
|--------------|----------|------------|
| `slider` | Numbers with range | `number` |
| `select` | Enum values, themes | `string` |
| `color-select` | Color tokens | `string` |
| `toggle` | Boolean flags | `boolean` |
| `color` | Hex color picker | `string` |
| `text` | Free-form text | `string` |
| `custom` | Anything else | N/A |

---

## Common Patterns

### Defining Controls

```typescript
const controls: Control[] = [
  {
    id: 'spacing',
    type: 'slider',
    label: 'Spacing',
    value: 16,
    min: 0,
    max: 48,
    step: 4,
    formatLabel: (v) => `${v}px`,
  },
  {
    id: 'variant',
    type: 'select',
    label: 'Variant',
    value: 'default',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Compact', value: 'compact' },
    ],
  },
]
```

### Handling Changes

All controls emit changes through the parent `onChange` callback:

```typescript
const handleChange = (event: ControlChangeEvent) => {
  const { controlId, value } = event

  // Type assertion based on control type
  if (controlId === 'spacing') {
    setSpacing(value as number)
  } else if (controlId === 'variant') {
    setVariant(value as string)
  }
}
```
