/**
 * Input Preview Component
 *
 * Renders a live preview of the input based on current configuration.
 */

'use client'

import React from 'react'
import type { InputConfig } from '../types'
import { Skwircle } from '@/components/ui/skwircle/skwircle'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'
import Mail01Icon from '@hugeicons-pro/core-stroke-rounded/Mail01Icon'

interface InputPreviewProps {
  config: InputConfig
  onValueChange?: (value: string) => void
}

export const InputPreview: React.FC<InputPreviewProps> = ({ config, onValueChange }) => {
  // Determine ring settings based on state
  const showRing = config.ring || config.state === 'focused' || config.state === 'error'
  const effectiveRingColor = config.state === 'error' ? 'outline-color-error' : config.ringColor
  const effectiveBorderColor = config.state === 'error' ? 'border-error' : undefined

  return (
    <div className="flex items-center justify-center p-8">
      <Skwircle.Input
        roundness={config.roundness}
        state={config.state}
        ring={showRing}
        ringColor={effectiveRingColor}
        ringWidth={config.ringWidth}
        borderColor={effectiveBorderColor}
        style={{ width: 300 }}
      >
        <div className="flex items-center gap-2 px-3 py-2.5">
          {config.showIcon && (
            <HugeIcon icon={Mail01Icon} size={18} className="text-tertiary" />
          )}
          <input
            type="text"
            placeholder={config.placeholder}
            value={config.value}
            onChange={(e) => onValueChange?.(e.target.value)}
            disabled={config.state === 'disabled'}
            className="flex-1 bg-transparent text-sm text-primary placeholder:text-placeholder outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </Skwircle.Input>
    </div>
  )
}
