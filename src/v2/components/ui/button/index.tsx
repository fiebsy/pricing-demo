'use client'

import React, { useState } from 'react'
import { Squircle, getColorValue } from '@/v2/components/ui/squircle'
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
import { cx } from '@/v2/utils/cx'

import { BUTTON_SIZE_CONFIG, BUTTON_HIERARCHY_CONFIG, BUTTON_COLOR_CONFIG, getButtonRoundness, getButtonShadow } from './config'
import type { ButtonProps, ButtonWithIconProps, ButtonIconOnlyProps } from './types'

/**
 * Squircle Button Component - Production-ready button with Hugeicons support
 *
 * Built on Squircle + Hugeicons with semantic design tokens and asymmetric padding.
 * Follows the exact pattern established by the Badge component.
 *
 * @example
 * ```tsx
 * // Direct children pattern (most flexible)
 * <Button size="md" hierarchy="primary" onClick={handleClick}>
 *   <HugeIcon icon={UserIcon} size={12} strokeWidth={2} />
 *   <span>Profile</span>
 * </Button>
 *
 * // Helper for icon + text
 * <Button.WithIcon size="md" hierarchy="primary" icon={UserIcon} onClick={handleClick}>
 *   Profile
 * </Button.WithIcon>
 *
 * // Icon only
 * <Button.Icon size="md" hierarchy="primary" icon={UserIcon} ariaLabel="Profile" onClick={handleClick} />
 * ```
 */
