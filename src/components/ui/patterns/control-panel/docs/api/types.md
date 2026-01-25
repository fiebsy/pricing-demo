# Types

Complete type definitions for the UnifiedControlPanel system.

## Overview

The type system is hierarchical: **Controls** → **Groups** → **Sections** → **PanelConfig**. Each level builds on the previous to create a fully-typed configuration.

## Control Types

All controls share a base interface with required `id`, `label`, and `type` discriminator.

### ControlBase

```typescript
interface ControlBase {
  id: string          // Unique identifier for onChange events
  label: string       // Display label above the control
  description?: string // Helper text below the control
  disabled?: boolean  // Disable interaction
}
```

### SliderControl

Numeric range input with optional formatting.

```typescript
interface SliderControl extends ControlBase {
  type: 'slider'
  value: number
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string // e.g., v => `${v}px`
}
```

### SelectControl

Dropdown with optional color swatches.

```typescript
interface SelectControl extends ControlBase {
  type: 'select'
  value: string
  options: Array<{
    label: string
    value: string
    color?: string        // CSS color for swatch
    description?: string  // Secondary line in dropdown
  }>
  showColorSwatch?: boolean
}
```

### ColorSelectControl

Specialized select with prominent color swatches.

```typescript
interface ColorSelectControl extends ControlBase {
  type: 'color-select'
  value: string
  options: Array<{
    label: string
    value: string
    color?: string
    description?: string
  }>
  swatchSize?: 'xs' | 'sm' | 'md'
}
```

### ToggleControl

Boolean checkbox.

```typescript
interface ToggleControl extends ControlBase {
  type: 'toggle'
  value: boolean
}
```

### ColorControl

Native color picker input.

```typescript
interface ColorControl extends ControlBase {
  type: 'color'
  value: string      // Hex color
  showValue?: boolean // Display hex value text
}
```

### TextControl

Text input field.

```typescript
interface TextControl extends ControlBase {
  type: 'text'
  value: string
  placeholder?: string
  maxLength?: number
}
```

### CustomControl

Render arbitrary content.

```typescript
interface CustomControl extends ControlBase {
  type: 'custom'
  render: () => ReactNode
}
```

### Control Union

```typescript
type Control =
  | SliderControl
  | SelectControl
  | ColorSelectControl
  | ToggleControl
  | ColorControl
  | TextControl
  | CustomControl
```

---

## Group & Section Types

### ControlGroup

Groups related controls within a section.

```typescript
interface ControlGroup {
  title?: string           // Collapsible header (optional)
  description?: string     // Shown in header
  controls: Control[]      // Array of controls
  columns?: 1 | 2          // Grid layout (default: 1)
  defaultCollapsed?: boolean
}
```

### Section

A tab panel containing control groups.

```typescript
interface Section {
  id: string       // Unique ID for tab routing
  label: string    // Short tab label (e.g., "Layout")
  title: string    // Full title in content area
  groups: ControlGroup[]
  defaultCollapsed?: boolean
}
```

---

## Preset Types

### Preset

A saved configuration snapshot.

```typescript
interface Preset<T = unknown> {
  id: string
  name: string
  data: T  // Your custom config shape
}
```

### PresetConfig

Preset system configuration.

```typescript
interface PresetConfig<T = unknown> {
  presets: Preset<T>[]
  activePresetId: string | null
  showCopyButton?: boolean  // Show JSON copy button
  copyLabel?: string
}
```

---

## Panel Configuration

### PanelPosition

```typescript
interface PanelPosition {
  top?: string     // CSS value, default '90px'
  bottom?: string  // CSS value, default '90px'
  right?: string   // CSS value, default '16px'
  width?: string   // CSS value, default '320px'
}
```

### PanelConfig

```typescript
interface PanelConfig {
  sections: Section[]
  defaultActiveTab?: string   // Section ID
  position?: PanelPosition
  title?: string              // Tooltip text
  minimizedTitle?: string     // Minimized tooltip
  showReset?: boolean         // Show reset button
  resetLabel?: string         // Button text
  presetConfig?: PresetConfig
}
```

---

## Event Types

### ControlChangeEvent

Emitted on every control value change.

```typescript
interface ControlChangeEvent {
  controlId: string  // Which control changed
  sectionId: string  // Which section it belongs to
  value: unknown     // New value (type depends on control)
}
```

---

## Context Types

### PanelContextValue

```typescript
interface PanelContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
  isMinimized: boolean
  setIsMinimized: (minimized: boolean) => void
  toggleMinimized: () => void
}
```

---

## Related

- [Props](./props.md) - Component props using these types
- [Context](./context.md) - Using context for advanced composition
