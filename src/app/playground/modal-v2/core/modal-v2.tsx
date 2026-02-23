/**
 * Modal V2 Component
 *
 * Simplified modal composition with clean stage-based transitions.
 * Uses Base UI Dialog with Motion animations.
 */

'use client'

import { useRef, useEffect, useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { motion, LayoutGroup, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'

import type { Stage, ModalV2Config, StageId } from '../config/types'
import { ModalHeader } from './modal-header'
import { ModalContent } from './modal-content'
import { ModalFooter } from './modal-footer'

// ============================================================================
// Background Classes
// ============================================================================

const BACKGROUND_CLASSES = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
} as const

const SHADOW_CLASSES = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const

// ============================================================================
// Types
// ============================================================================

interface ModalV2Props {
  /** Current stage */
  stage: Stage
  /** Modal configuration */
  config: ModalV2Config
  /** Modal open state */
  open: boolean
  /** Open state change handler */
  onOpenChange: (open: boolean) => void
  /** Currently selected tier */
  selectedTier: PricingTier
  /** Tier selection handler */
  onTierSelect: (tier: PricingTier) => void
  /** Stage change handler (for next/back) */
  onStageChange: (stageId: StageId) => void
}

// ============================================================================
// Component
// ============================================================================

export function ModalV2({
  stage,
  config,
  open,
  onOpenChange,
  selectedTier,
  onTierSelect,
  onStageChange,
}: ModalV2Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | undefined>()

  // Measure container width for fill mode
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        // Content width = container width - padding
        const width = entry.contentRect.width
        setContainerWidth(width)
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const { appearance, animation, demo, header, buttons } = config

  // Spring transition for layout animations
  const springTransition = {
    type: 'spring' as const,
    duration: demo.slowMo ? animation.duration * 4 : animation.duration,
    bounce: animation.bounce,
  }

  // Handle primary button click
  const handlePrimaryClick = () => {
    const nextStage = Math.min(stage.id + 1, 5) as StageId
    onStageChange(nextStage)
  }

  // Handle secondary button click (back)
  const handleSecondaryClick = () => {
    const prevStage = Math.max(stage.id - 1, 1) as StageId
    onStageChange(prevStage)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <Dialog.Portal>
        {/* Backdrop - pointer-events-none allows clicking through */}
        <Dialog.Backdrop
          className="pointer-events-none fixed inset-0 bg-black/10 backdrop-blur-sm"
          style={{ backdropFilter: `blur(4px)` }}
        />

        {/* Popup */}
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="modal-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={springTransition}
            >
              <LayoutGroup>
                <motion.div
                  ref={containerRef}
                  layout
                  transition={springTransition}
                  className={cn(
                    'flex flex-col overflow-hidden',
                    BACKGROUND_CLASSES[appearance.background],
                    SHADOW_CLASSES[appearance.shadow],
                    appearance.shine !== 'none' && appearance.shine,
                    appearance.depth !== 'none' && appearance.depth
                  )}
                  style={{
                    width: appearance.width,
                    padding: appearance.padding,
                    gap: appearance.gap,
                    borderRadius: appearance.borderRadius,
                  }}
                >
                  {/* Header */}
                  <ModalHeader
                    stage={stage}
                    config={header}
                    animation={animation}
                  />

                  {/* Content */}
                  <ModalContent
                    stage={stage}
                    config={config}
                    selectedTier={selectedTier}
                    onTierSelect={onTierSelect}
                    containerWidth={containerWidth}
                  />

                  {/* Footer / Buttons */}
                  <ModalFooter
                    stage={stage}
                    config={buttons}
                    animation={animation}
                    slowMo={demo.slowMo}
                    onPrimaryClick={handlePrimaryClick}
                    onSecondaryClick={handleSecondaryClick}
                  />
                </motion.div>
              </LayoutGroup>
            </motion.div>
          </AnimatePresence>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