const ButtonComponent: React.FC<ButtonProps> = ({
  size = 'md',
  hierarchy = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className,
  ariaLabel,
  roundness,
  shadow,
  fadeInOnMount = true,
  onDimensionsChange,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeConfig = BUTTON_SIZE_CONFIG[size]
  const hierarchyConfig = BUTTON_HIERARCHY_CONFIG[hierarchy]
  const colorConfig = BUTTON_COLOR_CONFIG[hierarchy]

  const effectiveRoundness = getButtonRoundness(hierarchy, roundness)
  const effectiveShadow = getButtonShadow(hierarchy, shadow)

  // Analyze children to detect icons and calculate padding
  const childArray = React.Children.toArray(children)
  const hasIcon = childArray.some((child) => React.isValidElement(child) && child.type === HugeIcon)

  let iconPosition: 'left' | 'right' | 'none' = 'none'
  if (hasIcon) {
    // Check if first child is an icon
    const firstChild = childArray[0]
    if (React.isValidElement(firstChild) && firstChild.type === HugeIcon) {
      iconPosition = 'left'
    } else {
      iconPosition = 'right'
    }
  }

  // Calculate padding based on icon presence and position
  const paddingStyle = {
    paddingLeft: `${iconPosition === 'left' ? sizeConfig.padding.icon : iconPosition === 'right' ? sizeConfig.padding.text : sizeConfig.padding.text}px`,
    paddingRight: `${iconPosition === 'left' ? sizeConfig.padding.text : iconPosition === 'right' ? sizeConfig.padding.icon : sizeConfig.padding.text}px`,
    paddingTop: `${sizeConfig.padding.vertical}px`,
    paddingBottom: `${sizeConfig.padding.vertical}px`,
    gap: hasIcon ? `${sizeConfig.gap}px` : undefined,
  }

  // Determine icon color based on state
  const iconColor = disabled ? colorConfig.textDisabled : isHovered ? colorConfig.iconHover : colorConfig.iconColor

  // Wrap HugeIcon children in spans with muted color for visual hierarchy
  // (Same pattern as Badge component - HugeIcon uses currentColor inheritance)
  const styledChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === HugeIcon) {
      return (
        <span style={{ color: `var(--color-${iconColor})`, transition: 'color 100ms linear' }}>
          {child}
        </span>
      )
    }
    return child
  })

  // Determine state-based colors
  const backgroundColor = disabled
    ? colorConfig.backgroundDisabled
    : isHovered
      ? colorConfig.backgroundHover
      : colorConfig.backgroundColor

  const borderColor = disabled ? colorConfig.borderColor : isHovered ? colorConfig.borderHover : colorConfig.borderColor

  const textColor = disabled ? colorConfig.textDisabled : isHovered ? colorConfig.textHover : colorConfig.textColor

  // Loading spinner component
  const Spinner = () => (
    <svg
      fill="none"
      viewBox="0 0 20 20"
      className="animate-spin"
      style={{ width: `${sizeConfig.iconSize}px`, height: `${sizeConfig.iconSize}px` }}
    >
      <circle className="stroke-current opacity-30" cx="10" cy="10" r="8" fill="none" strokeWidth="2" />
      <circle
        className="stroke-current"
        cx="10"
        cy="10"
        r="8"
        fill="none"
        strokeWidth="2"
        strokeDasharray="12.5 50"
        strokeLinecap="round"
      />
    </svg>
  )

  // Link variants don't use Squircle
  if (!hierarchyConfig.useSquircle) {
    return (
      <button
        type={type}
        disabled={disabled || loading}
        onClick={!disabled && !loading ? onClick : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={ariaLabel}
        className={cx(
          'inline-flex items-center font-semibold transition-colors duration-100 ease-linear',
          'focus-visible:outline focus-visible:outline-2 outline-offset-2',
          sizeConfig.textSize,
          disabled && 'cursor-not-allowed opacity-50',
          loading && 'cursor-wait',
          fullWidth && 'w-full justify-center',
          className
        )}
        style={{
          color: getColorValue(textColor),
          textDecoration: isHovered ? 'underline' : 'none',
          textUnderlineOffset: '2px',
          ...paddingStyle,
        }}
      >
        {loading ? <Spinner /> : styledChildren}
      </button>
    )
  }

  // Squircle button
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={!disabled && !loading ? onClick : undefined}
      aria-label={ariaLabel}
      className={cx(
        'inline-flex transition-all duration-100 ease-linear',
        'focus-visible:outline focus-visible:outline-2 outline-offset-2',
        disabled && 'cursor-not-allowed opacity-50',
        loading && 'cursor-wait',
        !disabled && !loading && 'cursor-pointer',
        fullWidth && 'w-full',
        className
      )}
      style={{
        outlineColor: getColorValue(colorConfig.focusRing),
      }}
    >
      <div
        onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={fullWidth ? 'w-full' : undefined}
      >
        <Squircle
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          borderWidth={hierarchyConfig.borderWidth}
          roundness={effectiveRoundness}
          shadow={effectiveShadow}
          customShadowLayer={effectiveShadow !== 'none'}
          shadowMethod="duplicate"
          performance="high"
          overflow="hidden"
          fadeInOnMount={fadeInOnMount}
          className={cx('inline-block', fullWidth && 'w-full')}
          onDimensionsChange={onDimensionsChange}
        >
          <div
            className={cx('flex items-center font-semibold whitespace-nowrap', sizeConfig.textSize, fullWidth && 'justify-center')}
            style={{
              ...paddingStyle,
              color: getColorValue(textColor),
              transition: 'color 100ms linear',
            }}
          >
            {loading ? <Spinner /> : styledChildren}
          </div>
        </Squircle>
      </div>
    </button>
  )
}

/**
 * Button with icon helper component
 * Simplifies icon + text pattern
 */
const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  size = 'md',
  hierarchy = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'leading',
  iconSize,
  iconStrokeWidth = 2,
  children,
  onClick,
  type = 'button',
  className,
  ariaLabel,
  roundness,
  shadow,
  fadeInOnMount = true,
  onDimensionsChange,
}) => {
  const sizeConfig = BUTTON_SIZE_CONFIG[size]
  const effectiveIconSize = iconSize || sizeConfig.iconSize

  return (
    <ButtonComponent
      size={size}
      hierarchy={hierarchy}
      disabled={disabled}
      loading={loading}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      className={className}
      ariaLabel={ariaLabel}
      roundness={roundness}
      shadow={shadow}
      fadeInOnMount={fadeInOnMount}
      onDimensionsChange={onDimensionsChange}
    >
      {iconPosition === 'leading' && <HugeIcon icon={icon} size={effectiveIconSize} strokeWidth={iconStrokeWidth} />}
      <span>{children}</span>
      {iconPosition === 'trailing' && <HugeIcon icon={icon} size={effectiveIconSize} strokeWidth={iconStrokeWidth} />}
    </ButtonComponent>
  )
}

