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

import { cn } from '@/lib/utils'
import { DemoSwitcher } from './core/demo-variants'
import { VariantControls } from './components/variant-controls'
import type {
  BiaxialExpandPlaygroundConfig,
  FontSizeOption,
  FontWeightOption,
  TextColorOption,
  OpacityOption,
  PricingVariantId,
} from './config/types'
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

export default function BiaxialExpandPlayground() {
  const [config, setConfig] = useState<BiaxialExpandPlaygroundConfig>(
    DEFAULT_BIAXIAL_EXPAND_PLAYGROUND_CONFIG
  )
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [resetKey, setResetKey] = useState(0)
  const [autoOpen, setAutoOpen] = useState(false)
  const [pricingVariant, setPricingVariant] = useState<PricingVariantId>('A')

  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Handle preset-related changes
    if (event.controlId === 'demo.variant') {
      // Reset pricing variant when switching demo types
      setPricingVariant('A')
      // When demo variant changes, find matching preset if available
      const variantPresetMap: Record<string, string> = {
        'command-menu': 'command-menu',
        'dashboard-metric': 'dashboard-metric',
        'custom': 'minimal',
        'pricing-select': 'pricing-select',
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
      {config.demo.debugContainer.enabled ? (
        <div
          className={cn(
            'rounded-2xl',
            config.demo.debugContainer.showLines && 'border-2 border-red-500'
          )}
          style={{
            width: config.demo.debugContainer.width,
            padding: config.demo.debugContainer.padding,
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
          <div key={resetKey} className="flex items-center gap-4">
            {/* Left test block - gets pushed when LeftSlot expands */}
            {config.leftSlot.enabled && (
              <div className="w-12 h-12 bg-tertiary rounded-xl border border-primary flex items-center justify-center shrink-0">
                <span className="text-xs text-tertiary">L</span>
              </div>
            )}

            <DemoSwitcher config={effectiveConfig} autoOpen={autoOpen} pricingVariant={pricingVariant} />

            {/* Right test block - gets pushed when RightSlot expands */}
            {config.rightSlot.enabled && (
              <div className="w-12 h-12 bg-tertiary rounded-xl border border-primary flex items-center justify-center shrink-0">
                <span className="text-xs text-tertiary">R</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div key={resetKey} className="flex items-center gap-4">
          {/* Left test block - gets pushed when LeftSlot expands */}
          {config.leftSlot.enabled && (
            <div className="w-12 h-12 bg-tertiary rounded-xl border border-primary flex items-center justify-center shrink-0">
              <span className="text-xs text-tertiary">L</span>
            </div>
          )}

          <DemoSwitcher config={effectiveConfig} autoOpen={autoOpen} pricingVariant={pricingVariant} />

          {/* Right test block - gets pushed when RightSlot expands */}
          {config.rightSlot.enabled && (
            <div className="w-12 h-12 bg-tertiary rounded-xl border border-primary flex items-center justify-center shrink-0">
              <span className="text-xs text-tertiary">R</span>
            </div>
          )}
        </div>
      )}

      {/* A/B Variant Controls - shown only for pricing-select variant */}
      {config.demo.variant === 'pricing-select' && (
        <VariantControls
          activeVariant={pricingVariant}
          onVariantChange={handlePricingVariantChange}
        />
      )}
    </PlaygroundLayout>
  )
}
