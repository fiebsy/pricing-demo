/**
 * Filter Menu Preview Component
 *
 * Wraps the FilterMenu and FilterTrigger with playground configuration support.
 * Supports icon-only mode and all trigger/menu customizations.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/filter-menu
 */

'use client'

import React, { useMemo, useState, useCallback } from 'react'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import FilterIcon from '@hugeicons-pro/core-stroke-rounded/FilterIcon'
import FilterAddIcon from '@hugeicons-pro/core-stroke-rounded/FilterAddIcon'
import FilterMailCircleIcon from '@hugeicons-pro/core-stroke-rounded/FilterMailCircleIcon'
import FilterHorizontalIcon from '@hugeicons-pro/core-stroke-rounded/FilterHorizontalIcon'

import { ExpandVerticalArrows } from '@/components/ui/core/primitives/icons/expand-vertical-arrows'

import type { TriggerIconId, DatePickerPeriod, DatePickerGroup } from '../config/types'

import { cn } from '@/lib/utils'
import { Menu } from '@/components/ui/core/primitives/menu'
import type { MenuItemType, MenuItemSubmenu, MenuItemAction } from '@/components/ui/core/primitives/menu'
import { FilterTrigger } from '@/components/ui/patterns/filter'
import { FilterMenuHeader } from '@/components/ui/patterns/filter/filter-menu/filter-menu-header'
import { Button } from '@/components/ui/core/primitives/button'
import { HugeIcon } from '@/components/ui/core/primitives/icon'

import type { FilterMenuConfig, DatePickerConfig } from '../config/types'

// ============================================================================
// Icon Mapping
// ============================================================================

const TRIGGER_ICONS: Record<TriggerIconId, typeof Add01Icon> = {
  'add-01': Add01Icon,
  'filter': FilterIcon,
  'filter-add': FilterAddIcon,
  'filter-mail-circle': FilterMailCircleIcon,
  'filter-horizontal': FilterHorizontalIcon,
}

// ============================================================================
// Types
// ============================================================================

export interface FilterMenuPreviewProps {
  config: FilterMenuConfig
  className?: string
}

// ============================================================================
// Icon-Only Trigger Component
// ============================================================================

interface IconOnlyTriggerProps {
  isOpen?: boolean
  variant: 'default' | 'ghost' | 'outline'
  size: 'sm' | 'md' | 'lg'
  rounded: 'md' | 'lg' | 'xl' | 'full'
  icon: TriggerIconId
  onClick?: () => void
}

const SIZE_CONFIG = {
  sm: { button: 32, icon: 16 },
  md: { button: 40, icon: 20 },
  lg: { button: 48, icon: 24 },
} as const

const ROUNDED_CLASS = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const

const IconOnlyTrigger: React.FC<IconOnlyTriggerProps> = ({
  isOpen,
  variant,
  size,
  rounded,
  icon,
  onClick,
}) => {
  const sizeConfig = SIZE_CONFIG[size]
  const roundedClass = ROUNDED_CLASS[rounded]
  const IconComponent = TRIGGER_ICONS[icon] ?? Add01Icon

  // Default variant uses Button with shine
  if (variant === 'default') {
    return (
      <Button
        variant="shine"
        size={size}
        roundness={rounded === 'full' ? 'pill' : 'default'}
        iconLeading={IconComponent}
        onClick={onClick}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={cn(
          'aspect-square !p-0',
          isOpen && [
            'scale-[0.98] bg-tertiary text-primary',
            'hover:bg-tertiary hover:text-primary',
            '[&_[data-icon]]:text-fg-tertiary hover:[&_[data-icon]]:text-fg-tertiary',
          ]
        )}
        style={{ width: sizeConfig.button, height: sizeConfig.button }}
      />
    )
  }

  // Ghost and outline variants
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={onClick}
      className={cn(
        // Base
        'group relative inline-flex cursor-pointer items-center justify-center',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline-brand',
        roundedClass,

        // Variant: ghost
        variant === 'ghost' && [
          'bg-transparent',
          !isOpen && 'text-secondary hover:bg-quaternary hover:text-primary',
          isOpen && 'bg-quaternary text-primary',
        ],

        // Variant: outline
        variant === 'outline' && [
          'bg-transparent border border-primary',
          !isOpen && 'text-secondary hover:bg-quaternary hover:text-primary',
          isOpen && 'bg-quaternary text-primary',
        ],

        // Transition & press animation
        'transition-all duration-150 ease-out',
        'active:scale-95',
        isOpen && 'scale-95',
        'motion-reduce:transition-none motion-reduce:transform-none'
      )}
      style={{ width: sizeConfig.button, height: sizeConfig.button }}
    >
      <HugeIcon
        icon={IconComponent}
        size={sizeConfig.icon}
        strokeWidth={1.5}
        className={cn(
          'pointer-events-none shrink-0 text-fg-quaternary',
          !isOpen && 'group-hover:text-fg-tertiary'
        )}
      />
    </button>
  )
}