/**
 * Icon-only button component
 */
const ButtonIcon: React.FC<ButtonIconOnlyProps> = ({
  size = 'md',
  hierarchy = 'primary',
  disabled = false,
  loading = false,
  icon,
  iconSize,
  iconStrokeWidth = 2,
  onClick,
  type = 'button',
  className,
  ariaLabel,
  roundness,
  shadow,
  fadeInOnMount = true,
  onDimensionsChange,
}) => {
  const sizeConfig = BUTTON_SIZE_CONFIG[size]
  const hierarchyConfig = BUTTON_HIERARCHY_CONFIG[hierarchy]
  const colorConfig = BUTTON_COLOR_CONFIG[hierarchy]

  const effectiveRoundness = getButtonRoundness(hierarchy, roundness)
  const effectiveShadow = getButtonShadow(hierarchy, shadow)
  const effectiveIconSize = iconSize || sizeConfig.iconSize

  // Icon-only buttons use equal padding on all sides
  const padding = sizeConfig.padding.icon

  const [isHovered, setIsHovered] = useState(false)

  const backgroundColor = disabled
    ? colorConfig.backgroundDisabled
    : isHovered
      ? colorConfig.backgroundHover
      : colorConfig.backgroundColor

  const borderColor = disabled ? colorConfig.borderColor : isHovered ? colorConfig.borderHover : colorConfig.borderColor

  const iconColorResolved = disabled ? colorConfig.textDisabled : isHovered ? colorConfig.iconHover : colorConfig.iconColor

  // Loading spinner component
  const Spinner = () => (
    <svg
      fill="none"
      viewBox="0 0 20 20"
      className="animate-spin"
      style={{ width: `${effectiveIconSize}px`, height: `${effectiveIconSize}px` }}
    >
      <circle className="stroke-current opacity-30" cx="10" cy="10" r="8" fill="none" strokeWidth="2" />
      <circle
        className="stroke-current"
        cx="10"
        cy="10"
        r="8"
        fill="none"
        strokeWidth="2"
        strokeDasharray="12.5 50"
        strokeLinecap="round"
      />
    </svg>
  )

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={!disabled && !loading ? onClick : undefined}
      aria-label={ariaLabel}
      className={cx(
        'inline-flex transition-all duration-100 ease-linear',
        'focus-visible:outline focus-visible:outline-2 outline-offset-2',
        disabled && 'cursor-not-allowed opacity-50',
        loading && 'cursor-wait',
        !disabled && !loading && 'cursor-pointer',
        className
      )}
      style={{
        outlineColor: getColorValue(colorConfig.focusRing),
      }}
    >
      <div
        onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Squircle
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          borderWidth={hierarchyConfig.borderWidth}
          roundness={effectiveRoundness}
          shadow={effectiveShadow}
          customShadowLayer={effectiveShadow !== 'none'}
          shadowMethod="duplicate"
          performance="high"
          overflow="hidden"
          fadeInOnMount={fadeInOnMount}
          className="inline-block"
          onDimensionsChange={onDimensionsChange}
        >
          <div
            className="flex items-center justify-center"
            style={{
              padding: `${padding}px`,
              color: `var(--color-${iconColorResolved})`, // Icon-only uses icon color
              transition: 'color 100ms linear',
            }}
          >
            {loading ? <Spinner /> : <HugeIcon icon={icon} size={effectiveIconSize} strokeWidth={iconStrokeWidth} />}
          </div>
        </Squircle>
      </div>
    </button>
  )
}

// Combine all Button variants into a single export with proper typing
export const Button = Object.assign(ButtonComponent, {
  WithIcon: ButtonWithIcon,
  Icon: ButtonIcon,
}) as React.FC<ButtonProps> & {
  WithIcon: React.FC<ButtonWithIconProps>
  Icon: React.FC<ButtonIconOnlyProps>
}
