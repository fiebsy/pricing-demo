/**
 * Ratings Panel Playground
 *
 * Interactive testing environment for the confidence/ratings panel component.
 * Allows real-time configuration of Mind/Voice tabs, badges, animated lines,
 * and filter menu integration.
 *
 * Core component: ./core/RatingsPanel.tsx
 * Migration target: src/components/ui/prod/features/ratings-panel
 *
 * @module playground/ratings-panel
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

import { RatingsPanel } from './core/RatingsPanel'
import type { RatingsConfig, SectionType, CategoryType } from './config/types'
import { DEFAULT_RATINGS_CONFIG, RATINGS_PRESETS, getPresetConfig, MOCK_SCORES } from './config'
import { buildRatingsPanelConfig } from './panels'

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Set a nested value in an object by dot-notation path.
 */
function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {}
    }
    current = current[keys[i]] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function RatingsPanelPlayground() {
  // Config state
  const [config, setConfig] = useState<RatingsConfig>(DEFAULT_RATINGS_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // UI state
  const [activeSection, setActiveSection] = useState<SectionType>('mind')
  const [expandedCategory, setExpandedCategory] = useState<CategoryType | null>(null)

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildRatingsPanelConfig(config, RATINGS_PRESETS, activePresetId),
    [config, activePresetId]
  )

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Handle data state changes that affect UI
    if (controlId === 'data.activeSection') {
      setActiveSection(value as SectionType)
      setExpandedCategory(null) // Reset expanded on section change
    }

    // Handle maxWidth: convert from string and treat '0' as null (no limit)
    let processedValue = value
    if (controlId === 'panel.maxWidth') {
      const numValue = parseInt(value as string, 10)
      processedValue = numValue === 0 ? null : numValue
    }

    // Clear preset when manually changing values
    setActivePresetId(null)
    setConfig((prev) => setNestedValue(prev, controlId, processedValue))
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const presetConfig = getPresetConfig(presetId)
    setConfig(presetConfig)
    setActivePresetId(presetId)

    // Apply preset's data state
    if (presetConfig.data.activeSection) {
      setActiveSection(presetConfig.data.activeSection)
    }
    if (presetConfig.data.expandedCategory !== undefined) {
      setExpandedCategory(presetConfig.data.expandedCategory)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_RATINGS_CONFIG)
    setActivePresetId('default')
    setActiveSection('mind')
    setExpandedCategory(null)
  }, [])

  // Get config for copy button
  const getConfigForCopy = useCallback(() => {
    return {
      ...config,
      // Include current UI state
      data: {
        activeSection,
        expandedCategory,
      },
    }
  }, [config, activeSection, expandedCategory])

  // Section change handler
  const handleSectionChange = useCallback((section: SectionType) => {
    setActiveSection(section)
    setExpandedCategory(null)
    // Update config to reflect the change
    setConfig((prev) => ({
      ...prev,
      data: { ...prev.data, activeSection: section },
    }))
    setActivePresetId(null)
  }, [])

  // Category toggle handler with optional collapse-others behavior
  const handleCategoryToggle = useCallback((category: CategoryType) => {
    setExpandedCategory((prev) => {
      // If clicking the same category, collapse it
      if (prev === category) {
        return null
      }
      // If collapseOthersOnExpand is true, or if there's no prev,
      // just expand the clicked category (others will be hidden automatically)
      return category
    })
  }, [])

  // Improve handler
  const handleImproveCategory = useCallback(
    (category: CategoryType, section: SectionType) => {
      console.log('Improve clicked:', { category, section })
    },
    []
  )

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Ratings Panel' },
            ]}
          />
          <div className="text-xs text-tertiary">
            {activePresetId ? `Preset: ${activePresetId}` : 'Custom config'}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex flex-col min-h-[calc(100vh-120px)] p-8">
          {/* Description */}
          <div className="mb-8 max-w-2xl">
            <h1 className="text-2xl font-semibold text-primary mb-2">
              Ratings Panel
            </h1>
            <p className="text-tertiary">
              Confidence panel with Mind/Voice tabs, expandable categories,
              sub-score displays with optional badges and animated lines.
              Configurable tab sizes, max width, and accordion behavior.
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-tertiary">
              Click <strong>Mind</strong> or <strong>Voice</strong> to switch sections.
              Click a category to expand sub-scores.
              Use the control panel to customize styling and features.
            </span>
          </div>

          {/* Component Preview */}
          <div className="bg-secondary rounded-2xl p-8 mb-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                Component Preview
              </span>
              <div className="text-xs text-tertiary">
                {activeSection} / {expandedCategory || 'none expanded'}
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <RatingsPanel
                scores={MOCK_SCORES}
                config={config}
                activeSection={activeSection}
                expandedCategory={expandedCategory}
                onSectionChange={handleSectionChange}
                onCategoryToggle={handleCategoryToggle}
                onImproveCategory={handleImproveCategory}
              />
            </div>
          </div>

          {/* Current Config Display */}
          <div className="bg-tertiary rounded-xl p-4">
            <div className="text-xs font-mono text-tertiary">
              <div className="mb-2 text-secondary font-medium">
                Current Config (for copy):
              </div>
              <pre className="text-xs overflow-auto max-h-48">
                {JSON.stringify(getConfigForCopy(), null, 2)}
              </pre>
            </div>
          </div>

          {/* Feature Indicator */}
          <div className="mt-6 text-xs text-quaternary">
            <p>
              <strong>Features:</strong> Mind/Voice tabs (pill/underline), configurable tab sizes,
              category accordions with collapse-others mode, sub-score badges, animated lines, max width
            </p>
            <p className="mt-1">
              <strong>S-tier optimizations:</strong> scaleX progress bars, CSS-based stagger
              animations, motion-reduce support
            </p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}
