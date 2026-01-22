/**
 * RatingsPanel Component
 *
 * Migration-ready confidence panel showing scores for Mind/Voice sections.
 * Configurable styling, badges, and animated line features.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/ratings-panel
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { SectionTabs } from '../components/SectionTabs'
import { CategoryScore } from '../components/CategoryScore'
import type { RatingsConfig, SectionType, CategoryType, ProfileScores } from '../config/types'

// =============================================================================
// STYLE HELPERS
// =============================================================================

function buildPanelClasses(config: RatingsConfig['panel']): string {
  const classes: string[] = []

  // Background
  if (config.showBackground) {
    classes.push(`bg-${config.background}`)
  }

  // Border
  if (config.border) {
    classes.push('border', `border-${config.borderColor}`)
  }

  // Shine effect
  if (config.shine !== 'none') {
    let shineClass = config.shine
    if (config.shineIntensity) {
      shineClass += config.shineIntensity
    }
    if (config.shadow !== 'none') {
      shineClass += `-shadow-${config.shadow}`
    }
    classes.push(shineClass)
  } else if (config.shadow !== 'none') {
    classes.push(`shadow-${config.shadow}`)
  }

  return cn(...classes)
}

function buildPanelStyles(config: RatingsConfig['panel']): React.CSSProperties {
  return {
    borderRadius: config.borderRadius,
    padding: config.padding,
    maxWidth: config.maxWidth ?? undefined,
  }
}

function buildDividerClasses(config: RatingsConfig['separators']): string {
  if (!config.showSectionDivider) return ''

  return cn(
    'border-b',
    `border-${config.dividerColor}`,
    config.dividerStyle === 'dashed' && 'border-dashed',
    config.dividerStyle === 'dotted' && 'border-dotted'
  )
}

// =============================================================================
// COMPONENT
// =============================================================================

export interface RatingsPanelProps {
  scores: ProfileScores
  config: RatingsConfig
  activeSection: SectionType
  expandedCategory: CategoryType | null
  onSectionChange: (section: SectionType) => void
  onCategoryToggle: (category: CategoryType) => void
  onImproveCategory: (category: CategoryType, section: SectionType) => void
  className?: string
}

export function RatingsPanel({
  scores,
  config,
  activeSection,
  expandedCategory,
  onSectionChange,
  onCategoryToggle,
  onImproveCategory,
  className,
}: RatingsPanelProps) {
  // Find the active section data
  const activeSectionData = scores.sections.find(
    (section) => section.sectionId === activeSection
  )

  const sectionDividerClasses = buildDividerClasses(config.separators)

  return (
    <aside
      className={cn(
        'flex flex-col gap-4',
        buildPanelClasses(config.panel),
        className
      )}
      style={buildPanelStyles(config.panel)}
    >
      {/* Section Tabs with Overall Score */}
      <div className={cn('flex items-center justify-between pb-3', sectionDividerClasses)}>
        <SectionTabs
          sections={scores.sections}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          overallScore={scores.overall}
          config={config.sectionTabs}
        />
      </div>

      {/* Category Scores within Active Section */}
      {activeSectionData && (
        <div className="flex flex-col">
          {activeSectionData.categories.map((category) => {
            const isExpanded = expandedCategory === category.categoryId

            // If collapseOthersOnExpand is true and another category is expanded, hide this one
            const shouldHide = config.categories.collapseOthersOnExpand &&
                               expandedCategory !== null &&
                               !isExpanded

            if (shouldHide) {
              return null
            }

            return (
              <CategoryScore
                key={category.categoryId}
                category={category}
                isExpanded={isExpanded}
                onToggle={() => onCategoryToggle(category.categoryId)}
                onImprove={() => onImproveCategory(category.categoryId, activeSection)}
                categoriesConfig={config.categories}
                subScoresConfig={config.subScores}
                separatorsConfig={config.separators}
              />
            )
          })}
        </div>
      )}
    </aside>
  )
}
