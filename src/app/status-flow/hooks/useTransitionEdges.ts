/**
 * Status Flow - useTransitionEdges Hook
 *
 * Transforms transition data into React Flow edges with destination-based coloring.
 */

import { useMemo } from 'react'
import type { StatusFlowEdge, FilterState, UsageTier } from '../_config/types'
import { TRANSITION_DATA } from '../../status-transitions/data/transition-data'
import { END_STATE_STATUSES } from '../_config/layout'
import {
  getStatusEndStates,
  getEdgeColorForTransition,
  END_STATE_MAPPING,
  END_STATE_COLORS,
  type EndStateCategory,
} from '../utils/end-state-analyzer'

// =============================================================================
// EDGE STYLING
// =============================================================================

function getEdgeWidth(usageTier: UsageTier, frequency: number): number {
  // More granular width based on actual frequency
  if (frequency >= 2000) return 5
  if (frequency >= 1000) return 4
  if (frequency >= 500) return 3
  if (frequency >= 100) return 2
  if (frequency >= 10) return 1.5
  return 1
}

function getEdgeOpacity(usageTier: UsageTier, frequency: number): number {
  if (frequency >= 1000) return 0.9
  if (frequency >= 500) return 0.75
  if (frequency >= 100) return 0.6
  if (frequency >= 10) return 0.45
  return 0.3
}

function getEdgeStyle(
  toStatus: string,
  usageTier: UsageTier,
  frequency: number,
  isHighlighted: boolean,
  isDimmed: boolean,
  statusEndStates: Map<string, EndStateCategory>
): React.CSSProperties {
  const width = getEdgeWidth(usageTier, frequency)
  const opacity = getEdgeOpacity(usageTier, frequency)

  // Get color based on destination
  const baseColor = getEdgeColorForTransition(toStatus, statusEndStates)

  if (isHighlighted) {
    return {
      strokeWidth: width * 1.5,
      stroke: baseColor,
      opacity: 1,
    }
  }

  if (isDimmed) {
    return {
      strokeWidth: width * 0.7,
      stroke: '#d1d5db',
      opacity: 0.2,
    }
  }

  return {
    strokeWidth: width,
    stroke: baseColor,
    opacity,
  }
}

// =============================================================================
// HOOK
// =============================================================================

export function useTransitionEdges(
  filterState: FilterState,
  visibleNodeIds: Set<string>,
  highlightedEdgeIds?: Set<string>
): StatusFlowEdge[] {
  return useMemo(() => {
    const edges: StatusFlowEdge[] = []
    const statusEndStates = getStatusEndStates()

    for (const transition of TRANSITION_DATA) {
      // Skip if source or target node is not visible
      if (!visibleNodeIds.has(transition.fromStatus) || !visibleNodeIds.has(transition.toStatus)) {
        continue
      }

      // Always show transitions TO terminal end states (regardless of frequency)
      const isEndStateTransition = END_STATE_STATUSES.has(transition.toStatus)

      // Apply frequency filter (unless showAll is true OR it's an end state transition)
      if (!filterState.showAll && !isEndStateTransition && transition.frequency < filterState.frequencyThreshold) {
        continue
      }

      const isHighlighted = highlightedEdgeIds?.has(transition.id) ?? false
      const isDimmed = highlightedEdgeIds ? !isHighlighted : false
      const style = getEdgeStyle(
        transition.toStatus,
        transition.usageTier,
        transition.frequency,
        isHighlighted,
        isDimmed,
        statusEndStates
      )

      // Determine the end state category for this edge
      const endCategory = END_STATE_MAPPING[transition.toStatus]
        || statusEndStates.get(transition.toStatus)
        || 'ACTIVE'

      edges.push({
        id: transition.id,
        source: transition.fromStatus,
        target: transition.toStatus,
        type: 'transition',
        animated: isHighlighted,
        style,
        data: {
          id: transition.id,
          fromStatus: transition.fromStatus,
          toStatus: transition.toStatus,
          frequency: transition.frequency,
          usageTier: transition.usageTier,
          label: transition.condensed,
          tooltip: transition.tooltip,
          isHighlighted,
          isDimmed,
          endCategory,
          color: style.stroke as string,
        },
      })
    }

    return edges
  }, [filterState.frequencyThreshold, filterState.showAll, visibleNodeIds, highlightedEdgeIds])
}

// =============================================================================
// HELPERS
// =============================================================================

export function getTransitionById(id: string) {
  return TRANSITION_DATA.find(t => t.id === id)
}

export function getAllTransitions() {
  return TRANSITION_DATA
}

export function getTransitionsForStatus(statusCode: string) {
  return {
    outgoing: TRANSITION_DATA.filter(t => t.fromStatus === statusCode),
    incoming: TRANSITION_DATA.filter(t => t.toStatus === statusCode),
  }
}

export { END_STATE_COLORS }
