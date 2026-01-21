/**
 * Biaxial Command Menu V3 - Layout Utilities
 *
 * Functions for calculating panel dimensions, border radii, and gradient insets.
 */

import type { CommandMenuConfig, CalculatedRadii, GradientInsets } from '../types'

/**
 * Calculate the dynamic panel height based on content
 *
 * @param config - Menu configuration
 * @param itemCount - Number of items (excluding separators)
 * @param groupCount - Number of groups
 * @param isEmpty - Whether there are no results
 * @returns Calculated panel height in pixels
 */
export function calculatePanelHeight(
  config: CommandMenuConfig,
  itemCount: number,
  groupCount: number,
  isEmpty: boolean
): number {
  const inputHeight = config.inputHeight + config.inputTopPaddingExpanded

  if (isEmpty) {
    const emptyStateHeight = 80
    const minContentHeight =
      emptyStateHeight + config.innerPaddingTop + config.innerPaddingBottom
    return inputHeight + config.contentTopOffset + minContentHeight
  }

  const itemsHeight = itemCount * config.itemHeight
  const gapsHeight = Math.max(0, itemCount - 1) * config.itemGap
  const groupHeadersHeight = groupCount * 28
  const separatorsHeight = Math.max(0, groupCount - 1) * 8
  const padding = config.innerPaddingTop + config.innerPaddingBottom
  const scrollPadding = config.scrollPaddingTop + config.scrollPaddingBottom

  const contentHeight =
    itemsHeight +
    gapsHeight +
    groupHeadersHeight +
    separatorsHeight +
    padding +
    scrollPadding

  const calculatedHeight = inputHeight + config.contentTopOffset + contentHeight

  return Math.min(calculatedHeight, config.maxPanelHeight)
}

/**
 * Calculate adaptive inner radius based on inset depth
 *
 * @param outerRadius - Outer border radius
 * @param inset - Inset distance
 * @returns Calculated inner radius
 */
function calculateAdaptiveRadius(outerRadius: number, inset: number): number {
  if (inset <= 0) return outerRadius
  if (outerRadius <= 0) return 0

  const basicInner = outerRadius - inset
  const insetRatio = inset / outerRadius

  if (insetRatio <= 0.5) {
    return Math.max(0, basicInner)
  } else {
    const minRadius = outerRadius * 0.25
    const falloff = 1 - (insetRatio - 0.5) * 2
    return Math.max(minRadius * (1 - falloff), basicInner, 0)
  }
}

/**
 * Calculate all border radii for the component
 *
 * @param config - Menu configuration
 * @returns Calculated radii object
 */
export function calculateRadii(config: CommandMenuConfig): CalculatedRadii {
  const base = config.borderRadius
  const top = config.topBorderRadius ?? base
  const menuBottom = config.menuBorderRadius ?? base
  const containerInset = config.menuContainerInset

  const syncedRadius = calculateAdaptiveRadius(menuBottom, containerInset)

  const menuTop = config.syncMenuContainerRadius
    ? syncedRadius
    : (config.menuTopBorderRadius ?? 0)
  const containerBottom = config.syncMenuContainerRadius
    ? syncedRadius
    : (config.menuContainerBottomRadius ?? menuBottom)

  return {
    backdrop: `${top}px ${top}px ${menuBottom}px ${menuBottom}px`,
    menuContainer: `${menuTop}px ${menuTop}px ${containerBottom}px ${containerBottom}px`,
    clipExpanded:
      top !== menuBottom
        ? `${top}px ${top}px ${menuBottom}px ${menuBottom}px`
        : `${base}px`,
    clipCollapsed: `${base}px`,
    raw: { base, top, menuBottom, menuTop, containerBottom, syncedRadius },
  }
}

/**
 * Calculate gradient insets based on configuration
 *
 * @param config - Menu configuration
 * @returns Gradient insets object
 */
export function calculateGradientInsets(config: CommandMenuConfig): GradientInsets {
  if (config.syncGradientToScrollbar) {
    return {
      top: config.scrollbarMarginTop,
      bottom: config.scrollbarMarginBottom,
      left: config.gradientInsetLeft ?? 0,
      right: config.gradientInsetRight ?? 0,
    }
  }
  return {
    top: config.gradientInsetTop ?? 0,
    bottom: config.gradientInsetBottom ?? 0,
    left: config.gradientInsetLeft ?? 0,
    right: config.gradientInsetRight ?? 0,
  }
}

/**
 * Calculate the item border radius based on panel radius and inner padding
 *
 * @param borderRadius - Panel border radius
 * @param innerPaddingLeft - Left inner padding
 * @param innerPaddingRight - Right inner padding
 * @returns Item border radius in pixels
 */
export function calculateItemRadius(
  borderRadius: number,
  innerPaddingLeft: number,
  innerPaddingRight: number
): number {
  return Math.max(
    0,
    borderRadius - Math.min(innerPaddingLeft, innerPaddingRight)
  )
}
