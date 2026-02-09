/**
 * Employee Variant — Corporate Directory
 *
 * Self-contained data variant with ~78 employees across
 * Dunder Mifflin, Stark Industries, and Pied Piper.
 *
 * 3-level nav: Company → Role → Status
 */

'use client'

import React from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { BadgeColor } from '@/components/ui/core/primitives/badge'
import type { ReactNode } from 'react'
import type { StackItem, ActivePath } from '@/components/ui/features/stacking-nav'
import type { ColumnConfig } from '@/components/ui/patterns/data-table'
import { type Employee, EmployeeStatus } from '../config/types'
import type { SparklineConfig, BarSparklineConfig, ChartType, BarColorMode, ChartColorId, StatusColorId } from './cell-renderer'

// Chart color CSS variable mapping (duplicated from cell-renderer for employee variant)
const CHART_COLORS: Record<ChartColorId, string> = {
  '1': 'var(--color-chart-1)',
  '2': 'var(--color-chart-2)',
  '3': 'var(--color-chart-3)',
  '4': 'var(--color-chart-4)',
}

// Bar status color CSS variable mapping
const BAR_STATUS_COLORS: Record<StatusColorId, string> = {
  'neutral': 'var(--color-fg-quaternary)',
  'neutral-dark': 'var(--color-fg-tertiary)',
  'success': 'var(--color-success-500)',
  'error': 'var(--color-error-500)',
  'warning': 'var(--color-warning-500)',
  'chart-1': 'var(--color-chart-1)',
  'chart-2': 'var(--color-chart-2)',
  'chart-3': 'var(--color-chart-3)',
  'chart-4': 'var(--color-chart-4)',
}

function getBarColor(
  mode: BarColorMode,
  chartColor: ChartColorId,
  positiveColor: StatusColorId,
  _negativeColor: StatusColorId,
  _isPositive: boolean
): string {
  switch (mode) {
    case 'status':
      // For unsigned employee data, always use positive color (activity is always positive)
      return BAR_STATUS_COLORS[positiveColor]
    case 'chart':
      return CHART_COLORS[chartColor]
    case 'neutral':
    default:
      return 'var(--color-fg-quaternary)'
  }
}

function getLineColor(
  mode: BarColorMode,
  chartColor: ChartColorId,
  statusColor: StatusColorId
): string {
  switch (mode) {
    case 'status':
      return BAR_STATUS_COLORS[statusColor]
    case 'chart':
      return CHART_COLORS[chartColor]
    case 'neutral':
    default:
      return 'var(--color-fg-tertiary)'
  }
}

// =============================================================================
// SEEDED RANDOM
// =============================================================================

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

const randomFromArray = <T,>(arr: T[], seed: number): T => {
  const index = Math.floor(seededRandom(seed) * arr.length)
  return arr[index]
}

const randomInRange = (min: number, max: number, seed: number): number =>
  min + seededRandom(seed) * (max - min)

// =============================================================================
// DATA CONSTANTS
// =============================================================================

const FIRST_NAMES = [
  'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
  'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
]

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
]

const ROLES = ['Engineer', 'Designer', 'Manager', 'Analyst']

const STATUSES = [
  EmployeeStatus.Active, EmployeeStatus.Active, EmployeeStatus.Active, EmployeeStatus.Active,
  EmployeeStatus.Remote, EmployeeStatus.Remote,
  EmployeeStatus.OnLeave,
  EmployeeStatus.Contractor,
]

interface CompanyDef {
  id: string
  label: string
  emailDomain: string
  headcount: number
}

const COMPANIES: CompanyDef[] = [
  { id: 'dunder-mifflin', label: 'Dunder Mifflin', emailDomain: 'dundermifflin.com', headcount: 28 },
  { id: 'stark', label: 'Stark Industries', emailDomain: 'starkindustries.io', headcount: 26 },
  { id: 'pied-piper', label: 'Pied Piper', emailDomain: 'piedpiper.com', headcount: 24 },
]

// =============================================================================
// DATA GENERATOR
// =============================================================================

