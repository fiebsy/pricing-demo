/**
 * Skwircle Button Component
 *
 * A pre-configured button variant of Skwircle with proper styling helpers.
 * Uses config from ./config/button.ts for size and intent presets.
 *
 * @example Basic
 * ```tsx
 * <SkwircleButton intent="primary">
 *   <span className="px-4 py-2">Click me</span>
 * </SkwircleButton>
 * ```
 *
 * @example With size config helpers
 * ```tsx
 * const sizeConfig = BUTTON_SIZE_CONFIGS.md
 * const padding = getButtonPaddingStyle('md', false, true)
 *
 * <SkwircleButton intent="primary">
 *   <span className={sizeConfig.textClass} style={padding}>
 *     Button Text
 *   </span>
 * </SkwircleButton>
 * ```
 */

'use client'

import * as React from 'react'
import type { SkwircleProps } from '../types'

// Re-export button config for easy access
export {
  BUTTON_SIZE_CONFIGS,
  BUTTON_INTENT_CONFIGS,
  getButtonSizeConfig,
  getButtonIntentConfig,
  getButtonIconStyle,
  getButtonPaddingStyle,
  type ButtonSize,
  type ButtonIntent,
  type ButtonSizeConfig,
  type ButtonIntentConfig,
} from '../config/button'

export interface SkwircleButtonProps extends Omit<SkwircleProps, 'variant'> {}

/**
 * Internal component - gets the base Skwircle injected
 */
export const createSkwircleButton = (
  SkwircleBase: React.FC<SkwircleProps>
): React.FC<SkwircleButtonProps> => {
  const SkwircleButton: React.FC<SkwircleButtonProps> = (props) => {
    return <SkwircleBase variant="button" {...props} />
  }
  SkwircleButton.displayName = 'Skwircle.Button'
  return SkwircleButton
}
