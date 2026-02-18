/**
 * Landing Hero Playground
 *
 * Core component: ./core/landing-hero.tsx
 * Migration target: src/components/ui/prod/features/landing-hero
 *
 * Features:
 * - Background effects: SVG patterns, blur circle
 * - Image container: shine, shadow, corners, padding
 * - Interactive states: click scale, hover shine
 * - Live preview matching landing page
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { LandingHero } from './core/landing-hero'
import type { LandingHeroConfig } from './config/types'
import { DEFAULT_LANDING_HERO_CONFIG, LANDING_HERO_PRESETS } from './config/presets'
import { buildLandingHeroPanelConfig } from './panels/panel-config'

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

export default function LandingHeroPlayground() {
  const [config, setConfig] = useState<LandingHeroConfig>(DEFAULT_LANDING_HERO_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [slowMo, setSlowMo] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = LANDING_HERO_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_LANDING_HERO_CONFIG)
    setActivePresetId('default')
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildLandingHeroPanelConfig(config, LANDING_HERO_PRESETS, activePresetId),
    [config, activePresetId]
  )

  // Get config for copy (exclude any internal props)
  const getConfigForCopy = useCallback(() => {
    return config
  }, [config])

  return (
    <PlaygroundLayout
      className="bg-primary"
      controlPanel={
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={getConfigForCopy}
        />
      }
      debugControls={{
        slowMo,
        onSlowMoChange: setSlowMo,
        showDebug,
        onShowDebugChange: setShowDebug,
      }}
    >
      {/* Full-screen hero preview */}
      <div className="absolute inset-0">
        <LandingHero config={config} />
      </div>

      {/* Config display overlay */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="rounded-lg bg-secondary/80 p-4 text-xs text-tertiary backdrop-blur-sm">
          <p className="mb-2 font-medium text-secondary">Current Config:</p>
          <p>
            Pattern: <span className="text-primary">{config.background.showPattern ? config.background.patternType : 'off'}</span>
            {' · '}
            Blur Circle: <span className="text-primary">{config.background.showBlurCircle ? `${config.background.blurCircleSize}px` : 'off'}</span>
          </p>
          <p className="mt-1">
            Shine: <span className="text-primary">{config.image.shine}{config.image.shineIntensity}</span>
            {' · '}
            Shadow: <span className="text-primary">{config.image.shadow}</span>
            {' · '}
            Corner: <span className="text-primary">{config.image.outerCorner}</span>
          </p>
          <p className="mt-1">
            Click Scale: <span className="text-primary">{(config.interaction.scaleOnClick * 100).toFixed(0)}%</span>
            {' · '}
            Hover Intense: <span className="text-primary">{config.interaction.hoverShineIntense ? 'yes' : 'no'}</span>
          </p>
        </div>
      </div>
    </PlaygroundLayout>
  )
}
