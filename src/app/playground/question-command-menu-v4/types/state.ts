/**
 * Question Command Menu V4 - State Types
 *
 * Unified state machine following the reducer pattern from edit-questions.
 * Consolidates all trigger, slot, and filter state into a single source of truth.
 */

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
export interface TriggerFullState {
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
}

// =============================================================================
// ACTIONS
// =============================================================================

/**
 * All possible state transitions
 */
export type TriggerAction =
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

  // Full reset
  | { type: 'RESET' }

// =============================================================================
// DERIVED STATE HELPERS
// =============================================================================

/**
 * Derived booleans for convenience (computed in hook return)
 */
export interface DerivedTriggerState {
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
