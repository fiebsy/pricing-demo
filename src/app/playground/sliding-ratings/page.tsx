/**
 * Sliding Ratings Panel Playground
 *
 * Interactive testing environment for the sliding ratings panel component.
 * Tests the sliding transition behavior between parent categories and sub-scores.
 *
 * Core component: ./core/SlidingRatingsPanel.tsx
 * Migration target: src/components/ui/prod/features/sliding-ratings
 *
 * @module playground/sliding-ratings
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

import { SlidingRatingsPanel } from './core/SlidingRatingsPanel'
import type { SlidingRatingsConfig } from './config/types'
import {
  DEFAULT_SLIDING_RATINGS_CONFIG,
  SLIDING_RATINGS_PRESETS,
  getPresetConfig,
  MOCK_CATEGORIES,
} from './config'
import { buildSlidingRatingsPanelConfig } from './panels'

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

export default function SlidingRatingsPlayground() {
  // Config state
  const [config, setConfig] = useState<SlidingRatingsConfig>(DEFAULT_SLIDING_RATINGS_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildSlidingRatingsPanelConfig(config, SLIDING_RATINGS_PRESETS, activePresetId),
    [config, activePresetId]
  )

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    setActivePresetId(null)
    setConfig((prev) => setNestedValue(prev, controlId, value))
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const presetConfig = getPresetConfig(presetId)
    setConfig(presetConfig)
    setActivePresetId(presetId)
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_SLIDING_RATINGS_CONFIG)
    setActivePresetId('default')
  }, [])

  // Get config for copy button
  const getConfigForCopy = useCallback(() => {
    return config
  }, [config])

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Sliding Ratings' },
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
              Sliding Ratings Panel
            </h1>
            <p className="text-tertiary">
              Ratings panel with sliding transitions between parent categories and sub-scores.
              Click a category to slide into its sub-scores. Click the back button to return.
              Inspired by the filter-menu-motion component.
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-tertiary">
              Click a <strong>category row</strong> to slide into its sub-scores.
              Use the <strong>back button</strong> to return.
              Configure animation timing, styles, and effects in the control panel.
            </span>
          </div>

          {/* Component Preview */}
          <div className="bg-secondary rounded-2xl p-8 mb-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                Component Preview
              </span>
              <div className="text-xs text-tertiary">
                Transition mode: {config.animation.panelTransitionMode}
              </div>
            </div>

            <div className="flex justify-center">
              <SlidingRatingsPanel
                categories={MOCK_CATEGORIES}
                config={config}
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
              <strong>Features:</strong> Sliding panel transitions, category-to-subscores navigation,
              configurable animation timing, height animation, item fade/stagger, scale transforms
            </p>
            <p className="mt-1">
              <strong>Animation modes:</strong> &apos;slide&apos; (strip-based) and &apos;popLayout&apos; (AnimatePresence)
            </p>
            <p className="mt-1">
              <strong>S-tier optimizations:</strong> Transform + opacity only, motion-reduce support,
              hardware acceleration with transformOrigin
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
