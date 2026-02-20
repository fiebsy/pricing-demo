/**
 * Hook: useCalculatedFutureDays
 *
 * Auto-calculates future days based on viewport width to maintain
 * consistent visual proportions between historical and projected data.
 *
 * The calculation positions "Today" near the container edge (~50vw + 456px),
 * with future days filling the remaining space to the viewport edge.
 */

'use client'

import { useState, useEffect } from 'react'

/**
 * Calculate future days to fill remaining viewport space proportionally.
 *
 * @param viewportWidth - Current viewport width in pixels
 * @param historicalDays - Number of historical data points
 * @returns Number of future days to display
 */
function calculateFutureDays(viewportWidth: number, historicalDays: number): number {
  const containerMaxWidth = 960
  const containerPadding = 24 // px-6 = 24px
  const effectiveContainerWidth = containerMaxWidth - (containerPadding * 2) // 912px
  const halfContainer = effectiveContainerWidth / 2 // 456px

  // Container edge position (where "Today" should appear)
  const containerEdge = Math.min(viewportWidth / 2 + halfContainer, viewportWidth)
  const containerRatio = containerEdge / viewportWidth

  // Calculate future days to fill remaining space proportionally
  // historicalDays / totalDays = containerRatio
  // totalDays = historicalDays / containerRatio
  // futureDays = totalDays - historicalDays
  const totalPoints = Math.ceil(historicalDays / containerRatio)
  const futureDays = totalPoints - historicalDays

  // Clamp to reasonable range (1-14 days)
  return Math.max(1, Math.min(futureDays, 14))
}

/**
 * Hook to calculate future days based on viewport width.
 *
 * @param historicalDays - Number of historical data points (default: 30)
 * @returns Number of future days to display
 */
export function useCalculatedFutureDays(historicalDays: number = 30): number {
  const [futureDays, setFutureDays] = useState(7) // sensible default

  useEffect(() => {
    const calculate = () => {
      const vw = window.innerWidth
      setFutureDays(calculateFutureDays(vw, historicalDays))
    }

    // Initial calculation
    calculate()

    // Recalculate on resize
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [historicalDays])

  return futureDays
}
