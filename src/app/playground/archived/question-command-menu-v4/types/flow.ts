/**
 * Question Command Menu V4 - Flow State Types
 *
 * Multi-state flow system for managing question lifecycle:
 * idle → adding → processing → response ↔ editing
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

// =============================================================================
// FLOW STATE CONFIG
// =============================================================================

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
// HELPERS
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
