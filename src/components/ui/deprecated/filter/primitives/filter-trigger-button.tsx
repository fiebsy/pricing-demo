/**
 * Filter Trigger Button Primitive
 *
 * Button styled to trigger filter menus. Uses centralized configuration
 * from config.ts for consistent styling across the application.
 *
 * @module base-ui/filter/primitives/filter-trigger-button
 */

'use client'

import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { DEFAULT_FILTER_TRIGGER_STYLE } from '../config'
import type { FilterTriggerStyleConfig } from '../types'

// ============================================================================
// Types
// ============================================================================

/** Hugeicon component type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HugeIconComponent = any

export interface FilterTriggerButtonProps {
  /** Whether the menu is currently open */
  isOpen?: boolean
  /** Button label text */
  label?: string
  /** Icon component (default: Add01Icon) */
  icon?: HugeIconComponent
  /** Style configuration (defaults to DEFAULT_FILTER_TRIGGER_STYLE) */
  styleConfig?: Partial<FilterTriggerStyleConfig>
  /** Additional class names */
  className?: string
}

// ============================================================================
// Style Mapping Utilities
// ============================================================================

const getHeightClass = (height: number): string => {
  const heightMap: Record<number, string> = {
    32: 'h-8',
    36: 'h-9',
    40: 'h-10',
    44: 'h-11',
    48: 'h-12',
  }
  return heightMap[height] || `h-[${height}px]`
}

const getPaddingXClass = (px: number): string => {
  const pxMap: Record<number, string> = {
    8: 'px-2',
    10: 'px-2.5',
    12: 'px-3',
    14: 'px-3.5',
    16: 'px-4',
  }
  return pxMap[px] || `px-[${px}px]`
}

const getRoundedClass = (rounded: FilterTriggerStyleConfig['rounded']): string => {
  const roundedMap: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }
  return roundedMap[rounded] || 'rounded-full'
}

const getShineClass = (shine: FilterTriggerStyleConfig['shine'], intensity: FilterTriggerStyleConfig['shineIntensity']): string => {
  if (shine === 'none') return ''
  const intensitySuffix = intensity === 'normal' ? '' : `-${intensity}`
  return `shine-${shine}${intensitySuffix}`
}

const getFontWeightClass = (weight: FilterTriggerStyleConfig['fontWeight']): string => {
  const weightMap: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
  return weightMap[weight] || 'font-semibold'
}

// ============================================================================
// Component
// ============================================================================

/**
 * FilterTriggerButton - Trigger button for filter menus
 *
 * Uses GAN2 configuration defaults. Styling can be overridden via styleConfig prop.
 */
export const FilterTriggerButton: React.FC<FilterTriggerButtonProps> = ({
  isOpen,
  label = 'Add a filter',
  icon,
  styleConfig,
  className,
}) => {
  // Merge with defaults
  const config: FilterTriggerStyleConfig = {
    ...DEFAULT_FILTER_TRIGGER_STYLE,
    ...styleConfig,
  }

  const IconComponent = icon ?? Add01Icon

  return (
    <button
      className={cn(
        // Base styles
        'group relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline-brand',

        // Size & shape from config
        getHeightClass(config.height),
        getPaddingXClass(config.paddingX),
        getRoundedClass(config.rounded),
        getFontWeightClass(config.fontWeight),
        'gap-1 text-sm',

        // Background from config
        `bg-${config.background}`,
        config.border && 'border border-primary',

        // Shine from config
        getShineClass(config.shine, config.shineIntensity),

        // Transition
        'transition-all duration-150 ease-out',

        // Normal state - text colors from config
        !isOpen && [
          `text-${config.textColor}`,
          `hover:bg-${config.backgroundHover} hover:text-${config.textColorHover}`,
        ],

        // Active/Open state - pressed appearance
        isOpen && [
          `bg-${config.backgroundHover} text-${config.textColor}`,
          'scale-95',
        ],

        className
      )}
    >
      <HugeIcon
        icon={IconComponent}
        size={config.iconSize}
        strokeWidth={config.iconStrokeWidth}
        className={cn(
          'pointer-events-none shrink-0',
          `text-fg-${config.iconColor}`,
          !isOpen && `group-hover:text-fg-${config.iconColor}_hover`
        )}
      />
      <span className="px-0.5">{label}</span>
    </button>
  )
}

FilterTriggerButton.displayName = 'FilterTriggerButton'