// ============================================================================
// Date Picker Trigger Component
// ============================================================================

interface DatePickerTriggerProps {
  isOpen?: boolean
  label: string
  variant: 'default' | 'ghost' | 'outline'
  size: 'sm' | 'md' | 'lg'
  rounded: 'md' | 'lg' | 'xl' | 'full'
  onClick?: () => void
}

const DatePickerTrigger: React.FC<DatePickerTriggerProps> = ({
  isOpen,
  label,
  variant,
  size,
  rounded,
  onClick,
}) => {
  const sizeConfig = SIZE_CONFIG[size]
  const roundedClass = ROUNDED_CLASS[rounded]
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'

  // Ghost variant pill trigger with text + chevron
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={onClick}
      className={cn(
        // Base
        'group relative inline-flex cursor-pointer items-center justify-center gap-1.5 px-3',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 outline-brand',
        roundedClass,
        textSize,
        'font-medium',

        // Variant: ghost (default for date-picker)
        variant === 'ghost' && [
          'bg-transparent',
          !isOpen && 'text-secondary hover:bg-quaternary hover:text-primary',
          isOpen && 'bg-quaternary text-primary',
        ],

        // Variant: outline
        variant === 'outline' && [
          'bg-transparent border border-primary',
          !isOpen && 'text-secondary hover:bg-quaternary hover:text-primary',
          isOpen && 'bg-quaternary text-primary',
        ],

        // Variant: default (shine-like appearance)
        variant === 'default' && [
          'bg-secondary',
          !isOpen && 'text-primary hover:bg-tertiary',
          isOpen && 'bg-tertiary text-primary',
        ],

        // Transition & press animation
        'transition-all duration-150 ease-out',
        'active:scale-95',
        isOpen && 'scale-95',
        'motion-reduce:transition-none motion-reduce:transform-none',

        // Arrow animation trigger
        isOpen && 'expand-arrows-active'
      )}
      style={{ height: sizeConfig.button }}
    >
      <span className="whitespace-nowrap">{label}</span>
      <ExpandVerticalArrows
        size={size === 'sm' ? 14 : 16}
        className={cn(
          'pointer-events-none shrink-0 text-fg-quaternary',
          !isOpen && 'group-hover:text-fg-tertiary'
        )}
      />
    </button>
  )
}

// ============================================================================
// Date Picker Selection Indicator
// ============================================================================

interface SelectionIndicatorDotProps {
  visible: boolean
}

const SelectionIndicatorDot: React.FC<SelectionIndicatorDotProps> = ({ visible }) => {
  if (!visible) return null
  return (
    <div className="w-2 h-2 rounded-full bg-brand-solid flex-shrink-0" />
  )
}

// ============================================================================
// Date Picker Preview Component
// ============================================================================

interface DatePickerPreviewProps {
  config: FilterMenuConfig
  datePicker: DatePickerConfig
  className?: string
  onPeriodSelect?: (periodId: string) => void
}

