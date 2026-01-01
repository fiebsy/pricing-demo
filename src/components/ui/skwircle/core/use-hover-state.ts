/**
 * useHoverState Hook
 *
 * Manages hover state with callback support.
 */

'use client'

import { useCallback, useState } from 'react'

interface UseHoverStateResult {
  /** Whether element is currently hovered */
  isHovered: boolean
  /** Mouse enter handler */
  handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void
  /** Mouse leave handler */
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * Hook to manage hover state.
 *
 * @param onMouseEnter - Optional callback for mouse enter
 * @param onMouseLeave - Optional callback for mouse leave
 */
export function useHoverState(
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void,
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
): UseHoverStateResult {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true)
      onMouseEnter?.(e)
    },
    [onMouseEnter]
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false)
      onMouseLeave?.(e)
    },
    [onMouseLeave]
  )

  return { isHovered, handleMouseEnter, handleMouseLeave }
}
