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

/** Hierarchical state identifiers for modal integration */
export type ButtonStateId = 'A' | 'B1' | 'B2' | 'C1' | 'C2'

/** Phase groupings for state transitions */
export type ButtonPhase = 'A' | 'B' | 'C'

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
  activeState: ButtonStateId
  states: {
    stateA: ButtonStateConfig
    stateB1: ButtonStateConfig
    stateB2: ButtonStateConfig
    stateC1: ButtonStateConfig
    stateC2: ButtonStateConfig
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
// Auto Transition Configuration
// ============================================================================

/** Automatic transition configuration for state flow */
export interface AutoTransitionConfig {
  /** Enable automatic transitions for B2 → C1 and C1 → C2 */
  enabled: boolean
  /** Delay in ms before transitioning from B2 to C1 (processing simulation) */
  b2ToC1Delay: number
  /** Delay in ms before transitioning from C1 to C2 (success display) */
  c1ToC2Delay: number
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
  autoTransition: AutoTransitionConfig
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