const DatePickerPreview: React.FC<DatePickerPreviewProps> = ({
  config,
  datePicker,
  className,
  onPeriodSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // Group periods by their group type
  const groupedPeriods = useMemo(() => {
    const groups: Record<DatePickerGroup, DatePickerPeriod[]> = {
      recent: [],
      range: [],
      all: [],
    }
    datePicker.periods.forEach((period) => {
      groups[period.group].push(period)
    })
    return groups
  }, [datePicker.periods])

  // Transform periods to menu items with separators
  const menuItems = useMemo<MenuItemType[]>(() => {
    const items: MenuItemType[] = []
    const groupOrder: DatePickerGroup[] = ['recent', 'range', 'all']

    groupOrder.forEach((groupName, groupIndex) => {
      const periodsInGroup = groupedPeriods[groupName]
      if (periodsInGroup.length === 0) return

      // Add separator between groups (not before first)
      if (groupIndex > 0 && items.length > 0) {
        items.push({ id: `separator-${groupName}`, type: 'separator' })
      }

      // Add items for this group
      periodsInGroup.forEach((period) => {
        items.push({
          id: period.id,
          label: period.label,
          type: 'action',
          selected: period.id === datePicker.selectedPeriod,
          // Custom render for selection indicator
          ...(datePicker.selectionIndicator === 'dot' && period.id === datePicker.selectedPeriod
            ? { iconTrailing: () => <SelectionIndicatorDot visible={true} /> }
            : {}),
        } as MenuItemAction)
      })
    })

    return items
  }, [groupedPeriods, datePicker.selectedPeriod, datePicker.selectionIndicator])

  // Handle period selection
  const handleSelect = useCallback((item: MenuItemAction) => {
    onPeriodSelect?.(item.id)
  }, [onPeriodSelect])

  // Get selected period label for trigger
  const selectedLabel = useMemo(() => {
    const period = datePicker.periods.find((p) => p.id === datePicker.selectedPeriod)
    return period?.label ?? config.trigger.label
  }, [datePicker.periods, datePicker.selectedPeriod, config.trigger.label])

  // Build trigger
  const trigger = useMemo(() => (
    <DatePickerTrigger
      isOpen={isOpen}
      label={selectedLabel}
      variant={config.trigger.variant}
      size={config.trigger.size}
      rounded={config.trigger.rounded}
    />
  ), [isOpen, selectedLabel, config.trigger])

  // Build header
  const header = config.menu.showHeader ? (
    <div className="px-3 py-2 text-xs font-medium text-tertiary">
      Period
    </div>
  ) : undefined

  return (
    <div className={cn('inline-flex', className)}>
      <Menu
        items={menuItems}
        trigger={trigger}
        header={header}
        width={config.menu.width}
        side={config.menu.side}
        align={config.menu.align}
        sideOffset={config.menu.sideOffset}
        alignOffset={config.menu.alignOffset}
        onOpenChange={setIsOpen}
        onSelect={handleSelect}
        appearance={config.menu.appearance}
        animation={config.animation}
        features={{ submenu: false }} // Flat menu, no slide animation
        unifiedHover={config.unifiedHover}
      />
    </div>
  )
}

// ============================================================================
// Table Filter Preview Component (Original)
// ============================================================================

interface TableFilterPreviewProps {
  config: FilterMenuConfig
  className?: string
}

const TableFilterPreview: React.FC<TableFilterPreviewProps> = ({
  config,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([])

  // Transform config items to Menu items format
  const menuItems = useMemo<MenuItemType[]>(() => {
    if (!config.items) return []
    return config.items.map((item) => ({
      id: item.id,
      label: item.label,
      type: 'submenu' as const,
      icon: item.icon,
      items: item.options.map((opt) => ({
        id: opt.id,
        label: opt.label,
        selected: activeFilterIds.includes(opt.id),
      })),
      activeCount: item.options.filter((opt) =>
        activeFilterIds.includes(opt.id)
      ).length,
    })) as MenuItemSubmenu[]
  }, [config.items, activeFilterIds])

  // Handle filter selection
  const handleFilterSelect = useCallback((filterId: string) => {
    setActiveFilterIds((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    )
  }, [])

  // Build trigger based on mode
  const trigger = useMemo(() => {
    const IconComponent = TRIGGER_ICONS[config.trigger.icon] ?? Add01Icon

    if (config.trigger.mode === 'icon-only') {
      return (
        <IconOnlyTrigger
          isOpen={isOpen}
          variant={config.trigger.variant}
          size={config.trigger.size}
          rounded={config.trigger.rounded}
          icon={config.trigger.icon}
        />
      )
    }

    return (
      <FilterTrigger
        isOpen={isOpen}
        label={config.trigger.label}
        size={config.trigger.size}
        rounded={config.trigger.rounded}
        variant={config.trigger.variant}
        icon={IconComponent}
      />
    )
  }, [config.trigger, isOpen])

  // Build header if enabled
  const header = config.menu.showHeader ? <FilterMenuHeader /> : undefined

  return (
    <div className={cn('inline-flex', className)}>
      <Menu
        items={menuItems}
        trigger={trigger}
        header={header}
        width={config.menu.width}
        side={config.menu.side}
        align={config.menu.align}
        sideOffset={config.menu.sideOffset}
        alignOffset={config.menu.alignOffset}
        onOpenChange={setIsOpen}
        onSelect={(item) => handleFilterSelect(item.id)}
        appearance={config.menu.appearance}
        animation={config.animation}
        unifiedHover={config.unifiedHover}
      />
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export interface FilterMenuPreviewExternalProps {
  config: FilterMenuConfig
  className?: string
  onPeriodSelect?: (periodId: string) => void
}

export const FilterMenuPreview: React.FC<FilterMenuPreviewExternalProps> = ({
  config,
  className,
  onPeriodSelect,
}) => {
  // Branch by variant
  if (config.variant === 'date-picker' && config.datePicker) {
    return (
      <DatePickerPreview
        config={config}
        datePicker={config.datePicker}
        className={className}
        onPeriodSelect={onPeriodSelect}
      />
    )
  }

  // Default: table-filter variant
  return <TableFilterPreview config={config} className={className} />
}

FilterMenuPreview.displayName = 'FilterMenuPreview'
