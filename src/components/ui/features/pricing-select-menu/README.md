# PricingSelectMenu

A composable pricing tier selection component with expand/collapse animation. Supports two display modes:

- **Variant A**: Expandable dropdown for tier selection
- **Variant B**: Static card showing selected tier details

## Quick Start

```tsx
import {
  PricingSelectMenu,
  usePricingSelect,
  UPGRADE_FLOW_PRESET,
} from '@/components/ui/features/pricing-select-menu'

function MyPricingModal({ tiers }) {
  const {
    expanded,
    setExpanded,
    effectiveExpanded,
    selectedTier,
    handleTierSelect,
    availableTiers,
    isVariantA,
  } = usePricingSelect({
    tiers,
    upgradeMode: true,
  })

  return (
    <PricingSelectMenu.Root expanded={effectiveExpanded} onExpandedChange={setExpanded}>
      <PricingSelectMenu.Backdrop />
      <PricingSelectMenu.Content>
        <PricingSelectMenu.Trigger>
          <PricingSelectMenu.TriggerContentA
            selectedTier={selectedTier}
            triggerTypography={UPGRADE_FLOW_PRESET.typography.trigger}
            syncedSubtext={UPGRADE_FLOW_PRESET.typography.syncedSubtext}
          />
        </PricingSelectMenu.Trigger>
        <PricingSelectMenu.ContentWrapper>
          <PricingSelectMenu.BottomSlot>
            <PricingSelectMenu.OptionsList
              tiers={availableTiers}
              selectedId={selectedTier.id}
              onSelect={handleTierSelect}
              itemTypography={UPGRADE_FLOW_PRESET.typography.items}
              menuItemLabel={UPGRADE_FLOW_PRESET.typography.menuItemLabel}
            />
          </PricingSelectMenu.BottomSlot>
        </PricingSelectMenu.ContentWrapper>
      </PricingSelectMenu.Content>
    </PricingSelectMenu.Root>
  )
}
```

---

## API Reference

### `usePricingSelect` Hook

Production-ready state management for the component. Handles controlled/uncontrolled patterns, tier filtering, and variant-specific behavior.

```tsx
const result = usePricingSelect(options)
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tiers` | `PricingTier[]` | required | All available pricing tiers |
| `initialTier` | `PricingTier` | `tiers[0]` | Initial selection (uncontrolled) |
| `variant` | `'A' \| 'B'` | `'A'` | Current variant (controlled) |
| `onVariantChange` | `(v) => void` | - | Callback when variant changes |
| `expanded` | `boolean` | `false` | Expanded state (controlled) |
| `onExpandedChange` | `(e) => void` | - | Callback when expanded changes |
| `selectedTier` | `PricingTier` | - | Selected tier (controlled) |
| `onTierSelect` | `(t) => void` | - | Callback when tier selected |
| `upgradeMode` | `boolean` | `false` | Filters out base tier (tier-100) |
| `availableTierIds` | `string[]` | all | Limit which tiers are shown |
| `dimensions` | `object` | - | Override default dimensions |

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `variant` | `'A' \| 'B'` | Current variant |
| `setVariant` | `(v) => void` | Set variant |
| `expanded` | `boolean` | Raw expanded state |
| `setExpanded` | `(e) => void` | Set expanded |
| `effectiveExpanded` | `boolean` | Computed (Variant B always true) |
| `selectedTier` | `PricingTier` | Currently selected tier |
| `setSelectedTier` | `(t) => void` | Set selected tier |
| `handleTierSelect` | `(t) => void` | Select tier + auto-collapse |
| `availableTiers` | `PricingTier[]` | Filtered tier list |
| `isVariantA` | `boolean` | Whether current variant is A |
| `dimensions` | `SlotDimensions` | Computed dimensions |

---

### Presets

Pre-configured typography and layout settings for common use cases.

#### `UPGRADE_FLOW_PRESET`

Optimized for upgrade modal flows with pricing selection.

