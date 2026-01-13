"use strict";
/**
 * Skeleton Debug Utility
 *
 * Comprehensive debugging for skeleton flash investigation.
 * Toggle DEBUG_SKELETON in browser console: window.__SKELETON_DEBUG = true
 *
 * Usage:
 * ```ts
 * import { skeletonDebug } from './skeleton-debug'
 *
 * skeletonDebug.log('observer', 'Sentinel intersecting', { isIntersecting: true })
 * skeletonDebug.stateChange('isLoadingMore', false, true)
 * skeletonDebug.timerEvent('settle', 'started', 300)
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugValue = exports.isSkeletonDebugEnabled = exports.skeletonDebug = void 0;
// Color scheme for console output
const CATEGORY_COLORS = {
    observer: '#FF6B6B', // Red
    apollo: '#4ECDC4', // Teal
    loadMore: '#45B7D1', // Blue
    state: '#96CEB4', // Green
    timer: '#FFEAA7', // Yellow
    skeleton: '#DDA0DD', // Plum
    data: '#98D8C8', // Mint
    filter: '#F7DC6F', // Gold
    render: '#BB8FCE', // Purple
};
const CATEGORY_ICONS = {
    observer: '👁️',
    apollo: '🔄',
    loadMore: '📥',
    state: '📊',
    timer: '⏱️',
    skeleton: '💀',
    data: '📦',
    filter: '🔍',
    render: '🎨',
};
class SkeletonDebugger {
    startTime = Date.now();
    entries = [];
    enabled = false;
    categoryFilter = null;
    constructor() {
        // Check for debug flag on initialization
        if (typeof window !== 'undefined') {
            this.enabled = window.__SKELETON_DEBUG === true;
            window.skeletonDebug = this;
        }
    }
    /**
     * Enable debugging
     */
    enable() {
        this.enabled = true;
        this.startTime = Date.now();
        this.entries = [];
        console.log('%c[SkeletonDebug] Enabled - tracking skeleton states', 'color: #4ECDC4; font-weight: bold');
    }
    /**
     * Disable debugging
     */
    disable() {
        this.enabled = false;
        console.log('%c[SkeletonDebug] Disabled', 'color: #888');
    }
    /**
     * Filter to specific categories only
     */
    filter(...categories) {
        if (categories.length === 0) {
            this.categoryFilter = null;
            console.log('%c[SkeletonDebug] Showing all categories', 'color: #4ECDC4');
        }
        else {
            this.categoryFilter = new Set(categories);
            console.log(`%c[SkeletonDebug] Filtering to: ${categories.join(', ')}`, 'color: #4ECDC4');
        }
    }
    /**
     * Check if debugging is active
     */
    isEnabled() {
        if (typeof window !== 'undefined') {
            // Check runtime flag
            return window.__SKELETON_DEBUG === true || this.enabled;
        }
        return this.enabled;
    }
    /**
     * Log a debug message
     */
    log(category, message, data) {
        if (!this.isEnabled())
            return;
        if (this.categoryFilter && !this.categoryFilter.has(category))
            return;
        const now = Date.now();
        const elapsed = now - this.startTime;
        const entry = { timestamp: now, elapsed, category, message, data };
        this.entries.push(entry);
        const icon = CATEGORY_ICONS[category];
        const color = CATEGORY_COLORS[category];
        const elapsedStr = `+${elapsed}ms`.padStart(8);
        if (data) {
            console.log(`%c${elapsedStr} ${icon} [${category}]%c ${message}`, `color: ${color}; font-weight: bold`, 'color: inherit', data);
        }
        else {
            console.log(`%c${elapsedStr} ${icon} [${category}]%c ${message}`, `color: ${color}; font-weight: bold`, 'color: inherit');
        }
    }
    /**
     * Log a state change with before/after values
     */
    stateChange(stateName, from, to, extra) {
        if (from === to)
            return; // Skip no-op changes
        this.log('state', `${stateName}: ${JSON.stringify(from)} → ${JSON.stringify(to)}`, {
            stateName,
            from,
            to,
            ...extra,
        });
    }
    /**
     * Log timer events (start, fire, clear)
     */
    timerEvent(timerName, event, durationMs) {
        const message = event === 'started'
            ? `${timerName} timer started (${durationMs}ms)`
            : event === 'fired'
                ? `${timerName} timer fired`
                : `${timerName} timer cleared`;
        this.log('timer', message, { timerName, event, durationMs });
    }
    /**
     * Log IntersectionObserver events
     */
    observerEvent(event, details) {
        this.log('observer', `Sentinel ${event}`, details);
    }
    /**
     * Log Apollo loading state changes
     */
    apolloLoading(loading, networkStatus, details) {
        this.log('apollo', `Apollo loading: ${loading}${networkStatus !== undefined ? ` (networkStatus: ${networkStatus})` : ''}`, {
            loading,
            networkStatus,
            ...details,
        });
    }
    /**
     * Log skeleton visibility changes
     */
    skeletonVisibility(visible, source, details) {
        this.log('skeleton', `Skeleton ${visible ? 'SHOWN' : 'HIDDEN'} (${source})`, {
            visible,
            source,
            ...details,
        });
    }
    /**
     * Log data changes
     */
    dataChange(rawLength, filteredLength, hasNextPage) {
        this.log('data', `Data: ${filteredLength}/${rawLength} items, hasNextPage: ${hasNextPage}`, {
            rawLength,
            filteredLength,
            hasNextPage,
        });
    }
    /**
     * Export all entries as JSON (useful for analysis)
     */
    export() {
        return [...this.entries];
    }
    /**
     * Clear all entries and reset timer
     */
    reset() {
        this.entries = [];
        this.startTime = Date.now();
        console.log('%c[SkeletonDebug] Reset', 'color: #4ECDC4');
    }
    /**
     * Print a summary of recent events
     */
    summary(lastNMs = 5000) {
        const now = Date.now();
        const cutoff = now - lastNMs;
        const recent = this.entries.filter(e => e.timestamp >= cutoff);
        console.group(`%c[SkeletonDebug] Summary (last ${lastNMs}ms)`, 'color: #4ECDC4; font-weight: bold');
        console.log(`Total events: ${recent.length}`);
        // Count by category
        const byCat = recent.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] || 0) + 1;
            return acc;
        }, {});
        console.log('By category:', byCat);
        // State changes
        const stateChanges = recent.filter(e => e.category === 'state');
        if (stateChanges.length > 0) {
            console.log('State changes:', stateChanges.map(e => `${e.data?.stateName}: ${e.data?.from} → ${e.data?.to}`));
        }
        console.groupEnd();
    }
}
// Singleton instance
exports.skeletonDebug = new SkeletonDebugger();
// Convenience function to check if debugging is enabled
const isSkeletonDebugEnabled = () => exports.skeletonDebug.isEnabled();
exports.isSkeletonDebugEnabled = isSkeletonDebugEnabled;
/**
 * Helper to wrap a value with debug logging
 */
function debugValue(category, label, value) {
    if (exports.skeletonDebug.isEnabled()) {
        exports.skeletonDebug.log(category, `${label}: ${JSON.stringify(value)}`);
    }
    return value;
}
exports.debugValue = debugValue;
//# sourceMappingURL=skeleton-debug.js.map