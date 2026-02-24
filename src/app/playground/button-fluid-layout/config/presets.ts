/**
 * Button Fluid Layout Presets
 *
 * Uses FluidButtonGroup's built-in timing presets.
 */

import type {
  AutoTransitionConfig,
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
  activeState: 'A',
  states: {
    stateA: { id: 'upgrade-alone', text: 'Upgrade', showSpinner: false, showCheckmark: false, showText: true, showLeftButton: false },
    stateB1: { id: 'upgrade', text: 'Upgrade', showSpinner: false, showCheckmark: false, showText: true, showLeftButton: true },
    stateB2: { id: 'upgrading', text: 'Upgrading', showSpinner: true, showCheckmark: false, showText: true, showLeftButton: true },
    stateC1: { id: 'completed', text: '', showSpinner: false, showCheckmark: true, showText: false, showLeftButton: false },
    stateC2: { id: 'start-creating', text: "Let's create", showSpinner: false, showCheckmark: false, showText: true, showLeftButton: false },
  },
}

export const DEFAULT_STATE_TRANSITION: StateTransitionConfig = {
  textSlideDuration: 200,
  textSlideEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  spinnerToCheckmarkDuration: 300,
  checkmarkDrawDuration: 250,
  checkmarkEntranceStyle: 'flip',
}

export const DEFAULT_AUTO_TRANSITION: AutoTransitionConfig = {
  enabled: true,
  b2ToC1Delay: 3100,
  c1ToC2Delay: 1300,
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
    leftButtonVariant: 'secondary',
    rightButtonVariant: 'primary',
  },
  demo: {
    slowMo: false,
    showDebug: false,
  },
  buttonStates: DEFAULT_BUTTON_STATES,
  stateTransition: DEFAULT_STATE_TRANSITION,
  autoTransition: DEFAULT_AUTO_TRANSITION,
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
