/**
 * Status Cell Renderer
 *
 * Renders cells for the status organization table.
 */

'use client'

import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import { cn } from '@/lib/utils'
import type { StatusEntry, ViewMode, OrderSubcategory, MainState } from '../config/types'
import {
  SUBCATEGORY_CONFIG,
  MAIN_STATE_CONFIG,
  USAGE_TIER_STYLES,
} from '../config/badge-mapping'

// =============================================================================
// TYPES
// =============================================================================

interface StatusRowData extends StatusEntry {
  isFirstInGroup: boolean
  groupKey: OrderSubcategory | MainState
}

// =============================================================================
// USAGE DOT COMPONENT
// =============================================================================

function UsageDot({ tier }: { tier: 'high' | 'medium' | 'low' | 'stale' }) {
  const styles = USAGE_TIER_STYLES[tier]
  const labels: Record<string, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    stale: 'Stale',
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-2 w-2 shrink-0 rounded-full', styles.dot)} />
      <span className={cn('text-xs', styles.text)}>{labels[tier]}</span>
    </div>
  )
}

// =============================================================================
// CELL RENDERER FACTORY
// =============================================================================

export function createStatusCellRenderer(viewMode: ViewMode) {
  return function renderCell(
    columnKey: string,
    row: Record<string, unknown>
  ): ReactNode {
    const data = row as unknown as StatusRowData

    switch (columnKey) {
      case 'group': {
        if (!data.isFirstInGroup) {
          return null
        }

        if (viewMode === 'detailed') {
          const config = SUBCATEGORY_CONFIG[data.groupKey as OrderSubcategory]
          return (
            <Badge
              color={config.badgeColor}
              size="xs"
              shape="squircle"
            >
              {config.label}
            </Badge>
          )
        } else {
          const config = MAIN_STATE_CONFIG[data.groupKey as MainState]
          return (
            <Badge
              color={config.badgeColor}
              size="xs"
              shape="squircle"
            >
              {config.label}
            </Badge>
          )
        }
      }

      case 'statusCode':
        return (
          <span className="text-tertiary font-mono text-xs">
            {data.code}
          </span>
        )

      case 'displayLabel':
        return (
          <span className="text-secondary text-sm">
            {data.displayLabel}
          </span>
        )

      case 'badge':
        return (
          <Badge
            color={data.badgeColor}
            size="xs"
            shape="squircle"
          >
            {data.badgeColor}
          </Badge>
        )

      case 'usage':
        return <UsageDot tier={data.usageTier} />

      case 'count':
        return (
          <span className="text-primary font-mono text-sm tabular-nums">
            {data.count.toLocaleString()}
          </span>
        )

      default:
        return null
    }
  }
}
