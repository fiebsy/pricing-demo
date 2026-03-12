/**
 * Checklist Slot Component
 *
 * Renders a checklist within the pricing modal with dynamic tier interpolation.
 * Supports {price}, {credits}, {planName} placeholders in text and date fields.
 */

'use client'

import { cn } from '@/lib/utils'
import type { ChecklistConfig, ChecklistItem as ChecklistItemType } from '../config/types'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import { ChecklistIcon, ICON_SIZE_MAP } from '../assets/checklist-icons'

// ============================================================================
// Interpolation Helper
// ============================================================================

/**
 * Interpolates tier values into text placeholders.
 * Supports: {price}, {credits}, {planName}
 */
function interpolate(text: string, tier: PricingTier): string {
  return text
    .replace(/\{price\}/g, tier.priceLabel)
    .replace(/\{credits\}/g, String(tier.credits))
    .replace(/\{additionalCredits\}/g, String(tier.additionalCredits))
    .replace(/\{planName\}/g, tier.planName)
    .replace(/\{planNameShort\}/g, tier.planNameShort)
    .replace(/\{creditsLabel\}/g, tier.creditsLabel)
    .replace(/\{eventsLabel\}/g, tier.eventsLabel)
    .replace(/\{priceFormatted\}/g, tier.priceFormatted)
    .replace(/\{recurringText\}/g, tier.recurringText)
}

// ============================================================================
// Style Mappings
// ============================================================================

const TEXT_SIZE_CLASSES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
} as const

const TEXT_WEIGHT_CLASSES = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const

const COLOR_CLASSES = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  accent: 'text-accent',
} as const

const GAP_CLASSES = {
  tight: 'gap-2',    // 8px
  normal: 'gap-3',   // 12px
  relaxed: 'gap-4',  // 16px
  loose: 'gap-5',    // 20px
} as const

// ============================================================================
// Checklist Item Component
// ============================================================================

interface ChecklistItemProps {
  item: ChecklistItemType
  config: ChecklistConfig
  selectedTier: PricingTier
}

function ChecklistItemRow({ item, config, selectedTier }: ChecklistItemProps) {
  const { textStyle, iconStyle, dateStyle } = config

  // Interpolate text values
  const interpolatedText = interpolate(item.text, selectedTier)
  const interpolatedDate = item.date ? interpolate(item.date, selectedTier) : undefined

  // Text classes
  const textClasses = cn(
    TEXT_SIZE_CLASSES[textStyle.size],
    TEXT_WEIGHT_CLASSES[textStyle.weight],
    COLOR_CLASSES[textStyle.color]
  )

  // Date classes
  const dateClasses = cn(
    TEXT_SIZE_CLASSES[dateStyle.size],
    TEXT_WEIGHT_CLASSES[dateStyle.weight],
    COLOR_CLASSES[dateStyle.color]
  )

  // Icon color class (inherit uses text color)
  const iconColorClass = iconStyle.color === 'inherit'
    ? COLOR_CLASSES[textStyle.color]
    : COLOR_CLASSES[iconStyle.color as keyof typeof COLOR_CLASSES]

  // Icon size in pixels
  const iconSize = ICON_SIZE_MAP[iconStyle.size]

  return (
    <div className="flex items-center gap-3">
      {/* Icon */}
      {item.icon !== 'none' && (
        <span
          className={cn('flex-shrink-0', iconColorClass)}
          style={{ opacity: iconStyle.opacity / 100 }}
        >
          <ChecklistIcon
            name={item.icon}
            weight={iconStyle.weight}
            size={iconSize}
          />
        </span>
      )}

      {/* Text */}
      <span className="flex items-baseline gap-1.5">
        <span
          className={textClasses}
          style={{ opacity: textStyle.opacity / 100 }}
        >
          {interpolatedText}
        </span>
        {interpolatedDate && (
          <span
            className={dateClasses}
            style={{ opacity: dateStyle.opacity / 100 }}
          >
            {interpolatedDate}
          </span>
        )}
      </span>
    </div>
  )
}

// ============================================================================
// Main Checklist Slot Component
// ============================================================================

export interface ChecklistSlotProps {
  /** Checklist items to display */
  items: ChecklistItemType[]
  /** Style configuration */
  styleConfig: ChecklistConfig
  /** Selected pricing tier for interpolation */
  selectedTier: PricingTier
  /** Optional className */
  className?: string
}

export function ChecklistSlot({ items, styleConfig, selectedTier, className }: ChecklistSlotProps) {
  const gapClass = GAP_CLASSES[styleConfig.itemGap]

  return (
    <div className={cn('flex flex-col', gapClass, className)}>
      {items.map((item) => (
        <ChecklistItemRow
          key={item.id}
          item={item}
          config={styleConfig}
          selectedTier={selectedTier}
        />
      ))}
    </div>
  )
}
