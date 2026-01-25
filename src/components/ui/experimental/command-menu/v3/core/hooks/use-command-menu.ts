/**
 * Biaxial Command Menu V3 - Main Hook
 *
 * Manages state and handlers for the command menu.
 */

import { useState, useCallback, useMemo, useRef } from 'react'
import type { CommandMenuConfig, CommandGroup, CommandItemAction } from '../types'
import type { CommandListRef } from '@/components/ui/prod/base/biaxial-command-menu/components/command-list'
import { DEFAULT_COMMAND_CONFIG } from '../constants'
import { filterGroups, countItems } from '../utils'
import { calculatePanelHeight, calculateRadii, calculateGradientInsets, calculateItemRadius } from '../utils'

export interface UseCommandMenuOptions {
  /** User-provided config (merged with defaults) */
  userConfig?: Partial<CommandMenuConfig>
  /** Command groups */
  groups: CommandGroup[]
  /** Controlled expanded state */
  controlledExpanded?: boolean
  /** Called when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Called when an item is selected */
  onSelect?: (item: CommandItemAction) => void
}

export interface UseCommandMenuReturn {
  // Config
  config: CommandMenuConfig

  // State
  expanded: boolean
  filter: string
  setFilter: (filter: string) => void
  filteredGroups: CommandGroup[]
  filteredItemCount: number
  filteredGroupCount: number
  isEmpty: boolean

  // Refs
  containerRef: React.RefObject<HTMLDivElement | null>
  inputRef: React.RefObject<HTMLInputElement | null>
  listRef: React.RefObject<CommandListRef | null>

  // Calculated values
  panelHeight: number
  itemRadius: number
  radii: ReturnType<typeof calculateRadii>
  gradientInsets: ReturnType<typeof calculateGradientInsets>

  // Handlers
  handleExpandedChange: (newExpanded: boolean) => void
  handleInputFocus: () => void
  handleInputBlur: (e: React.FocusEvent) => void
  handleEscape: () => void
  handleArrowDown: () => void
  handleSelect: (item: CommandItemAction) => void
}

export function useCommandMenu({
  userConfig,
  groups,
  controlledExpanded,
  onExpandedChange,
  onSelect,
}: UseCommandMenuOptions): UseCommandMenuReturn {
  // Merge config with defaults
  const config = useMemo(
    () => ({ ...DEFAULT_COMMAND_CONFIG, ...userConfig }),
    [userConfig]
  )

  // Internal state
  const [internalExpanded, setInternalExpanded] = useState(false)
  const [filter, setFilter] = useState('')

  // Use controlled or internal expanded state
  const expanded = controlledExpanded ?? internalExpanded

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<CommandListRef>(null)

  // Filtered groups
  const filteredGroups = useMemo(
    () => filterGroups(groups, filter),
    [groups, filter]
  )

  const filteredItemCount = countItems(filteredGroups)
  const filteredGroupCount = filteredGroups.length
  const isEmpty = filteredGroupCount === 0

  // Calculated layout values
  const panelHeight = calculatePanelHeight(
    config,
    filteredItemCount,
    filteredGroupCount,
    isEmpty
  )

  const itemRadius = useMemo(
    () => calculateItemRadius(
      config.borderRadius,
      config.innerPaddingLeft,
      config.innerPaddingRight
    ),
    [config.borderRadius, config.innerPaddingLeft, config.innerPaddingRight]
  )

  const radii = useMemo(() => calculateRadii(config), [
    config.borderRadius,
    config.topBorderRadius,
    config.menuBorderRadius,
    config.menuTopBorderRadius,
    config.menuContainerBottomRadius,
    config.menuContainerInset,
    config.syncMenuContainerRadius,
  ])

  const gradientInsets = useMemo(() => calculateGradientInsets(config), [
    config.syncGradientToScrollbar,
    config.scrollbarMarginTop,
    config.scrollbarMarginBottom,
    config.gradientInsetTop,
    config.gradientInsetBottom,
    config.gradientInsetLeft,
    config.gradientInsetRight,
  ])

  // Handlers
  const handleExpandedChange = useCallback(
    (newExpanded: boolean) => {
      setInternalExpanded(newExpanded)
      onExpandedChange?.(newExpanded)

      if (!newExpanded) {
        setFilter('')
        listRef.current?.resetHighlight()
      }
    },
    [onExpandedChange]
  )

  const handleInputFocus = useCallback(() => {
    handleExpandedChange(true)
  }, [handleExpandedChange])

  const handleInputBlur = useCallback(
    (e: React.FocusEvent) => {
      if (containerRef.current?.contains(e.relatedTarget as Node)) {
        return
      }
      setTimeout(() => {
        handleExpandedChange(false)
      }, 150)
    },
    [handleExpandedChange]
  )

  const handleEscape = useCallback(() => {
    handleExpandedChange(false)
    inputRef.current?.blur()
  }, [handleExpandedChange])

  const handleArrowDown = useCallback(() => {
    listRef.current?.highlightNext()
  }, [])

  const handleSelect = useCallback(
    (item: CommandItemAction) => {
      onSelect?.(item)
      handleExpandedChange(false)
      inputRef.current?.blur()
    },
    [onSelect, handleExpandedChange]
  )

  return {
    config,
    expanded,
    filter,
    setFilter,
    filteredGroups,
    filteredItemCount,
    filteredGroupCount,
    isEmpty,
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
  }
}
