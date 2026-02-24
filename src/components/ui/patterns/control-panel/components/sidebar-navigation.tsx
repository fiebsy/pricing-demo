// =============================================================================
// Sidebar Navigation Components (Experimental)
// =============================================================================
// A sidebar navigation that fans out on hover, showing section items.
// Uses motion for smooth animations following base-ui-setup patterns.
// =============================================================================

'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cx } from '../utils'
import type { Section } from '../types'

// -----------------------------------------------------------------------------
// Animation Variants
// -----------------------------------------------------------------------------

const sidebarVariants = {
  collapsed: {
    width: 44,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
  expanded: {
    width: 140,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
}

const labelVariants = {
  collapsed: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.15 },
  },
  expanded: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
}

// -----------------------------------------------------------------------------
// Layout Constants
// -----------------------------------------------------------------------------

const ITEM_HEIGHT = 40 // h-10 = 40px
const ITEM_GAP = 4 // gap-1 = 4px

// -----------------------------------------------------------------------------
// Sliding Active Indicator
// -----------------------------------------------------------------------------
// A single indicator element that slides to the active item position

interface SlidingIndicatorProps {
  activeIndex: number
  /** Size of the inverse corner squares in pixels */
  cornerSize?: number
  /** Radius of the inverse corner clip in pixels */
  cornerRadius?: number
}

function SlidingIndicator({
  activeIndex,
  cornerSize = 40,
  cornerRadius = 16,
}: SlidingIndicatorProps) {
  // Calculate Y position based on active index
  // Each item is ITEM_HEIGHT tall with ITEM_GAP gap between them
  const yOffset = activeIndex * (ITEM_HEIGHT + ITEM_GAP)

  // Generate clip paths based on dynamic size and radius
  const s = cornerSize
  const r = Math.min(cornerRadius, cornerSize) // clamp radius to size

  // Standard circular arc
  const topClip = `path('M ${s} ${s - r} A ${r} ${r} 0 0 1 ${s - r} ${s} L ${s} ${s} Z')`
  const bottomClip = `path('M ${s - r} 0 A ${r} ${r} 0 0 1 ${s} ${r} L ${s} 0 Z')`

  return (
    <motion.div
      className={cx(
        'pointer-events-none absolute left-0 right-0 overflow-visible rounded-l-lg',
        'bg-quaternary', // Main background color
        'z-[2]' // Above non-active button backgrounds, below text content (z-10)
      )}
      style={{ height: ITEM_HEIGHT, top: 0 }}
      initial={false}
      animate={{ y: yOffset }}
      transition={{
        type: 'tween',
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1], // Expo out
      }}
    >
      {/* Top edge — clipped to bottom-right inverse corner */}
      <div
        className="absolute right-0 top-0 z-20 -translate-y-full bg-quaternary"
        style={{ width: s, height: s, clipPath: topClip }}
      />

      {/* Bottom edge — clipped to top-right inverse corner */}
      <div
        className="absolute right-0 bottom-0 z-20 translate-y-full bg-quaternary"
        style={{ width: s, height: s, clipPath: bottomClip }}
      />
    </motion.div>
  )
}

// -----------------------------------------------------------------------------
// Sidebar Item
// -----------------------------------------------------------------------------

interface SidebarItemProps {
  section: Section
  isActive: boolean
  isExpanded: boolean
  onClick: () => void
}

function SidebarItem({ section, isActive, isExpanded, onClick }: SidebarItemProps) {
  // Use short label for sidebar, fallback to title
  const label = section.label || section.tabLabel || section.title

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        'group relative flex h-10 w-full items-center px-3',
        'rounded-l-lg',
        'outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
      )}
    >
      {/* Background layer — inner span so button has no stacking context (z-10 labels escape) */}
      <span
        className={cx(
          'pointer-events-none absolute inset-0 rounded-l-lg',
          'transition-[background-color,backdrop-filter] duration-200',
          isActive ? 'bg-transparent backdrop-blur-none' : 'bg-secondary_subtle backdrop-blur-sm'
        )}
      />
      {/* Label content - z-10 to stay above indicator */}
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            variants={labelVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className={cx(
              'pointer-events-none relative z-10 truncate text-left text-xs font-medium transition-colors duration-200',
              isActive ? 'text-primary' : 'text-tertiary group-hover:text-secondary'
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

// -----------------------------------------------------------------------------
// Sidebar Navigation
// -----------------------------------------------------------------------------

export interface SidebarNavigationProps {
  sections: Section[]
  activeTabId: string
  onTabChange: (tabId: string) => void
  header?: ReactNode
  footer?: ReactNode
  /** When true, sidebar is always expanded with labels visible */
  forceExpanded?: boolean
  /** Offset from top to align with panel content (below header). In pixels. */
  headerOffset?: number
  /** Size of the inverse corner squares in pixels */
  cornerSize?: number
  /** Radius of the inverse corner clip in pixels */
  cornerRadius?: number
}

export function SidebarNavigation({
  sections,
  activeTabId,
  onTabChange,
  header,
  footer,
  forceExpanded = false,
  headerOffset = 0,
  cornerSize,
  cornerRadius,
}: SidebarNavigationProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isExpanded = forceExpanded || isHovered

  // Calculate active index for the sliding indicator
  const activeIndex = sections.findIndex((s) => s.id === activeTabId)

  return (
    <motion.div
      variants={sidebarVariants}
      initial={forceExpanded ? 'expanded' : 'collapsed'}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cx('flex h-full flex-col overflow-visible')}
      style={{
        // Apply header offset as padding-top to align items with panel content
        paddingTop: headerOffset > 0 ? `${headerOffset}px` : undefined,
      }}
    >
      {/* Header slot (optional) */}
      {header && (
        <div className="shrink-0 border-b border-primary p-2">{header}</div>
      )}

      {/* Section items with Base UI ScrollArea */}
      <ScrollArea.Root className="relative min-h-0 flex-1 overflow-visible">
        <ScrollArea.Viewport className="overflow-visible! h-full w-full overscroll-contain">
          <ScrollArea.Content>
            <div className="relative flex flex-col gap-1 pb-1">
              {/* Sliding active indicator - positioned absolutely within items container */}
              {activeIndex >= 0 && (
                <SlidingIndicator
                  activeIndex={activeIndex}
                  cornerSize={cornerSize}
                  cornerRadius={cornerRadius}
                />
              )}

              {sections.map((section) => (
                <SidebarItem
                  key={section.id}
                  section={section}
                  isActive={activeTabId === section.id}
                  isExpanded={isExpanded}
                  onClick={() => onTabChange(section.id)}
                />
              ))}
            </div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="absolute top-0 right-0 bottom-0 flex w-1.5 touch-none select-none p-px opacity-0 transition-opacity data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-white/20" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      {/* Footer slot (optional) */}
      {footer && (
        <div className="shrink-0 border-t border-primary p-2">{footer}</div>
      )}
    </motion.div>
  )
}

// -----------------------------------------------------------------------------
// Sidebar Indicator (Active section indicator)
// -----------------------------------------------------------------------------

interface SidebarIndicatorProps {
  isExpanded: boolean
}

export function SidebarIndicator({ isExpanded }: SidebarIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExpanded ? 0 : 0.6 }}
      transition={{ duration: 0.15 }}
      className={cx(
        'absolute right-0 top-1/2 -translate-y-1/2',
        'h-12 w-0.5 rounded-full bg-tertiary'
      )}
    />
  )
}
