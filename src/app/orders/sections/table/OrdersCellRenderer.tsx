/**
 * Orders Page - Cell Renderer
 *
 * Renders cells for the orders table columns.
 */

import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import FlashIcon from '@hugeicons-pro/core-stroke-rounded/FlashIcon'
import type { OrderRecord } from '../../types'

// =============================================================================
// CUSTOMER AVATAR
// =============================================================================

/** Get initials from customer name (e.g., "Aaron Amezola" -> "AA") */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function CustomerAvatar({ name }: { name: string }) {
  const initials = getInitials(name)

  return (
    <div className="bg-tertiary text-tertiary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium">
      {initials}
    </div>
  )
}

// =============================================================================
// TYPE BADGE CONFIG
// =============================================================================

type BadgeColor = 'success' | 'warning' | 'gray' | 'error' | 'info' | 'brand'

const TYPE_COLORS: Record<string, BadgeColor> = {
  Active: 'success',
  Closed: 'gray',
}

// =============================================================================
// STATUS BADGE CONFIG
// =============================================================================

const STATUS_COLORS: Record<string, BadgeColor> = {
  // Active statuses
  'Healthy': 'success',
  'At Risk': 'warning',
  'Low Risk': 'info',
  'Medium Risk': 'warning',
  'High Risk': 'error',
  // Closed statuses
  'Completed': 'gray',
  'Clawback': 'error',
  'Default': 'error',
  'Chargeback': 'error',
  'Canceled': 'gray',
  'Declined': 'gray',
}

// =============================================================================
// CELL RENDERER
// =============================================================================

type CellRenderer = (
  columnKey: string,
  row: Record<string, unknown>,
  index: number
) => ReactNode

export function createRenderCell(): CellRenderer {
  return (columnKey: string, row: Record<string, unknown>): ReactNode => {
    const record = row as unknown as OrderRecord

    switch (columnKey) {
      case 'customer':
        return (
          <div className="flex items-center gap-3 min-w-0">
            <CustomerAvatar name={record.customer} />
            <span className="text-primary truncate text-sm font-medium">
              {record.customer}
            </span>
          </div>
        )

      case 'order':
        return (
          <span className="text-tertiary font-mono text-sm">
            #{record.order}
          </span>
        )

      case 'route':
        return (
          <Badge
            size="xs"
            shape="rounded"
            color="gray"
            iconLeading={FlashIcon}
          >
            {record.route}
          </Badge>
        )

      case 'plan':
        return (
          <span className="text-tertiary text-xs">
            {record.plan}
          </span>
        )

      case 'type': {
        const isActive = record.type === 'Active'
        const dotColor = isActive ? 'bg-success-500' : 'bg-quaternary'
        return (
          <Badge
            color="gray"
            size="xs"
            shape="squircle"
            style="default"
            className={isActive ? '' : 'opacity-70'}
          >
            <span className="flex items-center gap-1">
              <span className={`size-1.5 shrink-0 rounded-full ${dotColor}`} />
              {record.type}
            </span>
          </Badge>
        )
      }

      case 'status':
        return (
          <Badge
            color={STATUS_COLORS[record.displayStatus] || 'gray'}
            size="xs"
            shape="squircle"
            style="default"
          >
            {record.displayStatus}
          </Badge>
        )

      default:
        return null
    }
  }
}
