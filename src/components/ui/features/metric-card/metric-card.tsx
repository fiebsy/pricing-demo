'use client'

/**
 * MetricCard Component
 *
 * A composable metric display card with configurable layout, animations, and styling.
 * Uses a dual-layer system (outer/inner) for sophisticated visual effects.
 *
 * @module metric-card
 *
 * Key Features:
 * - Configurable section order (label, value, count)
 * - Percent change indicator with directional styling
 * - Hover animations (lift, glow, fade)
 * - Active state styling with layer overrides
 * - Semantic token colors only
 */

import * as React from 'react'
import { forwardRef, useMemo } from 'react'
import { cn } from '@/lib/utils'

import { DEFAULT_VALUE_FORMAT } from './config'
import { TrendBadge } from './components'
import {
  buildLayerClasses,
  buildSectionClasses,
  formatCompactValue,
  getHoverAnimationClasses,
  mergeLayerStyles,
  mergeSectionStyles,
} from './utils'
import type { MetricCardProps, SectionType } from './types'

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const MetricCard = forwardRef<HTMLButtonElement, MetricCardProps>(
  (
    {
      label,
      labelSuffix,
      value,
      count,
      trend,
      isHovered = false,
      isActive = false,
      nonInteractive = false,
      config,
      className,
      onClick,
      onMouseEnter,
      onMouseLeave,
    },
    ref
  ) => {
    // Format value into parts for styling (only if value is a string)
    const valueParts = useMemo(() => {
      if (typeof value !== 'string') return null
      const format = config.valueFormat ?? DEFAULT_VALUE_FORMAT
      return formatCompactValue(value, format)
    }, [value, config.valueFormat])

    // Compute resolved styles based on state (active disables hover)
    const resolvedOuter = useMemo(() => {
      let style = config.outer
      if (isActive && config.activeOuter) {
        style = mergeLayerStyles(style, config.activeOuter)
      } else if (isHovered && config.hoverOuter) {
        style = mergeLayerStyles(style, config.hoverOuter)
      }
      return style
    }, [isHovered, isActive, config.outer, config.hoverOuter, config.activeOuter])

    const resolvedInner = useMemo(() => {
      let style = config.inner
      if (isActive && config.activeInner) {
        style = mergeLayerStyles(style, config.activeInner)
      } else if (isHovered && config.hoverInner) {
        style = mergeLayerStyles(style, config.hoverInner)
      }
      return style
    }, [isHovered, isActive, config.inner, config.hoverInner, config.activeInner])

    // Compute resolved text styles based on active state
    const resolvedLabelStyle = useMemo(() => {
      if (isActive && config.activeLabelStyle) {
        return mergeSectionStyles(config.labelStyle, config.activeLabelStyle)
      }
      return config.labelStyle
    }, [isActive, config.labelStyle, config.activeLabelStyle])

    const resolvedValueStyle = useMemo(() => {
      if (isActive && config.activeValueStyle) {
        return mergeSectionStyles(config.valueStyle, config.activeValueStyle)
      }
      return config.valueStyle
    }, [isActive, config.valueStyle, config.activeValueStyle])

    const resolvedCountStyle = useMemo(() => {
      if (isActive && config.activeCountStyle) {
        return mergeSectionStyles(config.countStyle, config.activeCountStyle)
      }
      return config.countStyle
    }, [isActive, config.countStyle, config.activeCountStyle])

    // Label suffix uses labelStyle as base, with optional overrides
    const resolvedLabelSuffixStyle = useMemo(() => {
      const baseStyle = mergeSectionStyles(resolvedLabelStyle, config.labelSuffixStyle)
      return baseStyle
    }, [resolvedLabelStyle, config.labelSuffixStyle])

    // Build classes
    const outerClasses = buildLayerClasses(resolvedOuter, config.borderRadius)
    const innerBorderRadius = Math.max(0, config.borderRadius - config.outerPadding)
    const innerClasses = buildLayerClasses(resolvedInner, innerBorderRadius)
    const hoverAnimationClasses = getHoverAnimationClasses(config.hoverAnimation)

    // Section content mapping
    const sectionContent: Record<SectionType, React.ReactNode> = {
      label: (
        <div key="label" className="flex items-baseline gap-1">
          <span
            className={buildSectionClasses(resolvedLabelStyle)}
            style={{ opacity: (resolvedLabelStyle.opacity ?? 100) / 100 }}
          >
            {label}
          </span>
          {labelSuffix && (
            <span
              className={buildSectionClasses(resolvedLabelSuffixStyle)}
              style={{ opacity: (resolvedLabelSuffixStyle.opacity ?? 100) / 100 }}
            >
              {labelSuffix}
            </span>
          )}
        </div>
      ),
      value: (
        <div
          key="value"
          className={cn(
            'flex gap-2',
            config.trendStyle.alignment === 'baseline' ? 'items-baseline' : 'items-center'
          )}
        >
          <span
            className={cn(buildSectionClasses(resolvedValueStyle), 'tabular-nums')}
            style={{ opacity: (resolvedValueStyle.opacity ?? 100) / 100 }}
          >
            {valueParts ? (
              <>
                {valueParts.prefix && (
                  <span style={{ opacity: (config.valueFormat?.prefixOpacity ?? 100) / 100 }}>
                    {valueParts.prefix}
                  </span>
                )}
                {valueParts.number}
                {valueParts.suffix && (
                  <span style={{ opacity: (config.valueFormat?.suffixOpacity ?? 100) / 100 }}>
                    {valueParts.suffix}
                  </span>
                )}
              </>
            ) : (
              value
            )}
          </span>
          {trend && <TrendBadge trend={trend} style={config.trendStyle} />}
        </div>
      ),
      count: (
        <span
          key="count"
          className={buildSectionClasses(resolvedCountStyle)}
          style={{ opacity: (resolvedCountStyle.opacity ?? 100) / 100 }}
        >
          {count}
        </span>
      ),
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={nonInteractive ? undefined : onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          'text-left focus:outline-none',
          nonInteractive ? '!cursor-default' : 'cursor-pointer',
          'motion-reduce:transition-none',
          !nonInteractive && hoverAnimationClasses,
          className
        )}
        style={{
          minWidth: `${config.minWidth}px`,
          transition: `all ${config.transitionDuration}ms ease-out`,
        }}
        tabIndex={nonInteractive ? -1 : undefined}
      >
        {/* Outer layer */}
        <div
          className="group relative"
          style={{
            padding: `${config.outerPadding}px`,
            borderRadius: `${config.borderRadius}px`,
            transition: `all ${config.transitionDuration}ms ease-out`,
          }}
        >
          {/* Outer background (separate so opacity only affects bg) */}
          <div
            className={cn(outerClasses, 'absolute inset-0')}
            style={{
              borderRadius: `${config.borderRadius}px`,
              opacity: resolvedOuter.opacity / 100,
              transition: `all ${config.transitionDuration}ms ease-out`,
            }}
          />
          {/* Inner layer */}
          <div
            className="relative"
            style={{
              padding: `${config.innerPadding}px`,
              borderRadius: `${innerBorderRadius}px`,
              transition: `all ${config.transitionDuration}ms ease-out`,
            }}
          >
            {/* Inner background (separate so opacity only affects bg) */}
            <div
              className={cn(innerClasses, 'absolute inset-0')}
              style={{
                borderRadius: `${innerBorderRadius}px`,
                opacity: resolvedInner.opacity / 100,
                transition: `all ${config.transitionDuration}ms ease-out`,
              }}
            />
            {/* Content sections in configured order */}
            <div className="relative flex flex-col">
              {config.sectionOrder.map((section, index) => {
                const gapAfter =
                  index === 0
                    ? (config.gap1 ?? config.gap)
                    : index === 1
                      ? (config.gap2 ?? config.gap)
                      : 0
                return (
                  <div key={section} style={{ marginBottom: index < 2 ? `${gapAfter}px` : 0 }}>
                    {sectionContent[section]}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </button>
    )
  }
)

MetricCard.displayName = 'MetricCard'
