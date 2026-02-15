/**
 * Orders Chart - Custom Tooltip
 *
 * Styled tooltip component for Recharts matching the design system.
 */

interface TooltipPayload {
  value?: number | string
  color?: string
  dataKey?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
  color?: string
}

export function CustomTooltip({ active, payload, label, color }: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const value = payload[0]?.value
  const displayColor = color ?? payload[0]?.color ?? '#737373'

  return (
    <div className="rounded-lg border border-primary bg-secondary px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs text-tertiary">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className="size-2.5 rounded-full"
          style={{ backgroundColor: displayColor }}
        />
        <span className="text-sm font-medium text-primary">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        <span className="text-xs text-tertiary">orders</span>
      </div>
    </div>
  )
}
