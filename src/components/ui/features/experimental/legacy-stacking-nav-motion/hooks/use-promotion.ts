/**
 * StackingNav - Promotion Hook
 *
 * Tracks which item was just promoted (child becoming parent).
 *
 * Bug fix: Timeout uses `promotionDuration * 1000 / timeScale`
 * instead of the previous hard-coded `400 / timeScale`.
 *
 * @module features/stacking-nav/hooks
 */

import { useState, useRef, useEffect } from 'react'
import type { StackItem, AnimationConfig } from '../types'

interface UsePromotionReturn {
  promotingId: string | null
}

export function usePromotion(
  activeId: string | undefined,
  level: number,
  items: StackItem[],
  animationConfig: AnimationConfig,
): UsePromotionReturn {
  const [promotingId, setPromotingId] = useState<string | null>(null)
  const previousActiveIdRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (activeId !== previousActiveIdRef.current && activeId) {
      const item = items.find(i => i.id === activeId)
      if (level > 0 && item?.children?.length) {
        setPromotingId(activeId)
        // Bug fix: Use configurable promotionDuration instead of hard-coded 400ms.
        const timeout = (animationConfig.promotionDuration * 1000) / animationConfig.timeScale
        setTimeout(() => setPromotingId(null), timeout)
      }
    }
    previousActiveIdRef.current = activeId
  }, [activeId, level, items, animationConfig.promotionDuration, animationConfig.timeScale])

  return { promotingId }
}
