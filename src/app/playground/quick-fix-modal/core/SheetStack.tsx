/**
 * SheetStack - Sheet stack navigation controller
 *
 * Manages the visual stack of sheets with iOS-style push/pop transitions.
 * Handles depth transforms, animation orchestration, and sheet rendering.
 *
 * @module playground/quick-fix-modal/core
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Sheet } from './Sheet'
import { SheetHeader } from './SheetHeader'
import type {
  SheetDefinition,
  SheetStackState,
  QuickFixModalConfig,
  SheetContentProps,
  FlowId,
} from '../config/types'
import {
  createQuickFixSheet,
  createAddToMindSheet,
  createManualFixSheet,
} from '../flows'

export interface SheetStackProps {
  /** Current stack state */
  state: SheetStackState
  /** Modal configuration */
  config: QuickFixModalConfig
  /** Callback to push a new sheet */
  onPushSheet: (sheet: SheetDefinition) => void
  /** Callback to pop current sheet */
  onPopSheet: () => void
  /** Callback when flow completes */
  onComplete: () => void
  /** Callback to close modal */
  onClose: () => void
  /** Integration header title (supports {category} substitution) */
  headerTitle?: string
  /** Category name for title substitution */
  categoryName?: string
  /** Whether to show the header */
  showHeader?: boolean
  /** Whether to show back button */
  showBackButton?: boolean
  /** Whether to show close button */
  showCloseButton?: boolean
  /** Additional className */
  className?: string
}

/**
 * SheetStack Component
 *
 * Renders the sheet stack with depth transforms and navigation.
 * Each sheet is positioned absolutely and transformed based on its position.
 */
export function SheetStack({
  state,
  config,
  onPushSheet,
  onPopSheet,
  onComplete,
  onClose,
  headerTitle,
  categoryName = '',
  showHeader = true,
  showBackButton = true,
  showCloseButton = true,
  className,
}: SheetStackProps) {
  const { sheets, currentIndex, isAnimating, direction } = state

  // Get current sheet for header
  const currentSheet = sheets[currentIndex] || null

  // Substitute category in header title
  const resolvedTitle = headerTitle?.replace('{category}', categoryName) || currentSheet?.title || ''

  // Create sheet definition based on flow ID
  const createSheetForFlow = (flowId: FlowId): SheetDefinition | null => {
    switch (flowId) {
      case 'quick-fix':
        return createQuickFixSheet()
      case 'add-to-mind':
        return createAddToMindSheet()
      case 'manual-fix':
        return createManualFixSheet()
      default:
        console.warn('Unknown flow ID:', flowId)
        return null
    }
  }

  // Create content props for sheets
  const contentProps: Omit<SheetContentProps, 'config'> = {
    onNavigate: (sheetId, props) => {
      // Create the appropriate sheet and push it
      const sheet = createSheetForFlow(sheetId as FlowId)
      if (sheet) {
        // Merge any additional props
        if (props) {
          sheet.componentProps = { ...sheet.componentProps, ...props }
        }
        onPushSheet(sheet)
      }
    },
    onComplete,
    onClose,
  }

  // Render sheets with depth transforms
  const renderSheets = () => {
    return sheets.map((sheet, index) => {
      // Calculate position relative to current index
      const position = index - currentIndex

      // Only render sheets within visible range
      if (position < -1 || position >= config.stack.maxVisibleSheets) {
        return null
      }

      const isActive = position === 0

      // Special handling for push/pop animations
      let adjustedPosition = position

      // During push: new sheet starts at position 0 (entering), previous moves to position 1
      // During pop: current sheet exits, previous sheet moves to position 0

      return (
        <Sheet
          key={sheet.id}
          sheet={sheet}
          position={adjustedPosition}
          isActive={isActive}
          direction={direction}
          isAnimating={isAnimating}
          stackConfig={config.stack}
          animationConfig={config.animation}
          contentProps={contentProps}
          config={config}
        />
      )
    })
  }

  return (
    <div className={cn('relative flex flex-col', className)}>
      {/* Header */}
      {showHeader && (
        <SheetHeader
          title={resolvedTitle}
          canPop={currentIndex > 0 && showBackButton}
          showCloseButton={showCloseButton}
          onBack={onPopSheet}
          onClose={onClose}
          isAnimating={isAnimating}
        />
      )}

      {/* Sheet container */}
      <div className="relative">
        {renderSheets()}
      </div>
    </div>
  )
}

// =============================================================================
// STANDALONE SHEET STACK (without context)
// =============================================================================

export interface StandaloneSheetStackProps {
  /** Initial sheet to display */
  initialSheet: SheetDefinition
  /** Modal configuration */
  config: QuickFixModalConfig
  /** Callback when flow completes */
  onComplete: () => void
  /** Callback to close modal */
  onClose: () => void
  /** Integration header title */
  headerTitle?: string
  /** Category name for title substitution */
  categoryName?: string
  /** Additional className */
  className?: string
}

/**
 * StandaloneSheetStack - Self-contained sheet stack
 *
 * Includes its own state management for use outside of context.
 */
export function StandaloneSheetStack({
  initialSheet,
  config,
  onComplete,
  onClose,
  headerTitle,
  categoryName,
  className,
}: StandaloneSheetStackProps) {
  const [state, setState] = React.useState<SheetStackState>({
    sheets: [initialSheet],
    currentIndex: 0,
    isAnimating: false,
    direction: null,
  })

  const handlePushSheet = React.useCallback((sheet: SheetDefinition) => {
    setState((prev) => ({
      ...prev,
      sheets: [...prev.sheets, sheet],
      currentIndex: prev.sheets.length,
      isAnimating: true,
      direction: 'push',
    }))

    // Clear animating state after animation
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isAnimating: false,
        direction: null,
      }))
    }, config.animation.pushDuration)
  }, [config.animation.pushDuration])

  const handlePopSheet = React.useCallback(() => {
    if (state.currentIndex <= 0) return

    setState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex - 1,
      isAnimating: true,
      direction: 'pop',
    }))

    // Clear animating state after animation
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isAnimating: false,
        direction: null,
      }))
    }, config.animation.popDuration)
  }, [state.currentIndex, config.animation.popDuration])

  return (
    <SheetStack
      state={state}
      config={config}
      onPushSheet={handlePushSheet}
      onPopSheet={handlePopSheet}
      onComplete={onComplete}
      onClose={onClose}
      headerTitle={headerTitle}
      categoryName={categoryName}
      className={className}
    />
  )
}
