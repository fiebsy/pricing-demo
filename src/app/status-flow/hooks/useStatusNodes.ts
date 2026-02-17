/**
 * Status Flow - useStatusNodes Hook
 *
 * Transforms status data into React Flow nodes with positions.
 */

import { useMemo } from 'react'
import type { StatusFlowNode, OrderSubcategory, FilterState } from '../_config/types'
import { STATUS_DATA } from '../../status-organization/data/status-data'
import { TRANSITION_DATA } from '../../status-transitions/data/transition-data'
import { getColumnIndex, END_STATE_STATUSES } from '../_config/layout'
import { computeSequenceDepths, type SequenceData } from '../utils/sequence-calculator'

// =============================================================================
// SEQUENCE DATA (computed once)
// =============================================================================

let cachedSequenceData: Map<string, SequenceData> | null = null

function getSequenceData(): Map<string, SequenceData> {
  if (!cachedSequenceData) {
    const statusCodes = STATUS_DATA.map(s => s.code)
    const transitions = TRANSITION_DATA.map(t => ({
      fromStatus: t.fromStatus,
      toStatus: t.toStatus,
      frequency: t.frequency,
    }))
    cachedSequenceData = computeSequenceDepths(statusCodes, transitions)
  }
  return cachedSequenceData
}

// =============================================================================
// HOOK
// =============================================================================

export function useStatusNodes(
  filterState: FilterState,
  highlightedNodeIds?: Set<string>
): StatusFlowNode[] {
  return useMemo(() => {
    const nodes: StatusFlowNode[] = []
    const sequenceData = getSequenceData()

    for (const status of STATUS_DATA) {
      // Skip if subcategory is filtered out
      if (!filterState.visibleSubcategories.has(status.subcategory)) {
        continue
      }

      const columnIndex = getColumnIndex(status.subcategory)
      const isHighlighted = highlightedNodeIds?.has(status.code) ?? false
      const isDimmed = highlightedNodeIds ? !isHighlighted : false
      const sequenceDepth = sequenceData.get(status.code)?.depth ?? 0

      nodes.push({
        id: status.code,
        type: 'status',
        position: { x: 0, y: 0 }, // Will be computed by layout
        data: {
          code: status.code,
          label: status.displayLabel,
          subcategory: status.subcategory,
          badgeColor: status.badgeColor,
          count: status.count,
          usageTier: status.usageTier,
          columnIndex,
          sequenceDepth,
          isHighlighted,
          isDimmed,
          isEndState: END_STATE_STATUSES.has(status.code),
        },
      })
    }

    return nodes
  }, [filterState.visibleSubcategories, highlightedNodeIds])
}

// =============================================================================
// HELPERS
// =============================================================================

export function getStatusCountMap(): Map<string, number> {
  const map = new Map<string, number>()
  for (const status of STATUS_DATA) {
    map.set(status.code, status.count)
  }
  return map
}

export function getStatusSubcategoryMap(): Map<string, OrderSubcategory> {
  const map = new Map<string, OrderSubcategory>()
  for (const status of STATUS_DATA) {
    map.set(status.code, status.subcategory)
  }
  return map
}
