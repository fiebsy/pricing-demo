/**
 * StackingNav - Centralized Debug Logger
 *
 * Replaces scattered console.group/log/table calls with a single
 * categorized utility.
 *
 * @module features/stacking-nav/utils
 */

// =============================================================================
// TYPES
// =============================================================================

export type DebugCategory =
  | 'phase'
  | 'collapse'
  | 'entry'
  | 'exit'
  | 'promotion'
  | 'level'
  | 'demotion'
  | 'position'
  | 'hover'

interface DebugOptions {
  enabled: boolean
}

// =============================================================================
// STATE
// =============================================================================

let debugEnabled = false

const CATEGORY_ICONS: Record<DebugCategory, string> = {
  phase: '\u{1F3AF}', // 🎯
  collapse: '\u23EC', // ⏬
  entry: '\u2728', // ✨
  exit: '\uD83D\uDEAA', // 🚪
  promotion: '\uD83D\uDD1D', // 🔝
  level: '\uD83D\uDD0D', // 🔍
  demotion: '\uD83D\uDD3B', // 🔻
  position: '\uD83D\uDCCD', // 📍
  hover: '\uD83D\uDC46', // 👆
}

// =============================================================================
// PUBLIC API
// =============================================================================

/**
 * Configure the debug system. Called once by the StackingNav root.
 */
export function configureDebug(options: DebugOptions): void {
  debugEnabled = options.enabled
}

/**
 * Check if debug is enabled.
 */
export function isDebugEnabled(): boolean {
  return debugEnabled
}

/**
 * Log a debug message under a category.
 * When `data` is provided, wraps output in a console.group.
 */
export function debug(
  category: DebugCategory,
  label: string,
  data?: Record<string, unknown>
): void {
  if (!debugEnabled || typeof window === 'undefined') return

  const icon = CATEGORY_ICONS[category]
  const prefix = `${icon} [${category.toUpperCase()}]`

  if (data) {
    console.group(`${prefix} ${label}`)
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}:`, value)
    }
    console.groupEnd()
  } else {
    console.log(`${prefix} ${label}`)
  }
}

/**
 * Log a table under a category — useful for positioning data.
 */
export function debugTable(
  category: DebugCategory,
  label: string,
  rows: Record<string, unknown>[]
): void {
  if (!debugEnabled || typeof window === 'undefined') return

  const icon = CATEGORY_ICONS[category]
  console.group(`${icon} [${category.toUpperCase()}] ${label}`)
  console.table(rows)
  console.groupEnd()
}

/**
 * Log phase transition.
 */
export function debugPhaseTransition(
  from: string,
  to: string,
  trigger: string,
  duration: number
): void {
  if (!debugEnabled || typeof window === 'undefined') return

  const icon = CATEGORY_ICONS.phase
  console.log(
    `${icon} [PHASE] ${from} → ${to}`,
    `| trigger: ${trigger}`,
    `| duration: ${duration.toFixed(0)}ms`
  )
}
