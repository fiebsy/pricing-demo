/**
 * Biaxial Command Menu V3 - Click Outside Hook
 *
 * Detects clicks outside the menu to close it.
 */

import { useEffect } from 'react'

export interface UseClickOutsideOptions {
  /** Whether the menu is expanded */
  expanded: boolean
  /** Ref to the container element */
  containerRef: React.RefObject<HTMLDivElement | null>
  /** Called when clicked outside */
  onClickOutside: () => void
}

/**
 * Hook to detect clicks outside the container and trigger a callback
 */
export function useClickOutside({
  expanded,
  containerRef,
  onClickOutside,
}: UseClickOutsideOptions): void {
  useEffect(() => {
    if (!expanded) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [expanded, containerRef, onClickOutside])
}
