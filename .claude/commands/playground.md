---
description: Create a playground page with UnifiedControlPanel for component incubation
argument-hint: [component-name]
allowed-tools: Read, Write, Edit, Glob, Grep
---

Create a new Playground page for component: **$ARGUMENTS**

---

## Philosophy

**Playground = Controlled Incubator for Production Components**

Every playground page must:
1. **Have a preset system** - Presets are mandatory, not optional
2. **Include copy functionality** - Export current config as JSON at any time
3. **Integrate core style controls** - Shine, depth, corners, semantic tokens
4. **Be modular** - Split into chunks to avoid verbose files
5. **Document migration path** - Clear plan for production deployment

---

## Required: UnifiedControlPanel with Presets

**ALWAYS use the UnifiedControlPanel** from demo-repo's production components:

```typescript
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type PanelConfig,
  type Section,
  type ControlGroup,
  type Control,
  type Preset,
  type PresetConfig,
} from '@/components/ui/patterns/control-panel'
```

**Every playground MUST include:**
- Preset dropdown (select from saved configurations)
- Copy Preset button (exports current config as JSON)
- Reset to default functionality

---

## File Structure (Modular)

```
src/app/playground/$1/
├── page.tsx                   # Page component (App Router)
├── core/
│   └── $1.tsx                 # Core component (migration-ready)
├── config/
│   ├── presets.ts             # All preset definitions
│   ├── options.ts             # Control options (backgrounds, shadows, etc.)
│   └── types.ts               # Config interfaces
├── panels/
│   └── panel-config.ts        # UnifiedControlPanel configuration
├── utils/
│   └── class-builders.ts      # Style class mapping functions
└── README.md                  # Migration documentation
```

**For development/experimental playgrounds:**
```
src/app/_hidden/playground/$1/
└── ... (same structure)
```

---

## Layer 1: Configuration Files

### `config/types.ts` - Config Interface

```typescript
/**
 * $1 Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/$1
 */

export interface $1Config {
  // Outer layer styling
  outer: {
    background: string           // Semantic: primary | secondary | tertiary | brand-*
    shine: string               // shine-none | shine-0 | shine-1 | shine-2 | shine-3 | shine-brand
    shineIntensity: string      // (none) | -subtle | -intense
    shadow: string              // none | xs | sm | md | lg
    depth: string               // none | depth-gradient-1 | depth-gradient-2 | depth-gradient-3
    corner: string              // round | squircle | bevel | scoop
    borderRadius: number        // 0-48 px
    padding: number             // 0-64 px
    border: boolean             // Show border
    borderColor: string         // Semantic: primary | secondary | tertiary
  }

  // Inner layer styling (if applicable)
  inner?: {
    background: string
    shine: string
    shineIntensity: string
    shadow: string
    depth: string
    corner: string
    borderRadius: number
    padding: number
  }

  // Content configuration
  content?: {
    // Component-specific content controls
  }

  // Layout configuration
  layout?: {
    width: string
    height: string
    alignment: string
  }
}

export interface $1PresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'elevated' | 'brand' | 'custom'
  data: $1Config
}
```

### `config/options.ts` - Control Options

Reference: `src/styles/docs/init.md` for complete token documentation.

