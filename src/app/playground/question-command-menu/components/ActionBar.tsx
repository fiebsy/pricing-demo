/**
 * ActionBar - Action buttons for bottom slot in detail view
 *
 * Provides delete, regenerate, improve, and save actions for the selected question.
 * Uses production Button component with evenly distributed layout.
 * Designed to work within BiaxialExpandV4.BottomSlot.
 *
 * @module playground/question-command-menu/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/prod/base/button'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import Edit01Icon from '@hugeicons-pro/core-stroke-rounded/Edit01Icon'

// =============================================================================
// TYPES
// =============================================================================

export interface ActionBarProps {
  /** Whether there's a selected question */
  hasSelection: boolean
  /** Whether the question has been modified */
  hasChanges?: boolean
  /** Called when delete is clicked */
  onDelete?: () => void
  /** Called when regenerate is clicked */
  onRegenerate?: () => void
  /** Called when improve is clicked */
  onImprove?: () => void
  /** Called when save is clicked */
  onSave?: () => void
  /** Additional className */
  className?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ActionBar({
  hasSelection,
  hasChanges,
  onDelete,
  onRegenerate,
  onImprove,
  onSave,
  className,
}: ActionBarProps) {
  if (!hasSelection) {
    return (
      <div className={cn('flex items-center justify-center p-4', className)}>
        <p className="text-xs text-tertiary">Select a question to see actions</p>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-evenly gap-2 p-3', className)}>
      <Button
        variant="secondary-destructive"
        size="sm"
        iconLeading={Delete01Icon}
        onClick={onDelete}
        disabled={!hasSelection}
      >
        Delete
      </Button>

      <Button
        variant="secondary"
        size="sm"
        iconLeading={RefreshIcon}
        onClick={onRegenerate}
        disabled={!hasSelection}
      >
        Regenerate
      </Button>

      <Button
        variant="secondary"
        size="sm"
        iconLeading={Edit01Icon}
        onClick={onImprove}
        disabled={!hasSelection}
      >
        Improve
      </Button>

      {hasChanges && (
        <Button
          variant="primary"
          size="sm"
          iconLeading={Tick01Icon}
          onClick={onSave}
        >
          Save
        </Button>
      )}
    </div>
  )
}
