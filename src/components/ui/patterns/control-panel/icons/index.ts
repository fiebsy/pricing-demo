// =============================================================================
// Section Icon Registry
// =============================================================================
// Pre-populated icon mappings for section types.
// Uses Hugeicons PRO - the exclusive icon library for PAYVA.
// =============================================================================

// Hugeicons PRO imports (stroke-rounded variant)
import TextFontIcon from '@hugeicons-pro/core-stroke-rounded/TextFontIcon'
import PaintBoardIcon from '@hugeicons-pro/core-stroke-rounded/PaintBoardIcon'
import BorderAll01Icon from '@hugeicons-pro/core-stroke-rounded/BorderAll01Icon'
import SquareIcon from '@hugeicons-pro/core-stroke-rounded/SquareIcon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import PaintBrush02Icon from '@hugeicons-pro/core-stroke-rounded/PaintBrush02Icon'
import BlurIcon from '@hugeicons-pro/core-stroke-rounded/BlurIcon'
import Timer01Icon from '@hugeicons-pro/core-stroke-rounded/Timer01Icon'
import TransitionLeftIcon from '@hugeicons-pro/core-stroke-rounded/TransitionLeftIcon'
import DistributeVerticalCenterIcon from '@hugeicons-pro/core-stroke-rounded/DistributeVerticalCenterIcon'
import LayoutGridIcon from '@hugeicons-pro/core-stroke-rounded/LayoutGridIcon'
import RulerIcon from '@hugeicons-pro/core-stroke-rounded/RulerIcon'
import EyeIcon from '@hugeicons-pro/core-stroke-rounded/EyeIcon'
import Cursor01Icon from '@hugeicons-pro/core-stroke-rounded/Cursor01Icon'
import Touch01Icon from '@hugeicons-pro/core-stroke-rounded/Touch01Icon'
import Bug01Icon from '@hugeicons-pro/core-stroke-rounded/Bug01Icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import Settings01Icon from '@hugeicons-pro/core-stroke-rounded/Settings01Icon'
import MoreHorizontalIcon from '@hugeicons-pro/core-stroke-rounded/MoreHorizontalIcon'

import type { HugeIconData } from '@/components/ui/core/primitives/icon'
import type { SectionType } from './types'

// -----------------------------------------------------------------------------
// Icon Map
// -----------------------------------------------------------------------------

/**
 * Map of section types to their corresponding Hugeicons.
 * Each icon is imported from @hugeicons-pro/core-stroke-rounded.
 */
export const SECTION_ICON_MAP: Record<SectionType, HugeIconData> = {
  // Content sections
  typography: TextFontIcon,
  colors: PaintBoardIcon,
  borders: BorderAll01Icon,
  radius: SquareIcon,
  // Effects sections
  shine: SparklesIcon,
  gradients: PaintBrush02Icon,
  shadows: BlurIcon,
  // Motion sections
  animation: Timer01Icon,
  transitions: TransitionLeftIcon,
  // Layout sections
  spacing: DistributeVerticalCenterIcon,
  layout: LayoutGridIcon,
  sizing: RulerIcon,
  // State sections
  display: EyeIcon,
  states: Cursor01Icon,
  interactions: Touch01Icon,
  // Utility sections
  debug: Bug01Icon,
  preset: Tick02Icon,
  settings: Settings01Icon,
  custom: MoreHorizontalIcon,
}

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

/**
 * Get the icon for a section type.
 * Falls back to 'custom' icon if type is not found.
 */
export function getSectionIcon(sectionType: SectionType | undefined): HugeIconData {
  if (!sectionType) return SECTION_ICON_MAP.custom
  return SECTION_ICON_MAP[sectionType] ?? SECTION_ICON_MAP.custom
}

/**
 * Check if a section type has a mapped icon.
 */
export function hasSectionIcon(sectionType: SectionType | undefined): boolean {
  if (!sectionType) return false
  return sectionType in SECTION_ICON_MAP
}

// Re-export types
export type { SectionType } from './types'