```typescript
/**
 * Control Panel Options
 *
 * These options map directly to our semantic token system.
 * See: src/styles/docs/reference/all-utilities.md
 */

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand Primary', value: 'brand-primary' },
  { label: 'Brand Secondary', value: 'brand-secondary' },
  { label: 'Brand Solid', value: 'brand-solid' },
] as const

export const SHINE_TYPE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0 (195°)', value: 'shine-0' },
  { label: 'Shine 1 (180°)', value: 'shine-1' },
  { label: 'Shine 2 (Theme)', value: 'shine-2' },
  { label: 'Shine 3 (Enhanced)', value: 'shine-3' },
  { label: 'Brand', value: 'shine-brand' },
] as const

export const SHINE_INTENSITY_OPTIONS = [
  { label: 'Normal', value: '' },
  { label: 'Subtle', value: '-subtle' },
  { label: 'Intense', value: '-intense' },
] as const

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
] as const

export const DEPTH_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle (1)', value: 'depth-gradient-1' },
  { label: 'Medium (2)', value: 'depth-gradient-2' },
  { label: 'Strong (3)', value: 'depth-gradient-3' },
] as const

export const CORNER_OPTIONS = [
  { label: 'Round', value: 'round' },
  { label: 'Squircle', value: 'squircle' },
  { label: 'Bevel', value: 'bevel' },
  { label: 'Scoop', value: 'scoop' },
] as const

export const BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand', value: 'brand' },
] as const
```

### `config/presets.ts` - Preset Definitions

```typescript
import type { $1PresetMeta, $1Config } from './types'

/**
 * $1 Presets
 *
 * Preset categories:
 * - default: Standard starting point
 * - minimal: Clean, understated
 * - elevated: Premium, with depth effects
 * - brand: Uses brand colors and effects
 * - custom: User-defined variations
 */

export const DEFAULT_$1_CONFIG: $1Config = {
  outer: {
    background: 'secondary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    shadow: 'sm',
    depth: 'none',
    corner: 'round',
    borderRadius: 16,
    padding: 24,
    border: true,
    borderColor: 'primary',
  },
}

export const $1_PRESETS: $1PresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Standard configuration',
    data: DEFAULT_$1_CONFIG,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'minimal',
    description: 'Clean, no effects',
    data: {
      outer: {
        background: 'primary',
        shine: 'none',
        shineIntensity: '',
        shadow: 'none',
        depth: 'none',
        corner: 'round',
        borderRadius: 8,
        padding: 16,
        border: true,
        borderColor: 'secondary',
      },
    },
  },
  {
    id: 'elevated',
    name: 'Elevated',
    category: 'elevated',
    description: 'Premium card with depth',
    data: {
      outer: {
        background: 'secondary',
        shine: 'shine-2',
        shineIntensity: '-subtle',
        shadow: 'lg',
        depth: 'depth-gradient-2',
        corner: 'squircle',
        borderRadius: 24,
        padding: 32,
        border: false,
        borderColor: 'primary',
      },
    },
  },
  {
    id: 'brand-solid',
    name: 'Brand Solid',
    category: 'brand',
    description: 'Solid brand background',
    data: {
      outer: {
        background: 'brand-solid',
        shine: 'shine-brand',
        shineIntensity: '',
        shadow: 'md',
        depth: 'none',
        corner: 'squircle',
        borderRadius: 20,
        padding: 24,
        border: false,
        borderColor: 'primary',
      },
    },
  },
]

export const getPresetById = (id: string): $1PresetMeta | undefined =>
  $1_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): $1PresetMeta[] =>
  $1_PRESETS.filter((p) => p.category === category)
```

---

## Layer 2: Panel Configuration

### `panels/panel-config.ts`

