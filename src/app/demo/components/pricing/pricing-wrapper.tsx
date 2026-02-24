/**
 * Demo Pricing Wrapper
 *
 * Wraps the PricingModal with demo-specific state management
 * and completion callback handling.
 */

'use client'

import { useState, useCallback } from 'react'
import { PricingModal } from './core/pricing-modal'
import { PRICING_TIERS } from './core/pricing-tiers'
import { DEFAULT_PRICING_CONFIG } from './config/presets'
import { usePricingFlow } from './hooks/use-pricing-flow'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import type { FlowId } from './config/types'

interface DemoPricingWrapperProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpgradeComplete: (credits: number) => void
  /** Slow motion mode for debugging/capture (5x slower transitions) */
  slowMo?: boolean
  /** Force dropdown to stay expanded (for capture) */
  forceDropdownExpanded?: boolean
}

export function DemoPricingWrapper({
  open,
  onOpenChange,
  onUpgradeComplete,
  slowMo = false,
  forceDropdownExpanded = false,
}: DemoPricingWrapperProps) {
  const [activeFlow, setActiveFlow] = useState<FlowId>('flow-a')
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[1])

  // Flow orchestration
  const pricingFlow = usePricingFlow({
    activeFlow,
    onFlowChange: setActiveFlow,
    slowMo,
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
      forceDropdownExpanded={forceDropdownExpanded}
    />
  )
}
