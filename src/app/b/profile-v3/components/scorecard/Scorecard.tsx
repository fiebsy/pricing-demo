/**
 * Scorecard Component - V3
 *
 * Main scorecard panel showing overall confidence and 5 category scores.
 * Each category (Career, Skills, Growth, Business, Voice) has equal 20% weight.
 *
 * @module b/profile-v3/components/scorecard
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/prod/base/button'
import Briefcase01Icon from '@hugeicons-pro/core-stroke-rounded/Briefcase01Icon'
import Wrench01Icon from '@hugeicons-pro/core-stroke-rounded/Wrench01Icon'
import PlantIcon from '@hugeicons-pro/core-stroke-rounded/Plant03Icon'
import ChartLineData01Icon from '@hugeicons-pro/core-stroke-rounded/ChartLineData01Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import { CategoryRow } from './CategoryRow'
import type { ProfileScores, CategoryType } from '../../types'

// =============================================================================
// CATEGORY CONFIG
// =============================================================================

interface CategoryConfig {
  id: CategoryType
  label: string
  icon: typeof Briefcase01Icon
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'career', label: 'Career', icon: Briefcase01Icon },
  { id: 'skills', label: 'Skills', icon: Wrench01Icon },
  { id: 'growth', label: 'Growth', icon: PlantIcon },
  { id: 'business', label: 'Business', icon: ChartLineData01Icon },
  { id: 'voice', label: 'Voice', icon: Mic01Icon },
]

// =============================================================================
// TYPES
// =============================================================================

export interface ScorecardProps {
  scores: ProfileScores
  onImproveCategory: (category: CategoryType) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Scorecard({
  scores,
  onImproveCategory,
  className,
}: ScorecardProps) {
  const overallScore = scores.overall.current

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        'px-2 pb-2',
        className
      )}
    >
      {/* Add Confidence Button */}
      <div className="px-2">
        <Button variant="primary" size="sm" className="w-full shine-1">
          Add confidence
        </Button>
      </div>

      {/* Confidence Score Header */}
      <div className="flex flex-col px-2">
        <div className="flex items-baseline">
          <span className="text-5xl font-display font-medium text-primary leading-none">
            {overallScore}
          </span>
          <span className="text-2xl font-display font-medium text-quaternary leading-none opacity-50">
            %
          </span>
        </div>
        <span className="text-sm text-secondary mt-1 opacity-50">
          Overall confidence
        </span>
        {/* Overall health bar */}
        <div className="relative h-2 w-full mt-2">
          <div className="h-full w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-chart-3)] to-[var(--color-chart-1)] shine-1"
              style={{ width: `${overallScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="group/list flex flex-col gap-2">
        {CATEGORIES.map((config) => {
          const categoryData = scores.categories[config.id]
          return (
            <CategoryRow
              key={config.id}
              id={config.id}
              label={config.label}
              icon={config.icon}
              score={categoryData?.aggregate.current || 0}
              onImprove={() => onImproveCategory(config.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
