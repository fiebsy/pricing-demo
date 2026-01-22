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
  className?: string
}

export function SubScore({
  item,
  index,
  config,
  categoriesConfig,
  isExpanded,
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

    const lineHeight = 32 // Height of sub-score item
    const svgWidth = lineConfig.cornerRadius
    const svgHeight = index === 0 ? lineHeight * 0.6 : lineHeight

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

  return (
    <div
      className={cn(
        'relative flex items-center gap-3 py-2',
        // Stagger animation on appear
        'opacity-0 translate-y-[-8px]',
        'motion-safe:animate-[fadeSlideIn_150ms_ease-out_forwards]',
        'motion-reduce:opacity-100 motion-reduce:translate-y-0',
        className
      )}
      style={{
        animationDelay: `${index * staggerDelay}ms`,
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
