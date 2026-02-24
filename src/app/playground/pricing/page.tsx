/**
 * Pricing Modal Playground
 *
 * Reusable modal layout with fixed dimensions and flow-based content.
 * Core constituents: Asset, Header, Content A, Content B (fill), Button.
 *
 * Features:
 * - Auto-open integration (disables background clicks)
 * - Flow 1 / Flow 2 switching with per-flow content
 * - Fixed width and height container
 * - Content B fill property (flex-1)
 * - Pro Card integration in Content B
 * - Full styling control via UnifiedControlPanel
 */

'use client'

import { useCallback, useEffect, useState, useMemo } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import { Button } from '@/components/ui/core/primitives/button'
import { cn } from '@/lib/utils'

import { PricingModal } from './core/pricing-modal'
import { PRICING_TIERS } from './core/pricing-tiers'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import type { PricingPlaygroundConfig, FlowId } from './config/types'
import { DEFAULT_PRICING_CONFIG, PRICING_PRESETS } from './config/presets'
import { buildPricingPanelConfig } from './panels/panel-config'
import { FlowControls } from './components/flow-controls'
import { usePricingFlow, type UsePricingFlowReturn } from './hooks/use-pricing-flow'

// ============================================================================
// Utility: Deep set nested value
// ============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]
    const nextIsArrayIndex = /^\d+$/.test(nextKey)

    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = nextIsArrayIndex ? [] : {}
    } else if (Array.isArray(current[key])) {
      current[key] = [...(current[key] as unknown[])]
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

// ============================================================================
// Demo Content
// ============================================================================

interface DemoContentProps {
  config: PricingPlaygroundConfig
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  activeFlow: FlowId
  onFlowChange: (flowId: FlowId) => void
  selectedTier: PricingTier
  onTierSelect: (tier: PricingTier) => void
  /** Pricing flow state from usePricingFlow */
  pricingFlow: UsePricingFlowReturn
}

function DemoContent({
  config,
  isOpen,
  onOpenChange,
  activeFlow,
  onFlowChange,
  selectedTier,
  onTierSelect,
  pricingFlow,
}: DemoContentProps) {
  const bgClass =
    config.demo.pageBackground === 'primary'
      ? 'bg-primary'
      : config.demo.pageBackground === 'secondary'
        ? 'bg-secondary'
        : 'bg-tertiary'

  return (
    <div className={cn('flex h-full w-full items-center justify-center', bgClass)}>
      {/* Trigger Button */}
      {!isOpen && (
        <Button
          variant="primary"
          size="lg"
          onClick={() => onOpenChange(true)}
        >
          Open Modal
        </Button>
      )}

      {/* Modal */}
      <PricingModal
        config={config}
        open={isOpen}
        onOpenChange={onOpenChange}
        activeFlow={activeFlow}
        selectedTier={selectedTier}
        onTierSelect={onTierSelect}
        buttonStateId={pricingFlow.stateId}
        buttonState={pricingFlow.state}
        showSecondary={pricingFlow.showSecondary}
        onPrimaryClick={pricingFlow.handlePrimaryClick}
        onBackClick={pricingFlow.handleBack}
      />

      {/* Flow Controls - pinned to bottom */}
      {isOpen && (
        <FlowControls
          activeFlow={activeFlow}
          onFlowChange={onFlowChange}
        />
      )}
    </div>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function PricingPlayground() {
  const [config, setConfig] = useState<PricingPlaygroundConfig>(DEFAULT_PRICING_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [isOpen, setIsOpen] = useState(false)
  const [activeFlow, setActiveFlow] = useState<FlowId>('flow-a')
  // Lifted tier state for flow continuity (persists across A→B transitions)
  const [selectedTier, setSelectedTier] = useState<PricingTier>(() => PRICING_TIERS[1]) // Default to tier-200

  // Handle flow change
  const handleFlowChange = useCallback((flowId: FlowId) => {
    setActiveFlow(flowId)
  }, [])

  // Flow orchestration with fluid button layout
  const pricingFlow = usePricingFlow({
    activeFlow,
    onFlowChange: handleFlowChange,
    slowMo: config.demo.slowMo ?? false,
  })

  // Auto-open: open when enabled, close when disabled
  useEffect(() => {
    if (config.demo.autoOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [config.demo.autoOpen])

  // Wrap onOpenChange to prevent closing in autoOpen mode
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (config.demo.autoOpen && !open) return
      setIsOpen(open)
    },
    [config.demo.autoOpen]
  )

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Convert icon stroke width from string to number
    if (event.controlId === 'closeButton.iconStrokeWidth') {
      setConfig((prev) =>
        setNestedValue(prev, event.controlId, parseFloat(event.value as string))
      )
      setActivePresetId(null)
      return
    }

    // Handle checklist item updates - ensure id and icon are preserved
    const checklistMatch = event.controlId.match(
      /^flows\.(flow-[a-c])\.checklistItems\.(\d+)\.(text|date)$/
    )
    if (checklistMatch) {
      const [, flowId, indexStr, field] = checklistMatch
      const index = parseInt(indexStr, 10)
      setConfig((prev) => {
        const flow = prev.flows[flowId as FlowId]
        const existingItems = flow.checklistItems ?? prev.checklist.items
        const existingItem = existingItems[index] ?? {
          id: `item-${index + 1}`,
          text: '',
          icon: 'checkmark' as const,
        }
        const newItem = { ...existingItem, [field]: event.value }

        // Initialize array if needed
        const newItems = [...(flow.checklistItems ?? existingItems)]
        newItems[index] = newItem

        return setNestedValue(prev, `flows.${flowId}.checklistItems`, newItems)
      })
      setActivePresetId(null)
      return
    }

    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRICING_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
      setIsOpen(true)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_PRICING_CONFIG)
    setActivePresetId('default')
    setActiveFlow('flow-a')
    pricingFlow.cancelPendingTransitions()
    setIsOpen(true)
  }, [pricingFlow])

  // Handle tier selection (lifted state for flow continuity)
  const handleTierSelect = useCallback((tier: PricingTier) => {
    setSelectedTier(tier)
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildPricingPanelConfig(config, PRICING_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      className="bg-primary"
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
      <DemoContent
        config={config}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        activeFlow={activeFlow}
        onFlowChange={handleFlowChange}
        selectedTier={selectedTier}
        onTierSelect={handleTierSelect}
        pricingFlow={pricingFlow}
      />
    </PlaygroundLayout>
  )
}
