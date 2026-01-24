/**
 * ChatInput Component
 *
 * Input area with inline control buttons (close, expand).
 * Same component used in all chat states for consistency.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Tooltip } from '@/components/ui/prod/base/tooltip'
import { ButtonUtility } from '@/components/ui/prod/base/button-utility'
import ArrowUp02Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp02Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import ArrowExpand01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowExpand01Icon'
import ArrowExpandIcon from '@hugeicons-pro/core-stroke-rounded/ArrowExpandIcon'
import Maximize01Icon from '@hugeicons-pro/core-stroke-rounded/Maximize01Icon'
import RemoveCircleIcon from '@hugeicons-pro/core-stroke-rounded/RemoveCircleIcon'
import MinusSignIcon from '@hugeicons-pro/core-stroke-rounded/MinusSignIcon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import CancelCircleIcon from '@hugeicons-pro/core-stroke-rounded/CancelCircleIcon'
import type { ChatInputProps, ChatOverlayState } from '../../types'
import type { InputStyleConfig, SemanticBgColor, ShineStyle } from '@/app/playground/radial-blur/config/types'

// =============================================================================
// COLOR MAPPING
// =============================================================================

const bgColorMap: Record<SemanticBgColor, string> = {
  'primary': 'var(--color-bg-primary)',
  'secondary': 'var(--color-bg-secondary)',
  'tertiary': 'var(--color-bg-tertiary)',
  'quaternary': 'var(--color-bg-quaternary)',
  'brand-primary': 'var(--color-bg-brand-solid)',
  'brand-secondary': 'var(--color-bg-brand-secondary)',
}

// =============================================================================
// TYPES
// =============================================================================

interface ChatInputInternalProps extends ChatInputProps {
  state?: ChatOverlayState
  onClose?: () => void
  onExpand?: () => void
  /** Input field styling configuration */
  inputStyle?: InputStyleConfig
}

interface IconButtonProps {
  icon: typeof Mic01Icon
  tooltip?: string
  disabled?: boolean
  iconSize: number
  buttonSize: number
  buttonRadius: number
  hoverShineStyle?: string
  useButtonUtility: boolean
  variant?: 'default' | 'send'
  bgColor?: string
  opacity?: number
  type?: 'button' | 'submit'
}

// =============================================================================
// ICON BUTTON SUBCOMPONENT
// =============================================================================

