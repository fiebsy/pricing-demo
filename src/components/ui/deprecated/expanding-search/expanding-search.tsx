/**
 * Expanding Search Input
 *
 * A search input that expands horizontally from a compact icon state.
 * The icon stays fixed at the left while the input slides in.
 *
 * @module expanding-search
 */

'use client'

import React, { useState, useCallback, useEffect } from 'react'

import type { ExpandingSearchProps } from './types'
import { DEFAULT_PROPS } from './config'
import { useExpandingSearch } from './hooks/use-expanding-search'
import { getContentOpacity, getContentTransition } from './utils/animation'
import {
  SearchContainer,
  SearchIconButton,
  SearchInput,
  ClearButton,
} from './components'

// ============================================================================
// Component
// ============================================================================

export const ExpandingSearch: React.FC<ExpandingSearchProps> = ({
  placeholder = DEFAULT_PROPS.placeholder,
  value,
  onChange,
  onSubmit,
  onExpandedChange,
  defaultExpanded = DEFAULT_PROPS.defaultExpanded,
  expanded,
  collapsedWidth = DEFAULT_PROPS.collapsedWidth,
  expandedWidth = DEFAULT_PROPS.expandedWidth,
  height = DEFAULT_PROPS.height,
  duration = DEFAULT_PROPS.duration,
  collapseDuration = 75,
  revealMode = 'immediate',
  hideMode = 'fade',
  className,
  autoFocus = DEFAULT_PROPS.autoFocus,
  collapseOnBlur = DEFAULT_PROPS.collapseOnBlur,
  iconSize = 18,
  iconStrokeWidth = 2,
  iconOpacity = 65,
}) => {
  // ============================================================================
  // State & Handlers
  // ============================================================================

  const {
    inputRef,
    containerRef,
    isExpanded,
    inputValue,
    handleToggle,
    handleInputChange,
    handleKeyDown,
    handleClear,
    handleContainerClick,
  } = useExpandingSearch({
    value,
    expanded,
    defaultExpanded,
    autoFocus,
    collapseOnBlur,
    onChange,
    onSubmit,
    onExpandedChange,
  })

  // ============================================================================
  // Animation State
  // ============================================================================

  // For 'sync' mode: track when container animation completes
  const [animationComplete, setAnimationComplete] = useState(defaultExpanded)

  // Reset animationComplete when collapsing
  useEffect(() => {
    if (!isExpanded) {
      setAnimationComplete(false)
    }
  }, [isExpanded])

  // Handle container transitionend for sync mode
  const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
    if (e.propertyName === 'width' && e.target === containerRef.current) {
      if (isExpanded) {
        setAnimationComplete(true)
      }
    }
  }, [isExpanded, containerRef])

  // ============================================================================
  // Animation Calculations
  // ============================================================================

  const animationState = { isExpanded, animationComplete }
  const animationConfig = { duration, collapseDuration, revealMode, hideMode }

  const contentOpacity = getContentOpacity(animationState, revealMode)
  const contentTransition = getContentTransition(animationState, animationConfig)

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <SearchContainer
      ref={containerRef}
      isExpanded={isExpanded}
      collapsedWidth={collapsedWidth}
      expandedWidth={expandedWidth}
      height={height}
      duration={duration}
      revealMode={revealMode}
      hideMode={hideMode}
      collapseDuration={collapseDuration}
      className={className}
      onClick={handleContainerClick}
      onTransitionEnd={handleTransitionEnd}
    >
      <SearchIconButton
        isExpanded={isExpanded}
        collapsedWidth={collapsedWidth}
        iconSize={iconSize}
        iconStrokeWidth={iconStrokeWidth}
        iconOpacity={iconOpacity}
        onClick={handleToggle}
      />

      <SearchInput
        inputRef={inputRef}
        isExpanded={isExpanded}
        value={inputValue}
        placeholder={placeholder}
        collapsedWidth={collapsedWidth}
        contentOpacity={contentOpacity}
        contentTransition={contentTransition}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      >
        <ClearButton
          visible={!!inputValue && isExpanded}
          onClick={handleClear}
        />
      </SearchInput>
    </SearchContainer>
  )
}

ExpandingSearch.displayName = 'ExpandingSearch'
