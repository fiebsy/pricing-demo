/**
 * SubScores Component
 *
 * Displays section tabs (Mind/Voice) and category metrics.
 * Extracted from EditPanel for independent positioning.
 *
 * @module b/profile-v2/components/score
 */

'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SectionTabs } from '../edit-panel/SectionTabs'
import { CategoryMetrics } from '../edit-panel/CategoryMetrics'
import type { EditPanelSection } from '../../types'
import type { ProfileScores, CategoryType, SectionType } from '@/app/b/profile/types'

// =============================================================================
// TYPES
// =============================================================================

export interface SubScoresProps {
  scores: ProfileScores
  activeSection: SectionType
  expandedCategory: CategoryType | null
  onSectionChange: (section: SectionType) => void
  onCategoryToggle: (category: CategoryType) => void
  onImproveCategory: (category: CategoryType, section: SectionType) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SubScores({
  scores,
  activeSection,
  expandedCategory,
  onSectionChange,
  onCategoryToggle,
  onImproveCategory,
  className,
}: SubScoresProps) {
  // Map activeSection to EditPanelSection (filter out 'appearance')
  const editPanelSection: EditPanelSection =
    activeSection === 'voice' ? 'voice' : 'mind'

  // Find the active section data
  const activeSectionData = useMemo(() => {
    return scores.sections.find(
      (section) => section.sectionId === editPanelSection
    )
  }, [scores.sections, editPanelSection])

  const handleSectionChange = (section: EditPanelSection) => {
    onSectionChange(section)
  }

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {/* Section Tabs with sliding indicator */}
      <SectionTabs
        activeSection={editPanelSection}
        onSectionChange={handleSectionChange}
      />

      {/* Category Metrics for active section */}
      {activeSectionData && (
        <CategoryMetrics
          categories={activeSectionData.categories}
          expandedCategory={expandedCategory}
          onCategoryToggle={onCategoryToggle}
          onImproveCategory={(category) =>
            onImproveCategory(category, editPanelSection)
          }
        />
      )}
    </div>
  )
}
