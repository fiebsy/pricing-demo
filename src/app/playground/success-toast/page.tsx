'use client'

/**
 * SuccessToast Playground
 *
 * Core component: ./core/ConfigurableToast.tsx
 * Production component: src/components/ui/prod/features/success-toast
 * Migration target: src/components/ui/prod/features/success-toast
 */

import { useCallback, useMemo, useState, useEffect } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

import { ConfigurableToast } from './core/ConfigurableToast'
import type { SuccessToastConfig } from './config/types'
import { DEFAULT_SUCCESS_TOAST_CONFIG, SUCCESS_TOAST_PRESETS } from './config/presets'
import { buildSuccessToastPanelConfig } from './panels/panel-config'

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

export default function SuccessToastPlayground() {
  const [config, setConfig] = useState<SuccessToastConfig>(DEFAULT_SUCCESS_TOAST_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [toastVisible, setToastVisible] = useState(true)
  const [toastKey, setToastKey] = useState(0)

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = SUCCESS_TOAST_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_SUCCESS_TOAST_CONFIG)
    setActivePresetId('default')
  }, [])

  const handleDismiss = useCallback(() => {
    setToastVisible(false)
  }, [])

  const handleReplay = useCallback(() => {
    setToastVisible(false)
    // Small delay to reset animation
    setTimeout(() => {
      setToastKey((k) => k + 1)
      setToastVisible(true)
    }, 100)
  }, [])

  // Auto-restart toast when config changes
  useEffect(() => {
    setToastVisible(false)
    const timer = setTimeout(() => {
      setToastKey((k) => k + 1)
      setToastVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [config])

  const panelConfig = useMemo(
    () => buildSuccessToastPanelConfig(config, SUCCESS_TOAST_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Preview Area */}
      <div className="flex h-full items-center justify-center bg-primary pr-[320px]">
        <div className="flex flex-col items-center gap-6">
          {/* Toast Preview */}
          <div className="relative w-[400px] h-[120px] flex items-center justify-center">
            <ConfigurableToast
              key={toastKey}
              config={config}
              visible={toastVisible}
              onDismiss={handleDismiss}
            />
          </div>

          {/* Replay Button */}
          <button
            onClick={handleReplay}
            className="px-4 py-2 text-sm font-medium text-primary bg-secondary rounded-lg
                       hover:bg-tertiary motion-safe:transition-colors"
          >
            Replay Toast
          </button>

          {/* Info */}
          <p className="text-xs text-tertiary">
            Toast auto-dismisses after {config.behavior.duration / 1000}s
          </p>
        </div>
      </div>
    </div>
  )
}
