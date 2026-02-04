/**
 * Expanding Layout Playground
 *
 * Playground for experimenting with expanding layout animations using
 * CSS Grid. Three containers side-by-side where clicking one expands it
 * (reveals hidden content) while pushing siblings smoothly.
 *
 * @module playground/expanding-layout
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import type { PlaygroundConfig, ConfigPreset, PageBackground } from './config/types'
import { CONFIG_PRESETS, DEFAULT_PLAYGROUND_CONFIG } from './config/presets'
import { createPanelConfig } from './panels/panel-config'
import { ExpandingLayout } from './core/expanding-layout'

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ExpandingLayoutPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handle container click - toggle expansion
  const handleContainerClick = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }, [])

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Handle config preset selection - apply full preset
    if (controlId === 'configPreset' && value !== 'custom') {
      const preset = CONFIG_PRESETS[value as ConfigPreset]
      if (preset) {
        setConfig((prev) => ({
          ...prev,
          ...preset,
          configPreset: value as ConfigPreset,
        }))
        return
      }
    }

    // Handle animation setting changes - switch to custom preset
    if (controlId === 'animationDuration' || controlId === 'animationEasing') {
      setConfig((prev) => ({
        ...prev,
        [controlId]: value,
        configPreset: 'custom',
      }))
      return
    }

    // Non-preset fields that don't affect preset status
    const nonPresetFields = [
      'pageBackground',
      'showDebug',
      'slowMoEnabled',
      'reduceMotion',
      'showSquareLabels',
      'showContainerBorder',
    ]

    if (!nonPresetFields.includes(controlId)) {
      setConfig((prev) => ({ ...prev, [controlId]: value, configPreset: 'custom' }))
    } else {
      setConfig((prev) => ({ ...prev, [controlId]: value }))
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PLAYGROUND_CONFIG)
    setExpandedIndex(null)
  }, [])

  const getConfigForCopy = useCallback(() => {
    return {
      config: {
        animationDuration: config.animationDuration,
        animationEasing: config.animationEasing,
        squareBRevealMode: config.squareBRevealMode,
        squareBEntryDelay: config.squareBEntryDelay,
        squareBEntryDuration: config.squareBEntryDuration,
        squareBExitDuration: config.squareBExitDuration,
        squareBEntryScale: config.squareBEntryScale,
        squareBEntryOpacity: config.squareBEntryOpacity,
        containerCount: config.containerCount,
        squareAWidth: config.squareAWidth,
        squareAHeight: config.squareAHeight,
        squareBWidthMode: config.squareBWidthMode,
        squareBWidth: config.squareBWidth,
        squareBHeight: config.squareBHeight,
        gap: config.gap,
        containerGap: config.containerGap,
      },
    }
  }, [config])

  // Background class mapping
  const bgClasses: Record<PageBackground, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
  }

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      {/* Version label */}
      <div className="fixed left-4 top-4 z-50">
        <div className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
          expanding-layout
        </div>
      </div>

      {/* Main content area */}
      <div className="pr-[352px]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative">
            <ExpandingLayout
              config={config}
              expandedIndex={expandedIndex}
              onContainerClick={handleContainerClick}
            />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}
