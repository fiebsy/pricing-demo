/**
 * Add Filter Menu Component
 *
 * A unified filter menu built on RevealMenu (same as ProfileMenuDemo)
 * Ensures consistent animation and interaction patterns across all menu types.
 *
 * @module base-ui/filter/components/add-filter-menu
 */

'use client'

import { useState, useCallback } from 'react'

import {
  RevealMenu,
  type MenuAppearanceConfig,
  type MenuItem,
  type MenuSide,
  type MenuAlign,
} from '@/components/ui/menu'

import { FilterTriggerButton } from '../primitives'
import { FilterHeader } from './filter-header'
import { DEFAULT_FILTER_MENU_ITEMS } from '../data/filter-menu-items'
import type { FilterMenuStylingConfig } from '../types'

// ============================================================================
// Types
// ============================================================================

export interface AddFilterMenuProps {
  /** Menu styling configuration */
  config: FilterMenuStylingConfig
  /** Appearance configuration for the menu popup */
  appearance: MenuAppearanceConfig
  /** Optional custom menu items (defaults to DEFAULT_FILTER_MENU_ITEMS) */
  items?: MenuItem[]
  /** Optional callback when a filter is selected */
  onFilterSelect?: (filterId: string) => void
}

// ============================================================================
// Component
// ============================================================================

/**
 * AddFilterMenu - Filter selection using the unified RevealMenu system
 *
 * Uses the same RevealMenu component as ProfileMenuDemo, ensuring:
 * - Identical open/close reveal animation
 * - Same sliding panel transitions (1A ↔ 1B)
 * - Consistent height animation behavior
 * - Unified opacity crossfade effects
 */
export const AddFilterMenu: React.FC<AddFilterMenuProps> = ({
  config,
  appearance,
  items = DEFAULT_FILTER_MENU_ITEMS,
  onFilterSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  const panelDuration = config.panelTransitionDuration ?? 300
  const panelEasing = config.panelTransitionEasing ?? 'cubic-bezier(0.25, 1.2, 0.01, 1)'

  const slideTransition = {
    duration: panelDuration,
    easing: panelEasing,
  }

  const heightTransition = {
    duration: panelDuration,
    easing: panelEasing,
  }

  // Wrap items with onFilterSelect callback if provided
  const wrappedItems: MenuItem[] = onFilterSelect
    ? items.map((item) => {
        if (item.type === 'separator' || item.type === 'label') {
          return item
        }
        if (item.type === 'submenu') {
          return {
            ...item,
            items: item.items.map((subItem) => {
              if (subItem.type === 'separator' || subItem.type === 'label' || subItem.type === 'submenu') {
                return subItem
              }
              const actionItem = subItem
              return {
                ...actionItem,
                onClick: () => {
                  actionItem.onClick?.()
                  onFilterSelect(actionItem.id)
                },
              }
            }),
          }
        }
        return {
          ...item,
          onClick: () => {
            item.onClick?.()
            onFilterSelect(item.id)
          },
        }
      })
    : items

  return (
    <RevealMenu
      trigger={<FilterTriggerButton isOpen={isOpen} />}
      items={wrappedItems}
      side={config.side as MenuSide}
      align={config.align as MenuAlign}
      sideOffset={12}
      alignOffset={config.alignOffset}
      width={config.menuWidth}
      appearance={appearance}
      slideTransition={slideTransition}
      heightTransition={heightTransition}
      onOpenChange={handleOpenChange}
      heightAnimationEnabled={config.heightAnimationEnabled ?? true}
      opacityCrossfadeEnabled={config.opacityCrossfadeEnabled ?? true}
      opacityDurationRatio={config.opacityDurationRatio ?? 0.8}
      header={<FilterHeader />}
    />
  )
}
