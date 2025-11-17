'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Squircle } from '@/v2/components/ui/squircle'
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
import { cx } from '@/v2/utils/cx'
import { Search01Icon, CancelCircleIcon } from '@hugeicons-pro/core-stroke-rounded'

import { SEARCH_INPUT_SIZE_CONFIG, SEARCH_INPUT_COLOR_CONFIG, SEARCH_INPUT_DEFAULTS } from './config'
import type { SearchInputProps } from './types'

/**
 * SearchInput Component - Squircle-based search input with Huge Icons
 *
 * Built on Squircle + Huge Icons following Badge/Button pattern.
 * Integrates seamlessly with V2 semantic design tokens.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SearchInput
 *   placeholder="Search..."
 *   value={query}
 *   onChange={setQuery}
 * />
 *
 * // With label and hint
 * <SearchInput
 *   size="md"
 *   label="Search products"
 *   hint="Search by name, SKU, or category"
 *   value={query}
 *   onChange={setQuery}
 * />
 *
 * // Clearable with custom styling
 * <SearchInput
 *   clearable
 *   roundness={3}
 *   shadow="md"
 *   value={query}
 *   onChange={setQuery}
 *   onClear={() => setQuery('')}
 * />
 * ```
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  size = 'sm',
  placeholder = 'Search...',
  value = '',
  onChange,
  disabled = false,
  invalid = false,
  label,
  hint,
  roundness = SEARCH_INPUT_DEFAULTS.roundness,
  shadow = SEARCH_INPUT_DEFAULTS.shadow,
  backgroundColor,
  borderColor,
  className,
  ariaLabel,
  autoFocus = false,
  clearable = false,
  onClear,
  shortcut,
  fullWidth = false,
  onFocus,
  onBlur,
  onDimensionsChange,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sizeConfig = SEARCH_INPUT_SIZE_CONFIG[size]
  const colorConfig = SEARCH_INPUT_COLOR_CONFIG

  // Map shadow to Squircle's supported values (only none/xs/sm supported)
  const effectiveShadow: 'none' | 'xs' | 'sm' =
    shadow === 'md' || shadow === 'lg' || shadow === 'xl' || shadow === '2xl' ? 'sm' : shadow

  // Determine current state colors and border width (matches Untitled UI ring system)
  const currentColors = disabled
    ? colorConfig.disabled
    : invalid && isFocused
      ? { ...colorConfig.default, borderColor: colorConfig.invalidFocus.borderColor }
      : invalid
        ? { ...colorConfig.default, borderColor: colorConfig.invalid.borderColor }
        : isFocused
          ? { ...colorConfig.default, borderColor: colorConfig.focus.borderColor }
          : colorConfig.default

  const effectiveBackgroundColor = backgroundColor || currentColors.backgroundColor
  const effectiveBorderColor = borderColor || currentColors.borderColor

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange?.(e.target.value)
      }
    },
    [disabled, onChange]
  )

  const handleClear = useCallback(() => {
    if (!disabled && clearable) {
      onChange?.('')
      onClear?.()
      inputRef.current?.focus()
    }
  }, [disabled, clearable, onChange, onClear])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    onBlur?.()
  }, [onBlur])

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const showClearButton = clearable && value.length > 0 && !disabled

  return (
    <div className={cx('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-auto', className)}>
      {/* Label */}
      {label && (
        <label className={cx('text-sm font-medium', disabled ? 'text-disabled' : 'text-primary')}>
          {label}
        </label>
      )}

      {/* Input Container - 1px border always (no layout shift) */}
      <Squircle
        backgroundColor={effectiveBackgroundColor}
        borderColor={effectiveBorderColor}
        borderWidth={SEARCH_INPUT_DEFAULTS.borderWidth}
        roundness={roundness}
        shadow={effectiveShadow}
        customShadowLayer={effectiveShadow !== 'none'}
        shadowMethod="duplicate"
        performance="high"
        overflow="hidden"
        fadeInOnMount={true}
        fillMode={fullWidth}
        style={fullWidth ? { width: '100%' } : undefined}
        className={cx(
          'relative transition-all duration-100 ease-linear',
          disabled ? 'cursor-not-allowed' : 'cursor-text'
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
        onDimensionsChange={onDimensionsChange}
      >
        <div className="relative flex items-center">
          {/* Search Icon */}
          <span
            className="absolute pointer-events-none"
            style={{
              left: `${sizeConfig.iconLeft}px`,
              color: `var(--color-${currentColors.iconColor})`,
            }}
          >
            <HugeIcon icon={Search01Icon} size={sizeConfig.iconSize} strokeWidth={2} />
          </span>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={ariaLabel || placeholder}
            aria-invalid={invalid}
            className={cx(
              'w-full bg-transparent border-none outline-none font-medium',
              sizeConfig.textSize,
              disabled ? 'cursor-not-allowed' : ''
            )}
            style={{
              paddingLeft: `${sizeConfig.padding.left}px`,
              paddingRight: `${showClearButton ? sizeConfig.padding.left : shortcut ? 60 : sizeConfig.padding.right}px`,
              paddingTop: `${sizeConfig.padding.vertical}px`,
              paddingBottom: `${sizeConfig.padding.vertical}px`,
              color: `var(--color-${currentColors.textColor})`,
            }}
          />

          {/* Clear Button - no hover effect when disabled */}
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className={cx(
                'absolute right-3 p-0.5 rounded-full transition-colors',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-secondary'
              )}
              aria-label="Clear search"
              style={{
                color: `var(--color-${currentColors.iconColor})`,
              }}
              disabled={disabled}
            >
              <HugeIcon icon={CancelCircleIcon} size={sizeConfig.iconSize} strokeWidth={2} />
            </button>
          )}

          {/* Keyboard Shortcut - matches Untitled UI with gradient fade */}
          {shortcut && !showClearButton && (
            <div
              className={cx(
                'pointer-events-none absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-40% pl-8',
                size === 'sm' ? 'pr-2.5' : 'pr-3'
              )}
              style={{
                background: `linear-gradient(to right, transparent, var(--color-${currentColors.backgroundColor}) 40%)`,
              }}
            >
              <span
                className={cx(
                  'pointer-events-none rounded px-1 py-px text-xs font-medium ring-1 ring-inset select-none',
                  disabled ? 'text-disabled bg-transparent ring-disabled' : 'text-quaternary ring-secondary'
                )}
                aria-hidden="true"
              >
                {shortcut}
              </span>
            </div>
          )}
        </div>
      </Squircle>

      {/* Hint Text */}
      {hint && (
        <div
          className={cx(
            'text-xs',
            invalid && !disabled ? 'text-error-primary' : disabled ? 'text-disabled' : 'text-secondary'
          )}
        >
          {hint}
        </div>
      )}
    </div>
  )
}
