/**
 * SectionTabs Component
 *
 * Horizontal tab navigation for Mind / Voice / Appearance sections.
 * Features circular progress wheels around icons (Apple widget style).
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Brain01Icon from '@hugeicons-pro/core-stroke-rounded/Brain01Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import User03Icon from '@hugeicons-pro/core-stroke-rounded/User03Icon'
import { getScoreColor, getScoreColorClass } from '../constants'
import type { SectionTabsProps, SectionType } from '../types'

// =============================================================================
// ICON MAPPING
// =============================================================================

const sectionIconMap: Record<string, typeof Brain01Icon> = {
  Brain01Icon,
  Mic01Icon,
  User03Icon,
}

// =============================================================================
// PROGRESS WHEEL
// =============================================================================

interface ProgressWheelProps {
  value: number
  size?: number
  strokeWidth?: number
  isActive?: boolean
  children: React.ReactNode
}

function ProgressWheel({
  value,
  size = 56,
  strokeWidth = 4,
  isActive = false,
  children,
}: ProgressWheelProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clampedValue = Math.max(0, Math.min(100, value))
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference

  const scoreColor = getScoreColor(clampedValue)
  // Use semantic colors with reduced opacity
  const strokeColorMap = {
    success: 'rgb(23 178 106 / 0.6)',
    warning: 'rgb(247 144 9 / 0.6)',
    error: 'rgb(240 68 56 / 0.6)',
  }

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {/* SVG Circle */}
      <svg
        className="absolute -rotate-90"
        width={size}
        height={size}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-bg-quaternary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColorMap[scoreColor]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            'motion-safe:transition-[stroke-dashoffset] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]',
            'motion-reduce:transition-none'
          )}
        />
      </svg>

      {/* Center content (icon) */}
      <div className="relative flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SectionTabs({
  sections,
  activeSection,
  onSectionChange,
  overallScore,
  className,
}: SectionTabsProps) {
  // Filter out appearance tab (temporarily hidden)
  const visibleSections = sections.filter((s) => s.sectionId !== 'appearance')

  return (
    <div className={cn('relative flex items-center gap-6', className)}>

      {visibleSections.map((section) => {
        const isActive = activeSection === section.sectionId
        const Icon = sectionIconMap[section.icon] || Brain01Icon

        return (
          <button
            key={section.sectionId}
            type="button"
            onClick={() => onSectionChange(section.sectionId as SectionType)}
            className={cn(
              'group flex items-center gap-2 py-1.5 px-2 rounded-lg',
              'motion-safe:transition-all motion-safe:duration-150',
              'motion-reduce:transition-none',
              isActive
                ? 'bg-brand-primary/10'
                : 'hover:bg-secondary/50'
            )}
          >
            {/* Progress wheel with icon */}
            <ProgressWheel
              value={section.aggregate.current}
              size={24}
              strokeWidth={2}
              isActive={isActive}
            >
              <HugeIcon
                icon={Icon}
                size={12}
                strokeWidth={1.5}
                className={cn(
                  isActive ? 'text-brand-primary' : 'text-secondary'
                )}
              />
            </ProgressWheel>

            {/* Label to the right - larger than subcategories for hierarchy */}
            <span
              className={cn(
                'text-lg font-semibold',
                isActive ? 'text-brand-primary' : 'text-primary'
              )}
            >
              {section.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
