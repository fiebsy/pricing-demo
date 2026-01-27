/**
 * Edit Questions Playground - Config Types
 *
 * Types for playground configuration and presets.
 *
 * @module playground/edit-questions/types/config
 */

import type { SimulatedResponseType } from './simulation'
import type { RevisionFlowType } from './revision'

/** Modal width options */
export type ModalWidth = 'sm' | 'md' | 'lg' | 'custom'

/** Input field position options */
export type InputPosition = 'above' | 'below'

/** Answer position options (relative to input in detail view) */
export type AnswerPosition = 'above' | 'below'

/**
 * Flat playground configuration for control panel.
 * Each property maps directly to a control.
 */
export interface PlaygroundConfig {
  // -------------------------------------------------------------------------
  // Modal Settings
  // -------------------------------------------------------------------------
  /** Animation duration in ms */
  modalDuration: number
  /** Backdrop opacity (0-100) */
  backdropOpacity: number
  /** Modal width preset */
  modalWidth: ModalWidth
  /** Custom modal width in pixels (used when modalWidth is 'custom') */
  customModalWidth: number

  // -------------------------------------------------------------------------
  // Answer Simulation
  // -------------------------------------------------------------------------
  /** Simulate LLM delay */
  simulateDelay: boolean
  /** Response delay in ms */
  delayMs: number
  /** Which response type to simulate */
  responseType: SimulatedResponseType

  // -------------------------------------------------------------------------
  // Flow Settings
  // -------------------------------------------------------------------------
  /** Number of quick fix questions */
  quickFixCount: number
  /** Default active revision flow */
  defaultRevisionFlow: RevisionFlowType

  // -------------------------------------------------------------------------
  // Layout Settings
  // -------------------------------------------------------------------------
  /** Input field position relative to questions list */
  inputPosition: InputPosition
  /** Answer position relative to input in detail view */
  answerPosition: AnswerPosition
}

/** Preset configuration */
export interface PlaygroundPreset {
  id: string
  name: string
  description: string
  data: Partial<PlaygroundConfig>
}
