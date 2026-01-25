/**
 * Layout Configuration
 *
 * Dimensions, breakpoints, and layout constants for Bento profile.
 *
 * @module b/profile-v2/config
 */

// =============================================================================
// LAYOUT DIMENSIONS
// =============================================================================

export const LAYOUT_CONFIG = {
  /** Width of the left panel (profile + edit panel) */
  leftPanelWidth: 320,

  /** Min width of left panel on smaller screens */
  leftPanelMinWidth: 280,

  /** Gap between left and right panels */
  panelGap: 24,

  /** Padding around the page */
  pagePadding: 24,

  /** Bottom padding to account for chat overlay */
  bottomPadding: 120,

  /** Top offset for header */
  headerHeight: 64,
} as const

// =============================================================================
// PROFILE PANEL
// =============================================================================

export const PROFILE_PANEL_CONFIG = {
  /** Avatar size in pixels */
  avatarSize: 120,

  /** Verified badge size */
  badgeSize: 24,

  /** Gap between elements */
  gap: 16,
} as const

// =============================================================================
// EDIT PANEL
// =============================================================================

export const EDIT_PANEL_CONFIG = {
  /** Height of the tab bar */
  tabBarHeight: 48,

  /** Tab indicator animation duration (ms) */
  tabIndicatorDuration: 200,

  /** Gap between categories */
  categoryGap: 8,

  /** Progress bar height */
  progressBarHeight: 6,
} as const

// =============================================================================
// BENTO GRID
// =============================================================================

export const BENTO_GRID_CONFIG = {
  /** Gap between grid items */
  gap: 16,

  /** Minimum card width */
  minCardWidth: 280,

  /** Card padding */
  cardPadding: 24,

  /** Card border radius */
  cardBorderRadius: 24,
} as const

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const BREAKPOINTS = {
  /** Mobile breakpoint */
  sm: 640,

  /** Tablet breakpoint */
  md: 768,

  /** Desktop breakpoint */
  lg: 1024,

  /** Large desktop breakpoint */
  xl: 1280,
} as const

// =============================================================================
// ANIMATION DURATIONS
// =============================================================================

export const ANIMATION_DURATIONS = {
  /** Fast animations (hover states) */
  fast: 150,

  /** Base animations (tab switches) */
  base: 200,

  /** Slow animations (score improvements) */
  slow: 300,

  /** Score toast auto-dismiss */
  toastDismiss: 4000,
} as const

// =============================================================================
// Z-INDEX LAYERS
// =============================================================================

export const Z_INDEX = {
  /** Base content */
  content: 1,

  /** Floating controls on hover */
  floatingControls: 10,

  /** Edit panel */
  editPanel: 20,

  /** Bottom toolbar */
  bottomToolbar: 30,

  /** Chat overlay backdrop */
  chatBackdrop: 40,

  /** Chat overlay content */
  chatOverlay: 50,

  /** Score toast */
  toast: 60,
} as const
