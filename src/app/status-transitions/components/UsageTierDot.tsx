/**
 * Usage Tier Dot Component
 *
 * Displays the usage tier with colored dot indicator.
 */

import { cn } from '@/lib/utils'
import type { UsageTier } from '../config/types'

// =============================================================================
// STYLES
// =============================================================================

const USAGE_TIER_STYLES: Record<UsageTier, { dot: string; text: string; label: string }> = {
  high: {
    dot: 'bg-success',
    text: 'text-success',
    label: 'High',
  },
  medium: {
    dot: 'bg-info',
    text: 'text-secondary',
    label: 'Medium',
  },
  low: {
    dot: 'bg-tertiary',
    text: 'text-tertiary',
    label: 'Low',
  },
  stale: {
    dot: 'border border-error bg-transparent',
    text: 'text-error',
    label: 'Stale',
  },
}

// =============================================================================
// COMPONENT
// =============================================================================

interface UsageTierDotProps {
  tier: UsageTier
  showLabel?: boolean
}

export function UsageTierDot({ tier, showLabel = true }: UsageTierDotProps) {
  const styles = USAGE_TIER_STYLES[tier]

  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-2 w-2 shrink-0 rounded-full', styles.dot)} />
      {showLabel && (
        <span className={cn('text-xs', styles.text)}>{styles.label}</span>
      )}
    </div>
  )
}