```tsx
import { UPGRADE_FLOW_PRESET } from '@/components/ui/features/pricing-select-menu'

// Structure:
UPGRADE_FLOW_PRESET.dimensions.variantA.triggerHeight  // 88
UPGRADE_FLOW_PRESET.dimensions.variantB.triggerHeight  // 48
UPGRADE_FLOW_PRESET.dimensions.panelWidth              // 320

UPGRADE_FLOW_PRESET.typography.trigger      // TriggerTypographyConfig
UPGRADE_FLOW_PRESET.typography.syncedSubtext // SyncedSubtextConfig
UPGRADE_FLOW_PRESET.typography.items        // ItemTypographyConfig
UPGRADE_FLOW_PRESET.typography.menuItemLabel // MenuItemLabelConfig

UPGRADE_FLOW_PRESET.variantB.trigger  // VariantBTriggerConfig
UPGRADE_FLOW_PRESET.variantB.bottom   // VariantBBottomSlotConfig

UPGRADE_FLOW_PRESET.appearance  // MenuAppearance
```

You can also import individual pieces:

```tsx
import {
  UPGRADE_FLOW_DIMENSIONS,
  UPGRADE_FLOW_TRIGGER_TYPOGRAPHY,
  UPGRADE_FLOW_SYNCED_SUBTEXT,
  UPGRADE_FLOW_ITEM_TYPOGRAPHY,
  UPGRADE_FLOW_MENU_ITEM_LABEL,
  UPGRADE_FLOW_VARIANT_B_TRIGGER,
  UPGRADE_FLOW_VARIANT_B_BOTTOM,
  UPGRADE_FLOW_APPEARANCE,
} from '@/components/ui/features/pricing-select-menu'
```

---

### Compound Components

#### `PricingSelectMenu.Root`

Container that provides context to all children.

```tsx
<PricingSelectMenu.Root
  config={menuConfig}           // Partial<PricingSelectMenuConfig>
  expanded={expanded}           // boolean
  onExpandedChange={setExpanded} // (expanded: boolean) => void
>
  {children}
</PricingSelectMenu.Root>
```

#### `PricingSelectMenu.Backdrop`

Click-away backdrop that closes the menu.

#### `PricingSelectMenu.Content`

Main content container with clip-path animations.

#### `PricingSelectMenu.Trigger`

Clickable trigger area that toggles expanded state.

#### `PricingSelectMenu.TriggerContentA`

Variant A trigger content (expandable dropdown style).

```tsx
<PricingSelectMenu.TriggerContentA
  selectedTier={selectedTier}
  triggerTypography={typography}
  syncedSubtext={syncedSubtext}
  showDropdownIcon={true}
  dropdownIconRotates={true}
  upgradeMode={false}
/>
```

#### `PricingSelectMenu.TriggerContentB`

Variant B trigger content (static card style).

```tsx
<PricingSelectMenu.TriggerContentB
  selectedTier={selectedTier}
  variantBConfig={UPGRADE_FLOW_PRESET.variantB.trigger}
/>
```

#### `PricingSelectMenu.ContentWrapper`

Wrapper for bottom slot with overflow handling.

#### `PricingSelectMenu.BottomSlot`

Container for expandable bottom content.

#### `PricingSelectMenu.OptionsList`

Tier selection list for Variant A.

```tsx
<PricingSelectMenu.OptionsList
  tiers={availableTiers}
  selectedId={selectedTier.id}
  onSelect={handleTierSelect}
  itemTypography={typography}
  menuItemLabel={labelConfig}
  upgradeMode={false}
/>
```

#### `PricingSelectMenu.BottomContentB`

Bottom content for Variant B (shows pricing details).

```tsx
<PricingSelectMenu.BottomContentB
  selectedTier={selectedTier}
  variantBConfig={UPGRADE_FLOW_PRESET.variantB.bottom}
/>
```

#### `PricingSelectMenu.AnimatedSlotContent`

Wrapper for animated A/B variant transitions.

