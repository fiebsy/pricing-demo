'use client'

/**
 * SlideCard Playground
 *
 * Core component: ./core/slide-card.tsx
 * Migration target: src/components/ui/prod/features/slide-card
 */

import { useCallback, useMemo, useState, useEffect } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import SunIcon from '@hugeicons-pro/core-stroke-rounded/Sun01Icon'
import MoonIcon from '@hugeicons-pro/core-stroke-rounded/Moon01Icon'

import { SlideCard } from './core/slide-card'
import type { SlideCardConfig } from './config/types'
import { DEFAULT_SLIDECARD_CONFIG, SLIDECARD_PRESETS } from './config/presets'
import { buildSlideCardPanelConfig } from './panels/panel-config'

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

export default function SlideCardPlayground() {
  const [config, setConfig] = useState<SlideCardConfig>(DEFAULT_SLIDECARD_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [animationKey, setAnimationKey] = useState(0)
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    } else {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    }
  }, [isLightMode])

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => {
      const newConfig = setNestedValue(prev, event.controlId, event.value)
      // Trigger re-animation when animation settings change
      if (event.controlId.startsWith('animation.')) {
        setAnimationKey((k) => k + 1)
      }
      return newConfig
    })
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = SLIDECARD_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
      setAnimationKey((k) => k + 1) // Trigger animation on preset change
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_SLIDECARD_CONFIG)
    setActivePresetId('default')
    setAnimationKey((k) => k + 1)
  }, [])

  const panelConfig = useMemo(
    () => buildSlideCardPanelConfig(config, SLIDECARD_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Light Mode Toggle */}
      <button
        onClick={() => setIsLightMode(!isLightMode)}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-tertiary hover:bg-tertiary transition-colors"
        aria-label="Toggle light mode"
      >
        <HugeIcon
          icon={isLightMode ? SunIcon : MoonIcon}
          size={20}
          className="text-primary"
        />
        <span className="text-sm text-primary font-medium">
          {isLightMode ? 'Light' : 'Dark'}
        </span>
      </button>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Preview Area */}
      <div className="flex h-full items-center justify-center bg-primary">
        <div className="flex flex-col items-center gap-6">
          <SlideCard key={animationKey} config={config} />
          
          {/* Context text (like in financial chart) */}
          {config.content.type === 'chart' && config.content.showPlaceholder && (
            <p className="text-lg text-tertiary text-center mt-4">
              Revenue projections based on current growth trajectory
            </p>
          )}
        </div>
      </div>
    </div>
  )
}