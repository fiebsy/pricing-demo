/**
 * Status Flow - useFlowLayout Hook
 *
 * Computes positions for nodes using column-based layout with sequence ordering.
 * Entry points appear at the top of each column, destinations at the bottom.
 */

import { useMemo } from 'react'
import type { StatusFlowNode, StatusFlowEdge } from '../_config/types'
import { computeSequenceColumnLayout, applyPositionsToNodes } from '../utils/layout-calculator'

// =============================================================================
// HOOK
// =============================================================================

export function useFlowLayout(
  nodes: StatusFlowNode[],
  edges: StatusFlowEdge[]
): StatusFlowNode[] {
  return useMemo(() => {
    if (nodes.length === 0) return nodes

    // Create node list with sequence data for layout calculation
    const nodeData = nodes.map(n => ({
      id: n.id,
      subcategory: n.data.subcategory,
      sequenceDepth: n.data.sequenceDepth,
      count: n.data.count,
    }))

    // Compute positions using sequence-based ordering
    const positions = computeSequenceColumnLayout(nodeData)

    // Apply positions to nodes
    return applyPositionsToNodes(nodes, positions)
  }, [nodes, edges])
}
