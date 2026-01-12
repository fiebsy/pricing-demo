'use client'

/**
 * Toolbar Skeleton Components
 *
 * Skeleton loaders for toolbar and integrated toolbar areas.
 *
 * @module skeleton/toolbar-skeleton
 */

import { Skeleton } from '@/components/ui/deprecated/skeleton'
import { TABLE_CONFIG, type ToolbarConfig, type ToolbarLayoutConfig } from '../../config'
import { TOOLBAR_HEIGHT, TOOLBAR_MARGIN } from './utils'

// ============================================================================
// INTEGRATED TOOLBAR SKELETON
// ============================================================================

export interface IntegratedToolbarSkeletonProps {
  toolbarLayout: ToolbarLayoutConfig
  toolbarConfig?: ToolbarConfig
}

/**
 * Integrated Toolbar Skeleton
 *
 * Renders inside the sticky header area when toolbarLayout.position === 'integrated'
 */
export const IntegratedToolbarSkeleton = ({
  toolbarLayout,
  toolbarConfig,
}: IntegratedToolbarSkeletonProps) => {
  const topPadding = toolbarLayout.integratedPadding?.top ?? 0
  const bottomPadding = toolbarLayout.integratedPadding?.bottom ?? 8
  const toolbarHeight = toolbarLayout.integratedToolbarHeight ?? TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT

  return (
    <div
      className="flex w-full items-center justify-between"
      style={{
        minHeight: toolbarHeight,
        paddingTop: topPadding,
        paddingBottom: bottomPadding,
      }}
    >
      {/* Left side: Search/Filter skeleton */}
      {toolbarConfig?.showLeftToolbar ? (
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-lg" style={{ width: 110, height: 32 }} />
          <Skeleton className="rounded-lg" style={{ width: 90, height: 32 }} />
        </div>
      ) : toolbarConfig?.showRightToolbar ? (
        <Skeleton className="rounded-xl" style={{ width: 280, height: 40 }} />
      ) : (
        <div />
      )}

      {/* Right side: Action buttons */}
      <div className="flex items-center gap-2">
        {toolbarConfig?.showExportButton && (
          <Skeleton className="rounded-lg" style={{ width: 32, height: 32 }} />
        )}
        {toolbarConfig?.showColumnControl && (
          <Skeleton className="rounded-lg" style={{ width: 100, height: 32 }} />
        )}
      </div>
    </div>
  )
}

// ============================================================================
// TOOLBAR SKELETON
// ============================================================================

export interface ToolbarSkeletonProps {
  showFilter?: boolean
  showSearch?: boolean
  showExport?: boolean
  showColumnControl?: boolean
  showCount?: boolean
  toolbarLayout?: ToolbarLayoutConfig
}

/**
 * Toolbar Skeleton Component
 *
 * Matches toolbar layout: [Left: Filter] [Right: Search + Export + Columns]
 * Now respects toolbarLayout settings for margins and positioning
 */
export const ToolbarSkeleton = ({
  showFilter = false,
  showSearch = false,
  showExport = true,
  showColumnControl = true,
  showCount = false,
  toolbarLayout,
}: ToolbarSkeletonProps) => {
  // Use layout settings if provided, otherwise fall back to defaults
  const bottomMargin = toolbarLayout?.toolbarBottomMargin ?? TOOLBAR_MARGIN
  const countGap = toolbarLayout?.toolbarToCountGap ?? 6

  // Calculate dynamic margin based on whether count is shown
  const margin = showCount ? bottomMargin + TABLE_CONFIG.COUNT_DISPLAY_MARGIN : bottomMargin

  return (
    <div
      className="relative flex items-center gap-4"
      style={{
        height: TOOLBAR_HEIGHT,
        marginBottom: margin,
        justifyContent: showFilter || showCount ? 'space-between' : 'flex-end',
      }}
    >
      {/* Left: Filter Toolbar placeholder */}
      {showFilter ? (
        <div className="flex flex-1 items-center gap-2">
          <Skeleton className="rounded-lg" style={{ width: 110, height: 32 }} />
          <Skeleton className="rounded-lg" style={{ width: 90, height: 32 }} />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Right: Search + Export + Column Control */}
      <div className="flex items-center justify-end gap-2">
        {showSearch && <Skeleton className="rounded-lg" style={{ width: 200, height: 32 }} />}
        {showExport && <Skeleton className="rounded-lg" style={{ width: 32, height: 32 }} />}
        {showColumnControl && <Skeleton className="rounded-lg" style={{ width: 100, height: 32 }} />}
      </div>

      {/* Count Display skeleton */}
      {showCount && (
        <div className="absolute left-0 top-full" style={{ marginTop: countGap }}>
          <Skeleton className="rounded" style={{ width: 80, height: 14 }} />
        </div>
      )}
    </div>
  )
}
