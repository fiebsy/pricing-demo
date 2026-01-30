/**
 * Question Command Menu V3 - Input With Buttons
 *
 * Enhanced trigger component that supports action buttons inside the input.
 * Adapted from V2 with V3 type imports.
 */

'use client'

import * as React from 'react'
import { forwardRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Button } from '@/components/ui/core/primitives/button'
import type { ButtonVariant, ButtonRoundness } from '@/components/ui/core/primitives/button/types'
import { useBiaxialExpand } from '@/components/ui/features/command-menu'
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
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
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
  'arrow-down': ArrowDown01Icon,
  'chevron-down': ArrowDown01Icon,
}

// ============================================================================
// VARIANT MAPPING
// ============================================================================

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

// ============================================================================
// TYPES
// ============================================================================

export interface InputWithButtonsProps {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  onEscape?: () => void
  onEnter?: () => void
  triggerConfig: TriggerConfig
  onButtonClick?: (buttonIndex: number, buttonConfig: TriggerButtonConfig) => void
  className?: string
  /** When true (default), focusing input expands the panel. Set to false when expansion is controlled externally. */
  expandOnFocus?: boolean
}

// ============================================================================
// INDICATOR ICON
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
// ACTION BUTTON
// ============================================================================

interface ActionButtonProps {
  config: TriggerButtonConfig
  onClick?: () => void
  expanded?: boolean
  duration?: number
}

const ActionButton: React.FC<ActionButtonProps> = ({ config, onClick, expanded, duration = 300 }) => {
  if (!config.enabled) return null

  if (config.type === 'indicator') {
    return <IndicatorIcon config={config} />
  }

  const IconComponent = config.icon ? ICON_MAP[config.icon] : undefined
  const showIcon = (config.type === 'icon' || config.type === 'icon-text') && IconComponent
  const showLabel = config.type === 'text' || config.type === 'icon-text'

  const buttonVariant = mapVariant(config.variant)
  const buttonRoundness: ButtonRoundness = config.roundness ?? 'squircle'

  // Add fade-in animation for buttons that only appear when expanded
  const shouldAnimate = config.showWhen === 'expanded'
  const isVisible = expanded && shouldAnimate

  const button = (
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

  // Wrap with animation container for expand-only buttons
  if (shouldAnimate) {
    return (
      <span
        className="motion-reduce:transition-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: `opacity ${duration * 0.6}ms cubic-bezier(0.16, 1, 0.3, 1) ${duration * 0.4}ms, transform ${duration * 0.6}ms cubic-bezier(0.16, 1, 0.3, 1) ${duration * 0.4}ms`,
        }}
      >
        {button}
      </span>
    )
  }

  return button
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
      expandOnFocus = true,
    },
    ref
  ) => {
    const { expanded, setExpanded, timing } = useBiaxialExpand()

    const handleFocus = useCallback(() => {
      if (expandOnFocus) {
        setExpanded(true)
      }
    }, [setExpanded, expandOnFocus])

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

    // Filter buttons based on position, enabled state, and showWhen
    const shouldShowButton = (btn: TriggerButtonConfig) => {
      if (!btn.enabled) return false
      const showWhen = btn.showWhen ?? 'always'
      if (showWhen === 'always') return true
      if (showWhen === 'expanded') return expanded
      if (showWhen === 'collapsed') return !expanded
      return true
    }

    const leftButtons = triggerConfig.buttons?.filter((b) => b.position === 'left' && shouldShowButton(b)) ?? []
    const rightButtons = triggerConfig.buttons?.filter((b) => b.position === 'right' && shouldShowButton(b)) ?? []
    const hasRightButtons = rightButtons.length > 0

    const expandOffsetLeft = expanded ? triggerConfig.paddingExpandedLeft : 0
    const expandOffsetRight = expanded ? triggerConfig.paddingExpandedRight : 0
    const paddingLeft = triggerConfig.paddingLeft + expandOffsetLeft
    const paddingRight = triggerConfig.paddingRight + expandOffsetRight
    const paddingTop = triggerConfig.paddingTop
    const paddingBottom = triggerConfig.paddingBottom

    // Get animation duration from context for synchronized transitions
    const duration = timing.duration

    return (
      <div
        className={cn(
          'flex items-center w-full h-full gap-2',
          'motion-reduce:transition-none',
          className
        )}
        style={{
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom,
          // When expanded, always use text cursor for proper input UX
          cursor: expanded ? 'text' : triggerConfig.cursor,
          transition: `padding ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        {/* Left Buttons */}
        {leftButtons.map((btn, idx) => (
          <ActionButton
            key={`left-${idx}`}
            config={btn}
            onClick={() => onButtonClick?.(triggerConfig.buttons.indexOf(btn), btn)}
            expanded={expanded}
            duration={duration}
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

        {/* Keyboard hint */}
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
            expanded={expanded}
            duration={duration}
          />
        ))}
      </div>
    )
  }
)

InputWithButtons.displayName = 'InputWithButtons'
