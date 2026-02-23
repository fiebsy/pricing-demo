/**
 * Modal Content Component
 *
 * Routes to the correct content component based on stage type:
 * - pricing: PricingContent (stages 1-3)
 * - success: SuccessContent (stages 4-5)
 */

'use client'

import { motion } from 'motion/react'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import type { Stage, ModalV2Config, PricingVariant } from '../config/types'
import { PricingContent } from './pricing-content'
import { SuccessContent } from './success-content'

// ============================================================================
// Types
// ============================================================================

interface ModalContentProps {
  /** Current stage */
  stage: Stage
  /** Modal configuration */
  config: ModalV2Config
  /** Currently selected tier */
  selectedTier: PricingTier
  /** Tier selection handler */
  onTierSelect: (tier: PricingTier) => void
  /** Container width for fill mode */
  containerWidth?: number
}

// ============================================================================
// Component
// ============================================================================

export function ModalContent({
  stage,
  config,
  selectedTier,
  onTierSelect,
  containerWidth,
}: ModalContentProps) {
  const { type, pricingVariant } = stage.content

  return (
    <motion.div layout className="w-full">
      {/* Pricing content - stages 1-3 */}
      {type === 'pricing' && (
        <PricingContent
          variant={pricingVariant as PricingVariant}
          config={config.pricingSelect}
          selectedTier={selectedTier}
          onTierSelect={onTierSelect}
          containerWidth={containerWidth}
        />
      )}

      {/* Success content - stages 4-5 */}
      {type === 'success' && (
        <SuccessContent
          config={config.proCard}
          selectedTier={selectedTier}
        />
      )}
    </motion.div>
  )
}
