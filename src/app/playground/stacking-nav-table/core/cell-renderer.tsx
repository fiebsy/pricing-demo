/**
 * Stacking Nav + Table Playground - Cell Renderer
 *
 * Badge-heavy cell rendering for the corporate directory table.
 */

'use client'

import React from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { BadgeColor } from '@/components/ui/core/primitives/badge'
import type { Employee } from '../config/types'
import { EmployeeStatus, SeniorityLevel, PerformanceRating } from '../config/types'
import { formatCurrency, formatDate } from '../utils/formatters'

// =============================================================================
// COLOR MAPS
// =============================================================================

const COMPANY_COLORS: Record<string, BadgeColor> = {
  'Acme Corp': 'brand',
  Globex: 'info',
  Initech: 'success',
}

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

const LEVEL_COLORS: Record<SeniorityLevel, BadgeColor> = {
  [SeniorityLevel.Junior]: 'gray',
  [SeniorityLevel.Mid]: 'info',
  [SeniorityLevel.Senior]: 'success',
  [SeniorityLevel.Lead]: 'brand',
  [SeniorityLevel.Director]: 'warning',
}

const LEVEL_LABELS: Record<SeniorityLevel, string> = {
  [SeniorityLevel.Junior]: 'Junior',
  [SeniorityLevel.Mid]: 'Mid',
  [SeniorityLevel.Senior]: 'Senior',
  [SeniorityLevel.Lead]: 'Lead',
  [SeniorityLevel.Director]: 'Director',
}

const PERFORMANCE_COLORS: Record<PerformanceRating, BadgeColor> = {
  [PerformanceRating.Exceeds]: 'success',
  [PerformanceRating.Meets]: 'info',
  [PerformanceRating.Developing]: 'warning',
  [PerformanceRating.New]: 'gray',
}

const PERFORMANCE_LABELS: Record<PerformanceRating, string> = {
  [PerformanceRating.Exceeds]: 'Exceeds',
  [PerformanceRating.Meets]: 'Meets',
  [PerformanceRating.Developing]: 'Develop',
  [PerformanceRating.New]: 'New',
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
    case 'employee':
      return (
        <div className="min-w-0">
          <div className="text-primary truncate text-sm font-medium">{item.name}</div>
          <div className="text-tertiary truncate text-xs">{item.email}</div>
        </div>
      )

    case 'role':
      return (
        <span className="text-primary truncate text-sm">{item.role}</span>
      )

    case 'company':
      return (
        <Badge size="xs" shape="rounded" color={COMPANY_COLORS[item.companyLabel] ?? 'gray'}>
          {item.companyLabel}
        </Badge>
      )

    case 'department':
      return (
        <Badge size="xs" shape="rounded" color="gray">
          {item.departmentLabel}
        </Badge>
      )

    case 'status':
      return (
        <Badge size="xs" shape="rounded" color={STATUS_COLORS[item.status]}>
          {STATUS_LABELS[item.status]}
        </Badge>
      )

    case 'level':
      return (
        <Badge size="xs" shape="rounded" color={LEVEL_COLORS[item.level]}>
          {LEVEL_LABELS[item.level]}
        </Badge>
      )

    case 'salary':
      return (
        <span className="text-primary tabular-nums text-sm">
          {formatCurrency(item.salary)}
        </span>
      )

    case 'review':
      return (
        <Badge size="xs" shape="rounded" color={PERFORMANCE_COLORS[item.performance]}>
          {PERFORMANCE_LABELS[item.performance]}
        </Badge>
      )

    case 'projects':
      return (
        <span className="text-primary tabular-nums text-sm">
          {item.projectCount}
        </span>
      )

    case 'startDate':
      return (
        <span className="text-tertiary text-sm">
          {formatDate(item.startDate)}
        </span>
      )

    default:
      return null
  }
}
