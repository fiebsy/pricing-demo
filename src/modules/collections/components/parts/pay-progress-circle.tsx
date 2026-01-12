/**
 * Pay Progress Circle Component
 *
 * Displays a circular progress pie chart showing the amount paid out.
 * Uses semantic tokens for neutral colors that adapt to dark mode.
 */

'use client'

import { Tooltip } from '@/components/ui/prod/base/tooltip'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import { formatAmount } from '../../utils/formatters'
import { cn } from '@/lib/utils'

/**
 * Format a number in compact notation with dollar sign (e.g., $2.02M, $500K)
 */
const formatCompactAmount = (amount: number, reduceDecimals = false): string => {
  if (amount >= 1_000_000) {
    const decimals = reduceDecimals ? 1 : 2
    return `$${(amount / 1_000_000).toFixed(decimals)}M`
  }
  if (amount >= 1_000) {
    const decimals = reduceDecimals ? 1 : 2
    return `$${(amount / 1_000).toFixed(decimals)}K`
  }
  const decimals = reduceDecimals ? 1 : 2
  return `$${amount.toFixed(decimals)}`
}

interface PayProgressCircleProps {
  /** Amount paid out */
  amountPaid: number
  /** Total amount (plan total) */
  totalAmount: number
  /** Size of the circle in pixels (default: 28) */
  size?: number
  /** Stroke width in pixels (default: 3) */
  strokeWidth?: number
  /** Stroke color (CSS variable or hex) - default: brand primary */
  strokeColor?: string
  /** Background color (CSS variable or hex) - default: quaternary */
  backgroundColor?: string
  /** Percentage format: 'number' shows just number, 'percentage' shows with % */
  percentageFormat?: 'number' | 'percentage'
  /** Font size for percentage text inside circle (auto-calculated if undefined) */
  textSize?: number
  /** Scale multiplier for text size (default: 1.0) */
  textSizeScale?: number
  /** Show checkmark icon instead of "100" at 100% completion */
  showCheckmarkAt100?: boolean
  /** Show amount text outside circle */
  showAmountText?: boolean
  /** Show percentage text inside circle (default: true) */
  showPercentageText?: boolean
  /** Optional className for the container */
  className?: string
  /** Override percentage (0-100) for direct control */
  percentageOverride?: number
}

export const PayProgressCircle = ({
  amountPaid,
  totalAmount,
  size = 28,
  strokeWidth = 3,
  strokeColor = 'var(--color-fg-brand-primary)',
  backgroundColor = 'var(--color-bg-quaternary)',
  percentageFormat = 'number',
  textSize,
  textSizeScale = 1.0,
  showCheckmarkAt100 = false,
  showAmountText = false,
  showPercentageText = true,
  className,
  percentageOverride,
}: PayProgressCircleProps) => {
  // Use percentage override if provided, otherwise calculate from amountPaid/totalAmount
  const calculatedPercentage = totalAmount > 0 ? (amountPaid / totalAmount) * 100 : 0
  const percentage = percentageOverride !== undefined ? percentageOverride : calculatedPercentage
  const clampedPercentage = Math.max(0, Math.min(100, percentage))
  const isComplete = clampedPercentage >= 100

  // Determine what to show inside the circle
  const showCheckmark = showCheckmarkAt100 && isComplete
  const percentageText = showCheckmark
    ? ''
    : percentageFormat === 'number'
      ? `${clampedPercentage.toFixed(0)}`
      : `${clampedPercentage.toFixed(0)}%`

  // Calculate radius (accounting for stroke width)
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius

  // Calculate stroke dash offset (how much of the circle is filled)
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference

  // Format amounts in compact notation (reduce decimals for denominator)
  const formattedPaid = formatCompactAmount(amountPaid)
  const formattedTotal = formatCompactAmount(totalAmount, true)

  // Format full currency values for tooltip
  const fullPaid = formatAmount(amountPaid)
  const fullTotal = formatAmount(totalAmount)
  const tooltipPercentageText = `${clampedPercentage.toFixed(1)}%`

  const tooltipDescription = (
    <>
      Paid: {fullPaid}
      <br />
      Total: {fullTotal}
      <br />
      <span className="font-medium">{tooltipPercentageText} Complete</span>
    </>
  )

  return (
    <Tooltip title="Pay Progress" description={tooltipDescription}>
      <div className={cn('flex items-center gap-2 cursor-default w-full', className)}>
        <div className="relative">
          {/* Circular progress indicator */}
          <svg
            width={size}
            height={size}
            style={{ transform: 'rotate(-90deg)' }}
            aria-label={`${formattedPaid} of ${formattedTotal} paid`}
          >
            {/* Background circle (unfilled portion) */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                stroke: backgroundColor,
              }}
            />

            {/* Foreground circle (filled portion) - starts at 12 o'clock */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                stroke: strokeColor,
                transition: 'stroke-dashoffset 0.3s ease',
              }}
            />
          </svg>
          {/* Percentage or checkmark inside circle */}
          {showPercentageText && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: showCheckmark
                  ? undefined
                  : textSize !== undefined
                    ? `${textSize * textSizeScale}px`
                    : `${size * 0.25 * textSizeScale}px`,
              }}
            >
              {showCheckmark ? (
                <HugeIcon
                  icon={Tick01Icon}
                  size={Math.round(size * 0.6 * textSizeScale)}
                  strokeWidth={2.5}
                  className="text-primary"
                />
              ) : (
                <span className="text-primary font-medium tabular-nums">
                  {percentageText}
                </span>
              )}
            </div>
          )}
        </div>
        {/* Amount text outside circle (optional) */}
        {showAmountText && (
          <div className="flex flex-col gap-0.5">
            <span className="shrink-0 text-xs font-normal tabular-nums">
              <span className="text-primary">{formattedPaid}</span>
              <span className="text-quaternary"> / </span>
              <span className="text-quaternary">{formattedTotal}</span>
            </span>
          </div>
        )}
      </div>
    </Tooltip>
  )
}
