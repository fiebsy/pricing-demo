/**
 * Side-Stack Layout Playground
 *
 * Playground for experimenting with horizontal expanding layouts using
 * CSS Grid and clip-path animations. Containers are arranged in a row
 * and expand left/right, pushing neighbors aside.
 *
 * @module playground/side-stack-layout
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
import { SideStackLayout } from './core/side-stack-layout'

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function SideStackLayoutPlayground() {
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
    const animationFields = [
      'animationDuration',
      'animationEasing',
      'collapseDuration',
      'slotContainerDurationOffset',
      'animateSlotContainers',
      'slotEntryDelay',
      'slotEntryDuration',
    ]

    if (animationFields.includes(controlId)) {
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
      'showSlotLabels',
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
        sideStackMode: config.sideStackMode,
        animationDuration: config.animationDuration,
        animationEasing: config.animationEasing,
        collapseDuration: config.collapseDuration,
        slotContainerDurationOffset: config.slotContainerDurationOffset,
        animateSlotContainers: config.animateSlotContainers,
        slotEntryDelay: config.slotEntryDelay,
        slotEntryDuration: config.slotEntryDuration,
        containerCount: config.containerCount,
        triggerWidth: config.triggerWidth,
        triggerHeight: config.triggerHeight,
        leftSlotWidth: config.leftSlotWidth,
        rightSlotWidth: config.rightSlotWidth,
        containerGap: config.containerGap,
        slotInset: config.slotInset,
        borderRadius: config.borderRadius,
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
        <div className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
          side-stack-layout
        </div>
      </div>

      {/* Main content area */}
      <div className="pr-[352px]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative">
            <SideStackLayout
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
