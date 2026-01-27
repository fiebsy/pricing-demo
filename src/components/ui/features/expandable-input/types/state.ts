/**
 * Expandable Input - State Types
 *
 * Unified state machine following the reducer pattern.
 * Consolidates all trigger, slot, and filter state into a single source of truth.
 * Includes flow state machine for question lifecycle management.
 */

// =============================================================================
// FLOW STATE TYPES
// =============================================================================

/**
 * Flow state discriminated union
 * Each state represents a phase in the question lifecycle
 */
export type FlowState =
  | { type: 'idle' }
  | { type: 'adding'; isTyping: boolean }
  | { type: 'processing' }
  | { type: 'response' }
  | { type: 'editing'; originalValue: string }

/**
 * Flow state ID for config lookup
 */
export type FlowStateId = 'idle' | 'adding' | 'processing' | 'response' | 'editing'

// =============================================================================
// FLOW OVERRIDE TYPES
// =============================================================================

/**
 * Slot height/enabled overrides per state
 * Only specify what changes from base config
 */
export interface FlowSlotOverride {
  enabled?: boolean
  minHeight?: number
  maxHeight?: number
}

/**
 * Button overrides per state (bottom slot action buttons)
 * Use id to match base button, override only what changes
 */
export interface FlowButtonOverride {
  id: string
  label?: string
  enabled?: boolean
  isLoading?: boolean
  disabled?: boolean
}

/**
 * Trigger button overrides per state (trigger row buttons)
 * Use id to match base button, override only what changes
 */
export interface FlowTriggerButtonOverride {
  id: string
  enabled?: boolean
  label?: string
}

/**
 * Complete configuration for a single flow state
 * All fields are optional - only specify what differs from base
 */
export interface FlowStateConfig {
  /** Slot visibility/sizing overrides */
  slots?: {
    top?: FlowSlotOverride
    bottom?: FlowSlotOverride
  }
  /** Bottom slot button overrides (matched by id) */
  buttons?: FlowButtonOverride[]
  /** Trigger row button overrides (matched by id) */
  triggerButtons?: FlowTriggerButtonOverride[]
  /** Input placeholder text override */
  placeholder?: string
}

/**
 * Flow configs for all states
 * Keyed by FlowStateId
 */
export interface FlowConfigs {
  idle?: FlowStateConfig
  adding?: FlowStateConfig
  processing?: FlowStateConfig
  response?: FlowStateConfig
  editing?: FlowStateConfig
}

// =============================================================================
// FLOW HELPERS
// =============================================================================

/**
 * Extract state ID from FlowState object
 */
export function getFlowStateId(flowState: FlowState): FlowStateId {
  return flowState.type
}

/**
 * Check if flow state allows input interaction
 */
export function isInputtingState(flowState: FlowState): boolean {
  return flowState.type === 'adding' || flowState.type === 'editing'
}

/**
 * Check if flow has a stored question/response
 */
export function hasStoredContent(flowState: FlowState): boolean {
  return flowState.type === 'response' || flowState.type === 'editing' || flowState.type === 'processing'
}

// =============================================================================
// TRIGGER MODE
// =============================================================================

/**
 * Trigger interaction mode
 * - input: Always shows input field (classic InputWithButtons behavior)
 * - question: Toggles between display and input (QuestionTrigger behavior)
 * - display: Always shows read-only display (for saved/locked states)
 */
export type TriggerMode = 'input' | 'question' | 'display'

// =============================================================================
// VIEW STATE
// =============================================================================

/**
 * High-level UI view state
 * - collapsed: Trigger is collapsed, slots hidden
 * - expanded: Trigger expanded, slots visible
 * - editing: In question mode, input field is active
 */
export type ViewState = 'collapsed' | 'expanded' | 'editing'

// =============================================================================
// SAVE STATUS
// =============================================================================

/**
 * Save button status for visual feedback
 * - idle: Default state, ready to save
 * - saving: Loading spinner shown
 * - saved: Checkmark shown briefly
 */
export type SaveStatus = 'idle' | 'saving' | 'saved'

