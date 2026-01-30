/**
 * UI Component Library
 * =====================
 *
 * Organized structure:
 *
 * @module core - Stable primitives (badges, icons, feedback)
 * @module features - Composed feature components
 * @module patterns - Complex UI patterns (control panel)
 * @module deprecated - Legacy components (do not use for new code)
 *
 * Import examples:
 * ```ts
 * // Core primitives
 * import { Badge, HugeIcon } from '@/components/ui/core'
 *
 * // Features
 * import { DisplayCard, StackingNav } from '@/components/ui/features'
 *
 * // Patterns
 * import { ControlPanel } from '@/components/ui/patterns'
 * ```
 */

// Core - Stable primitives
export * from './core'

// Features - Composed components
export * from './features'

// Patterns - Complex UI patterns
export * from './patterns'

// Note: Deprecated components are NOT re-exported here
// Import them directly when needed:
// - @/components/ui/deprecated
