/**
 * Filter Menu Playground
 *
 * Core component: ./core/filter-menu-preview.tsx
 * Migration target: src/components/ui/prod/features/filter-menu
 *
 * Features:
 * - Trigger mode: Icon + Text or Icon Only
 * - Trigger variants: Default (shine), Ghost, Outline
 * - Trigger sizes: sm, md, lg
 * - Menu positioning and appearance customization
 * - Live preview with working filter selection
 * - Debug controls: Slow-mo animation, debug outlines
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { FilterMenuPreview } from './core/filter-menu-preview'
import type { FilterMenuConfig, FilterMenuVariant } from './config/types'
import {
  DEFAULT_FILTER_MENU_CONFIG,
  DEFAULT_DATE_PICKER_MENU_CONFIG,
  FILTER_MENU_PRESETS,
} from './config/presets'
import { buildFilterMenuPanelConfig } from './panels/panel-config'

// ============================================================================
// Utility: Deep set nested value
// ============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {}
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

// ============================================================================
// Page Component
// ============================================================================

export default function FilterMenuPlayground() {
  const [config, setConfig] = useState<FilterMenuConfig>(DEFAULT_FILTER_MENU_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [slowMo, setSlowMo] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Handle variant switch - reset to appropriate defaults
    if (event.controlId === 'variant') {
      const newVariant = event.value as FilterMenuVariant
      const defaultConfig = newVariant === 'date-picker'
        ? DEFAULT_DATE_PICKER_MENU_CONFIG
        : DEFAULT_FILTER_MENU_CONFIG
      setConfig(defaultConfig)
      setActivePresetId(newVariant === 'date-picker' ? 'date-picker' : 'default')
      return
    }

    // Handle date picker period selection (updates trigger label)
    if (event.controlId === 'datePicker.selectedPeriod') {
      setConfig((prev) => {
        const period = prev.datePicker?.periods.find((p) => p.id === event.value)
        return {
          ...prev,
          trigger: {
            ...prev.trigger,
            label: period?.label ?? prev.trigger.label,
          },
          datePicker: {
            ...prev.datePicker!,
            selectedPeriod: event.value as string,
          },
        }
      })
      setActivePresetId(null)
      return
    }

    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = FILTER_MENU_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    const defaultConfig = config.variant === 'date-picker'
      ? DEFAULT_DATE_PICKER_MENU_CONFIG
      : DEFAULT_FILTER_MENU_CONFIG
    setConfig(defaultConfig)
    setActivePresetId(config.variant === 'date-picker' ? 'date-picker' : 'default')
  }, [config.variant])

  // Handle period selection from preview
  const handlePeriodSelect = useCallback((periodId: string) => {
    setConfig((prev) => {
      const period = prev.datePicker?.periods.find((p) => p.id === periodId)
      if (!prev.datePicker || !period) return prev
      return {
        ...prev,
        trigger: {
          ...prev.trigger,
          label: period.label,
        },
        datePicker: {
          ...prev.datePicker,
          selectedPeriod: periodId,
        },
      }
    })
    setActivePresetId(null)
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildFilterMenuPanelConfig(config, FILTER_MENU_PRESETS, activePresetId),
    [config, activePresetId]
  )

  // Use config directly (slow-mo is no longer supported)
  const effectiveConfig = config

  return (
    <PlaygroundLayout
      className="bg-primary"
      controlPanel={
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={() => {
            const { animation, ...rest } = config

            // Start with base animation props
            const filteredAnimation: Partial<typeof animation> = {
              springPreset: animation.springPreset,
              animateHeight: animation.animateHeight,
              animateOnClose: animation.animateOnClose,
              revealDuration: animation.revealDuration,
              revealScale: animation.revealScale,
              revealSlideRatio: animation.revealSlideRatio,
            }

            // Only include custom spring params when preset is 'custom'
            if (animation.springPreset === 'custom') {
              filteredAnimation.springStiffness = animation.springStiffness
              filteredAnimation.springDamping = animation.springDamping
              filteredAnimation.springMass = animation.springMass
            }

            return { ...rest, animation: filteredAnimation }
          }}
        />
      }
      debugControls={{
        slowMo,
        onSlowMoChange: setSlowMo,
        showDebug,
        onShowDebugChange: setShowDebug,
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-display-sm font-display text-primary">
            Filter Menu
          </h1>
          <p className="text-secondary mt-2 text-sm">
            Click the button to open the filter menu
            {slowMo && <span className="text-brand ml-2">(Slow-Mo)</span>}
          </p>
        </div>

        {/* Filter Menu Preview */}
        <FilterMenuPreview
          config={effectiveConfig}
          onPeriodSelect={handlePeriodSelect}
        />

        {/* Current Config Display */}
        <div className="mt-8 rounded-lg bg-secondary/50 p-4 text-xs text-tertiary max-w-md">
          <p className="font-medium text-secondary mb-2">Current Config:</p>
          <p>
            Variant: <span className="text-primary">{config.variant}</span>
            {config.variant === 'table-filter' && (
              <>
                {' · '}
                Mode: <span className="text-primary">{config.trigger.mode}</span>
              </>
            )}
            {' · '}
            Style: <span className="text-primary">{config.trigger.variant}</span>
            {' · '}
            Size: <span className="text-primary">{config.trigger.size}</span>
          </p>
          <p className="mt-1">
            Menu: <span className="text-primary">{config.menu.width}px</span>
            {' · '}
            Position: <span className="text-primary">{config.menu.side}-{config.menu.align}</span>
          </p>
          {config.variant === 'date-picker' && config.datePicker && (
            <p className="mt-1">
              Selected: <span className="text-primary">{config.datePicker.selectedPeriod}</span>
              {' · '}
              Indicator: <span className="text-primary">{config.datePicker.selectionIndicator}</span>
            </p>
          )}
          <p className="mt-1">
            Spring: <span className="text-primary">{config.animation.springPreset ?? 'default'}</span>
          </p>
        </div>
      </div>
    </PlaygroundLayout>
  )
}
