/**
 * Select - Main Component
 *
 * Dropdown select component styled to match the Menu component.
 * Built on Base UI Select primitive for accessibility.
 *
 * Unlike Menu (action-based), Select is value-based - it maintains
 * a selected value that can be used in forms or state.
 *
 * @module prod/base/select/select
 */

'use client'

import React, { useMemo, useRef, useState } from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'

import './select-transitions.css'
import type {
  SelectProps,
  SelectOption,
  SelectItem,
  SelectSide,
  SelectAlign,
} from './types'
import {
  DEFAULT_APPEARANCE,
  DEFAULT_SELECT_WIDTH,
  DEFAULT_POPUP_WIDTH,
  DEFAULT_SIDE_OFFSET,
  REVEAL_ANIMATION,
  USE_LEGACY_ANIMATION,
  Z_INDEX,
  getPopupClasses,
  getGradientStyles,
  getItemRadius,
  getRevealAnimationClasses,
  getSeparatorClasses,
  SELECT_ITEM_STYLES,
  INTERACTIVE_STATES,
  EASING_EXPO_OUT,
} from './config'

// ============================================================================
// Reveal Animation Hook (Legacy - matches Menu pattern)
// ============================================================================

function useRevealAnimationLegacy(isOpen: boolean, sideOffset: number) {
  const idRef = useRef(`select-${Math.random().toString(36).substr(2, 9)}`)
  const uniqueClass = `select-popup-${idRef.current}`

  const animationCss = useMemo(() => {
    if (!isOpen) return ''

    const { duration, scaleStart, scaleEnd, slideOffsetRatio } = REVEAL_ANIMATION
    const easing = EASING_EXPO_OUT
    const slideOffset = Math.round(sideOffset * slideOffsetRatio)

    const keyframe = `select-reveal-${idRef.current}`
    const opacityKeyframe = `select-opacity-${idRef.current}`

    return `
      .${uniqueClass}[data-side="bottom"][data-open] {
        transform-origin: var(--transform-origin) !important;
        animation: ${keyframe}-bottom ${duration}ms ${easing} both,
                   ${opacityKeyframe} ${duration}ms ${easing} both !important;
      }
      .${uniqueClass}[data-side="top"][data-open] {
        transform-origin: var(--transform-origin) !important;
        animation: ${keyframe}-top ${duration}ms ${easing} both,
                   ${opacityKeyframe} ${duration}ms ${easing} both !important;
      }
      @keyframes ${keyframe}-bottom {
        from { transform: scale(${scaleStart}) translateY(-${slideOffset}px); }
        to { transform: scale(${scaleEnd}) translateY(0); }
      }
      @keyframes ${keyframe}-top {
        from { transform: scale(${scaleStart}) translateY(${slideOffset}px); }
        to { transform: scale(${scaleEnd}) translateY(0); }
      }
      @keyframes ${opacityKeyframe} {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `
  }, [isOpen, sideOffset, uniqueClass])

  return { uniqueClass, animationCss }
}

// ============================================================================
// Helper: Type Guards
// ============================================================================

function isOptionGroup(item: SelectItem): item is { type: 'group'; label: string; options: SelectOption[] } {
  return 'type' in item && item.type === 'group'
}

function isSeparator(item: SelectItem): item is { type: 'separator'; id: string } {
  return 'type' in item && item.type === 'separator'
}

function isOption(item: SelectItem): item is SelectOption {
  // An item is an option if it doesn't have a 'type' property,
  // OR if it has 'type' but also has a 'value' (shouldn't happen with proper types)
  if (!('type' in item)) return true
  // Check if it has a value property (for cases where type might be incorrectly set)
  return 'value' in item && typeof (item as SelectOption).value === 'string'
}

// ============================================================================
// Option Item Component
// ============================================================================

const baseItemStyles = cn(
  'flex cursor-pointer items-center justify-between',
  INTERACTIVE_STATES.hover,
  INTERACTIVE_STATES.focusVisible,
  INTERACTIVE_STATES.active,
  INTERACTIVE_STATES.highlighted,
  'corner-squircle transition-colors duration-150',
  'motion-reduce:transition-none',
  'relative outline-none select-none',
  SELECT_ITEM_STYLES.paddingX,
  SELECT_ITEM_STYLES.minHeight,
  SELECT_ITEM_STYLES.textSize
)

interface SelectOptionItemProps {
  option: SelectOption
  itemRadius: number
}

