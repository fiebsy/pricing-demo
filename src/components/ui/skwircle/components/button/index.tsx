/**
 * Button Component
 *
 * A high-level button component built on Skwircle primitive.
 * Provides compound components for common button patterns.
 *
 * @example Basic
 * ```tsx
 * <Button hierarchy="primary">Click me</Button>
 * ```
 *
 * @example With Icon
 * ```tsx
 * <Button.WithIcon icon={HomeIcon} hierarchy="primary">Home</Button.WithIcon>
 * ```
 *
 * @example Icon Only
 * ```tsx
 * <Button.Icon icon={SettingsIcon} ariaLabel="Settings" />
 * ```
 */

'use client'

import * as React from 'react'
import { Skwircle } from '../../'
import {
  getButtonSizeConfig,
  getButtonIntentConfig,
  getButtonPaddingStyle,
  getButtonIconStyle,
  type ButtonSize,
  type ButtonIntent,
} from '../../config/button'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'

// =============================================================================
// TYPES
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HugeIconType = any

type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary' | 'link-gray'

interface ButtonBaseProps {
  children?: React.ReactNode
  hierarchy?: ButtonHierarchy
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  className?: string
}

interface ButtonWithIconProps extends ButtonBaseProps {
  icon: HugeIconType
}

interface ButtonIconOnlyProps extends Omit<ButtonBaseProps, 'children'> {
  icon: HugeIconType
  ariaLabel: string
}

// =============================================================================
// HIERARCHY TO INTENT MAPPING
// =============================================================================

const HIERARCHY_TO_INTENT: Record<ButtonHierarchy, ButtonIntent> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'ghost',
  'link-gray': 'ghost',
}

const HIERARCHY_TEXT_COLORS: Record<ButtonHierarchy, string> = {
  primary: 'text-primary_on-brand',
  secondary: 'text-primary',
  tertiary: 'text-tertiary',
  'link-gray': 'text-tertiary',
}

// =============================================================================
// LOADING SPINNER
// =============================================================================

const LoadingSpinner: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg
    className={`animate-spin ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

// =============================================================================
// BASE BUTTON
// =============================================================================

const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  hierarchy = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) => {
  const intent = HIERARCHY_TO_INTENT[hierarchy]
  const sizeConfig = getButtonSizeConfig(size)
  const paddingStyle = getButtonPaddingStyle(size, false, false)
  const textColorClass = HIERARCHY_TEXT_COLORS[hierarchy]

  const isLinkStyle = hierarchy === 'link-gray'
  const isDisabled = disabled || loading

  return (
    <Skwircle
      variant="button"
      intent={intent}
      disabled={isDisabled}
      onClick={onClick}
      borderWidth={isLinkStyle ? 0 : 1}
      elevation={isLinkStyle ? 'none' : undefined}
      className={`cursor-pointer select-none ${className}`}
    >
      <span
        className={`flex items-center justify-center font-medium ${sizeConfig.textClass} ${textColorClass}`}
        style={paddingStyle}
      >
        {loading ? (
          <>
            <LoadingSpinner size={sizeConfig.iconSize} className="mr-2" />
            {children}
          </>
        ) : (
          children
        )}
      </span>
    </Skwircle>
  )
}

// =============================================================================
// BUTTON WITH ICON
// =============================================================================

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  children,
  icon,
  hierarchy = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) => {
  const intent = HIERARCHY_TO_INTENT[hierarchy]
  const sizeConfig = getButtonSizeConfig(size)
  const paddingStyle = getButtonPaddingStyle(size, false, true)
  const iconStyleConfig = getButtonIconStyle(intent)
  const textColorClass = HIERARCHY_TEXT_COLORS[hierarchy]

  const isLinkStyle = hierarchy === 'link-gray'
  const isDisabled = disabled || loading

  return (
    <Skwircle
      variant="button"
      intent={intent}
      disabled={isDisabled}
      onClick={onClick}
      borderWidth={isLinkStyle ? 0 : 1}
      elevation={isLinkStyle ? 'none' : undefined}
      className={`cursor-pointer select-none ${className}`}
    >
      <span
        className={`flex items-center justify-center font-medium ${sizeConfig.textClass} ${textColorClass}`}
        style={paddingStyle}
      >
        {loading ? (
          <LoadingSpinner size={sizeConfig.iconSize} />
        ) : (
          <span className={iconStyleConfig.className} style={iconStyleConfig.style}>
            <HugeIcon
              icon={icon}
              size={sizeConfig.iconSize}
              strokeWidth={sizeConfig.iconStroke}
            />
          </span>
        )}
        <span>{children}</span>
      </span>
    </Skwircle>
  )
}

// =============================================================================
// BUTTON ICON ONLY
// =============================================================================

const ButtonIconOnly: React.FC<ButtonIconOnlyProps> = ({
  icon,
  ariaLabel,
  hierarchy = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) => {
  const intent = HIERARCHY_TO_INTENT[hierarchy]
  const sizeConfig = getButtonSizeConfig(size)
  const paddingStyle = getButtonPaddingStyle(size, true, false)
  const iconStyleConfig = getButtonIconStyle(intent)
  const textColorClass = HIERARCHY_TEXT_COLORS[hierarchy]

  const isLinkStyle = hierarchy === 'link-gray'
  const isDisabled = disabled || loading

  return (
    <Skwircle
      variant="button"
      intent={intent}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      borderWidth={isLinkStyle ? 0 : 1}
      elevation={isLinkStyle ? 'none' : undefined}
      className={`cursor-pointer select-none ${className}`}
    >
      <span
        className={`flex items-center justify-center ${textColorClass} ${iconStyleConfig.className}`}
        style={{ ...paddingStyle, ...iconStyleConfig.style }}
      >
        {loading ? (
          <LoadingSpinner size={sizeConfig.iconSize} />
        ) : (
          <HugeIcon
            icon={icon}
            size={sizeConfig.iconSize}
            strokeWidth={sizeConfig.iconStroke}
          />
        )}
      </span>
    </Skwircle>
  )
}

// =============================================================================
// COMPOUND COMPONENT
// =============================================================================

interface ButtonComponent extends React.FC<ButtonBaseProps> {
  WithIcon: typeof ButtonWithIcon
  Icon: typeof ButtonIconOnly
}

export const Button = ButtonBase as ButtonComponent
Button.WithIcon = ButtonWithIcon
Button.Icon = ButtonIconOnly
