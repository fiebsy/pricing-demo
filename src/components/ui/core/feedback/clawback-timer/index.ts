/**
 * ClawbackTimer - Public API
 *
 * A lightweight battery indicator for displaying clawback countdown status.
 */

// Main component
export { ClawbackTimer } from './clawback-timer'

// Internal component (for advanced use)
export { Battery } from './battery'

// Types
export type {
  ClawbackTimerProps,
  ClawbackTimerSize,
  ClawbackTimerLabelPosition,
  ClawbackTimerColorState,
  ClawbackTimerSizeConfig,
  BatteryStyleConfig,
  BatteryProps,
  CornerStyle,
  LabelWeight,
} from './types'

// Configuration
export {
  SIZE_CONFIGS,
  COLOR_THRESHOLDS,
  FILL_COLORS,
  BORDER_COLORS,
  LABEL_CLASSES,
  DEFAULT_THRESHOLD_DAYS,
  DEFAULT_SIZE,
} from './config'

// Utilities
export { calculateChargeLevel, formatBatteryLabel, getColorState } from './utils'
