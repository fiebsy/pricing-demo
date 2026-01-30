/**
 * Filter Trigger
 *
 * Standalone trigger button for filter menus with press animation.
 * Uses the Button component with shine variant for the default style.
 *
 * @module prod/base/filter/filter-trigger/filter-trigger
 */

'use client'

import React from 'react'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import type { ButtonSize, ButtonRoundness, IconProp } from '@/components/ui/core/primitives/button'

// ============================================================================
// Types
// ============================================================================

export type TriggerSize = 'sm' | 'md' | 'lg'
export type TriggerRounded = 'md' | 'lg' | 'xl' | 'full'
export type TriggerVariant = 'default' | 'ghost' | 'outline'

export interface FilterTriggerProps {
  /** Whether the menu is open */
  isOpen?: boolean
  /** Button label text */
  label?: string
  /** Icon component (HugeIcons array or React component) */
  icon?: IconProp
  /** Size preset */
  size?: TriggerSize
  /** Border radius */
  rounded?: TriggerRounded
  /** Visual variant */
  variant?: TriggerVariant
  /** Additional className */
  className?: string
  /** Click handler */
  onClick?: () => void
}

// ============================================================================
// Configuration
// ============================================================================

/** Map TriggerRounded to ButtonRoundness */
const ROUNDED_MAP: Record<TriggerRounded, ButtonRoundness> = {
  md: 'default',
  lg: 'default',
  xl: 'default',
  full: 'pill',
}

/** Map TriggerSize to ButtonSize */
const SIZE_MAP: Record<TriggerSize, ButtonSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

/** Legacy size config for ghost/outline variants */
const SIZES: Record<TriggerSize, { height: number; padding: number; text: string; icon: number }> = {
  sm: { height: 32, padding: 10, text: 'text-xs', icon: 16 },
  md: { height: 40, padding: 12, text: 'text-sm', icon: 20 },
  lg: { height: 48, padding: 16, text: 'text-base', icon: 24 },
}

const ROUNDED: Record<TriggerRounded, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

// ============================================================================
// Component
// ============================================================================

export const FilterTrigger: React.FC<FilterTriggerProps> = ({
  isOpen,
  label = 'Add a filter',
  icon,
  size = 'md',
  rounded = 'full',
  variant = 'default',
  className,
  onClick,
}) => {
  const IconComponent = icon ?? Add01Icon

  // Default variant uses Button with shine styling
  if (variant === 'default') {
    const buttonRoundness = ROUNDED_MAP[rounded]
    const buttonSize = SIZE_MAP[size]

    return (
      <Button
        variant="shine"
        size={buttonSize}
        roundness={buttonRoundness}
        iconLeading={IconComponent}
        onClick={onClick}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={cn(
          // When open: lock in pressed state and disable hover effects
          isOpen && [
            'scale-[0.98] bg-tertiary text-primary',
            'hover:bg-tertiary hover:text-primary',
            '[&_[data-icon]]:text-fg-tertiary hover:[&_[data-icon]]:text-fg-tertiary',
          ],
          className
        )}
      >
        {label}
      </Button>
    )
  }

  // Ghost and outline variants use legacy custom styling
  const sizeConfig = SIZES[size]
  const roundedClass = ROUNDED[rounded]
  const resolvedIconSize = sizeConfig.icon

  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={onClick}
      className={cn(
        // Base
        'group relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline-brand',
        'gap-1 font-semibold',
        sizeConfig.text,
        roundedClass,

        // Variant: ghost
        variant === 'ghost' && [
          'bg-transparent',
          !isOpen && 'text-secondary hover:bg-quaternary hover:text-primary',
          isOpen && 'bg-quaternary text-primary',
        ],

        // Variant: outline
        variant === 'outline' && [
          'bg-transparent border border-primary',
          !isOpen && 'text-secondary hover:bg-quaternary hover:text-primary',
          isOpen && 'bg-quaternary text-primary',
        ],

        // Transition & press animation
        'transition-all duration-150 ease-out',
        'active:scale-95',
        isOpen && 'scale-95',
        // Accessibility: respect reduced motion preference
        'motion-reduce:transition-none motion-reduce:transform-none',

        className
      )}
      style={{
        height: sizeConfig.height,
        paddingLeft: sizeConfig.padding,
        paddingRight: sizeConfig.padding,
      }}
    >
      <HugeIcon
        icon={IconComponent}
        size={resolvedIconSize}
        strokeWidth={1.5}
        className={cn(
          'pointer-events-none shrink-0 text-fg-quaternary',
          !isOpen && 'group-hover:text-fg-tertiary'
        )}
      />
      <span className="px-0.5">{label}</span>
    </button>
  )
}

FilterTrigger.displayName = 'FilterTrigger'
