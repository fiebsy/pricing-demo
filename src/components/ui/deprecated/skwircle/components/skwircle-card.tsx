/**
 * Skwircle Card Component
 *
 * A pre-configured card variant of Skwircle for content containers.
 * Cards use neutral backgrounds and subtle borders - they are NOT interactive.
 *
 * @example Basic
 * ```tsx
 * <SkwircleCard elevation="sm">
 *   <div className="p-5">
 *     <h3>Card Title</h3>
 *     <p>Card content...</p>
 *   </div>
 * </SkwircleCard>
 * ```
 *
 * @example With depth gradient
 * ```tsx
 * <SkwircleCard
 *   elevation="sm"
 *   backgroundGradient="depth-10-bottom-right"
 * >
 *   <div className="p-5">Content with inner shadow effect</div>
 * </SkwircleCard>
 * ```
 *
 * @example Full width
 * ```tsx
 * <SkwircleCard fillMode className="w-full">
 *   <div className="p-6">Responsive card</div>
 * </SkwircleCard>
 * ```
 */

'use client'

import * as React from 'react'
import type { SkwircleProps } from '../types'

export interface SkwircleCardProps extends Omit<SkwircleProps, 'variant'> {}

/**
 * Internal component - gets the base Skwircle injected
 */
export const createSkwircleCard = (
  SkwircleBase: React.FC<SkwircleProps>
): React.FC<SkwircleCardProps> => {
  const SkwircleCard: React.FC<SkwircleCardProps> = (props) => {
    return <SkwircleBase variant="card" {...props} />
  }
  SkwircleCard.displayName = 'Skwircle.Card'
  return SkwircleCard
}
