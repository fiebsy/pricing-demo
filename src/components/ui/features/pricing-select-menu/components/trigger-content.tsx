/**
 * Pricing Select Menu - Trigger Content Components
 *
 * Display components for the trigger area.
 * Supports both Variant A (select menu) and Variant B (card display).
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { usePricingSelectMenu } from '../context'
import { CaretIcon } from './caret-icon'
import {
  FONT_SIZE_CLASSES,
  FONT_WEIGHT_CLASSES,
  TEXT_COLOR_CLASSES,
  VERTICAL_ALIGN_CLASSES,
  OPACITY_VALUES,
  BACKGROUND_CLASSES,
} from '../constants'
import { getBorderColorVar } from '../utils'
import { TextSegment } from './text-segment'
import type {
  PricingTier,
  TriggerTypographyConfig,
  SyncedSubtextConfig,
  TriggerStateStyle,
  VariantBTriggerConfig,
  VariantBRightSource,
  DropdownIconConfig,
} from '../types'

// ============================================================================
// VARIANT A TRIGGER (Select Menu)
// ============================================================================

export interface TriggerContentAProps {
  selectedTier: PricingTier
  /** @deprecated Use dropdownIcon.show instead */
  showDropdownIcon?: boolean
  /** @deprecated Use dropdownIcon.rotatesOnOpen instead */
  dropdownIconRotates?: boolean
  /** Full dropdown icon configuration */
  dropdownIcon?: DropdownIconConfig
  triggerTypography: TriggerTypographyConfig
  syncedSubtext: SyncedSubtextConfig
  triggerPaddingX?: number
  triggerPaddingTop?: number
  triggerPaddingBottom?: number
  triggerStyle?: {
    collapsed: TriggerStateStyle
    expanded: TriggerStateStyle
  }
  upgradeMode?: boolean
}

export const TriggerContentA: React.FC<TriggerContentAProps> = ({
  selectedTier,
  showDropdownIcon,
  dropdownIconRotates,
  dropdownIcon,
  triggerTypography,
  syncedSubtext,
  triggerPaddingX = 16,
  triggerPaddingTop = 0,
  triggerPaddingBottom = 0,
  triggerStyle,
  upgradeMode = false,
}) => {
  const { expanded, setExpanded } = usePricingSelectMenu()

  // Resolve icon config with backward compatibility
  const iconConfig: DropdownIconConfig = dropdownIcon ?? {
    show: showDropdownIcon ?? true,
    size: 18,
    color: 'tertiary',
    direction: 'down',
    rotatesOnOpen: dropdownIconRotates ?? true,
  }

  const { label, price, priceSuffix, subtext, priceRowAlign, priceRowGap, rowGap } =
    triggerTypography

  // Check if price row has any visible content
  const showPriceRow = price.show || priceSuffix.show

  // Determine if we should show synced subtext or static subtext
  const showSyncedSubtext = syncedSubtext.syncWithSelection
  const showStaticSubtext = !showSyncedSubtext && subtext.show && subtext.text

  // Get current trigger style based on expanded state
  const currentStyle = triggerStyle
    ? expanded
      ? triggerStyle.expanded
      : triggerStyle.collapsed
    : null

  // Build trigger style classes and inline styles
  const triggerClasses = currentStyle
    ? cn(
        BACKGROUND_CLASSES[currentStyle.background],
        currentStyle.shine && currentStyle.shine !== 'none' && currentStyle.shine
      )
    : ''

  const triggerInlineStyles: React.CSSProperties = currentStyle
    ? {
        borderRadius: currentStyle.borderRadius,
        ...(currentStyle.borderWidth > 0 && {
          borderWidth: currentStyle.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColorVar(currentStyle.borderColor),
        }),
      }
    : {}

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className={cn(
        'flex items-center justify-between w-full h-full text-left transition-all duration-200',
        triggerClasses
      )}
      style={{
        ...triggerInlineStyles,
        paddingLeft: triggerPaddingX,
        paddingRight: triggerPaddingX,
        paddingTop: triggerPaddingTop,
        paddingBottom: triggerPaddingBottom,
      }}
    >
      <div className="flex flex-col items-start" style={{ gap: rowGap }}>
        {/* Label row */}
        {label.show && (
          <span
            className={cn(
              FONT_SIZE_CLASSES[label.fontSize],
              FONT_WEIGHT_CLASSES[label.fontWeight],
              TEXT_COLOR_CLASSES[label.textColor]
            )}
          >
            {label.text}
          </span>
        )}

        {/* Price row (price + suffix) */}
        {showPriceRow && (
          <span
            className={cn('flex', VERTICAL_ALIGN_CLASSES[priceRowAlign])}
            style={{ gap: priceRowGap }}
          >
            {price.show && (
              <span
                className={cn(
                  FONT_SIZE_CLASSES[price.fontSize],
                  FONT_WEIGHT_CLASSES[price.fontWeight],
                  TEXT_COLOR_CLASSES[price.textColor]
                )}
              >
                {price.prefix}
                {upgradeMode ? selectedTier.upgradeFee : selectedTier.price}
              </span>
            )}
            {priceSuffix.show && (
              <span
                className={cn(
                  FONT_SIZE_CLASSES[priceSuffix.fontSize],
                  FONT_WEIGHT_CLASSES[priceSuffix.fontWeight],
                  TEXT_COLOR_CLASSES[priceSuffix.textColor]
                )}
                style={{ opacity: OPACITY_VALUES[priceSuffix.opacity] }}
              >
                {priceSuffix.text}
              </span>
            )}
          </span>
        )}

        {/* Synced subtext row (syncs with selected tier) */}
        {showSyncedSubtext && (
          <span className="flex items-center" style={{ gap: syncedSubtext.gap }}>
            <TextSegment text={selectedTier.planName} config={syncedSubtext.planName} />
            {syncedSubtext.planName.show && syncedSubtext.credits.show && syncedSubtext.separator && (
              <span className="text-tertiary opacity-40">{syncedSubtext.separator}</span>
            )}
            <TextSegment
              text={upgradeMode ? selectedTier.additionalCreditsLabel : selectedTier.creditsLabel}
              config={syncedSubtext.credits}
            />
          </span>
        )}

        {/* Static subtext row (optional third line) */}
        {showStaticSubtext && (
          <span
            className={cn(
              FONT_SIZE_CLASSES[subtext.fontSize],
              FONT_WEIGHT_CLASSES[subtext.fontWeight],
              TEXT_COLOR_CLASSES[subtext.textColor]
            )}
            style={{ opacity: OPACITY_VALUES[subtext.opacity] }}
          >
            {subtext.text}
          </span>
        )}
      </div>
      {iconConfig.show && (
        <CaretIcon
          size={iconConfig.size}
          color={iconConfig.color}
          direction={iconConfig.direction}
          isOpen={expanded}
          rotatesOnOpen={iconConfig.rotatesOnOpen}
        />
      )}
    </button>
  )
}

