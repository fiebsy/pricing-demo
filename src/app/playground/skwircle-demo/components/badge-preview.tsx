/**
 * Badge Preview Component
 *
 * Renders a live preview of the badge based on current configuration.
 */

'use client'

import React from 'react'
import type { BadgeConfig } from '../types'
import { Skwircle } from '@/components/ui/skwircle/skwircle'
import {
  getBadgeColorConfig,
  getBadgePaddingStyle,
  getBadgeIconStyle,
  getBadgeTextStyle,
  BADGE_SIZE_CONFIGS,
} from '@/components/ui/skwircle/config/badge'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'
import CheckmarkCircle01Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle01Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'

interface BadgePreviewProps {
  config: BadgeConfig
}

// Map color to appropriate icon
const COLOR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  success: CheckmarkCircle01Icon,
  warning: AlertCircleIcon,
  error: AlertCircleIcon,
}

export const BadgePreview: React.FC<BadgePreviewProps> = ({ config }) => {
  const colorConfig = getBadgeColorConfig(config.type, config.color)
  const paddingStyle = getBadgePaddingStyle(config.size, config.showIcon ? 'leading' : 'none')
  const iconStyle = getBadgeIconStyle(colorConfig)
  const textStyle = getBadgeTextStyle(colorConfig)
  const sizeConfig = BADGE_SIZE_CONFIGS[config.size]

  // Determine roundness - pill type defaults to pill roundness
  const finalRoundness = config.type === 'pill' ? 'pill' : config.roundness

  // Choose icon based on color
  const IconComponent = COLOR_ICONS[config.color] ?? CheckmarkCircle01Icon

  return (
    <div className="flex items-center justify-center p-8">
      <Skwircle.Badge
        backgroundColor={colorConfig.backgroundColor}
        borderColor={colorConfig.borderColor}
        roundness={finalRoundness}
      >
        <span
          className={`flex items-center ${sizeConfig.textClass} font-medium`}
          style={paddingStyle}
        >
          {config.showIcon && (
            <span style={iconStyle}>
              <HugeIcon
                icon={IconComponent}
                size={sizeConfig.iconSize}
                strokeWidth={sizeConfig.iconStroke}
              />
            </span>
          )}
          <span style={textStyle}>{config.label}</span>
        </span>
      </Skwircle.Badge>
    </div>
  )
}
