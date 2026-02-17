/**
 * Status Flow - Path Finder
 *
 * BFS/DFS utilities to find all paths to target statuses.
 */

import type { StatusFlowEdge, OrderSubcategory } from '../_config/types'

// =============================================================================
// TYPES
// =============================================================================

interface AdjacencyList {
  /** Forward edges: status -> [statuses it can transition to] */
  forward: Map<string, Set<string>>
  /** Reverse edges: status -> [statuses that can transition to it] */
  reverse: Map<string, Set<string>>
}

export interface PathResult {
  /** All edges that are part of paths to the target(s) */
  edgeIds: Set<string>
  /** All nodes that are part of paths to the target(s) */
  nodeIds: Set<string>
  /** Number of distinct paths found */
  pathCount: number
  /** Most common path (as array of status codes) */
  mostCommonPath: string[]
}

// =============================================================================
// BUILD ADJACENCY LIST
// =============================================================================

export function buildAdjacencyList(edges: StatusFlowEdge[]): AdjacencyList {
  const forward = new Map<string, Set<string>>()
  const reverse = new Map<string, Set<string>>()

  for (const edge of edges) {
    // Forward: from -> to
    if (!forward.has(edge.source)) {
      forward.set(edge.source, new Set())
    }
    forward.get(edge.source)!.add(edge.target)

    // Reverse: to -> from
    if (!reverse.has(edge.target)) {
      reverse.set(edge.target, new Set())
    }
    reverse.get(edge.target)!.add(edge.source)
  }

  return { forward, reverse }
}

// =============================================================================
// FIND ALL PATHS TO TARGET (BFS)
// =============================================================================

/**
 * Find all edges and nodes that are part of any path leading to target statuses.
 * Uses reverse BFS from targets to find all predecessor paths.
 */
export function findPathsToTargets(
  edges: StatusFlowEdge[],
  targetStatuses: string[],
  sourceFilter?: OrderSubcategory[]
): PathResult {
  const adjacency = buildAdjacencyList(edges)
  const { reverse } = adjacency

  // BFS from targets backwards
  const visited = new Set<string>()
  const queue: string[] = [...targetStatuses]
  const reachableNodes = new Set<string>(targetStatuses)

  while (queue.length > 0) {
    const current = queue.shift()!

    if (visited.has(current)) continue
    visited.add(current)

    // Get all nodes that can reach current
    const predecessors = reverse.get(current)
    if (predecessors) {
      for (const pred of predecessors) {
        if (!visited.has(pred)) {
          queue.push(pred)
          reachableNodes.add(pred)
        }
      }
    }
  }

  // Find all edges that connect reachable nodes
  const edgeIds = new Set<string>()
  const edgeMap = new Map<string, StatusFlowEdge>()

  for (const edge of edges) {
    edgeMap.set(`${edge.source}->${edge.target}`, edge)

    // Include edge if both source and target are reachable
    // and the edge points toward the targets
    if (reachableNodes.has(edge.source) && reachableNodes.has(edge.target)) {
      edgeIds.add(edge.id)
    }
  }

  // Count paths (simplified - count edges leading to targets)
  const pathCount = edgeIds.size

  // Find most common path (use highest frequency transitions)
  const mostCommonPath = findMostCommonPath(edges, targetStatuses, reachableNodes)

  return {
    edgeIds,
    nodeIds: reachableNodes,
    pathCount,
    mostCommonPath,
  }
}

// =============================================================================
// FIND MOST COMMON PATH
// =============================================================================

/**
 * Find the most common path to targets by following highest-frequency transitions.
 */
function findMostCommonPath(
  edges: StatusFlowEdge[],
  targets: string[],
  reachableNodes: Set<string>
): string[] {
  // Build frequency-weighted forward adjacency
  const weightedForward = new Map<string, Array<{ target: string; frequency: number }>>()

  for (const edge of edges) {
    if (!reachableNodes.has(edge.source) || !reachableNodes.has(edge.target)) continue

    if (!weightedForward.has(edge.source)) {
      weightedForward.set(edge.source, [])
    }
    weightedForward.get(edge.source)!.push({
      target: edge.target,
      frequency: edge.data?.frequency ?? 0,
    })
  }

  // Sort each node's outgoing edges by frequency
  for (const [, neighbors] of weightedForward) {
    neighbors.sort((a, b) => b.frequency - a.frequency)
  }

  // Find a starting node (one with no incoming edges in the reachable set)
  const hasIncoming = new Set<string>()
  for (const edge of edges) {
    if (reachableNodes.has(edge.source) && reachableNodes.has(edge.target)) {
      hasIncoming.add(edge.target)
    }
  }

  const startCandidates = Array.from(reachableNodes).filter(n => !hasIncoming.has(n))
  if (startCandidates.length === 0) return []

  // Greedy path following highest frequency
  const targetSet = new Set(targets)
  const path: string[] = []
  const visited = new Set<string>()
  let current = startCandidates[0]

  while (current && !visited.has(current)) {
    path.push(current)
    visited.add(current)

    if (targetSet.has(current)) break

    const neighbors = weightedForward.get(current)
    if (!neighbors || neighbors.length === 0) break

    current = neighbors[0].target
  }

  return path
}

// =============================================================================
// FIND RECOVERY PATHS (AT_RISK -> HEALTHY)
// =============================================================================

/**
 * Find all edges representing recovery transitions (AT_RISK -> HEALTHY).
 */
export function findRecoveryPaths(
  edges: StatusFlowEdge[],
  atRiskStatuses: Set<string>,
  healthyStatuses: Set<string>
): PathResult {
  const edgeIds = new Set<string>()
  const nodeIds = new Set<string>()

  for (const edge of edges) {
    // Direct recovery: AT_RISK -> HEALTHY
    if (atRiskStatuses.has(edge.source) && healthyStatuses.has(edge.target)) {
      edgeIds.add(edge.id)
      nodeIds.add(edge.source)
      nodeIds.add(edge.target)
    }
  }

  return {
    edgeIds,
    nodeIds,
    pathCount: edgeIds.size,
    mostCommonPath: [],
  }
}
