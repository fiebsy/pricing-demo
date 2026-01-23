/**
 * CompletionState - Configurable completion view
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import CheckmarkCircle01Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import type { CompletionConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface CompletionStateProps {
  onContinue: () => void
  bullets: string[]
  config: CompletionConfig
  className?: string
}

// =============================================================================
// BULLET ICON
// =============================================================================

function BulletIcon({ style, color }: { style: CompletionConfig['bulletStyle']; color: string }) {
  if (style === 'check') {
    return (
      <HugeIcon
        icon={CheckmarkCircle01Icon}
        size={14}
        className={`text-${color} flex-shrink-0`}
      />
    )
  }
  if (style === 'arrow') {
    return (
      <HugeIcon
        icon={ArrowRight01Icon}
        size={14}
        className={`text-${color} flex-shrink-0`}
      />
    )
  }
  return (
    <span className={`text-${color} mt-0.5 flex-shrink-0`}>•</span>
  )
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CompletionState({
  onContinue,
  bullets,
  config,
  className,
}: CompletionStateProps) {
  // Button size classes
  const buttonSizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  }

  // Button style classes
  const buttonStyleClasses = {
    solid: 'bg-brand-solid text-white hover:bg-brand-solid-hover',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10',
    ghost: 'text-brand-primary hover:bg-brand-primary/10',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-8', className)}>
      {/* Success icon */}
      <div
        className={cn(
          'rounded-full flex items-center justify-center mb-4',
          `bg-${config.iconBackground}`
        )}
        style={{
          width: config.iconSize,
          height: config.iconSize,
        }}
      >
        <HugeIcon
          icon={Tick01Icon}
          size="xl"
          className={`text-${config.iconColor}`}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-primary mb-2">All done!</h3>

      {/* Subtitle */}
      <p className="text-sm text-tertiary mb-6 max-w-xs">
        Here&apos;s what I learned about your perspective:
      </p>

      {/* Memory bullets */}
      <ul
        className="text-left w-full max-w-xs mb-8"
        style={{ gap: config.bulletSpacing }}
      >
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-secondary"
            style={{ marginBottom: config.bulletSpacing }}
          >
            <BulletIcon style={config.bulletStyle} color={config.bulletColor} />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <button
        type="button"
        onClick={onContinue}
        className={cn(
          'rounded-xl font-medium',
          'motion-safe:transition-colors motion-safe:duration-150',
          buttonSizeClasses[config.buttonSize],
          buttonStyleClasses[config.buttonStyle]
        )}
      >
        Generate New Answer
      </button>
    </div>
  )
}
