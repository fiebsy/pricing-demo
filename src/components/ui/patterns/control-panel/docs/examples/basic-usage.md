# Basic Usage

Minimal setup demonstrating essential UnifiedControlPanel functionality.

## Overview

This example shows a complete, working control panel with:
- Multiple sections (tabs)
- Various control types
- State management
- Reset functionality

## Complete Example

```tsx
'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  UnifiedControlPanel,
  type PanelConfig,
  type ControlChangeEvent,
} from '@/modules/design-system/v2/components/ui/prod/base/control-panel'

// Default values
const DEFAULTS = {
  columns: 3,
  gap: 16,
  showBorder: true,
  borderColor: 'gray',
  animation: 'spring',
}

export function BasicControlPanel() {
  // State for each control
  const [columns, setColumns] = useState(DEFAULTS.columns)
  const [gap, setGap] = useState(DEFAULTS.gap)
  const [showBorder, setShowBorder] = useState(DEFAULTS.showBorder)
  const [borderColor, setBorderColor] = useState(DEFAULTS.borderColor)
  const [animation, setAnimation] = useState(DEFAULTS.animation)

  // Panel configuration
  const config: PanelConfig = useMemo(
    () => ({
      sections: [
        // Layout Section
        {
          id: 'layout',
          label: 'Layout',
          title: 'Layout Settings',
          groups: [
            {
              title: 'Grid',
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
              ],
            },
          ],
        },

        // Appearance Section
        {
          id: 'appearance',
          label: 'Style',
          title: 'Appearance Settings',
          groups: [
            {
              title: 'Border',
              controls: [
                {
                  id: 'showBorder',
                  type: 'toggle',
                  label: 'Show Border',
                  value: showBorder,
                },
                {
                  id: 'borderColor',
                  type: 'select',
                  label: 'Border Color',
                  value: borderColor,
                  disabled: !showBorder,
                  showColorSwatch: true,
                  options: [
                    { label: 'Gray', value: 'gray', color: '#9ca3af' },
                    { label: 'Blue', value: 'blue', color: '#3b82f6' },
                    { label: 'Green', value: 'green', color: '#22c55e' },
                    { label: 'Red', value: 'red', color: '#ef4444' },
                  ],
                },
              ],
            },
          ],
        },

        // Animation Section
        {
          id: 'animation',
          label: 'Motion',
          title: 'Animation Settings',
          groups: [
            {
              controls: [
                {
                  id: 'animation',
                  type: 'select',
                  label: 'Animation Type',
                  value: animation,
                  options: [
                    { label: 'Spring', value: 'spring', description: 'Bouncy, natural feel' },
                    { label: 'Ease', value: 'ease', description: 'Smooth acceleration' },
                    { label: 'Linear', value: 'linear', description: 'Constant speed' },
                    { label: 'None', value: 'none', description: 'No animation' },
                  ],
                },
              ],
            },
          ],
        },
      ],

      // Panel options
      defaultActiveTab: 'layout',
      showReset: true,
      resetLabel: 'Reset All',
    }),
    [columns, gap, showBorder, borderColor, animation]
  )

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    switch (controlId) {
      case 'columns':
        setColumns(value as number)
        break
      case 'gap':
        setGap(value as number)
        break
      case 'showBorder':
        setShowBorder(value as boolean)
        break
      case 'borderColor':
        setBorderColor(value as string)
        break
      case 'animation':
        setAnimation(value as string)
        break
    }
  }, [])

  // Reset to defaults
  const handleReset = useCallback(() => {
    setColumns(DEFAULTS.columns)
    setGap(DEFAULTS.gap)
    setShowBorder(DEFAULTS.showBorder)
    setBorderColor(DEFAULTS.borderColor)
    setAnimation(DEFAULTS.animation)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Your main content */}
      <main className="pr-[340px]">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {/* Grid items */}
        </div>
      </main>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={config}
        onChange={handleChange}
        onReset={handleReset}
      />
    </div>
  )
}
```

## Key Patterns

### State Management

Each control has its own state variable:

```tsx
const [columns, setColumns] = useState(DEFAULTS.columns)
```

### Change Handler

Route changes to the correct setter:

```tsx
const handleChange = useCallback((event: ControlChangeEvent) => {
  switch (event.controlId) {
    case 'columns':
      setColumns(event.value as number)
      break
    // ...
  }
}, [])
```

### Conditional Controls

Disable controls based on other values:

```tsx
{
  id: 'borderColor',
  type: 'select',
  disabled: !showBorder, // Disabled when border is off
  // ...
}
```

### Memoized Config

Rebuild config when state changes:

```tsx
const config = useMemo(() => ({
  sections: [/* ... */],
}), [columns, gap, showBorder, borderColor, animation])
```

---

## Related

- [Presets](./presets.md) - Adding preset management
- [Advanced](./advanced.md) - Custom controls and composition
- [Props](../api/props.md) - All available props
