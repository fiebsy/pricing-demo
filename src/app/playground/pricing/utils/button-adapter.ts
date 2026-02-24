/**
 * Button Adapter Utilities
 *
 * Maps between FlowId and ButtonStateId for the pricing modal.
 * Enables synchronization between the modal's flow system and
 * the fluid button layout state machine.
 *
 * Flow Mapping:
 * - flow-a (pricing select) → 'A' (single upgrade button)
 * - flow-b (confirmation)   → 'B1'/'B2' (back + upgrade buttons)
 * - flow-c (success)        → 'C1'/'C2' (checkmark → completion)
 *
 * @status incubating
 */

import type { FlowId } from '../config/types'
import type { ButtonStateId } from '@/components/ui/core/primitives/fluid-button-layout'

// ============================================================================
// Flow to State Mapping
// ============================================================================

/**
 * Maps FlowId to the initial ButtonStateId for that flow.
 * - flow-a starts at 'A' (single button)
 * - flow-b starts at 'B1' (can progress to B2)
 * - flow-c starts at 'C1' (can progress to C2)
 */
const FLOW_TO_STATE: Record<FlowId, ButtonStateId> = {
  'flow-a': 'A',
  'flow-b': 'B1',
  'flow-c': 'C1',
}

/**
 * Maps ButtonStateId to its parent FlowId.
 * Multiple button states can belong to the same flow.
 */
const STATE_TO_FLOW: Record<ButtonStateId, FlowId> = {
  'A': 'flow-a',
  'B1': 'flow-b',
  'B2': 'flow-b',
  'C1': 'flow-c',
  'C2': 'flow-c',
}

// ============================================================================
// Conversion Functions
// ============================================================================

/**
 * Convert FlowId to the initial ButtonStateId for that flow.
 *
 * @example
 * flowToStateId('flow-a') // 'A'
 * flowToStateId('flow-b') // 'B1'
 * flowToStateId('flow-c') // 'C1'
 */
export function flowToStateId(flowId: FlowId): ButtonStateId {
  return FLOW_TO_STATE[flowId]
}

/**
 * Convert ButtonStateId to its parent FlowId.
 *
 * @example
 * stateIdToFlow('A')  // 'flow-a'
 * stateIdToFlow('B1') // 'flow-b'
 * stateIdToFlow('B2') // 'flow-b'
 * stateIdToFlow('C1') // 'flow-c'
 * stateIdToFlow('C2') // 'flow-c'
 */
export function stateIdToFlow(stateId: ButtonStateId): FlowId {
  return STATE_TO_FLOW[stateId]
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if a button state belongs to a specific flow.
 *
 * @example
 * isStateInFlow('B2', 'flow-b') // true
 * isStateInFlow('C1', 'flow-b') // false
 */
export function isStateInFlow(stateId: ButtonStateId, flowId: FlowId): boolean {
  return STATE_TO_FLOW[stateId] === flowId
}

/**
 * Get all button states for a given flow.
 *
 * @example
 * getStatesForFlow('flow-b') // ['B1', 'B2']
 */
export function getStatesForFlow(flowId: FlowId): ButtonStateId[] {
  return (Object.entries(STATE_TO_FLOW) as [ButtonStateId, FlowId][])
    .filter(([, flow]) => flow === flowId)
    .map(([state]) => state)
}
