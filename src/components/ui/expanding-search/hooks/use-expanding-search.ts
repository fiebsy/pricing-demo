/**
 * Expanding Search - Hook
 *
 * Manages state and event handlers for the expanding search component.
 *
 * @module expanding-search/hooks/use-expanding-search
 */

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

import type { UseExpandingSearchProps, UseExpandingSearchReturn } from '../types'

export function useExpandingSearch({
  value: controlledValue,
  expanded: controlledExpanded,
  defaultExpanded,
  autoFocus,
  collapseOnBlur,
  onChange,
  onSubmit,
  onExpandedChange,
}: UseExpandingSearchProps): UseExpandingSearchReturn {
  // ============================================================================
  // State
  // ============================================================================

  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const [internalValue, setInternalValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isExpanded = controlledExpanded ?? internalExpanded
  const inputValue = controlledValue ?? internalValue

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleExpandedChange = useCallback((expanded: boolean) => {
    setInternalExpanded(expanded)
    onExpandedChange?.(expanded)
  }, [onExpandedChange])

  const handleToggle = useCallback(() => {
    handleExpandedChange(!isExpanded)
  }, [isExpanded, handleExpandedChange])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(newValue)
  }, [onChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit?.(inputValue)
    } else if (e.key === 'Escape') {
      handleExpandedChange(false)
    }
  }, [inputValue, onSubmit, handleExpandedChange])

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setInternalValue('')
    onChange?.('')
    inputRef.current?.focus()
  }, [onChange])

  const handleContainerClick = useCallback(() => {
    if (!isExpanded) {
      handleExpandedChange(true)
    }
  }, [isExpanded, handleExpandedChange])

  // ============================================================================
  // Effects
  // ============================================================================

  // Auto-focus when expanded
  useEffect(() => {
    if (isExpanded && autoFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isExpanded, autoFocus])

  // Collapse on outside click
  useEffect(() => {
    if (!collapseOnBlur || !isExpanded) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleExpandedChange(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpanded, collapseOnBlur, handleExpandedChange])

  // ============================================================================
  // Return
  // ============================================================================

  return {
    // Refs
    inputRef,
    containerRef,
    // State
    isExpanded,
    inputValue,
    // Handlers
    handleToggle,
    handleInputChange,
    handleKeyDown,
    handleClear,
    handleContainerClick,
  }
}
