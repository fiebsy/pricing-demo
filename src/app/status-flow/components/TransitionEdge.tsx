/**
 * Transition Edge Component
 *
 * Custom React Flow edge with destination-based coloring and smooth routing.
 */

'use client'

import { memo } from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type Position,
} from '@xyflow/react'
import type { TransitionEdgeData } from '../_config/types'

// =============================================================================
// PROPS
// =============================================================================

interface TransitionEdgeProps {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  style?: React.CSSProperties
  markerEnd?: string
  data?: TransitionEdgeData
}

// =============================================================================
// COMPONENT
// =============================================================================

function TransitionEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: TransitionEdgeProps) {
  // Use smooth step path for cleaner routing between columns
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 12,
  })

  const isHighlighted = data?.isHighlighted ?? false
  const frequency = data?.frequency ?? 0
  const color = data?.color ?? style.stroke ?? '#9ca3af'

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          transition: 'stroke-width 0.2s, stroke 0.2s, opacity 0.2s',
        }}
      />

      {/* Frequency label for high-frequency transitions */}
      {frequency >= 500 && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
              backgroundColor: isHighlighted ? color : 'rgba(255,255,255,0.9)',
              color: isHighlighted ? 'white' : color,
              border: `1px solid ${color}`,
            }}
            className="px-1 py-0.5 rounded text-[9px] font-mono tabular-nums shadow-sm"
          >
            {frequency >= 1000 ? `${(frequency / 1000).toFixed(1)}k` : frequency}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export const TransitionEdge = memo(TransitionEdgeComponent)