```typescript
import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { $1Config, $1PresetMeta } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_OPTIONS,
  DEPTH_OPTIONS,
  CORNER_OPTIONS,
  BORDER_COLOR_OPTIONS,
} from '../config/options'

export function build$1PanelConfig(
  config: $1Config,
  presets: $1PresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildOuterSection(config),
      // Add more sections as needed
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true, // REQUIRED
    },
    showReset: true,
  }
}

function buildOuterSection(config: $1Config): Section {
  return {
    id: 'outer',
    label: 'Outer',
    title: 'Outer Layer Styling',
    groups: [
      {
        title: 'Shine Effect',
        controls: [
          {
            id: 'outer.shine',
            type: 'select',
            label: 'Type',
            value: config.outer.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'outer.shineIntensity',
            type: 'select',
            label: 'Intensity',
            value: config.outer.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
          {
            id: 'outer.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.outer.shadow,
            options: [...SHADOW_OPTIONS],
          },
        ],
      },
      {
        title: 'Background',
        controls: [
          {
            id: 'outer.background',
            type: 'select',
            label: 'Color',
            value: config.outer.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'outer.depth',
            type: 'select',
            label: 'Depth Gradient',
            value: config.outer.depth,
            options: [...DEPTH_OPTIONS],
          },
        ],
      },
      {
        title: 'Shape & Corners',
        controls: [
          {
            id: 'outer.corner',
            type: 'select',
            label: 'Corner Style',
            value: config.outer.corner,
            options: [...CORNER_OPTIONS],
          },
          {
            id: 'outer.borderRadius',
            type: 'slider',
            label: 'Radius',
            value: config.outer.borderRadius,
            min: 0,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'outer.border',
            type: 'toggle',
            label: 'Show Border',
            value: config.outer.border,
          },
          {
            id: 'outer.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.outer.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'outer.padding',
            type: 'slider',
            label: 'Padding',
            value: config.outer.padding,
            min: 0,
            max: 64,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}
```

---

## Layer 3: Utility Functions

### `utils/class-builders.ts`

```typescript
import { cx } from '@/v2/utils/cx'
import type { $1Config } from '../config/types'

/**
 * Build Tailwind classes from config
 */

export function buildShineClass(
  type: string,
  intensity: string,
  shadow: string
): string {
  if (type === 'none') return ''
  let shineClass = type
  if (intensity) shineClass += intensity
  if (shadow !== 'none') shineClass += `-shadow-${shadow}`
  return shineClass
}

export function buildBackgroundClass(background: string): string {
  return `bg-${background}`
}

export function buildCornerClass(corner: string): string {
  if (corner === 'round') return ''
  return `corner-${corner}`
}

export function buildDepthClass(depth: string): string {
  if (depth === 'none') return ''
  return depth
}

export function buildBorderClasses(
  showBorder: boolean,
  borderColor: string
): string {
  if (!showBorder) return ''
  return `border border-${borderColor}`
}

export function buildOuterClasses(config: $1Config['outer']): string {
  return cx(
    buildBackgroundClass(config.background),
    buildShineClass(config.shine, config.shineIntensity, config.shadow),
    buildDepthClass(config.depth),
    buildCornerClass(config.corner),
    buildBorderClasses(config.border, config.borderColor)
  )
}

export function buildOuterStyles(config: $1Config['outer']): React.CSSProperties {
  return {
    borderRadius: config.borderRadius,
    padding: config.padding,
  }
}
```

---

## Layer 4: Core Component

### `core/$1.tsx` - Migration-Ready Component

```typescript
/**
 * $1 Component
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/$1
 */

import * as React from 'react'
import { cx } from '@/v2/utils/cx'
import type { $1Config } from '../config/types'
import { DEFAULT_$1_CONFIG } from '../config/presets'
import { buildOuterClasses, buildOuterStyles } from '../utils/class-builders'

export interface $1Props {
  config?: Partial<$1Config>
  className?: string
  children?: React.ReactNode
}

export const $1 = React.forwardRef<HTMLDivElement, $1Props>(
  ({ config: configOverride, className, children }, ref) => {
    const config: $1Config = {
      outer: { ...DEFAULT_$1_CONFIG.outer, ...configOverride?.outer },
    }

    return (
      <div
        ref={ref}
        className={cx(buildOuterClasses(config.outer), className)}
        style={buildOuterStyles(config.outer)}
      >
        {children}
      </div>
    )
  }
)

$1.displayName = '$1'
```

---

## Layer 5: Playground Page

### `page.tsx` - App Router Page

