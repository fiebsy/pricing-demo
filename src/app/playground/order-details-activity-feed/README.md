# Order Details Activity Feed Playground

## Status
- [x] Incubating
- [ ] Production Ready

## Overview
Activity feed component for displaying order details, payment history, and transaction status. Supports three main variants:
- **Minimal**: Info tab only, no summary card, simplified display
- **Default**: Standard with all tabs and summary card  
- **Large**: Enhanced version with larger typography

## Files
| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/order-details-feed.tsx` | Core component | Yes |
| `config/types.ts` | Type definitions | Yes |
| `config/presets.ts` | Preset definitions | Yes (as variants) |
| `config/options.ts` | Control options | No |
| `panels/panel-config.ts` | Panel config | No |
| `utils/class-builders.ts` | Style mapping | Yes |
| `components/info-card.tsx` | Info tab content | Yes |
| `components/payment-activity-feed.tsx` | Activity feed | Yes |
| `components/ui-components.tsx` | UI helpers | Refactor to use core |

## Migration Target
`src/components/ui/features/order-details-feed`

## Key Features
- **Configurable Tabs**: Show/hide activity, payouts, and info tabs
- **Summary Card**: Optional large message display with gradient effects
- **Responsive Typography**: Adjustable text sizes for different contexts
- **Flexible Layout**: Multiple spacing and width options
- **Shine & Depth Effects**: Full integration with design system effects
- **Core Primitives**: Uses Badge, Button, and Icon from core components

## Presets

### Minimal
- Info tab only
- No summary card
- Compact spacing
- Simplified header

### Default  
- All three tabs
- Summary card with gradient
- Standard spacing
- Full metrics display

### Large
- Enhanced typography
- Larger summary card
- Spacious layout
- All features enabled

### Brand Elevated
- Premium effects
- Brand colors
- Shine and depth
- Squircle corners

### Activity Focused
- Activity/payouts only
- No summary card
- Streamlined display

## Migration Checklist
- [ ] Component finalized in playground
- [ ] All presets documented
- [ ] Copy core files to production location
- [ ] Create production variants from presets
- [ ] Refactor to use only core primitives
- [ ] Add to component exports
- [ ] Update all imports to use core Badge, Button, Icon
- [ ] Test in production environment
- [ ] Delete playground files

## Component Dependencies
- `@/components/ui/core/primitives/badge`
- `@/components/ui/core/primitives/icon`
- `@/components/ui/core/primitives/button` (future)
- `@/components/ui/core/primitives/biaxial-expand` (future)

## Usage Example (Post-Migration)
```typescript
import { OrderDetailsFeed } from '@/components/ui/features/order-details-feed'

<OrderDetailsFeed
  variant="minimal"
  contract={contractData}
  config={{
    tabs: {
      visibleTabs: ['info'],
      defaultTab: 'info',
    },
    header: {
      showMetrics: false,
    },
  }}
/>
```

## Notes
- Currently uses some deprecated components that need refactoring
- PayProgressCircle needs to be moved to core primitives  
- Avatar component should use new core implementation
- Mock data (MOCK_CONTRACT, payments) will be removed in production