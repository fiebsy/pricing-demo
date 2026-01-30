/**
 * Filter Chip - Main Component
 *
 * Expanding filter chip that animates from icon to full value display.
 *
 * @module prod/base/filter/filter-chip/filter-chip
 */

'use client'

import { useRef, useCallback, useLayoutEffect, useState, useEffect, useMemo } from 'react'
import CancelCircleSolidIcon from '@hugeicons-pro/core-solid-rounded/CancelCircleIcon'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'

import type { FilterChipProps } from './types'
import { mergeConfig, getSizeConfig, ROUNDED_CLASSES, EASING_EXPO_OUT } from './config'
import { useChipAnimation } from './use-chip-animation'

// ============================================================================
// Component
// ============================================================================

export const FilterChip: React.FC<FilterChipProps> = ({
  value,
  icon,
  label,
  onRemove,
  config: configProp,
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const iconLabelRef = useRef<HTMLSpanElement>(null)

  // Memoize config merge to prevent recalculation
  const config = useMemo(() => mergeConfig(configProp), [configProp])
  const sizeConfig = useMemo(() => getSizeConfig(config.size), [config.size])
  const roundedClass = ROUNDED_CLASSES[config.rounded]

  const hasIcon = !!icon

  // ============================================================================
  // Animation
  // ============================================================================

  const animation = useChipAnimation({
    defaultExpanded,
    expanded,
    onExpandedChange,
    duration: config.duration,
    revealMode: config.revealMode,
    opacityFadeRatio: config.opacityFadeRatio,
  })

  // ============================================================================
  // Measurement
  // ============================================================================

  const [collapsedWidth, setCollapsedWidth] = useState(0)
  const [expandedWidth, setExpandedWidth] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setExpandedWidth(measureRef.current.offsetWidth)
      }
      if (iconLabelRef.current) {
        setCollapsedWidth(iconLabelRef.current.offsetWidth)
      }
    }

    measure()

    // Re-measure on resize
    const observer = new ResizeObserver(measure)
    if (measureRef.current) observer.observe(measureRef.current)
    if (iconLabelRef.current) observer.observe(iconLabelRef.current)

    return () => observer.disconnect()
  }, [value, label, icon, config.size])

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleRemove = useCallback(() => {
    onRemove?.()
  }, [onRemove])

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target === containerRef.current) {
        animation.onTransitionEnd(e)
      }
    },
    [animation]
  )

  const currentWidth = animation.isExpanded ? expandedWidth : collapsedWidth

  // ============================================================================
  // Fade-in on mount (only after measurements are ready)
  // ============================================================================

  const [isVisible, setIsVisible] = useState(false)
  const hasMeasurements = collapsedWidth > 0 && expandedWidth > 0

  useEffect(() => {
    if (!hasMeasurements) return

    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [hasMeasurements])

  // ============================================================================
  // Render Helpers
  // ============================================================================

  const renderIconOrLabel = () => {
    if (hasIcon) {
      return (
        <HugeIcon
          icon={icon}
          size={config.iconSize}
          strokeWidth={2}
          className="text-tertiary flex-shrink-0"
          style={{ opacity: config.iconOpacity }}
        />
      )
    }
    return (
      <span
        className={cn(sizeConfig.textClass, 'font-medium text-tertiary whitespace-nowrap')}
        style={{ opacity: config.iconOpacity }}
      >
        {label}:
      </span>
    )
  }

  return (
    <div
      className="relative inline-flex"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity 200ms ${EASING_EXPO_OUT}`,
      }}
    >
      {/* Hidden measurement element */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className={cn(
          'inline-flex items-center',
          'bg-secondary border border-transparent shine-3-subtle',
          roundedClass,
          'whitespace-nowrap pointer-events-none'
        )}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          height: sizeConfig.height,
          paddingLeft: config.paddingLeft,
          paddingRight: config.paddingRight,
        }}
      >
        <span
          ref={iconLabelRef}
          className="inline-flex items-center"
          style={{
            height: sizeConfig.height,
            paddingLeft: config.paddingLeft,
            marginLeft: -config.paddingLeft,
          }}
        >
          {renderIconOrLabel()}
        </span>
        <span
          className={cn(sizeConfig.textClass, 'font-medium text-primary whitespace-nowrap')}
          style={{ marginLeft: config.iconValueGap }}
        >
          {value}
        </span>
        {onRemove && (
          <span
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: config.closeSize, height: config.closeSize, marginLeft: config.valueCloseGap }}
          />
        )}
      </div>

      {/* Visible animated container */}
      <div
        ref={containerRef}
        onClick={!animation.isExpanded ? animation.toggle : undefined}
        onTransitionEnd={handleTransitionEnd}
        className={cn(
          'relative overflow-hidden',
          'bg-secondary border border-transparent shine-3-subtle',
          roundedClass,
          'motion-reduce:transition-none',
          !animation.isExpanded && 'cursor-pointer',
          className
        )}
        style={{
          width: currentWidth,
          height: sizeConfig.height,
          transition: animation.getContainerTransition(),
        }}
      >
        {/* Icon/Label - absolutely positioned, never moves */}
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center justify-center"
          style={{
            width: collapsedWidth,
            paddingLeft: config.paddingLeft,
          }}
        >
          {renderIconOrLabel()}
        </div>

        {/* Value area - revealed as container expands */}
        <div
          className="absolute top-0 bottom-0 right-0 flex items-center"
          style={{
            left: collapsedWidth,
            paddingLeft: config.iconValueGap,
            paddingRight: config.paddingRight,
            gap: config.valueCloseGap,
            opacity: animation.getContentOpacity(),
            transition: animation.getContentTransition(),
            pointerEvents: animation.isExpanded ? 'auto' : 'none',
          }}
        >
          <span className={cn(sizeConfig.textClass, 'font-medium text-primary whitespace-nowrap')}>
            {value}
          </span>

          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              className={cn(
                'flex-shrink-0 flex items-center justify-center rounded-full',
                'text-tertiary hover:text-primary',
                'transition-colors duration-150',
                'motion-reduce:transition-none',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand'
              )}
              style={{
                width: config.closeSize,
                height: config.closeSize,
                opacity: animation.getContentOpacity(),
                transition: animation.getContentTransition(),
              }}
              aria-label={`Remove ${value} filter`}
            >
              <HugeIcon
                icon={CancelCircleSolidIcon}
                size={config.closeSize}
                strokeWidth={0}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

FilterChip.displayName = 'FilterChip'
