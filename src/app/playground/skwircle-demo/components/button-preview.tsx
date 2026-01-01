/**
 * Button Preview Component
 *
 * Renders a live preview of the button based on current configuration.
 */

'use client'

import React from 'react'
import type { ButtonConfig } from '../types'
import { Skwircle } from '@/components/ui/skwircle/skwircle'
import {
  BUTTON_SIZE_CONFIGS,
  getButtonPaddingStyle,
  getButtonIntentConfig,
} from '@/components/ui/skwircle/config/button'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

interface ButtonPreviewProps {
  config: ButtonConfig
}

export const ButtonPreview: React.FC<ButtonPreviewProps> = ({ config }) => {
  const sizeConfig = BUTTON_SIZE_CONFIGS[config.size]
  const intentConfig = getButtonIntentConfig(config.intent)
  const paddingStyle = getButtonPaddingStyle(config.size, config.iconOnly, config.showIcon && !config.iconOnly)

  // Determine text color based on intent
  const textColorClass = intentConfig.textColorHover
    ? `${intentConfig.textColor} group-hover:${intentConfig.textColorHover}`
    : intentConfig.textColor

  return (
    <div className="flex items-center justify-center p-8">
      <Skwircle.Button
        intent={config.intent}
        roundness={config.roundness}
        ring={config.ring}
        ringOpacity={config.ringOpacity}
        borderWidth={config.intent === 'secondary' ? 1 : config.borderWidth}
      >
        <span
          className={`flex items-center ${sizeConfig.textClass} font-medium ${textColorClass} transition duration-100 ease-linear`}
          style={paddingStyle}
        >
          {config.showIcon && (
            <span className="opacity-55 transition-opacity duration-100 ease-linear group-hover:opacity-100">
              <HugeIcon icon={ArrowRight01Icon} size={sizeConfig.iconSize} strokeWidth={sizeConfig.iconStroke} />
            </span>
          )}
          {!config.iconOnly && config.label}
        </span>
      </Skwircle.Button>
    </div>
  )
}
