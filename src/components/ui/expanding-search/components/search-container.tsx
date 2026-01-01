/**
 * Search Container
 *
 * The animated container that expands/collapses horizontally.
 * Manages width transitions and provides the visual shell.
 *
 * @module expanding-search/components/search-container
 */

'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

import type { SearchContainerProps } from '../types'
import { getContainerTransition } from '../utils/animation'

export const SearchContainer = forwardRef<HTMLDivElement, SearchContainerProps>(
  (
    {
      isExpanded,
      collapsedWidth,
      expandedWidth,
      height,
      duration,
      className,
      onClick,
      onTransitionEnd,
      children,
    },
    ref
  ) => {
    const currentWidth = isExpanded ? expandedWidth : collapsedWidth

    return (
      <div
        ref={ref}
        onClick={onClick}
        onTransitionEnd={onTransitionEnd}
        className={cn(
          'group relative overflow-hidden',
          'rounded-full',
          'cursor-pointer',
          'motion-reduce:transition-none',
          isExpanded && 'cursor-text'
        )}
        style={{
          width: currentWidth,
          height,
          transition: getContainerTransition(duration),
        }}
      >
        {/* Background layer - transparent at rest, visible on hover/active/expanded */}
        <div
          className={cn(
            'absolute inset-0 z-0 rounded-full transition-opacity duration-150 pointer-events-none',
            'bg-secondary',
            className, // includes shine-1
            isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'
          )}
        />
        {children}
      </div>
    )
  }
)

SearchContainer.displayName = 'SearchContainer'
