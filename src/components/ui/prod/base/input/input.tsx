'use client'

import { forwardRef, useState, useId } from 'react'
import { Field } from '@base-ui/react/field'
import { Input as BaseInput } from '@base-ui/react/input'
import HelpCircleIcon from '@hugeicons-pro/core-stroke-rounded/HelpCircleIcon'
import InformationCircleIcon from '@hugeicons-pro/core-stroke-rounded/InformationCircleIcon'
import { cn } from '@/lib/utils'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Tooltip } from '@/components/ui/prod/base/tooltip'

import type { InputBaseProps, InputProps, InputGroupProps, InputPrefixProps } from './types'
import {
  wrapperCommonStyles,
  wrapperFocusStyles,
  wrapperDisabledStyles,
  wrapperInvalidStyles,
  wrapperInvalidFocusStyles,
  inputCommonStyles,
  inputDisabledStyles,
  inputPaddingStyles,
  inputPaddingWithTrailingStyles,
  inputPaddingWithLeadingStyles,
  leadingIconPositionStyles,
  trailingIconPositionStyles,
  iconCommonStyles,
  iconDisabledStyles,
  tooltipTriggerStyles,
  invalidIconStyles,
  shortcutContainerStyles,
  shortcutBadgeStyles,
  shortcutDisabledStyles,
  shortcutPaddingStyles,
  prefixCommonStyles,
  prefixPaddingStyles,
  prefixDisabledStyles,
  inputGroupContainerStyles,
  inputGroupWrapperLeadingStyles,
  inputGroupWrapperTrailingStyles,
} from './config'
import { Label } from './label'
import { HintText } from './hint-text'

// ============================================================================
// INPUT BASE (Visual input with wrapper)
// ============================================================================

/**
 * InputBase - Styled input wrapper with icon and tooltip support
 *
 * Use this for custom implementations where you need more control.
 *
 * @example
 * ```tsx
 * <InputBase placeholder="Enter text..." />
 * <InputBase icon={SearchIcon} placeholder="Search..." />
 * <InputBase tooltip="Helper information" />
 * ```
 */
export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      size = 'sm',
      disabled = false,
      isInvalid = false,
      placeholder,
      icon,
      tooltip,
      shortcut,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      type = 'text',
      name,
      required,
      id,
      autoComplete,
      autoFocus,
      maxLength,
      minLength,
      pattern,
      readOnly,
      wrapperClassName,
      inputClassName,
      iconClassName,
      tooltipClassName,
      className,
      groupRef,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const hasTrailingIcon = tooltip || isInvalid
    const hasLeadingIcon = icon != null

    const handleFocus = () => {
      setIsFocused(true)
      onFocus?.()
    }

    const handleBlur = () => {
      setIsFocused(false)
      onBlur?.()
    }

    return (
      <div
        ref={groupRef}
        className={cn(
          wrapperCommonStyles,
          // Focus state
          isFocused && !disabled && wrapperFocusStyles,
          // Disabled state
          disabled && wrapperDisabledStyles,
          // Invalid state
          isInvalid && wrapperInvalidStyles,
          // Invalid + focused state
          isInvalid && isFocused && wrapperInvalidFocusStyles,
          wrapperClassName,
          className
        )}
      >
        {/* Leading icon */}
        {icon != null && (
          <HugeIcon
            icon={icon}
            size={20}
            className={cn(
              iconCommonStyles,
              leadingIconPositionStyles[size],
              disabled && iconDisabledStyles,
              iconClassName
            )}
          />
        )}

        {/* Input field */}
        <BaseInput
          ref={ref}
          type={type}
          name={name}
          id={id}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          readOnly={readOnly}
          onValueChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            inputCommonStyles,
            inputPaddingStyles[size],
            hasTrailingIcon && inputPaddingWithTrailingStyles[size],
            hasLeadingIcon && inputPaddingWithLeadingStyles[size],
            disabled && inputDisabledStyles,
            inputClassName
          )}
          {...props}
        />

        {/* Tooltip help icon */}
        {tooltip && !isInvalid && (
          <Tooltip title={tooltip} side="top">
            <span
              className={cn(
                tooltipTriggerStyles,
                trailingIconPositionStyles[size],
                tooltipClassName
              )}
            >
              <HugeIcon icon={HelpCircleIcon} size={16} className="text-fg-quaternary" />
            </span>
          </Tooltip>
        )}

        {/* Invalid icon */}
        {isInvalid && (
          <HugeIcon
            icon={InformationCircleIcon}
            size={16}
            className={cn(
              invalidIconStyles,
              trailingIconPositionStyles[size],
              tooltipClassName
            )}
          />
        )}

        {/* Shortcut badge */}
        {shortcut && (
          <div className={cn(shortcutContainerStyles, shortcutPaddingStyles[size])}>
            <span
              className={cn(
                shortcutBadgeStyles,
                disabled && shortcutDisabledStyles
              )}
              aria-hidden="true"
            >
              {typeof shortcut === 'string' ? shortcut : '⌘K'}
            </span>
          </div>
        )}
      </div>
    )
  }
)

