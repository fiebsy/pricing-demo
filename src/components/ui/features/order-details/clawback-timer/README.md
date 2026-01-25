# OrderClawbackTimer Feature Component

## Migration Status: Complete

Feature-level ClawbackTimer component for use in order details contexts.

## Installation

```tsx
import { OrderClawbackTimer } from '@/modules/design-system/v2/components/ui/prod/features/order-details/clawback-timer'
```

## Usage

### Basic Usage

```tsx
// In an order details table
<OrderClawbackTimer order={order} size="24" />
```

### With Custom Options

```tsx
<OrderClawbackTimer
  order={order}
  size="32"
  labelPosition="right"
  emptyState="hidden"
/>
```

### Using the Hook Directly

```tsx
import { useClawbackDays } from '@/modules/design-system/v2/components/ui/prod/features/order-details/clawback-timer'

const { daysUntilClawback, isInClawback, shouldShowTimer } = useClawbackDays(order)
```

## Component Structure

```
clawback-timer/
├── index.ts                    # Public exports
├── order-clawback-timer.tsx    # Feature component
├── types.ts                    # Feature-specific types
├── hooks/
│   └── use-clawback-days.ts    # Order data extraction hook
└── README.md                   # This file
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `order` | `OrderClawbackData` | required | Order data with clawback info |
| `size` | `'16' \| '24' \| '32' \| '40' \| '64'` | `'24'` | Size preset |
| `showLabel` | `boolean` | `true` | Show label text |
| `labelPosition` | `'left' \| 'right' \| 'none'` | `'left'` | Label position |
| `customLabel` | `string` | - | Override default label |
| `thresholdDays` | `number` | `15` | Days for 100% charge |
| `useAdaptiveColor` | `boolean` | `true` | Color based on charge level |
| `styleConfig` | `BatteryStyleConfig` | - | Style overrides |
| `className` | `string` | - | Container class |
| `labelClassName` | `string` | - | Label class |
| `emptyState` | `'dash' \| 'hidden' \| 'none'` | `'dash'` | Empty state behavior |

## Order Data Interface

The component accepts any object matching `OrderClawbackData`:

```typescript
interface OrderClawbackData {
  daysUntilClawback?: number | null
  isInClawback?: boolean
  riskCategory?: 'COLLECTIONS' | 'CLAWBACK_RISK' | 'ACTIVE_CLAWBACK'
}
```

Compatible with:
- `InternalRiskActivityItemV2`
- `ActiveOrderItemV2` (when clawback fields are added)
- Any custom order object with the required fields

## Behavior

### Display States

1. **Countdown** - Shows battery with days remaining
2. **Clawback** - Shows empty battery with "Clawback" label
3. **None** - Shows dash (or nothing if `emptyState="hidden"`)

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| `daysUntilClawback: 9` | Shows "9d left" with countdown |
| `daysUntilClawback: 0` | Shows empty battery, clawback state |
| `daysUntilClawback: null` + `isInClawback: true` | Shows "Clawback" label |
| `daysUntilClawback: null` + `isInClawback: false` | Shows dash or hidden |

## Base Component

The underlying base component is located at:

```
design-system/v2/components/ui/prod/base/clawback-timer/
```

See base component for:
- Size configurations
- Color thresholds
- Battery styling options

## Playground

Validate the base component at:

```
/playground/ui/component/clawback-timer
```
