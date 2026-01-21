/**
 * Edit Questions Playground - Type Definitions
 *
 * TypeScript interfaces for the Q/A Editor modal prototype.
 * Supports the preview → improve → verify loop pattern.
 *
 * @module playground/edit-questions
 */

// =============================================================================
// QUESTION & ANSWER TYPES
// =============================================================================

/** Status of a question in the list */
export type QuestionStatus = 'pending' | 'answered' | 'orphaned'

/** An answer generated for a question */
export interface Answer {
  id: string
  text: string
  confidence: number // 0-1 scale
  generatedAt: Date
}

/** A question in the Q/A system */
export interface Question {
  id: string
  text: string
  status: QuestionStatus
  answer?: Answer
}

// =============================================================================
// REVISION FLOW TYPES
// =============================================================================

/** Types of revision flows available */
export type RevisionFlowType = 'quick-fix' | 'add-to-mind' | 'manual-fix'

/** A single statement in the quick fix flow */
export interface QuickFixStatement {
  id: string
  text: string
  isTrue?: boolean // User's response
}

/** Content that can be added to mind */
export interface MindContent {
  id: string
  type: 'file' | 'link' | 'text'
  name: string
  content?: string
  url?: string
}

// =============================================================================
// SIMULATED RESPONSE TYPES
// =============================================================================

/** Configurable answer response types for simulation */
export type SimulatedResponseType = 'good' | 'lousy' | 'unsure'

/** Structure for a simulated response */
export interface SimulatedResponse {
  type: SimulatedResponseType
  confidence: number
  text: string
  isOrphaned: boolean
}

// =============================================================================
// MODAL STATE TYPES
// =============================================================================

/** States for the modal state machine */
export type ModalState =
  | 'closed'
  | 'main'
  | 'selected'
  | 'revision-flow'
  | 'processing'

/** Actions for the modal state machine */
export type ModalAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SELECT'; questionId: string }
  | { type: 'DESELECT' }
  | { type: 'OPEN_REVISION'; flowType: RevisionFlowType }
  | { type: 'CLOSE_REVISION' }
  | { type: 'START_PROCESSING' }
  | { type: 'COMPLETE_PROCESSING' }

// =============================================================================
// ANSWER STATE
// =============================================================================

/** Visual state for answer preview component */
export type AnswerState = 'idle' | 'loading' | 'success' | 'orphaned'

// =============================================================================
// PROCESSING STATE
// =============================================================================

/** States for the processing meter */
export type ProcessingState = 'idle' | 'loading' | 'analyzing' | 'complete'

// =============================================================================
// TOOLBAR TYPES
// =============================================================================

/** Toolbar status indicator state */
export type ToolbarStatus = 'idle' | 'processing' | 'success'

/** Notification in the toolbar */
export interface Notification {
  id: string
  message: string
  timestamp: Date
}

// =============================================================================
// PLAYGROUND CONFIG
// =============================================================================

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

// =============================================================================
// PRESET TYPE
// =============================================================================

export interface PlaygroundPreset {
  id: string
  name: string
  description: string
  data: Partial<PlaygroundConfig>
}
