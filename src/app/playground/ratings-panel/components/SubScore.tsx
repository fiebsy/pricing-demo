/**
 * SubScore Component
 *
 * Individual sub-score item within a category.
 * Supports animated lines, badges, and stagger animation.
 *
 * @module playground/ratings-panel/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/prod/base/badge'
import { ScoreProgressBar } from './ScoreProgressBar'
import { getScoreColor, getScoreColorClass, getScoreStatus, getScoreDelta } from '../config'
import type { SubScoreItem, RatingsConfig, BadgeColorOption } from '../config/types'
import type { BadgeColor } from '@/components/ui/prod/base/badge/types'

export interface SubScoreProps {
  item: SubScoreItem
  index: number
  config: RatingsConfig['subScores']
  categoriesConfig: RatingsConfig['categories']
  isExpanded: boolean
  isSelected: boolean
  onSelect: () => void
  className?: string
}

export function SubScore({
  item,
  index,
  config,
  categoriesConfig,
  isExpanded,
  isSelected,
  onSelect,
  className,
}: SubScoreProps) {
  const colorClass = getScoreColorClass(item.score.current)
  const { badge: badgeConfig, animatedLine: lineConfig, showAnimatedLine, staggerDelay } = config

  // Determine badge color (maps 'auto' to actual color based on score)
  const getBadgeColor = (): BadgeColor => {
    if (badgeConfig.color === 'auto') {
      return getScoreColor(item.score.current)
    }
    // Filter out 'auto' since it's playground-only
    return badgeConfig.color as BadgeColor
  }

  // Get badge content based on display mode
  const getBadgeContent = (): string => {
    switch (badgeConfig.displayMode) {
      case 'score':
        return String(item.score.current)
      case 'status':
        return getScoreStatus(item.score.current)
      case 'delta':
        return getScoreDelta(item.score.current, item.score.networkAverage)
      default:
        return ''
    }
  }

  // Animated line SVG
  const renderAnimatedLine = () => {
    if (!showAnimatedLine || !isExpanded) return null

    // Use config values with fallbacks for backwards compatibility
    const rowHeight = lineConfig.rowHeight ?? 40
    const firstRowMultiplier = lineConfig.firstRowMultiplier ?? 0.5

    const svgWidth = lineConfig.cornerRadius
    const svgHeight = index === 0
      ? rowHeight * firstRowMultiplier
      : rowHeight

    return (
      <svg
        className="pointer-events-none absolute"
        style={{
          overflow: 'visible',
          right: `calc(100% + 1px)`,
          top: '50%',
          transform: `translateY(-${svgHeight}px)`,
          width: svgWidth,
          height: svgHeight,
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <path
          d={`
            M 0 0
            L 0 ${svgHeight - lineConfig.cornerRadius}
            Q 0 ${svgHeight} ${lineConfig.cornerRadius} ${svgHeight}
            L ${lineConfig.cornerRadius} ${svgHeight}
          `}
          fill="none"
          stroke={`var(${lineConfig.color})`}
          strokeWidth={lineConfig.strokeWidth}
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          style={{
            animation: isExpanded
              ? `accordion-draw-line ${lineConfig.lineDuration}s linear ${index * lineConfig.staggerDelay}s forwards, accordion-fade-in-line 0.1s ease-in ${index * lineConfig.staggerDelay}s forwards`
              : 'none',
          }}
        />
      </svg>
    )
  }

  const isClickable = config.collapseOthersOnSelect

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onSelect : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      } : undefined}
      className={cn(
        'relative flex items-center gap-3 py-2',
        // Stagger animation on appear (only when not using collapse mode, which handles its own animations)
        !isClickable && 'opacity-0 translate-y-[-8px]',
        !isClickable && 'motion-safe:animate-[fadeSlideIn_150ms_ease-out_forwards]',
        !isClickable && 'motion-reduce:opacity-100 motion-reduce:translate-y-0',
        // Clickable styles
        isClickable && 'cursor-pointer rounded-lg -mx-2 px-2 hover:bg-secondary/50',
        isClickable && 'motion-safe:transition-colors motion-safe:duration-150',
        // Selected state
        isSelected && 'bg-brand-primary/10 hover:bg-brand-primary/15',
        className
      )}
      style={{
        animationDelay: !isClickable ? `${index * staggerDelay}ms` : undefined,
        paddingLeft: showAnimatedLine ? `${lineConfig.cornerRadius + 4}px` : undefined,
      }}
    >
      {/* Animated line */}
      {renderAnimatedLine()}

      {/* Label */}
      <span className="text-sm text-secondary w-24 shrink-0">{item.label}</span>

      {/* Progress bar */}
      <div className="flex-1">
        <ScoreProgressBar
          value={item.score.current}
          networkAverage={item.score.networkAverage}
          showBenchmark={categoriesConfig.showNetworkBenchmark}
          size={categoriesConfig.progressBarSize}
        />
      </div>

      {/* Score value or badge */}
      {badgeConfig.displayMode !== 'none' ? (
        <Badge
          color={getBadgeColor()}
          size={badgeConfig.size}
          shape={badgeConfig.shape}
          style={badgeConfig.style}
          dot={badgeConfig.showDot}
          className="shrink-0"
        >
          {getBadgeContent()}
        </Badge>
      ) : (
        <span className={cn('text-sm font-medium tabular-nums w-8 text-right', colorClass)}>
          {item.score.current}
        </span>
      )}
    </div>
  )
}
