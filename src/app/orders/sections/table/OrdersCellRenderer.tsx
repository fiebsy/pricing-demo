/**
 * Orders Page - Cell Renderer
 *
 * Renders cells for the orders table columns.
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/core/primitives/badge'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { getFlashIcon, getFlashOffIcon } from './route-badge-icons'
import { GradientIcon, type GradientPreset } from './gradient-icon'
import type { OrderRecord, AutoRouteBadgeConfig, AutoRouteBadgeIconStyle, AutoRouteStateConfig, StatusBadgeConfig, StatusBadgeIconStyle, StatusBadgeIconType } from '../../types'

// Status icons - import all variants
import CheckmarkCircle02IconStroke from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import CheckmarkCircle02IconSolid from '@hugeicons-pro/core-solid-rounded/CheckmarkCircle02Icon'
import CheckmarkCircle02IconBulk from '@hugeicons-pro/core-bulk-rounded/CheckmarkCircle02Icon'
import Alert02IconStroke from '@hugeicons-pro/core-stroke-rounded/Alert02Icon'
import Alert02IconSolid from '@hugeicons-pro/core-solid-rounded/Alert02Icon'
import Alert02IconBulk from '@hugeicons-pro/core-bulk-rounded/Alert02Icon'
import Cancel01IconStroke from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Cancel01IconSolid from '@hugeicons-pro/core-solid-rounded/Cancel01Icon'
import Cancel01IconBulk from '@hugeicons-pro/core-bulk-rounded/Cancel01Icon'
import TaskDone01IconStroke from '@hugeicons-pro/core-stroke-rounded/TaskDone01Icon'
import TaskDone01IconSolid from '@hugeicons-pro/core-solid-rounded/TaskDone01Icon'
import TaskDone01IconBulk from '@hugeicons-pro/core-bulk-rounded/TaskDone01Icon'
import { ClawbackIcon, ClawbackSolidIcon } from '@/components/ui/core/primitives/custom-icons'

// Map icon style to HugeIcon variant
const ICON_STYLE_TO_VARIANT: Record<AutoRouteBadgeIconStyle, 'stroke' | 'solid' | 'bulk'> = {
  stroke: 'stroke',
  solid: 'solid',
  bulk: 'bulk',
}

// Helper to render icon with or without gradient/fill
function renderRouteIcon(
  icon: unknown,
  config: AutoRouteStateConfig,
  className?: string
) {
  const variant = ICON_STYLE_TO_VARIANT[config.iconStyle]

  // Use GradientIcon for any fill option (gradient or solid color)
  if (config.gradient !== 'none') {
    return (
      <GradientIcon
        icon={icon as Parameters<typeof GradientIcon>[0]['icon']}
        size={14}
        gradient={config.gradient as GradientPreset}
        className={className}
      />
    )
  }

  // No fill - use HugeIcon with utility gray (matches badge icon color)
  return (
    <HugeIcon
      icon={icon}
      size={14}
      variant={variant}
      className={cn('text-utility-gray-500', className)}
    />
  )
}

// =============================================================================
// CUSTOMER AVATAR
// =============================================================================

/** Get initials from customer name (e.g., "Aaron Amezola" -> "AA") */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function CustomerAvatar({ name }: { name: string }) {
  const initials = getInitials(name)

  return (
    <div className="bg-tertiary text-tertiary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium">
      {initials}
    </div>
  )
}

// =============================================================================
// TYPE BADGE CONFIG
// =============================================================================

type BadgeColor = 'success' | 'warning' | 'gray' | 'error' | 'info' | 'brand'

const TYPE_COLORS: Record<string, BadgeColor> = {
  Active: 'success',
  Closed: 'gray',
}

// =============================================================================
// STATUS BADGE CONFIG
// =============================================================================

const STATUS_COLORS: Record<string, BadgeColor> = {
  // Active statuses
  'Healthy': 'success',
  'At Risk': 'warning',
  'Low Risk': 'info',
  'Medium Risk': 'warning',
  'High Risk': 'error',
  // Closed statuses
  'Completed': 'gray',
  'Clawback': 'error',
  'Default': 'error',
  'Chargeback': 'error',
  'Canceled': 'gray',
  'Declined': 'gray',
}

// Status icons by user-selectable type
const STATUS_ICONS: Record<Exclude<StatusBadgeIconType, 'none'>, Record<StatusBadgeIconStyle, unknown>> = {
  checkmark: {
    stroke: CheckmarkCircle02IconStroke,
    solid: CheckmarkCircle02IconSolid,
    bulk: CheckmarkCircle02IconBulk,
  },
  alert: {
    stroke: Alert02IconStroke,
    solid: Alert02IconSolid,
    bulk: Alert02IconBulk,
  },
  cancel: {
    stroke: Cancel01IconStroke,
    solid: Cancel01IconSolid,
    bulk: Cancel01IconBulk,
  },
  'task-done': {
    stroke: TaskDone01IconStroke,
    solid: TaskDone01IconSolid,
    bulk: TaskDone01IconBulk,
  },
  clawback: {
    stroke: ClawbackSolidIcon,
    solid: ClawbackSolidIcon,
    bulk: ClawbackSolidIcon,
  },
}

