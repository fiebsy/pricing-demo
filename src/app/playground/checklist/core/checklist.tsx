/**
 * Checklist Component
 *
 * Focused checklist with full styling control for text and icons.
 */

'use client'

import { cn } from '@/lib/utils'
import type { ChecklistConfig, ChecklistItem as ChecklistItemType } from '../config/types'
import { ChecklistIcon, ICON_SIZE_MAP } from './icons'

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
}

function ChecklistItem({ item, config }: ChecklistItemProps) {
  const { textStyle, iconStyle, dateStyle } = config

  // Text classes
  const textClasses = cn(
    TEXT_SIZE_CLASSES[textStyle.size],
    TEXT_WEIGHT_CLASSES[textStyle.weight],
    COLOR_CLASSES[textStyle.color]
  )

  // Date classes (falls back to text style if not specified)
  const effectiveDateStyle = dateStyle || textStyle
  const dateClasses = cn(
    TEXT_SIZE_CLASSES[effectiveDateStyle.size],
    TEXT_WEIGHT_CLASSES[effectiveDateStyle.weight],
    COLOR_CLASSES[effectiveDateStyle.color]
  )

  // Icon color class (inherit uses text color)
  const iconColorClass = iconStyle.color === 'inherit'
    ? COLOR_CLASSES[textStyle.color]
    : COLOR_CLASSES[iconStyle.color]

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
          {item.text}
        </span>
        {item.date && (
          <span
            className={dateClasses}
            style={{ opacity: effectiveDateStyle.opacity / 100 }}
          >
            {item.date}
          </span>
        )}
      </span>
    </div>
  )
}

// ============================================================================
// Main Checklist Component
// ============================================================================

interface ChecklistProps {
  config: ChecklistConfig
  className?: string
}

export function Checklist({ config, className }: ChecklistProps) {
  const gapClass = GAP_CLASSES[config.itemGap]

  return (
    <div className={cn('flex flex-col', gapClass, className)}>
      {config.items.map((item) => (
        <ChecklistItem key={item.id} item={item} config={config} />
      ))}
    </div>
  )
}
