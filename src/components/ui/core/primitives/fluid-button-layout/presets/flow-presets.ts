/**
 * Fluid Button Layout Flow Presets
 *
 * Pre-configured presets for common button flow scenarios.
 *
 * @status stable
 */

import { DEFAULT_AUTO_TRANSITION, DEFAULT_STATE_TRANSITION } from '../constants'
import type { FluidButtonLayoutPreset } from './types'

/**
 * Standard pricing flow preset.
 * Default timing with auto-transitions enabled.
 * Use for typical upgrade/purchase flows.
 */
export const PRICING_FLOW_PRESET: FluidButtonLayoutPreset = {
  timing: 'default',
  autoTransition: DEFAULT_AUTO_TRANSITION,
  stateTransition: DEFAULT_STATE_TRANSITION,
}

/**
 * Quick flow preset with faster transitions.
 * Snappy timing for responsive UI.
 * Use when processing is fast or for demos.
 */
export const QUICK_FLOW_PRESET: FluidButtonLayoutPreset = {
  timing: 'snappy',
  autoTransition: {
    enabled: true,
    b2ToC1Delay: 2000,
    c1ToC2Delay: 800,
  },
  stateTransition: DEFAULT_STATE_TRANSITION,
}

/**
 * Modal sync preset with manual control.
 * Auto-transitions disabled for parent-controlled state.
 * Use when modal state drives button state.
 */
export const MODAL_SYNC_PRESET: FluidButtonLayoutPreset = {
  timing: 'default',
  autoTransition: {
    enabled: false,
    b2ToC1Delay: 0,
    c1ToC2Delay: 0,
  },
  stateTransition: DEFAULT_STATE_TRANSITION,
}
