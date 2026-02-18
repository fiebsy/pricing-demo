/**
 * Cell Renderers for Status Audit Tables
 *
 * Renders cells based on column type for both statuses and transitions.
 */

'use client'

import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { StatusRow, TransitionRow } from '../config/types'

// =============================================================================
// CATEGORY BADGE COLORS
// =============================================================================

const CATEGORY_COLORS: Record<string, 'success' | 'warning' | 'error' | 'gray' | 'info'> = {
  HEALTHY: 'success',
  AT_RISK: 'warning',
  OTHER_ACTIVE: 'info',
  LOST_PENDING: 'error',
  COMPLETED: 'success',
  SETTLED: 'gray',
  OTHER_CLOSED: 'gray',
  NEVER_STARTED: 'gray',
}

const CHANGE_CATEGORY_COLORS: Record<string, 'success' | 'warning' | 'error' | 'gray' | 'info'> = {
  PROGRESSION: 'success',
  ESCALATION: 'warning',
  RECOVERY: 'success',
  SETTLEMENT: 'info',
  OSCILLATION: 'gray',
  ADMINISTRATIVE: 'gray',
}

const ORDER_TYPE_COLORS: Record<string, 'success' | 'warning' | 'error' | 'gray' | 'info'> = {
  FUNDING: 'info',
  SERVICING: 'warning',
  BOTH: 'gray',
}

// =============================================================================
// STATUS CELL RENDERER
// =============================================================================

export function renderStatusCell(
  columnKey: string,
  row: Record<string, unknown>
): ReactNode {
  const data = row as unknown as StatusRow

  switch (columnKey) {
    case 'code':
      return (
        <span
          className={`font-mono text-[11px] ${
            data.is_ignorable ? 'text-tertiary' : 'text-secondary'
          }`}
        >
          {data.code}
        </span>
      )

    case 'badge_label':
      return (
        <span
          className={`text-sm ${
            data.is_ignorable ? 'text-tertiary' : 'text-primary'
          }`}
        >
          {data.badge_label}
        </span>
      )

    case 'stage':
      return (
        <span className="text-secondary text-xs">{data.stage}</span>
      )

    case 'category':
      return (
        <Badge
          color={CATEGORY_COLORS[data.subcategory] || 'gray'}
          size="xs"
          shape="squircle"
        >
          {data.subcategory.replace(/_/g, ' ')}
        </Badge>
      )

    case 'order_type':
      return (
        <Badge
          color={ORDER_TYPE_COLORS[data.order_type] || 'gray'}
          size="xs"
          shape="squircle"
        >
          {data.order_type}
        </Badge>
      )

    case 'is_ignorable':
      return (
        <span className={data.is_ignorable ? 'text-tertiary' : 'text-success'}>
          {data.is_ignorable ? '✗' : '✓'}
        </span>
      )

    case 'sentence_desc':
    case 'user_facing_desc':
    case 'technical_desc':
    case 'short_label':
    case 'ignorable_reason':
    case 'duration_expectation':
    case 'next_steps': {
      const value = data[columnKey as keyof StatusRow] as string
      return (
        <span
          className={`text-xs leading-relaxed ${
            data.is_ignorable ? 'text-tertiary' : 'text-secondary'
          }`}
        >
          {value || '—'}
        </span>
      )
    }

    default:
      return null
  }
}

// =============================================================================
// TRANSITION CELL RENDERER
// =============================================================================

/**
 * Factory function to create a transition cell renderer with status label lookup.
 */
export function createTransitionCellRenderer(
  statusLabelMap: Map<string, string>
) {
  return function renderTransitionCell(
    columnKey: string,
    row: Record<string, unknown>
  ): ReactNode {
    const data = row as unknown as TransitionRow

    switch (columnKey) {
      case 'from_code': {
        const badgeLabel = statusLabelMap.get(data.from_code) || ''
        return (
          <div className="flex flex-col gap-0.5">
            <span
              className={`font-mono text-[11px] ${
                data.is_ignorable ? 'text-tertiary' : 'text-secondary'
              }`}
            >
              {data.from_code}
            </span>
            {badgeLabel && (
              <span className="text-tertiary text-[10px]">{badgeLabel}</span>
            )}
          </div>
        )
      }

      case 'to_code': {
        const badgeLabel = statusLabelMap.get(data.to_code) || ''
        return (
          <div className="flex flex-col gap-0.5">
            <span
              className={`font-mono text-[11px] ${
                data.is_ignorable ? 'text-tertiary' : 'text-secondary'
              }`}
            >
              {data.to_code}
            </span>
            {badgeLabel && (
              <span className="text-tertiary text-[10px]">{badgeLabel}</span>
            )}
          </div>
        )
      }

      case 'frequency':
        return (
          <span
            className={`font-mono text-sm tabular-nums ${
              data.is_ignorable ? 'text-tertiary' : 'text-primary'
            }`}
          >
            {data.frequency.toLocaleString()}
          </span>
        )

      case 'change_category':
        return (
          <Badge
            color={CHANGE_CATEGORY_COLORS[data.change_category] || 'gray'}
            size="xs"
            shape="squircle"
          >
            {data.change_category}
          </Badge>
        )

      case 'coverage':
        return (
          <span
            className={`text-xs ${
              data.coverage === 'specific' ? 'text-success' : 'text-info'
            }`}
          >
            {data.coverage}
          </span>
        )

      case 'is_ignorable':
        return (
          <span className={data.is_ignorable ? 'text-tertiary' : 'text-success'}>
            {data.is_ignorable ? '✗' : '✓'}
          </span>
        )

      case 'sentence_desc':
      case 'user_facing_desc':
      case 'technical_desc': {
        const value = data[columnKey as keyof TransitionRow] as string
        return (
          <span
            className={`text-xs leading-relaxed ${
              data.is_ignorable ? 'text-tertiary' : 'text-secondary'
            }`}
          >
            {value || '—'}
          </span>
        )
      }

      default:
        return null
    }
  }
}
