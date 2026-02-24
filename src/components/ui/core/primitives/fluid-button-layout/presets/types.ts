/**
 * Fluid Button Layout Preset Types
 *
 * @status stable
 */

import type { FluidTiming, FluidTimingPreset, StateTransitionConfig, AutoTransitionConfig } from '../types'

/** Complete preset configuration for fluid button layouts */
export interface FluidButtonLayoutPreset {
  /** Timing preset name or custom timing values */
  timing: FluidTimingPreset | FluidTiming
  /** Auto-transition configuration */
  autoTransition: AutoTransitionConfig
  /** State transition animation configuration */
  stateTransition: StateTransitionConfig
}
