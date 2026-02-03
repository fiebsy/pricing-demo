/**
 * StackingNav - Hover Suppression Hook
 *
 * Prevents hover flash on newly appearing child items by temporarily
 * suppressing hover visuals via a data attribute. The button's existing
 * CSS transition handles the smooth fade-in when suppression lifts.
 *
 * Bug fix: Adds missing `timeScale` and `level` to useEffect deps
 * (previously hidden by eslint-disable).
 *
 * @module features/stacking-nav/hooks
 */

import { useState, useEffect } from 'react'
import type { StackItem, AnimationConfig } from '../types'

interface UseHoverSuppressionReturn {
  isHoverSuppressed: boolean
}

export function useHoverSuppression(
  level: number,
  items: StackItem[],
  animationConfig: AnimationConfig,
): UseHoverSuppressionReturn {
  const hoverDelay = animationConfig.hoverDelay
  const timeScale = animationConfig.timeScale
  const [isHoverSuppressed, setIsHoverSuppressed] = useState(level > 0 && hoverDelay > 0)

  useEffect(() => {
    if (level === 0 || hoverDelay <= 0) {
      setIsHoverSuppressed(false)
      return
    }
    setIsHoverSuppressed(true)
    const timer = setTimeout(
      () => setIsHoverSuppressed(false),
      (hoverDelay * 1000) / timeScale,
    )
    return () => clearTimeout(timer)
    // Bug fix: timeScale and level are now included in deps.
    // Previously suppressed with eslint-disable-next-line.
  }, [items, hoverDelay, timeScale, level])

  return { isHoverSuppressed }
}
