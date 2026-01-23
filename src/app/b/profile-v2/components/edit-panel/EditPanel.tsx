/**
 * EditPanel Component
 *
 * Bottom-left panel with Mind/Voice tabs and category metrics.
 * Always visible, not hidden.
 *
 * @module b/profile-v2/components/edit-panel
 */

'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SectionTabs } from './SectionTabs'
import { CategoryMetrics } from './CategoryMetrics'
import type { EditPanelProps, EditPanelSection } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function EditPanel({
  scores,
  activeSection,
  expandedCategory,
  onSectionChange,
  onCategoryToggle,
  onImproveCategory,
  className,
}: EditPanelProps) {
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

  // Calculate aggregate score
  const aggregateScore = scores.overall.current

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        // No background card - clean and minimal
        'p-2',
        className
      )}
    >
      {/* Aggregate Score */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-primary">{aggregateScore}</span>
          <span className="text-sm text-secondary">#142 in Design</span>
        </div>
        {/* Health bar with gradient */}
        <div className="relative h-2 w-full">
          <div className="h-full w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-white/20 via-white/40 to-white/60"
              style={{ width: `${aggregateScore}%` }}
            />
          </div>
          {/* Network average hash mark */}
          <div
            className="absolute -top-0.5 h-[calc(100%+4px)] border-l border-dashed border-white/50"
            style={{ left: '65%' }}
          />
        </div>
      </div>

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
