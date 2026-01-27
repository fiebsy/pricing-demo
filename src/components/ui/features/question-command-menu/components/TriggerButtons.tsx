/**
 * Question Command Menu V4 - Trigger Buttons
 *
 * Button rendering logic for trigger component.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Button } from '@/components/ui/prod/base/button'
import type { ButtonVariant, ButtonRoundness } from '@/components/ui/prod/base/button/types'
import { useButtonVisibility } from '../hooks'
import type { TriggerButtonConfig, TriggerButtonVariant, SaveStatus } from '../types'

// Icons
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import Edit01Icon from '@hugeicons-pro/core-stroke-rounded/Edit01Icon'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
import SentIcon from '@hugeicons-pro/core-stroke-rounded/SentIcon'
import Loading03Icon from '@hugeicons-pro/core-stroke-rounded/Loading03Icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'

// =============================================================================
// ICON MAP
// =============================================================================

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search01Icon,
  add: Add01Icon,
  send: SentIcon,
  check: Tick01Icon,
  close: Cancel01Icon,
  refresh: RefreshIcon,
  settings: Settings01Icon,
  edit: Edit01Icon,
  delete: Delete01Icon,
  sparkle: SparklesIcon,
  'arrow-right': ArrowRight01Icon,
  'arrow-up': ArrowUp01Icon,
  'arrow-down': ArrowDown01Icon,
  'chevron-down': ArrowDown01Icon,
}

// =============================================================================
// VARIANT MAPPING
// =============================================================================

function mapVariant(variant: TriggerButtonVariant): ButtonVariant {
  switch (variant) {
    case 'ghost':
      return 'tertiary'
    case 'outline':
      return 'secondary'
    case 'solid':
      return 'primary'
    case 'primary-destructive':
    case 'secondary-destructive':
    case 'tertiary-destructive':
      return variant
    default:
      return variant as ButtonVariant
  }
}

// =============================================================================
// INDICATOR ICON
// =============================================================================

interface IndicatorIconProps {
  config: TriggerButtonConfig
}

const IndicatorIcon: React.FC<IndicatorIconProps> = ({ config }) => {
  const IconComponent = config.icon ? ICON_MAP[config.icon] : ArrowRight01Icon

  return (
    <span
      className={cn(
        'shrink-0 flex items-center justify-center',
        'text-quaternary',
        config.className
      )}
    >
      <HugeIcon
        icon={IconComponent}
        size={config.size === 'sm' ? 16 : 18}
        strokeWidth={1.5}
      />
    </span>
  )
}

// =============================================================================
// ACTION BUTTON
// =============================================================================

export interface ActionButtonProps {
  config: TriggerButtonConfig
  onClick?: () => void
  expanded?: boolean
  duration?: number
  /** Save status for save buttons - shows loading/saved states */
  saveStatus?: SaveStatus
  /** Whether there are unsaved changes (for Edit → Save transition) */
  hasUnsavedChanges?: boolean
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  config,
  onClick,
  expanded,
  duration = 300,
  saveStatus = 'idle',
  hasUnsavedChanges = false,
}) => {
  // Pass expanded prop to visibility check for accurate state
  const isVisible = useButtonVisibility(config.showWhen, expanded)

  if (!config.enabled || !isVisible) return null

  if (config.type === 'indicator') {
    return <IndicatorIcon config={config} />
  }

  // Check if this is an edit/save button (Edit label that becomes Save)
  const isEditSaveButton = config.label === 'Edit'
  // Check if this is a dedicated save button (includes Add which triggers submit/save)
  const isSaveButton = config.icon === 'check' || config.label === 'Save' || config.label === 'Add' || isEditSaveButton

  // Determine icon based on save status for save buttons
  let IconComponent = config.icon ? ICON_MAP[config.icon] : undefined
  let isLoading = false

  if (isSaveButton) {
    if (saveStatus === 'saving') {
      IconComponent = Loading03Icon
      isLoading = true
    } else if (saveStatus === 'saved') {
      IconComponent = CheckmarkCircle02Icon
    }
  }

  const showIcon = (config.type === 'icon' || config.type === 'icon-text') && IconComponent
  const showLabel = config.type === 'text' || config.type === 'icon-text'

  const buttonVariant = mapVariant(config.variant)
  const buttonRoundness: ButtonRoundness = config.roundness ?? 'squircle'

  // Add fade-in animation for buttons that only appear when expanded
  const shouldAnimate = config.showWhen === 'expanded'
  const isAnimVisible = expanded && shouldAnimate

  // Determine label based on save status and unsaved changes
  let buttonLabel = config.label
  if (isSaveButton) {
    if (saveStatus === 'saving') {
      buttonLabel = 'Saving...'
    } else if (saveStatus === 'saved') {
      buttonLabel = 'Saved'
    } else if (isEditSaveButton && hasUnsavedChanges) {
      buttonLabel = 'Save'
    }
    // Otherwise keep original label (Edit, Save, Add, etc.)
  }

  const button = (
    <Button
      variant={buttonVariant}
      size={config.size}
      roundness={buttonRoundness}
      iconLeading={
        showIcon ? (
          <HugeIcon
            icon={IconComponent}
            size={16}
            className={cn(isLoading && 'animate-spin')}
          />
        ) : undefined
      }
      onClick={(e) => {
        e.stopPropagation()
        // Don't trigger click while saving or after saved
        if (saveStatus === 'idle' || (isEditSaveButton && hasUnsavedChanges)) {
          onClick?.()
        }
      }}
      disabled={isSaveButton && saveStatus === 'saving'}
      className={cn(
        config.className,
        isSaveButton && saveStatus === 'saved' && 'text-success'
      )}
    >
      {showLabel && buttonLabel ? buttonLabel : undefined}
    </Button>
  )

  // Wrap with animation container for expand-only buttons
  if (shouldAnimate) {
    return (
      <span
        className="motion-reduce:transition-none"
        style={{
          opacity: isAnimVisible ? 1 : 0,
          transform: isAnimVisible ? 'scale(1)' : 'scale(0.9)',
          transition: `opacity ${duration * 0.6}ms cubic-bezier(0.16, 1, 0.3, 1) ${duration * 0.4}ms, transform ${duration * 0.6}ms cubic-bezier(0.16, 1, 0.3, 1) ${duration * 0.4}ms`,
        }}
      >
        {button}
      </span>
    )
  }

  return button
}

ActionButton.displayName = 'ActionButton'
