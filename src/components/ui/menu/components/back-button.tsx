/**
 * Base UI Menu - Back Button Component
 *
 * Navigation button for returning to the previous menu level.
 *
 * @module base-ui/menu/components/back-button
 */

'use client'

import React from 'react'
import { ArrowLeft01Icon } from '@hugeicons-pro/core-stroke-rounded'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'

// ============================================================================
// Types
// ============================================================================

interface BackButtonProps {
  /** Title to display (current menu name) */
  title: string | null
  /** Callback when back is clicked */
  onBack: () => void
}

// ============================================================================
// Component
// ============================================================================

/**
 * Back button for submenu navigation
 */
export const BackButton: React.FC<BackButtonProps> = ({ title, onBack }) => {
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation()
          onBack()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowLeft') {
            e.preventDefault()
            onBack()
          }
        }}
        className={cn(
          'hover:bg-quaternary focus:bg-quaternary active:bg-tertiary',
          'mb-1 flex cursor-pointer items-center gap-2.5 corner-squircle px-2.5 py-1.5',
          'transition-colors duration-150 outline-none'
        )}
        style={{ borderRadius: 'var(--menu-item-radius, 12px)' }}
        role="menuitem"
        tabIndex={0}
      >
        <HugeIcon
          icon={ArrowLeft01Icon}
          size={16}
          strokeWidth={2}
          className="text-tertiary shrink-0"
        />
        <span className="text-primary flex-1 truncate text-sm font-medium">
          {title || ''}
        </span>
      </div>
      <div role="separator" className="bg-border-primary -mx-1 my-1 h-px opacity-50" />
    </>
  )
}

BackButton.displayName = 'BackButton'
