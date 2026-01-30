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
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Briefcase01Icon from '@hugeicons-pro/core-stroke-rounded/Briefcase01Icon'
import Wrench01Icon from '@hugeicons-pro/core-stroke-rounded/Wrench01Icon'
import PlantIcon from '@hugeicons-pro/core-stroke-rounded/Plant03Icon'
import ChartLineData01Icon from '@hugeicons-pro/core-stroke-rounded/ChartLineData01Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
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
  onImproveOverall?: () => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Scorecard({
  scores,
  onImproveCategory,
  onImproveOverall,
  className,
}: ScorecardProps) {
  const overallScore = scores.overall.current

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        className
      )}
    >
      {/* Card wrapper */}
      <div className="flex flex-col gap-3 p-4 bg-secondary rounded-3xl corner-squircle shine-1">
        {/* Confidence Score Header */}
        <NumberFlowGroup>
          <div className="flex flex-col">
            <span className="text-sm text-secondary opacity-50">
              Overall strength
            </span>
            <div className="flex items-center gap-3 -mt-1">
              <div className="flex items-baseline">
                <NumberFlow
                  value={overallScore}
                  className="text-5xl font-display font-medium text-primary leading-none"
                />
                <span className="text-2xl font-display font-medium text-quaternary leading-none opacity-50">
                  %
                </span>
              </div>
              {/* Rank Change */}
              <span className="flex items-center gap-0.5 text-success-primary">
                <HugeIcon icon={ArrowUp01Icon} size={16} />
                <span className="text-sm font-medium">3</span>
              </span>
            </div>
          </div>
        </NumberFlowGroup>

        {/* Overall health bar - stretched to card edges */}
        <div className="relative h-2 w-[calc(100%+2rem)] -mx-4 -mt-2">
          <div className="h-full w-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-chart-3)] to-[var(--color-chart-1)] shine-1"
              style={{ width: `${overallScore}%` }}
            />
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

      {/* Add Strength Button - outside card */}
      <Button
        variant="shine"
        size="sm"
        roundness="pill"
        className="w-full"
        onClick={onImproveOverall}
      >
        Improve strength
      </Button>
    </div>
  )
}
