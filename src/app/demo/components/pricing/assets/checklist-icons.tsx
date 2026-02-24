/**
 * Checklist Icons
 *
 * Inline SVG icons with weight variants (stroke/solid/duotone).
 */

import type { SVGProps } from 'react'

/** Icon weight variants */
export type IconWeight = 'stroke' | 'solid' | 'duotone'

/** Available icon types for checklist */
export type IconType = 'checkmark' | 'sparkles' | 'circle' | 'star' | 'none'

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// ============================================================================
// Checkmark Icons
// ============================================================================

function CheckmarkStroke({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckmarkSolid({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="8" cy="8" r="6.5" fill="currentColor" />
      <path
        d="M5 8L7 10L11 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckmarkDuotone({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="8" cy="8" r="6.5" fill="currentColor" fillOpacity="0.2" />
      <path
        d="M5 8L7 10L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ============================================================================
// Sparkles Icons
// ============================================================================

function SparklesStroke({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Main star */}
      <path
        d="M8 2L9 5.5L12.5 6.5L9 7.5L8 11L7 7.5L3.5 6.5L7 5.5L8 2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small sparkle top-right */}
      <path
        d="M12 3L12.5 4.5L14 5L12.5 5.5L12 7"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small sparkle bottom-right */}
      <path
        d="M11.5 10L12 11L13 11.5L12 12L11.5 13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SparklesSolid({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Main star */}
      <path
        d="M8 1.5L9.2 5.8L13.5 7L9.2 8.2L8 12.5L6.8 8.2L2.5 7L6.8 5.8L8 1.5Z"
        fill="currentColor"
      />
      {/* Small sparkle top-right */}
      <path
        d="M12.5 2L13 3.5L14.5 4L13 4.5L12.5 6L12 4.5L10.5 4L12 3.5L12.5 2Z"
        fill="currentColor"
      />
      {/* Small sparkle bottom-right */}
      <path
        d="M12 11L12.4 12.2L13.6 12.6L12.4 13L12 14.2L11.6 13L10.4 12.6L11.6 12.2L12 11Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SparklesDuotone({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Main star - full opacity */}
      <path
        d="M8 1.5L9.2 5.8L13.5 7L9.2 8.2L8 12.5L6.8 8.2L2.5 7L6.8 5.8L8 1.5Z"
        fill="currentColor"
      />
      {/* Small sparkles - reduced opacity */}
      <path
        d="M12.5 2L13 3.5L14.5 4L13 4.5L12.5 6L12 4.5L10.5 4L12 3.5L12.5 2Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path
        d="M12 11L12.4 12.2L13.6 12.6L12.4 13L12 14.2L11.6 13L10.4 12.6L11.6 12.2L12 11Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  )
}

// ============================================================================
// Circle (Dot) Icons
// ============================================================================

function CircleStroke({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle
        cx="8"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function CircleSolid({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="8" cy="8" r="4" fill="currentColor" />
    </svg>
  )
}

function CircleDuotone({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="8" cy="8" r="5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="8" cy="8" r="2.5" fill="currentColor" />
    </svg>
  )
}

// ============================================================================
// Star Icons
// ============================================================================

function StarStroke({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8 2L9.5 6H13.5L10.5 8.5L11.5 12.5L8 10L4.5 12.5L5.5 8.5L2.5 6H6.5L8 2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarSolid({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8 1.5L9.8 5.9H14.5L10.7 8.7L12.2 13.5L8 10.5L3.8 13.5L5.3 8.7L1.5 5.9H6.2L8 1.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function StarDuotone({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8 1.5L9.8 5.9H14.5L10.7 8.7L12.2 13.5L8 10.5L3.8 13.5L5.3 8.7L1.5 5.9H6.2L8 1.5Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M8 2L9.5 6H13.5L10.5 8.5L11.5 12.5L8 10L4.5 12.5L5.5 8.5L2.5 6H6.5L8 2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ============================================================================
// Icon Lookup Maps
// ============================================================================

const ICON_COMPONENTS = {
  checkmark: {
    stroke: CheckmarkStroke,
    solid: CheckmarkSolid,
    duotone: CheckmarkDuotone,
  },
  sparkles: {
    stroke: SparklesStroke,
    solid: SparklesSolid,
    duotone: SparklesDuotone,
  },
  circle: {
    stroke: CircleStroke,
    solid: CircleSolid,
    duotone: CircleDuotone,
  },
  star: {
    stroke: StarStroke,
    solid: StarSolid,
    duotone: StarDuotone,
  },
} as const

// ============================================================================
// Main Icon Component
// ============================================================================

interface ChecklistIconProps extends IconProps {
  name: Exclude<IconType, 'none'>
  weight: IconWeight
}

/**
 * Renders a checklist icon with the specified weight variant.
 */
export function ChecklistIcon({ name, weight, ...props }: ChecklistIconProps) {
  const IconComponent = ICON_COMPONENTS[name][weight]
  return <IconComponent {...props} />
}

// ============================================================================
// Size Mapping
// ============================================================================

export const ICON_SIZE_MAP = {
  sm: 14,
  base: 16,
  lg: 20,
} as const
