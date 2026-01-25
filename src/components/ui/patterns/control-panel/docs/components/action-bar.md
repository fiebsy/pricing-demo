# ActionBar

Bottom action bar with preset selector, copy button, and reset button.

## Overview

The ActionBar provides consistent footer actions for the control panel. It conditionally renders based on available functionality.

## Import

```typescript
import { ActionBar } from '@/modules/design-system/v2/components/ui/prod/base/control-panel'
```

## Basic Usage

```tsx
<ActionBar
  presetConfig={presetConfig}
  showReset={true}
  resetLabel="Reset"
  onReset={handleReset}
  onPresetChange={handlePresetChange}
  getConfigForCopy={getConfigForCopy}
/>
```

## Props

```typescript
interface ActionBarProps<T = unknown> {
  presetConfig?: PresetConfig<T>
  showReset?: boolean
  resetLabel?: string
  onReset?: () => void
  onPresetChange?: (presetId: string) => void
  getConfigForCopy?: () => T
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `presetConfig` | `PresetConfig` | - | Preset dropdown configuration |
| `showReset` | `boolean` | `true` | Show reset button |
| `resetLabel` | `string` | `'Reset'` | Reset button text |
| `onReset` | `() => void` | - | Reset button callback |
| `onPresetChange` | `(id: string) => void` | - | Preset selection callback |
| `getConfigForCopy` | `() => T` | - | Get config for clipboard |

## Conditional Rendering

The ActionBar returns `null` if no content would be shown:

```typescript
const hasContent = hasPresets || showCopyButton || (showReset && onReset)
if (!hasContent) return null
```

## Copy Functionality

When `getConfigForCopy` is provided and `presetConfig.showCopyButton !== false`:

1. Button shows copy icon
2. On click, calls `getConfigForCopy()`
3. Serializes result as JSON
4. Copies to clipboard
5. Shows checkmark for 2 seconds

```tsx
const getConfigForCopy = () => ({
  columns,
  spacing,
  theme,
  // ... all configurable values
})
```

## Preset Configuration

```typescript
const presetConfig: PresetConfig = {
  presets: [
    { id: 'default', name: 'Default', data: { columns: 3, spacing: 16 } },
    { id: 'compact', name: 'Compact', data: { columns: 4, spacing: 8 } },
    { id: 'spacious', name: 'Spacious', data: { columns: 2, spacing: 24 } },
  ],
  activePresetId: 'default',
  showCopyButton: true,
}
```

## Layout

The bar uses flex layout:
- **Preset selector**: Fills available space (min-w-0, flex-1)
- **Copy button**: Fixed width, shrink-0
- **Reset button**: Fixed width, shrink-0

## Standalone Usage

Use without `UnifiedControlPanel` for custom layouts:

```tsx
function CustomPanel({ onReset }) {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        {/* Custom content */}
      </div>
      <ActionBar
        showReset={true}
        onReset={onReset}
      />
    </div>
  )
}
```

---

## Related

- [TabNavigation](./tab-navigation.md) - Header components
- [Presets Example](../examples/presets.md) - Full preset implementation
- [Props](../api/props.md) - Main component props
