# Landing Hero Playground

A playground for the landing page hero section, exposing controls for background effects, image container styling, and interactive states.

## Overview

This playground allows you to experiment with all visual aspects of the landing hero component before migrating to production.

## File Structure

```
landing-hero/
├── page.tsx                    # Main playground page
├── README.md                   # This file
├── config/
│   ├── types.ts               # LandingHeroConfig interface
│   ├── options.ts             # Control options (pattern, shine, shadow, etc.)
│   └── presets.ts             # Default + 5 presets
├── panels/
│   └── panel-config.ts        # Control panel configuration (3 sections)
├── core/
│   └── landing-hero.tsx       # Migration-ready component
└── utils/
    └── class-builders.ts      # Style mapping utilities
```

## Configuration

### Background Section
- **Pattern**: Toggle, type (dots/grid/diagonal/none), opacity
- **Blur Circle**: Toggle, color, size, opacity, blur amount

### Image Section
- **Shine**: Type (none through shine-brand), intensity (normal/subtle/intense)
- **Shadow**: Size (none through 2xl)
- **Shape**: Corner style (round/squircle), outer radius, inner radius, padding
- **Backdrop**: Blur effect (none/sm/md/lg)

### Interaction Section
- **Click**: Scale factor (80-100%)
- **Hover**: Intense shine toggle

## Presets

| ID | Name | Description |
|----|------|-------------|
| `default` | Default | Current landing page styling |
| `minimal` | Minimal | No pattern, no blur circle, subtle shadow |
| `dramatic` | Dramatic | Large blur circle, intense shine, heavy shadow |
| `brand` | Brand Focus | Brand colors, pattern overlay, medium blur |
| `clean` | Clean | No decorations, clean image presentation |

## Migration Path

1. **Incubate** in this playground
2. **Validate** presets and variations
3. **Extract** `core/landing-hero.tsx` to production
4. **Convert** presets to component variants
5. **Update** main `page.tsx` to use the production component

### Migration Target

```
src/components/ui/prod/features/landing-hero/
├── landing-hero.tsx           # Component
├── types.ts                   # Types
└── index.ts                   # Exports
```

## Usage

```tsx
import { LandingHero } from './core/landing-hero'
import { DEFAULT_LANDING_HERO_CONFIG } from './config/presets'

<LandingHero
  config={DEFAULT_LANDING_HERO_CONFIG}
  onClick={handleClick}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
/>
```

## Default Values (Current Landing Page)

```typescript
const DEFAULT_LANDING_HERO_CONFIG = {
  background: {
    showPattern: true,
    patternType: 'diagonal',
    patternOpacity: 0.04,
    showBlurCircle: true,
    blurCircleColor: 'brand-solid',
    blurCircleSize: 400,
    blurCircleOpacity: 0.1,
    blurAmount: 40,
  },
  image: {
    shine: 'shine-3',
    shineIntensity: '',
    shadow: '2xl',
    outerCorner: 'squircle',
    outerBorderRadius: 24,
    innerBorderRadius: 20,
    padding: 4,
    backdropBlur: 'sm',
  },
  interaction: {
    scaleOnClick: 0.9,
    hoverShineIntense: true,
  },
}
```
