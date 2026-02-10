/**
 * StackingNav Playground
 *
 * Test page for the stacking navigation component.
 * Uses centralized phase state machine for improved timing coordination.
 *
 * @module playground/stacking-nav
 */

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  PlaygroundDebugControls,
} from '@/components/ui/patterns/control-panel'
import {
  StackingNav,
  type AnimationConfig,
  type StyleConfig,
  type ActivePath,
} from '@/components/ui/features/stacking-nav-motion'

import { Badge } from '@/components/ui/core/primitives/badge'

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
import { MOCK_CARDS } from './config/mock-content'

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function StackingNavPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG)
  const [resetKey, setResetKey] = useState(0)
  const [currentPath, setCurrentPath] = useState<ActivePath>([])

  // Height-locking refs to prevent scroll jump when filtering reduces content
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const heightLockRef = useRef(false)

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
      // Container
      minHeight: config.navMinHeight,
    }),
    [config]
  )

  // Get demo items based on variant
  const demoItems = NAV_VARIANTS[config.navVariant].items

  // Filter cards based on current nav selection
  const filteredCards = useMemo(() => {
    // Only filter for 'orders' variant (which uses invoices/payments/refunds)
    if (config.navVariant !== 'orders') return MOCK_CARDS
    if (currentPath.length === 0) return MOCK_CARDS // "All"

    return MOCK_CARDS.filter((card) => {
      if (currentPath[0] && card.category !== currentPath[0]) return false
      if (currentPath[1] && card.status !== currentPath[1]) return false
      if (currentPath[2] && card.subStatus !== currentPath[2]) return false
      return true
    })
  }, [currentPath, config.navVariant])

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
      'showContentGrid', // Display toggle - doesn't affect preset
      'navAlignment', // Layout option - doesn't affect preset
      'debugAlignment', // Layout option - doesn't affect preset
      'debugSpacing', // Layout option - doesn't affect preset
      'debugOffsetX', // Layout option - doesn't affect preset
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
    // Height-locking disabled for testing - shows raw scroll jump behavior
    setCurrentPath(path)
  }, [])

  const getConfigForCopy = useCallback(() => {
    return {
      animationConfig,
      styleConfig,
      showNumbers: config.showNumbers,
      showDebug: config.showDebug,
      showPhaseIndicator: config.showPhaseIndicator,
      navAlignment: config.navAlignment,
      debugAlignment: config.debugAlignment,
      debugSpacing: config.debugSpacing,
      debugOffsetX: config.debugOffsetX,
    }
  }, [animationConfig, styleConfig, config.showNumbers, config.showDebug, config.showPhaseIndicator, config.navAlignment, config.debugAlignment, config.debugSpacing, config.debugOffsetX])

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
      {/* Scrollable container with sticky demo */}
      <div>
        {/* Container for scroll space */}
        <div className="min-h-screen">
          {/* Top spacer - scroll past this to trigger sticky */}
          <div className="h-[200px]" />

          {/* Sticky container with fade */}
          <div className="sticky top-0 z-10">
            <div className={`flex flex-col items-center px-6 py-2 ${bgClasses[config.pageBackground]}`}>
              {/* Wrapper for nav + debug controls positioning */}
              <div className="relative w-full" style={{ maxWidth: `${config.containerWidth}px` }}>
                <div
                  className={`relative flex w-full flex-nowrap ${
                    config.navAlignment === 'center' ? 'justify-center' : 'justify-start'
                  } ${
                    config.showContainerBounds
                      ? 'outline outline-2 outline-dashed outline-red-500/50 bg-red-500/5'
                      : ''
                  }`}
                  style={{
                    overflow: config.containerOverflow,
                    paddingTop: config.containerPaddingTop > 0 ? `${config.containerPaddingTop}px` : undefined,
                    paddingRight: config.containerPaddingRight > 0 ? `${config.containerPaddingRight}px` : undefined,
                    paddingBottom: config.containerPaddingBottom > 0 ? `${config.containerPaddingBottom}px` : undefined,
                    paddingLeft: config.containerPaddingLeft > 0 ? `${config.containerPaddingLeft}px` : undefined,
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

                {/* Edge gradient masks - inside container bounds */}
                {(config.showOverflowGradient || config.showContainerBounds) && (() => {
                  const gradientColor = config.showContainerBounds
                    ? 'rgba(168, 85, 247, 0.5)' // Purple for debug
                    : config.pageBackground === 'primary'
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
                  return (
                  <>
                    {/* Top edge */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 z-[200]"
                      style={{
                        height: `${config.gradientWidth}px`,
                        background: `linear-gradient(to bottom, ${gradientColor}, transparent)`,
                      }}
                    />
                    {/* Right edge */}
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 z-[200]"
                      style={{
                        width: `${config.gradientWidth}px`,
                        background: `linear-gradient(to left, ${gradientColor}, transparent)`,
                      }}
                    />
                    {/* Bottom edge */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-[200]"
                      style={{
                        height: `${config.gradientWidth}px`,
                        background: `linear-gradient(to top, ${gradientColor}, transparent)`,
                      }}
                    />
                    {/* Left edge */}
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 z-[200]"
                      style={{
                        width: `${config.gradientWidth}px`,
                        background: `linear-gradient(to right, ${gradientColor}, transparent)`,
                      }}
                    />
                  </>
                  )
                })()}
                </div>

                {/* Debug Controls */}
                <div
                  className={`flex ${config.debugAlignment === 'center' ? 'justify-center' : 'justify-start'}`}
                  style={{
                    marginTop: `${config.debugSpacing}px`,
                    marginLeft: config.debugOffsetX !== 0 ? `${config.debugOffsetX}px` : undefined,
                  }}
                >
                  <PlaygroundDebugControls
                    slowMo={config.slowMoEnabled}
                    onSlowMoChange={(enabled) =>
                      setConfig((prev) => ({ ...prev, slowMoEnabled: enabled }))
                    }
                    showDebug={config.showDebug}
                    onShowDebugChange={(enabled) =>
                      setConfig((prev) => ({ ...prev, showDebug: enabled }))
                    }
                  />
                </div>
              </div>
            </div>
            {/* Bottom fade for sticky nav */}
            <div
              className="pointer-events-none h-4"
              style={{
                background: `linear-gradient(to bottom, ${
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
          </div>

          {/* Content cards - scroll beneath sticky nav */}
          {config.showContentGrid && (
            <div ref={contentWrapperRef} className="relative flex justify-center px-6 pt-4 pb-32">
              <div
                className="grid w-full gap-4"
                style={{
                  maxWidth: `${config.containerWidth}px`,
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                }}
              >
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="min-w-[160px] rounded-2xl bg-secondary/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-primary/40">
                          {card.title}
                        </p>
                        <p className="truncate text-xs text-primary/20">
                          {card.subtitle}
                        </p>
                      </div>
                      <Badge color="gray" size="xs" shape="squircle" className="opacity-50">
                        {card.badgeLabel}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm font-medium text-primary/40">
                      {card.amount}
                    </p>
                  </div>
                ))}
              </div>

              {/* Gradient fade at bottom */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
                style={{
                  background: `linear-gradient(to top, ${
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
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
        defaultMinimized
      />
    </div>
  )
}
