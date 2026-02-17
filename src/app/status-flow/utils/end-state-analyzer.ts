/**
 * End State Analyzer
 *
 * Computes which end state(s) each status can reach,
 * enabling edge coloring based on destination.
 */

import { TRANSITION_DATA } from '../../status-transitions/data/transition-data'
import type { EndStateCategory } from '../_config/types'

export type { EndStateCategory }

export const END_STATE_MAPPING: Record<string, EndStateCategory> = {
  // Success
  'PAID_IN_FULL': 'PAID_IN_FULL',

  // Clawback/Default
  'CLAWBACK_COMPLETE': 'CLAWBACK',
  'DEFAULTED_SETTLED': 'CLAWBACK',
  'DEFAULTED_PENDING_CLAWBACK': 'CLAWBACK',
  'CLAWBACK_IN_PROGRESS': 'CLAWBACK',
  'CHARGEBACK_SETTLED': 'CLAWBACK',
  'CHARGEBACK_PENDING_CLAWBACK': 'CLAWBACK',

  // Canceled
  'CANCELED_SETTLED': 'CANCELED',
  'CANCELED_PENDING_CLAWBACK': 'CANCELED',
  'CANCELED_PENDING_CANCELLATION': 'CANCELED',
  'CANCELED_PENDING_REFUND': 'CANCELED',
  'REQUESTING_CANCELLATION': 'CANCELED',

  // Declined
  'DECLINED': 'DECLINED',

  // Other closed
  'DUPLICATE': 'OTHER_CLOSED',
  'WENT_DARK': 'OTHER_CLOSED',
  'SUBSCRIPTION_CANCELED': 'OTHER_CLOSED',
  'ABANDONED_FORM': 'OTHER_CLOSED',
}

// Terminal states that don't lead anywhere
export const TERMINAL_STATES = new Set([
  'PAID_IN_FULL',
  'CLAWBACK_COMPLETE',
  'DEFAULTED_SETTLED',
  'CANCELED_SETTLED',
  'CHARGEBACK_SETTLED',
  'DECLINED',
  'DUPLICATE',
  'WENT_DARK',
  'SUBSCRIPTION_CANCELED',
  'ABANDONED_FORM',
])

// =============================================================================
// EDGE COLORS BY DESTINATION CATEGORY
// =============================================================================

export const END_STATE_COLORS: Record<EndStateCategory, string> = {
  PAID_IN_FULL: '#22c55e',    // Green - success
  CLAWBACK: '#ef4444',        // Red - error
  CANCELED: '#f59e0b',        // Orange - warning
  DECLINED: '#6b7280',        // Gray
  OTHER_CLOSED: '#9ca3af',    // Light gray
  ACTIVE: '#3b82f6',          // Blue - loops back
}

// =============================================================================
// COMPUTE REACHABLE END STATES
// =============================================================================

/**
 * Build a forward adjacency list from transition data
 */
function buildForwardGraph(): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>()

  for (const t of TRANSITION_DATA) {
    if (!graph.has(t.fromStatus)) {
      graph.set(t.fromStatus, new Set())
    }
    graph.get(t.fromStatus)!.add(t.toStatus)
  }

  return graph
}

/**
 * BFS to find all reachable end states from a given status
 */
function findReachableEndStates(
  startStatus: string,
  graph: Map<string, Set<string>>,
  memo: Map<string, Set<EndStateCategory>>
): Set<EndStateCategory> {
  // Check memo
  if (memo.has(startStatus)) {
    return memo.get(startStatus)!
  }

  // Check if this is a terminal state
  if (TERMINAL_STATES.has(startStatus)) {
    const category = END_STATE_MAPPING[startStatus] || 'OTHER_CLOSED'
    const result = new Set([category])
    memo.set(startStatus, result)
    return result
  }

  // Check if this status has an end category mapping
  if (END_STATE_MAPPING[startStatus]) {
    const result = new Set([END_STATE_MAPPING[startStatus]])
    memo.set(startStatus, result)
    return result
  }

  const visited = new Set<string>()
  const queue: string[] = [startStatus]
  const endStates = new Set<EndStateCategory>()
  let loopsToActive = false

  while (queue.length > 0) {
    const current = queue.shift()!

    if (visited.has(current)) {
      continue
    }
    visited.add(current)

    // Check if this is a mapped end state
    if (END_STATE_MAPPING[current]) {
      endStates.add(END_STATE_MAPPING[current])
      continue
    }

    // Get neighbors
    const neighbors = graph.get(current)
    if (!neighbors || neighbors.size === 0) {
      // No outgoing edges - might be active loop
      loopsToActive = true
      continue
    }

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor)
      }
    }
  }

  // If no end states found, mark as active (loops back)
  if (endStates.size === 0 && loopsToActive) {
    endStates.add('ACTIVE')
  }

  memo.set(startStatus, endStates)
  return endStates
}

/**
 * Compute the primary end state category for each status
 */
export function computeStatusEndStates(): Map<string, EndStateCategory> {
  const graph = buildForwardGraph()
  const memo = new Map<string, Set<EndStateCategory>>()
  const result = new Map<string, EndStateCategory>()

  // Get all unique statuses
  const allStatuses = new Set<string>()
  for (const t of TRANSITION_DATA) {
    allStatuses.add(t.fromStatus)
    allStatuses.add(t.toStatus)
  }

  for (const status of allStatuses) {
    const endStates = findReachableEndStates(status, graph, memo)

    if (endStates.size === 0) {
      result.set(status, 'ACTIVE')
    } else if (endStates.size === 1) {
      const firstValue = endStates.values().next().value as EndStateCategory
      result.set(status, firstValue)
    } else {
      // Multiple end states - prioritize by most likely/important outcome
      // Priority: PAID_IN_FULL > CLAWBACK > CANCELED > DECLINED > OTHER_CLOSED > ACTIVE
      if (endStates.has('PAID_IN_FULL')) {
        result.set(status, 'PAID_IN_FULL')
      } else if (endStates.has('CLAWBACK')) {
        result.set(status, 'CLAWBACK')
      } else if (endStates.has('CANCELED')) {
        result.set(status, 'CANCELED')
      } else if (endStates.has('DECLINED')) {
        result.set(status, 'DECLINED')
      } else if (endStates.has('OTHER_CLOSED')) {
        result.set(status, 'OTHER_CLOSED')
      } else {
        result.set(status, 'ACTIVE')
      }
    }
  }

  return result
}

/**
 * Get the color for an edge based on its destination
 */
export function getEdgeColorForTransition(
  toStatus: string,
  statusEndStates: Map<string, EndStateCategory>
): string {
  // Direct mapping if target is an end state
  if (END_STATE_MAPPING[toStatus]) {
    return END_STATE_COLORS[END_STATE_MAPPING[toStatus]]
  }

  // Use the computed end state for the target
  const endCategory = statusEndStates.get(toStatus) || 'ACTIVE'
  return END_STATE_COLORS[endCategory]
}

// =============================================================================
// PRECOMPUTED DATA
// =============================================================================

// Compute once and export
let _statusEndStates: Map<string, EndStateCategory> | null = null

export function getStatusEndStates(): Map<string, EndStateCategory> {
  if (!_statusEndStates) {
    _statusEndStates = computeStatusEndStates()
  }
  return _statusEndStates
}
