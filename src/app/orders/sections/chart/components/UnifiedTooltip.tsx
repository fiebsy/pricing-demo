/**
 * Unified Tooltip Component
 *
 * Tooltip for the UnifiedOrdersChart that handles both historical
 * and projected data points with appropriate labeling.
 */

interface TooltipPayload {
  value?: number | string | null
  color?: string
  dataKey?: string
  payload?: {
    active?: number | null
    projected?: number | null
    isFuture?: boolean
    label?: string
  }
}

interface UnifiedTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
  color?: string
}

export function UnifiedTooltip({ active, payload, label, color }: UnifiedTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  // Get the data point from payload
  const dataPoint = payload[0]?.payload

  // Determine value and label based on data type
  const isProjected = dataPoint?.isFuture ?? false
  const value = dataPoint?.active ?? dataPoint?.projected
  const displayLabel = isProjected ? 'Projected' : 'Active Orders'
  const displayColor = color ?? payload[0]?.color ?? '#737373'

  // Handle boundary point (has both active and projected)
  const isBoundary = dataPoint?.active !== null && dataPoint?.projected !== null

  if (value === null || value === undefined) {
    return null
  }

  return (
    <div className="rounded-lg border border-primary bg-secondary px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs text-tertiary">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className="size-2.5 rounded-full"
          style={{
            backgroundColor: displayColor,
            opacity: isProjected && !isBoundary ? 0.5 : 1,
          }}
        />
        <span className="text-sm font-medium text-primary">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        <span className="text-xs text-tertiary">
          {isBoundary ? 'orders (today)' : 'orders'}
        </span>
      </div>
      {isProjected && !isBoundary && (
        <p className="mt-1 text-2xs text-quaternary">Projected</p>
      )}
    </div>
  )
}
