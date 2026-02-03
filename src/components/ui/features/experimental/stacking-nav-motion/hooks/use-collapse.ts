/**
 * StackingNav - Collapse Hook
 *
 * Owns the collapse detection flag and timeout management.
 * Render-time detection stays synchronous (children must see it immediately).
 * The useEffect only manages the timeout — it does NOT set the flag (bug fix).
 *
 * Bug fix: Collapse timeout uses `(collapseLayoutDuration * 1000 + 100) / timeScale`
 * instead of the previous hard-coded `500 / timeScale`.
 *
 * @module features/stacking-nav/hooks
 */

import { useRef, useEffect, useCallback } from 'react'
import type { AnimationConfig, ActivePath } from '../types'
import { debug } from '../utils/debug'

interface UseCollapseReturn {
  /** Getter function — reads ref, not a captured value */
  getIsCollapsing: () => boolean
}

export function useCollapse(
  activePath: ActivePath,
  animationConfig: AnimationConfig,
  showDebug: boolean,
): UseCollapseReturn {
  const isCollapsingRef = useRef(false)
  const previousPathLengthRef = useRef(0)
  const previousPathKeyRef = useRef('')
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const activePathKey = activePath.join('/')

  // ---- Render-time detection (synchronous) --------------------------------
  // Must happen DURING render so StackLevel children see it immediately.
  const isCollapseRender = activePath.length < previousPathLengthRef.current
  const isNewPath = activePathKey !== previousPathKeyRef.current

  if (isCollapseRender) {
    isCollapsingRef.current = true
  } else if (isNewPath && isCollapsingRef.current) {
    // Non-collapse path change clears stale flag
    isCollapsingRef.current = false
  }

  // ---- Effect: debug logging + timeout management -------------------------
  useEffect(() => {
    const wasCollapse = activePath.length < previousPathLengthRef.current

    if (wasCollapse) {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }

      // NOTE: We do NOT set isCollapsingRef.current = true here.
      // That already happened synchronously during render above.
      // Setting it again in the effect is redundant and was a bug source.

      debug('collapse', 'Detected', {
        timestamp: `${performance.now().toFixed(2)}ms`,
        pathBefore: previousPathLengthRef.current,
        pathAfter: activePath.length,
      })

      // Bug fix: Use configurable duration instead of hard-coded 500ms.
      // collapseLayoutDuration is in seconds, so multiply by 1000.
      // Add 100ms buffer for AnimatePresence multi-cycle exits.
      const collapseResetDelay =
        (animationConfig.collapseLayoutDuration * 1000 + 100) / animationConfig.timeScale

      collapseTimeoutRef.current = setTimeout(() => {
        isCollapsingRef.current = false
        debug('collapse', `Timeout reset @ ${performance.now().toFixed(2)}ms`)
      }, collapseResetDelay)
    } else {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
      isCollapsingRef.current = false

      const wasExpansion = activePath.length > previousPathLengthRef.current
      if (wasExpansion) {
        debug('collapse', 'Expansion - flag cleared')
      }
    }

    previousPathLengthRef.current = activePath.length
    previousPathKeyRef.current = activePathKey
  }, [activePathKey, animationConfig.collapseLayoutDuration, animationConfig.timeScale, showDebug])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
    }
  }, [])

  const getIsCollapsing = useCallback(() => isCollapsingRef.current, [])

  return { getIsCollapsing }
}
