/**
 * Stacking Nav + Table Playground - Cell Renderer
 *
 * Minimal cell rendering — badges only for status, muted text elsewhere.
 */

'use client'

import React from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { BadgeColor } from '@/components/ui/core/primitives/badge'
import type { Employee } from '../config/types'
import { EmployeeStatus, SeniorityLevel } from '../config/types'
import { formatCurrency } from '../utils/formatters'

// =============================================================================
// STATUS (only column that still uses badges)
// =============================================================================

const STATUS_COLORS: Record<EmployeeStatus, BadgeColor> = {
  [EmployeeStatus.Active]: 'success',
  [EmployeeStatus.OnLeave]: 'warning',
  [EmployeeStatus.Remote]: 'info',
  [EmployeeStatus.Contractor]: 'gray',
}

const STATUS_LABELS: Record<EmployeeStatus, string> = {
  [EmployeeStatus.Active]: 'Active',
  [EmployeeStatus.OnLeave]: 'On Leave',
  [EmployeeStatus.Remote]: 'Remote',
  [EmployeeStatus.Contractor]: 'Contract',
}

// =============================================================================
// LABEL MAPS (plain text)
// =============================================================================

const LEVEL_LABELS: Record<SeniorityLevel, string> = {
  [SeniorityLevel.Junior]: 'Junior',
  [SeniorityLevel.Mid]: 'Mid',
  [SeniorityLevel.Senior]: 'Senior',
  [SeniorityLevel.Lead]: 'Lead',
  [SeniorityLevel.Director]: 'Director',
}

// =============================================================================
// HELPERS
// =============================================================================

/** "Paul Ramirez" → "Paul R." */
function formatShortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length < 2) return fullName
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}

// =============================================================================
// CELL RENDERER
// =============================================================================

export const renderCell = (
  columnKey: string,
  item: Employee,
  _index: number
): React.ReactNode => {
  switch (columnKey) {
    case 'employee': {
      const initial = item.name.charAt(0).toUpperCase()
      return (
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="bg-tertiary text-tertiary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium">
            {initial}
          </div>
          <span className="text-secondary truncate text-sm font-medium">
            {formatShortName(item.name)}
          </span>
        </div>
      )
    }

    case 'role':
      return (
        <span className="text-tertiary truncate text-sm">{item.role}</span>
      )

    case 'status':
      return (
        <Badge size="xs" shape="rounded" color={STATUS_COLORS[item.status]}>
          {STATUS_LABELS[item.status]}
        </Badge>
      )

    case 'level':
      return (
        <span className="text-tertiary truncate text-sm">{LEVEL_LABELS[item.level]}</span>
      )

    case 'salary':
      return (
        <span className="text-tertiary tabular-nums text-sm">
          {formatCurrency(item.salary)}
        </span>
      )

    default:
      return null
  }
}
