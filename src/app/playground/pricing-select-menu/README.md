# Pricing Select Menu

An isolated pricing select menu component extracted from the biaxial-expand system. This component provides a fully standalone implementation for upgrade/pricing tier selection with A/B variant support.

## Overview

The Pricing Select Menu is a compound component that combines:
- **Expandable card** with smooth clip-path animations
- **Tier selection** with configurable item styling
- **A/B variants** for different presentation modes
- **Typography system** for consistent text styling

## Installation

The component is located at:
```
src/components/ui/features/pricing-select-menu/
```

## Usage

### Basic Usage

```tsx
import {
  PricingSelectMenu,
  type PricingTier,
} from '@/components/ui/features/pricing-select-menu'

function MyComponent() {
  const [expanded, setExpanded] = useState(false)
  const [selectedTier, setSelectedTier] = useState<PricingTier>(tiers[0])

  return (
    <PricingSelectMenu.Root
      config={config}
      expanded={expanded}
      onExpandedChange={setExpanded}
    >
      <PricingSelectMenu.Backdrop />
      <PricingSelectMenu.Content>
        <PricingSelectMenu.Trigger>
          <PricingSelectMenu.TriggerContentA
            selectedTier={selectedTier}
            triggerTypography={typographyConfig}
            syncedSubtext={subtextConfig}
          />
        </PricingSelectMenu.Trigger>
        <PricingSelectMenu.ContentWrapper>
          <PricingSelectMenu.BottomSlot>
            <PricingSelectMenu.OptionsList
              tiers={tiers}
              selectedId={selectedTier.id}
              onSelect={setSelectedTier}
            />
          </PricingSelectMenu.BottomSlot>
        </PricingSelectMenu.ContentWrapper>
      </PricingSelectMenu.Content>
    </PricingSelectMenu.Root>
  )
}
```

### Variant B (Card Display)

```tsx
<PricingSelectMenu.Root config={config} expanded={expanded} onExpandedChange={setExpanded}>
  <PricingSelectMenu.Backdrop />
  <PricingSelectMenu.Content>
    <PricingSelectMenu.Trigger>
      <PricingSelectMenu.TriggerContentB
        selectedTier={selectedTier}
        variantBConfig={variantBTriggerConfig}
      />
    </PricingSelectMenu.Trigger>
    <PricingSelectMenu.ContentWrapper>
      <PricingSelectMenu.BottomSlot>
        <PricingSelectMenu.BottomContentB
          selectedTier={selectedTier}
          variantBConfig={variantBBottomConfig}
        />
      </PricingSelectMenu.BottomSlot>
    </PricingSelectMenu.ContentWrapper>
  </PricingSelectMenu.Content>
</PricingSelectMenu.Root>
```

## Component API

### PricingSelectMenu.Root

The root provider component that manages state and configuration.

| Prop | Type | Description |
|------|------|-------------|
| `config` | `Partial<PricingSelectMenuConfig>` | Configuration object |
| `expanded` | `boolean` | Controlled expanded state |
| `onExpandedChange` | `(expanded: boolean) => void` | Callback when expanded changes |
| `children` | `ReactNode` | Child components |

### PricingSelectMenu.Backdrop

Animated backdrop with configurable shine, shadow, and gradient effects.

### PricingSelectMenu.Content

Container with clip-path animation. Wraps trigger and content wrapper.

### PricingSelectMenu.Trigger

Clickable trigger area. Expects a single child component.

### PricingSelectMenu.ContentWrapper

Positions bottom content below the trigger in overlay mode.

### PricingSelectMenu.BottomSlot

Scrollable container for menu content with configurable styling.

### PricingSelectMenu.TriggerContentA

Variant A trigger with price display, synced subtext, and dropdown icon.

| Prop | Type | Description |
|------|------|-------------|
| `selectedTier` | `PricingTier` | Currently selected tier |
| `triggerTypography` | `TriggerTypographyConfig` | Typography settings |
| `syncedSubtext` | `SyncedSubtextConfig` | Subtext configuration |
| `showDropdownIcon` | `boolean` | Show dropdown arrow |
| `dropdownIconRotates` | `boolean` | Rotate icon when expanded |
| `upgradeMode` | `boolean` | Show upgrade fee instead of full price |

### PricingSelectMenu.TriggerContentB

Variant B trigger with compact plan row display.

| Prop | Type | Description |
|------|------|-------------|
| `selectedTier` | `PricingTier` | Currently selected tier |
| `variantBConfig` | `VariantBTriggerConfig` | Variant B configuration |

### PricingSelectMenu.OptionsList

Tier selection menu with configurable item styling.

| Prop | Type | Description |
|------|------|-------------|
| `tiers` | `PricingTier[]` | Available tiers |
| `selectedId` | `string` | Selected tier ID |
| `onSelect` | `(tier: PricingTier) => void` | Selection callback |
| `showHeader` | `boolean` | Show section header |
| `headerLabel` | `string` | Header text |
| `itemTypography` | `ItemTypographyConfig` | Item text styling |
| `menuItemLabel` | `MenuItemLabelConfig` | Label configuration |
| `upgradeMode` | `boolean` | Show upgrade pricing |

