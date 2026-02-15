/**
 * Cell Renderer for Transition Table
 *
 * Renders cells based on column type.
 */

'use client'

import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { TransitionEntry } from '../config/types'
import { CoverageIndicator } from './CoverageIndicator'
import { UsageTierDot } from './UsageTierDot'
import { SUBCATEGORY_LABELS, SUBCATEGORY_COLORS } from '../config/status-categories'

// =============================================================================
// FORMAT HELPERS
// =============================================================================

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

// =============================================================================
// CELL RENDERER
// =============================================================================

export function renderTransitionCell(
  columnKey: string,
  row: Record<string, unknown>
): ReactNode {
  const data = row as unknown as TransitionEntry

  switch (columnKey) {
    case 'fromStatus':
      return (
        <span className="text-tertiary font-mono text-[10px]">
          {data.fromStatus}
        </span>
      )

    case 'toStatus':
      return (
        <span className="text-tertiary font-mono text-[10px]">
          {data.toStatus}
        </span>
      )

    case 'frequency':
      return (
        <span className="text-primary font-mono text-sm tabular-nums">
          {data.frequency.toLocaleString()}
        </span>
      )

    case 'condensed':
      return (
        <span className="text-secondary text-sm leading-snug">
          {data.condensed}
        </span>
      )

    case 'tooltip':
      return (
        <span className="text-secondary text-xs leading-relaxed">
          {data.tooltip}
        </span>
      )

    case 'coverage':
      return <CoverageIndicator coverage={data.coverage} />

    case 'fromCategory':
      if (!data.fromCategory) {
        return <span className="text-tertiary text-xs">—</span>
      }
      return (
        <Badge
          color={SUBCATEGORY_COLORS[data.fromCategory] as 'success' | 'warning' | 'error' | 'gray' | 'info'}
          size="xs"
          shape="squircle"
        >
          {SUBCATEGORY_LABELS[data.fromCategory]}
        </Badge>
      )

    case 'toCategory':
      if (!data.toCategory) {
        return <span className="text-tertiary text-xs">—</span>
      }
      return (
        <Badge
          color={SUBCATEGORY_COLORS[data.toCategory] as 'success' | 'warning' | 'error' | 'gray' | 'info'}
          size="xs"
          shape="squircle"
        >
          {SUBCATEGORY_LABELS[data.toCategory]}
        </Badge>
      )

    case 'usageTier':
      return <UsageTierDot tier={data.usageTier} />

    case 'lastOccurred':
      return (
        <span className="text-tertiary text-xs tabular-nums">
          {formatDate(data.lastOccurred)}
        </span>
      )

    default:
      return null
  }
}
