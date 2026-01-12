# Props

Component props for UnifiedControlPanel and related components.

## Overview

The main component accepts a `config` object for structure and callbacks for interaction. Minimize state can be controlled or uncontrolled.

## UnifiedControlPanelProps

```typescript
interface UnifiedControlPanelProps<T = unknown> {
  // Required
  config: PanelConfig
  onChange: (event: ControlChangeEvent) => void

  // Optional callbacks
  onReset?: () => void
  onPresetChange?: (presetId: string) => void
  getConfigForCopy?: () => T

  // Styling
  className?: string

  // Minimize state (uncontrolled)
  defaultMinimized?: boolean

  // Minimize state (controlled)
  minimized?: boolean
  onMinimizedChange?: (minimized: boolean) => void
}
```

---

## Prop Details

### config

**Type**: `PanelConfig`

The complete panel configuration including sections, position, and presets.

```tsx
const config: PanelConfig = {
  sections: [...],
  defaultActiveTab: 'layout',
  position: { top: '100px', right: '20px' },
  showReset: true,
  presetConfig: {
    presets: [...],
    activePresetId: null,
  },
}
```

### onChange

**Type**: `(event: ControlChangeEvent) => void`

Called whenever any control value changes. Use the `controlId` to identify which control changed.

```tsx
const handleChange = (event: ControlChangeEvent) => {
  switch (event.controlId) {
    case 'columns':
      setColumns(event.value as number)
      break
    case 'theme':
      setTheme(event.value as string)
      break
  }
}
```

### onReset

**Type**: `() => void`

Called when the reset button is clicked. Implement your own reset logic.

```tsx
const handleReset = () => {
  setColumns(DEFAULT_COLUMNS)
  setTheme(DEFAULT_THEME)
}
```

### onPresetChange

**Type**: `(presetId: string) => void`

Called when a preset is selected from the dropdown. Apply the preset data to your state.

```tsx
const handlePresetChange = (presetId: string) => {
  const preset = presets.find(p => p.id === presetId)
  if (preset) {
    setColumns(preset.data.columns)
    setTheme(preset.data.theme)
  }
}
```

### getConfigForCopy

**Type**: `() => T`

Returns the current configuration for the "Copy" button. Serialized as JSON to clipboard.

```tsx
const getConfigForCopy = () => ({
  columns,
  theme,
  spacing,
})
```

### className

**Type**: `string`

Additional CSS classes applied to the root panel element.

### defaultMinimized

**Type**: `boolean` (default: `false`)

Initial minimize state for uncontrolled mode.

### minimized / onMinimizedChange

**Type**: `boolean` / `(minimized: boolean) => void`

Controlled minimize state. When `minimized` is provided, the component becomes controlled.

```tsx
const [isMinimized, setIsMinimized] = useState(false)

<UnifiedControlPanel
  minimized={isMinimized}
  onMinimizedChange={setIsMinimized}
  ...
/>
```

---

## PanelConfig Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sections` | `Section[]` | (required) | Tab sections with controls |
| `defaultActiveTab` | `string` | First section ID | Initially active tab |
| `position` | `PanelPosition` | See below | Panel positioning |
| `title` | `string` | `'Controls'` | Panel title |
| `minimizedTitle` | `string` | `'Controls'` | Minimized state title |
| `showReset` | `boolean` | `true` | Show reset button |
| `resetLabel` | `string` | `'Reset'` | Reset button text |
| `presetConfig` | `PresetConfig` | - | Preset dropdown config |

### Default Position

```typescript
{
  top: '90px',
  bottom: '90px',
  right: '16px',
  width: '320px',
}
```

---

## Related

- [Types](./types.md) - Full type definitions
- [Context](./context.md) - Advanced state management
- [Basic Usage](../examples/basic-usage.md) - Example implementation
