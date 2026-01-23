/**
 * CategoryMetrics Component
 *
 * Vertical list of category strength bars for active section.
 *
 * @module b/profile-v2/components/edit-panel
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { getScoreColor } from '../../../profile/constants'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import type { CategoryMetricsProps } from '../../types'

// =============================================================================
// PROGRESS BAR
// =============================================================================

interface CategoryProgressBarProps {
  value: number
  networkAverage?: number
  className?: string
}

function CategoryProgressBar({ value, networkAverage = 65, className }: CategoryProgressBarProps) {
  const scoreColor = getScoreColor(value)

  const gradientClasses = {
    success: 'bg-gradient-to-r from-emerald-600/70 to-emerald-400/70',
    warning: 'bg-gradient-to-r from-amber-600/70 to-amber-400/70',
    error: 'bg-gradient-to-r from-red-600/70 to-orange-400/70',
  }

  return (
    <div
      className={cn(
        'relative h-1.5 w-full',
        className
      )}
    >
      {/* Track with progress fill */}
      <div className="h-full w-full rounded-full bg-quaternary overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full',
            gradientClasses[scoreColor],
            'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]',
            'motion-reduce:transition-none'
          )}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      {/* Network average hash mark */}
      <div
        className="absolute -top-0.5 h-[calc(100%+4px)] w-px border-l border-dashed border-white/60"
        style={{ left: `${networkAverage}%` }}
      />
    </div>
  )
}

// =============================================================================
// CATEGORY ROW
// =============================================================================

interface CategoryRowProps {
  label: string
  score: number
  networkAverage: number
  isHighlighted?: boolean
  isDimmed?: boolean
  onImprove: () => void
}

function CategoryRow({
  label,
  score,
  networkAverage,
  isHighlighted = false,
  isDimmed = false,
  onImprove,
}: CategoryRowProps) {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 py-2 px-3 rounded-lg',
        'motion-safe:transition-all motion-safe:duration-150',
        'motion-reduce:transition-none',
        isHighlighted && 'bg-brand-primary/5',
        isDimmed && 'opacity-30',
        !isDimmed && 'hover:bg-secondary'
      )}
    >
      {/* Label + Score */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span
            className={cn(
              'text-sm font-medium truncate',
              isHighlighted ? 'text-brand-primary' : 'text-primary'
            )}
          >
            {label}
          </span>
          <span className="text-xs text-tertiary ml-2 shrink-0">
            {score}%
          </span>
        </div>
        <CategoryProgressBar value={score} networkAverage={networkAverage} />
      </div>

      {/* Improve button */}
      <button
        type="button"
        onClick={onImprove}
        className={cn(
          'shrink-0 flex items-center justify-center',
          'size-7 rounded-lg',
          'bg-transparent hover:bg-brand-primary/10',
          'text-tertiary hover:text-brand-primary',
          'opacity-0 group-hover:opacity-100',
          'motion-safe:transition-all motion-safe:duration-150',
          'motion-reduce:transition-none'
        )}
        aria-label={`Improve ${label}`}
      >
        <HugeIcon icon={ArrowUp01Icon} size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CategoryMetrics({
  categories,
  expandedCategory,
  onCategoryToggle,
  onImproveCategory,
  highlightedCategories = [],
  dimmedCategories = [],
  className,
}: CategoryMetricsProps) {
  return (
    <div className={cn('flex flex-col -mx-3', className)}>
      {categories.map((category) => {
        const isHighlighted = highlightedCategories.includes(category.categoryId)
        const isDimmed = dimmedCategories.includes(category.categoryId)

        return (
          <CategoryRow
            key={category.categoryId}
            label={category.label}
            score={category.aggregate.current}
            networkAverage={category.aggregate.networkAverage}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
            onImprove={() => onImproveCategory(category.categoryId)}
          />
        )
      })}
    </div>
  )
}
