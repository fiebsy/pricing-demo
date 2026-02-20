/**
 * PulsatingDot - Custom dot component for chart "Today" indicator
 *
 * Renders a pulsating ring effect at the boundary point between
 * historical and projected data to emphasize where "Today" is.
 */

import type { UnifiedDataPoint } from '../data/chart-data'

interface PulsatingDotProps {
  cx?: number
  cy?: number
  payload?: UnifiedDataPoint
  color: string
  showPulse: boolean
}

export function PulsatingDot({ cx, cy, payload, color, showPulse }: PulsatingDotProps) {
  if (cx === undefined || cy === undefined) return null

  // Only show on "Today" point (last historical point with both values)
  const isToday = payload && !payload.isFuture &&
                  payload.active !== null && payload.projected !== null

  if (!isToday) return null

  return (
    <g>
      {/* Pulsating ring (behind) */}
      {showPulse && (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill={color}
          className="animate-pulse-ring"
        />
      )}
      {/* Solid dot (front) */}
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={color}
        stroke="var(--color-bg-primary)"
        strokeWidth={2}
      />
    </g>
  )
}
