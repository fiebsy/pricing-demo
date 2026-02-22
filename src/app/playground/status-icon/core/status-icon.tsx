/**
 * Status Icon Component
 *
 * Circular indicator with configurable stroke, pie fill or icon interior,
 * and companion text. Used to represent order states.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/status-icon
 */

'use client'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import type { StatusIconConfig } from '../config/types'

// Stroke icon imports
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Alert02Icon from '@hugeicons-pro/core-stroke-rounded/Alert02Icon'
import Remove01Icon from '@hugeicons-pro/core-stroke-rounded/Remove01Icon'
import AlertDiamondIcon from '@hugeicons-pro/core-stroke-rounded/AlertDiamondIcon'
import InformationCircleIcon from '@hugeicons-pro/core-stroke-rounded/InformationCircleIcon'
import Clock01Icon from '@hugeicons-pro/core-stroke-rounded/Clock01Icon'
import DollarCircleIcon from '@hugeicons-pro/core-stroke-rounded/DollarCircleIcon'

// Bulk icon imports
import Tick01BulkIcon from '@hugeicons-pro/core-bulk-rounded/Tick01Icon'
import Cancel01BulkIcon from '@hugeicons-pro/core-bulk-rounded/Cancel01Icon'
import Alert02BulkIcon from '@hugeicons-pro/core-bulk-rounded/Alert02Icon'
import Remove01BulkIcon from '@hugeicons-pro/core-bulk-rounded/Remove01Icon'
import AlertDiamondBulkIcon from '@hugeicons-pro/core-bulk-rounded/AlertDiamondIcon'
import InformationCircleBulkIcon from '@hugeicons-pro/core-bulk-rounded/InformationCircleIcon'
import Clock01BulkIcon from '@hugeicons-pro/core-bulk-rounded/Clock01Icon'
import DollarCircleBulkIcon from '@hugeicons-pro/core-bulk-rounded/DollarCircleIcon'

// Solid icon imports
import Tick01SolidIcon from '@hugeicons-pro/core-solid-rounded/Tick01Icon'
import Cancel01SolidIcon from '@hugeicons-pro/core-solid-rounded/Cancel01Icon'
import Alert02SolidIcon from '@hugeicons-pro/core-solid-rounded/Alert02Icon'
import Remove01SolidIcon from '@hugeicons-pro/core-solid-rounded/Remove01Icon'
import AlertDiamondSolidIcon from '@hugeicons-pro/core-solid-rounded/AlertDiamondIcon'
import InformationCircleSolidIcon from '@hugeicons-pro/core-solid-rounded/InformationCircleIcon'
import Clock01SolidIcon from '@hugeicons-pro/core-solid-rounded/Clock01Icon'
import DollarCircleSolidIcon from '@hugeicons-pro/core-solid-rounded/DollarCircleIcon'

// Custom icons
import { ClawbackIcon, ClawbackSolidIcon } from '@/components/ui/core/primitives/custom-icons'

// ============================================================================
// Icon Maps by Variant
// ============================================================================

const STROKE_ICON_MAP: Record<string, unknown> = {
  Tick01: Tick01Icon,
  Cancel01: Cancel01Icon,
  Alert02: Alert02Icon,
  Remove01: Remove01Icon,
  AlertDiamond: AlertDiamondIcon,
  InformationCircle: InformationCircleIcon,
  Clock01: Clock01Icon,
  DollarCircle: DollarCircleIcon,
}

const BULK_ICON_MAP: Record<string, unknown> = {
  Tick01: Tick01BulkIcon,
  Cancel01: Cancel01BulkIcon,
  Alert02: Alert02BulkIcon,
  Remove01: Remove01BulkIcon,
  AlertDiamond: AlertDiamondBulkIcon,
  InformationCircle: InformationCircleBulkIcon,
  Clock01: Clock01BulkIcon,
  DollarCircle: DollarCircleBulkIcon,
}

const SOLID_ICON_MAP: Record<string, unknown> = {
  Tick01: Tick01SolidIcon,
  Cancel01: Cancel01SolidIcon,
  Alert02: Alert02SolidIcon,
  Remove01: Remove01SolidIcon,
  AlertDiamond: AlertDiamondSolidIcon,
  InformationCircle: InformationCircleSolidIcon,
  Clock01: Clock01SolidIcon,
  DollarCircle: DollarCircleSolidIcon,
}

// Custom icons (always solid style)
const CUSTOM_ICON_MAP: Record<string, unknown> = {
  ClawbackSolid: ClawbackSolidIcon,
  Clawback: ClawbackIcon,
}

