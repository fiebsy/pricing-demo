"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropIndicator = void 0;
/**
 * Drop indicator - rendered at container level for stable positioning
 * Uses cached column rects so indicator doesn't move with cell transform
 */
function DropIndicator({ dragOverKey, dropSide, columnRectsRef, headerScrollRef, }) {
    if (!dragOverKey || !dropSide) {
        return null;
    }
    const targetRect = columnRectsRef.current?.get(dragOverKey);
    const containerRect = headerScrollRef.current?.getBoundingClientRect();
    if (!targetRect || !containerRect) {
        return null;
    }
    // Calculate indicator position relative to container
    const indicatorX = dropSide === 'right'
        ? targetRect.right - containerRect.left
        : targetRect.left - containerRect.left;
    return (<div className="pointer-events-none absolute top-0 bottom-0 z-30 flex flex-col items-center" style={{
            left: indicatorX,
            transform: 'translateX(-50%)', // Center the indicator on the edge
        }} aria-hidden="true">
      {/* Diamond indicator at top */}
      <div className="size-2 rotate-45 bg-brand-solid -mt-0.5" style={{ borderRadius: '1px' }}/>
      {/* Vertical line */}
      <div className="w-0.5 flex-1 bg-brand-solid rounded-b-full"/>
    </div>);
}
exports.DropIndicator = DropIndicator;
//# sourceMappingURL=drop-indicator.js.map