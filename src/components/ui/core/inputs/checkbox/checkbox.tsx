'use client'

import { forwardRef } from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { cn } from '@/lib/utils'

import type { CheckboxBaseProps, CheckboxProps } from './types'
import {
  boxCheckedStyles,
  boxCommonStyles,
  boxDisabledStyles,
  boxFocusStyles,
  boxSizeStyles,
  checkIconSizeStyles,
  hintTextSizeStyles,
  iconSizeStyles,
  indicatorCommonStyles,
  indicatorDisabledStyles,
  indicatorVisibleStyles,
  labelContainerSizeStyles,
  labelTextSizeStyles,
  textWrapperSizeStyles,
} from './config'

// ============================================================================
// ICONS
// ============================================================================

/**
 * Checkmark icon SVG
 */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <path
        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Indeterminate (minus) icon SVG
 */
function IndeterminateIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <path
        d="M2.91675 7H11.0834"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ============================================================================
// CHECKBOX BASE (Visual only)
// ============================================================================

/**
 * CheckboxBase - Visual checkbox box component (no interaction)
 *
 * Use this for custom implementations where you control the checked state externally.
 *
 * @example
 * ```tsx
 * <CheckboxBase checked={isSelected} size="md" />
 * ```
 */
export const CheckboxBase = forwardRef<HTMLDivElement, CheckboxBaseProps>(
  ({ size = 'sm', checked = false, indeterminate = false, disabled = false, className }, ref) => {
    const isActive = checked || indeterminate

    return (
      <div
        ref={ref}
        className={cn(
          boxCommonStyles,
          boxSizeStyles[size],
          isActive && boxCheckedStyles,
          disabled && boxDisabledStyles,
          className
        )}
      >
        {/* Indeterminate icon */}
        <IndeterminateIcon
          className={cn(
            indicatorCommonStyles,
            iconSizeStyles[size],
            indeterminate && indicatorVisibleStyles,
            disabled && indicatorDisabledStyles
          )}
        />

        {/* Check icon */}
        <CheckIcon
          className={cn(
            indicatorCommonStyles,
            checkIconSizeStyles[size],
            checked && !indeterminate && indicatorVisibleStyles,
            disabled && indicatorDisabledStyles
          )}
        />
      </div>
    )
  }
)

CheckboxBase.displayName = 'CheckboxBase'

// ============================================================================
// CHECKBOX (Interactive)
// ============================================================================

/**
 * Checkbox - Interactive checkbox component built on Base UI
 *
 * Supports checked, indeterminate, and disabled states with optional label and hint.
 *
 * @example
 * ```tsx
 * // Basic
 * <Checkbox label="Accept terms" />
 *
 * // Controlled
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} label="Option A" />
 *
 * // With hint
 * <Checkbox label="Notifications" hint="Receive email updates" size="md" />
 *
 * // Indeterminate (for partial selection)
 * <Checkbox indeterminate label="Select all" />
 * ```
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      size = 'sm',
      checked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      onCheckedChange,
      label,
      hint,
      name,
      value,
      required,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const hasLabel = label || hint

    return (
      <BaseCheckbox.Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        indeterminate={indeterminate}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        name={name}
        value={value}
        required={required}
        aria-label={ariaLabel}
        className={cn(
          'group flex items-start',
          disabled && 'cursor-not-allowed',
          labelContainerSizeStyles[size],
          className
        )}
      >
        {/* Checkbox box */}
        <span
          className={cn(
            boxCommonStyles,
            boxSizeStyles[size],
            // Checked/indeterminate states (using group-data selectors)
            'group-data-[checked]:bg-brand-solid group-data-[checked]:ring-brand-solid',
            'group-data-[indeterminate]:bg-brand-solid group-data-[indeterminate]:ring-brand-solid',
            // Disabled state
            'group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-disabled_subtle group-data-[disabled]:ring-disabled',
            // Focus state
            'group-data-[focus-visible]:outline-2 group-data-[focus-visible]:outline-offset-2 group-data-[focus-visible]:outline-focus-ring',
            hasLabel && 'mt-0.5'
          )}
        >
          {/* Indeterminate indicator */}
          <IndeterminateIcon
            className={cn(
              indicatorCommonStyles,
              iconSizeStyles[size],
              'group-data-[indeterminate]:opacity-100',
              'group-data-[disabled]:text-fg-disabled_subtle'
            )}
          />

          {/* Check indicator */}
          <CheckIcon
            className={cn(
              indicatorCommonStyles,
              checkIconSizeStyles[size],
              'group-data-[checked]:opacity-100',
              'group-data-[indeterminate]:opacity-0',
              'group-data-[disabled]:text-fg-disabled_subtle'
            )}
          />
        </span>

        {/* Label and hint */}
        {hasLabel && (
          <span className={cn('inline-flex flex-col', textWrapperSizeStyles[size])}>
            {label && (
              <span className={cn('text-secondary select-none', labelTextSizeStyles[size])}>
                {label}
              </span>
            )}
            {hint && (
              <span
                className={cn('text-tertiary', hintTextSizeStyles[size])}
                onClick={(e) => e.stopPropagation()}
              >
                {hint}
              </span>
            )}
          </span>
        )}
      </BaseCheckbox.Root>
    )
  }
)

Checkbox.displayName = 'Checkbox'
