/**
 * Skwircle Avatar Component
 *
 * A pre-configured avatar variant of Skwircle for profile images.
 *
 * @example Basic
 * ```tsx
 * <SkwircleAvatar style={{ width: 40, height: 40 }}>
 *   <img src="/avatar.jpg" alt="User" />
 * </SkwircleAvatar>
 * ```
 *
 * @example With ring
 * ```tsx
 * <SkwircleAvatar ring ringColor="border-brand" style={{ width: 48, height: 48 }}>
 *   <img src="/avatar.jpg" alt="User" className="w-full h-full object-cover" />
 * </SkwircleAvatar>
 * ```
 */

'use client'

import * as React from 'react'
import type { SkwircleProps } from '../types'

export interface SkwircleAvatarProps extends Omit<SkwircleProps, 'variant'> {}

/**
 * Internal component - gets the base Skwircle injected
 */
export const createSkwircleAvatar = (
  SkwircleBase: React.FC<SkwircleProps>
): React.FC<SkwircleAvatarProps> => {
  const SkwircleAvatar: React.FC<SkwircleAvatarProps> = (props) => {
    return <SkwircleBase variant="avatar" {...props} />
  }
  SkwircleAvatar.displayName = 'Skwircle.Avatar'
  return SkwircleAvatar
}
