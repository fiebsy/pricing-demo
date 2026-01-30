/**
 * SectionTabs Component
 *
 * Horizontal tab navigation for Mind / Voice / Appearance sections.
 * Uses Button component from prod/base for consistent styling.
 * Supports pill style (with progress wheels) and underline style.
 *
 * @module playground/ratings-panel/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
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

// Tab size to Button size mapping
const TAB_SIZE_TO_BUTTON_SIZE: Record<TabSize, 'sm' | 'md' | 'lg' | 'xl'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}

// Progress wheel multipliers per tab size
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
  const buttonSize = TAB_SIZE_TO_BUTTON_SIZE[config.tabSize || 'md']
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
          // Underline style - use tertiary button with iconLeading
          return (
            <div key={section.sectionId} className="relative">
              <Button
                variant="tertiary"
                size={buttonSize}
                iconLeading={Icon}
                onClick={() => onSectionChange(section.sectionId as SectionType)}
                className={cn(
                  isActive && 'text-brand-primary hover:text-brand-primary [&_[data-icon]]:text-brand-primary'
                )}
              >
                {label}
                {config.showOverallScore && (
                  <span
                    className={cn(
                      'ml-1 text-sm font-semibold tabular-nums',
                      getScoreColorClass(section.aggregate.current)
                    )}
                  >
                    {section.aggregate.current}
                  </span>
                )}
              </Button>

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
            </div>
          )
        }

        // Pill style - use secondary button when active, tertiary when inactive
        // With progress wheel as custom leading element
        const scaledWheelSize = Math.round(config.progressWheelSize * pillMultiplier)
        const scaledStrokeWidth = Math.round(config.progressStrokeWidth * pillMultiplier * 10) / 10

        return (
          <Button
            key={section.sectionId}
            variant={isActive ? 'secondary' : 'tertiary'}
            size={buttonSize}
            roundness="squircle"
            onClick={() => onSectionChange(section.sectionId as SectionType)}
            className={cn(
              isActive && 'ring-brand-primary/20'
            )}
            iconLeading={
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
            }
          >
            <span
              className={cn(
                'font-semibold',
                isActive ? 'text-brand-primary' : 'text-primary'
              )}
            >
              {label}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
