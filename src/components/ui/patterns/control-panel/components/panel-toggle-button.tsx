// =============================================================================
// Panel Toggle Button
// =============================================================================
// Unified toggle button with animated plus/minus icon.
// Used for both minimized and expanded states to prevent layout shift.
// =============================================================================

'use client'

import { motion } from 'motion/react'
import { cx } from '@/components/utils/cx'

// -----------------------------------------------------------------------------
// Animated Plus/Minus Icon
// -----------------------------------------------------------------------------
// The vertical line rotates 90° to create the plus → minus transition

interface AnimatedToggleIconProps {
  isExpanded: boolean
  size?: number
}

function AnimatedToggleIcon({ isExpanded, size = 14 }: AnimatedToggleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className="text-secondary pointer-events-none"
    >
      {/* Horizontal line (always visible) */}
      <motion.line
        x1="3"
        y1="7"
        x2="11"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Vertical line - rotates to become horizontal (disappears visually) */}
      <motion.line
        x1="7"
        y1="3"
        x2="7"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        initial={false}
        animate={{
          rotate: isExpanded ? 90 : 0,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{
          rotate: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.15, ease: 'easeOut' },
        }}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  )
}

// -----------------------------------------------------------------------------
// Panel Toggle Button
// -----------------------------------------------------------------------------

interface PanelToggleButtonProps {
  isExpanded: boolean
  onClick: () => void
  title?: string
  className?: string
  /** Visual variant - affects background/border styling */
  variant?: 'standalone' | 'inline'
}

export function PanelToggleButton({
  isExpanded,
  onClick,
  title = 'Toggle panel',
  className,
  variant = 'inline',
}: PanelToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'flex items-center justify-center',
        'transition-all duration-150',
        'focus:outline-none',
        'motion-reduce:transition-none',
        'active:scale-95',
        // Variant-specific styles
        variant === 'standalone' && [
          'size-8 rounded-full bg-primary shine-2 shadow-lg',
          'hover:bg-secondary',
        ],
        variant === 'inline' && [
          'rounded-lg text-tertiary hover:text-secondary p-1.5',
          'hover:bg-secondary',
        ],
        className
      )}
      title={title}
      aria-label={isExpanded ? 'Minimize panel' : 'Expand panel'}
      aria-expanded={isExpanded}
    >
      <AnimatedToggleIcon isExpanded={isExpanded} />
    </button>
  )
}