function IconButton({
  icon: Icon,
  tooltip,
  disabled,
  iconSize,
  buttonSize,
  buttonRadius,
  hoverShineStyle,
  useButtonUtility,
  variant = 'default',
  bgColor,
  opacity = 1,
  type = 'button',
}: IconButtonProps) {
  const isSend = variant === 'send'
  const borderRadiusValue = buttonRadius >= 24 ? '9999px' : `${buttonRadius}px`

  const button = (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'group relative flex items-center justify-center shrink-0 overflow-hidden',
        isSend ? 'text-white' : 'text-tertiary',
        'motion-safe:transition-all motion-safe:duration-150',
        'motion-reduce:transition-none'
      )}
      style={{
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        borderRadius: borderRadiusValue,
        backgroundColor: isSend ? bgColor : undefined,
        opacity,
      }}
    >
      {/* Hover shine background layer */}
      {hoverShineStyle && !isSend && (
        <div
          className={cn(
            'absolute inset-0 rounded-[inherit] pointer-events-none',
            'opacity-0 group-hover:opacity-100',
            'motion-safe:transition-opacity motion-safe:duration-150',
            'bg-tertiary'
          )}
          style={{ boxShadow: hoverShineStyle }}
        />
      )}
      <HugeIcon
        icon={Icon}
        size={iconSize}
        strokeWidth={isSend ? 2 : 1.5}
        className={cn(
          'relative z-10',
          !isSend && 'group-hover:text-primary'
        )}
      />
    </button>
  )

  if (tooltip) {
    return (
      <Tooltip title={tooltip} side="top" sideOffset={8}>
        {button}
      </Tooltip>
    )
  }

  return button
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ChatInput({
  onSend,
  onFocus,
  onBlur,
  disabled,
  state = 'collapsed',
  onClose,
  onExpand,
  inputStyle,
  className,
}: ChatInputInternalProps) {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // Input styling
  const {
    bgColor = 'secondary',
    bgOpacity = 80,
    blurAmount = 12,
    borderRadius = 12,
    useSquircle = false,
    shineStyle = 'none',
    focusShineStyle = 'none',
    showFocusRing = true,
    iconSize = 20,
    iconButtonSize = 36,
    iconButtonRadius = 8,
    sendButtonBgColor = 'brand-primary',
    sendButtonOpacity = 100,
    minHeight = 44,
    iconButtonGap = 4,
    useButtonUtility = true,
    showTooltips = true,
    hoverShineStyle = 'shine-1',
    controlButtonsOffsetX = 8,
    controlButtonsGap = 4,
    controlButtonSize = 'sm',
    controlButtonRadius = 8,
    // Control container styling
    controlContainerEnabled = false,
    controlContainerBgColor = 'secondary',
    controlContainerBgOpacity = 80,
    controlContainerBlurAmount = 12,
    controlContainerBorderRadius = 999,
    controlContainerPadding = 4,
    controlContainerShineStyle = 'shine-1',
    controlContainerUseSquircle = false,
    // Button icons and order
    controlButtonsReversed = false,
    closeButtonIcon = 'minus-circle',
    expandButtonIcon = 'expand',
  } = inputStyle ?? {}

  // Get hover shine box-shadow
  const hoverShineBoxShadow = hoverShineStyle !== 'none'
    ? `var(--${hoverShineStyle})`
    : undefined

  // Get control container shine box-shadow
  const controlContainerShineBoxShadow = controlContainerShineStyle !== 'none'
    ? `var(--${controlContainerShineStyle})`
    : undefined

  // Control container border radius (999 = fully rounded)
  const controlContainerRadiusValue = controlContainerBorderRadius >= 999
    ? '9999px'
    : `${controlContainerBorderRadius}px`

  // Control button border radius (999 = fully rounded)
  const controlButtonRadiusValue = controlButtonRadius >= 999
    ? '9999px'
    : `${controlButtonRadius}px`

  // Icon mapping for close button
  const closeIconMap = {
    'minus-circle': RemoveCircleIcon,
    'minus': MinusSignIcon,
    'x': Cancel01Icon,
    'x-circle': CancelCircleIcon,
  } as const

  // Icon mapping for expand button
  const expandIconMap = {
    'expand': ArrowExpand01Icon,
    'arrows-expand': ArrowExpandIcon,
    'maximize': Maximize01Icon,
  } as const

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault()
      const trimmed = inputValue.trim()
      if (trimmed && !disabled) {
        onSend(trimmed)
        setInputValue('')
      }
    },
    [inputValue, onSend, disabled]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  const canSend = inputValue.trim() && !disabled
  const isExpanded = state === 'expanded'
  const showControls = state !== 'collapsed'

  // Get shine box-shadow from CSS variable (switch on focus)
  const activeShineStyle = isFocused && focusShineStyle !== 'none' ? focusShineStyle : shineStyle
  const shineBoxShadow = activeShineStyle !== 'none'
    ? `var(--${activeShineStyle})`
    : undefined

  // Handle focus events
  const handleFocus = useCallback(() => {
    setIsFocused(true)
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    onBlur?.()
  }, [onBlur])

  return (
    <form onSubmit={handleSubmit} className={cn('relative p-4', className)}>
      {/* Input field */}
      <div
        className={cn(
          'relative flex flex-col gap-2 p-3',
          useSquircle && 'corner-squircle',
          showFocusRing && 'focus-within:ring-2 focus-within:ring-brand-primary/20',
          'motion-safe:transition-all motion-safe:duration-150',
          'motion-reduce:transition-none'
        )}
        style={{
          borderRadius: `${borderRadius}px`,
          minHeight: `${minHeight}px`,
        }}
      >
        {/* Background layer with blur and opacity */}
        <div
          className={cn(
            'absolute inset-0',
            useSquircle && 'corner-squircle',
            'motion-safe:transition-shadow motion-safe:duration-150'
          )}
          style={{
            borderRadius: `${borderRadius}px`,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            backgroundColor: bgColorMap[bgColor],
            opacity: bgOpacity / 100,
            boxShadow: shineBoxShadow,
          }}
        />
        {/* Text input - top row */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          disabled={disabled}
          className={cn(
            'relative z-10 w-full bg-transparent outline-none',
            'text-sm text-primary placeholder:text-tertiary',
            'px-1 py-1',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />

        {/* Buttons row - bottom */}
        <div className="relative z-10 flex items-center justify-end">
          <div
            className="flex items-center"
            style={{ gap: `${iconButtonGap}px` }}
          >
            {/* Mic button */}
            <IconButton
              icon={Mic01Icon}
              tooltip={showTooltips ? 'Voice input' : undefined}
              disabled={disabled}
              iconSize={iconSize}
              buttonSize={iconButtonSize}
              buttonRadius={iconButtonRadius}
              hoverShineStyle={hoverShineBoxShadow}
              useButtonUtility={useButtonUtility}
            />

            {/* Send button */}
            <IconButton
              icon={ArrowUp02Icon}
              tooltip={showTooltips ? 'Send message' : undefined}
              disabled={!canSend}
              iconSize={iconSize}
              buttonSize={iconButtonSize}
              buttonRadius={iconButtonRadius}
              hoverShineStyle={hoverShineBoxShadow}
              useButtonUtility={useButtonUtility}
              variant="send"
              bgColor={bgColorMap[sendButtonBgColor]}
              opacity={canSend ? sendButtonOpacity / 100 : 0.5}
              type="submit"
            />
          </div>
        </div>

        {/* Control buttons - absolute positioned outside input, vertically centered */}
        {showControls && (
          <div
            className="absolute top-1/2"
            style={{
              right: `-${controlButtonsOffsetX}px`,
              transform: 'translateY(-50%) translateX(100%)',
            }}
          >
            {controlContainerEnabled ? (
              /* Styled container for control buttons */
              <div
                className={cn(
                  'relative flex items-center',
                  controlContainerUseSquircle && 'corner-squircle'
                )}
                style={{
                  gap: `${controlButtonsGap}px`,
                  padding: `${controlContainerPadding}px`,
                  borderRadius: controlContainerRadiusValue,
                }}
              >
                {/* Background layer with blur and opacity */}
                <div
                  className={cn(
                    'absolute inset-0',
                    controlContainerUseSquircle && 'corner-squircle'
                  )}
                  style={{
                    borderRadius: controlContainerRadiusValue,
                    backdropFilter: `blur(${controlContainerBlurAmount}px)`,
                    WebkitBackdropFilter: `blur(${controlContainerBlurAmount}px)`,
                    backgroundColor: bgColorMap[controlContainerBgColor],
                    opacity: controlContainerBgOpacity / 100,
                    boxShadow: controlContainerShineBoxShadow,
                  }}
                />
                {/* Buttons - rendered in order based on controlButtonsReversed */}
                {controlButtonsReversed ? (
                  <>
                    {!isExpanded && onExpand && (
                      <ButtonUtility
                        icon={expandIconMap[expandButtonIcon]}
                        tooltip={showTooltips ? 'Expand' : undefined}
                        onClick={onExpand}
                        size={controlButtonSize}
                        color="tertiary"
                        className="relative z-10"
                        style={{ borderRadius: controlButtonRadiusValue }}
                      />
                    )}
                    {onClose && (
                      <ButtonUtility
                        icon={closeIconMap[closeButtonIcon]}
                        tooltip={showTooltips ? 'Minimize' : undefined}
                        onClick={onClose}
                        size={controlButtonSize}
                        color="tertiary"
                        className="relative z-10"
                        style={{ borderRadius: controlButtonRadiusValue }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {onClose && (
                      <ButtonUtility
                        icon={closeIconMap[closeButtonIcon]}
                        tooltip={showTooltips ? 'Minimize' : undefined}
                        onClick={onClose}
                        size={controlButtonSize}
                        color="tertiary"
                        className="relative z-10"
                        style={{ borderRadius: controlButtonRadiusValue }}
                      />
                    )}
                    {!isExpanded && onExpand && (
                      <ButtonUtility
                        icon={expandIconMap[expandButtonIcon]}
                        tooltip={showTooltips ? 'Expand' : undefined}
                        onClick={onExpand}
                        size={controlButtonSize}
                        color="tertiary"
                        className="relative z-10"
                        style={{ borderRadius: controlButtonRadiusValue }}
                      />
                    )}
                  </>
                )}
              </div>
            ) : (
              /* No container - just buttons */
              <div
                className="flex items-center"
                style={{ gap: `${controlButtonsGap}px` }}
              >
                {controlButtonsReversed ? (
                  <>
                    {!isExpanded && onExpand && (
                      <ButtonUtility
                        icon={expandIconMap[expandButtonIcon]}
                        tooltip={showTooltips ? 'Expand' : undefined}
                        onClick={onExpand}
                        size={controlButtonSize}
                        color="tertiary"
                        style={{ borderRadius: controlButtonRadiusValue }}
                      />
                    )}
                    {onClose && (
                      <ButtonUtility
                        icon={closeIconMap[closeButtonIcon]}
                        tooltip={showTooltips ? 'Minimize' : undefined}
                        onClick={onClose}
                        size={controlButtonSize}
                        color="tertiary"
                        style={{ borderRadius: controlButtonRadiusValue }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {onClose && (
                      <ButtonUtility
                        icon={closeIconMap[closeButtonIcon]}
                        tooltip={showTooltips ? 'Minimize' : undefined}
                        onClick={onClose}
                        size={controlButtonSize}
                        color="tertiary"
                        style={{ borderRadius: controlButtonRadiusValue }}
                      />
                    )}
                    {!isExpanded && onExpand && (
                      <ButtonUtility
                        icon={expandIconMap[expandButtonIcon]}
                        tooltip={showTooltips ? 'Expand' : undefined}
                        onClick={onExpand}
                        size={controlButtonSize}
                        color="tertiary"
                        style={{ borderRadius: controlButtonRadiusValue }}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
