/**
 * Button Fluid Layout Configuration Types
 *
 * Uses the production FluidButtonGroup component API.
 *
 * @status incubating
 */

import type { FluidTiming, FluidTimingPreset, FluidBlurConfig } from '@/components/ui/core/primitives/fluid-button-group/types'

// Re-export for convenience
export type { FluidTiming, FluidTimingPreset, FluidBlurConfig }

// ============================================================================
// Button State Configuration
// ============================================================================

/** Checkmark entrance animation style */
export type CheckmarkEntranceStyle = 'draw' | 'flip'

/** Individual state configuration for the right button */
export interface ButtonStateConfig {
  id: string
  text: string
  showSpinner: boolean
  showCheckmark: boolean
  showText: boolean
  showLeftButton: boolean
}

/** State machine configuration for multi-state button */
export interface ButtonStateMachineConfig {
  activeState: 1 | 2 | 3 | 4
  states: {
    state1: ButtonStateConfig
    state2: ButtonStateConfig
    state3: ButtonStateConfig
    state4: ButtonStateConfig
  }
}

/** Animation timing for state transitions */
export interface StateTransitionConfig {
  textSlideDuration: number
  textSlideEasing: string
  spinnerToCheckmarkDuration: number
  checkmarkDrawDuration: number
  checkmarkEntranceStyle: CheckmarkEntranceStyle
}

// ============================================================================
// Timing Configuration
// ============================================================================

export interface TimingConfig {
  /** Use a preset or 'custom' for manual control */
  preset: FluidTimingPreset | 'custom'
  /** Custom timing values (used when preset is 'custom') */
  custom: FluidTiming
  /** Sync collapse to expand timing */
  syncToExpand: boolean
}

// ============================================================================
// Blur Configuration
// ============================================================================

export interface BlurConfig {
  /** Enable exit blur effect */
  enabled: boolean
  /** Blur amount in pixels */
  amount: number
  /** Blur duration in milliseconds */
  duration: number
}

// ============================================================================
// Layout Configuration
// ============================================================================

export interface LayoutConfig {
  /** Container width in pixels */
  containerWidth: number
  /** Gap between buttons in pixels */
  gap: number
  /** Left button visual variant */
  leftButtonVariant: 'primary' | 'secondary' | 'tertiary'
  /** Right button visual variant */
  rightButtonVariant: 'primary' | 'secondary' | 'tertiary'
}

// ============================================================================
// Demo Configuration
// ============================================================================

export interface DemoConfig {
  /** Enable slow motion (5x slower animations) */
  slowMo: boolean
  /** Show debug outlines */
  showDebug: boolean
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface ButtonFluidLayoutConfig {
  timing: TimingConfig
  blur: BlurConfig
  layout: LayoutConfig
  demo: DemoConfig
  buttonStates: ButtonStateMachineConfig
  stateTransition: StateTransitionConfig
}

// ============================================================================
// Preset Types
// ============================================================================

export interface ButtonFluidLayoutPresetMeta {
  id: string
  name: string
  description?: string
  data: ButtonFluidLayoutConfig
}
