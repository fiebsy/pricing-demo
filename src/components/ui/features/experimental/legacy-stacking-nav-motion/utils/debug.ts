/**
 * StackingNav - Centralized Debug Logger
 *
 * Replaces scattered console.group/log/table calls with a single
 * categorized utility. Visual debug (badges, arrows, ID labels in
 * animated-item.tsx) stays untouched — those are rendering concerns.
 *
 * @module features/stacking-nav/utils
 */

// =============================================================================
// TYPES
// =============================================================================

export type DebugCategory =
  | 'collapse'
  | 'entry'
  | 'exit'
  | 'promotion'
  | 'level'
  | 'demotion'
  | 'position'

interface DebugOptions {
  enabled: boolean
}

// =============================================================================
// STATE
// =============================================================================

let debugEnabled = false

const CATEGORY_ICONS: Record<DebugCategory, string> = {
  collapse: '\u23EC',   // ⏬
  entry: '\u2728',      // ✨ — not emoji, but renders nicely
  exit: '\uD83D\uDEAA', // 🚪
  promotion: '\uD83D\uDD1D', // 🔝 — not exact, but close
  level: '\uD83D\uDD0D', // 🔍
  demotion: '\uD83D\uDD3B', // 🔻
  position: '\uD83D\uDCCD', // 📍
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
 * Log a debug message under a category.
 * When `data` is provided, wraps output in a console.group.
 */
export function debug(
  category: DebugCategory,
  label: string,
  data?: Record<string, unknown>,
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
  rows: Record<string, unknown>[],
): void {
  if (!debugEnabled || typeof window === 'undefined') return

  const icon = CATEGORY_ICONS[category]
  console.group(`${icon} [${category.toUpperCase()}] ${label}`)
  console.table(rows)
  console.groupEnd()
}
