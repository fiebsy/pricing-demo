// =============================================================================
// Minimized Header
// =============================================================================
// Compact header shown when the panel is minimized.
// Shows title and expand button.
// =============================================================================

'use client'

import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import { cx } from '@/components/utils/cx'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { usePanelContext } from '../context'

interface MinimizedHeaderProps {
  title: string
  className?: string
}

export function MinimizedHeader({ title, className }: MinimizedHeaderProps) {
  const { toggleMinimized } = usePanelContext()

  return (
    <button
      type="button"
      onClick={toggleMinimized}
      className={cx(
        'bg-primary border-primary flex items-center justify-center rounded-lg border p-2 shadow-lg',
        'hover:bg-secondary transition-colors duration-150',
        'focus:ring-brand focus:ring-2 focus:outline-none',
        'motion-reduce:transition-none',
        className
      )}
      title={title}
    >
      <HugeIcon icon={Add01Icon} size={16} strokeWidth={2} className="text-secondary" />
    </button>
  )
}
