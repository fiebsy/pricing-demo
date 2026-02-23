# Modal V2 Playground

Simplified modal playground with clean stage-based transitions.

## Overview

This is a refactored version of the modal playground with:

- **~200 lines of types** (instead of 700+)
- **Flat stage definitions** (no deep nesting)
- **Direct stage-to-component mapping** (no ContentSlot switch)
- **Centralized defaults** (all in `defaults.ts`)
- **Reduced prop drilling**

## Directory Structure

```
modal-v2/
├── page.tsx                    # Page component with state management
├── README.md                   # This file
├── config/
│   ├── types.ts               # Simplified type definitions
│   ├── stages.ts              # 5-stage definitions
│   ├── defaults.ts            # Centralized default values
│   └── presets.ts             # Preset variations
├── core/
│   ├── modal-v2.tsx           # Main modal composition
│   ├── modal-header.tsx       # Header: asset + title + subtext
│   ├── modal-content.tsx      # Content router (pricing/success)
│   ├── modal-footer.tsx       # Button section with FluidButtonGroup
│   ├── pricing-content.tsx    # PricingSelectMenu wrapper
│   ├── success-content.tsx    # ProCard wrapper
│   ├── crossfade-text.tsx     # Text animation component
│   ├── asset-renderer.tsx     # Coin-stack/placeholder renderer
│   ├── pro-card.tsx           # Pro badge component
│   └── pricing-tiers.ts       # Tier data
├── components/
│   └── stage-controls.tsx     # Stage navigation UI
├── panels/
│   └── panel-config.ts        # Control panel configuration
└── utils/
    └── styles.ts              # Style helper utilities
```

## 5-Phase Flow

| Stage | Label      | Content Type | Description                    |
| ----- | ---------- | ------------ | ------------------------------ |
| 1     | Upgrade    | pricing (A)  | Expandable tier dropdown       |
| 2     | Review     | pricing (B)  | Static card showing selection  |
| 3     | Processing | pricing (B)  | Loading state with spinner     |
| 4     | Success    | success      | Checkmark only                 |
| 5     | Complete   | success      | "Let's create" call to action  |

## Key Simplifications

### Types

Before: 18 interfaces, deep nesting, 700+ lines
After: ~6 flat interfaces, ~200 lines

```typescript
// Stage definition - flat and explicit
export interface Stage {
  id: StageId
  label: string
  header: {
    title: string
    subtext?: string
    assetStateId?: CoinStackStateId
  }
  content: {
    type: 'pricing' | 'success'
    pricingVariant?: 'A' | 'B'
  }
  buttons: {
    primary: { text: string; loading?: boolean; checkmark?: boolean; showText?: boolean }
    secondary?: { text: string } | null
  }
}
```

### Content Routing

Before: 5-way switch statement in ContentSlot
After: Direct type check in ModalContent

```typescript
{type === 'pricing' && <PricingContent ... />}
{type === 'success' && <SuccessContent ... />}
```

### Configuration

Before: Inline defaults scattered across components
After: All defaults in `config/defaults.ts`

## Usage

1. Navigate to `/playground/modal-v2`
2. Use stage controls (1-5 buttons) to navigate stages
3. Adjust settings in the control panel
4. Select presets to reset to predefined configurations

## Extending

### Add a new stage

1. Add to `config/stages.ts` STAGES array
2. Update `config/types.ts` StageId type if needed
3. Add handling in content components if new content type

### Add a new content type

1. Add type to `config/types.ts` ContentType
2. Create component in `core/`
3. Add routing in `core/modal-content.tsx`

### Add control panel options

1. Add property to config type in `config/types.ts`
2. Add default in `config/defaults.ts`
3. Add control in `panels/panel-config.ts`
