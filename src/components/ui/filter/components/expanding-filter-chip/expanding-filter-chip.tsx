/**
 * Expanding Filter Chip Component
 *
 * A filter chip that expands horizontally from a compact icon/label state.
 * The icon stays fixed at the left while the value area slides in.
 *
 * @module base-ui/filter/components/expanding-filter-chip
 */

'use client'

import { useRef, useCallback } from 'react'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'

import { SIZE_CONFIG, ROUNDING_CONFIG, GAP_CONFIG } from '../../constants'
import type { ChipSize, ChipRounding, ChipGap } from '../../constants'
import { DEFAULT_CHIP_STYLE } from '../../config'
import type { ChipStyleConfig, ChipBackground } from '../../types'
import { CloseButton } from '../../primitives'
import { useChipMeasurement } from './use-chip-measurement'
import { useChipAnimation } from './use-chip-animation'
import type { RevealMode } from './use-chip-animation'

// ============================================================================
// Background Mapping
// ============================================================================

const BACKGROUND_CLASSES: Record<ChipBackground, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
  'brand-solid': 'bg-brand-solid',
  'brand-primary': 'bg-brand-primary',
  'brand-secondary': 'bg-brand-secondary',
  'error-primary': 'bg-error-primary',
  'warning-primary': 'bg-warning-primary',
  'success-primary': 'bg-success-primary',
}

// ============================================================================
// Types
// ============================================================================

/** Hugeicon component type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HugeIconComponent = any

export interface ExpandingFilterChipProps {
  /** Filter label text (e.g., "Status") - shown if no icon provided */
  label?: string
  /** Icon to display instead of label - takes precedence over label */
  icon?: HugeIconComponent
  /** Filter value (e.g., "Active") - revealed as chip expands */
  value: string
  /** Called when remove button is clicked */
  onRemove?: () => void
  /** Animation duration in ms */
  duration?: number
  /** Whether to start expanded */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** How the value text is revealed */
  revealMode?: RevealMode
  /** Opacity fade ratio (0.1 = 10% of duration, 1.0 = full duration) */
  opacityFadeRatio?: number
  /**
   * Chip style configuration - merges with DEFAULT_CHIP_STYLE from config.ts
   * Use this to inherit centralized defaults while allowing per-instance overrides
   */
  chipConfig?: Partial<ChipStyleConfig>
  /** Size preset (overrides chipConfig.size) */
  size?: ChipSize
  /** Border radius preset (overrides chipConfig.rounded) */
  rounded?: ChipRounding
  /** Gap between icon/label and value (overrides chipConfig.gap) */
  gap?: ChipGap
  /** Additional class names */
  className?: string
  /** Custom horizontal padding override (in pixels) - overrides chipConfig */
  customPaddingX?: number
  /** Custom left padding override (in pixels) - overrides chipConfig.paddingLeft */
  customPaddingLeft?: number
  /** Custom right padding override (in pixels) - overrides chipConfig.paddingRight */
  customPaddingRight?: number
  /** Custom gap between items (value-to-close) in pixels - overrides chipConfig.itemGap */
  customItemGap?: number
  /** Custom gap between left icon/label and value text in pixels - overrides chipConfig.iconValueGap */
  customIconValueGap?: number
  /** Custom left icon size override (in pixels) - overrides chipConfig.iconSize */
  customIconSize?: number
  /** Custom close icon size override (in pixels) - overrides chipConfig.closeIconSize */
  customCloseIconSize?: number
  /** Custom close icon component */
  closeIcon?: HugeIconComponent
  /** Close icon stroke width */
  closeIconStrokeWidth?: number
  /** Left icon opacity (0 to 1) - overrides chipConfig.leftIconOpacity (which is 0-100) */
  leftIconOpacity?: number
}

// ============================================================================
// Component
// ============================================================================

