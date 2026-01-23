/**
 * FlowSelector - Configurable flow method options
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Idea01Icon from '@hugeicons-pro/core-stroke-rounded/Idea01Icon'
import File02Icon from '@hugeicons-pro/core-stroke-rounded/File02Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import type { FlowOptionConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export type FlowType = 'quick-fix' | 'add-to-mind' | 'manual-fix'

export interface FlowSelectorProps {
  onSelect: (flowType: FlowType) => void
  config: FlowOptionConfig
  selectedFlow?: FlowType | null
  className?: string
}

// =============================================================================
// FLOW OPTIONS DATA
// =============================================================================

const FLOW_OPTIONS: Array<{
  type: FlowType
  label: string
  description: string
  icon: typeof Idea01Icon
}> = [
  {
    type: 'quick-fix',
    label: 'Quick Fix',
    description: '10 T/F questions',
    icon: Idea01Icon,
  },
  {
    type: 'add-to-mind',
    label: 'Add to Mind',
    description: 'Upload files/links',
    icon: File02Icon,
  },
  {
    type: 'manual-fix',
    label: 'Manual Fix',
    description: 'Type or speak',
    icon: Mic01Icon,
  },
]

// =============================================================================
// SINGLE OPTION COMPONENT
// =============================================================================

interface FlowOptionProps {
  option: (typeof FLOW_OPTIONS)[number]
  config: FlowOptionConfig
  isSelected: boolean
  isHovered: boolean
  onHover: (hovered: boolean) => void
  onClick: () => void
}

function FlowOption({
  option,
  config,
  isSelected,
  isHovered,
  onHover,
  onClick,
}: FlowOptionProps) {
  // Determine background
  const bgClass = isSelected
    ? `bg-${config.selectedBackground}`
    : isHovered
      ? `bg-${config.hoverBackground}`
      : 'bg-secondary'

  // Determine border
  const borderClass = isSelected
    ? `border-2 border-${config.selectedBorder}`
    : 'border border-primary'

  // Build shine class
  const shineClass = config.shine !== 'none'
    ? `${config.shine}${config.shineIntensity}`
    : ''

  // Build corner class
  const cornerClass = config.cornerShape === 'squircle' ? 'corner-squircle' : ''

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        'flex flex-col items-center text-center',
        bgClass,
        borderClass,
        shineClass,
        cornerClass,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'motion-safe:transition-all motion-safe:duration-150'
      )}
      style={{
        padding: config.cardPadding,
        borderRadius: config.cardBorderRadius,
      }}
    >
      {/* Icon circle */}
      <div
        className={cn('rounded-full flex items-center justify-center mb-2', `bg-${config.iconCircleBackground}`)}
        style={{
          width: config.iconCircleSize,
          height: config.iconCircleSize,
        }}
      >
        <HugeIcon
          icon={option.icon}
          size={config.iconSize as number}
          className="text-brand-primary"
        />
      </div>

      {/* Label */}
      <h4 className={cn('font-medium text-primary mb-0.5', config.labelSize)}>
        {option.label}
      </h4>

      {/* Description */}
      <p className={cn('text-tertiary', config.descriptionSize)}>
        {option.description}
      </p>
    </button>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function FlowSelector({
  onSelect,
  config,
  selectedFlow,
  className,
}: FlowSelectorProps) {
  const [hoveredFlow, setHoveredFlow] = useState<FlowType | null>(null)

  return (
    <div className={className}>
      {/* Header */}
      <p className="text-sm text-tertiary text-center mb-6">
        Choose how you&apos;d like to improve this answer:
      </p>

      {/* Options grid */}
      <div
        className="grid grid-cols-3"
        style={{ gap: config.cardGap }}
      >
        {FLOW_OPTIONS.map((option) => (
          <FlowOption
            key={option.type}
            option={option}
            config={config}
            isSelected={selectedFlow === option.type}
            isHovered={hoveredFlow === option.type}
            onHover={(hovered) => setHoveredFlow(hovered ? option.type : null)}
            onClick={() => onSelect(option.type)}
          />
        ))}
      </div>
    </div>
  )
}