```tsx
<PricingSelectMenu.AnimatedSlotContent
  variantKey={isVariantA ? 'trigger-a' : 'trigger-b'}
  transition={transitionConfig}
>
  {content}
</PricingSelectMenu.AnimatedSlotContent>
```

---

### Utilities

#### `filterAvailableTiers`

Filter tiers based on availability and upgrade mode.

```tsx
import { filterAvailableTiers } from '@/components/ui/features/pricing-select-menu'

const filtered = filterAvailableTiers(allTiers, {
  availableTierIds: ['tier-200', 'tier-300'],
  upgradeMode: true, // excludes tier-100
})
```

#### `toggleTierInList`

Toggle a tier in a list while ensuring at least one remains.

```tsx
import { toggleTierInList } from '@/components/ui/features/pricing-select-menu'

const newList = toggleTierInList(currentTiers, 'tier-200', false)
```

#### `sortTierIds`

Sort tier IDs numerically.

```tsx
import { sortTierIds } from '@/components/ui/features/pricing-select-menu'

sortTierIds(['tier-300', 'tier-100', 'tier-200'])
// => ['tier-100', 'tier-200', 'tier-300']
```

---

## Variant Switching with Animation

For smooth A/B variant transitions, use `AnimatedSlotContent`:

```tsx
import { PricingSelectMenu, AnimatedSlotContent } from '@/components/ui/features/pricing-select-menu'

function AnimatedPricingSelect({ variant, selectedTier, ...props }) {
  const isVariantA = variant === 'A'

  return (
    <PricingSelectMenu.Root {...props}>
      <PricingSelectMenu.Content>
        <PricingSelectMenu.Trigger>
          <AnimatedSlotContent variantKey={isVariantA ? 'trigger-a' : 'trigger-b'}>
            {isVariantA ? (
              <PricingSelectMenu.TriggerContentA selectedTier={selectedTier} {...} />
            ) : (
              <PricingSelectMenu.TriggerContentB selectedTier={selectedTier} {...} />
            )}
          </AnimatedSlotContent>
        </PricingSelectMenu.Trigger>
        {/* ... bottom slot with same pattern */}
      </PricingSelectMenu.Content>
    </PricingSelectMenu.Root>
  )
}
```

**Key points:**
- `selectedTier` persists across variant switches
- `AnimatedSlotContent` handles crossfade animation via Motion/AnimatePresence
- Variant B is always "expanded" (static card display)

---

## PricingTier Type

```tsx
interface PricingTier {
  id: string
  credits: number
  price: number
  label: string
  priceLabel: string
  multiplier: number
  planName: string
  creditsLabel: string
  eventsPerMonth: number
  eventsLabel: string
  planNameShort: string
  priceFormatted: string
  monthlyPrice: number
  recurringText: string
  additionalCredits: number
  additionalCreditsLabel: string
  upgradeFee: number
  upgradeFeeFormatted: string
  upgradeFeeLabel: string
}
```

---

## File Structure

```
pricing-select-menu/
├── index.ts                 # Public API exports
├── README.md                # This file
├── types.ts                 # Type definitions
├── constants.ts             # Default configs
├── context.tsx              # React context
├── pricing-select-menu.tsx  # Root component
├── components/
│   ├── index.ts
│   ├── animated-slot.tsx    # Variant transition animations
│   ├── backdrop.tsx
│   ├── bottom-content-b.tsx
│   ├── bottom-slot.tsx
│   ├── caret-icon.tsx
│   ├── content-layer.tsx
│   ├── content-wrapper.tsx
│   ├── options-list.tsx
│   ├── text-segment.tsx
│   ├── trigger-content.tsx
│   └── trigger-slot.tsx
├── hooks/
│   ├── index.ts
│   └── use-pricing-select.ts  # Production state hook
├── presets/
│   ├── index.ts
│   └── upgrade-flow.ts        # Upgrade modal preset
└── utils/
    ├── index.ts
    ├── clip-path.ts
    ├── deep-merge.ts
    ├── styling.ts
    └── tier-utils.ts          # Tier filtering utilities
```