TriggerContentA.displayName = 'PricingSelectMenu.TriggerContentA'

// ============================================================================
// VARIANT B TRIGGER (Card Display)
// ============================================================================

export interface TriggerContentBProps {
  selectedTier: PricingTier
  variantBConfig: VariantBTriggerConfig
  triggerStyle?: {
    collapsed: TriggerStateStyle
    expanded: TriggerStateStyle
  }
}

export const TriggerContentB: React.FC<TriggerContentBProps> = ({
  selectedTier,
  variantBConfig,
  triggerStyle,
}) => {
  const { expanded } = usePricingSelectMenu()
  const { planRow, paddingX, paddingTop, paddingBottom } = variantBConfig

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

  // Get current trigger style based on expanded state
  const currentStyle = triggerStyle
    ? expanded
      ? triggerStyle.expanded
      : triggerStyle.collapsed
    : null

  // Build trigger style classes and inline styles
  const triggerClasses = currentStyle
    ? cn(
        BACKGROUND_CLASSES[currentStyle.background],
        currentStyle.shine && currentStyle.shine !== 'none' && currentStyle.shine
      )
    : ''

  const triggerInlineStyles: React.CSSProperties = currentStyle
    ? {
        borderRadius: currentStyle.borderRadius,
        ...(currentStyle.borderWidth > 0 && {
          borderWidth: currentStyle.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColorVar(currentStyle.borderColor),
        }),
      }
    : {}

  return (
    <div
      className={cn('flex flex-col w-full h-full', triggerClasses)}
      style={{
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop,
        paddingBottom,
        ...triggerInlineStyles,
      }}
    >
      <div className="flex flex-col justify-center h-full">
        {/* Plan Row (Row 1) - ONLY row in trigger */}
        {planRow.show && (
          <div className="flex items-center justify-between">
            <span
              className={cn(
                FONT_SIZE_CLASSES[planRow.leftFontSize],
                FONT_WEIGHT_CLASSES[planRow.leftFontWeight],
                TEXT_COLOR_CLASSES[planRow.leftTextColor]
              )}
              style={{ opacity: OPACITY_VALUES[planRow.leftOpacity] }}
            >
              {planRow.leftText || selectedTier.planName}
            </span>
            <span
              className={cn(
                FONT_SIZE_CLASSES[planRow.rightFontSize],
                FONT_WEIGHT_CLASSES[planRow.rightFontWeight],
                TEXT_COLOR_CLASSES[planRow.rightTextColor]
              )}
              style={{ opacity: OPACITY_VALUES[planRow.rightOpacity] }}
            >
              {getRightText(planRow.rightSource)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

TriggerContentB.displayName = 'PricingSelectMenu.TriggerContentB'
