/**
 * Coin Stack Playground
 *
 * Core component: ./core/coin-stack.tsx
 * Migration target: src/components/ui/prod/features/coin-stack
 *
 * Features:
 * - 3D coin stack SVG with two tiers
 * - Configurable gradients for face fills
 * - Drop shadows, inner glow, and shine effects
 * - Multiple presets (Classic, Gold Metallic, Brand, Arcade Blue, etc.)
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { CoinStack } from './core/coin-stack'
import type { CoinStackConfig, StageId } from './config/types'
import { DEFAULT_CONFIG, PRESETS } from './config/presets'
import { DEFAULT_STAGES, DEFAULT_TRANSITION } from './config/stages'
import { buildCoinStackPanelConfig } from './panels/panel-config'
import { StageControls } from './components/stage-controls'

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
// Background Classes
// ============================================================================

const BACKGROUND_CLASSES: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
}

// ============================================================================
// Demo Content
// ============================================================================

interface DemoContentProps {
  config: CoinStackConfig
  activeStage: StageId
  onStageChange: (stageId: StageId) => void
}

function DemoContent({ config, activeStage, onStageChange }: DemoContentProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <CoinStack config={config} transition={DEFAULT_TRANSITION} />

      {/* Stage controls */}
      <StageControls activeStage={activeStage} onStageChange={onStageChange} />

      {/* Presets showcase */}
      <div className="fixed bottom-8 left-[var(--playground-left)] right-[var(--playground-right)] flex items-center justify-center gap-8">
        {PRESETS.map((preset) => (
          <div key={preset.id} className="flex flex-col items-center gap-2">
            <CoinStack
              config={{
                ...preset.config,
                size: { ...preset.config.size, width: 60 },
                demo: { ...preset.config.demo, showDebug: false },
              }}
            />
            <span className="text-[10px] text-quaternary">{preset.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function CoinStackPlayground() {
  const [config, setConfig] = useState<CoinStackConfig>(DEFAULT_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [activeStage, setActiveStage] = useState<StageId>(1)

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Handle gradient toggle changes - sync the gradient.enabled flag
    if (event.controlId === 'bottomTier.useGradient') {
      setConfig((prev) => ({
        ...prev,
        bottomTier: {
          ...prev.bottomTier,
          useGradient: event.value as boolean,
          gradient: {
            ...prev.bottomTier.gradient,
            enabled: event.value as boolean,
          },
        },
      }))
      setActivePresetId(null)
      return
    }

    if (event.controlId === 'topTier.useGradient') {
      setConfig((prev) => ({
        ...prev,
        topTier: {
          ...prev.topTier,
          useGradient: event.value as boolean,
          gradient: {
            ...prev.topTier.gradient,
            enabled: event.value as boolean,
          },
        },
      }))
      setActivePresetId(null)
      return
    }

    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.config)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
    setActivePresetId('default')
    setActiveStage(1)
  }, [])

  // Handle stage change - only updates stylistic properties, preserves size
  const handleStageChange = useCallback((stageId: StageId) => {
    setActiveStage(stageId)
    const preset = PRESETS.find((p) => p.id === DEFAULT_STAGES[stageId].presetId)
    if (preset) {
      setConfig((prev) => ({
        ...preset.config,
        size: prev.size, // Preserve current size
        demo: prev.demo, // Preserve demo settings
      }))
      setActivePresetId(preset.id)
    }
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildCoinStackPanelConfig(config, PRESETS, activePresetId),
    [config, activePresetId]
  )

  // Get background class
  const bgClass = BACKGROUND_CLASSES[config.demo.pageBackground] || 'bg-secondary'

  return (
    <PlaygroundLayout
      className={bgClass}
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
      <DemoContent config={config} activeStage={activeStage} onStageChange={handleStageChange} />
    </PlaygroundLayout>
  )
}
