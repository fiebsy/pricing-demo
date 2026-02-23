/**
 * SuccessContent Component
 *
 * ProCard wrapper for stages 4-5 (success states).
 */

'use client'

import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import { ProCard } from './pro-card'
import type { ProCardConfig } from '../config/types'

interface SuccessContentProps {
  config: ProCardConfig
  /** Selected tier to derive multiplier from */
  selectedTier?: PricingTier
}

export function SuccessContent({ config, selectedTier }: SuccessContentProps) {
  // If we have a selected tier, use its multiplier and plan name
  const effectiveConfig: ProCardConfig = selectedTier
    ? {
        ...config,
        title: selectedTier.planName.split(' ')[0], // "Pro" from "Pro 2x"
        multiplier: selectedTier.multiplier,
      }
    : config

  return (
    <div className="w-full">
      <ProCard config={effectiveConfig} />
    </div>
  )
}