InputBase.displayName = 'InputBase'

// ============================================================================
// INPUT (With label and hint)
// ============================================================================

/**
 * Input - Complete input field with label and hint support
 *
 * Built on Base UI Field and Input primitives.
 *
 * @example
 * ```tsx
 * <Input label="Email" placeholder="you@example.com" />
 * <Input label="Password" type="password" hint="At least 8 characters" />
 * <Input label="Name" isInvalid hint="This field is required" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      hideRequiredIndicator,
      size = 'sm',
      disabled = false,
      isInvalid = false,
      required,
      className,
      ...inputProps
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = inputProps.id || generatedId

    return (
      <Field.Root
        disabled={disabled}
        invalid={isInvalid}
        className={cn('flex w-full flex-col items-start gap-1.5', className)}
      >
        {label && (
          <Label
            isRequired={hideRequiredIndicator ? false : required}
            htmlFor={inputId}
          >
            {label}
          </Label>
        )}

        <InputBase
          ref={ref}
          id={inputId}
          size={size}
          disabled={disabled}
          isInvalid={isInvalid}
          required={required}
          {...inputProps}
        />

        {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
      </Field.Root>
    )
  }
)

Input.displayName = 'Input'

// ============================================================================
// INPUT PREFIX
// ============================================================================

/**
 * InputPrefix - Prefix addon for InputGroup
 *
 * @example
 * ```tsx
 * <InputGroup leadingAddon={<InputPrefix>https://</InputPrefix>}>
 *   <InputBase placeholder="example.com" />
 * </InputGroup>
 * ```
 */
export const InputPrefix = forwardRef<HTMLSpanElement, InputPrefixProps>(
  ({ children, size = 'sm', position = 'leading', isDisabled, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          prefixCommonStyles,
          prefixPaddingStyles[size],
          // Position-based corner rounding
          position === 'leading' && 'rounded-l-xl -mr-px',
          position === 'trailing' && 'rounded-r-xl -ml-px',
          isDisabled && prefixDisabledStyles,
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

InputPrefix.displayName = 'InputPrefix'

// ============================================================================
// INPUT GROUP
// ============================================================================

/**
 * InputGroup - Group input with leading/trailing addons
 *
 * @example
 * ```tsx
 * <InputGroup
 *   label="Website"
 *   leadingAddon={<InputPrefix>https://</InputPrefix>}
 * >
 *   <InputBase placeholder="example.com" />
 * </InputGroup>
 * ```
 */
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      size = 'sm',
      prefix,
      leadingAddon,
      trailingAddon,
      disabled = false,
      isInvalid = false,
      isRequired,
      label,
      hint,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const hasLeading = !!leadingAddon || !!prefix
    const hasTrailing = !!trailingAddon

    return (
      <Field.Root
        disabled={disabled}
        invalid={isInvalid}
        className={cn('flex w-full flex-col items-start gap-1.5', className)}
      >
        {label && <Label isRequired={isRequired}>{label}</Label>}

        <div
          ref={ref}
          data-input-size={size}
          className={cn(
            inputGroupContainerStyles,
            disabled && 'cursor-not-allowed'
          )}
          {...props}
        >
          {/* Leading addon */}
          {leadingAddon && (
            <section data-leading>
              {leadingAddon}
            </section>
          )}

          {/* Prefix text (inside input area) */}
          {prefix && (
            <span
              className={cn(
                prefixCommonStyles,
                prefixPaddingStyles[size],
                'rounded-l-xl -mr-px',
                disabled && prefixDisabledStyles
              )}
            >
              {prefix}
            </span>
          )}

          {/* Input wrapper - adjust corners based on addons */}
          <div
            className={cn(
              'z-10 flex-1',
              hasLeading && inputGroupWrapperLeadingStyles,
              hasTrailing && inputGroupWrapperTrailingStyles,
              // Style children wrappers
              hasLeading && '[&>div]:rounded-l-none',
              hasTrailing && '[&>div]:rounded-r-none'
            )}
          >
            {children}
          </div>

          {/* Trailing addon */}
          {trailingAddon && (
            <section data-trailing>
              {trailingAddon}
            </section>
          )}
        </div>

        {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
      </Field.Root>
    )
  }
)

InputGroup.displayName = 'InputGroup'
