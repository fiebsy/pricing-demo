/**
 * Studio Dashboard - Cell Renderer
 *
 * Handles the audience column set: Name, Messages, Tags, Last Interacted, Access Group
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/core/primitives/badge'
import { Tooltip } from '@/components/ui/core/feedback/tooltip'
import Globe02Icon from '@hugeicons-pro/core-stroke-rounded/Globe02Icon'
import StarIcon from '@hugeicons-pro/core-stroke-rounded/StarIcon'
import Mail01Icon from '@hugeicons-pro/core-stroke-rounded/Mail01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import type { AudienceUser, AccessGroup } from '../types'

// =============================================================================
// RELATIVE TIME FORMATTER
// =============================================================================

/**
 * Format a date to relative time (e.g., "2 hours ago", "Yesterday", "Jan 10")
 */
const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return diffMins <= 1 ? 'Just now' : `${diffMins}m ago`
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`
  }
  if (diffDays === 1) {
    return 'Yesterday'
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`
  }
  // Format as "Jan 10" for older dates
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Format date for tooltip (full date and time)
 */
const formatFullDate = (date: Date): string => {
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${dateStr} · ${timeStr}`
}

// =============================================================================
// ACCESS GROUP BADGE COLORS
// =============================================================================

const ACCESS_GROUP_COLORS: Record<AccessGroup, 'success' | 'info' | 'gray' | 'error'> = {
  Public: 'success',
  Insiders: 'info',
  Invited: 'gray',
  Revoked: 'error',
}

const ACCESS_GROUP_ICONS: Record<AccessGroup, typeof Globe02Icon> = {
  Public: Globe02Icon,
  Insiders: StarIcon,
  Invited: Mail01Icon,
  Revoked: Cancel01Icon,
}

// =============================================================================
// CELL RENDERER
// =============================================================================

/**
 * Render cell content based on column key
 */
export const renderCell = (
  columnKey: string,
  item: AudienceUser,
  _index: number
): React.ReactNode => {
  switch (columnKey) {
    case 'name': {
      // Show name as primary, with email indicator if name looks like an email
      const isEmailName = item.name.includes('@')
      return (
        <div className="flex flex-col gap-0.5">
          <span
            className={cn(
              'text-sm text-primary truncate max-w-[180px]',
              'cursor-pointer hover:underline'
            )}
            title={item.name}
          >
            {item.name}
          </span>
          {!isEmailName && (
            <span className="text-xs text-tertiary truncate max-w-[180px]" title={item.email}>
              {item.email}
            </span>
          )}
        </div>
      )
    }

    case 'messages':
      return (
        <span className="text-sm text-primary tabular-nums">
          {item.messageCount.toLocaleString()}
        </span>
      )

    case 'tags': {
      if (item.tags.length === 0) {
        return <span className="text-quaternary">—</span>
      }

      const visibleTags = item.tags.slice(0, 2)
      const remainingCount = item.tags.length - 2

      return (
        <div className="flex flex-wrap items-center gap-1">
          {visibleTags.map((tag) => (
            <Badge key={tag} size="xs" shape="squircle" color="gray">
              {tag}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Tooltip
              title={`${remainingCount} more tags`}
              description={item.tags.slice(2).join(', ')}
              side="top"
              delay={200}
            >
              <Badge size="xs" shape="squircle" color="gray">
                +{remainingCount}
              </Badge>
            </Tooltip>
          )}
        </div>
      )
    }

    case 'lastInteracted': {
      const relativeTime = formatRelativeTime(item.lastInteracted)
      const fullTime = formatFullDate(item.lastInteracted)
      const firstName = item.name.split(' ')[0]

      return (
        <Tooltip
          title={
            <span className="flex flex-col gap-1">
              <span className="font-medium opacity-50">{firstName} asked about</span>
              <span>{item.lastConversationSummary}</span>
            </span>
          }
          description={fullTime}
          side="top"
          delay={200}
        >
          <div className="flex items-center gap-2 cursor-default min-w-0">
            <span className="text-xs text-primary/70 truncate min-w-0 flex-1">
              {item.lastConversationSummary}
            </span>
            <span className="text-xs text-tertiary/60 shrink-0">
              {relativeTime}
            </span>
          </div>
        </Tooltip>
      )
    }

    case 'accessGroup':
      return (
        <Badge
          size="xs"
          shape="squircle"
          color={ACCESS_GROUP_COLORS[item.accessGroup]}
          iconLeading={ACCESS_GROUP_ICONS[item.accessGroup]}
        >
          {item.accessGroup}
        </Badge>
      )

    default:
      return null
  }
}
