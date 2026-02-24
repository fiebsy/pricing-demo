/**
 * Demo Pricing Wrapper
 *
 * Wraps the PricingModal from the playground with demo-specific
 * state management and completion callback handling.
 */

'use client'

import { useState, useCallback } from 'react'
import { PricingModal } from '@/app/playground/pricing/core/pricing-modal'
import { PRICING_TIERS } from '@/app/playground/pricing/core/pricing-tiers'
import { DEFAULT_PRICING_CONFIG } from '@/app/playground/pricing/config/presets'
import { usePricingFlow } from '@/app/playground/pricing/hooks/use-pricing-flow'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import type { FlowId } from '@/app/playground/pricing/config/types'

interface DemoPricingWrapperProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpgradeComplete: (credits: number) => void
}

export function DemoPricingWrapper({
  open,
  onOpenChange,
  onUpgradeComplete,
}: DemoPricingWrapperProps) {
  const [activeFlow, setActiveFlow] = useState<FlowId>('flow-a')
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[1])

  // Flow orchestration
  const pricingFlow = usePricingFlow({
    activeFlow,
    onFlowChange: setActiveFlow,
  })

  // Custom primary click handler for completion
  const handlePrimaryClick = useCallback(() => {
    if (pricingFlow.stateId === 'C2') {
      // Completion: trigger callback and close
      onUpgradeComplete(selectedTier.credits)
      onOpenChange(false)
      // Reset for next open
      setActiveFlow('flow-a')
      pricingFlow.cancelPendingTransitions()
    } else {
      pricingFlow.handlePrimaryClick()
    }
  }, [pricingFlow, selectedTier, onUpgradeComplete, onOpenChange])

  // Handle modal close (reset state)
  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!newOpen) {
      // Reset flow when closing
      setActiveFlow('flow-a')
      pricingFlow.cancelPendingTransitions()
    }
    onOpenChange(newOpen)
  }, [onOpenChange, pricingFlow])

  // Use default config with demo settings adjusted
  const config = {
    ...DEFAULT_PRICING_CONFIG,
    demo: {
      ...DEFAULT_PRICING_CONFIG.demo,
      autoOpen: false, // Not auto-open in demo context
      showOutlines: false,
    },
  }

  return (
    <PricingModal
      config={config}
      open={open}
      onOpenChange={handleOpenChange}
      activeFlow={activeFlow}
      selectedTier={selectedTier}
      onTierSelect={setSelectedTier}
      buttonStateId={pricingFlow.stateId}
      buttonState={pricingFlow.state}
      showSecondary={pricingFlow.showSecondary}
      onPrimaryClick={handlePrimaryClick}
      onBackClick={pricingFlow.handleBack}
    />
  )
}
