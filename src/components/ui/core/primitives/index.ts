/**
 * Core Primitives
 * ================
 * Stable, hardened UI primitives that are production-ready.
 */

// Icon
export { HugeIcon, Icon } from './icon'
export type { HugeIconData, IconSize } from './icon'

// Button
export * from './button'

// Fluid Button Group
export { FluidButtonGroup, TIMING_PRESETS, DEFAULT_GAP, DEFAULT_BLUR_CONFIG } from './fluid-button-group'
export type {
  FluidButtonGroupProps,
  FluidTiming,
  FluidTimingPreset,
  FluidBlurConfig,
} from './fluid-button-group'