function generateEmployees(): Employee[] {
  const employees: Employee[] = []
  let idx = 0

  for (const company of COMPANIES) {
    for (let i = 0; i < company.headcount; i++) {
      const seed = idx * 100 + i * 13 + 1
      const firstName = randomFromArray(FIRST_NAMES, seed)
      const lastName = randomFromArray(LAST_NAMES, seed + 1)
      const name = `${firstName} ${lastName}`
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.emailDomain}`
      const role = randomFromArray(ROLES, seed + 2)
      const status = randomFromArray(STATUSES, seed + 3)

      // 30-day activity trend
      const trend: number[] = []
      let trendVal = randomInRange(30, 70, seed + 9)
      for (let d = 0; d < 30; d++) {
        const delta = randomInRange(-8, 10, seed + 100 + d)
        trendVal = Math.max(5, Math.min(100, trendVal + delta))
        trend.push(Math.round(trendVal))
      }

      employees.push({
        id: 1000 + idx,
        name,
        email,
        role,
        company: company.id,
        companyLabel: company.label,
        status,
        trend,
      })

      idx++
    }
  }

  return employees
}

// Lazy singleton
let _employees: Employee[] | null = null
function getEmployees(): Employee[] {
  if (!_employees) _employees = generateEmployees()
  return _employees
}

export const EMPLOYEE_DATA: Employee[] = new Proxy([] as Employee[], {
  get(target, prop) {
    return Reflect.get(getEmployees(), prop)
  },
  set(target, prop, value) {
    return Reflect.set(getEmployees(), prop, value)
  },
})

// =============================================================================
// NAV ITEMS
// =============================================================================

const STATUS_CHILDREN: StackItem[] = [
  { id: EmployeeStatus.Active, label: 'Active' },
  { id: EmployeeStatus.Remote, label: 'Remote' },
  { id: EmployeeStatus.OnLeave, label: 'On Leave' },
  { id: EmployeeStatus.Contractor, label: 'Contract' },
]

const ROLE_CHILDREN: StackItem[] = [
  { id: 'Engineer', label: 'Engineer', children: STATUS_CHILDREN },
  { id: 'Designer', label: 'Designer', children: STATUS_CHILDREN },
  { id: 'Manager', label: 'Manager', children: STATUS_CHILDREN },
  { id: 'Analyst', label: 'Analyst', children: STATUS_CHILDREN },
]

export const EMPLOYEE_NAV_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  { id: 'dunder-mifflin', label: 'Dunder Mifflin', children: ROLE_CHILDREN },
  { id: 'stark', label: 'Stark Industries', children: ROLE_CHILDREN },
  { id: 'pied-piper', label: 'Pied Piper', children: ROLE_CHILDREN },
]

// =============================================================================
// COLUMNS
// =============================================================================

export const EMPLOYEE_COLUMNS: ColumnConfig[] = [
  { key: 'employee', width: 150, align: 'left', sortable: false, isSticky: true, stickyLeft: 0 },
  { key: 'role', width: 110, align: 'left', sortable: false },
  { key: 'status', width: 90, align: 'center', sortable: false },
  { key: 'company', width: 130, align: 'left', sortable: false },
  { key: 'trend', width: 140, align: 'center', sortable: false },
]

export const EMPLOYEE_COLUMN_LABELS: Record<string, ReactNode> = {
  employee: 'Employee',
  role: 'Role',
  status: 'Status',
  company: 'Company',
  trend: (<>Activity <span className="opacity-60">30d</span></>),
}

export const EMPLOYEE_DEFAULT_COLUMN_ORDER = ['employee', 'role', 'status', 'company', 'trend']

// =============================================================================
// STATUS BADGE COLORS
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
// SPARKLINE (duplicated to avoid touching character files)
// =============================================================================

const SPARK_W = 100
const SPARK_PAD = 2

function Sparkline({ data, config }: { data: number[]; config: SparklineConfig }) {
  const gradientId = React.useId()
  if (!data.length) return null

  const h = config.height
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = SPARK_PAD + (i / (data.length - 1)) * (SPARK_W - SPARK_PAD * 2)
    const y = SPARK_PAD + (1 - (v - min) / range) * (h - SPARK_PAD * 2)
    return [x, y] as const
  })

  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ')
  const firstX = points[0][0]
  const lastX = points[points.length - 1][0]
  const areaPath = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
    + ` L${lastX},${h} L${firstX},${h} Z`
  const lastPt = points[points.length - 1]

  return (
    <svg width={SPARK_W} height={h} viewBox={`0 0 ${SPARK_W} ${h}`} className="block text-tertiary">
      {config.showFill && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.15} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} />
        </>
      )}
      <polyline points={polyline} fill="none" stroke="currentColor" strokeWidth={config.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {config.showDot && (
        <circle cx={lastPt[0]} cy={lastPt[1]} r={Math.max(1.5, config.strokeWidth)} fill="currentColor" />
      )}
    </svg>
  )
}

/**
 * Bar sparkline for employee activity (unsigned: 0-100).
 * Configurable colors with optional trend line overlay.
 */
function BarSparkline({ data, config }: { data: number[]; config: BarSparklineConfig }) {
  const trendGradientId = React.useId()
  if (!data.length) return null

  const h = config.height
  const min = 0
  const max = 100
  const range = max - min

  // Calculate bar width based on data points and gap
  const availableWidth = SPARK_W - SPARK_PAD * 2
  const totalGaps = (data.length - 1) * config.gap
  const barWidth = Math.max(1, (availableWidth - totalGaps) / data.length)

  // Convert data to bar positions (unsigned, bars grow from bottom)
  const bars = data.map((v, i) => {
    const x = SPARK_PAD + i * (barWidth + config.gap)
    const normalizedValue = (v - min) / range
    const barHeight = normalizedValue * (h - SPARK_PAD * 2)
    const y = h - SPARK_PAD - barHeight

    return { x, y, width: barWidth, height: barHeight, value: v }
  })

  // Build trend line path for overlay
  const buildSmoothPath = (points: readonly (readonly [number, number])[]): string => {
    if (points.length < 2) return ''
    if (points.length === 2) {
      return `M${points[0][0]},${points[0][1]} L${points[1][0]},${points[1][1]}`
    }

    const path: string[] = [`M${points[0][0]},${points[0][1]}`]
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[Math.min(points.length - 1, i + 2)]

      const tension = 0.35
      const cp1x = p1[0] + (p2[0] - p0[0]) * tension
      const cp1y = p1[1] + (p2[1] - p0[1]) * tension
      const cp2x = p2[0] - (p3[0] - p1[0]) * tension
      const cp2y = p2[1] - (p3[1] - p1[1]) * tension

      path.push(`C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`)
    }
    return path.join(' ')
  }

  const trendPoints = data.map((v, i) => {
    const x = SPARK_PAD + i * (barWidth + config.gap) + barWidth / 2
    const normalizedValue = (v - min) / range
    const y = h - SPARK_PAD - normalizedValue * (h - SPARK_PAD * 2)
    return [x, y] as const
  })
  const trendPath = buildSmoothPath(trendPoints)

  // Get trend line color based on mode
  const trendLineColor = getLineColor(
    config.trendLineColorMode,
    config.trendLineChartColor,
    config.trendLineStatusColor
  )

  // Get baseline color based on mode
  const baselineColor = getLineColor(
    config.baselineColorMode,
    config.baselineChartColor,
    config.baselineStatusColor
  )

  return (
    <svg width={SPARK_W} height={h} viewBox={`0 0 ${SPARK_W} ${h}`} className="block">
      <defs>
        {config.showTrendLine && (
          <linearGradient id={trendGradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={trendLineColor} stopOpacity={config.trendLineOpacity * 0.5} />
            <stop offset="50%" stopColor={trendLineColor} stopOpacity={config.trendLineOpacity} />
            <stop offset="100%" stopColor={trendLineColor} stopOpacity={config.trendLineOpacity * 0.5} />
          </linearGradient>
        )}
      </defs>

      {/* Bars */}
      {bars.map((bar, i) => (
        <g key={i}>
          {/* Main bar body */}
          <rect
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height || 0.5}
            rx={Math.min(config.radius, bar.width / 2)}
            ry={Math.min(config.radius, bar.width / 2)}
            fill={getBarColor(config.colorMode, config.chartColor, config.positiveColor, config.negativeColor, true)}
            opacity={config.opacity}
          />

          {/* Tip accent (always on top for unsigned data) */}
          {config.showTips && bar.height > config.tipSize && (
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={config.tipSize}
              rx={Math.min(config.radius, bar.width / 2)}
              ry={Math.min(config.radius, bar.width / 2)}
              fill={getBarColor(config.tipColorMode, config.tipChartColor, config.tipPositiveColor, config.tipNegativeColor, true)}
              opacity={0.9}
            />
          )}
        </g>
      ))}

      {/* Trend line overlay */}
      {config.showTrendLine && trendPath && (
        <path
          d={trendPath}
          fill="none"
          stroke={`url(#${trendGradientId})`}
          strokeWidth={config.trendLineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Bottom baseline */}
      {config.showBaseline && (
        <line
          x1={SPARK_PAD}
          y1={h - SPARK_PAD}
          x2={SPARK_W - SPARK_PAD}
          y2={h - SPARK_PAD}
          stroke={baselineColor}
          strokeWidth={config.baselineWidth}
          strokeOpacity={config.baselineOpacity}
        />
      )}
    </svg>
  )
}

// =============================================================================
// CELL RENDERER
// =============================================================================

/** "Paul Ramirez" → "Paul R." */
function formatShortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length < 2) return fullName
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}

