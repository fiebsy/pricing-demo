/**
 * Biaxial Command Menu V3 - Menu Content Component
 *
 * Scroll container with command list and overflow gradients.
 * Uses Base UI ScrollArea for native scroll with custom scrollbars
 * and dynamic overflow detection.
 */

'use client'

import * as React from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import {
  CommandList,
  type CommandListRef,
} from '@/components/ui/prod/base/biaxial-command-menu/components/command-list'
import type { CommandGroup, CommandItemAction, BackgroundOption, GradientInsets } from '../types'

export interface MenuContentProps {
  /** Ref to command list for keyboard navigation */
  listRef: React.RefObject<CommandListRef | null>
  /** Command groups */
  groups: CommandGroup[]
  /** Filter value */
  filter: string
  /** Called when item is selected */
  onSelect: (item: CommandItemAction) => void
  /** Item height */
  itemHeight: number
  /** Gap between items */
  itemGap: number
  /** Top gap above first item in each group */
  itemsTopGap?: number
  /** Empty state message */
  emptyMessage: string
  /** Scrollbar margin top */
  scrollbarMarginTop: number
  /** Scrollbar margin bottom */
  scrollbarMarginBottom: number
  /** Inner padding top */
  innerPaddingTop: number
  /** Inner padding bottom */
  innerPaddingBottom: number
  /** Inner padding left */
  innerPaddingLeft: number
  /** Inner padding right */
  innerPaddingRight: number
  /** Scroll padding top */
  scrollPaddingTop: number
  /** Scroll padding bottom */
  scrollPaddingBottom: number
  /** Enable overflow gradient */
  menuOverflowGradient: boolean
  /** Gradient height */
  menuOverflowGradientHeight: number
  /** Gradient insets */
  gradientInsets: GradientInsets
  /** Menu background for gradient color */
  menuBackground: BackgroundOption
  /** Enable debug mode */
  debug?: boolean
  // Item styling props
  /** Horizontal padding for items */
  itemPaddingX?: number
  /** Vertical padding for items */
  itemPaddingY?: number
  /** Border radius for items */
  itemBorderRadius?: number
  /** Background for highlighted item */
  itemHighlightBackground?: BackgroundOption
  /** Background for hovered item */
  itemHoverBackground?: BackgroundOption
  /** Icon size */
  itemIconSize?: number
  /** Gap between icon and text */
  itemIconGap?: number
  /** Icon opacity (0-100) */
  itemIconOpacity?: number
}

export const MenuContent: React.FC<MenuContentProps> = ({
  listRef,
  groups,
  filter,
  onSelect,
  itemHeight,
  itemGap,
  itemsTopGap,
  emptyMessage,
  scrollbarMarginTop,
  scrollbarMarginBottom,
  innerPaddingTop,
  innerPaddingBottom,
  innerPaddingLeft,
  innerPaddingRight,
  scrollPaddingTop,
  scrollPaddingBottom,
  menuOverflowGradient,
  menuOverflowGradientHeight,
  gradientInsets,
  menuBackground,
  debug,
  // Item styling
  itemPaddingX,
  itemPaddingY,
  itemBorderRadius,
  itemHighlightBackground,
  itemHoverBackground,
  itemIconSize,
  itemIconGap,
  itemIconOpacity,
}) => {
  const gradientBgColor = menuBackground === 'none' ? 'primary' : menuBackground

  return (
    <ScrollArea.Root
      className="relative h-full"
      style={{
        marginTop: scrollbarMarginTop,
        marginBottom: scrollbarMarginBottom,
        height: `calc(100% - ${scrollbarMarginTop + scrollbarMarginBottom}px)`,
      }}
    >
      {/* Viewport - the scrollable container */}
      <ScrollArea.Viewport
        className="h-full"
        style={{
          paddingTop: innerPaddingTop + scrollPaddingTop,
          paddingBottom: innerPaddingBottom + scrollPaddingBottom,
          ...(debug && {
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
          }),
        }}
      >
        <ScrollArea.Content>
          <div
            style={{
              paddingLeft: innerPaddingLeft,
              paddingRight: innerPaddingRight,
              ...(debug && {
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
              }),
            }}
          >
            <CommandList
              ref={listRef}
              groups={groups}
              filter={filter}
              onSelect={onSelect}
              itemHeight={itemHeight}
              itemGap={itemGap}
              itemsTopGap={itemsTopGap}
              emptyMessage={emptyMessage}
              itemPaddingX={itemPaddingX}
              itemPaddingY={itemPaddingY}
              itemBorderRadius={itemBorderRadius}
              itemHighlightBackground={itemHighlightBackground}
              itemHoverBackground={itemHoverBackground}
              itemIconSize={itemIconSize}
              itemIconGap={itemIconGap}
              itemIconOpacity={itemIconOpacity}
            />
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>

      {/* Custom Scrollbar - visible on hover/scroll */}
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="absolute top-0 right-0 bottom-0 flex w-2 touch-none select-none p-0.5 opacity-0 transition-opacity duration-150 data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
      >
        <ScrollArea.Thumb className="bg-fg-quaternary hover:bg-fg-quaternary_hover relative flex-1 rounded-full" />
      </ScrollArea.Scrollbar>

      {/* Overflow Gradients - dynamic opacity based on scroll position */}
      {menuOverflowGradient && (
        <>
          {debug && (
            <div
              className="pointer-events-none absolute"
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: menuOverflowGradientHeight,
                backgroundColor: 'rgba(236, 72, 153, 0.3)',
                border: '1px dashed rgba(236, 72, 153, 0.8)',
              }}
            />
          )}
          {/* Top gradient - fades when scrolled to top */}
          <div
            className="pointer-events-none absolute transition-opacity duration-150"
            style={{
              top: gradientInsets.top,
              left: gradientInsets.left,
              right: gradientInsets.right,
              height: menuOverflowGradientHeight,
              background: debug
                ? 'rgba(251, 191, 36, 0.5)'
                : `linear-gradient(to bottom, var(--color-bg-${gradientBgColor}) 0%, transparent 100%)`,
              opacity: `calc(min(1, var(--scroll-area-overflow-y-start, ${menuOverflowGradientHeight}) / ${menuOverflowGradientHeight}))`,
            }}
          />
          {debug && (
            <div
              className="pointer-events-none absolute"
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                height: menuOverflowGradientHeight,
                backgroundColor: 'rgba(236, 72, 153, 0.3)',
                border: '1px dashed rgba(236, 72, 153, 0.8)',
              }}
            />
          )}
          {/* Bottom gradient - fades when scrolled to bottom */}
          <div
            className="pointer-events-none absolute transition-opacity duration-150"
            style={{
              bottom: gradientInsets.bottom,
              left: gradientInsets.left,
              right: gradientInsets.right,
              height: menuOverflowGradientHeight,
              background: debug
                ? 'rgba(251, 191, 36, 0.5)'
                : `linear-gradient(to top, var(--color-bg-${gradientBgColor}) 0%, transparent 100%)`,
              opacity: `calc(min(1, var(--scroll-area-overflow-y-end, ${menuOverflowGradientHeight}) / ${menuOverflowGradientHeight}))`,
            }}
          />
        </>
      )}
    </ScrollArea.Root>
  )
}

MenuContent.displayName = 'MenuContent'
