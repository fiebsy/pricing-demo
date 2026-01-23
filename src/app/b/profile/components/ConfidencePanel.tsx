/**
 * ConfidencePanel Component
 *
 * Left sidebar showing aggregate score, section tabs, and category accordions.
 * Supports 3-tier hierarchy: Sections > Categories > SubScores
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { AggregateScore } from './AggregateScore'
import { SectionTabs } from './SectionTabs'
import { CategoryScore } from './CategoryScore'
import type { ConfidencePanelProps, SectionType } from '../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function ConfidencePanel({
  scores,
  activeSection,
  expandedCategory,
  onSectionChange,
  onCategoryToggle,
  onImproveCategory,
  className,
}: ConfidencePanelProps) {
  // Find the active section data
  const activeSectionData = scores.sections.find(
    (section) => section.sectionId === activeSection
  )

  return (
    <aside
      className={cn(
        'flex flex-col gap-4',
        className
      )}
    >
      {/* Section Tabs with Overall Score */}
      <div className="pb-3 border-b border-primary">
        <SectionTabs
          sections={scores.sections}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          overallScore={scores.overall}
        />
      </div>

      {/* Category Scores within Active Section */}
      {activeSectionData && (
        <div className="flex flex-col">
          {activeSectionData.categories.map((category) => (
            <CategoryScore
              key={category.categoryId}
              category={category}
              isExpanded={expandedCategory === category.categoryId}
              onToggle={() => onCategoryToggle(category.categoryId)}
              onImprove={() => onImproveCategory(category.categoryId, activeSection)}
            />
          ))}
        </div>
      )}
    </aside>
  )
}