export function createEmployeeRenderCell(
  sparklineConfig: SparklineConfig,
  chartType: ChartType = 'line',
  barConfig?: BarSparklineConfig
) {
  return (columnKey: string, item: Employee, _index: number): React.ReactNode => {
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
        return <span className="text-tertiary truncate text-sm">{item.role}</span>
      case 'status':
        return (
          <Badge size="xs" shape="rounded" color={STATUS_COLORS[item.status]}>
            {STATUS_LABELS[item.status]}
          </Badge>
        )
      case 'company':
        return <span className="text-tertiary truncate text-sm">{item.companyLabel}</span>
      case 'trend':
        if (chartType === 'bar' && barConfig) {
          return <BarSparkline data={item.trend} config={barConfig} />
        }
        return <Sparkline data={item.trend} config={sparklineConfig} />
      default:
        return null
    }
  }
}

// =============================================================================
// FILTER
// =============================================================================

export function filterEmployeesByPath(employees: Employee[], path: ActivePath): Employee[] {
  if (path.length === 0 || path[0] === 'all') return employees

  let filtered = employees.filter((e) => e.company === path[0])

  if (path.length >= 2) {
    filtered = filtered.filter((e) => e.role === path[1])
  }

  if (path.length >= 3) {
    filtered = filtered.filter((e) => e.status === (path[2] as EmployeeStatus))
  }

  return filtered
}
