/**
 * OrderClawbackTimer Feature Types
 *
 * Feature-level types for the order details clawback timer component.
 */

import type {
  ClawbackTimerSize,
  ClawbackTimerLabelPosition,
  BatteryStyleConfig,
} from '@/components/ui/core/feedback/clawback-timer'

// -----------------------------------------------------------------------------
// Order Data Types
// -----------------------------------------------------------------------------

/**
 * Minimal order data required for the clawback timer.
 * Compatible with InternalRiskActivityItemV2 and similar order types.
 */
export interface OrderClawbackData {
  /** Days until clawback (countdown from 15 days). Null for active clawbacks. */
  daysUntilClawback?: number | null
  /** Whether this contract is currently in clawback status */
  isInClawback?: boolean
  /** Risk category for additional context */
  riskCategory?: 'COLLECTIONS' | 'CLAWBACK_RISK' | 'ACTIVE_CLAWBACK'
}

// -----------------------------------------------------------------------------
// Component Props
// -----------------------------------------------------------------------------

/**
 * Props for the OrderClawbackTimer feature component.
 * Wraps the base ClawbackTimer with order-specific logic.
 */
export interface OrderClawbackTimerProps {
  /**
   * Order data containing clawback information.
   * Can be a full order object or just the required fields.
   */
  order: OrderClawbackData

  /**
   * Size preset for the timer.
   * @default '24' (optimized for table rows)
   */
  size?: ClawbackTimerSize

  /**
   * Whether to show the label.
   * @default true
   */
  showLabel?: boolean

  /**
   * Label position relative to the timer.
   * @default 'left'
   */
  labelPosition?: ClawbackTimerLabelPosition

  /**
   * Custom label to override the default "Xd left" format.
   */
  customLabel?: string

  /**
   * Threshold in days for 100% charge.
   * @default 15
   */
  thresholdDays?: number

  /**
   * Use adaptive colors based on charge level.
   * @default true
   */
  useAdaptiveColor?: boolean

  /**
   * Style overrides for the battery appearance.
   */
  styleConfig?: BatteryStyleConfig

  /**
   * Additional CSS class for the container.
   */
  className?: string

  /**
   * Additional CSS class for the label.
   */
  labelClassName?: string

  /**
   * What to render when order has no clawback data (null/undefined).
   * @default 'dash' - renders "—"
   */
  emptyState?: 'dash' | 'hidden' | 'none'
}
