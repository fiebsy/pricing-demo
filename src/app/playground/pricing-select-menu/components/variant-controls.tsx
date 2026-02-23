/**
 * Pricing Select Menu Playground - Variant Controls
 *
 * A/B variant toggle for switching between select menu and card display.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { PricingVariantId } from '../config/types'

interface VariantControlsProps {
  activeVariant: PricingVariantId
  onVariantChange: (variant: PricingVariantId) => void
  className?: string
}

export function VariantControls({
  activeVariant,
  onVariantChange,
  className,
}: VariantControlsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-xs text-tertiary font-medium">Variant:</span>
      <div className="inline-flex rounded-lg bg-secondary p-1">
        <button
          type="button"
          onClick={() => onVariantChange('A')}
          className={cn(
            'px-3 py-1 text-xs font-medium rounded-md transition-colors',
            activeVariant === 'A'
              ? 'bg-primary text-primary'
              : 'text-tertiary hover:text-secondary'
          )}
        >
          A
        </button>
        <button
          type="button"
          onClick={() => onVariantChange('B')}
          className={cn(
            'px-3 py-1 text-xs font-medium rounded-md transition-colors',
            activeVariant === 'B'
              ? 'bg-primary text-primary'
              : 'text-tertiary hover:text-secondary'
          )}
        >
          B
        </button>
      </div>
    </div>
  )
}
