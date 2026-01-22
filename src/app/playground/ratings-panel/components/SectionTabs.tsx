/**
 * SectionTabs Component
 *
 * Horizontal tab navigation for Mind / Voice / Appearance sections.
 * Supports pill style (with progress wheels) and underline style.
 * Configurable tab sizes and custom labels.
 *
 * @module playground/ratings-panel/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Brain01Icon from '@hugeicons-pro/core-stroke-rounded/Brain01Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import User03Icon from '@hugeicons-pro/core-stroke-rounded/User03Icon'
import { ProgressWheel } from './ProgressWheel'
import { getScoreColorClass } from '../config'
import type { SectionData, SectionType, ScoreValue, RatingsConfig, TabSize } from '../config/types'

// Icon mapping
const sectionIconMap: Record<string, typeof Brain01Icon> = {
  Brain01Icon,
  Mic01Icon,
  User03Icon,
}

// Tab size styling maps
const TAB_SIZE_STYLES: Record<TabSize, { text: string; padding: string; icon: number; gap: string }> = {
  sm: { text: 'text-sm', padding: 'py-1.5 px-2', icon: 14, gap: 'gap-1.5' },
  md: { text: 'text-base', padding: 'py-2 px-3', icon: 18, gap: 'gap-2' },
  lg: { text: 'text-lg', padding: 'py-2.5 px-4', icon: 20, gap: 'gap-2.5' },
  xl: { text: 'text-xl', padding: 'py-3 px-5', icon: 24, gap: 'gap-3' },
}

const PILL_SIZE_MULTIPLIERS: Record<TabSize, number> = {
  sm: 0.8,
  md: 1,
  lg: 1.2,
  xl: 1.4,
}

export interface SectionTabsProps {
  sections: SectionData[]
  activeSection: SectionType
  onSectionChange: (section: SectionType) => void
  overallScore?: ScoreValue
  config: RatingsConfig['sectionTabs']
  className?: string
}

export function SectionTabs({
  sections,
  activeSection,
  onSectionChange,
  overallScore,
  config,
  className,
}: SectionTabsProps) {
  // Filter sections based on config
  const visibleSections = config.showAppearance
    ? sections
    : sections.filter((s) => s.sectionId !== 'appearance')

  const isUnderline = config.style === 'underline'
  const sizeStyles = TAB_SIZE_STYLES[config.tabSize || 'md']
  const pillMultiplier = PILL_SIZE_MULTIPLIERS[config.tabSize || 'md']

  // Get custom label for a section
  const getLabel = (section: SectionData): string => {
    if (section.sectionId === 'mind' && config.mindLabel) {
      return config.mindLabel
    }
    if (section.sectionId === 'voice' && config.voiceLabel) {
      return config.voiceLabel
    }
    return section.label
  }

  return (
    <div className={cn('relative flex items-center gap-1', className)}>
      {/* Overall Score Badge - top right (pill style only) */}
      {config.showOverallScore && overallScore && !isUnderline && (
        <div className="absolute -top-2 -right-2">
          <ProgressWheel
            value={overallScore.current}
            size={24}
            strokeWidth={2}
            isActive={false}
          >
            <span
              className={cn(
                'text-[10px] font-bold tabular-nums leading-none',
                getScoreColorClass(overallScore.current)
              )}
            >
              {overallScore.current}
            </span>
          </ProgressWheel>
        </div>
      )}

      {visibleSections.map((section) => {
        const isActive = activeSection === section.sectionId
        const Icon = sectionIconMap[section.icon] || Brain01Icon
        const label = getLabel(section)

        if (isUnderline) {
          // Underline style tab with configurable size
          return (
            <button
              key={section.sectionId}
              type="button"
              onClick={() => onSectionChange(section.sectionId as SectionType)}
              className={cn(
                'group relative flex items-center',
                sizeStyles.padding,
                sizeStyles.gap,
                'motion-safe:transition-colors motion-safe:duration-150',
                'motion-reduce:transition-none',
                isActive ? 'text-brand-primary' : 'text-secondary hover:text-primary'
              )}
            >
              {/* Icon */}
              <HugeIcon
                icon={Icon}
                size={sizeStyles.icon}
                strokeWidth={1.5}
                className="text-current"
              />

              {/* Label */}
              <span className={cn(sizeStyles.text, 'font-medium')}>{label}</span>

              {/* Score (inline for underline style) */}
              {config.showOverallScore && (
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums',
                    getScoreColorClass(section.aggregate.current)
                  )}
                >
                  {section.aggregate.current}
                </span>
              )}

              {/* Underline indicator */}
              <span
                className={cn(
                  'absolute bottom-0 left-0 right-0',
                  'motion-safe:transition-all motion-safe:duration-200',
                  'motion-reduce:transition-none',
                  isActive
                    ? `bg-${config.underlineColor} opacity-100`
                    : 'bg-transparent opacity-0'
                )}
                style={{ height: config.underlineHeight }}
              />
            </button>
          )
        }

        // Pill style tab (default) with size scaling
        const scaledWheelSize = Math.round(config.progressWheelSize * pillMultiplier)
        const scaledStrokeWidth = Math.round(config.progressStrokeWidth * pillMultiplier * 10) / 10

        return (
          <button
            key={section.sectionId}
            type="button"
            onClick={() => onSectionChange(section.sectionId as SectionType)}
            className={cn(
              'group flex items-center rounded-lg',
              sizeStyles.padding,
              sizeStyles.gap,
              'motion-safe:transition-all motion-safe:duration-150',
              'motion-reduce:transition-none',
              isActive ? `bg-${config.activeBackground}` : 'hover:bg-secondary/50'
            )}
          >
            {/* Progress wheel with icon */}
            <ProgressWheel
              value={section.aggregate.current}
              size={scaledWheelSize}
              strokeWidth={scaledStrokeWidth}
              isActive={isActive}
            >
              <HugeIcon
                icon={Icon}
                size={scaledWheelSize * 0.5}
                strokeWidth={1.5}
                className={cn(isActive ? 'text-brand-primary' : 'text-secondary')}
              />
            </ProgressWheel>

            {/* Label */}
            <span
              className={cn(
                sizeStyles.text,
                'font-semibold',
                isActive ? 'text-brand-primary' : 'text-primary'
              )}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
