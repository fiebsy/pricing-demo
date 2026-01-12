/**
 * Card Preview Component
 *
 * Renders a live preview of the card based on current configuration.
 */

'use client'

import React from 'react'
import type { CardConfig } from '../types'
import { Skwircle } from '@/components/ui/deprecated/skwircle/skwircle'
import type { SkwircleBackgroundGradient } from '@/components/ui/deprecated/skwircle/types'

interface CardPreviewProps {
  config: CardConfig
}

// Card intent to badge/accent color mapping
const INTENT_ACCENT_COLORS: Record<string, { badge: string; text: string }> = {
  default: { badge: 'bg-tertiary', text: 'text-secondary' },
  primary: { badge: 'bg-brand-secondary', text: 'text-brand-secondary' },
  success: { badge: 'bg-success-secondary', text: 'text-success-secondary' },
  warning: { badge: 'bg-warning-secondary', text: 'text-warning-secondary' },
  error: { badge: 'bg-error-secondary', text: 'text-error-secondary' },
}

/**
 * Constructs the backgroundGradient preset name from intensity and direction.
 */
const getDepthPreset = (intensity: string, direction: string): SkwircleBackgroundGradient | undefined => {
  if (intensity === 'none') return undefined
  return `depth-${intensity}-${direction}` as SkwircleBackgroundGradient
}

export const CardPreview: React.FC<CardPreviewProps> = ({ config }) => {
  const accent = INTENT_ACCENT_COLORS[config.intent] || INTENT_ACCENT_COLORS.default
  const intentLabel = config.intent.charAt(0).toUpperCase() + config.intent.slice(1)

  if (!accent) return null

  const depthPreset = getDepthPreset(config.depthIntensity, config.depthDirection)

  return (
    <div className="flex items-center justify-center p-8">
      <Skwircle.Card
        intent={config.intent}
        elevation={config.elevation}
        roundness={config.roundness}
        fillMode={config.fillMode}
        backgroundGradient={depthPreset}
        backgroundColor={config.backgroundColor ?? undefined}
        backgroundColorHover={config.backgroundColorHover ?? undefined}
        borderColor={config.borderColor ?? undefined}
        borderWidth={config.borderWidth}
        ring={config.ring}
        ringColor={config.ringColor}
        ringWidth={config.ringWidth}
        ringOpacity={config.ringOpacity}
        style={config.fillMode ? { width: '100%' } : { width: 320 }}
      >
        <div className="p-5">
          {/* Card Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-primary">
                {intentLabel} Card
              </h3>
              <p className="mt-0.5 text-xs text-tertiary">
                Semantic card styling
              </p>
            </div>
            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${accent.badge} ${accent.text}`}>
              {intentLabel}
            </span>
          </div>

          {/* Card Body */}
          <div className="mt-4">
            <p className="text-sm text-secondary leading-relaxed">
              This card uses semantic styling appropriate for content containers.
            </p>
          </div>

          {/* Card Footer */}
          <div className="mt-5 flex items-center gap-2 border-t border-secondary pt-4">
            <span className="text-xs text-quaternary">Card actions:</span>
            <button
              type="button"
              className="text-xs font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors"
            >
              View details
            </button>
          </div>
        </div>
      </Skwircle.Card>
    </div>
  )
}
