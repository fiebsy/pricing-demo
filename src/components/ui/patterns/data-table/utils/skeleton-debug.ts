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

type DebugCategory =
  | 'observer'      // IntersectionObserver events
  | 'apollo'        // Apollo loading state changes
  | 'loadMore'      // handleLoadMore lifecycle
  | 'state'         // State changes (isLoadingMore, isBatchLoading, etc.)
  | 'timer'         // Timer events (settle timers)
  | 'skeleton'      // Skeleton visibility changes
  | 'data'          // Data length changes
  | 'filter'        // Filter dependency changes
  | 'render'        // Render cycle events

interface DebugEntry {
  timestamp: number
  elapsed: number
  category: DebugCategory
  message: string
  data?: Record<string, unknown>
}

// Color scheme for console output
const CATEGORY_COLORS: Record<DebugCategory, string> = {
  observer: '#FF6B6B',   // Red
  apollo: '#4ECDC4',     // Teal
  loadMore: '#45B7D1',   // Blue
  state: '#96CEB4',      // Green
  timer: '#FFEAA7',      // Yellow
  skeleton: '#DDA0DD',   // Plum
  data: '#98D8C8',       // Mint
  filter: '#F7DC6F',     // Gold
  render: '#BB8FCE',     // Purple
}

const CATEGORY_ICONS: Record<DebugCategory, string> = {
  observer: '👁️',
  apollo: '🔄',
  loadMore: '📥',
  state: '📊',
  timer: '⏱️',
  skeleton: '💀',
  data: '📦',
  filter: '🔍',
  render: '🎨',
}

class SkeletonDebugger {
  private startTime: number = Date.now()
  private entries: DebugEntry[] = []
  private enabled: boolean = false
  private categoryFilter: Set<DebugCategory> | null = null

  constructor() {
    // Check for debug flag on initialization
    if (typeof window !== 'undefined') {
      this.enabled = (window as any).__SKELETON_DEBUG === true
      // Expose this instance to window for console control
      ;(window as any).skeletonDebug = this
    }
  }

  /**
   * Enable debugging
   */
  enable(): void {
    this.enabled = true
    this.startTime = Date.now()
    this.entries = []
    console.log('%c[SkeletonDebug] Enabled - tracking skeleton states', 'color: #4ECDC4; font-weight: bold')
  }

  /**
   * Disable debugging
   */
  disable(): void {
    this.enabled = false
    console.log('%c[SkeletonDebug] Disabled', 'color: #888')
  }

  /**
   * Filter to specific categories only
   */
  filter(...categories: DebugCategory[]): void {
    if (categories.length === 0) {
      this.categoryFilter = null
      console.log('%c[SkeletonDebug] Showing all categories', 'color: #4ECDC4')
    } else {
      this.categoryFilter = new Set(categories)
      console.log(`%c[SkeletonDebug] Filtering to: ${categories.join(', ')}`, 'color: #4ECDC4')
    }
  }

  /**
   * Check if debugging is active
   */
  isEnabled(): boolean {
    if (typeof window !== 'undefined') {
      // Check runtime flag
      return (window as any).__SKELETON_DEBUG === true || this.enabled
    }
    return this.enabled
  }

  /**
   * Log a debug message
   */
  log(category: DebugCategory, message: string, data?: Record<string, unknown>): void {
    if (!this.isEnabled()) return
    if (this.categoryFilter && !this.categoryFilter.has(category)) return

    const now = Date.now()
    const elapsed = now - this.startTime
    const entry: DebugEntry = { timestamp: now, elapsed, category, message, data }
    this.entries.push(entry)

    const icon = CATEGORY_ICONS[category]
    const color = CATEGORY_COLORS[category]
    const elapsedStr = `+${elapsed}ms`.padStart(8)

    if (data) {
      console.log(
        `%c${elapsedStr} ${icon} [${category}]%c ${message}`,
        `color: ${color}; font-weight: bold`,
        'color: inherit',
        data
      )
    } else {
      console.log(
        `%c${elapsedStr} ${icon} [${category}]%c ${message}`,
        `color: ${color}; font-weight: bold`,
        'color: inherit'
      )
    }
  }

