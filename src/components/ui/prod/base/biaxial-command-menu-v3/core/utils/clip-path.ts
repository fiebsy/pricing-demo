/**
 * Biaxial Command Menu V3 - Clip Path Utilities
 *
 * Functions for calculating clip-path values for biaxial animations.
 */

/**
 * Get clip-path for content layer biaxial animation (center anchor)
 *
 * @param expanded - Whether the menu is expanded
 * @param panelWidth - Total panel width in pixels
 * @param panelHeight - Total panel height in pixels
 * @param inputWidth - Input trigger width in pixels
 * @param inputHeight - Input trigger height in pixels
 * @param expandedRadius - Border radius string for expanded state
 * @param collapsedRadius - Border radius string for collapsed state
 * @returns CSS clip-path value
 */
export function getClipPath(
  expanded: boolean,
  panelWidth: number,
  panelHeight: number,
  inputWidth: number,
  inputHeight: number,
  expandedRadius: string,
  collapsedRadius: string
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${expandedRadius})`
  }

  const sideInset = (panelWidth - inputWidth) / 2
  const bottomInset = panelHeight - inputHeight

  return `inset(0 ${sideInset}px ${bottomInset}px ${sideInset}px round ${collapsedRadius})`
}

/**
 * Get clip-path for backdrop in clip-path mode
 * Similar to content clip-path but can include scale offset
 *
 * @param expanded - Whether the menu is expanded
 * @param panelWidth - Total panel width in pixels
 * @param panelHeight - Total panel height in pixels (including backdrop offset)
 * @param inputWidth - Input trigger width in pixels
 * @param inputHeight - Input trigger height in pixels
 * @param expandedRadius - Border radius string for expanded state
 * @param collapsedRadius - Border radius string for collapsed state
 * @param backdropTopOffset - Top offset for the backdrop layer
 * @returns CSS clip-path value
 */
export function getBackdropClipPath(
  expanded: boolean,
  panelWidth: number,
  panelHeight: number,
  inputWidth: number,
  inputHeight: number,
  expandedRadius: string,
  collapsedRadius: string,
  backdropTopOffset: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${expandedRadius})`
  }

  // Calculate insets to show only the input area
  const sideInset = (panelWidth - inputWidth) / 2
  // Account for backdropTopOffset in collapsed state
  const topInset = backdropTopOffset
  const bottomInset = panelHeight + backdropTopOffset - inputHeight

  return `inset(${topInset}px ${sideInset}px ${bottomInset}px ${sideInset}px round ${collapsedRadius})`
}

/**
 * Get clip-path for menu container biaxial animation
 * Expands from specified origin (top, center, bottom)
 *
 * NOTE: We don't use `round` in clip-path because it creates standard
 * circular corners that conflict with the element's borderRadius and
 * corner-squircle class. The element's own border-radius handles corners.
 *
 * @param expanded - Whether the menu is expanded
 * @param origin - Expansion origin point ('top' | 'center' | 'bottom')
 * @returns CSS clip-path value
 */
export function getMenuContainerClipPath(
  expanded: boolean,
  origin: 'top' | 'center' | 'bottom'
): string {
  if (expanded) {
    // No round - let borderRadius and corner-squircle handle corners
    return `inset(0 0 0 0)`
  }

  // Collapsed state - insets based on origin
  switch (origin) {
    case 'top':
      // Expand downward from top: collapse bottom inset to 100%
      return `inset(0 0 100% 0)`
    case 'bottom':
      // Expand upward from bottom: collapse top inset to 100%
      return `inset(100% 0 0 0)`
    case 'center':
    default:
      // Expand from center: collapse all insets to 50%
      return `inset(50% 0 50% 0)`
  }
}
