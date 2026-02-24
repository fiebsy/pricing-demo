/**
 * Pricing Select Menu - Options List Component
 *
 * Tier selection menu with configurable styling.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@/app/demo/components/pricing/assets/inline-icons'
import { usePricingSelectMenu } from '../context'
import {
  FONT_SIZE_CLASSES,
  FONT_WEIGHT_CLASSES,
  TEXT_COLOR_CLASSES,
  OPACITY_VALUES,
  HOVER_BACKGROUND_CLASSES,
} from '../constants'
import { TextSegment } from './text-segment'
import type {
  PricingTier,
  TextColorOption,
  FontWeightOption,
  FontSizeOption,
  OpacityOption,
  BackgroundOption,
  ItemTypographyConfig,
  MenuItemLabelConfig,
} from '../types'

export interface OptionsListProps {
  tiers: PricingTier[]
  selectedId: string
  onSelect: (tier: PricingTier) => void
  showHeader?: boolean
  headerLabel?: string
  headerTextColor?: TextColorOption
  headerFontWeight?: FontWeightOption
  headerFontSize?: FontSizeOption
  headerOpacity?: OpacityOption
  headerUppercase?: boolean
  headerPaddingBottom?: number
  containerPadding?: number
  itemPaddingX?: number
  itemPaddingY?: number
  itemBorderRadius?: number
  itemGap?: number
  itemHoverBackground?: BackgroundOption
  showSelectedIndicator?: boolean
  itemTypography: ItemTypographyConfig
  menuItemLabel: MenuItemLabelConfig
  upgradeMode?: boolean
  /** Show a disabled "current plan" option at top */
  currentPlan?: PricingTier
  currentPlanSuffix?: string
}

export const OptionsList: React.FC<OptionsListProps> = ({
  tiers,
  selectedId,
  onSelect,
  showHeader = false,
  headerLabel = 'Select plan',
  headerTextColor = 'tertiary',
  headerFontWeight = 'medium',
  headerFontSize = 'xs',
  headerOpacity = '100',
  headerUppercase = false,
  headerPaddingBottom = 8,
  containerPadding = 4,
  itemPaddingX = 12,
  itemPaddingY = 10,
  itemBorderRadius = 8,
  itemGap = 4,
  itemHoverBackground = 'quaternary',
  showSelectedIndicator = false,
  itemTypography,
  menuItemLabel,
  upgradeMode = false,
  currentPlan,
  currentPlanSuffix = '(current plan)',
}) => {
  const { setExpanded } = usePricingSelectMenu()

  const isStacked = menuItemLabel.layout === 'stacked'

  return (
    <div style={{ padding: containerPadding }}>
      {showHeader && (
        <div
          className={cn(
            TEXT_COLOR_CLASSES[headerTextColor],
            FONT_WEIGHT_CLASSES[headerFontWeight],
            FONT_SIZE_CLASSES[headerFontSize],
            headerUppercase && 'uppercase tracking-wider'
          )}
          style={{
            paddingLeft: itemPaddingX,
            paddingRight: itemPaddingX,
            paddingTop: 8,
            paddingBottom: headerPaddingBottom,
            opacity: OPACITY_VALUES[headerOpacity],
          }}
        >
          {headerLabel}
        </div>
      )}
      <div className="flex flex-col" style={{ gap: itemGap }}>
        {/* Disabled current plan option */}
        {currentPlan && (
          <div
            className="flex items-center justify-between opacity-50 cursor-not-allowed"
            style={{
              paddingLeft: itemPaddingX,
              paddingRight: itemPaddingX,
              paddingTop: itemPaddingY,
              paddingBottom: itemPaddingY,
              borderRadius: itemBorderRadius,
            }}
          >
            <span
              className={cn('flex', isStacked ? 'flex-col items-start' : 'items-center')}
              style={{ gap: isStacked ? 2 : menuItemLabel.gap }}
            >
              <span className={cn(
                FONT_SIZE_CLASSES[menuItemLabel.planName.fontSize],
                FONT_WEIGHT_CLASSES[menuItemLabel.planName.fontWeight],
                TEXT_COLOR_CLASSES[menuItemLabel.planName.textColor]
              )}>
                {currentPlan.planName}
              </span>
              <span className={cn(
                FONT_SIZE_CLASSES[menuItemLabel.credits.fontSize],
                FONT_WEIGHT_CLASSES[menuItemLabel.credits.fontWeight],
                TEXT_COLOR_CLASSES[menuItemLabel.credits.textColor]
              )}>
                {currentPlan.priceLabel}
              </span>
            </span>
            <span className="text-tertiary text-sm">{currentPlanSuffix}</span>
          </div>
        )}
        {tiers.map((tier) => {
          const isSelected = selectedId === tier.id
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => {
                onSelect(tier)
                setExpanded(false)
              }}
              className={cn(
                'flex items-center justify-between',
                'transition-colors duration-150',
                HOVER_BACKGROUND_CLASSES[itemHoverBackground],
                isSelected && 'text-brand-primary bg-quaternary/30'
              )}
              style={{
                paddingLeft: itemPaddingX,
                paddingRight: itemPaddingX,
                paddingTop: itemPaddingY,
                paddingBottom: itemPaddingY,
                borderRadius: itemBorderRadius,
              }}
            >
              {/* Label content */}
              <span
                className={cn('flex', isStacked ? 'flex-col items-start' : 'items-center')}
                style={{ gap: isStacked ? 2 : menuItemLabel.gap }}
              >
                <TextSegment text={tier.planName} config={menuItemLabel.planName} />
                {!isStacked && menuItemLabel.planName.show && menuItemLabel.credits.show && menuItemLabel.separator && (
                  <span className="text-tertiary opacity-40">{menuItemLabel.separator}</span>
                )}
                <TextSegment
                  text={upgradeMode ? tier.additionalCreditsLabel : tier.creditsLabel}
                  config={menuItemLabel.credits}
                />
              </span>
              <div className="flex items-center gap-2">
                {/* Selected indicator dot */}
                {isSelected && (
                  <span className="size-1.5 rounded-full bg-blue-500 shrink-0" />
                )}
                <span
                  className={cn(
                    FONT_SIZE_CLASSES[itemTypography.price.fontSize],
                    FONT_WEIGHT_CLASSES[itemTypography.price.fontWeight],
                    TEXT_COLOR_CLASSES[itemTypography.price.textColor]
                  )}
                  style={{ opacity: OPACITY_VALUES[itemTypography.price.opacity] }}
                >
                  {upgradeMode ? tier.upgradeFeeLabel : tier.priceLabel}
                </span>
                {showSelectedIndicator && isSelected && (
                  <CheckIcon size={16} className="text-brand-primary" />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

OptionsList.displayName = 'PricingSelectMenu.OptionsList'
