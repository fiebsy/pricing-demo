/**
 * AnimatedChip - Single animated filter chip
 *
 * Wraps the chip trigger and popup with Motion animations.
 * Handles scale-up entry, fade exit, and layout transitions.
 *
 * @module prod/base/filter/filter-select-chip-motion/components/animated-chip
 */

'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { Select } from '@base-ui/react/select'
import { cn } from '@/lib/utils'
import FilterIcon from '@hugeicons-pro/core-stroke-rounded/FilterIcon'

import { ChipTrigger } from './chip-trigger'
import { ChipPopup } from './chip-popup'
import { RemoveButton } from './remove-button'
import { getSizeConfig, getRoundnessClass, buildLayoutTransition, EASING_CURVES } from '../config'
import type { AnimatedChipProps } from '../types'

// ============================================================================
// Component
// ============================================================================

export function AnimatedChip({
  filter,
  index,
  animationConfig,
  styleConfig,
  shouldReduceMotion,
  onValueChange,
  onRemove,
  showDebug,
}: AnimatedChipProps) {
  const [open, setOpen] = React.useState(false)

  // Derived values
  const sizeConfig = getSizeConfig(styleConfig.size)
  const roundnessClass = getRoundnessClass(styleConfig.roundness)
  const selectedOption = filter.options.find((o) => o.id === filter.value)
  const displayValue = selectedOption?.label ?? filter.value
  const Icon = filter.icon || FilterIcon

  // Build layout transition
  const layoutTransition = buildLayoutTransition(animationConfig)

  // Build scale transition (matches layout)
  const scaleTransition = animationConfig.transitionType === 'spring'
    ? { type: 'spring' as const, stiffness: animationConfig.stiffness, damping: animationConfig.damping }
    : { type: 'tween' as const, duration: animationConfig.duration, ease: EASING_CURVES[animationConfig.easing] }

  return (
    <motion.div
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        layout: layoutTransition,
        opacity: { duration: animationConfig.exitDuration },
        scale: scaleTransition,
      }}
      className="inline-flex origin-left"
    >
      <Select.Root
        value={filter.value}
        onValueChange={(val: string | null) => val && onValueChange(val)}
        open={open}
        onOpenChange={setOpen}
      >
        {/* Chip container - animates width changes */}
        <motion.div
          layout
          transition={{ layout: layoutTransition }}
          className={cn(
            'group relative inline-flex items-center',
            'bg-secondary border border-transparent shine-3-subtle',
            'hover:bg-tertiary',
            open && 'bg-tertiary',
            roundnessClass,
            'transition-colors duration-150',
            'motion-reduce:transition-none'
          )}
          style={{ height: sizeConfig.height }}
        >
          {/* Trigger */}
          <ChipTrigger
            displayValue={displayValue}
            icon={Icon}
            sizeConfig={sizeConfig}
            isOpen={open}
            roundnessClass={roundnessClass}
          />

          {/* Remove button */}
          <RemoveButton
            filterLabel={filter.label}
            iconSize={sizeConfig.iconSize}
            height={sizeConfig.height}
            onRemove={onRemove}
          />

          {/* Debug index */}
          {showDebug && (
            <span className="absolute -top-2 -left-2 bg-brand-primary text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono">
              {index}
            </span>
          )}
        </motion.div>

        {/* Dropdown popup */}
        <ChipPopup
          label={filter.label}
          options={filter.options}
          isOpen={open}
        />
      </Select.Root>
    </motion.div>
  )
}

AnimatedChip.displayName = 'AnimatedChip'
