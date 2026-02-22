/**
 * Button Fluid Layout Presets
 *
 * Uses FluidButtonGroup's built-in timing presets.
 */

import type {
  ButtonFluidLayoutConfig,
  ButtonFluidLayoutPresetMeta,
  ButtonStateMachineConfig,
  StateTransitionConfig,
} from './types'
import { TIMING_PRESETS } from '@/components/ui/core/primitives/fluid-button-group/constants'

// ============================================================================
// Button State Defaults
// ============================================================================

export const DEFAULT_BUTTON_STATES: ButtonStateMachineConfig = {
  activeState: 1,
  states: {
    state1: { id: 'upgrade', text: 'Upgrade', showSpinner: false, showCheckmark: false, showText: true, showLeftButton: true },
    state2: { id: 'upgrading', text: 'Upgrading', showSpinner: true, showCheckmark: false, showText: true, showLeftButton: true },
    state3: { id: 'completed', text: '', showSpinner: false, showCheckmark: true, showText: false, showLeftButton: false },
    state4: { id: 'start-creating', text: 'Start creating', showSpinner: false, showCheckmark: false, showText: true, showLeftButton: false },
  },
}

export const DEFAULT_STATE_TRANSITION: StateTransitionConfig = {
  textSlideDuration: 200,
  textSlideEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  spinnerToCheckmarkDuration: 300,
  checkmarkDrawDuration: 250,
  checkmarkEntranceStyle: 'flip',
}

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG: ButtonFluidLayoutConfig = {
  timing: {
    preset: 'default',
    custom: TIMING_PRESETS.default,
    syncToExpand: true,
  },
  blur: {
    enabled: false,
    amount: 2,
    duration: 120,
  },
  layout: {
    containerWidth: 400,
    gap: 8,
    buttonVariant: 'secondary',
  },
  demo: {
    slowMo: false,
    showDebug: false,
  },
  buttonStates: DEFAULT_BUTTON_STATES,
  stateTransition: DEFAULT_STATE_TRANSITION,
}

// ============================================================================
// Presets
// ============================================================================

export const BUTTON_FLUID_LAYOUT_PRESETS: ButtonFluidLayoutPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Balanced timing that feels natural',
    data: DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG,
  },
  {
    id: 'snappy',
    name: 'Snappy',
    description: 'Quick, responsive feel for immediate feedback',
    data: {
      ...DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG,
      timing: {
        preset: 'snappy',
        custom: TIMING_PRESETS.snappy,
        syncToExpand: true,
      },
    },
  },
  {
    id: 'smooth',
    name: 'Smooth',
    description: 'Slower, deliberate transitions for emphasis',
    data: {
      ...DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG,
      timing: {
        preset: 'smooth',
        custom: TIMING_PRESETS.smooth,
        syncToExpand: true,
      },
    },
  },
  {
    id: 'no-blur',
    name: 'No Blur',
    description: 'Default timing without exit blur effect',
    data: {
      ...DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG,
      blur: {
        enabled: false,
        amount: 0,
        duration: 0,
      },
    },
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Fine-tune all timing parameters',
    data: {
      ...DEFAULT_BUTTON_FLUID_LAYOUT_CONFIG,
      timing: {
        preset: 'custom',
        custom: TIMING_PRESETS.default,
        syncToExpand: true,
      },
    },
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getPresetById = (id: string): ButtonFluidLayoutPresetMeta | undefined =>
  BUTTON_FLUID_LAYOUT_PRESETS.find((p) => p.id === id)
