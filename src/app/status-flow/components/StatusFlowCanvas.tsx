/**
 * Status Flow Canvas
 *
 * React Flow wrapper with provider, background, and controls.
 */

'use client'

import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import type { StatusFlowNode, StatusFlowEdge, FilterState, OrderSubcategory, StatusNodeData } from '../_config/types'
import { StatusNode } from './StatusNode'
import { TransitionEdge } from './TransitionEdge'
import { useStatusNodes } from '../hooks/useStatusNodes'
import { useTransitionEdges } from '../hooks/useTransitionEdges'
import { useFlowLayout } from '../hooks/useFlowLayout'
import { usePathTracing } from '../hooks/usePathTracing'

// =============================================================================
// NODE & EDGE TYPES
// =============================================================================

const nodeTypes = {
  status: StatusNode,
}

const edgeTypes = {
  transition: TransitionEdge,
}

// =============================================================================
// MINIMAP COLORS
// =============================================================================

const MINIMAP_COLORS: Record<OrderSubcategory, string> = {
  HEALTHY: '#22c55e',
  AT_RISK: '#f59e0b',
  OTHER_ACTIVE: '#3b82f6',
  FULLY_PAID: '#22c55e',
  CLAWED_BACK: '#ef4444',
  DECLINED: '#6b7280',
  OTHER_CLOSED: '#6b7280',
}

function getMinimapNodeColor(node: Node): string {
  const data = node.data as StatusNodeData | undefined
  if (data?.subcategory) {
    return MINIMAP_COLORS[data.subcategory] || '#6b7280'
  }
  return '#6b7280'
}

// =============================================================================
// PROPS
// =============================================================================

interface StatusFlowCanvasProps {
  filterState: FilterState
  onNodeClick?: (node: StatusFlowNode) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StatusFlowCanvas({ filterState, onNodeClick }: StatusFlowCanvasProps) {
  // Path tracing
  const pathTracing = usePathTracing(
    [], // Will be computed after edges
    filterState.activePathPreset
  )

  // Compute nodes
  const rawNodes = useStatusNodes(filterState, pathTracing?.highlightedNodeIds)

  // Get visible node IDs for edge filtering
  const visibleNodeIds = useMemo(
    () => new Set(rawNodes.map(n => n.id)),
    [rawNodes]
  )

  // Compute edges
  const rawEdges = useTransitionEdges(filterState, visibleNodeIds, pathTracing?.highlightedEdgeIds)

  // Re-compute path tracing with actual edges
  const pathTracingWithEdges = usePathTracing(rawEdges, filterState.activePathPreset)

  // Recompute nodes with actual highlighting
  const nodesWithHighlighting = useStatusNodes(filterState, pathTracingWithEdges?.highlightedNodeIds)

  // Apply layout
  const nodes = useFlowLayout(nodesWithHighlighting, rawEdges)

  // Recompute edges with actual highlighting
  const edges = useTransitionEdges(
    filterState,
    visibleNodeIds,
    pathTracingWithEdges?.highlightedEdgeIds
  )

  // Handle node click
  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeClick?.(node as StatusFlowNode)
    },
    [onNodeClick]
  )

  return (
    <div className="h-full w-full bg-white dark:bg-gray-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.3,
          maxZoom: 1.5,
        }}
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'transition',
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background className="!stroke-gray-200 dark:!stroke-gray-700" gap={20} />
        <Controls
          showZoom
          showFitView
          showInteractive={false}
          position="bottom-left"
          className="!bg-white dark:!bg-gray-900 !shadow-md !border-gray-200 dark:!border-gray-700"
        />
        <MiniMap
          nodeColor={getMinimapNodeColor}
          nodeStrokeWidth={0}
          nodeBorderRadius={8}
          maskColor="rgba(0, 0, 0, 0.1)"
          position="bottom-right"
          className="!bg-white dark:!bg-gray-900 !shadow-md !border-gray-200 dark:!border-gray-700"
        />
      </ReactFlow>
    </div>
  )
}
