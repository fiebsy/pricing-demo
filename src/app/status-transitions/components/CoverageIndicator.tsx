/**
 * Coverage Indicator Component
 *
 * Displays the translation coverage type with colored badge.
 */

import { cn } from '@/lib/utils'
import type { CoverageType } from '../config/types'

// =============================================================================
// STYLES
// =============================================================================

const COVERAGE_STYLES: Record<CoverageType, { dot: string; text: string; label: string }> = {
  specific: {
    dot: 'bg-success',
    text: 'text-success',
    label: 'Specific',
  },
  semantic: {
    dot: 'bg-info',
    text: 'text-info',
    label: 'Semantic',
  },
  fallback: {
    dot: 'bg-warning',
    text: 'text-warning',
    label: 'Fallback',
  },
}

// =============================================================================
// COMPONENT
// =============================================================================

interface CoverageIndicatorProps {
  coverage: CoverageType
  showLabel?: boolean
}

export function CoverageIndicator({ coverage, showLabel = true }: CoverageIndicatorProps) {
  const styles = COVERAGE_STYLES[coverage]

  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-2 w-2 shrink-0 rounded-full', styles.dot)} />
      {showLabel && (
        <span className={cn('text-xs', styles.text)}>{styles.label}</span>
      )}
    </div>
  )
}
