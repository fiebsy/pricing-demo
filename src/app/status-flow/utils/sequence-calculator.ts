/**
 * Status Flow - Sequence Calculator
 *
 * Computes sequence depth for each status based on transition data.
 * Entry points (statuses with no/few incoming transitions) get low depth.
 * Statuses that follow others get progressively higher depth.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface SequenceData {
  /** Status code */
  statusCode: string
  /** Sequence depth: 0 = entry point, higher = later in flow */
  depth: number
  /** Total incoming transitions */
  incomingCount: number
  /** Total outgoing transitions */
  outgoingCount: number
  /** Weighted incoming (by frequency) */
  weightedIncoming: number
  /** Weighted outgoing (by frequency) */
  weightedOutgoing: number
}

interface TransitionInput {
  fromStatus: string
  toStatus: string
  frequency: number
}

// =============================================================================
// MAIN CALCULATOR
// =============================================================================

/**
 * Compute sequence depths for all statuses based on transition data.
 *
 * Algorithm:
 * 1. Build adjacency maps (incoming/outgoing) with frequency weights
 * 2. Identify entry points (no incoming or high outgoing ratio)
 * 3. BFS/weighted walk to assign depths based on max predecessor depth
 * 4. Handle cycles by capping iterations
 */
export function computeSequenceDepths(
  statusCodes: string[],
  transitions: TransitionInput[]
): Map<string, SequenceData> {
  const result = new Map<string, SequenceData>()
  const statusSet = new Set(statusCodes)

  // Initialize all statuses
  for (const code of statusCodes) {
    result.set(code, {
      statusCode: code,
      depth: 0,
      incomingCount: 0,
      outgoingCount: 0,
      weightedIncoming: 0,
      weightedOutgoing: 0,
    })
  }

  // Build adjacency data
  const incoming = new Map<string, { from: string; frequency: number }[]>()
  const outgoing = new Map<string, { to: string; frequency: number }[]>()

  for (const code of statusCodes) {
    incoming.set(code, [])
    outgoing.set(code, [])
  }

  // Populate adjacency from transitions
  for (const t of transitions) {
    // Only consider transitions between known statuses
    if (!statusSet.has(t.fromStatus) || !statusSet.has(t.toStatus)) {
      continue
    }

    // Add to incoming list for toStatus
    const inList = incoming.get(t.toStatus)
    if (inList) {
      inList.push({ from: t.fromStatus, frequency: t.frequency })
    }

    // Add to outgoing list for fromStatus
    const outList = outgoing.get(t.fromStatus)
    if (outList) {
      outList.push({ to: t.toStatus, frequency: t.frequency })
    }

    // Update counts
    const fromData = result.get(t.fromStatus)
    const toData = result.get(t.toStatus)
    if (fromData) {
      fromData.outgoingCount++
      fromData.weightedOutgoing += t.frequency
    }
    if (toData) {
      toData.incomingCount++
      toData.weightedIncoming += t.frequency
    }
  }

  // Calculate depths using weighted BFS
  const depths = computeDepthsBFS(statusCodes, incoming, result)

  // Apply computed depths
  for (const [code, depth] of depths) {
    const data = result.get(code)
    if (data) {
      data.depth = depth
    }
  }

  return result
}

// =============================================================================
// DEPTH CALCULATION (BFS)
// =============================================================================

function computeDepthsBFS(
  statusCodes: string[],
  incoming: Map<string, { from: string; frequency: number }[]>,
  sequenceData: Map<string, SequenceData>
): Map<string, number> {
  const depths = new Map<string, number>()

  // Identify entry points: statuses with no incoming or very low incoming ratio
  for (const code of statusCodes) {
    const data = sequenceData.get(code)
    if (!data) continue

    const inList = incoming.get(code) || []

    // Entry point if:
    // 1. No incoming transitions at all
    // 2. OR incoming/outgoing ratio is very low (primarily a source)
    if (inList.length === 0) {
      depths.set(code, 0)
    } else if (data.outgoingCount > 0 && data.weightedOutgoing > 0) {
      const ratio = data.weightedIncoming / (data.weightedIncoming + data.weightedOutgoing)
      if (ratio < 0.15) {
        // Primarily outgoing - this is an entry point
        depths.set(code, 0)
      }
    }
  }

  // If no entry points found, use statuses with lowest incoming frequency
  if (depths.size === 0) {
    let minIncoming = Infinity
    for (const code of statusCodes) {
      const data = sequenceData.get(code)
      if (data && data.weightedIncoming < minIncoming) {
        minIncoming = data.weightedIncoming
      }
    }
    for (const code of statusCodes) {
      const data = sequenceData.get(code)
      if (data && data.weightedIncoming === minIncoming) {
        depths.set(code, 0)
      }
    }
  }

  // BFS to propagate depths
  // Use depth from HIGHEST FREQUENCY incoming edge (not max depth)
  // This ensures rare back-transitions don't inflate depth
  const MAX_ITERATIONS = 20
  let changed = true
  let iteration = 0

  while (changed && iteration < MAX_ITERATIONS) {
    changed = false
    iteration++

    for (const code of statusCodes) {
      const inList = incoming.get(code) || []
      if (inList.length === 0) continue

      // Find the predecessor with highest frequency transition TO this node
      // Use that predecessor's depth + 1 as our depth
      let bestPredecessor: { from: string; frequency: number; depth: number } | null = null

      for (const edge of inList) {
        const predDepth = depths.get(edge.from)
        if (predDepth !== undefined) {
          if (!bestPredecessor || edge.frequency > bestPredecessor.frequency) {
            bestPredecessor = { from: edge.from, frequency: edge.frequency, depth: predDepth }
          }
        }
      }

      if (bestPredecessor) {
        const newDepth = bestPredecessor.depth + 1
        const currentDepth = depths.get(code)

        // Only update if we don't have a depth yet, or if the new depth is LOWER
        // (we want the earliest/shortest path, not the longest)
        if (currentDepth === undefined || newDepth < currentDepth) {
          depths.set(code, newDepth)
          changed = true
        }
      }
    }
  }

  // Assign depth 0 to any remaining unassigned (disconnected nodes)
  for (const code of statusCodes) {
    if (!depths.has(code)) {
      depths.set(code, 0)
    }
  }

  return depths
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get sequence depth for a specific status.
 * Returns 0 if status not found.
 */
export function getSequenceDepth(
  sequenceMap: Map<string, SequenceData>,
  statusCode: string
): number {
  return sequenceMap.get(statusCode)?.depth ?? 0
}

/**
 * Check if a status is an entry point (depth 0 with low incoming).
 */
export function isEntryPoint(
  sequenceMap: Map<string, SequenceData>,
  statusCode: string
): boolean {
  const data = sequenceMap.get(statusCode)
  if (!data) return false
  return data.depth === 0 && data.incomingCount <= data.outgoingCount
}

/**
 * Check if a status is a terminal point (high incoming, low/no outgoing).
 */
export function isTerminalPoint(
  sequenceMap: Map<string, SequenceData>,
  statusCode: string
): boolean {
  const data = sequenceMap.get(statusCode)
  if (!data) return false
  return data.outgoingCount === 0 || data.incomingCount > data.outgoingCount * 3
}