// Custom icons that render directly (not via HugeIcon wrapper)
const CUSTOM_ICONS = new Set(['ClawbackSolid', 'Clawback'])

function getIconForVariant(iconName: string, variant: 'stroke' | 'bulk' | 'solid'): unknown {
  // Custom icons don't have variants
  if (CUSTOM_ICONS.has(iconName)) {
    return CUSTOM_ICON_MAP[iconName]
  }

  switch (variant) {
    case 'bulk':
      return BULK_ICON_MAP[iconName]
    case 'solid':
      return SOLID_ICON_MAP[iconName]
    case 'stroke':
    default:
      return STROKE_ICON_MAP[iconName]
  }
}

// ============================================================================
// Color Token Resolution
// ============================================================================

// Semantic design tokens that communicate intent
const COLOR_MAP: Record<string, string> = {
  // Foreground tokens (strokes, icons)
  'fg-primary': 'var(--color-fg-primary)',
  'fg-secondary': 'var(--color-fg-secondary)',
  'fg-tertiary': 'var(--color-fg-tertiary)',
  'fg-quaternary': 'var(--color-fg-quaternary)',
  'fg-disabled': 'var(--color-fg-disabled)',
  'fg-white': 'var(--color-fg-white)',
  'fg-brand-primary': 'var(--color-fg-brand-primary)',
  'fg-brand-secondary': 'var(--color-fg-brand-secondary)',
  'fg-success-primary': 'var(--color-fg-success-primary)',
  'fg-success-secondary': 'var(--color-fg-success-secondary)',
  'fg-warning-primary': 'var(--color-fg-warning-primary)',
  'fg-warning-secondary': 'var(--color-fg-warning-secondary)',
  'fg-error-primary': 'var(--color-fg-error-primary)',
  'fg-error-secondary': 'var(--color-fg-error-secondary)',

  // Background tokens (fills)
  'bg-primary': 'var(--color-bg-primary)',
  'bg-secondary': 'var(--color-bg-secondary)',
  'bg-tertiary': 'var(--color-bg-tertiary)',
  'bg-quaternary': 'var(--color-bg-quaternary)',
  'bg-brand-primary': 'var(--color-bg-brand-primary)',
  'bg-brand-secondary': 'var(--color-bg-brand-secondary)',
  'bg-brand-solid': 'var(--color-bg-brand-solid)',
  'bg-success-primary': 'var(--color-bg-success-primary)',
  'bg-success-secondary': 'var(--color-bg-success-secondary)',
  'bg-success-solid': 'var(--color-bg-success-solid)',
  'bg-warning-primary': 'var(--color-bg-warning-primary)',
  'bg-warning-secondary': 'var(--color-bg-warning-secondary)',
  'bg-warning-solid': 'var(--color-bg-warning-solid)',
  'bg-error-primary': 'var(--color-bg-error-primary)',
  'bg-error-secondary': 'var(--color-bg-error-secondary)',
  'bg-error-solid': 'var(--color-bg-error-solid)',

  // Text tokens
  'text-primary': 'var(--color-text-primary)',
  'text-secondary': 'var(--color-text-secondary)',
  'text-tertiary': 'var(--color-text-tertiary)',
  'text-quaternary': 'var(--color-text-quaternary)',
  'text-success-primary': 'var(--color-text-success-primary)',
  'text-warning-primary': 'var(--color-text-warning-primary)',
  'text-error-primary': 'var(--color-text-error-primary)',
}

function resolveColor(token: string): string {
  return COLOR_MAP[token] || token
}

// ============================================================================
// Text Size Classes
// ============================================================================

const TEXT_SIZE_CLASSES: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
}

// ============================================================================
// Props
// ============================================================================

interface StatusIconProps {
  config: StatusIconConfig
  className?: string
}

// ============================================================================
// Pie Fill Component
// ============================================================================

interface PieFillProps {
  percentage: number
  color: string
  center: number
  strokeWidth: number
}

