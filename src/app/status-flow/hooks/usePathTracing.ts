/**
 * Status Flow - usePathTracing Hook
 *
 * Computes highlighted paths based on selected preset.
 */

import { useMemo } from 'react'
import type { StatusFlowEdge } from '../_config/types'
import type { PathResult } from '../utils/path-finder'
import { findPathsToTargets, findRecoveryPaths } from '../utils/path-finder'
import { getPathPreset } from '../_config/paths'
import { STATUS_DATA } from '../../status-organization/data/status-data'

// =============================================================================
// HELPERS
// =============================================================================

function getStatusesBySubcategory(subcategory: string): Set<string> {
  return new Set(
    STATUS_DATA
      .filter(s => s.subcategory === subcategory)
      .map(s => s.code)
  )
}

// =============================================================================
// HOOK
// =============================================================================

export interface PathTracingResult {
  /** IDs of edges to highlight */
  highlightedEdgeIds: Set<string>
  /** IDs of nodes to highlight */
  highlightedNodeIds: Set<string>
  /** Statistics about the path */
  stats: {
    edgeCount: number
    nodeCount: number
    pathCount: number
  }
  /** Most common path (status codes) */
  mostCommonPath: string[]
}

export function usePathTracing(
  edges: StatusFlowEdge[],
  activePresetId: string | null
): PathTracingResult | null {
  return useMemo(() => {
    if (!activePresetId) return null

    const preset = getPathPreset(activePresetId)
    if (!preset) return null

    let result: PathResult

    // Special handling for recovery paths
    if (activePresetId === 'recovery') {
      const atRiskStatuses = getStatusesBySubcategory('AT_RISK')
      const healthyStatuses = getStatusesBySubcategory('HEALTHY')
      result = findRecoveryPaths(edges, atRiskStatuses, healthyStatuses)
    } else {
      result = findPathsToTargets(edges, preset.targetStatuses, preset.sourceFilter)
    }

    return {
      highlightedEdgeIds: result.edgeIds,
      highlightedNodeIds: result.nodeIds,
      stats: {
        edgeCount: result.edgeIds.size,
        nodeCount: result.nodeIds.size,
        pathCount: result.pathCount,
      },
      mostCommonPath: result.mostCommonPath,
    }
  }, [edges, activePresetId])
}
