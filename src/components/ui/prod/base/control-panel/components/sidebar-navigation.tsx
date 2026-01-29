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
import { cx } from '@/components/utils/cx'
import type { Section } from '../types'

// -----------------------------------------------------------------------------
// Animation Variants
// -----------------------------------------------------------------------------

const sidebarVariants = {
  collapsed: {
    width: 44,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  expanded: {
    width: 140,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
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

const itemVariants = {
  collapsed: {
    scale: 1,
  },
  expanded: {
    scale: 1,
    transition: { duration: 0.2 },
  },
}

// -----------------------------------------------------------------------------
// Section Icon (Placeholder - can be extended with actual icons)
// -----------------------------------------------------------------------------

interface SectionIconProps {
  sectionId: string
  isActive: boolean
}

function SectionIcon({ sectionId, isActive }: SectionIconProps) {
  // Generate a simple icon based on section ID first letter
  const letter = sectionId.charAt(0).toUpperCase()
  
  return (
    <div
      className={cx(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
        'text-xs font-medium',
        'transition-colors duration-150',
        isActive
          ? 'bg-secondary text-primary'
          : 'text-tertiary group-hover:text-secondary'
      )}
    >
      {letter}
    </div>
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

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={onClick}
      className={cx(
        'group flex w-full items-center h-10 px-3', // Match panel header height
        'rounded-l-lg', // Only round left side, right connects to panel
        'transition-all duration-150',
        'outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'backdrop-blur-sm',
        isActive
          ? 'bg-tertiary'
          : 'bg-secondary/30 hover:bg-secondary/70'
      )}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            variants={labelVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className={cx(
              'truncate text-left text-xs font-medium transition-colors',
              isActive 
                ? 'text-primary' 
                : 'text-tertiary group-hover:text-secondary'
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
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
}

export function SidebarNavigation({
  sections,
  activeTabId,
  onTabChange,
  header,
  footer,
  forceExpanded = false,
  headerOffset = 0,
}: SidebarNavigationProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isExpanded = forceExpanded || isHovered

  return (
    <motion.div
      variants={sidebarVariants}
      initial={forceExpanded ? 'expanded' : 'collapsed'}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cx(
        'flex h-full flex-col overflow-hidden'
      )}
      style={{
        // Apply header offset as padding-top to align items with panel content
        paddingTop: headerOffset > 0 ? `${headerOffset}px` : undefined,
      }}
    >
      {/* Header slot (optional) */}
      {header && (
        <div className="shrink-0 border-b border-primary p-2">
          {header}
        </div>
      )}

      {/* Section items with Base UI ScrollArea */}
      <ScrollArea.Root className="relative flex-1 overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full overscroll-contain">
          <ScrollArea.Content>
            <div className="flex flex-col gap-1 pl-0.5 pb-1">
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
        <div className="shrink-0 border-t border-primary p-2">
          {footer}
        </div>
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
