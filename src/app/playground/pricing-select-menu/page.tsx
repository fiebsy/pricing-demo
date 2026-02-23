'use client'

/**
 * Pricing Select Menu Playground
 *
 * Isolated component: @/components/ui/features/pricing-select-menu
 * This playground demonstrates the standalone pricing select menu component
 * that was extracted from the biaxial-expand system.
 */

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { cn } from '@/lib/utils'
import { PricingSelectDemo } from './core/pricing-select-demo'
import { VariantControls } from './components/variant-controls'
import type {
  PricingSelectMenuPlaygroundConfig,
  FontSizeOption,
  FontWeightOption,
  TextColorOption,
  OpacityOption,
  PricingVariantId,
} from './config/types'
import {
  DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG,
  PRICING_SELECT_MENU_PRESETS,
} from './config/presets'
import { getPanelSections } from './panels/panel-config'

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
// CONTAINER HEADER STYLE HELPERS
// ============================================================================

function getTextColorClass(color: TextColorOption): string {
  const map: Record<TextColorOption, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    brand: 'text-brand',
  }
  return map[color] ?? 'text-primary'
}

function getFontSizeClass(size: FontSizeOption): string {
  const map: Record<FontSizeOption, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }
  return map[size] ?? 'text-sm'
}

function getFontWeightClass(weight: FontWeightOption): string {
  const map: Record<FontWeightOption, string> = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  }
  return map[weight] ?? 'font-normal'
}

function getOpacityClass(opacity: OpacityOption): string {
  const map: Record<OpacityOption, string> = {
    '100': 'opacity-100',
    '80': 'opacity-80',
    '60': 'opacity-60',
    '40': 'opacity-40',
  }
  return map[opacity] ?? 'opacity-100'
}

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function PricingSelectMenuPlayground() {
  const [config, setConfig] = useState<PricingSelectMenuPlaygroundConfig>(
    DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG
  )
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [resetKey, setResetKey] = useState(0)
  const [autoOpen, setAutoOpen] = useState(false)
  const [pricingVariant, setPricingVariant] = useState<PricingVariantId>('A')

  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Handle tier toggle changes (special format: selectMenu.availableTiers.tier-XXX)
    if (event.controlId.startsWith('selectMenu.availableTiers.tier-')) {
      const tierId = event.controlId.replace('selectMenu.availableTiers.', '')
      const isEnabled = event.value as boolean
      setConfig((prev) => {
        const currentTiers = prev.selectMenu.availableTiers
        let newTiers: string[]
        if (isEnabled) {
          // Add tier if not already present
          newTiers = currentTiers.includes(tierId) ? currentTiers : [...currentTiers, tierId]
        } else {
          // Remove tier (but ensure at least one tier remains)
          newTiers = currentTiers.filter((t) => t !== tierId)
          if (newTiers.length === 0) {
            newTiers = [tierId] // Keep at least one tier
          }
        }
        // Sort tiers to maintain order
        newTiers.sort((a, b) => {
          const numA = parseInt(a.replace('tier-', ''), 10)
          const numB = parseInt(b.replace('tier-', ''), 10)
          return numA - numB
        })
        return {
          ...prev,
          selectMenu: {
            ...prev.selectMenu,
            availableTiers: newTiers,
          },
        }
      })
      setActivePresetId(null)
      return
    }

    // Standard nested value update
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRICING_SELECT_MENU_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
      setResetKey((k) => k + 1)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG)
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

  const handlePricingVariantChange = useCallback((variantId: PricingVariantId) => {
    setPricingVariant(variantId)
  }, [])

  // Calculate effective widths based on debug container and sync settings
  const effectiveConfig = useMemo(() => {
    let panelWidth = config.layout.panelWidth
    let triggerWidth = config.layout.triggerWidth

    // If debug container is enabled, panel fills container inner width
    if (config.demo.debugContainer.enabled) {
      panelWidth =
        config.demo.debugContainer.width - 2 * config.demo.debugContainer.padding
    }

    // Sync trigger width to panel width if enabled
    if (config.layout.syncTriggerWidth) {
      triggerWidth = panelWidth
    }

    return {
      ...config,
      layout: {
        ...config.layout,
        panelWidth,
        triggerWidth,
      },
    }
  }, [config])

  // Adaptive container height: only applies fixed height for Variant B (static card mode)
  // Variant A uses overlay mode where content expands outside the container
  const computedContainerHeight = useMemo(() => {
    // Only apply calculated height for Variant B
    if (pricingVariant !== 'B') return undefined

    // Content height for Variant B: triggerHeightB + gap + maxBottomHeightB
    const contentHeight =
      config.layout.triggerHeightB +
      config.layout.bottomGap +
      config.layout.maxBottomHeightB

    // Header height (if shown): ~20px for text-sm + marginBottom
    const headerHeight = config.demo.debugContainer.header.show
      ? config.demo.debugContainer.header.marginBottom + 20
      : 0

    // Total = content + header + top/bottom padding
    return contentHeight + headerHeight + config.demo.debugContainer.padding * 2
  }, [config, pricingVariant])

  const panelSections = useMemo(() => getPanelSections(config), [config])

  // Build unified control panel config
  const panelConfig = useMemo(
    () => ({
      sections: panelSections,
      presets: PRICING_SELECT_MENU_PRESETS.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
      })),
      activePresetId,
      componentName: 'PricingSelectMenu',
    }),
    [panelSections, activePresetId]
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
      {config.demo.debugContainer.enabled ? (
        <div
          className={cn(
            'rounded-2xl',
            config.demo.debugContainer.showLines && 'border-2 border-red-500'
          )}
          style={{
            width: config.demo.debugContainer.width,
            padding: config.demo.debugContainer.padding,
            ...(computedContainerHeight && {
              height: computedContainerHeight,
              overflow: 'hidden',
            }),
          }}
        >
          {/* Container Header */}
          {config.demo.debugContainer.header.show && (
            <div
              className={cn(
                getTextColorClass(config.demo.debugContainer.header.textColor),
                getFontSizeClass(config.demo.debugContainer.header.fontSize),
                getFontWeightClass(config.demo.debugContainer.header.fontWeight),
                getOpacityClass(config.demo.debugContainer.header.opacity)
              )}
              style={{ marginBottom: config.demo.debugContainer.header.marginBottom }}
            >
              {config.demo.debugContainer.header.text}
            </div>
          )}
          <div key={resetKey}>
            <PricingSelectDemo
              config={effectiveConfig}
              autoOpen={autoOpen}
              pricingVariant={pricingVariant}
            />
          </div>
        </div>
      ) : (
        <div key={resetKey}>
          <PricingSelectDemo
            config={effectiveConfig}
            autoOpen={autoOpen}
            pricingVariant={pricingVariant}
          />
        </div>
      )}

      {/* A/B Variant Controls */}
      <VariantControls
        activeVariant={pricingVariant}
        onVariantChange={handlePricingVariantChange}
      />
    </PlaygroundLayout>
  )
}
