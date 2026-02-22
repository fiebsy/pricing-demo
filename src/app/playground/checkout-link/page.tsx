/**
 * Checkout Link Playground
 *
 * Core component: ./core/checkout-page.tsx
 * Migration target: src/components/ui/patterns/checkout
 *
 * Features:
 * - Stripe-style checkout page recreation
 * - Payment method accordion (Card, Google Pay, Bank)
 * - Order summary with product details
 * - Configurable business branding, theme, and layout
 * - Multiple presets (Default, Annual, Enterprise, Minimal, Google Pay First)
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { CheckoutPage } from './core/checkout-page'
import type { CheckoutConfig } from './config/types'
import { DEFAULT_CHECKOUT_CONFIG, CHECKOUT_PRESETS } from './config/presets'
import { buildCheckoutPanelConfig } from './panels/panel-config'

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

export default function CheckoutLinkPlayground() {
  const [config, setConfig] = useState<CheckoutConfig>(DEFAULT_CHECKOUT_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = CHECKOUT_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CHECKOUT_CONFIG)
    setActivePresetId('default')
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildCheckoutPanelConfig(config, CHECKOUT_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      className="bg-[#f2f2f3]"
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
      <CheckoutPage config={config} />
    </PlaygroundLayout>
  )
}