```typescript
'use client'

/**
 * $1 Playground
 *
 * Core component: ./core/$1.tsx
 * Migration target: src/components/ui/prod/features/$1
 */

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { $1 } from './core/$1'
import type { $1Config } from './config/types'
import { DEFAULT_$1_CONFIG, $1_PRESETS } from './config/presets'
import { build$1PanelConfig } from './panels/panel-config'

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = { ...obj } as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) }
    current = current[keys[i]] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

export default function $1Playground() {
  const [config, setConfig] = useState<$1Config>(DEFAULT_$1_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = $1_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_$1_CONFIG)
    setActivePresetId('default')
  }, [])

  const panelConfig = useMemo(
    () => build$1PanelConfig(config, $1_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Preview Area */}
      <div className="flex h-full items-center justify-center bg-primary">
        <$1 config={config}>
          <h3 className="text-display-sm font-display text-primary">
            $1 Preview
          </h3>
          <p className="text-secondary mt-2">
            Configure using the control panel
          </p>
        </$1>
      </div>
    </div>
  )
}
```

---

## README.md - Migration Documentation

```markdown
# $1 Playground

## Status
- [ ] Incubating

## Files
| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/$1.tsx` | Core component | Yes |
| `config/types.ts` | Type definitions | Yes |
| `config/presets.ts` | Preset definitions | Yes (as variants) |
| `config/options.ts` | Control options | No |
| `panels/panel-config.ts` | Panel config | No |
| `utils/class-builders.ts` | Style mapping | Yes |

## Migration Target
`src/components/ui/prod/features/$1`

## Checklist
- [ ] Component finalized in playground
- [ ] All presets documented
- [ ] Copy core files to production location
- [ ] Create production variants from presets
- [ ] Add to component exports
- [ ] Delete playground files
```

---

## Style System Reference

**Read before implementing controls:**

| Doc | Location |
|-----|----------|
| Style Init | `src/styles/docs/init.md` |
| Effects | `src/styles/docs/utilities/effects.md` |
| Colors | `src/styles/docs/tokens/colors.md` |
| All Utils | `src/styles/docs/reference/all-utilities.md` |

---

## Output Checklist

1. [ ] Create `config/types.ts` - Config interface
2. [ ] Create `config/options.ts` - Control options
3. [ ] Create `config/presets.ts` - Preset definitions
4. [ ] Create `panels/panel-config.ts` - Panel configuration
5. [ ] Create `utils/class-builders.ts` - Style mapping
6. [ ] Create `core/$1.tsx` - Migration-ready component
7. [ ] Create `page.tsx` - Playground page
8. [ ] Create `README.md` - Migration documentation
9. [ ] Verify at `/playground/$1` or `/_hidden/playground/$1`

---

## Layout Gotchas

The UnifiedControlPanel uses `position: fixed`, so your preview area does **NOT** need padding to reserve space for it.

### Correct Pattern

```tsx
// Page layout - no padding needed for the panel
<div className="relative h-screen overflow-hidden">
  {/* Control panel overlays the preview */}
  <UnifiedControlPanel config={panelConfig} onChange={handleChange} ... />

  {/* Preview area takes full space */}
  <div className="flex h-full items-center justify-center bg-primary">
    <YourComponent />
  </div>
</div>
```

### Common Mistakes

**Don't do this:**
```tsx
// WRONG - hardcoded padding causes layout shift when panel minimizes
<div className="pr-[352px]">
  <YourComponent />
</div>
```

**Why `overflow-hidden`?**
- Prevents double scrollbars (page + panel)
- Contains the preview area within viewport bounds
- Panel has its own internal ScrollArea for overflow

---

## Key Requirements Summary

1. **Preset System is MANDATORY** - Every playground must have presets
2. **Copy Button is MANDATORY** - Always include `getConfigForCopy`
3. **Modular Files** - Split config, panels, utils, core into separate files
4. **Style Integration** - Include shine, depth, corners, semantic tokens
5. **Sliders for Values** - Use sliders for numeric controls (radius, padding)
6. **Migration Path** - Document how presets become production variants
7. **Demo Repo Paths** - Use `@/components/ui/patterns/control-panel` not frontend paths
8. **No Panel Padding** - Panel is fixed position, don't add padding for it
