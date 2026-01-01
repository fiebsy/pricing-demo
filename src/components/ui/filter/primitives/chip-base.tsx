/**
 * Chip Base Primitive
 *
 * Base container for filter chips with consistent styling.
 * Provides the foundation for ExpandingFilterChip and other chip variants.
 *
 * @module base-ui/filter/primitives/chip-base
 */

'use client'

import { forwardRef } from 'react'

import { cn } from '@/lib/utils'
import { SIZE_CONFIG, ROUNDING_CONFIG } from '../constants'
import type { ChipSize, ChipRounding } from '../constants'

// ============================================================================
// Types
// ============================================================================

export interface ChipBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size preset */
  size?: ChipSize
  /** Border radius preset */
  rounded?: ChipRounding
  /** Whether the chip is in expanded state */
  isExpanded?: boolean
  /** Current width (for animation) */
  width?: number | 'auto'
  /** CSS transition string */
  transition?: string
  /** Children content */
  children: React.ReactNode
}

// ============================================================================
// Component
// ============================================================================

/**
 * ChipBase - Foundation container for filter chips
 *
 * Provides consistent styling for:
 * - Background and border
 * - Size presets (height, padding)
 * - Border radius presets
 * - Motion-reduce support
 */
export const ChipBase = forwardRef<HTMLDivElement, ChipBaseProps>(
  (
    {
      size = 'default',
      rounded = 'default',
      isExpanded = true,
      width,
      transition,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const sizeConfig = SIZE_CONFIG[size]
    const roundingClass = ROUNDING_CONFIG[rounded]

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          'bg-primary',
          'border border-primary',
          roundingClass,
          'motion-reduce:transition-none',
          !isExpanded && 'cursor-pointer',
          className
        )}
        style={{
          width: width ?? 'auto',
          height: sizeConfig.height,
          transition,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ChipBase.displayName = 'ChipBase'
