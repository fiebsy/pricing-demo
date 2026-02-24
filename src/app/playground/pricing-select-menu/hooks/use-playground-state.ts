/**
 * usePlaygroundState Hook
 *
 * Centralized state management for pricing select menu playground.
 */

import { useCallback, useState } from 'react'
import type { ControlChangeEvent } from '@/components/ui/patterns/control-panel'
import { toggleTierInList } from '@/components/ui/features/pricing-select-menu'
import type { PricingSelectMenuPlaygroundConfig, PricingVariantId } from '../config/types'
import {
  DEFAULT_PRICING_SELECT_MENU_PLAYGROUND_CONFIG,
  PRICING_SELECT_MENU_PRESETS,
} from '../config/presets'

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
// STATE INTERFACE
// ============================================================================

export interface PlaygroundState {
  config: PricingSelectMenuPlaygroundConfig
  activePresetId: string | null
  resetKey: number
  autoOpen: boolean
  pricingVariant: PricingVariantId
}

export interface PlaygroundActions {
  handleChange: (event: ControlChangeEvent) => void
  handlePresetChange: (presetId: string) => void
  handleReset: () => void
  handleSlowMoChange: (enabled: boolean) => void
  handleShowDebugChange: (enabled: boolean) => void
  handleAutoOpenChange: (enabled: boolean) => void
  handlePricingVariantChange: (variantId: PricingVariantId) => void
}

// ============================================================================
// HOOK
// ============================================================================

export function usePlaygroundState(): [PlaygroundState, PlaygroundActions] {
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
        const newTiers = toggleTierInList(prev.selectMenu.availableTiers, tierId, isEnabled)
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

  const state: PlaygroundState = {
    config,
    activePresetId,
    resetKey,
    autoOpen,
    pricingVariant,
  }

  const actions: PlaygroundActions = {
    handleChange,
    handlePresetChange,
    handleReset,
    handleSlowMoChange,
    handleShowDebugChange,
    handleAutoOpenChange,
    handlePricingVariantChange,
  }

  return [state, actions]
}
