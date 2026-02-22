# Coin Stack Playground

A 3D coin stack SVG component with configurable gradients, effects, and Motion.dev interactions.

## Status

- **Stage**: Incubating
- **Migration Target**: `src/components/ui/prod/features/coin-stack`

## Features

- Two-tier coin stack with independent styling
- Linear and radial gradient fills
- SVG drop shadows, inner glow, and shine overlays
- Hover and click interactions with Motion.dev
- Spring and easing-based animations
- Debug mode with crosshairs and viewport boundary

## File Structure

```
src/app/playground/coin-stack/
├── page.tsx                 # Playground page
├── core/
│   └── coin-stack.tsx       # Migration-ready component
├── config/
│   ├── types.ts             # TypeScript interfaces
│   ├── presets.ts           # Preset definitions
│   └── options.ts           # Control options & color map
├── panels/
│   └── panel-config.ts      # UnifiedControlPanel builder
├── utils/
│   └── gradients.tsx        # SVG gradient helpers
└── README.md                # This file
```

## Presets

| ID | Name | Description |
|----|------|-------------|
| `default` | Classic | Original black/white from SVG |
| `gold-metallic` | Gold Metallic | Linear gradient gold-500→gold-300, warm shadow, strong shine |
| `brand-gradient` | Brand | Radial gradient with brand tokens, subtle hover glow |
| `interactive-bounce` | Interactive | Spring hover/click, high bounce, scale effects |
| `subtle-depth` | Subtle Depth | Soft gradients, large drop shadow, minimal interaction |

## Migration Guide

### 1. Copy Core Files

```bash
# Copy component and utilities
cp src/app/playground/coin-stack/core/coin-stack.tsx \
   src/components/ui/prod/features/coin-stack/

cp src/app/playground/coin-stack/utils/gradients.tsx \
   src/components/ui/prod/features/coin-stack/
```

### 2. Extract Types

Move the types needed for the public API:

```typescript
// src/components/ui/prod/features/coin-stack/types.ts
export type { CoinStackConfig, TierConfig, GradientConfig } from './config/types'
```

### 3. Convert Presets to Variants

Transform presets into component variants or props:

```typescript
// Option A: Named variants
<CoinStack variant="gold-metallic" size={100} />

// Option B: Theme-based
<CoinStack tier="gold" effects="metallic" />

// Option C: Full config (for power users)
<CoinStack config={customConfig} />
```

### 4. Simplify for Production

- Remove playground-only features (`showDebug`, `slowMo`)
- Extract only the config options needed for your use case
- Consider a simpler props-based API for common cases

## Usage Example

```tsx
import { CoinStack } from './core/coin-stack'
import { DEFAULT_CONFIG } from './config/presets'

// Basic usage with defaults
<CoinStack config={DEFAULT_CONFIG} />

// Custom configuration
<CoinStack
  config={{
    ...DEFAULT_CONFIG,
    size: { width: 100, aspectRatio: '1:1' },
    topTier: {
      ...DEFAULT_CONFIG.topTier,
      useGradient: true,
      gradient: {
        enabled: true,
        type: 'linear',
        direction: 'to-bottom',
        startColor: 'gold-300',
        endColor: 'gold-500',
        startOpacity: 100,
        endOpacity: 100,
      },
    },
    interaction: {
      ...DEFAULT_CONFIG.interaction,
      hoverEnabled: true,
      hoverScale: 1.05,
      hoverLift: 4,
    },
  }}
/>
```

## Configuration Reference

### Size

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number` | `200` | Width in pixels (50-400) |
| `aspectRatio` | `'1:1' \| '4:5' \| '3:4'` | `'1:1'` | Aspect ratio for height calculation |

### Tier (bottomTier / topTier)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `faceColor` | `string` | `'white'` | Semantic color token |
| `useGradient` | `boolean` | `false` | Enable gradient fill |
| `gradient` | `GradientConfig` | - | Gradient configuration |
| `strokeColor` | `string` | `'black'` | Stroke color token |
| `strokeWidth` | `number` | `2` | Stroke width (0-6px) |
| `shadowColor` | `string` | `'black'` | Body shadow color |
| `shadowOpacity` | `number` | `100` | Shadow opacity (0-100%) |

### Gradient

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'linear' \| 'radial'` | `'linear'` | Gradient type |
| `direction` | `string` | `'to-bottom'` | Direction (linear only) |
| `startColor` | `string` | - | Start color token |
| `endColor` | `string` | - | End color token |
| `startOpacity` | `number` | `100` | Start opacity (0-100%) |
| `endOpacity` | `number` | `100` | End opacity (0-100%) |

### Effects

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dropShadow` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` | Drop shadow size |
| `dropShadowColor` | `string` | `'black'` | Shadow color token |
| `dropShadowOpacity` | `number` | `30` | Shadow opacity (0-100%) |
| `innerGlow` | `'none' \| 'subtle' \| 'medium' \| 'strong'` | `'none'` | Inner glow intensity |
| `innerGlowColor` | `string` | `'white'` | Glow color token |
| `shineOverlay` | `'none' \| 'subtle' \| 'medium' \| 'strong'` | `'none'` | Shine overlay intensity |

### Interaction

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hoverEnabled` | `boolean` | `false` | Enable hover effects |
| `hoverScale` | `number` | `1.05` | Scale on hover (0.95-1.15) |
| `hoverLift` | `number` | `4` | Lift (Y offset) on hover |
| `hoverRotate` | `number` | `0` | Rotation on hover (-15 to 15) |
| `hoverGlow` | `boolean` | `false` | Enable hover glow |
| `hoverGlowColor` | `string` | `'gold-400'` | Glow color token |
| `clickEnabled` | `boolean` | `false` | Enable click effect |
| `clickScale` | `number` | `0.95` | Scale on click (0.85-1.0) |
| `animationDuration` | `number` | `200` | Duration in ms (100-500) |
| `animationEasing` | `'spring' \| 'ease-out' \| 'ease-in-out'` | `'spring'` | Easing type |
| `springBounce` | `number` | `0.3` | Spring bounce (0-1) |

## Dependencies

- `motion/react` - Animation library
- `@/lib/utils` - `cn` utility for class merging
