/**
 * Skwircle Input Component
 *
 * A pre-configured input variant of Skwircle for form fields.
 * Supports ring states for focus and error indication.
 *
 * @example Basic
 * ```tsx
 * <SkwircleInput style={{ width: 300 }}>
 *   <input
 *     type="text"
 *     placeholder="Enter text..."
 *     className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
 *   />
 * </SkwircleInput>
 * ```
 *
 * @example Focused state
 * ```tsx
 * <SkwircleInput ring ringColor="outline-color-brand">
 *   <input ... />
 * </SkwircleInput>
 * ```
 *
 * @example Error state
 * ```tsx
 * <SkwircleInput
 *   borderColor="border-error"
 *   ring
 *   ringColor="outline-color-error"
 * >
 *   <input ... />
 * </SkwircleInput>
 * ```
 */

'use client'

import * as React from 'react'
import type { SkwircleProps } from '../types'

export interface SkwircleInputProps extends Omit<SkwircleProps, 'variant'> {}

/**
 * Internal component - gets the base Skwircle injected
 */
export const createSkwircleInput = (
  SkwircleBase: React.FC<SkwircleProps>
): React.FC<SkwircleInputProps> => {
  const SkwircleInput: React.FC<SkwircleInputProps> = (props) => {
    return <SkwircleBase variant="input" {...props} />
  }
  SkwircleInput.displayName = 'Skwircle.Input'
  return SkwircleInput
}
