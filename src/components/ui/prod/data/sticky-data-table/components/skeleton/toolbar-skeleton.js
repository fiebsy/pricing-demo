"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarSkeleton = exports.IntegratedToolbarSkeleton = void 0;
/**
 * Toolbar Skeleton Components
 *
 * Skeleton loaders for toolbar and integrated toolbar areas.
 *
 * @module skeleton/toolbar-skeleton
 */
const skeleton_1 = require("./skeleton");
const config_1 = require("../../config");
const utils_1 = require("./utils");
/**
 * Integrated Toolbar Skeleton
 *
 * Renders inside the sticky header area when toolbarLayout.position === 'integrated'
 */
const IntegratedToolbarSkeleton = ({ toolbarLayout, toolbarConfig, }) => {
    const topPadding = toolbarLayout.integratedPadding?.top ?? 0;
    const bottomPadding = toolbarLayout.integratedPadding?.bottom ?? 8;
    const toolbarHeight = toolbarLayout.integratedToolbarHeight ?? config_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT;
    return (<div className="flex w-full items-center justify-between" style={{
            minHeight: toolbarHeight,
            paddingTop: topPadding,
            paddingBottom: bottomPadding,
        }}>
      {/* Left side: Search/Filter skeleton */}
      {toolbarConfig?.showLeftToolbar ? (<div className="flex items-center gap-2">
          <skeleton_1.Skeleton className="rounded-lg" style={{ width: 110, height: 32 }}/>
          <skeleton_1.Skeleton className="rounded-lg" style={{ width: 90, height: 32 }}/>
        </div>) : toolbarConfig?.showRightToolbar ? (<skeleton_1.Skeleton className="rounded-xl" style={{ width: 280, height: 40 }}/>) : (<div />)}

      {/* Right side: Action buttons */}
      <div className="flex items-center gap-2">
        {toolbarConfig?.showExportButton && (<skeleton_1.Skeleton className="rounded-lg" style={{ width: 32, height: 32 }}/>)}
        {toolbarConfig?.showColumnControl && (<skeleton_1.Skeleton className="rounded-lg" style={{ width: 100, height: 32 }}/>)}
      </div>
    </div>);
};
exports.IntegratedToolbarSkeleton = IntegratedToolbarSkeleton;
/**
 * Toolbar Skeleton Component
 *
 * Matches toolbar layout: [Left: Filter] [Right: Search + Export + Columns]
 * Now respects toolbarLayout settings for margins and positioning
 */
const ToolbarSkeleton = ({ showFilter = false, showSearch = false, showExport = true, showColumnControl = true, showCount = false, toolbarLayout, }) => {
    // Use layout settings if provided, otherwise fall back to defaults
    const bottomMargin = toolbarLayout?.toolbarBottomMargin ?? utils_1.TOOLBAR_MARGIN;
    const countGap = toolbarLayout?.toolbarToCountGap ?? 6;
    // Calculate dynamic margin based on whether count is shown
    const margin = showCount ? bottomMargin + config_1.TABLE_CONFIG.COUNT_DISPLAY_MARGIN : bottomMargin;
    return (<div className="relative flex items-center gap-4" style={{
            height: utils_1.TOOLBAR_HEIGHT,
            marginBottom: margin,
            justifyContent: showFilter || showCount ? 'space-between' : 'flex-end',
        }}>
      {/* Left: Filter Toolbar placeholder */}
      {showFilter ? (<div className="flex flex-1 items-center gap-2">
          <skeleton_1.Skeleton className="rounded-lg" style={{ width: 110, height: 32 }}/>
          <skeleton_1.Skeleton className="rounded-lg" style={{ width: 90, height: 32 }}/>
        </div>) : (<div className="flex-1"/>)}

      {/* Right: Search + Export + Column Control */}
      <div className="flex items-center justify-end gap-2">
        {showSearch && <skeleton_1.Skeleton className="rounded-lg" style={{ width: 200, height: 32 }}/>}
        {showExport && <skeleton_1.Skeleton className="rounded-lg" style={{ width: 32, height: 32 }}/>}
        {showColumnControl && <skeleton_1.Skeleton className="rounded-lg" style={{ width: 100, height: 32 }}/>}
      </div>

      {/* Count Display skeleton */}
      {showCount && (<div className="absolute left-0 top-full" style={{ marginTop: countGap }}>
          <skeleton_1.Skeleton className="rounded" style={{ width: 80, height: 14 }}/>
        </div>)}
    </div>);
};
exports.ToolbarSkeleton = ToolbarSkeleton;
//# sourceMappingURL=toolbar-skeleton.js.map