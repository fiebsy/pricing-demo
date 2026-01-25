/**
 * UI Component Library
 * =====================
 *
 * Organized structure:
 *
 * @module core - Stable primitives (buttons, badges, inputs, feedback)
 * @module features - Composed feature components
 * @module patterns - Complex UI patterns (data table, filters, control panel)
 * @module experimental - WIP components with version tracking
 * @module deprecated - Legacy components (do not use for new code)
 *
 * Import examples:
 * ```ts
 * // Core primitives
 * import { Button, Badge, Icon } from '@/components/ui/core'
 *
 * // Features
 * import { MetricCard, ExpandingSearch } from '@/components/ui/features'
 *
 * // Patterns
 * import { ControlPanel, Filter } from '@/components/ui/patterns'
 *
 * // Experimental (always specify version or use default latest)
 * import { CommandMenu } from '@/components/ui/experimental' // Latest
 * import { CommandMenuV3 } from '@/components/ui/experimental' // Specific version
 * ```
 */

// Core - Stable primitives
export * from './core'

// Features - Composed components
export * from './features'

// Patterns - Complex UI patterns
export * from './patterns'

// Note: Experimental and deprecated are NOT re-exported here
// Import them directly when needed:
// - @/components/ui/experimental
// - @/components/ui/deprecated