// =============================================================================
// CELL RENDERER
// =============================================================================

type CellRenderer = (
  columnKey: string,
  row: Record<string, unknown>,
  index: number
) => ReactNode

interface RenderCellConfig {
  autoRouteBadge: AutoRouteBadgeConfig
  statusBadge: StatusBadgeConfig
}

export function createRenderCell(config: RenderCellConfig): CellRenderer {
  const { autoRouteBadge, statusBadge } = config

  // Pre-resolve configs and icons for both states
  const onConfig = autoRouteBadge.on
  const offConfig = autoRouteBadge.off

  const FlashIconOn = getFlashIcon(onConfig.iconStyle)
  const FlashIconOff = getFlashOffIcon(offConfig.iconStyle)

  return (columnKey: string, row: Record<string, unknown>): ReactNode => {
    const record = row as unknown as OrderRecord

    switch (columnKey) {
      case 'customer':
        return (
          <div className="flex items-center gap-3 min-w-0">
            <CustomerAvatar name={record.customer} />
            <span className="text-primary truncate text-sm font-medium">
              {record.customer}
            </span>
          </div>
        )

      case 'order':
        return (
          <span className="text-tertiary font-mono text-sm">
            #{record.order}
          </span>
        )

      case 'route': {
        const isAutoRoute = record.route === 'AutoRoute'
        const stateConfig = isAutoRoute ? onConfig : offConfig
        const RouteIcon = isAutoRoute ? FlashIconOn : FlashIconOff

        // Icon-only mode: render just the icon without badge wrapper
        if (stateConfig.displayMode === 'icon-only') {
          return renderRouteIcon(RouteIcon, stateConfig, 'text-tertiary')
        }

        // Badge mode: render icon inside badge with optional text
        return (
          <Badge
            size="xs"
            shape="rounded"
            color="gray"
            iconLeading={renderRouteIcon(RouteIcon, stateConfig)}
          >
            {stateConfig.showText ? record.route : null}
          </Badge>
        )
      }

      case 'plan': {
        const isAutoRoute = record.route === 'AutoRoute'
        const stateConfig = isAutoRoute ? onConfig : offConfig
        const RouteIcon = isAutoRoute ? FlashIconOn : FlashIconOff

        return (
          <span className="text-tertiary flex items-center gap-1.5 text-xs">
            {renderRouteIcon(RouteIcon, stateConfig)}
            {record.plan}
          </span>
        )
      }

      case 'type': {
        const isActive = record.type === 'Active'
        const dotColor = isActive ? 'bg-success-500' : 'bg-quaternary'
        return (
          <Badge
            color="gray"
            size="xs"
            shape="squircle"
            style="default"
            className={isActive ? '' : 'opacity-70'}
          >
            <span className="flex items-center gap-1">
              <span className={`size-1.5 shrink-0 rounded-full ${dotColor}`} />
              {record.type}
            </span>
          </Badge>
        )
      }

      case 'status': {
        // Only show icons for clawback statuses
        const CLAWBACK_STATUSES = ['Default', 'Chargeback', 'Canceled']
        const isClawback = CLAWBACK_STATUSES.includes(record.displayStatus)

        const StatusIcon = statusBadge.iconType !== 'none' && isClawback
          ? STATUS_ICONS[statusBadge.iconType][statusBadge.iconStyle]
          : null

        // Default to 'leading' when icon is selected but position is 'none'
        const effectivePosition = StatusIcon && statusBadge.iconPosition === 'none'
          ? 'leading'
          : statusBadge.iconPosition

        // Map color option to Tailwind class
        const iconColorClass = {
          inherit: '',
          primary: 'text-primary',
          secondary: 'text-secondary',
          tertiary: 'text-tertiary',
          error: 'text-error-500',
          warning: 'text-warning-500',
          success: 'text-success-500',
        }[statusBadge.iconColor] ?? ''

        const icon = StatusIcon && effectivePosition !== 'none' ? (
          statusBadge.iconType === 'clawback' ? (
            <ClawbackSolidIcon size={12} className={cn('shrink-0', iconColorClass)} />
          ) : (
            <HugeIcon
              icon={StatusIcon}
              size={12}
              variant={statusBadge.iconStyle}
              className={iconColorClass}
            />
          )
        ) : null

        return (
          <span className="flex items-center gap-1.5">
            {effectivePosition === 'leading' && icon}
            <Badge
              color={STATUS_COLORS[record.displayStatus] || 'gray'}
              size="xs"
              shape="squircle"
              style="default"
            >
              {record.displayStatus}
            </Badge>
            {effectivePosition === 'trailing' && icon}
          </span>
        )
      }

      case 'total':
        return (
          <span className="text-primary tabular-nums text-sm">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(record.total)}
          </span>
        )

      default:
        return null
    }
  }
}
