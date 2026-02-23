/**
 * Checklist Component
 *
 * Displays a title with checkmark items for modal content.
 * Minimal component with no container or padding - integrates directly
 * into the modal content flow.
 */

'use client'

import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import { cn } from '@/lib/utils'
import type { ChecklistConfig } from '../config/types'

// Font weight class mappings
const FONT_WEIGHT_CLASSES: Record<string, string> = {
  '400': 'font-normal',
  '500': 'font-medium',
  '600': 'font-semibold',
  '700': 'font-bold',
}

// Text size class mappings
const TEXT_SIZE_CLASSES: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
}

// Icon sizes to match text sizes
const ICON_SIZES: Record<string, number> = {
  xs: 12,
  sm: 14,
  md: 16,
}

interface ChecklistProps {
  config: ChecklistConfig
  duration?: number
  bounce?: number
}

export function Checklist({ config, duration = 0.4, bounce = 0.1 }: ChecklistProps) {
  const {
    title,
    items,
    titleSize,
    titleWeight,
    titleColor,
    itemSize,
    itemWeight,
    itemColor,
    checkColor,
    gap,
  } = config

  return (
    <div
      className="flex w-full flex-col"
      style={{ gap }}
    >
      {/* Title */}
      <span
        className={cn(
          TEXT_SIZE_CLASSES[titleSize],
          FONT_WEIGHT_CLASSES[titleWeight],
          titleColor
        )}
      >
        {title}
      </span>

      {/* Checklist items */}
      <div className="flex flex-col" style={{ gap }}>
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <HugeIcon
              icon={Tick02Icon}
              size={ICON_SIZES[itemSize]}
              className={cn('shrink-0 mt-0.5', checkColor)}
            />
            <span
              className={cn(
                TEXT_SIZE_CLASSES[itemSize],
                FONT_WEIGHT_CLASSES[itemWeight],
                itemColor,
                'leading-snug'
              )}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
