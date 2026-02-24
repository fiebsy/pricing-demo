# Arcade Pricing Card Playground

Pixel-perfect replica of the Arcade.software pricing card as a playground component with full UnifiedControlPanel configuration.

## Overview

This playground provides a configurable pricing card that matches the Arcade.software design. It supports multiple pricing tiers, dynamic feature lists, and comprehensive appearance customization.

## File Structure

```
arcade-pricing-card/
├── page.tsx                    # Main playground page
├── config/
│   ├── types.ts               # TypeScript interfaces
│   ├── options.ts             # Control options and ranges
│   └── presets.ts             # Default config + tier presets
├── panels/
│   └── panel-config.ts        # UnifiedControlPanel builder
├── core/
│   ├── arcade-pricing-card.tsx  # Main card component
│   └── icons.tsx              # SVG icons (checkmark, sparkles, info)
└── README.md                  # This file
```

## Design Elements

### Visual Specifications

- **Card**: White background, subtle gray border (#E5E7EB), 24px border radius
- **Badge**: Small pill, light gray background (#F3F4F6), text #374151
- **Title**: 28px, font-weight 600, color #111827
- **Subtitle**: 16px, color #6B7280
- **Price**: 48px, font-weight 700, color #111827
- **Period**: 16px, color #6B7280
- **Features header**: 14px uppercase, color #6B7280
- **Feature text**: 16px, font-weight 500, color #111827
- **Button**: Full width, 14px border-radius, subtle border or filled

### Icons

- **Checkmark**: Standard features, stroke style
- **Sparkles**: AI features, fill style
- **Info Circle**: Tooltip triggers, stroke style

## Configuration

### Plan Section

| Property | Type | Description |
|----------|------|-------------|
| `plan.badge` | string | Badge text (e.g., "For you") |
| `plan.name` | string | Plan name (e.g., "Free") |
| `plan.subtitle` | string | Plan description |
| `plan.showBadge` | boolean | Toggle badge visibility |

### Pricing Section

| Property | Type | Description |
|----------|------|-------------|
| `pricing.amount` | number | Price amount |
| `pricing.period` | string | Billing period (month/year/week) |
| `pricing.currency` | string | Currency symbol ($, €, £, ¥) |

### Features Section

| Property | Type | Description |
|----------|------|-------------|
| `features.header` | string | Section header (e.g., "Includes") |
| `features.items` | array | List of feature items |

Each feature item has:

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Feature name |
| `iconType` | 'checkmark' \| 'sparkles' | Icon type |
| `hasTooltip` | boolean | Show info icon |
| `tooltipText` | string | Tooltip content |

### Button Section

| Property | Type | Description |
|----------|------|-------------|
| `button.text` | string | Button text |
| `button.variant` | 'outline' \| 'filled' | Button style |

### Appearance Section

| Property | Type | Description |
|----------|------|-------------|
| `appearance.borderRadius` | number | Card border radius (px) |
| `appearance.padding` | number | Card padding (px) |
| `appearance.showBorder` | boolean | Toggle card border |
| `appearance.borderColor` | string | Border color |

## Presets

1. **Free Tier** (default) - Matches Arcade's Free plan
2. **Pro Tier** - $29/month with expanded features
3. **Team Tier** - $99/month with team features
4. **Minimal** - Clean card with fewer features
5. **Dense** - Compact variant with more features

## Migration to Production

### Core Component

The `ArcadePricingCard` component in `core/arcade-pricing-card.tsx` is migration-ready. To use in production:

1. Copy `core/arcade-pricing-card.tsx` and `core/icons.tsx`
2. Update import paths
3. Replace inline styles with design tokens where applicable
4. Add click handlers for the CTA button

### Usage Example

```tsx
import { ArcadePricingCard } from './arcade-pricing-card'

const config = {
  plan: {
    badge: 'For you',
    name: 'Free',
    subtitle: 'Try Arcade and feel the storytelling magic.',
    showBadge: true,
  },
  pricing: {
    amount: 0,
    period: 'month',
    currency: '$',
  },
  features: {
    header: 'Includes',
    items: [
      { id: '1', text: '3 published Arcades', iconType: 'checkmark', hasTooltip: false },
      { id: '2', text: 'AI editing', iconType: 'sparkles', hasTooltip: true, tooltipText: 'AI features' },
    ],
  },
  button: {
    text: 'Get started',
    variant: 'outline',
  },
  appearance: {
    borderRadius: 24,
    padding: 24,
    showBorder: true,
    borderColor: '#E5E7EB',
  },
  demo: {
    background: 'secondary',
  },
}

<ArcadePricingCard config={config} />
```

## Development

```bash
# Run development server
pnpm dev

# Navigate to playground
open http://localhost:3000/playground/arcade-pricing-card
```

## Notes

- The card is designed for a fixed width of 320px (matches Arcade)
- Feature icons use `currentColor` for easy theming
- Button variants use hardcoded colors matching Arcade's design
- Tooltips use native `title` attribute (can be upgraded to proper tooltip component)
