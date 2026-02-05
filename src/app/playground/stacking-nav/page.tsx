/**
 * StackingNav Playground
 *
 * Test page for the stacking navigation component.
 * Uses centralized phase state machine for improved timing coordination.
 *
 * @module playground/stacking-nav
 */

'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import {
  StackingNav,
  type AnimationConfig,
  type StyleConfig,
  type ActivePath,
  debugLog,
} from '@/components/ui/features/stacking-nav-motion'

import type {
  PlaygroundConfig,
  ConfigPreset,
  EntryDirection,
  PageBackground,
} from './config/types'
import { NAV_VARIANTS } from './config/nav-items'
import { SPRING_PRESETS, ENTRY_DIRECTION_PRESETS } from './config/options'
import { CONFIG_PRESETS, DEFAULT_PLAYGROUND_CONFIG } from './config/presets'
import { createPanelConfig } from './panels/panel-config'

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function StackingNavPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [resetKey, setResetKey] = useState(0)
  const [currentPath, setCurrentPath] = useState<ActivePath>([])
  const [logCount, setLogCount] = useState(0)
  const [logEnabled, setLogEnabled] = useState(false)

  // Sync debug log enabled state
  useEffect(() => {
    if (logEnabled) {
      debugLog.enable()
    } else {
      debugLog.disable()
    }
  }, [logEnabled])

  // Subscribe to log updates
  useEffect(() => {
    return debugLog.subscribe(() => {
      setLogCount(debugLog.getCount())
    })
  }, [])

  const handleCopyLog = useCallback(() => {
    const logText = debugLog.getEntriesFormatted()
    navigator.clipboard.writeText(logText).then(() => {
      console.log('Log copied to clipboard')
    })
  }, [])

  const handleClearLog = useCallback(() => {
    debugLog.clear()
  }, [])

  // Transform config for component
  // Apply timeScale to all duration-based values (lower timeScale = slower animation)
  const animationConfig: Partial<AnimationConfig> = useMemo(() => {
    // Convert boolean toggle to numeric scale: false = 1 (normal), true = 0.1 (slow-mo)
    const scale = config.slowMoEnabled ? 0.1 : 1

    // For spring animations, lower stiffness and damping = slower
    // timeScale < 1 means slower, so we reduce stiffness proportionally
    const springMultiplier = scale * scale // Quadratic for more noticeable effect

    return {
      type: config.animationType,
      // Spring: lower stiffness = slower animation
      stiffness: config.springStiffness * springMultiplier,
      // Spring: proportionally lower damping to maintain feel
      damping: config.springDamping * scale,
      // Spring: mass affects inertia (higher = slower, more deliberate)
      mass: config.springMass,
      // Tween: higher duration = slower (divide by scale)
      duration: config.tweenDuration / 1000 / scale,
      ease: config.tweenEase,
      promotionDuration: config.promotionDuration / 1000 / scale,
      promotionScale: config.promotionScale,
      stagger: config.childStagger / 1000 / scale,
      entryOffsetX: config.entryOffsetX,
      entryOffsetY: config.entryOffsetY,
      childEntryDelay: config.childEntryDelay / 1000 / scale,
      entryScale: config.childEntryScale,
      entryOpacity: config.childEntryOpacity,
      entryFromParent: config.entryFromParent,
      entryInstant: config.entryInstant,
      exitScale: config.exitScale,
      exitUseCustomTiming: config.exitUseCustomTiming,
      exitDuration: config.exitDuration / 1000 / scale,
      exitEase: config.exitEase,
      exitDelay: config.exitDelay / 1000 / scale,
      collapseLayoutDuration: config.collapseLayoutDuration / 1000,
      skipLeafAnimation: config.skipLeafAnimation,
      hoverDelay: config.hoverDelay / 1000,
      timeScale: scale,
      syncChildEntryToPromotion: config.syncChildEntryToPromotion,
      promotionChildOffset: config.promotionChildOffset / 1000 / scale,
      // Demotion entry (siblings reappearing during collapse)
      demotionEntryDelay: config.demotionEntryDelay / 1000 / scale,
      demotionStagger: config.demotionStagger / 1000 / scale,
      demotionEntryOpacity: config.demotionEntryOpacity,
      demotionEntryScale: config.demotionEntryScale,
    }
  }, [config])

  const styleConfig: Partial<StyleConfig> = useMemo(
    () => ({
      peekOffset: config.peekOffset,
      anchoredOpacity: config.anchoredOpacity,
      gap: config.gap,
      buttonSize: config.buttonSize,
      buttonRoundness: config.buttonRoundness,
      expandedVariant: config.expandedVariant,
      childVariant: config.childVariant,
      anchoredVariant: config.anchoredVariant,
      selectedLeafVariant: config.selectedLeafVariant,
      reentryVariant: config.reentryVariant,
      demotingVariant: config.demotingVariant,
      // Level All Button
      showLevelAll: config.showLevelAll,
      levelAllLabel: config.levelAllLabel,
      levelAllActiveVariant: config.levelAllActiveVariant,
      levelAllInactiveVariant: config.levelAllInactiveVariant,
    }),
    [config]
  )

  // Get demo items based on variant
  const demoItems = NAV_VARIANTS[config.navVariant].items

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handlers
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
          navVariant: prev.navVariant, // Keep nav variant
        }))
        return
      }
    }

    // Handle spring preset selection (within spring animation type)
    if (controlId === 'springPreset' && value !== 'custom') {
      const preset = SPRING_PRESETS[value as keyof typeof SPRING_PRESETS]
      if (preset) {
        setConfig((prev) => ({
          ...prev,
          springPreset: value as PlaygroundConfig['springPreset'],
          springStiffness: preset.stiffness,
          springDamping: preset.damping,
          springMass: preset.mass,
          configPreset: 'custom', // Mark as custom when tuning
        }))
        return
      }
    }

    // Handle manual spring adjustment - switch to custom presets
    if (controlId === 'springStiffness' || controlId === 'springDamping' || controlId === 'springMass') {
      setConfig((prev) => ({
        ...prev,
        [controlId]: value,
        springPreset: 'custom',
        configPreset: 'custom',
      }))
      return
    }

    // Handle entry direction preset selection
    if (controlId === 'entryDirection' && value !== 'custom') {
      const directionPreset =
        ENTRY_DIRECTION_PRESETS[value as Exclude<EntryDirection, 'custom'>]
      if (directionPreset) {
        setConfig((prev) => ({
          ...prev,
          entryDirection: value as EntryDirection,
          entryOffsetX: directionPreset.x,
          entryOffsetY: directionPreset.y,
          configPreset: 'custom',
        }))
        return
      }
    }

    // Handle manual entry offset adjustment - detect matching preset or switch to custom
    if (controlId === 'entryOffsetX' || controlId === 'entryOffsetY') {
      setConfig((prev) => {
        const newX = controlId === 'entryOffsetX' ? (value as number) : prev.entryOffsetX
        const newY = controlId === 'entryOffsetY' ? (value as number) : prev.entryOffsetY

        // Check if values match any preset
        let matchedPreset: EntryDirection = 'custom'
        for (const [presetName, presetValues] of Object.entries(ENTRY_DIRECTION_PRESETS)) {
          if (presetValues.x === newX && presetValues.y === newY) {
            matchedPreset = presetName as EntryDirection
            break
          }
        }

        return {
          ...prev,
          [controlId]: value,
          entryDirection: matchedPreset,
          configPreset: 'custom',
        }
      })
      return
    }

    // Any other change marks config as custom
    // Level-all options, display options, and debug options don't affect the preset status
    const nonPresetFields = [
      'navVariant',
      'showNumbers',
      'showDebug',
      'showPhaseIndicator',
      'pageBackground',
      'showLevelAll',
      'levelAllLabel',
      'levelAllActiveVariant',
      'levelAllInactiveVariant',
      'slowMoEnabled', // Debug feature - doesn't affect preset
    ]
    // Button style & variant fields DO affect preset status (not in nonPresetFields)
    if (!nonPresetFields.includes(controlId)) {
      setConfig((prev) => ({ ...prev, [controlId]: value, configPreset: 'custom' }))
    } else {
      setConfig((prev) => ({ ...prev, [controlId]: value }))
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PLAYGROUND_CONFIG)
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const handleSelectionChange = useCallback((path: ActivePath) => {
    setCurrentPath(path)
  }, [])

  const getConfigForCopy = useCallback(() => {
    return {
      animationConfig,
      styleConfig,
      showNumbers: config.showNumbers,
      showDebug: config.showDebug,
      showPhaseIndicator: config.showPhaseIndicator,
    }
  }, [animationConfig, styleConfig, config.showNumbers, config.showDebug, config.showPhaseIndicator])

  // Background class mapping
  const bgClasses: Record<PageBackground, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    brand: 'bg-brand-solid',
    black: 'bg-black',
    white: 'bg-white',
  }

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      {/* Version label */}
      <div className="fixed left-4 top-4 z-50">
        <div className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
          stacking-nav
        </div>
      </div>

      {/* Debug log panel */}
      <div className="fixed left-4 top-14 z-50 flex items-center gap-2">
        <button
          onClick={() => setLogEnabled(!logEnabled)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium shadow-md transition-colors ${
            logEnabled
              ? 'bg-green-600 text-white'
              : 'bg-secondary text-secondary hover:bg-tertiary'
          }`}
        >
          {logEnabled ? `Logging (${logCount})` : 'Log Off'}
        </button>
        {logEnabled && (
          <>
            <button
              onClick={handleCopyLog}
              className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary shadow-md transition-colors hover:bg-tertiary"
            >
              Copy Log
            </button>
            <button
              onClick={handleClearLog}
              className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary shadow-md transition-colors hover:bg-tertiary"
            >
              Clear
            </button>
          </>
        )}
      </div>

      {/* Scrollable container with sticky demo */}
      <div className="pr-[352px]">
        {/* Tall container for scroll space */}
        <div className="min-h-[300vh]">
          {/* Top spacer - scroll past this to trigger sticky */}
          <div className="h-[50vh]" />

          {/* Sticky container */}
          <div className={`sticky top-0 z-10 py-12 ${bgClasses[config.pageBackground]}`}>
            <div className="flex items-center justify-center">
              <div
                className={`relative flex flex-nowrap justify-start ${
                  config.showContainerBounds
                    ? 'outline outline-2 outline-dashed outline-red-500/50 bg-red-500/5'
                    : ''
                }`}
                style={{
                  width: `${config.containerWidth}px`,
                  overflow: config.containerOverflow,
                }}
              >
                <StackingNav
                  key={resetKey}
                  items={demoItems}
                  animationConfig={animationConfig}
                  styleConfig={styleConfig}
                  showNumbers={config.showNumbers}
                  showDebug={config.showDebug}
                  showPhaseIndicator={config.showPhaseIndicator}
                  onReset={handleComponentReset}
                  onSelectionChange={handleSelectionChange}
                />

                {/* Right edge gradient mask */}
                {config.showOverflowGradient && (
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-[200]"
                    style={{
                      width: `${config.gradientWidth}px`,
                      background: `linear-gradient(to left, ${
                        config.pageBackground === 'primary'
                          ? 'var(--color-bg-primary)'
                          : config.pageBackground === 'secondary'
                            ? 'var(--color-bg-secondary)'
                            : config.pageBackground === 'tertiary'
                              ? 'var(--color-bg-tertiary)'
                              : config.pageBackground === 'brand'
                                ? 'var(--color-bg-brand-solid)'
                                : config.pageBackground === 'black'
                                  ? '#000'
                                  : '#fff'
                      }, transparent)`,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Content rows - scroll beneath sticky nav */}
          <div className="space-y-6 px-12 py-8">
            {Array.from({ length: 12 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-4">
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="h-32 flex-1 rounded-2xl border border-primary/10 bg-tertiary/50"
                  />
                ))}
              </div>
            ))}
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