function PieFill({ percentage, color, center, strokeWidth }: PieFillProps) {
  // Inner radius leaves a small gap inside the stroke
  const innerRadius = center - strokeWidth - 1

  if (percentage <= 0 || innerRadius <= 0) {
    return null
  }

  // Full circle case
  if (percentage >= 100) {
    return (
      <circle
        cx={center}
        cy={center}
        r={innerRadius}
        fill={resolveColor(color)}
      />
    )
  }

  // Calculate pie arc
  // Start at top (after -90deg rotation, this is the right side in original coords)
  const angle = (percentage / 100) * 2 * Math.PI
  const startX = center + innerRadius
  const startY = center
  // Round to 4 decimal places to avoid SSR/client hydration mismatch from floating point differences
  const endX = Math.round((center + innerRadius * Math.cos(angle)) * 10000) / 10000
  const endY = Math.round((center + innerRadius * Math.sin(angle)) * 10000) / 10000
  const largeArcFlag = percentage > 50 ? 1 : 0

  // Path: Move to center, Line to start, Arc to end, Close
  const d = [
    `M ${center} ${center}`,
    `L ${startX} ${startY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    'Z',
  ].join(' ')

  return <path d={d} fill={resolveColor(color)} />
}

// ============================================================================
// Icon Overlay Component
// ============================================================================

interface IconOverlayProps {
  iconName: string
  variant: 'stroke' | 'bulk' | 'solid'
  color: string
  size: number
  strokeWidth: number
  diameter: number
}

function IconOverlay({ iconName, variant, color, size, strokeWidth, diameter }: IconOverlayProps) {
  const IconComponent = getIconForVariant(iconName, variant)

  if (!IconComponent) {
    return null
  }

  const isCustomIcon = CUSTOM_ICONS.has(iconName)
  const CustomIcon = IconComponent as React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>

  // For bulk/solid variants, strokeWidth should be 0 (they don't use strokes)
  const effectiveStrokeWidth = variant === 'stroke' ? strokeWidth : 0
  // Handle strokeWidth as string (from select) or number
  const iconStrokeWidth = typeof effectiveStrokeWidth === 'string' ? parseFloat(effectiveStrokeWidth) : effectiveStrokeWidth

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ width: diameter, height: diameter }}
    >
      {isCustomIcon ? (
        <CustomIcon
          size={size}
          className="shrink-0"
          style={{ color: resolveColor(color) }}
        />
      ) : (
        <HugeIcon
          icon={IconComponent}
          size={size}
          strokeWidth={iconStrokeWidth}
          className="shrink-0"
          style={{ color: resolveColor(color) }}
        />
      )}
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export function StatusIcon({ config, className }: StatusIconProps) {
  const { size, stroke, fill, icon, text } = config
  const { diameter } = size

  // Calculate SVG geometry
  const strokeWidth = stroke.width
  const radius = (diameter - strokeWidth) / 2
  const center = diameter / 2

  // Resolve colors
  const strokeColor = resolveColor(stroke.color)
  const textColor = resolveColor(text.color)

  // Resolve dash array (handle custom pattern)
  const dashArray = stroke.dashArray === 'custom'
    ? `${stroke.customDash ?? 4} ${stroke.customGap ?? 2}`
    : stroke.dashArray

  // Text size class
  const textSizeClass = TEXT_SIZE_CLASSES[text.size] || 'text-sm'

  // Render content
  const circleContent = (
    <div className="relative" style={{ width: diameter, height: diameter }}>
      {/* SVG Circle */}
      <svg
        width={diameter}
        height={diameter}
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* Background stroke circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap={stroke.lineCap}
          strokeDasharray={stroke.dashed ? dashArray : undefined}
          style={{
            stroke: strokeColor,
          }}
        />

        {/* Solid fill (inside stroke) */}
        {fill.type === 'solid' && (
          <circle
            cx={center}
            cy={center}
            r={center - strokeWidth - 1}
            fill={resolveColor(fill.color)}
          />
        )}

        {/* Full fill (covers stroke) */}
        {fill.type === 'full' && (
          <circle
            cx={center}
            cy={center}
            r={center}
            fill={resolveColor(fill.color)}
          />
        )}

        {/* Pie fill */}
        {fill.type === 'pie' && (
          <PieFill
            percentage={fill.percentage}
            color={fill.color}
            center={center}
            strokeWidth={strokeWidth}
          />
        )}
      </svg>

      {/* Icon overlay (independent of fill) */}
      {icon.show && (
        <IconOverlay
          iconName={icon.iconName}
          variant={icon.variant}
          color={icon.color}
          size={icon.size}
          strokeWidth={icon.strokeWidth}
          diameter={diameter}
        />
      )}
    </div>
  )

  // Text content
  const textContent = text.show && (
    <span
      className={cn(textSizeClass, 'whitespace-nowrap')}
      style={{
        color: textColor,
        fontWeight: text.weight,
      }}
    >
      {text.content}
    </span>
  )

  return (
    <div
      className={cn('inline-flex items-center', className)}
      style={{ gap: text.show ? text.gap : 0 }}
    >
      {text.position === 'left' && textContent}
      {circleContent}
      {text.position === 'right' && textContent}
    </div>
  )
}

StatusIcon.displayName = 'StatusIcon'