### PricingSelectMenu.BottomContentB

Variant B bottom content with due row and subtext.

| Prop | Type | Description |
|------|------|-------------|
| `selectedTier` | `PricingTier` | Currently selected tier |
| `variantBConfig` | `VariantBBottomSlotConfig` | Configuration |

## Configuration

### Layout Config

```ts
interface LayoutConfig {
  triggerWidth: number      // Trigger element width
  triggerHeight: number     // Trigger element height
  panelWidth: number        // Expanded panel width
  maxBottomHeight: number   // Maximum bottom slot height
  borderRadius: number      // Container border radius
  bottomGap: number         // Gap between trigger and bottom
}
```

### Animation Config

```ts
interface AnimationConfig {
  duration: number              // Expand duration (ms)
  collapseDuration: number      // Collapse duration (ms)
  contentFadeDuration: number   // Content fade duration
  contentFadeDelay: number      // Content fade delay
  animateSlotContainers: boolean
  slotContainerDelay: number
  slotContainerDurationOffset: number
  expandOrigin: 'top' | 'center' | 'bottom'
}
```

### Appearance Config

```ts
interface AppearanceConfig {
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shine: ShineVariant
  background: BackgroundOption
  gradient: GradientPattern
  gradientColor: GradientColor
  squircle: boolean
}
```

### Bottom Slot Config

```ts
interface BottomSlotConfig {
  enabled: boolean
  heightMode: 'fixed' | 'auto' | 'dynamic'
  height: number
  scrollable: boolean
  background: BackgroundOption
  shine?: string
  borderRadius: number
  inset: number
  borderWidth: number
  borderColor: BorderColorOption
}
```

## PricingTier Interface

```ts
interface PricingTier {
  id: string
  planName: string
  credits: number
  creditsLabel: string
  additionalCredits: number
  additionalCreditsLabel: string
  events: number
  eventsLabel: string
  price: number
  priceFormatted: string
  monthlyPrice: number
  upgradeFee: number
  upgradeFeeFormatted: string
}
```

## Typography System

The component uses a flexible typography system with these options:

### Font Sizes
`xs` | `sm` | `base` | `lg` | `xl` | `2xl` | `3xl`

### Font Weights
`light` | `normal` | `medium` | `semibold` | `bold` | `extrabold`

### Text Colors
`primary` | `secondary` | `tertiary` | `brand`

### Opacity Values
`100` | `80` | `60` | `40`

### Display Modes
`text` | `badge`

### Badge Colors
`gray` | `brand` | `success` | `warning` | `error`

## Migration from BiaxialExpand

This component was extracted from the biaxial-expand primitive with the following simplifications:

### Removed Features

| Feature | Reason |
|---------|--------|
| TopSlot | Pricing select only uses bottom slot |
| LeftSlot, RightSlot | No horizontal expansion needed |
| Push position mode | Only overlay mode used |
| Integrated bottom slot mode | Not needed |
| Complex height driving | Bottom slot drives height |

### Key Differences

1. **No slot dimension refs** - Simplified state management
2. **Center-only expandOriginX** - No horizontal slot calculations
3. **Overlay mode only** - No push mode positioning
4. **Single expanding slot** - Bottom slot is the only expanding content

## File Structure

```
src/components/ui/features/pricing-select-menu/
├── index.ts                     # Public exports
├── pricing-select-menu.tsx      # Root component
├── context.tsx                  # Context provider
├── types.ts                     # Type definitions
├── constants.ts                 # Default config, style maps
├── components/
│   ├── index.ts
│   ├── backdrop.tsx
│   ├── content-layer.tsx
│   ├── content-wrapper.tsx
│   ├── trigger-slot.tsx
│   ├── bottom-slot.tsx
│   ├── trigger-content.tsx      # A + B variants
│   ├── options-list.tsx
│   ├── bottom-content-b.tsx
│   ├── text-segment.tsx
│   └── animated-slot.tsx
└── utils/
    ├── index.ts
    ├── clip-path.ts
    ├── styling.ts
    └── deep-merge.ts
```

## Playground

The playground is located at:
```
src/app/playground/pricing-select-menu/
```

Run the development server and navigate to `/playground/pricing-select-menu` to experiment with the component.

### Playground Features

- **Preset configurations** - Quick access to common setups
- **Full control panel** - Adjust all configuration options
- **A/B variant toggle** - Switch between display modes
- **Debug mode** - Visualize component boundaries
- **Slow motion** - Debug animations at 5x slower speed
- **Auto-open** - Keep menu expanded for styling

## Dependencies

- `motion/react` - A/B crossfade animation
- `@base-ui/react/scroll-area` - Scrollable menu content
- `@hugeicons-pro/core-stroke-rounded` - ArrowDown01Icon, Tick01Icon
- `@/lib/utils` - cn() classname utility
