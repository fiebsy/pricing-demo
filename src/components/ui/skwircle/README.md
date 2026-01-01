# Skwircle

A unified squircle component system with variant-first API and smart FOUC prevention.

## Quick Start

```tsx
import { Skwircle } from '@/modules/design-system/v2/components/ui/custom/base/skwircle'

// Compound components
<Skwircle.Button intent="primary">Click me</Skwircle.Button>
<Skwircle.Card elevation="sm">Card content</Skwircle.Card>
<Skwircle.Badge>Status</Skwircle.Badge>
<Skwircle.Input>...</Skwircle.Input>
<Skwircle.Avatar>...</Skwircle.Avatar>

// Base component with variant
<Skwircle variant="button" intent="primary">...</Skwircle>
```

## Folder Structure

```
skwircle/
├── components/          # Compound component wrappers
│   ├── skwircle-button  # Button + re-exports button config
│   ├── skwircle-badge   # Badge + re-exports badge config
│   ├── skwircle-card
│   ├── skwircle-input
│   └── skwircle-avatar
├── config/              # Presets (edit these to update demo)
│   ├── button.ts        # BUTTON_SIZE_CONFIGS, BUTTON_INTENT_CONFIGS
│   ├── badge.ts         # BADGE_SIZE_CONFIGS, BADGE_COLOR_CONFIGS
│   ├── variants.ts      # Default variant settings
│   ├── intents.ts       # Intent color schemes
│   ├── roundness.ts     # Corner radius presets
│   ├── elevations.ts    # Shadow presets
│   └── gradients.ts     # Border/background gradients
├── core/                # Hooks
│   ├── use-dimensions
│   ├── use-hover-state
│   ├── use-skwircle-colors
│   ├── use-skwircle-mount
│   └── use-skwircle-shape
├── rendering/           # SVG rendering
│   ├── skwircle-svg
│   ├── skwircle-shadow
│   └── skwircle-gradients
├── utils/               # Utilities
│   ├── color-resolver
│   └── path-generator
├── skwircle.tsx         # Base component + compound assembly
├── types.ts             # All type definitions
└── index.ts             # Public API exports
```

## Using Config Helpers

Import config helpers for precise styling control:

```tsx
import {
  // Button helpers
  BUTTON_SIZE_CONFIGS,
  getButtonPaddingStyle,
  getButtonIntentConfig,

  // Badge helpers
  BADGE_SIZE_CONFIGS,
  getBadgeColorConfig,
  getBadgePaddingStyle,
  getBadgeIconStyle,
  getBadgeTextStyle,
} from '@/modules/design-system/v2/components/ui/custom/base/skwircle'
```

### Button Example

```tsx
const sizeConfig = BUTTON_SIZE_CONFIGS.md
const padding = getButtonPaddingStyle('md', false, true) // size, iconOnly, hasLeadingIcon

<Skwircle.Button intent="primary">
  <span className={sizeConfig.textClass} style={padding}>
    <Icon size={sizeConfig.iconSize} />
    Button Text
  </span>
</Skwircle.Button>
```

### Badge Example

```tsx
const colorConfig = getBadgeColorConfig('badge', 'success')
const padding = getBadgePaddingStyle('md', 'leading')
const iconStyle = getBadgeIconStyle(colorConfig)
const textStyle = getBadgeTextStyle(colorConfig)

<Skwircle.Badge
  backgroundColor={colorConfig.backgroundColor}
  borderColor={colorConfig.borderColor}
>
  <span className="flex items-center text-sm" style={padding}>
    <span style={iconStyle}><CheckIcon /></span>
    <span style={textStyle}>Approved</span>
  </span>
</Skwircle.Badge>
```

## Updating Presets

Edit files in `config/` to update presets. Changes automatically flow to the demo page.

### Button Sizes (`config/button.ts`)

```ts
export const BUTTON_SIZE_CONFIGS: Record<ButtonSize, ButtonSizeConfig> = {
  md: {
    paddingX: 14,
    paddingY: 10,
    paddingLeftWithLeadingIcon: 8,
    gap: 6,
    textClass: 'text-sm leading-none',
    iconSize: 18,
    iconStroke: 2,
    iconOnlyPadding: 10,
  },
  // ...
}
```

### Badge Colors (`config/badge.ts`)

```ts
export const BADGE_COLOR_CONFIGS: Record<BadgeColor, BadgeColorConfig> = {
  success: {
    backgroundColor: 'utility-success-50',
    borderColor: 'utility-success-200',
    textColor: 'utility-success-700',
    iconColor: 'utility-success-700',
    iconOpacity: 0.55,
  },
  // ...
}
```

## Component Props

### Common Props (all variants)

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `'button' \| 'badge' \| 'card' \| 'input' \| 'avatar'` | Component type |
| `intent` | `'default' \| 'primary' \| 'secondary' \| 'ghost' \| 'error' \| 'success' \| 'warning'` | Color scheme |
| `roundness` | `'none' \| 'subtle' \| 'moderate' \| 'rounded' \| 'pill'` | Corner radius |
| `elevation` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg'` | Shadow depth |
| `borderWidth` | `number` | Border thickness |
| `ring` | `boolean` | Enable outer ring |
| `ringColor` | `string` | Ring color token |
| `ringWidth` | `number` | Ring thickness |
| `ringOpacity` | `number` | Ring opacity (0-100) |
| `backgroundColor` | `string` | Override background |
| `borderColor` | `string` | Override border |
| `backgroundGradient` | `string` | Gradient preset name |
| `fillMode` | `boolean` | Expand to container |
| `disabled` | `boolean` | Disabled state |

### Card-specific

```tsx
<Skwircle.Card
  elevation="sm"
  backgroundGradient="depth-10-bottom-right"  // Inner shadow effect
  fillMode                                     // Full width
>
```

### Input-specific

```tsx
<Skwircle.Input
  ring={isFocused}
  ringColor="outline-color-brand"
  borderColor={hasError ? 'border-error' : undefined}
>
```

## Demo Page

View the interactive demo at:
```
/playground/ui/gallery/skwircle-demo
```

The demo imports directly from this folder, so any config changes appear immediately.

## Architecture Notes

1. **Factory Pattern**: Compound components use factory functions (`createSkwircleButton`) that receive the base component. This keeps `skwircle.tsx` clean.

2. **Config Co-location**: Each component file in `components/` re-exports its related config helpers. You can import everything from the main index.

3. **FOUC Prevention**: The `mountStrategy` prop controls how the component handles initial render before dimensions are measured.

4. **Semantic Tokens**: All colors use semantic tokens (`text-primary`, `bg-brand-solid`) for theme compatibility.
