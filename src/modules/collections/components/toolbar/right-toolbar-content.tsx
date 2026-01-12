/**
 * RightToolbarContent Component
 *
 * Contains the ExpandingSearch component for the right side of the toolbar.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

import { ExpandingSearch } from '@/components/ui/prod/features/expanding-search'
import { HARDENED_SEARCH_CONFIG } from '../../config/hardened-preset'

// =============================================================================
// TYPES
// =============================================================================

export interface RightToolbarContentProps {
  /** Current search value */
  value: string
  /** Callback when search value changes */
  onChange: (value: string) => void
  /** Whether search is expanded */
  expanded: boolean
  /** Callback when expanded state changes */
  onExpandedChange: (expanded: boolean) => void
  /** Optional className */
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export const RightToolbarContent: React.FC<RightToolbarContentProps> = ({
  value,
  onChange,
  expanded,
  onExpandedChange,
  className,
}) => {
  return (
    <div className={cn('flex items-center', className)}>
      <ExpandingSearch
        value={value}
        onChange={onChange}
        expanded={expanded}
        onExpandedChange={onExpandedChange}
        placeholder={HARDENED_SEARCH_CONFIG.placeholder}
        expandedWidth={HARDENED_SEARCH_CONFIG.expandedWidth}
        collapsedWidth={HARDENED_SEARCH_CONFIG.collapsedWidth}
        height={HARDENED_SEARCH_CONFIG.height}
        duration={HARDENED_SEARCH_CONFIG.duration}
        revealMode={HARDENED_SEARCH_CONFIG.revealMode}
        hideMode={HARDENED_SEARCH_CONFIG.hideMode}
        collapseOnBlur={HARDENED_SEARCH_CONFIG.collapseOnBlur}
        className="shine-1"
      />
    </div>
  )
}

RightToolbarContent.displayName = 'RightToolbarContent'
