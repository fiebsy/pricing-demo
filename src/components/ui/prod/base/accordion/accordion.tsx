'use client'

/**
 * Accordion - Component
 *
 * A collapsible accordion built on Base UI Collapsible for accessibility.
 * This is the base component without animated navigation lines.
 *
 * For animated line features, see features/animated-line/
 *
 * @module prod/base/accordion
 *
 * @example
 * ```tsx
 * import { Accordion } from '@/components/ui/prod/base/accordion'
 * import FolderIcon from '@hugeicons-pro/core-stroke-rounded/Folder01Icon'
 *
 * <Accordion label="Documents" icon={FolderIcon} defaultExpanded>
 *   <Accordion.Item value="doc-1" href="/docs/one">Document One</Accordion.Item>
 *   <Accordion.Item value="doc-2" href="/docs/two">Document Two</Accordion.Item>
 * </Accordion>
 * ```
 */

import * as React from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Link from 'next/link'
import { Collapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import ArrowDown01Icon from '@hugeicons-pro/core-solid-rounded/ArrowDown01Icon'
import ArrowDown01IconBulk from '@hugeicons-pro/core-bulk-rounded/ArrowDown01Icon'

import type {
  AccordionProps,
  AccordionItemProps,
  AccordionContextValue,
  AccordionSize,
} from './types'
import { sizePresets, defaultAnimationDuration, styles } from './config'

// ============================================================================
// CONTEXT
// ============================================================================

const AccordionContext = createContext<AccordionContextValue | null>(null)

const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion.Item must be used within an Accordion')
  }
  return context
}

// ============================================================================
// ACCORDION ITEM
// ============================================================================

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  href,
  onClick,
  disabled,
  className,
}) => {
  const { itemHeight } = useAccordionContext()

  const content = (
    <span
      className={cn(styles.item.base, disabled && 'opacity-50 cursor-not-allowed', className)}
      style={{
        display: 'block',
        height: `${itemHeight}px`,
        paddingLeft: '8px',
        paddingRight: '8px',
        lineHeight: `${itemHeight}px`,
        borderRadius: '6px',
      }}
    >
      {children}
    </span>
  )

  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick} className="block">
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className="block w-full text-left"
    >
      {content}
    </button>
  )
}

// ============================================================================
// ACCORDION ROOT
// ============================================================================

const AccordionRoot: React.FC<AccordionProps> = ({
  label,
  icon,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  onLabelClick,
  toggleOnChevronOnly = false,
  showCount = true,
  size = 'default',
  triggerConfig = {},
  className,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)

  const isControlled = controlledExpanded !== undefined
  const isExpanded = isControlled ? controlledExpanded : internalExpanded

  // Get size preset
  const sizeConfig = sizePresets[size]

  // Merge trigger config
  const mergedTriggerConfig = useMemo(
    () => ({
      height: triggerConfig.height ?? sizeConfig.triggerHeight,
      paddingX: triggerConfig.paddingX ?? 8,
      paddingY: triggerConfig.paddingY ?? 4,
      fontSize: triggerConfig.fontSize ?? sizeConfig.triggerFontSize,
      borderRadius: triggerConfig.borderRadius ?? 6,
      showChevron: triggerConfig.showChevron ?? true,
    }),
    [triggerConfig, sizeConfig]
  )

  // Count children
  const childCount = React.Children.count(children)

  // Handle toggle
  const handleToggle = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setInternalExpanded(open)
      }
      onExpandedChange?.(open)
    },
    [isControlled, onExpandedChange]
  )

  // Handle label click (when toggleOnChevronOnly is true)
  const handleLabelClick = useCallback(
    (e: React.MouseEvent) => {
      if (toggleOnChevronOnly) {
        e.preventDefault()
        onLabelClick?.()
      }
    },
    [onLabelClick, toggleOnChevronOnly]
  )

  // Handle chevron click (when toggleOnChevronOnly is true)
  const handleChevronClick = useCallback(
    (e: React.MouseEvent) => {
      if (toggleOnChevronOnly) {
        e.stopPropagation()
        handleToggle(!isExpanded)
      }
    },
    [toggleOnChevronOnly, handleToggle, isExpanded]
  )

  // Context value
  const contextValue = useMemo<AccordionContextValue>(
    () => ({
      isExpanded,
      size,
      itemHeight: sizeConfig.itemHeight,
      itemGap: sizeConfig.itemGap,
    }),
    [isExpanded, size, sizeConfig]
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      <Collapsible.Root
        open={isExpanded}
        onOpenChange={handleToggle}
        className={className}
      >
        {/* Trigger */}
        <Collapsible.Trigger
          className={cn(styles.trigger.base)}
          style={{
            height: `${mergedTriggerConfig.height}px`,
            paddingLeft: `${mergedTriggerConfig.paddingX}px`,
            paddingRight: `${mergedTriggerConfig.paddingX}px`,
            paddingTop: `${mergedTriggerConfig.paddingY}px`,
            paddingBottom: `${mergedTriggerConfig.paddingY}px`,
            borderRadius: `${mergedTriggerConfig.borderRadius}px`,
          }}
          onClick={toggleOnChevronOnly ? handleLabelClick : undefined}
        >
          {icon != null && (
            <HugeIcon
              icon={icon}
              size={sizeConfig.iconSize}
              strokeWidth={1.5}
              className="text-tertiary shrink-0"
            />
          )}
          <span
            className="text-tertiary font-medium"
            style={{ fontSize: `${mergedTriggerConfig.fontSize}px` }}
          >
            {label}
          </span>
          {showCount && (
            <span
              className="text-tertiary/50 font-medium"
              style={{ fontSize: `${mergedTriggerConfig.fontSize}px` }}
            >
              {childCount}
            </span>
          )}
          {mergedTriggerConfig.showChevron && (
            <span
              className={cn(
                '-mr-1 rounded p-0.5',
                toggleOnChevronOnly && 'hover:bg-tertiary cursor-pointer'
              )}
              onClick={toggleOnChevronOnly ? handleChevronClick : undefined}
            >
              <HugeIcon
                icon={ArrowDown01Icon}
                size={16}
                strokeWidth={0}
                className={cn(
                  styles.chevron.base,
                  'text-tertiary group-hover:hidden block',
                  isExpanded ? styles.chevron.expanded : styles.chevron.collapsed
                )}
                style={{ transitionDuration: `${defaultAnimationDuration.chevron}ms` }}
              />
              <HugeIcon
                icon={ArrowDown01IconBulk}
                size={16}
                strokeWidth={0}
                className={cn(
                  styles.chevron.base,
                  'text-tertiary group-hover:block hidden',
                  isExpanded ? styles.chevron.expanded : styles.chevron.collapsed
                )}
                style={{ transitionDuration: `${defaultAnimationDuration.chevron}ms` }}
              />
            </span>
          )}
        </Collapsible.Trigger>

        {/* Content Panel */}
        <Collapsible.Panel
          className={cn(
            styles.content.base,
            // Base UI data attribute animations
            'h-0 transition-[height] duration-200 ease-in-out',
            'data-[open]:h-[var(--collapsible-panel-height)]',
            'data-[starting-style]:h-0',
            'data-[ending-style]:h-0'
          )}
        >
          <div
            className="flex flex-col pt-0.5"
            style={{
              paddingLeft: '8px',
              gap: `${sizeConfig.itemGap}px`,
            }}
          >
            {children}
          </div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </AccordionContext.Provider>
  )
}

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
})
