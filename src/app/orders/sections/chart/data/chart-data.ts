/**
 * Orders Chart - Data Generation
 *
 * Generates time-series data for the orders chart.
 * Uses seeded random for deterministic output.
 */

import type { OrderRecord, StackMode } from '../../../types'

export interface ChartDataPoint {
  date: string      // ISO date (e.g., "2024-01-15")
  label: string     // Display label (e.g., "Jan 15")
  active: number    // Count of active orders
  atRisk: number    // Count of at-risk orders
  healthy: number   // Count of healthy orders
  completed: number // Count of completed orders
}

export interface StackedSeries {
  label: string
  data: number[]
  color: string
}

// Seeded PRNG for deterministic data
function createSeededRandom(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/**
 * Generate 30 days of order activity data.
 * Creates realistic-looking trends with some variance.
 */
export function generateChartData(orders: OrderRecord[]): ChartDataPoint[] {
  const seededRandom = createSeededRandom(12345)
  const data: ChartDataPoint[] = []

  // Calculate base metrics from actual data
  const baseActive = orders.filter(o => o.category === 'active').length
  const baseAtRisk = orders.filter(o => o.status === 'at-risk').length
  const baseHealthy = baseActive - baseAtRisk
  const baseCompleted = orders.filter(o => o.status === 'completed').length

  // Generate 30 days of historical data
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const dateStr = date.toISOString().split('T')[0]
    const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    // Create variance around base values
    // More recent days trend toward actual values
    const timeFactor = (30 - i) / 30 // 0 to 1 as we approach today
    const variance = () => (seededRandom() - 0.5) * 0.4 // +/- 20%

    // Active orders trend (with some growth pattern)
    const activeVariance = 1 + variance() * (1 - timeFactor * 0.5)
    const active = Math.round(baseActive * activeVariance * (0.85 + timeFactor * 0.15))

    // At-risk follows active with some delay
    const atRiskVariance = 1 + variance() * (1 - timeFactor * 0.3)
    const atRisk = Math.round(baseAtRisk * atRiskVariance * (0.7 + timeFactor * 0.3))

    // Healthy is derived
    const healthy = Math.max(0, active - atRisk)

    // Completed shows gradual accumulation
    const completedVariance = 1 + variance() * 0.5
    const completed = Math.round(baseCompleted * completedVariance * (0.6 + timeFactor * 0.4))

    data.push({
      date: dateStr,
      label,
      active,
      atRisk,
      healthy,
      completed,
    })
  }

  return data
}

/**
 * Get primary data series (active orders count).
 */
export function getPrimaryData(chartData: ChartDataPoint[]): number[] {
  return chartData.map(d => d.active)
}

/**
 * Get data transformed for stacking by dimension.
 */
export function getStackedData(
  chartData: ChartDataPoint[],
  stackMode: StackMode
): StackedSeries[] {
  if (stackMode === 'none') {
    return [{
      label: 'Active Orders',
      data: chartData.map(d => d.active),
      color: 'var(--color-chart-1)',
    }]
  }

  if (stackMode === 'status') {
    return [
      {
        label: 'Healthy',
        data: chartData.map(d => d.healthy),
        color: 'var(--color-success-500)',
      },
      {
        label: 'At Risk',
        data: chartData.map(d => d.atRisk),
        color: 'var(--color-warning-500)',
      },
    ]
  }

  // For plan/route stacking, generate synthetic proportional data
  // In a real app, this would come from actual grouped data
  if (stackMode === 'plan') {
    return [
      {
        label: 'PAC',
        data: chartData.map(d => Math.round(d.active * 0.6)),
        color: 'var(--color-chart-1)',
      },
      {
        label: 'Upfront',
        data: chartData.map(d => Math.round(d.active * 0.4)),
        color: 'var(--color-chart-2)',
      },
    ]
  }

  if (stackMode === 'route') {
    return [
      {
        label: 'AutoRoute',
        data: chartData.map(d => Math.round(d.active * 0.7)),
        color: 'var(--color-chart-1)',
      },
      {
        label: 'Off',
        data: chartData.map(d => Math.round(d.active * 0.3)),
        color: 'var(--color-chart-3)',
      },
    ]
  }

  return []
}

/**
 * Get labels for X axis.
 */
export function getChartLabels(chartData: ChartDataPoint[]): string[] {
  return chartData.map(d => d.label)
}

// =============================================================================
// FUTURE DATA GENERATION
// =============================================================================

export interface FutureDataPoint {
  date: string      // ISO date (e.g., "2024-01-15")
  label: string     // Display label (e.g., "Jan 15")
  projected: number // Projected/interpolated value
}

// =============================================================================
// UNIFIED DATA STRUCTURE (for single ComposedChart approach)
// =============================================================================

export interface UnifiedDataPoint {
  index: number              // Sequential: 0 to (historical + future - 1)
  date: string               // ISO date
  label: string              // Display label
  active: number | null      // Historical value (null for future points)
  projected: number | null   // Future value (null for historical points)
  isFuture: boolean          // Flag for styling/tooltip
}

/**
 * Generate future data points from today onward.
 * Uses simple trend extrapolation from historical data with some variance.
 */
export function generateFutureData(
  historicalData: ChartDataPoint[],
  futureDays: number
): FutureDataPoint[] {
  if (futureDays <= 0 || historicalData.length === 0) {
    return []
  }

  const seededRandom = createSeededRandom(67890) // Different seed for future data
  const data: FutureDataPoint[] = []

  // Get trend from last 7 days of historical data
  const recentData = historicalData.slice(-7)
  const firstValue = recentData[0]?.active ?? 0
  const lastValue = recentData[recentData.length - 1]?.active ?? 0
  const dailyTrend = (lastValue - firstValue) / Math.max(recentData.length - 1, 1)

  // Start from the day after the last historical point
  const today = new Date()

  for (let i = 1; i <= futureDays; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    const dateStr = date.toISOString().split('T')[0]
    const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    // Project forward with some variance
    // Variance increases as we go further into the future
    const timeFactor = i / futureDays
    const variance = (seededRandom() - 0.5) * 0.15 * (1 + timeFactor)

    // Apply trend with dampening over time
    const trendContribution = dailyTrend * i * (1 - timeFactor * 0.3)
    const baseValue = lastValue + trendContribution
    const projected = Math.max(0, Math.round(baseValue * (1 + variance)))

    data.push({
      date: dateStr,
      label,
      projected,
    })
  }

  return data
}

// =============================================================================
// UNIFIED DATA GENERATION
// =============================================================================

/**
 * Generate unified chart data merging historical and future points.
 *
 * Creates a single dataset where:
 * - Historical points have `active` value, `projected` is null
 * - Future points have `projected` value, `active` is null
 * - The last historical point has BOTH values to create a connected transition
 *
 * This enables a single ComposedChart with two Area components and unified tooltip.
 */
export function generateUnifiedChartData(
  historical: ChartDataPoint[],
  future: FutureDataPoint[]
): UnifiedDataPoint[] {
  const unified: UnifiedDataPoint[] = []

  // Historical points
  historical.forEach((d, i) => {
    const isLastHistorical = i === historical.length - 1
    unified.push({
      index: i,
      date: d.date,
      label: d.label,
      active: d.active,
      // Connect at boundary: last historical point also has projected value
      projected: isLastHistorical ? d.active : null,
      isFuture: false,
    })
  })

  // Future points
  future.forEach((d, i) => {
    unified.push({
      index: historical.length + i,
      date: d.date,
      label: d.label,
      active: null,
      projected: d.projected,
      isFuture: true,
    })
  })

  return unified
}
