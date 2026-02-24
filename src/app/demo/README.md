# Demo Pricing Modal

Self-contained pricing modal system for design challenge evaluation.

## Overview

This demo showcases an interactive pricing upgrade flow with:

- **Multi-step flow**: Selection → Confirmation → Processing → Success
- **Animated transitions**: Smooth button state changes with spring animations
- **Pricing tiers**: 5 configurable tier options with dynamic interpolation
- **Visual polish**: Coin stack asset, shine effects, depth gradients

## Structure

```
src/app/demo/
├── page.tsx                              # Main demo page
├── README.md                             # This file
└── components/
    ├── index.ts                          # Barrel exports
    ├── animated-credits-badge.tsx        # Credit counter animation
    ├── icons.tsx                         # Demo page icons
    └── pricing/                          # Self-contained pricing system
        ├── index.ts                      # Pricing exports
        ├── pricing-wrapper.tsx           # State management wrapper
        ├── config/
        │   ├── types.ts                  # Type definitions
        │   └── presets.ts                # Default configuration
        ├── core/
        │   ├── pricing-modal.tsx         # Main modal component
        │   ├── button-section.tsx        # Flow button integration
        │   ├── pro-card.tsx              # Pro badge display
        │   ├── pricing-select-slot.tsx   # Tier selector
        │   ├── checklist-slot.tsx        # Checklist renderer
        │   └── pricing-tiers.ts          # Tier definitions
        ├── utils/
        │   ├── class-builders.ts         # CSS class/style generators
        │   └── button-adapter.ts         # Flow-to-state mapping
        ├── hooks/
        │   └── use-pricing-flow.ts       # Flow orchestration
        └── assets/
            ├── coin-stack/               # Coin stack SVG component
            └── checklist-icons.tsx       # Checklist SVG icons
```

## Flow States

The modal uses a 5-state flow system:

| State | Flow | Description | Button |
|-------|------|-------------|--------|
| A | flow-a | Tier selection | "Upgrade" |
| B1 | flow-b | Confirmation | "Back" + "Upgrade" |
| B2 | flow-b | Processing | Spinner |
| C1 | flow-c | Success | Checkmark |
| C2 | flow-c | Completion | "Let's create" |

## External Dependencies

The pricing system imports these stable UI components:

- `@/components/ui/features/pricing-select-menu` - Expandable pricing dropdown
- `@/components/ui/core/primitives/fluid-button-layout` - Animated button system
- `@/components/ui/core/primitives/fluid-button-group` - Button layout
- `@/components/ui/core/primitives/button` - Base button
- `@/components/ui/core/primitives/icon` - Hugeicons wrapper
- `@base-ui/react/dialog` - Modal primitives
- `motion/react` - Animation library

## Usage

```tsx
import { DemoPricingWrapper } from './components'

function Demo() {
  const [open, setOpen] = useState(false)

  const handleUpgradeComplete = (credits: number) => {
    console.log('Upgraded to', credits, 'credits')
  }

  return (
    <DemoPricingWrapper
      open={open}
      onOpenChange={setOpen}
      onUpgradeComplete={handleUpgradeComplete}
    />
  )
}
```

## Evaluation Flow

1. Click "Generate" button (when credits < 100)
2. Modal opens with tier selection
3. Select a tier → Click "Upgrade"
4. Confirmation screen → Click "Upgrade" again
5. Processing animation → Success checkmark
6. "Let's create" button → Modal closes
7. Credits badge animates to new value
8. Generate button bounces when threshold crossed

## Configuration

The modal is configured via `DEFAULT_PRICING_CONFIG` in `config/presets.ts`:

- Container dimensions and styling
- Animation presets and timing
- Flow-specific content (headers, button labels)
- Checklist items with interpolation placeholders
- Pro card appearance
- Backdrop and close button settings

---

**Last Updated**: February 2026
