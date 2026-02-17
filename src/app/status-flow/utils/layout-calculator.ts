/**
 * Status Flow - Layout Calculator
 *
 * Computes node positions using a column-based layout with dagre for vertical ordering.
 */

import dagre from 'dagre'
import type { StatusFlowNode, StatusFlowEdge, OrderSubcategory } from '../_config/types'
import { COLUMNS, LAYOUT_CONFIG, SUBCATEGORY_TO_COLUMN, DAGRE_CONFIG } from '../_config/layout'

// =============================================================================
// DAGRE GRAPH SETUP
// =============================================================================

function createDagreGraph() {
  const g = new dagre.graphlib.Graph()
  g.setGraph(DAGRE_CONFIG)
  g.setDefaultEdgeLabel(() => ({}))
  return g
}

// =============================================================================
// COMPUTE POSITIONS WITHIN COLUMNS
// =============================================================================

interface NodeWithSubcategory {
  id: string
  subcategory: OrderSubcategory
}

interface NodeWithSequenceData {
  id: string
  subcategory: OrderSubcategory
  sequenceDepth: number
  count: number
}

/**
 * Calculate vertical positions for nodes within each column using dagre
 * for ordering based on edge connections.
 */
export function computeColumnLayout(
  nodes: NodeWithSubcategory[],
  edges: { source: string; target: string }[]
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()

  // Group nodes by column
  const nodesByColumn = new Map<OrderSubcategory, NodeWithSubcategory[]>()

  for (const node of nodes) {
    const existing = nodesByColumn.get(node.subcategory) || []
    existing.push(node)
    nodesByColumn.set(node.subcategory, existing)
  }

  // Process each column separately
  for (const column of COLUMNS) {
    const columnNodes = nodesByColumn.get(column.subcategory) || []

    if (columnNodes.length === 0) continue

    // Create a mini dagre graph for this column
    const g = createDagreGraph()

    // Add nodes
    for (const node of columnNodes) {
      g.setNode(node.id, {
        width: LAYOUT_CONFIG.nodeWidth,
        height: LAYOUT_CONFIG.nodeHeight,
      })
    }

    // Add edges that are within this column or connect to this column
    const columnNodeIds = new Set(columnNodes.map(n => n.id))
    for (const edge of edges) {
      if (columnNodeIds.has(edge.source) && columnNodeIds.has(edge.target)) {
        g.setEdge(edge.source, edge.target)
      }
    }

    // Run dagre layout
    dagre.layout(g)

    // Extract positions (using column X, dagre Y)
    for (const node of columnNodes) {
      const dagreNode = g.node(node.id)
      if (dagreNode) {
        positions.set(node.id, {
          x: column.x,
          y: LAYOUT_CONFIG.padding + dagreNode.y,
        })
      }
    }
  }

  return positions
}

// =============================================================================
// SIMPLE VERTICAL LAYOUT (FALLBACK)
// =============================================================================

/**
 * Simple vertical layout - positions nodes in a column from top to bottom
 * based on count (highest count first).
 */
export function computeSimpleColumnLayout(
  nodes: NodeWithSubcategory[],
  getCount: (id: string) => number
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()

  // Group nodes by subcategory
  const nodesByColumn = new Map<OrderSubcategory, NodeWithSubcategory[]>()

  for (const node of nodes) {
    const existing = nodesByColumn.get(node.subcategory) || []
    existing.push(node)
    nodesByColumn.set(node.subcategory, existing)
  }

  // Position each column
  for (const column of COLUMNS) {
    const columnNodes = nodesByColumn.get(column.subcategory) || []

    // Sort by count (descending) for consistent ordering
    columnNodes.sort((a, b) => getCount(b.id) - getCount(a.id))

    // Position vertically
    columnNodes.forEach((node, index) => {
      positions.set(node.id, {
        x: column.x,
        y: LAYOUT_CONFIG.padding + index * (LAYOUT_CONFIG.nodeHeight + LAYOUT_CONFIG.nodeGap),
      })
    })
  }

  return positions
}

/**
 * Sequence-aware vertical layout - positions nodes in a column from top to bottom
 * based on sequence depth (entry points at top, destinations at bottom).
 * Secondary sort by count for nodes with same depth.
 */
export function computeSequenceColumnLayout(
  nodes: NodeWithSequenceData[]
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()

  // Group nodes by subcategory
  const nodesByColumn = new Map<OrderSubcategory, NodeWithSequenceData[]>()

  for (const node of nodes) {
    const existing = nodesByColumn.get(node.subcategory) || []
    existing.push(node)
    nodesByColumn.set(node.subcategory, existing)
  }

  // Position each column
  for (const column of COLUMNS) {
    const columnNodes = nodesByColumn.get(column.subcategory) || []

    // Sort by sequence depth (ascending), then by count (descending) as tiebreaker
    columnNodes.sort((a, b) => {
      // Primary: sequence depth (lower = higher position = top)
      if (a.sequenceDepth !== b.sequenceDepth) {
        return a.sequenceDepth - b.sequenceDepth
      }
      // Secondary: count (higher count = higher position within same depth)
      return b.count - a.count
    })

    // Position vertically
    columnNodes.forEach((node, index) => {
      positions.set(node.id, {
        x: column.x,
        y: LAYOUT_CONFIG.padding + index * (LAYOUT_CONFIG.nodeHeight + LAYOUT_CONFIG.nodeGap),
      })
    })
  }

  return positions
}

// =============================================================================
// APPLY POSITIONS TO NODES
// =============================================================================

export function applyPositionsToNodes(
  nodes: StatusFlowNode[],
  positions: Map<string, { x: number; y: number }>
): StatusFlowNode[] {
  return nodes.map(node => {
    const pos = positions.get(node.id)
    if (pos) {
      return {
        ...node,
        position: pos,
      }
    }
    return node
  })
}

// =============================================================================
// GET CANVAS BOUNDS
// =============================================================================

export function getCanvasBounds(nodes: StatusFlowNode[]): {
  width: number
  height: number
  minX: number
  minY: number
  maxX: number
  maxY: number
} {
  if (nodes.length === 0) {
    return {
      width: LAYOUT_CONFIG.canvasWidth,
      height: LAYOUT_CONFIG.canvasHeight,
      minX: 0,
      minY: 0,
      maxX: LAYOUT_CONFIG.canvasWidth,
      maxY: LAYOUT_CONFIG.canvasHeight,
    }
  }

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const node of nodes) {
    minX = Math.min(minX, node.position.x)
    minY = Math.min(minY, node.position.y)
    maxX = Math.max(maxX, node.position.x + LAYOUT_CONFIG.nodeWidth)
    maxY = Math.max(maxY, node.position.y + LAYOUT_CONFIG.nodeHeight)
  }

  return {
    width: maxX - minX + LAYOUT_CONFIG.padding * 2,
    height: maxY - minY + LAYOUT_CONFIG.padding * 2,
    minX,
    minY,
    maxX,
    maxY,
  }
}