export const ExpandingFilterChip: React.FC<ExpandingFilterChipProps> = ({
  label,
  icon,
  value,
  onRemove,
  duration,
  defaultExpanded,
  expanded,
  onExpandedChange,
  revealMode,
  opacityFadeRatio,
  chipConfig,
  size,
  rounded,
  gap,
  className,
  customPaddingX,
  customPaddingLeft,
  customPaddingRight,
  customItemGap,
  customIconValueGap,
  customIconSize,
  customCloseIconSize,
  closeIcon,
  closeIconStrokeWidth,
  leftIconOpacity,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Merge chipConfig with DEFAULT_CHIP_STYLE (chipConfig overrides defaults)
  const mergedConfig = { ...DEFAULT_CHIP_STYLE, ...chipConfig }

  // Props override chipConfig which overrides DEFAULT_CHIP_STYLE
  const resolvedSize = size ?? (mergedConfig.size as ChipSize)
  const resolvedRounded = rounded ?? (mergedConfig.rounded as ChipRounding)
  const resolvedGap = gap ?? (mergedConfig.gap as ChipGap)

  const sizeConfig = SIZE_CONFIG[resolvedSize]
  const roundingClass = ROUNDING_CONFIG[resolvedRounded]
  const gapValue = GAP_CONFIG[resolvedGap]
  const backgroundClass = BACKGROUND_CLASSES[mergedConfig.background as ChipBackground] || 'bg-secondary'

  const hasIcon = !!icon

  // Derived values - props override chipConfig, chipConfig overrides SIZE_CONFIG/GAP_CONFIG
  const basePaddingX = customPaddingX ?? sizeConfig.paddingX
  const paddingLeft = customPaddingLeft ?? mergedConfig.paddingLeft ?? basePaddingX
  const paddingRight = customPaddingRight ?? mergedConfig.paddingRight ?? basePaddingX
  const itemGap = customItemGap ?? mergedConfig.itemGap ?? gapValue
  const iconValueGap = customIconValueGap ?? mergedConfig.iconValueGap ?? gapValue
  const iconSize = customIconSize ?? mergedConfig.iconSize ?? sizeConfig.iconSize
  const closeIconSize = customCloseIconSize ?? mergedConfig.closeIconSize ?? sizeConfig.closeIconSize
  // leftIconOpacity: prop is 0-1, config is 0-100, convert config to 0-1 scale
  const resolvedLeftIconOpacity = leftIconOpacity ?? (mergedConfig.leftIconOpacity / 100)

  // Animation hook
  const animation = useChipAnimation({
    defaultExpanded,
    expanded,
    onExpandedChange,
    duration,
    revealMode,
    opacityFadeRatio,
  })

  // Measurement hook
  const measurement = useChipMeasurement([label, icon, value, onRemove, size, gap])

  const handleRemove = useCallback(() => {
    onRemove?.()
  }, [onRemove])

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target === containerRef.current) {
        animation.handleTransitionEnd(e)
      }
    },
    [animation]
  )

  const currentWidth = animation.isExpanded ? measurement.expandedWidth : measurement.collapsedWidth

  // Render the icon or label content
  const renderIconOrLabel = () => {
    if (hasIcon) {
      return (
        <HugeIcon
          icon={icon}
          size={iconSize}
          strokeWidth={2}
          className="text-tertiary flex-shrink-0"
          style={{ opacity: resolvedLeftIconOpacity }}
        />
      )
    }
    return (
      <span
        className={cn(sizeConfig.textClass, 'font-medium text-tertiary whitespace-nowrap')}
        style={{ opacity: resolvedLeftIconOpacity }}
      >
        {label}:
      </span>
    )
  }

  return (
    <div className="relative inline-block">
      {/* Hidden measurement element */}
      <div
        ref={measurement.refs.measureRef}
        aria-hidden="true"
        className={cn(
          'inline-flex items-center',
          backgroundClass,
          'border border-primary',
          roundingClass,
          'whitespace-nowrap'
        )}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          height: sizeConfig.height,
          paddingLeft,
          paddingRight,
        }}
      >
        <span
          ref={measurement.refs.iconLabelMeasureRef}
          className="inline-flex items-center"
          style={{
            height: sizeConfig.height,
            paddingLeft,
            marginLeft: -paddingLeft,
          }}
        >
          {renderIconOrLabel()}
        </span>
        <span
          className={cn(sizeConfig.textClass, 'font-medium text-primary whitespace-nowrap')}
          style={{ marginLeft: iconValueGap }}
        >
          {value}
        </span>
        {onRemove && (
          <span
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: closeIconSize, height: closeIconSize, marginLeft: itemGap }}
          />
        )}
      </div>

      {/* Visible animated container */}
      <div
        ref={containerRef}
        onClick={!animation.isExpanded ? animation.handleToggle : undefined}
        onTransitionEnd={handleTransitionEnd}
        className={cn(
          'relative overflow-hidden',
          backgroundClass,
          'border border-primary',
          roundingClass,
          'motion-reduce:transition-none',
          !animation.isExpanded && 'cursor-pointer',
          className
        )}
        style={{
          width: currentWidth || 'auto',
          height: sizeConfig.height,
          transition: animation.getContainerTransition(),
        }}
      >
        {/* Icon/Label - absolutely positioned, never moves */}
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center justify-center"
          style={{
            width: measurement.collapsedWidth,
            paddingLeft,
          }}
        >
          {renderIconOrLabel()}
        </div>

        {/* Value area - revealed as container expands */}
        <div
          className="absolute top-0 bottom-0 right-0 flex items-center"
          style={{
            left: measurement.collapsedWidth,
            paddingLeft: iconValueGap,
            paddingRight,
            gap: itemGap,
            opacity: animation.getContentOpacity(),
            transition: animation.getContentTransition(),
            pointerEvents: animation.isExpanded ? 'auto' : 'none',
          }}
        >
          <span className={cn(sizeConfig.textClass, 'font-medium text-primary whitespace-nowrap')}>
            {value}
          </span>

          {onRemove && (
            <CloseButton
              onPress={handleRemove}
              iconSize={closeIconSize}
              icon={closeIcon}
              strokeWidth={closeIconStrokeWidth}
              opacity={animation.getContentOpacity()}
              transition={animation.getContentTransition()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

ExpandingFilterChip.displayName = 'ExpandingFilterChip'
