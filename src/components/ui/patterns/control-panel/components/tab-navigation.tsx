// =============================================================================
// Tab Navigation Components
// =============================================================================
// Components for the tab navigation bar:
// - ScrollableTabList: Wrapper with overflow handling and fade indicators
// - TabTrigger: Visual content for tab buttons
// - MinimizeButton: Panel minimize control
// =============================================================================

'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import MinusSignIcon from '@hugeicons-pro/core-stroke-rounded/MinusSignIcon'
import { cx } from '@/components/utils/cx'
import { HugeIcon } from '@/components/ui/core/primitives/icon'

// -----------------------------------------------------------------------------
// Scrollable Tab List Container
// -----------------------------------------------------------------------------
// Wraps the TabList with overflow detection and fade indicators

interface ScrollableTabListProps {
  children: ReactNode
  activeTabId: string
  isScrollable: boolean
}

export function ScrollableTabList({ children, activeTabId, isScrollable }: ScrollableTabListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({ canScrollLeft: false, canScrollRight: false })

  // Update scroll state for fade indicators
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    setScrollState({
      canScrollLeft: scrollLeft > 2,
      canScrollRight: scrollLeft < scrollWidth - clientWidth - 2,
    })
  }, [])

  // Setup scroll listeners
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })

    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(el)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      resizeObserver.disconnect()
    }
  }, [updateScrollState])

  // Scroll active tab into view
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !isScrollable) return

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      const activeTab = el.querySelector(`[data-key="${activeTabId}"]`) as HTMLElement
      if (!activeTab) return

      const containerRect = el.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()

      // Check if tab is outside visible area
      if (tabRect.left < containerRect.left + 8) {
        el.scrollBy({ left: tabRect.left - containerRect.left - 16, behavior: 'smooth' })
      } else if (tabRect.right > containerRect.right - 8) {
        el.scrollBy({ left: tabRect.right - containerRect.right + 16, behavior: 'smooth' })
      }
    })
  }, [activeTabId, isScrollable])

  return (
    <div className="relative flex min-w-0 flex-1">
      {/* Left fade indicator */}
      {isScrollable && (
        <div
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute left-0 top-0 z-10 h-full w-5',
            'bg-gradient-to-r from-[var(--bg-quaternary)] to-transparent',
            'transition-opacity duration-150',
            'motion-reduce:transition-none',
            scrollState.canScrollLeft ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={cx(
          'flex min-w-0 flex-1 items-center gap-0.5',
          isScrollable && 'overflow-x-auto scrollbar-hide'
        )}
      >
        {children}
      </div>

      {/* Right fade indicator */}
      {isScrollable && (
        <div
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute right-0 top-0 z-10 h-full w-5',
            'bg-gradient-to-l from-[var(--bg-quaternary)] to-transparent',
            'transition-opacity duration-150',
            'motion-reduce:transition-none',
            scrollState.canScrollRight ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Tab Trigger - Visual content inside React Aria Tab
// -----------------------------------------------------------------------------

interface TabTriggerProps {
  label: string
  isSelected: boolean
  isScrollable: boolean
}

export function TabTrigger({ label, isSelected, isScrollable }: TabTriggerProps) {
  return (
    <span
      className={cx(
        'block rounded px-2 py-1.5 font-medium whitespace-nowrap',
        'transition-colors motion-reduce:transition-none',
        isScrollable ? 'shrink-0 text-[9px]' : 'text-center text-[10px]',
        isSelected
          ? 'bg-secondary text-primary'
          : 'text-tertiary group-hover:text-primary bg-transparent'
      )}
    >
      {label}
    </span>
  )
}

// -----------------------------------------------------------------------------
// Minimize Button
// -----------------------------------------------------------------------------

interface MinimizeButtonProps {
  onClick: () => void
}

export function MinimizeButton({ onClick }: MinimizeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'text-tertiary hover:text-secondary ml-1 shrink-0 rounded p-1.5',
        'transition-colors hover:bg-secondary',
        'motion-reduce:transition-none'
      )}
      aria-label="Minimize panel"
    >
      <HugeIcon icon={MinusSignIcon} size={12} strokeWidth={2} />
    </button>
  )
}
