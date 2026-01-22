/**
 * CategoryScore Component
 *
 * Expandable category row with accordion behavior.
 * Shows aggregate score and expands to reveal sub-scores.
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { Collapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import ArrowDown01Icon from '@hugeicons-pro/core-solid-rounded/ArrowDown01Icon'
// Section icons
import Brain01Icon from '@hugeicons-pro/core-stroke-rounded/Brain01Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import User03Icon from '@hugeicons-pro/core-stroke-rounded/User03Icon'
// Mind category icons
import Briefcase01Icon from '@hugeicons-pro/core-stroke-rounded/Briefcase01Icon'
import Plant01Icon from '@hugeicons-pro/core-stroke-rounded/Plant01Icon'
import Wrench01Icon from '@hugeicons-pro/core-stroke-rounded/Wrench01Icon'
import ChartLineData01Icon from '@hugeicons-pro/core-stroke-rounded/ChartLineData01Icon'
// Voice category icons
import Pen01Icon from '@hugeicons-pro/core-stroke-rounded/Pen01Icon'
import SmileIcon from '@hugeicons-pro/core-stroke-rounded/SmileIcon'
import Comment01Icon from '@hugeicons-pro/core-stroke-rounded/Comment01Icon'
// Appearance category icons
import Image01Icon from '@hugeicons-pro/core-stroke-rounded/Image01Icon'
import PaintBrush01Icon from '@hugeicons-pro/core-stroke-rounded/PaintBrush01Icon'
import Presentation01Icon from '@hugeicons-pro/core-stroke-rounded/Presentation01Icon'
import Video01Icon from '@hugeicons-pro/core-stroke-rounded/Video01Icon'
// Action icons
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import { ScoreProgressBar } from './ScoreProgressBar'
import { SubScore } from './SubScore'
import { getScoreColorClass } from '../constants'
import type { CategoryScoreProps } from '../types'

// =============================================================================
// ICON MAPPING
// =============================================================================

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Section icons
  Brain01Icon,
  Mic01Icon,
  User03Icon,
  // Mind category icons
  Briefcase01Icon,
  PlantIcon: Plant01Icon,
  Wrench01Icon,
  ChartLineData01Icon,
  // Voice category icons
  Pen01Icon,
  SmileIcon,
  Comment01Icon,
  // Appearance category icons
  Image01Icon,
  PaintBrush01Icon,
  Presentation01Icon,
  Video01Icon,
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CategoryScore({
  category,
  isExpanded,
  onToggle,
  onImprove,
  className,
}: CategoryScoreProps) {
  const Icon = iconMap[category.icon] || Brain01Icon
  const colorClass = getScoreColorClass(category.aggregate.current)

  return (
    <Collapsible.Root
      open={isExpanded}
      onOpenChange={onToggle}
      className={cn('border-b border-primary last:border-b-0', className)}
      id={`category-${category.categoryId}`}
    >
      {/* Trigger row - wraps trigger and improve button as siblings */}
      <div className="flex items-center gap-2 py-3 px-2">
        {/* Trigger - expands/collapses */}
        <Collapsible.Trigger
          className={cn(
            'group flex-1 flex items-center gap-3',
            'hover:bg-secondary/50 rounded-lg -my-3 -ml-2 py-3 pl-2 pr-1',
            'motion-safe:transition-colors motion-safe:duration-150',
            'motion-reduce:transition-none'
          )}
        >
          {/* Icon */}
          <div className="size-6 rounded-md bg-quaternary flex items-center justify-center shrink-0">
            <HugeIcon icon={Icon} size={14} strokeWidth={1.5} className="text-secondary" />
          </div>

          {/* Label and progress */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-primary">{category.label}</span>
              <span className={cn('text-sm font-semibold tabular-nums', colorClass)}>
                {category.aggregate.current}
              </span>
            </div>
            <ScoreProgressBar
              value={category.aggregate.current}
              networkAverage={category.aggregate.networkAverage}
              size="sm"
            />
          </div>

          {/* Chevron */}
          <HugeIcon
            icon={ArrowDown01Icon}
            size={16}
            strokeWidth={0}
            className={cn(
              'text-tertiary shrink-0',
              'motion-safe:transition-transform motion-safe:duration-200',
              'motion-reduce:transition-none',
              isExpanded && 'rotate-180'
            )}
          />
        </Collapsible.Trigger>

        {/* Improve button - outside trigger to avoid nested buttons */}
        <button
          type="button"
          onClick={onImprove}
          className={cn(
            'shrink-0 px-2.5 py-1 rounded-lg',
            'text-xs font-medium',
            'bg-brand-primary/10 text-brand-primary',
            'hover:bg-brand-primary/20',
            'motion-safe:transition-colors motion-safe:duration-150',
            'motion-reduce:transition-none',
            'flex items-center gap-1'
          )}
        >
          <HugeIcon icon={SparklesIcon} size={12} strokeWidth={2} className="text-current" />
          Improve
        </button>
      </div>

      {/* Content Panel */}
      <Collapsible.Panel
        className={cn(
          'h-0 overflow-hidden',
          'motion-safe:transition-[height] motion-safe:duration-200 motion-safe:ease-in-out',
          'motion-reduce:transition-none',
          'data-[open]:h-[var(--collapsible-panel-height)]',
          'data-[starting-style]:h-0',
          'data-[ending-style]:h-0'
        )}
      >
        <div className="pl-11 pr-2 pb-3">
          {category.subScores.map((subScore, index) => (
            <SubScore key={subScore.id} item={subScore} index={index} />
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
