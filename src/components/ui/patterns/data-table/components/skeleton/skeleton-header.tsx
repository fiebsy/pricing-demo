'use client'

/**
 * Skeleton Header
 *
 * Sticky-aware header skeleton with integrated toolbar support.
 *
 * @module skeleton/skeleton-header
 */

import { TABLE_CONFIG, type ToolbarConfig, type ToolbarLayoutConfig } from '../../config'
import type { SkeletonCellConfig } from '../../types'
import { getHeaderOuterBorders, getHeaderOuterBorderStyles, type ProcessedColumnsResult } from '../../utils'
import { SkeletonHeaderCell } from './skeleton-cells'
import { IntegratedToolbarSkeleton } from './toolbar-skeleton'

// ============================================================================
// SKELETON HEADER
// ============================================================================

export interface SkeletonHeaderStickyProps {
  processed: ProcessedColumnsResult
  borderRadius?: number
  toolbarLayout?: ToolbarLayoutConfig
  toolbarConfig?: ToolbarConfig
  headerHeight?: number
  headerCellConfig?: SkeletonCellConfig
}

/**
 * Skeleton Header - Sticky Aware
 *
 * Matches StickyDataTable header structure with:
 * - Sticky positioning with gap (respects toolbarLayout.headerGap)
 * - CSS Grid layout
 * - Proper sticky cell styling
 * - Border configuration
 * - Integrated toolbar support
 */
export const SkeletonHeaderSticky = ({
  processed,
  borderRadius = TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
  toolbarLayout,
  toolbarConfig,
  headerHeight,
  headerCellConfig,
}: SkeletonHeaderStickyProps) => {
  const { HEADER_HEIGHT } = TABLE_CONFIG
  // Use headerGap from toolbarLayout if provided, otherwise fall back to default
  const headerGap = toolbarLayout?.headerGap ?? TABLE_CONFIG.HEADER_GAP
  const effectiveHeaderHeight = headerHeight ?? HEADER_HEIGHT
  const { allColumns, gridTemplate, stickyState, borderConfig, backgroundConfig } = processed

  const outerBorderClasses = getHeaderOuterBorders(borderConfig)
  const outerBorderStyles = getHeaderOuterBorderStyles(borderConfig)

  // Check if toolbar is integrated
  const isIntegrated = toolbarLayout?.position === 'integrated'

  return (
    <div
      className={`${backgroundConfig.headerWrapper} sticky z-30 flex flex-col`}
      style={{
        top: `${headerGap}px`,
        width: '100%',
      }}
    >
      {/* Background filler above header (matches StickyHeaderWrapper) */}
      <div
        className={backgroundConfig.headerWrapper}
        style={{
          height: `${headerGap}px`,
          position: 'absolute',
          top: `-${headerGap}px`,
          left: 0,
          right: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Integrated Toolbar Skeleton (when position is 'integrated') */}
      {isIntegrated && toolbarConfig?.showToolbar && (
        <IntegratedToolbarSkeleton
          toolbarLayout={toolbarLayout}
          toolbarConfig={toolbarConfig}
        />
      )}

      {/* Header Container with Grid */}
      <div
        className={`grid w-full overflow-hidden ${outerBorderClasses} ${backgroundConfig.headerContainer}`}
        style={{
          gridTemplateColumns: gridTemplate,
          height: `${effectiveHeaderHeight}px`,
          borderTopLeftRadius: `${borderRadius}px`,
          borderTopRightRadius: `${borderRadius}px`,
          scrollbarWidth: 'none',
          ...outerBorderStyles,
        }}
      >
        {allColumns.map((col) => (
          <SkeletonHeaderCell
            key={col.key}
            column={col}
            stickyState={stickyState}
            borderConfig={borderConfig}
            backgroundConfig={backgroundConfig}
            cellConfig={headerCellConfig}
          />
        ))}
      </div>
    </div>
  )
}
