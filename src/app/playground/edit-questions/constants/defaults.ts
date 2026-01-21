/**
 * Edit Questions Playground - Default Values
 *
 * Default configuration values for the playground.
 *
 * @module playground/edit-questions/constants
 */

import type { PlaygroundConfig, SimulatedResponse, SimulatedResponseType } from '../types'

/**
 * Default playground configuration.
 */
export const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  // Modal Settings
  modalDuration: 200,
  backdropOpacity: 50,
  modalWidth: 'sm',
  customModalWidth: 480,

  // Answer Simulation
  simulateDelay: true,
  delayMs: 1500,
  responseType: 'good',

  // Flow Settings
  quickFixCount: 10,
  defaultRevisionFlow: 'quick-fix',

  // Layout Settings
  inputPosition: 'below',
  answerPosition: 'above',
}

/**
 * Response type presets for simulation.
 */
export const RESPONSE_PRESETS: Record<SimulatedResponseType, SimulatedResponse> = {
  good: {
    type: 'good',
    confidence: 0.92,
    text: 'Based on my knowledge, the answer involves a combination of strategic planning and careful execution. The key factors include establishing clear objectives, maintaining consistent communication with stakeholders, and implementing iterative feedback loops to ensure continuous improvement throughout the process.',
    isOrphaned: false,
  },
  lousy: {
    type: 'lousy',
    confidence: 0.45,
    text: 'I think this might have something to do with the general approach, but I\'m not entirely certain about the specifics. There could be multiple factors involved that need further investigation.',
    isOrphaned: false,
  },
  unsure: {
    type: 'unsure',
    confidence: 0,
    text: "I don't have enough information to answer this question accurately. This appears to be outside my current knowledge base.",
    isOrphaned: true,
  },
}

/**
 * Modal width values in pixels.
 */
export const MODAL_WIDTH_MAP = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
} as const
