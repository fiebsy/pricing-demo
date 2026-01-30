/**
 * FilterSelectChipMotion - Main Component
 *
 * Motion-based filter chip system with AnimatePresence + popLayout for fluid
 * add/remove animations. Uses Base UI Select for dropdown functionality.
 *
 * Key features:
 * - Scale-up entry animation that pushes other chips
 * - GPU-optimized: only opacity, scale, transform
 * - Spring or tween physics options
 * - Respects prefers-reduced-motion
 * - Base UI Select with anchored dropdown
 *
 * @module prod/base/filter/filter-select-chip-motion
 *
 * @example
 * ```tsx
 * import { FilterSelectChipMotion } from '@/components/ui/patterns/filter'
 *
 * <FilterSelectChipMotion
 *   filters={activeFilters}
 *   onFilterChange={(id, value) => updateFilter(id, value)}
 *   onFilterRemove={(id) => removeFilter(id)}
 * />
 * ```
 */

'use client'

import { AnimatePresence, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

import { AnimatedChip } from './components'
import {
  mergeAnimationConfig,
  mergeStyleConfig,
  getGapClass,
} from './config'
import type { FilterSelectChipMotionProps } from './types'

// ============================================================================
// Component
// ============================================================================

export function FilterSelectChipMotion({
  filters,
  onFilterChange,
  onFilterRemove,
  animationConfig: animationConfigProp,
  styleConfig: styleConfigProp,
  showDebug = false,
  className,
}: FilterSelectChipMotionProps) {
  const shouldReduceMotion = useReducedMotion()

  // Merge configs with defaults
  const animationConfig = mergeAnimationConfig(animationConfigProp)
  const styleConfig = mergeStyleConfig(styleConfigProp)

  return (
    <div
      className={cn(
        'flex flex-wrap items-center',
        getGapClass(styleConfig.gap),
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {filters.map((filter, index) => (
          <AnimatedChip
            key={filter.id}
            filter={filter}
            index={index}
            animationConfig={animationConfig}
            styleConfig={styleConfig}
            shouldReduceMotion={shouldReduceMotion}
            onValueChange={(value) => onFilterChange?.(filter.id, value)}
            onRemove={() => onFilterRemove?.(filter.id)}
            showDebug={showDebug}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

FilterSelectChipMotion.displayName = 'FilterSelectChipMotion'
