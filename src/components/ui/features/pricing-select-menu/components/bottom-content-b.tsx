/**
 * Pricing Select Menu - Bottom Content B Component
 *
 * Bottom slot content for Variant B (card display).
 * Shows the due row and subtext that were moved from the trigger.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  FONT_SIZE_CLASSES,
  FONT_WEIGHT_CLASSES,
  TEXT_COLOR_CLASSES,
  OPACITY_VALUES,
} from '../constants'
import type {
  PricingTier,
  VariantBBottomSlotConfig,
  VariantBRightSource,
} from '../types'

export interface BottomContentBProps {
  selectedTier: PricingTier
  variantBConfig: VariantBBottomSlotConfig
}

export const BottomContentB: React.FC<BottomContentBProps> = ({
  selectedTier,
  variantBConfig,
}) => {
  const { dueRow, subtext, rowGap, paddingX, paddingTop, paddingBottom } = variantBConfig

  // Get right text based on source
  const getRightText = (source: VariantBRightSource): string => {
    switch (source) {
      case 'planName':
        return selectedTier.planName
      case 'events':
        return selectedTier.eventsLabel
      case 'price':
        return selectedTier.priceFormatted
      case 'recurringPrice':
        return `$${selectedTier.monthlyPrice}/mo`
      case 'additionalCredits':
        return selectedTier.additionalCreditsLabel
      case 'upgradeFee':
        return selectedTier.upgradeFeeFormatted
      default:
        return ''
    }
  }

  // Process subtext template
  const processedSubtext = subtext.template
    .replace('{price}', `$${selectedTier.monthlyPrice}`)
    .replace('{planName}', selectedTier.planName)

  return (
    <div style={{ paddingLeft: paddingX, paddingRight: paddingX, paddingTop, paddingBottom }}>
      <div className="flex flex-col" style={{ gap: rowGap }}>
        {/* Due Row (Row 2) */}
        {dueRow.show && (
          <div className="flex items-center justify-between">
            <span
              className={cn(
                FONT_SIZE_CLASSES[dueRow.leftFontSize],
                FONT_WEIGHT_CLASSES[dueRow.leftFontWeight],
                TEXT_COLOR_CLASSES[dueRow.leftTextColor]
              )}
              style={{ opacity: OPACITY_VALUES[dueRow.leftOpacity] }}
            >
              {dueRow.leftText}
            </span>
            <span
              className={cn(
                FONT_SIZE_CLASSES[dueRow.rightFontSize],
                FONT_WEIGHT_CLASSES[dueRow.rightFontWeight],
                TEXT_COLOR_CLASSES[dueRow.rightTextColor]
              )}
              style={{ opacity: OPACITY_VALUES[dueRow.rightOpacity] }}
            >
              {getRightText(dueRow.rightSource)}
            </span>
          </div>
        )}

        {/* Subtext Row (Row 3) */}
        {subtext.show && (
          <span
            className={cn(
              FONT_SIZE_CLASSES[subtext.fontSize],
              FONT_WEIGHT_CLASSES[subtext.fontWeight],
              TEXT_COLOR_CLASSES[subtext.textColor]
            )}
            style={{ opacity: OPACITY_VALUES[subtext.opacity] }}
          >
            {processedSubtext}
          </span>
        )}
      </div>
    </div>
  )
}

BottomContentB.displayName = 'PricingSelectMenu.BottomContentB'
