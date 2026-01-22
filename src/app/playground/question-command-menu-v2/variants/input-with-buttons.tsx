/**
 * Question Command Menu - Input With Buttons Variant
 *
 * Enhanced trigger component that supports action buttons inside the input.
 * Based on BiaxialExpandV4.SearchInput with additional button slots.
 * Uses proper Button component with shine, squircle support.
 */

'use client'

import * as React from 'react'
import { forwardRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Button } from '@/components/ui/prod/base/button'
import type { ButtonVariant, ButtonRoundness } from '@/components/ui/prod/base/button/types'
import { useBiaxialExpand } from '@/components/ui/prod/base/biaxial-command-menu-v4'
import type { TriggerConfig, TriggerButtonConfig, TriggerButtonVariant } from '../config/types'

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
import SentIcon from '@hugeicons-pro/core-stroke-rounded/SentIcon'

// ============================================================================
// ICON MAP
// ============================================================================

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
}

// ============================================================================
// VARIANT MAPPING
// ============================================================================

/**
 * Map our config variants to proper Button variants
 */
function mapVariant(variant: TriggerButtonVariant): ButtonVariant {
  switch (variant) {
    case 'ghost':
      return 'tertiary'
    case 'outline':
      return 'secondary'
    case 'solid':
      return 'primary'
    default:
      return variant as ButtonVariant
  }
}

// ============================================================================
// TYPES
// ============================================================================

export interface InputWithButtonsProps {
  /** Placeholder text */
  placeholder?: string
  /** Current value */
  value?: string
  /** Value change handler */
  onValueChange?: (value: string) => void
  /** Called when escape is pressed */
  onEscape?: () => void
  /** Called when enter is pressed */
  onEnter?: () => void
  /** Trigger configuration */
  triggerConfig: TriggerConfig
  /** Called when a button is clicked */
  onButtonClick?: (buttonIndex: number, buttonConfig: TriggerButtonConfig) => void
  /** Additional className */
  className?: string
}

// ============================================================================
// INDICATOR ICON (non-interactive)
// ============================================================================

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

// ============================================================================
// ACTION BUTTON COMPONENT (using proper Button)
// ============================================================================

interface ActionButtonProps {
  config: TriggerButtonConfig
  onClick?: () => void
}

const ActionButton: React.FC<ActionButtonProps> = ({ config, onClick }) => {
  if (!config.enabled) return null

  // Indicator is non-interactive
  if (config.type === 'indicator') {
    return <IndicatorIcon config={config} />
  }

  const IconComponent = config.icon ? ICON_MAP[config.icon] : undefined
  const showIcon = (config.type === 'icon' || config.type === 'icon-text') && IconComponent
  const showLabel = config.type === 'text' || config.type === 'icon-text'

  const buttonVariant = mapVariant(config.variant)
  const buttonRoundness: ButtonRoundness = config.roundness ?? 'squircle'

  return (
    <Button
      variant={buttonVariant}
      size={config.size}
      roundness={buttonRoundness}
      iconLeading={showIcon ? <HugeIcon icon={IconComponent} size={16} /> : undefined}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className={config.className}
    >
      {showLabel && config.label ? config.label : undefined}
    </Button>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const InputWithButtons = forwardRef<HTMLInputElement, InputWithButtonsProps>(
  (
    {
      placeholder = 'Type your question...',
      value,
      onValueChange,
      onEscape,
      onEnter,
      triggerConfig,
      onButtonClick,
      className,
    },
    ref
  ) => {
    const { expanded, setExpanded } = useBiaxialExpand()

    const handleFocus = useCallback(() => {
      setExpanded(true)
    }, [setExpanded])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          setExpanded(false)
          onEscape?.()
          ;(e.target as HTMLInputElement).blur()
        } else if (e.key === 'Enter') {
          e.preventDefault()
          onEnter?.()
        }
      },
      [setExpanded, onEscape, onEnter]
    )

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange?.(e.target.value)
      },
      [onValueChange]
    )

    const leftButtons = triggerConfig.buttons?.filter((b) => b.position === 'left' && b.enabled) ?? []
    const rightButtons = triggerConfig.buttons?.filter((b) => b.position === 'right' && b.enabled) ?? []
    const hasRightButtons = rightButtons.length > 0

    const paddingLeft = triggerConfig.paddingX + (expanded ? triggerConfig.paddingExpanded : 0)
    const paddingRight = triggerConfig.paddingX + (expanded ? triggerConfig.paddingExpanded : 0)

    return (
      <div
        className={cn(
          'flex items-center w-full h-full gap-2',
          className
        )}
        style={{
          paddingLeft,
          paddingRight,
          cursor: triggerConfig.cursor,
        }}
      >
        {/* Left Buttons */}
        {leftButtons.map((btn, idx) => (
          <ActionButton
            key={`left-${idx}`}
            config={btn}
            onClick={() => onButtonClick?.(triggerConfig.buttons.indexOf(btn), btn)}
          />
        ))}

        {/* Search icon */}
        {triggerConfig.showSearchIcon && (
          <HugeIcon
            icon={Search01Icon}
            size={18}
            className={cn(
              'shrink-0 transition-colors duration-150',
              expanded ? 'text-tertiary' : 'text-quaternary'
            )}
          />
        )}

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={value ?? ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'flex-1 min-w-0 bg-transparent outline-none',
            'text-primary placeholder:text-tertiary',
            'text-sm'
          )}
        />

        {/* Keyboard hint (when collapsed and no right buttons) */}
        {!expanded && triggerConfig.showKeyboardHint && !hasRightButtons && (
          <kbd
            className={cn(
              'hidden sm:flex items-center gap-1',
              'px-1.5 py-0.5 rounded',
              'bg-tertiary text-tertiary',
              'text-xs font-medium'
            )}
          >
            <span className="text-[10px]">⌘</span>
            <span>{triggerConfig.keyboardHintText}</span>
          </kbd>
        )}

        {/* Right Buttons */}
        {rightButtons.map((btn, idx) => (
          <ActionButton
            key={`right-${idx}`}
            config={btn}
            onClick={() => onButtonClick?.(triggerConfig.buttons.indexOf(btn), btn)}
          />
        ))}
      </div>
    )
  }
)

InputWithButtons.displayName = 'InputWithButtons'
