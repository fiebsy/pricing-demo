/**
 * ClawbackTimer Component Types
 *
 * A lightweight battery indicator for displaying clawback countdown status.
 * Uses pure CSS for optimal rendering performance in table rows.
 */

// -----------------------------------------------------------------------------
// Size Types
// -----------------------------------------------------------------------------

/** Available size presets (container dimensions in pixels) */
export type ClawbackTimerSize = '16' | '24' | '32' | '40' | '64'

/** Label position relative to the timer */
export type ClawbackTimerLabelPosition = 'left' | 'right' | 'none'

/** Color state based on charge level */
export type ClawbackTimerColorState = 'error' | 'warning' | 'success'

/** Corner style for the battery shape */
export type CornerStyle = 'rounded' | 'squircle'

// -----------------------------------------------------------------------------
// Configuration Types
// -----------------------------------------------------------------------------

/** Size configuration for each preset */
export interface ClawbackTimerSizeConfig {
  /** Container size in pixels */
  containerSize: number
  /** Battery body width */
  bodyWidth: number
  /** Battery body height */
  bodyHeight: number
  /** Border radius for rounded corners */
  borderRadius: number
  /** Terminal (positive end) width */
  terminalWidth: number
  /** Terminal height */
  terminalHeight: number
  /** Terminal corner radius */
  terminalRadius: number
  /** Gap between body and terminal */
  terminalGap: number
  /** Fill inset from body edge (padding) */
  fillInset: number
  /** Label text size class */
  labelSize: string
  /** Gap between label and timer */
  labelGap: number
}

/** Label font weight options */
export type LabelWeight = 'normal' | 'medium' | 'semibold' | 'bold'

/**
 * Style overrides for the battery component.
 * All values are optional - defaults come from SIZE_CONFIGS.
 */
export interface BatteryStyleConfig {
  /** Corner style: 'rounded' (CSS border-radius) or 'squircle' (superellipse) */
  cornerStyle?: CornerStyle
  /** Battery body width (px) */
  bodyWidth?: number
  /** Battery body height (px) */
  bodyHeight?: number
  /** Border radius for body corners (px) */
  borderRadius?: number
  /** Fill inset/padding from body edge (px) */
  fillInset?: number
  /** Terminal width (px) - when terminalScale is set, this is the base value */
  terminalWidth?: number
  /** Terminal height (px) - when terminalScale is set, this is the base value */
  terminalHeight?: number
  /** Terminal corner radius (px) - when terminalScale is set, this is the base value */
  terminalRadius?: number
  /**
   * Terminal scale ratio (0.5 - 2.0).
   * Multiplies all terminal dimensions proportionally.
   * Useful for maintaining proportions when changing sizes.
   * @default 1.0
   */
  terminalScale?: number
  /** Label font weight */
  labelWeight?: LabelWeight
}

// -----------------------------------------------------------------------------
// Component Props
// -----------------------------------------------------------------------------

/** Props for the ClawbackTimer component */
export interface ClawbackTimerProps {
  /**
   * Days remaining until clawback (0-15 range typically).
   * Used to calculate battery charge level.
   * If null/undefined, shows empty state (dash).
   */
  daysUntilClawback?: number | null

  /**
   * Size preset for the timer container.
   * @default '32'
   */
  size?: ClawbackTimerSize

  /**
   * Whether to show a label.
   * @default true
   */
  showLabel?: boolean

  /**
   * Label position relative to the timer.
   * @default 'left'
   */
  labelPosition?: ClawbackTimerLabelPosition

  /**
   * Custom label text (overrides default "Xd left" text).
   * Only applies when showLabel is true.
   */
  customLabel?: string

  /**
   * Threshold in days for 100% charge.
   * @default 15
   */
  thresholdDays?: number

  /**
   * Use adaptive colors based on charge level.
   * - error (red): <33%
   * - warning (orange): 33-66%
   * - success (orange): >66%
   * @default true
   */
  useAdaptiveColor?: boolean

  /**
   * Style overrides for fine-tuning the battery appearance.
   * Overrides values from the size preset.
   */
  styleConfig?: BatteryStyleConfig

  /**
   * Additional CSS class name for the container.
   */
  className?: string

  /**
   * Additional CSS class for the label text.
   */
  labelClassName?: string
}

/** Props for the internal Battery component */
export interface BatteryProps {
  /** Charge level 0-100 */
  chargeLevel: number
  /** Size preset */
  size?: ClawbackTimerSize
  /** Optional label text */
  label?: string
  /** Label position */
  labelPosition?: ClawbackTimerLabelPosition
  /** Use adaptive color based on charge level */
  useAdaptiveColor?: boolean
  /** Style overrides */
  styleConfig?: BatteryStyleConfig
  /** Additional className */
  className?: string
  /** Additional label className */
  labelClassName?: string
}
