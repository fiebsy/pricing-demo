/**
 * Fluid Button Group Types
 *
 * A simplified API for fluid button layout animations.
 * Production-ready extraction from button-fluid-layout playground.
 */

import type { ReactNode } from 'react'

// ============================================================================
// Timing Types
// ============================================================================

/**
 * Custom timing configuration for fine-grained control.
 * All durations are in milliseconds.
 */
export interface FluidTiming {
  /** Duration for collapsing button (ms) */
  collapseDuration: number
  /** Duration for expanding button (ms) */
  expandDuration: number
  /** Duration for showing both buttons (ms) */
  showBothDuration: number
  /** CSS easing function for collapse */
  collapseEasing: string
  /** CSS easing function for expand */
  expandEasing: string
  /** Delay before expansion starts (ms) */
  expandDelay?: number
}

/**
 * Preset timing configurations.
 * - default: Balanced timing (250ms collapse, 525ms expand)
 * - snappy: Quick, responsive feel (150ms collapse, 300ms expand)
 * - smooth: Slower, more deliberate (400ms collapse, 700ms expand)
 */
export type FluidTimingPreset = 'default' | 'snappy' | 'smooth'

// ============================================================================
// Blur Configuration
// ============================================================================

export interface FluidBlurConfig {
  /** Enable blur effect on exiting content */
  enabled: boolean
  /** Blur amount in pixels */
  amount?: number
  /** Blur transition duration (ms) */
  duration?: number
}

// ============================================================================
// Component Props
// ============================================================================

export interface FluidButtonGroupProps {
  /**
   * Which button(s) to show.
   * - 'both': Show primary and secondary buttons at 50% width each
   * - 'primary': Show only primary button at 100% width
   * - 'secondary': Show only secondary button at 100% width
   */
  visible: 'both' | 'primary' | 'secondary'

  /**
   * The primary (right) button content.
   * Typically a Button component.
   */
  primaryButton: ReactNode

  /**
   * The secondary (left) button content.
   * Optional - if not provided, 'both' visibility will behave like 'primary'.
   */
  secondaryButton?: ReactNode

  /**
   * Animation timing preset or custom configuration.
   * @default 'default'
   */
  timing?: FluidTimingPreset | FluidTiming

  /**
   * Gap between buttons in pixels.
   * @default 8
   */
  gap?: number

  /**
   * When true, the collapsing button's exit timing syncs to the expanding
   * button's duration for a more unified animation feel.
   * @default true
   */
  syncToExpand?: boolean

  /**
   * Enable blur effect on the exiting button's content.
   * Can be a boolean for default blur, or a config object for fine control.
   * @default false
   */
  exitBlur?: boolean | FluidBlurConfig

  /**
   * Additional CSS classes for the container.
   */
  className?: string

  /**
   * Callback fired when any button transition ends.
   * Useful for coordinating with modal state changes.
   */
  onTransitionEnd?: () => void

  /**
   * Slow motion multiplier for debugging (5x slower).
   * Only use in development/playground contexts.
   * @default false
   */
  slowMo?: boolean
}
