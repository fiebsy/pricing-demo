/**
 * UI Component Library
 * =====================
 *
 * Import directly from each category for full type access:
 *
 * ```ts
 * // Core primitives
 * import { Badge, HugeIcon } from '@/components/ui/core/primitives'
 * import { Button } from '@/components/ui/core/primitives/button'
 * import { Checkbox } from '@/components/ui/core/inputs/checkbox'
 * import { Tooltip } from '@/components/ui/core/feedback/tooltip'
 *
 * // Features
 * import { DisplayCard } from '@/components/ui/features/display-card'
 * import { MetricCard } from '@/components/ui/features/metric-card'
 *
 * // Patterns
 * import { UnifiedControlPanel } from '@/components/ui/patterns/control-panel'
 * import { FilterMenu } from '@/components/ui/patterns/filter'
 * import { StickyDataTable } from '@/components/ui/patterns/data-table'
 * ```
 *
 * Note: Barrel re-exports are intentionally limited to avoid name collisions.
 * Prefer direct imports from the specific component path.
 */

// Core - Stable primitives (limited re-export for common components)
export { Badge, BadgeGroup, HugeIcon, Icon, InlineSlider } from './core'

// Note: Import other components directly from their paths
// - @/components/ui/core/primitives/button
// - @/components/ui/core/primitives/menu
// - @/components/ui/core/inputs/checkbox
// - @/components/ui/core/feedback/tooltip
// - @/components/ui/features/*
// - @/components/ui/patterns/*
