/**
 * Modal Adapter
 *
 * Adapts modal stage configurations to button state machine format.
 * Provides utilities for deriving fluid timing from master duration.
 *
 * @status stable
 */

import type { ButtonStateId, ButtonState, StateTransitionConfig, FluidTiming } from '../types'
import { getButtonState } from '../state-machine'

// ============================================================================
// Stage to State Mapping
// ============================================================================

/**
 * Default mapping from modal stage IDs (1-5) to button state IDs.
 *
 * Stage 1 (Pricing Select) → A (single button, "Upgrade")
 * Stage 2 (Review)         → B1 (two buttons, "Back" + "Upgrade")
 * Stage 3 (Processing)     → B2 (two buttons, "Back" + "Upgrading" with spinner)
 * Stage 4 (Success)        → C1 (single button, checkmark only)
 * Stage 5 (Complete)       → C2 (single button, "Let's create")
 */
export const DEFAULT_STAGE_TO_STATE_MAP: Record<number, ButtonStateId> = {
  1: 'A',
  2: 'B1',
  3: 'B2',
  4: 'C1',
  5: 'C2',
}

/**
 * Maps a modal stage ID to a button state ID.
 */
export function stageToStateId(
  stageId: number,
  mapping: Record<number, ButtonStateId> = DEFAULT_STAGE_TO_STATE_MAP
): ButtonStateId {
  return mapping[stageId] ?? 'A'
}

// ============================================================================
// Stage Button Config Adapter
// ============================================================================

/**
 * Modal's per-stage button config format.
 * This matches the StageButtonConfig type from modal/config/types.ts
 */
export interface ModalStageButtonConfig {
  primary: {
    text: string
    showSpinner: boolean
    showCheckmark: boolean
    showText: boolean
  }
  secondary: string | null
}

/**
 * Converts modal's StageButtonConfig to a ButtonState.
 * The state ID determines whether secondary button is shown.
 *
 * @param config - Modal's per-stage button configuration
 * @param stateId - The button state ID (determines showSecondary)
 * @returns Complete ButtonState with derived visibility
 */
export function stageButtonConfigToState(
  config: ModalStageButtonConfig,
  stateId: ButtonStateId
): ButtonState {
  // Get base state (for showSecondary derivation)
  const baseState = getButtonState(stateId)

  return {
    id: `stage-${stateId}`,
    text: config.primary.text,
    showSpinner: config.primary.showSpinner,
    showCheckmark: config.primary.showCheckmark,
    showText: config.primary.showText,
    showSecondary: baseState.showSecondary,
    stateId,
  }
}

// ============================================================================
// Fluid Timing Derivation
// ============================================================================

/**
 * Derives fluid button timing from modal master duration.
 * Maps the master duration (seconds) to fluid timing (milliseconds)
 * while keeping existing ease-out easing curves.
 *
 * Timing ratios:
 * - Collapse: 40% of master (fast exit)
 * - Expand: 85% of master (slower fill)
 * - Show both: 50% of master
 *
 * @param masterDuration - Modal's master duration in seconds (0.15-0.8)
 * @returns FluidTiming config in milliseconds
 */
export function deriveFluidTimingFromMaster(masterDuration: number): FluidTiming {
  // Master duration is in seconds (0.15-0.8), fluid expects milliseconds
  const baseDuration = masterDuration * 1000

  return {
    collapseDuration: baseDuration * 0.4,    // Fast exit (40% of master)
    expandDuration: baseDuration * 0.85,     // Slower expand (85% of master)
    showBothDuration: baseDuration * 0.5,    // Mid-range for both
    collapseEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',  // Keep existing ease-out
    expandEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    expandDelay: 0,
  }
}

// ============================================================================
// State Transition Config Builder
// ============================================================================

/**
 * Modal's fluid button config format.
 * This matches FluidButtonConfig from modal/config/types.ts
 */
export interface ModalFluidButtonConfig {
  checkmarkStyle: 'draw' | 'flip'
  textSlideDuration: number
  checkmarkDrawDuration: number
}

/**
 * Builds a StateTransitionConfig from modal's fluid button config.
 */
export function buildStateTransitionConfig(
  fluidConfig: ModalFluidButtonConfig
): StateTransitionConfig {
  return {
    textSlideDuration: fluidConfig.textSlideDuration,
    textSlideEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    spinnerToCheckmarkDuration: 200,
    checkmarkDrawDuration: fluidConfig.checkmarkDrawDuration,
    checkmarkEntranceStyle: fluidConfig.checkmarkStyle,
  }
}

// ============================================================================
// Visibility Helper
// ============================================================================

/**
 * Determines FluidButtonGroup visibility from stage button config.
 * Uses the secondary field presence to determine visibility.
 */
export function getFluidVisibility(
  stageButtons: ModalStageButtonConfig
): 'both' | 'primary' {
  return stageButtons.secondary !== null ? 'both' : 'primary'
}
