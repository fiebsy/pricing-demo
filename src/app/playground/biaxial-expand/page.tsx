'use client'

/**
 * BiaxialExpand Playground
 *
 * Core component: @/components/ui/core/primitives/biaxial-expand
 * Migration target: Production-ready component with full configuration
 */

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { DemoSwitcher } from './core/demo-variants'
import type { BiaxialExpandPlaygroundConfig } from './config/types'
import {
  DEFAULT_BIAXIAL_EXPAND_PLAYGROUND_CONFIG,
  BIAXIAL_EXPAND_PRESETS,
} from './config/presets'
import { buildBiaxialExpandPanelConfig } from './panels/panel-config'

// ============================================================================
// HELPERS
// ============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = { ...obj } as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) }
    current = current[keys[i]] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

// ============================================================================
// PAGE BACKGROUND CLASSES
// ============================================================================

function getPageBackgroundClass(bg: string): string {
  switch (bg) {
    case 'primary':
      return 'bg-primary'
    case 'secondary':
      return 'bg-secondary'
    case 'tertiary':
      return 'bg-tertiary'
    default:
      return 'bg-primary'
  }
}

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function BiaxialExpandPlayground() {
  const [config, setConfig] = useState<BiaxialExpandPlaygroundConfig>(
    DEFAULT_BIAXIAL_EXPAND_PLAYGROUND_CONFIG
  )
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [resetKey, setResetKey] = useState(0)
  const [autoOpen, setAutoOpen] = useState(false)

  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Handle preset-related changes
    if (event.controlId === 'demo.variant') {
      // When demo variant changes, find matching preset if available
      const variantPresetMap: Record<string, string> = {
        'command-menu': 'command-menu',
        'dashboard-metric': 'dashboard-metric',
        'custom': 'minimal',
      }
      const presetId = variantPresetMap[event.value as string]
      if (presetId) {
        const preset = BIAXIAL_EXPAND_PRESETS.find((p) => p.id === presetId)
        if (preset) {
          setConfig(preset.data)
          setActivePresetId(presetId)
          setResetKey((k) => k + 1)
          return
        }
      }
    }

    // Standard nested value update
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = BIAXIAL_EXPAND_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
      setResetKey((k) => k + 1)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_BIAXIAL_EXPAND_PLAYGROUND_CONFIG)
    setActivePresetId('default')
    setResetKey((k) => k + 1)
  }, [])

  const handleSlowMoChange = useCallback((enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      demo: { ...prev.demo, slowMo: enabled },
    }))
    setActivePresetId(null)
  }, [])

  const handleShowDebugChange = useCallback((enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      demo: { ...prev.demo, showDebug: enabled },
    }))
    setActivePresetId(null)
  }, [])

  const handleAutoOpenChange = useCallback((enabled: boolean) => {
    setAutoOpen(enabled)
  }, [])

  const panelConfig = useMemo(
    () => buildBiaxialExpandPanelConfig(config, BIAXIAL_EXPAND_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      controlPanel={
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={() => config}
        />
      }
      debugControls={{
        slowMo: config.demo.slowMo,
        onSlowMoChange: handleSlowMoChange,
        showDebug: config.demo.showDebug,
        onShowDebugChange: handleShowDebugChange,
        autoOpen,
        onAutoOpenChange: handleAutoOpenChange,
      }}
      className={getPageBackgroundClass(config.demo.pageBackground)}
    >
      <div key={resetKey} className="flex items-center gap-4">
        {/* Left test block - gets pushed when LeftSlot expands */}
        {config.leftSlot.enabled && (
          <div className="w-12 h-12 bg-tertiary rounded-xl border border-primary flex items-center justify-center shrink-0">
            <span className="text-xs text-tertiary">L</span>
          </div>
        )}

        <DemoSwitcher config={config} autoOpen={autoOpen} />

        {/* Right test block - gets pushed when RightSlot expands */}
        {config.rightSlot.enabled && (
          <div className="w-12 h-12 bg-tertiary rounded-xl border border-primary flex items-center justify-center shrink-0">
            <span className="text-xs text-tertiary">R</span>
          </div>
        )}
      </div>
    </PlaygroundLayout>
  )
}
