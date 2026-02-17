/**
 * Status Node Component
 *
 * Custom React Flow node for displaying status with subcategory coloring.
 * Uses left/right handles for horizontal flow between columns.
 */

'use client'

import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import type { StatusNodeData, BadgeColor } from '../_config/types'
import { cn } from '@/lib/utils'

// =============================================================================
// STYLES
// =============================================================================

const BADGE_COLORS: Record<BadgeColor, string> = {
  success: 'bg-success-primary border-success text-success-primary',
  warning: 'bg-warning-primary border-warning text-warning-primary',
  error: 'bg-error-primary border-error text-error-primary',
  info: 'bg-brand-primary border-brand text-brand-primary',
  gray: 'bg-tertiary border-secondary text-secondary',
}

const END_STATE_STYLES = 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'

// =============================================================================
// PROPS
// =============================================================================

interface StatusNodeProps {
  data: StatusNodeData
  selected?: boolean
}

// =============================================================================
// COMPONENT
// =============================================================================

function StatusNodeComponent({ data, selected }: StatusNodeProps) {
  const {
    label,
    badgeColor,
    count,
    isHighlighted,
    isDimmed,
    isEndState,
  } = data

  const colorClasses = BADGE_COLORS[badgeColor]

  return (
    <div
      className={cn(
        'relative rounded-xl border px-3 py-2 shadow-sm transition-all duration-200',
        'min-w-[180px] max-w-[200px]',
        colorClasses,
        isEndState && END_STATE_STYLES,
        isHighlighted && 'ring-2 ring-primary-500 ring-offset-2 shadow-lg scale-105',
        isDimmed && 'opacity-30',
        selected && 'ring-2 ring-primary-400 shadow-md',
        !isDimmed && 'hover:shadow-md hover:scale-[1.02]',
        'cursor-pointer'
      )}
    >
      {/* Left handle - incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-gray-400 !border-white !w-2 !h-2 !-left-1"
      />

      {/* Right handle - outgoing connections */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-gray-400 !border-white !w-2 !h-2 !-right-1"
      />

      {/* Content */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate leading-tight">
            {label}
          </div>
        </div>
        <div className="shrink-0">
          <span className="text-xs font-mono tabular-nums opacity-70">
            {count.toLocaleString()}
          </span>
        </div>
      </div>

      {/* End state indicator */}
      {isEndState && (
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-current opacity-50" />
      )}
    </div>
  )
}

export const StatusNode = memo(StatusNodeComponent)
