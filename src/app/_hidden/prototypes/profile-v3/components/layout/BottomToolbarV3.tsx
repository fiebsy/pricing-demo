/**
 * BottomToolbarV3 Component
 *
 * Fixed toolbar at bottom-left with "Save my Delphi" button, settings, and share.
 *
 * @module b/profile-v3/components/layout
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/core/primitives/button'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import Share01Icon from '@hugeicons-pro/core-stroke-rounded/Share01Icon'
import { Z_INDEX } from '../../../profile-v2/config'

// =============================================================================
// TYPES
// =============================================================================

export interface BottomToolbarV3Props {
  onSave?: () => void
  onSettings?: () => void
  onShare?: () => void
  isSaving?: boolean
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function BottomToolbarV3({
  onSave,
  onSettings,
  onShare,
  isSaving = false,
  className,
}: BottomToolbarV3Props) {
  return (
    <div
      className={cn(
        'fixed bottom-6 left-6',
        'flex items-center gap-2',
        'bg-primary border border-secondary rounded-2xl p-2',
        'shadow-lg',
        className
      )}
      style={{ zIndex: Z_INDEX.bottomToolbar }}
    >
      {/* Share my Delphi button */}
      <Button
        variant="primary"
        size="sm"
        onClick={onSave}
        isLoading={isSaving}
        showTextWhileLoading
      >
        Share my Delphi
      </Button>

      {/* Settings button */}
      {onSettings && (
        <Button
          variant="tertiary"
          size="sm"
          iconLeading={Settings01Icon}
          onClick={onSettings}
          aria-label="Settings"
        />
      )}

      {/* Share button */}
      {onShare && (
        <Button
          variant="tertiary"
          size="sm"
          iconLeading={Share01Icon}
          onClick={onShare}
          aria-label="Share"
        />
      )}
    </div>
  )
}
