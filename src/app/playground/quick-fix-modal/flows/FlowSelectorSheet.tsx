/**
 * FlowSelectorSheet - Method selection flow sheet
 *
 * Displays flow method options for the user to choose.
 * Navigates to the selected flow on selection.
 *
 * @module playground/quick-fix-modal/flows
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { FlowSelector, type FlowType } from '../../quick-fix-interactions/core/FlowSelector'
import type { SheetContentProps, FlowDefinition } from '../config/types'

export interface FlowSelectorSheetProps extends SheetContentProps {
  /** Custom flow definitions (optional) */
  flowDefinitions?: FlowDefinition[]
  /** Callback when a flow is selected */
  onFlowSelect?: (flowType: FlowType) => void
  /** Additional className */
  className?: string
}

/**
 * FlowSelectorSheet Component
 *
 * Sheet content for selecting a flow method.
 * Uses the FlowSelector component from quick-fix-interactions.
 */
export function FlowSelectorSheet({
  onNavigate,
  onComplete,
  onClose,
  config,
  flowDefinitions,
  onFlowSelect,
  className,
}: FlowSelectorSheetProps) {
  const [selectedFlow, setSelectedFlow] = React.useState<FlowType | null>(null)

  // Handle flow selection
  const handleSelect = React.useCallback((flowType: FlowType) => {
    setSelectedFlow(flowType)
    onFlowSelect?.(flowType)

    // Navigate to the selected flow sheet
    // Small delay for visual feedback
    setTimeout(() => {
      onNavigate(flowType)
    }, 200)
  }, [onNavigate, onFlowSelect])

  return (
    <div className={cn('flex flex-col p-6', className)}>
      <FlowSelector
        onSelect={handleSelect}
        config={config.flowOptions}
        selectedFlow={selectedFlow}
        flowDefinitions={flowDefinitions}
      />
    </div>
  )
}

// =============================================================================
// STANDALONE SELECTOR (for preview/testing)
// =============================================================================

export interface StandaloneFlowSelectorProps {
  /** Flow option configuration */
  config: SheetContentProps['config']['flowOptions']
  /** Custom flow definitions */
  flowDefinitions?: FlowDefinition[]
  /** Callback when flow is selected */
  onSelect?: (flowType: FlowType) => void
  /** Additional className */
  className?: string
}

/**
 * StandaloneFlowSelector - Flow selector without sheet wrapper
 *
 * For use in previews and testing.
 */
export function StandaloneFlowSelector({
  config,
  flowDefinitions,
  onSelect,
  className,
}: StandaloneFlowSelectorProps) {
  const [selectedFlow, setSelectedFlow] = React.useState<FlowType | null>(null)

  const handleSelect = React.useCallback((flowType: FlowType) => {
    setSelectedFlow(flowType)
    onSelect?.(flowType)
  }, [onSelect])

  return (
    <div className={cn('w-full', className)}>
      <FlowSelector
        onSelect={handleSelect}
        config={config}
        selectedFlow={selectedFlow}
        flowDefinitions={flowDefinitions}
      />
    </div>
  )
}

// =============================================================================
// SHEET DEFINITION FACTORY
// =============================================================================

/**
 * Create a FlowSelectorSheet definition for use with SheetStack.
 */
export function createFlowSelectorSheet(
  flowDefinitions?: FlowDefinition[],
  title = 'Choose Method'
) {
  return {
    id: 'flow-selector',
    title,
    component: FlowSelectorSheet,
    componentProps: { flowDefinitions },
    canPop: false, // First sheet - no back button
  }
}
