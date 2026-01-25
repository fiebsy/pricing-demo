# Presets

Implement preset management for saving and restoring configurations.

## Overview

Presets allow users to quickly switch between saved configurations. This example shows:
- Defining preset data
- Applying presets
- Tracking active preset
- Copy config to clipboard

## Complete Example

```tsx
'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  UnifiedControlPanel,
  type PanelConfig,
  type ControlChangeEvent,
  type Preset,
} from '@/modules/design-system/v2/components/ui/prod/base/control-panel'

// Define your config shape
interface GridConfig {
  columns: number
  gap: number
  showBorder: boolean
  borderRadius: number
}

// Define presets
const PRESETS: Preset<GridConfig>[] = [
  {
    id: 'default',
    name: 'Default',
    data: { columns: 3, gap: 16, showBorder: true, borderRadius: 8 },
  },
  {
    id: 'compact',
    name: 'Compact',
    data: { columns: 4, gap: 8, showBorder: false, borderRadius: 4 },
  },
  {
    id: 'spacious',
    name: 'Spacious',
    data: { columns: 2, gap: 24, showBorder: true, borderRadius: 16 },
  },
]

const DEFAULT_CONFIG = PRESETS[0].data

export function PresetControlPanel() {
  // Config state
  const [columns, setColumns] = useState(DEFAULT_CONFIG.columns)
  const [gap, setGap] = useState(DEFAULT_CONFIG.gap)
  const [showBorder, setShowBorder] = useState(DEFAULT_CONFIG.showBorder)
  const [borderRadius, setBorderRadius] = useState(DEFAULT_CONFIG.borderRadius)

  // Track active preset (null if modified)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Check if current values match a preset
  const detectActivePreset = useCallback(
    (config: GridConfig): string | null => {
      const match = PRESETS.find(
        (p) =>
          p.data.columns === config.columns &&
          p.data.gap === config.gap &&
          p.data.showBorder === config.showBorder &&
          p.data.borderRadius === config.borderRadius
      )
      return match?.id ?? null
    },
    []
  )

  // Apply a preset
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (!preset) return

    setColumns(preset.data.columns)
    setGap(preset.data.gap)
    setShowBorder(preset.data.showBorder)
    setBorderRadius(preset.data.borderRadius)
    setActivePresetId(presetId)
  }, [])

  // Handle individual control changes
  const handleChange = useCallback(
    (event: ControlChangeEvent) => {
      const { controlId, value } = event

      // Create new config with change
      let newConfig: GridConfig = { columns, gap, showBorder, borderRadius }

      switch (controlId) {
        case 'columns':
          newConfig.columns = value as number
          setColumns(newConfig.columns)
          break
        case 'gap':
          newConfig.gap = value as number
          setGap(newConfig.gap)
          break
        case 'showBorder':
          newConfig.showBorder = value as boolean
          setShowBorder(newConfig.showBorder)
          break
        case 'borderRadius':
          newConfig.borderRadius = value as number
          setBorderRadius(newConfig.borderRadius)
          break
      }

      // Update active preset (may become null)
      setActivePresetId(detectActivePreset(newConfig))
    },
    [columns, gap, showBorder, borderRadius, detectActivePreset]
  )

  // Reset to default preset
  const handleReset = useCallback(() => {
    handlePresetChange('default')
  }, [handlePresetChange])

  // Get current config for copy button
  const getConfigForCopy = useCallback(
    (): GridConfig => ({
      columns,
      gap,
      showBorder,
      borderRadius,
    }),
    [columns, gap, showBorder, borderRadius]
  )

  // Panel configuration
  const config: PanelConfig = useMemo(
    () => ({
      sections: [
        {
          id: 'grid',
          label: 'Grid',
          title: 'Grid Configuration',
          groups: [
            {
              controls: [
                {
                  id: 'columns',
                  type: 'slider',
                  label: 'Columns',
                  value: columns,
                  min: 1,
                  max: 6,
                  step: 1,
                },
                {
                  id: 'gap',
                  type: 'slider',
                  label: 'Gap',
                  value: gap,
                  min: 0,
                  max: 48,
                  step: 4,
                  formatLabel: (v) => `${v}px`,
                },
                {
                  id: 'showBorder',
                  type: 'toggle',
                  label: 'Show Border',
                  value: showBorder,
                },
                {
                  id: 'borderRadius',
                  type: 'slider',
                  label: 'Border Radius',
                  value: borderRadius,
                  min: 0,
                  max: 24,
                  step: 2,
                  formatLabel: (v) => `${v}px`,
                },
              ],
            },
          ],
        },
      ],

      // Preset configuration
      presetConfig: {
        presets: PRESETS,
        activePresetId,
        showCopyButton: true,
      },

      showReset: true,
      resetLabel: 'Reset',
    }),
    [columns, gap, showBorder, borderRadius, activePresetId]
  )

  return (
    <UnifiedControlPanel
      config={config}
      onChange={handleChange}
      onReset={handleReset}
      onPresetChange={handlePresetChange}
      getConfigForCopy={getConfigForCopy}
    />
  )
}
```

## Key Patterns

### Preset Type

Define your config shape and type the presets:

```tsx
interface GridConfig {
  columns: number
  gap: number
  // ...
}

const PRESETS: Preset<GridConfig>[] = [
  { id: 'default', name: 'Default', data: { /* ... */ } },
]
```

### Active Preset Detection

Clear the active preset when values no longer match:

```tsx
const detectActivePreset = (config: GridConfig): string | null => {
  const match = PRESETS.find(p =>
    Object.entries(p.data).every(([key, value]) =>
      config[key] === value
    )
  )
  return match?.id ?? null
}
```

### Applying Presets

Spread the preset data to all state setters:

```tsx
const handlePresetChange = (presetId: string) => {
  const preset = PRESETS.find(p => p.id === presetId)
  if (!preset) return

  setColumns(preset.data.columns)
  setGap(preset.data.gap)
  // ... apply all values
  setActivePresetId(presetId)
}
```

### Copy Config

Return the current configuration for JSON export:

```tsx
const getConfigForCopy = (): GridConfig => ({
  columns,
  gap,
  showBorder,
  borderRadius,
})
```

---

## Related

- [Basic Usage](./basic-usage.md) - Without presets
- [Advanced](./advanced.md) - Custom controls
- [ActionBar](../components/action-bar.md) - Preset UI component