  /**
   * Log a state change with before/after values
   */
  stateChange(stateName: string, from: unknown, to: unknown, extra?: Record<string, unknown>): void {
    if (from === to) return // Skip no-op changes

    this.log('state', `${stateName}: ${JSON.stringify(from)} → ${JSON.stringify(to)}`, {
      stateName,
      from,
      to,
      ...extra,
    })
  }

  /**
   * Log timer events (start, fire, clear)
   */
  timerEvent(timerName: string, event: 'started' | 'fired' | 'cleared', durationMs?: number): void {
    const message = event === 'started'
      ? `${timerName} timer started (${durationMs}ms)`
      : event === 'fired'
        ? `${timerName} timer fired`
        : `${timerName} timer cleared`

    this.log('timer', message, { timerName, event, durationMs })
  }

  /**
   * Log IntersectionObserver events
   */
  observerEvent(event: 'intersecting' | 'not-intersecting' | 'created' | 'disconnected', details?: Record<string, unknown>): void {
    this.log('observer', `Sentinel ${event}`, details)
  }

  /**
   * Log Apollo loading state changes
   */
  apolloLoading(loading: boolean, networkStatus?: number, details?: Record<string, unknown>): void {
    this.log('apollo', `Apollo loading: ${loading}${networkStatus !== undefined ? ` (networkStatus: ${networkStatus})` : ''}`, {
      loading,
      networkStatus,
      ...details,
    })
  }

  /**
   * Log skeleton visibility changes
   */
  skeletonVisibility(visible: boolean, source: string, details?: Record<string, unknown>): void {
    this.log('skeleton', `Skeleton ${visible ? 'SHOWN' : 'HIDDEN'} (${source})`, {
      visible,
      source,
      ...details,
    })
  }

  /**
   * Log data changes
   */
  dataChange(rawLength: number, filteredLength: number, hasNextPage: boolean): void {
    this.log('data', `Data: ${filteredLength}/${rawLength} items, hasNextPage: ${hasNextPage}`, {
      rawLength,
      filteredLength,
      hasNextPage,
    })
  }

  /**
   * Export all entries as JSON (useful for analysis)
   */
  export(): DebugEntry[] {
    return [...this.entries]
  }

  /**
   * Clear all entries and reset timer
   */
  reset(): void {
    this.entries = []
    this.startTime = Date.now()
    console.log('%c[SkeletonDebug] Reset', 'color: #4ECDC4')
  }

  /**
   * Print a summary of recent events
   */
  summary(lastNMs: number = 5000): void {
    const now = Date.now()
    const cutoff = now - lastNMs
    const recent = this.entries.filter(e => e.timestamp >= cutoff)

    console.group(`%c[SkeletonDebug] Summary (last ${lastNMs}ms)`, 'color: #4ECDC4; font-weight: bold')
    console.log(`Total events: ${recent.length}`)

    // Count by category
    const byCat = recent.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    console.log('By category:', byCat)

    // State changes
    const stateChanges = recent.filter(e => e.category === 'state')
    if (stateChanges.length > 0) {
      console.log('State changes:', stateChanges.map(e => `${e.data?.stateName}: ${e.data?.from} → ${e.data?.to}`))
    }

    console.groupEnd()
  }
}

// Singleton instance
export const skeletonDebug = new SkeletonDebugger()

// Convenience function to check if debugging is enabled
export const isSkeletonDebugEnabled = (): boolean => skeletonDebug.isEnabled()

/**
 * Helper to wrap a value with debug logging
 */
export function debugValue<T>(category: DebugCategory, label: string, value: T): T {
  if (skeletonDebug.isEnabled()) {
    skeletonDebug.log(category, `${label}: ${JSON.stringify(value)}`)
  }
  return value
}
