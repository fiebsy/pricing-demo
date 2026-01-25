# Custom Control

Render arbitrary React content as a control.

## Overview

The custom control type allows rendering any React content within the control panel. This is useful for specialized inputs, complex UI, or integrating third-party components.

## Basic Usage

```typescript
const control: CustomControl = {
  id: 'preview',
  type: 'custom',
  label: 'Preview',
  render: () => <PreviewComponent />,
}
```

## Type Definition

```typescript
interface CustomControl extends ControlBase {
  type: 'custom'
  render: () => ReactNode
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `label` | `string` | Yes | Display label |
| `render` | `() => ReactNode` | Yes | Render function |
| `description` | `string` | No | Helper text |
| `disabled` | `boolean` | No | Not used for custom |

## Important Notes

### No Wrapper

Custom controls render directly **without** the standard `ControlGroupWrapper`. The `label` prop is not automatically displayed. Include your own labeling if needed.

### State Management

The render function doesn't receive props. Access state via closure or context:

```tsx
function MyPanel() {
  const [value, setValue] = useState(50)

  const customControl: CustomControl = {
    id: 'customSlider',
    type: 'custom',
    label: 'Custom Slider',
    render: () => (
      <div>
        <label className="text-secondary text-xs">Custom Slider</label>
        <input
          type="range"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          min={0}
          max={100}
        />
      </div>
    ),
  }

  // ...
}
```

### Consistent Styling

Match the panel's design language:

```tsx
render: () => (
  <div className="space-y-2">
    <label className="text-secondary font-mono text-xs">
      Custom Input
    </label>
    <div className="bg-primary border-primary rounded border p-2">
      {/* Your custom content */}
    </div>
  </div>
)
```

## Common Patterns

### Color Palette Picker

```tsx
{
  id: 'colorPalette',
  type: 'custom',
  label: 'Color Palette',
  render: () => (
    <div className="grid grid-cols-5 gap-1">
      {colors.map((color) => (
        <button
          key={color}
          className="size-8 rounded border border-black/10"
          style={{ backgroundColor: color }}
          onClick={() => setActiveColor(color)}
        />
      ))}
    </div>
  ),
}
```

### Segmented Control

```tsx
{
  id: 'viewMode',
  type: 'custom',
  label: 'View Mode',
  render: () => (
    <div className="flex gap-1 rounded bg-secondary p-1">
      {['grid', 'list', 'compact'].map((mode) => (
        <button
          key={mode}
          className={cx(
            'flex-1 rounded px-2 py-1 text-xs',
            viewMode === mode ? 'bg-primary text-primary' : 'text-tertiary'
          )}
          onClick={() => setViewMode(mode)}
        >
          {mode}
        </button>
      ))}
    </div>
  ),
}
```

### Preview Component

```tsx
{
  id: 'preview',
  type: 'custom',
  label: 'Preview',
  render: () => (
    <div className="bg-quaternary aspect-video rounded-lg flex items-center justify-center">
      <MyComponent
        columns={columns}
        spacing={spacing}
        theme={theme}
      />
    </div>
  ),
}
```

---

## Related

- [Slider Control](./slider.md) - Built-in numeric input
- [Select Control](./select.md) - Built-in dropdown
- [Types](../api/types.md) - Full type definitions
