/**
 * StickyDataTable - Toolbar Factories
 *
 * Factory functions for creating toolbar configurations.
 *
 * @module config/factories/toolbar
 */

import type { ToolbarLayoutConfig, ToolbarConfig } from '../constants'
import { DEFAULT_TOOLBAR_LAYOUT } from '../constants'

// ============================================================================
// TOOLBAR LAYOUT FACTORY
// ============================================================================

/**
 * Create toolbar layout configuration with defaults
 * Note: leftCount and rightCount are runtime values, not returned in defaults
 */
export function createToolbarLayoutConfig(
  overrides?: Partial<ToolbarLayoutConfig>
): ToolbarLayoutConfig {
  return {
    ...DEFAULT_TOOLBAR_LAYOUT,
    ...overrides,
    integratedPadding: {
      ...DEFAULT_TOOLBAR_LAYOUT.integratedPadding,
      ...overrides?.integratedPadding,
    },
  }
}

// ============================================================================
// TOOLBAR CONFIG FACTORY
// ============================================================================

/**
 * Create default toolbar configuration
 */
export function createToolbarConfig(overrides?: Partial<ToolbarConfig>): ToolbarConfig {
  return {
    showToolbar: false,
    showLeftToolbar: false,
    showRightToolbar: false,
    showExportButton: false,
    showColumnControl: false,
    showCount: false,
    activeFilterCount: 0,
    layout: createToolbarLayoutConfig(overrides?.layout),
    ...overrides,
  }
}

// ============================================================================
// INFERENCE UTILITY
// ============================================================================

/**
 * Infer toolbar configuration from StickyDataTable props
 * Useful for creating matching skeleton configuration
 */
export function inferToolbarConfigFromProps(props: {
  leftToolbar?: unknown
  rightToolbar?: unknown
  exportAll?: unknown
  exportSelected?: unknown
  exportToolbar?: unknown
  showColumnControl?: boolean
  showCount?: boolean
}): ToolbarConfig {
  const showExportButton = !!(props.exportAll || props.exportSelected || props.exportToolbar)
  const showToolbar = !!(
    props.leftToolbar ||
    props.rightToolbar ||
    showExportButton ||
    props.showColumnControl ||
    props.showCount
  )

  return {
    showToolbar,
    showLeftToolbar: !!props.leftToolbar,
    showRightToolbar: !!props.rightToolbar,
    showExportButton,
    showColumnControl: props.showColumnControl ?? true,
    showCount: props.showCount ?? false,
    activeFilterCount: 0, // Can't infer from props alone
  }
}
