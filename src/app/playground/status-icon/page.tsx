/**
 * Status Icon Playground
 *
 * Core component: ./core/status-icon.tsx
 * Migration target: src/components/ui/prod/features/status-icon
 *
 * Features:
 * - Circular indicator with configurable stroke
 * - Pie fill or icon interior options
 * - Companion text with typography controls
 * - Presets for all order statuses
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { StatusIcon } from './core/status-icon'
import type { StatusIconConfig } from './config/types'
import { DEFAULT_STATUS_ICON_CONFIG, STATUS_ICON_PRESETS } from './config/presets'
import { buildStatusIconPanelConfig } from './panels/panel-config'

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
// Handle Fill Type Changes
// ============================================================================

function handleFillTypeChange(config: StatusIconConfig, newType: string): StatusIconConfig {
  if (newType === 'none') {
    return {
      ...config,
      fill: { type: 'none' },
    }
  }

  if (newType === 'solid') {
    return {
      ...config,
      fill: {
        type: 'solid',
        color: config.stroke.color, // Inherit stroke color
      },
    }
  }

  if (newType === 'full') {
    return {
      ...config,
      fill: {
        type: 'full',
        color: config.stroke.color, // Inherit stroke color
      },
    }
  }

  if (newType === 'pie') {
    return {
      ...config,
      fill: {
        type: 'pie',
        percentage: 50,
        color: config.stroke.color, // Inherit stroke color
      },
    }
  }

  return config
}

// ============================================================================
// Demo Content
// ============================================================================

interface DemoContentProps {
  config: StatusIconConfig
}

function DemoContent({ config }: DemoContentProps) {
  return (
    <>
      <StatusIcon config={config} />

      {/* Presets - pinned to bottom, uses CSS vars from PlaygroundLayout */}
      <div className="fixed bottom-8 left-[var(--playground-left)] right-[var(--playground-right)] flex items-center justify-center gap-6">
        {/* Healthy */}
        {['healthy'].map((id) => {
          const preset = STATUS_ICON_PRESETS.find((p) => p.id === id)
          if (!preset) return null
          return (
            <div key={preset.id} className="flex flex-col items-center gap-1.5">
              <StatusIcon
                config={{ ...preset.data, text: { ...preset.data.text, show: false } }}
              />
              <span className="text-[10px] text-quaternary">{preset.name}</span>
            </div>
          )
        })}

        {/* Separator */}
        <div className="h-8 w-px bg-quaternary" />

        {/* At-risk section */}
        {['at-risk-low', 'at-risk-high', 'last-chance'].map((id) => {
          const preset = STATUS_ICON_PRESETS.find((p) => p.id === id)
          if (!preset) return null
          return (
            <div key={preset.id} className="flex flex-col items-center gap-1.5">
              <StatusIcon
                config={{ ...preset.data, text: { ...preset.data.text, show: false } }}
              />
              <span className="text-[10px] text-quaternary">{preset.name}</span>
            </div>
          )
        })}

        {/* Separator */}
        <div className="h-8 w-px bg-quaternary" />

        {/* Closed states */}
        {['completed', 'clawback', 'canceled', 'defaulted', 'chargeback', 'refunded', 'declined'].map(
          (id) => {
            const preset = STATUS_ICON_PRESETS.find((p) => p.id === id)
            if (!preset) return null
            return (
              <div key={preset.id} className="flex flex-col items-center gap-1.5">
                <StatusIcon
                  config={{ ...preset.data, text: { ...preset.data.text, show: false } }}
                />
                <span className="text-[10px] text-quaternary">{preset.name}</span>
              </div>
            )
          }
        )}
      </div>
    </>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function StatusIconPlayground() {
  const [config, setConfig] = useState<StatusIconConfig>(DEFAULT_STATUS_ICON_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Special handling for fill type changes
    if (event.controlId === 'fill.type') {
      setConfig((prev) => handleFillTypeChange(prev, event.value as string))
      setActivePresetId(null)
      return
    }

    // Convert icon strokeWidth from string to number (select returns strings)
    if (event.controlId === 'icon.strokeWidth') {
      setConfig((prev) => setNestedValue(prev, event.controlId, parseFloat(event.value as string)))
      setActivePresetId(null)
      return
    }

    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = STATUS_ICON_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_STATUS_ICON_CONFIG)
    setActivePresetId('default')
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildStatusIconPanelConfig(config, STATUS_ICON_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      className="bg-primary"
      controlPanel={
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={() => config}
        />
      }
    >
      <DemoContent config={config} />
    </PlaygroundLayout>
  )
}
