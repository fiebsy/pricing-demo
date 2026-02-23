/**
 * Pricing Variant Controls Component
 *
 * A/B toggle buttons for switching between pricing select variants.
 * Styled identically to the modal playground's stage controls.
 * Positioned at the bottom of the preview area.
 */

'use client'

import { cn } from '@/lib/utils'
import type { PricingVariantId } from '../config/types'

const VARIANT_IDS: PricingVariantId[] = ['A', 'B']

interface VariantControlsProps {
  activeVariant: PricingVariantId
  onVariantChange: (variantId: PricingVariantId) => void
}

export function VariantControls({ activeVariant, onVariantChange }: VariantControlsProps) {
  return (
    <div className="fixed bottom-8 left-[var(--playground-left)] right-[var(--playground-right)] flex justify-center pointer-events-none">
      <div className="flex items-center gap-1 rounded-full bg-secondary/80 p-1 backdrop-blur-sm pointer-events-auto">
        {VARIANT_IDS.map((variantId) => (
          <button
            key={variantId}
            onClick={() => onVariantChange(variantId)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all',
              activeVariant === variantId
                ? 'bg-primary text-primary shadow-sm'
                : 'text-secondary hover:bg-tertiary hover:text-primary'
            )}
          >
            {variantId}
          </button>
        ))}
      </div>
    </div>
  )
}
