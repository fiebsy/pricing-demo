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
