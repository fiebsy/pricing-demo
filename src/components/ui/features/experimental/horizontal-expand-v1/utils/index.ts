/**
 * Horizontal Expand V1 - Utility Exports
 */

export { getSlotContainerClipPath, getBackdropClipPath } from './clip-path'

// ============================================================================
// BACKGROUND HELPERS
// ============================================================================

import type { BackgroundOption, BorderColorOption } from '../types'

/**
 * Get Tailwind background class for a background option.
 */
export function getBackgroundClass(background: BackgroundOption): string {
  switch (background) {
    case 'primary':
      return 'bg-primary'
    case 'secondary':
      return 'bg-secondary'
    case 'tertiary':
      return 'bg-tertiary'
    case 'quaternary':
      return 'bg-quaternary'
    case 'none':
    default:
      return ''
  }
}

/**
 * Get CSS variable for a border color option.
 */
export function getBorderColorVar(color: BorderColorOption): string {
  switch (color) {
    case 'primary':
      return 'var(--color-border-primary)'
    case 'secondary':
      return 'var(--color-border-secondary)'
    case 'tertiary':
      return 'var(--color-border-tertiary)'
    case 'quaternary':
      return 'var(--color-border-quaternary)'
    case 'brand':
      return 'var(--color-border-brand)'
    default:
      return 'var(--color-border-primary)'
  }
}
