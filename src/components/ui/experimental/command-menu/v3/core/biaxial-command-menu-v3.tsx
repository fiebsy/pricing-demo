/**
 * Biaxial Command Menu V3 - Main Component
 *
 * An expandable search input with synchronized backdrop/content animations.
 * Reorganized with extracted utilities, hooks, and sub-components.
 *
 * Animation Layers:
 * 1. **Backdrop Layer** - Visual effects (shine, shadow, gradient)
 *    - Mode 'size': Animates actual dimensions (original)
 *    - Mode 'clip-path': Uses clip-path for perfect sync with content
 *
 * 2. **Content Layer** - Uses clip-path for smooth reveal
 *
 * 3. **Menu Container** (optional) - Animates the menu area independently
 *
 * @status stable
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import type { CommandMenuProps } from './types'

// Hooks
import { useCommandMenu, useKeyboardNav, useClickOutside } from './hooks'

// Components
import {
  Backdrop,
  ContentLayer,
  ContentWrapper,
  InputTrigger,
  MenuContainer,
  MenuContent,
  TopSection,
} from './components'

// Utils
import { getClipPath, getBackdropClipPath } from './utils'

// ============================================================================
// COMPONENT
// ============================================================================

export const BiaxialCommandMenuV3: React.FC<CommandMenuProps> = ({
  groups,
  config: userConfig,
  expanded: controlledExpanded,
  onExpandedChange,
  onSelect,
  className,
}) => {
  // Main hook for state management
  const {
    config,
    expanded,
    filter,
    setFilter,
    filteredGroups,
    containerRef,
    inputRef,
    listRef,
    panelHeight,
    itemRadius,
    radii,
    gradientInsets,
    handleExpandedChange,
    handleInputFocus,
    handleInputBlur,
    handleEscape,
    handleArrowDown,
    handleSelect,
  } = useCommandMenu({
    userConfig,
    groups,
    controlledExpanded,
    onExpandedChange,
    onSelect,
  })

  // Keyboard navigation
  useKeyboardNav({ expanded, listRef })

  // Click outside to close
  useClickOutside({
    expanded,
    containerRef,
    onClickOutside: () => handleExpandedChange(false),
  })

  // Hover state for collapsed backdrop styling
  const [hovered, setHovered] = useState(false)

  // ---------------------------------------------------------------------------
  // Animation Timing
  // ---------------------------------------------------------------------------

  const animSync = config.animationSync
  const transitionDuration = expanded ? config.duration : config.collapseDuration

  // Backdrop timing
  const backdropDuration = expanded
    ? config.duration + animSync.backdropDurationOffset
    : config.collapseDuration + animSync.backdropDurationOffset

  // Menu container timing
  const menuContainerDuration = expanded
    ? config.duration + animSync.menuContainerDurationOffset
    : config.collapseDuration + animSync.menuContainerDurationOffset

  // ---------------------------------------------------------------------------
  // Top Section Config
  // ---------------------------------------------------------------------------

  const topSectionEnabled = config.experimentalTopSection ?? false
  const topSectionHeight = config.topSectionHeight ?? 48
  const topSectionBottomOffset = config.topSectionBottomOffset ?? 0
  // Include both height and bottom offset for backdrop coverage
  const effectiveTopOffset = topSectionEnabled ? topSectionHeight + topSectionBottomOffset : 0

  // Top section timing (mirrors menu container logic)
  const topSectionDuration = expanded
    ? config.duration + (config.topSectionDurationOffset ?? 0)
    : config.collapseDuration + (config.topSectionDurationOffset ?? 0)

  // ---------------------------------------------------------------------------
  // Clip Paths
  // ---------------------------------------------------------------------------

  const contentClipPath = getClipPath(
    expanded,
    config.panelWidth,
    panelHeight,
    config.inputWidth,
    config.inputHeight,
    radii.clipExpanded,
    radii.clipCollapsed
  )

  const backdropClipPath = getBackdropClipPath(
    expanded,
    config.panelWidth,
    panelHeight + config.backdropTopOffset,
    config.inputWidth,
    config.inputHeight,
    radii.clipExpanded,
    radii.clipCollapsed,
    config.backdropTopOffset
  )

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block overflow-visible', className)}
      style={{ width: config.inputWidth, height: config.inputHeight }}
    >
      {/* Experimental Top Section */}
      {topSectionEnabled && (
        <TopSection
          expanded={expanded}
          height={topSectionHeight}
          panelWidth={config.panelWidth}
          background={config.topSectionBackground ?? config.menuBackground}
          contentType={config.topSectionContent ?? 'actions'}
          duration={topSectionDuration}
          delay={config.topSectionDelay ?? animSync.backdropDelay}
          innerDurationOffset={animSync.menuContainerDurationOffset}
          borderRadius={config.topSectionBorderRadius ?? radii.raw.syncedRadius}
          inset={config.topSectionInset ?? config.menuContainerInset}
          bottomOffset={config.topSectionBottomOffset ?? 0}
          borderWidth={config.topSectionBorderWidth ?? config.menuBorderWidth}
          borderColor={config.topSectionBorderColor ?? config.menuBorderColor}
          shine={config.topSectionShine ?? 'none'}
          squircle={config.appearance.squircle}
        />
      )}

      {/* Backdrop Layer */}
      <Backdrop
        expanded={expanded}
        hovered={hovered}
        mode={animSync.backdropMode}
        appearance={config.appearance}
        panelWidth={config.panelWidth}
        panelHeight={panelHeight}
        inputWidth={config.inputWidth}
        inputHeight={config.inputHeight}
        backdropTopOffset={config.backdropTopOffset + effectiveTopOffset}
        borderRadius={radii.backdrop}
        clipPath={backdropClipPath}
        duration={backdropDuration}
        delay={animSync.backdropDelay}
      />

      {/* Content Layer */}
      <ContentLayer
        expanded={expanded}
        panelWidth={config.panelWidth}
        panelHeight={panelHeight}
        duration={transitionDuration}
        clipPath={contentClipPath}
        itemRadius={itemRadius}
      >
        {/* Input Trigger */}
        <InputTrigger
          inputRef={inputRef}
          expanded={expanded}
          filter={filter}
          onFilterChange={setFilter}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onEscape={handleEscape}
          onArrowDown={handleArrowDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          placeholder={config.placeholder}
          panelWidth={config.panelWidth}
          inputWidth={config.inputWidth}
          inputHeight={config.inputHeight}
          inputPaddingX={config.inputPaddingX ?? 12}
          inputTopPaddingExpanded={config.inputTopPaddingExpanded}
          inputPaddingExpanded={config.inputPaddingExpanded}
          duration={transitionDuration}
          inputBackground={config.inputBackground}
          inputCursor={config.inputCursor}
          inputIcon={config.inputIcon}
          showInputIcon={config.showInputIcon}
          showKeyboardHint={config.showKeyboardHint}
          keyboardHintText={config.keyboardHintText}
          rightIcon={config.rightIcon}
          showRightIcon={config.showRightIcon}
        />

        {/* Content Wrapper */}
        <ContentWrapper
          expanded={expanded}
          inputHeight={config.inputHeight}
          inputTopPaddingExpanded={config.inputTopPaddingExpanded}
          contentTopOffset={config.contentTopOffset}
          contentBottomOffset={config.contentBottomOffset}
          contentFadeDuration={config.contentFadeDuration}
          contentFadeDelay={config.contentFadeDelay}
          duration={transitionDuration}
        >
          {/* Menu Container */}
          <MenuContainer
            expanded={expanded}
            animateMenuContainer={animSync.animateMenuContainer}
            expandOrigin={animSync.expandOrigin}
            duration={menuContainerDuration}
            delay={animSync.menuContainerDelay}
            inset={config.menuContainerInset}
            borderRadius={radii.menuContainer}
            menuBackground={config.menuBackground}
            borderWidth={config.menuBorderWidth}
            borderColor={config.menuBorderColor}
            squircle={config.appearance.squircle}
            debug={config.debug}
          >
            {/* Menu Content */}
            <MenuContent
              listRef={listRef}
              groups={groups}
              filter={filter}
              onSelect={handleSelect}
              itemHeight={config.itemHeight}
              itemGap={config.itemGap}
              itemsTopGap={config.itemsTopGap}
              emptyMessage={config.emptyStateMessage}
              scrollbarMarginTop={config.scrollbarMarginTop}
              scrollbarMarginBottom={config.scrollbarMarginBottom}
              innerPaddingTop={config.innerPaddingTop}
              innerPaddingBottom={config.innerPaddingBottom}
              innerPaddingLeft={config.innerPaddingLeft}
              innerPaddingRight={config.innerPaddingRight}
              scrollPaddingTop={config.scrollPaddingTop}
              scrollPaddingBottom={config.scrollPaddingBottom}
              menuOverflowGradient={config.menuOverflowGradient}
              menuOverflowGradientHeight={config.menuOverflowGradientHeight}
              gradientInsets={gradientInsets}
              menuBackground={config.menuBackground}
              debug={config.debug}
              // Item styling
              itemPaddingX={config.itemPaddingX}
              itemPaddingY={config.itemPaddingY}
              itemBorderRadius={config.itemBorderRadius}
              itemHighlightBackground={config.itemHighlightBackground}
              itemHoverBackground={config.itemHoverBackground}
              itemIconSize={config.itemIconSize}
              itemIconGap={config.itemIconGap}
              itemIconOpacity={config.itemIconOpacity}
            />
          </MenuContainer>
        </ContentWrapper>
      </ContentLayer>
    </div>
  )
}

BiaxialCommandMenuV3.displayName = 'BiaxialCommandMenuV3'
