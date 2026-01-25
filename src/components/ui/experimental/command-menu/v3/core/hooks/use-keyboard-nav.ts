/**
 * Biaxial Command Menu V3 - Keyboard Navigation Hook
 *
 * Handles arrow key navigation and enter selection.
 */

import { useEffect } from 'react'
import type { CommandListRef } from '@/components/ui/prod/base/biaxial-command-menu/components/command-list'

export interface UseKeyboardNavOptions {
  /** Whether the menu is expanded */
  expanded: boolean
  /** Ref to the command list for navigation methods */
  listRef: React.RefObject<CommandListRef | null>
}

/**
 * Hook to handle keyboard navigation when menu is expanded
 *
 * Listens for:
 * - ArrowDown: Move to next item
 * - ArrowUp: Move to previous item
 * - Enter: Select highlighted item
 */
export function useKeyboardNav({ expanded, listRef }: UseKeyboardNavOptions): void {
  useEffect(() => {
    if (!expanded) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          listRef.current?.highlightNext()
          break
        case 'ArrowUp':
          e.preventDefault()
          listRef.current?.highlightPrev()
          break
        case 'Enter':
          e.preventDefault()
          listRef.current?.selectHighlighted()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [expanded, listRef])
}