// =============================================================================
// FULL STATE
// =============================================================================

/**
 * Complete trigger state - single source of truth
 */
export interface ExpandableInputState {
  // --- Mode & View ---
  /** Current trigger mode */
  mode: TriggerMode
  /** Current view state */
  view: ViewState
  /** Whether user is actively editing in question mode */
  editing: boolean
  /** Whether panel is expanded */
  expanded: boolean

  // --- Value State ---
  /** Current input field value */
  inputValue: string
  /** Persisted/saved question value (for question mode) */
  savedValue: string | null

  // --- Save Status ---
  /** Current save button status for visual feedback */
  saveStatus: SaveStatus

  // --- Content Filtering ---
  /** Search query for filtering content */
  searchQuery: string
  /** Active tab ID (for tabbed/filter content) */
  activeTab: string

  // --- Slot State ---
  /** Whether top slot content is visible */
  topSlotOpen: boolean
  /** Whether bottom slot content is visible */
  bottomSlotOpen: boolean

  // --- Flow State ---
  /** Current flow state in the question lifecycle */
  flowState: FlowState
  /** Committed question that has an AI response */
  storedQuestion: string | null
  /** AI response for the stored question */
  storedResponse: string | null
  /** Confidence level for the stored question (0-1, null if not set) */
  storedConfidence: number | null
}

// Alias for backwards compatibility
export type TriggerFullState = ExpandableInputState

// =============================================================================
// ACTIONS
// =============================================================================

/**
 * All possible state transitions
 */
export type ExpandableInputAction =
  // Trigger interactions
  | { type: 'CLICK_TRIGGER' }
  | { type: 'FOCUS_INPUT' }
  | { type: 'BLUR_INPUT' }
  | { type: 'ESCAPE' }

  // Value changes
  | { type: 'SET_INPUT'; value: string }
  | { type: 'SAVE'; value: string }
  | { type: 'CLEAR_VALUE' }

  // Save status
  | { type: 'START_SAVING' }
  | { type: 'SAVE_COMPLETE' }
  | { type: 'RESET_SAVE_STATUS' }

  // Filter/content changes
  | { type: 'SET_SEARCH'; value: string }
  | { type: 'SET_TAB'; value: string }

  // Expansion control
  | { type: 'EXPAND' }
  | { type: 'COLLAPSE' }
  | { type: 'TOGGLE_EXPANDED' }

  // Slot control
  | { type: 'OPEN_TOP_SLOT' }
  | { type: 'CLOSE_TOP_SLOT' }
  | { type: 'TOGGLE_TOP_SLOT' }
  | { type: 'OPEN_BOTTOM_SLOT' }
  | { type: 'CLOSE_BOTTOM_SLOT' }
  | { type: 'TOGGLE_BOTTOM_SLOT' }

  // Mode switching
  | { type: 'SET_MODE'; mode: TriggerMode }

  // Flow state actions
  | { type: 'START_ADDING' }
  | { type: 'SUBMIT_QUESTION'; confidence?: number }
  | { type: 'RECEIVE_RESPONSE'; response: string }
  | { type: 'START_EDITING' }
  | { type: 'CANCEL_EDITING' }
  | { type: 'DELETE_QUESTION' }

  // Full reset
  | { type: 'RESET' }

// Alias for backwards compatibility
export type TriggerAction = ExpandableInputAction

// =============================================================================
// DERIVED STATE HELPERS
// =============================================================================

/**
 * Derived booleans for convenience (computed in hook return)
 */
export interface DerivedExpandableInputState {
  /** Is the panel currently expanded */
  isExpanded: boolean
  /** Is in editing state (question mode only) */
  isEditing: boolean
  /** Has a saved value */
  hasSavedValue: boolean
  /** Is the input field active */
  isInputActive: boolean
  /** Should show top slot */
  showTopSlot: boolean
  /** Should show bottom slot */
  showBottomSlot: boolean
}

// Alias for backwards compatibility
export type DerivedTriggerState = DerivedExpandableInputState
