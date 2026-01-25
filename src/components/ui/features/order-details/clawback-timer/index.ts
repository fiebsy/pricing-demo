/**
 * OrderClawbackTimer Feature - Public API
 *
 * Feature-level component for displaying clawback timers in order detail contexts.
 * Wraps the base ClawbackTimer with order-specific business logic.
 */

// Main component
export { OrderClawbackTimer } from './order-clawback-timer'

// Hooks
export { useClawbackDays } from './hooks/use-clawback-days'
export type { ClawbackDaysResult } from './hooks/use-clawback-days'

// Types
export type { OrderClawbackTimerProps, OrderClawbackData } from './types'

// Re-export base types for convenience
export type {
  ClawbackTimerSize,
  ClawbackTimerLabelPosition,
  BatteryStyleConfig,
  LabelWeight,
  CornerStyle,
} from '@/components/ui/core/feedback/clawback-timer'
