/**
 * Battery Component
 *
 * Pure CSS battery indicator for optimal rendering performance.
 * Supports both rounded corners (CSS border-radius) and squircle corners
 * using the @toolwind/corner-shape plugin's `corner-squircle` utility.
 *
 * Fill Rounding Formula:
 * The fill radius is calculated as: bodyRadius - fillInset
 * This creates proper nested corners (iOS-style) where the inner
 * shape's corners align with the outer shape's corners.
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

import type { BatteryProps, CornerStyle, LabelWeight } from './types'
import { SIZE_CONFIGS, FILL_COLORS, BORDER_COLORS, LABEL_CLASSES } from './config'
import { getColorState } from './utils'

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Battery: React.FC<BatteryProps> = ({
  chargeLevel,
  size = '32',
  label,
  labelPosition = 'left',
  useAdaptiveColor = true,
  styleConfig,
  className,
  labelClassName,
}) => {
  const sizeConfig = SIZE_CONFIGS[size] ?? SIZE_CONFIGS['32']
  const clampedCharge = Math.max(0, Math.min(100, chargeLevel))

  // Apply style overrides (styleConfig takes precedence over sizeConfig)
  const cornerStyle: CornerStyle = styleConfig?.cornerStyle ?? 'rounded'
  const bodyWidth = styleConfig?.bodyWidth ?? sizeConfig.bodyWidth
  const bodyHeight = styleConfig?.bodyHeight ?? sizeConfig.bodyHeight
  const borderRadius = styleConfig?.borderRadius ?? sizeConfig.borderRadius
  const fillInset = styleConfig?.fillInset ?? sizeConfig.fillInset
  const terminalScale = styleConfig?.terminalScale ?? 1
  const labelWeight: LabelWeight = styleConfig?.labelWeight ?? 'medium'

  // Terminal dimensions with scaling
  const baseTerminalWidth = styleConfig?.terminalWidth ?? sizeConfig.terminalWidth
  const baseTerminalHeight = styleConfig?.terminalHeight ?? sizeConfig.terminalHeight
  const baseTerminalRadius = styleConfig?.terminalRadius ?? sizeConfig.terminalRadius

  const terminalWidth = baseTerminalWidth * terminalScale
  const terminalHeight = baseTerminalHeight * terminalScale
  const terminalRadius = baseTerminalRadius * terminalScale

  // Label weight classes
  const labelWeightClass = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }[labelWeight]

  // Determine colors
  const colorState = useAdaptiveColor ? getColorState(clampedCharge) : 'warning'
  const fillColor = FILL_COLORS[colorState]
  const borderColor = BORDER_COLORS[colorState]
  const labelClass = LABEL_CLASSES[colorState]

  // Calculate fill dimensions
  // With box-sizing: border-box, the border is INSIDE the dimensions
  // Content area = bodyWidth - (borderWidth × 2)
  const borderWidth = 1
  const contentWidth = bodyWidth - borderWidth * 2
  const contentHeight = bodyHeight - borderWidth * 2
  const fillAreaWidth = contentWidth - fillInset * 2
  const fillAreaHeight = contentHeight - fillInset * 2
  const fillWidth = (fillAreaWidth * clampedCharge) / 100

  // Fill rounding: bodyRadius - fillInset for proper nested corners
  // This creates iOS-style nested corner alignment
  const fillBorderRadius = Math.max(0, borderRadius - fillInset)

  // Squircle uses the corner-squircle CSS class from @toolwind/corner-shape
  const isSquircle = cornerStyle === 'squircle'

  // Render label
  const renderLabel = () => {
    if (!label || labelPosition === 'none') return null
    return (
      <span
        className={cn(sizeConfig.labelSize, labelWeightClass, 'tabular-nums', labelClass, labelClassName)}
        style={{
          marginLeft: labelPosition === 'right' ? sizeConfig.labelGap : 0,
          marginRight: labelPosition === 'left' ? sizeConfig.labelGap : 0,
        }}
      >
        {label}
      </span>
    )
  }

  return (
    <div
      className={cn(
        'inline-flex items-center',
        labelPosition === 'right' && 'flex-row-reverse',
        className
      )}
    >
      {renderLabel()}

      {/* Container (square, centered) */}
      <div
        className="flex items-center justify-center"
        style={{
          width: sizeConfig.containerSize,
          height: sizeConfig.containerSize,
        }}
      >
        {/* Battery body + terminal wrapper */}
        <div className="relative inline-flex items-center">
          {/* Battery body */}
          <div
            className={cn('relative overflow-hidden', isSquircle && 'corner-squircle')}
            style={{
              width: bodyWidth,
              height: bodyHeight,
              borderRadius: borderRadius,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: borderColor,
              backgroundColor: 'var(--color-background-secondary)',
            }}
          >
            {/* Fill layer */}
            {clampedCharge > 0 && (
              <div
                className={cn(isSquircle && 'corner-squircle')}
                style={{
                  position: 'absolute',
                  top: fillInset,
                  left: fillInset,
                  width: Math.max(2, fillWidth),
                  height: fillAreaHeight,
                  borderRadius: fillBorderRadius,
                  backgroundColor: fillColor,
                }}
              />
            )}
          </div>

          {/* Terminal (positive end cap) */}
          <div
            className={cn(isSquircle && 'corner-squircle')}
            style={{
              width: terminalWidth,
              height: terminalHeight,
              marginLeft: sizeConfig.terminalGap,
              backgroundColor: borderColor,
              borderTopRightRadius: terminalRadius,
              borderBottomRightRadius: terminalRadius,
            }}
          />
        </div>
      </div>
    </div>
  )
}