const SelectOptionItem: React.FC<SelectOptionItemProps> = ({ option, itemRadius }) => {
  return (
    <BaseSelect.Item
      value={option.value}
      disabled={option.disabled}
      className={cn(
        baseItemStyles,
        'text-primary',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
      )}
      style={{ borderRadius: `${itemRadius}px` }}
    >
      <div className={cn('flex min-w-0 flex-1 items-center', SELECT_ITEM_STYLES.iconGap)}>
        {option.icon && (
          <HugeIcon
            icon={option.icon}
            size={SELECT_ITEM_STYLES.iconSize}
            strokeWidth={SELECT_ITEM_STYLES.iconStrokeWidth}
            className={cn(SELECT_ITEM_STYLES.iconColor, 'opacity-50 shrink-0')}
          />
        )}
        <div className="flex-1 min-w-0">
          <BaseSelect.ItemText className="truncate block">
            {option.label}
          </BaseSelect.ItemText>
          {option.description && (
            <div className="text-xs font-normal text-tertiary mt-0.5 truncate">
              {option.description}
            </div>
          )}
        </div>
      </div>
      <BaseSelect.ItemIndicator className="shrink-0">
        <HugeIcon
          icon={Tick02Icon}
          size={SELECT_ITEM_STYLES.iconSize}
          strokeWidth={2.5}
          className="text-brand-solid"
        />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Select - Dropdown select component
 *
 * Features:
 * - Reveal animation matching Menu component
 * - Same appearance system (shine, shadow, squircle, gradient)
 * - Groups and separators support
 * - Icon support on options
 * - Controlled and uncontrolled modes
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select...',
  trigger,
  width = DEFAULT_SELECT_WIDTH,
  popupWidth = DEFAULT_POPUP_WIDTH,
  side = 'bottom',
  align = 'start',
  sideOffset = DEFAULT_SIDE_OFFSET,
  alignOffset = 0,
  disabled,
  required,
  name,
  onOpenChange: externalOnOpenChange,
  appearance,
  className,
  triggerClassName,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // Reveal animation
  const legacyAnimation = useRevealAnimationLegacy(isOpen, sideOffset)
  const revealClasses = useMemo(() => getRevealAnimationClasses(), [])

  // Configuration
  const mergedAppearance = useMemo(
    () => ({ ...DEFAULT_APPEARANCE, ...appearance }),
    [appearance]
  )

  // Handlers
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    externalOnOpenChange?.(open)
  }

  // Styling
  const popupClasses = getPopupClasses(mergedAppearance)
  const gradientStyles = getGradientStyles(mergedAppearance)
  const itemRadius = getItemRadius(mergedAppearance.borderRadius)

  // Compute popup width
  const computedPopupWidth = popupWidth === 'trigger' ? undefined : popupWidth

  // Flatten options to find selected label for display
  const flatOptions = useMemo(() => {
    const flat: SelectOption[] = []
    for (const item of options) {
      if (isOptionGroup(item)) {
        flat.push(...item.options)
      } else if (isOption(item)) {
        flat.push(item)
      }
    }
    return flat
  }, [options])

  return (
    <>
      {/* Inject reveal animation CSS (legacy mode only) */}
      {USE_LEGACY_ANIMATION && isOpen && legacyAnimation.animationCss && (
        <style>{legacyAnimation.animationCss}</style>
      )}

      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange ? (val) => onValueChange(val as string) : undefined}
        onOpenChange={handleOpenChange ? (open) => handleOpenChange(open) : undefined}
        disabled={disabled}
        required={required}
        name={name}
      >
        {trigger ? (
          <BaseSelect.Trigger
            aria-label={ariaLabel}
            className={cn('outline-none focus:outline-none', triggerClassName)}
          >
            {trigger}
          </BaseSelect.Trigger>
        ) : (
          <BaseSelect.Trigger
            aria-label={ariaLabel}
            className={cn(
              'inline-flex items-center justify-between gap-2',
              'px-3 py-2 rounded-lg',
              'bg-primary border border-primary',
              'text-sm text-primary',
              'hover:bg-secondary transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'motion-reduce:transition-none',
              triggerClassName
            )}
            style={{ width }}
          >
            <BaseSelect.Value>
              {(selectedValue: string | null) => {
                if (!selectedValue) {
                  return <span className="text-tertiary">{placeholder}</span>
                }
                const selected = flatOptions.find(o => o.value === selectedValue)
                return selected?.label || selectedValue
              }}
            </BaseSelect.Value>
            <BaseSelect.Icon className="shrink-0">
              <HugeIcon
                icon={ArrowDown01Icon}
                size={16}
                strokeWidth={2}
                className="text-tertiary transition-transform duration-150 data-[popup-open]:rotate-180"
              />
            </BaseSelect.Icon>
          </BaseSelect.Trigger>
        )}

        <BaseSelect.Portal>
          <BaseSelect.Positioner
            side={side as SelectSide}
            align={align as SelectAlign}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            collisionPadding={8}
            style={{ zIndex: Z_INDEX.SELECT_POSITIONER }}
          >
            <BaseSelect.Popup
              data-select-popup=""
              data-state={isOpen ? 'open' : 'closed'}
              data-side={side}
              className={cn(
                'overflow-hidden p-1',
                USE_LEGACY_ANIMATION ? legacyAnimation.uniqueClass : revealClasses,
                'motion-reduce:animate-none motion-reduce:transition-none',
                popupClasses,
                className
              )}
              style={{
                width: computedPopupWidth,
                minWidth: popupWidth === 'trigger' ? 'var(--anchor-width)' : undefined,
                '--select-item-radius': `${itemRadius}px`,
                ...gradientStyles,
              } as React.CSSProperties}
            >
              <div className="flex flex-col gap-1">
                {options.map((item, index) => {
                  // Separator
                  if (isSeparator(item)) {
                    return (
                      <div
                        key={item.id}
                        role="separator"
                        className={getSeparatorClasses()}
                      />
                    )
                  }

                  // Group
                  if (isOptionGroup(item)) {
                    return (
                      <BaseSelect.Group key={`group-${index}`}>
                        <BaseSelect.GroupLabel
                          className="text-tertiary px-2 py-1.5 text-xs font-semibold uppercase tracking-wide"
                        >
                          {item.label}
                        </BaseSelect.GroupLabel>
                        <div className="flex flex-col gap-1">
                          {item.options.map((option) => (
                            <SelectOptionItem
                              key={option.value}
                              option={option}
                              itemRadius={itemRadius}
                            />
                          ))}
                        </div>
                      </BaseSelect.Group>
                    )
                  }

                  // Regular option
                  if (isOption(item)) {
                    return (
                      <SelectOptionItem
                        key={item.value}
                        option={item}
                        itemRadius={itemRadius}
                      />
                    )
                  }

                  return null
                })}
              </div>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </>
  )
}

Select.displayName = 'Select'
