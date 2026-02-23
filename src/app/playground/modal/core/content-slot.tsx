/**
 * ContentSlot Component
 *
 * Unified content renderer that handles both content types:
 * - wireframe: Renders AnimatedWireframeLines placeholder bars
 * - text: Renders animated text paragraph with crossfade transitions
 *
 * Both types animate height changes using Motion's layout prop.
 */

'use client'

import { motion, AnimatePresence } from 'motion/react'
import type { ContentSlotConfig, ProCardConfig, ChecklistConfig, PricingSelectConfig, TextTransitionEasing, TextTransitionMode } from '../config/types'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import { AnimatedWireframeLines } from './animated-wireframe-lines'
import { ProCard } from './pro-card'
import { Checklist } from './checklist'
import { PricingSelectSlot } from './pricing-select-slot'

// Easing curves for text animations
const EASING_CURVES = {
  elastic: [0.25, 1, 0.5, 1] as const,
  'expo-out': [0.16, 1, 0.3, 1] as const,
  'ease-out': [0, 0, 0.58, 1] as const,
} as const

interface ContentSlotProps {
  config: ContentSlotConfig
  /** Global Pro Card configuration (used when type is 'pro-card') */
  proCardConfig?: ProCardConfig
  /** Global Checklist configuration (used when type is 'checklist') */
  checklistConfig?: ChecklistConfig
  /** Global Pricing Select configuration (used when type is 'pricing-select') */
  pricingSelectConfig?: PricingSelectConfig
  /** Currently selected pricing tier (used when type is 'pricing-select') */
  selectedTier?: PricingTier
  /** Handler for tier selection (used when type is 'pricing-select') */
  onTierSelect?: (tier: PricingTier) => void
  /** Gap between wireframe lines in pixels */
  lineGap: number
  /** Duration of layout/content animations in seconds */
  duration?: number
  /** Spring bounce (0-1) */
  bounce?: number
  /** Line stagger delay in seconds */
  stagger?: number
  /** Text transition mode */
  textMode?: TextTransitionMode
  /** Text easing preset */
  textEasing?: TextTransitionEasing
  /** Vertical offset for text enter/exit animation */
  textYOffset?: number
  /** Whether text animation is enabled */
  textEnabled?: boolean
  /** Container width for 'fill' mode calculation in pricing-select */
  containerWidth?: number
}

export function ContentSlot({
  config,
  proCardConfig,
  checklistConfig,
  pricingSelectConfig,
  selectedTier,
  onTierSelect,
  lineGap,
  duration = 0.4,
  bounce = 0.1,
  stagger = 0.03,
  textMode = 'crossfade',
  textEasing = 'spring',
  textYOffset = 8,
  textEnabled = true,
  containerWidth,
}: ContentSlotProps) {
  const { type, height, lineCount, text } = config

  // Wireframe content type
  if (type === 'wireframe') {
    return (
      <AnimatedWireframeLines
        lineCount={lineCount ?? 3}
        lineGap={lineGap}
        height={height}
        duration={duration}
        bounce={bounce}
        stagger={stagger}
      />
    )
  }

  // Pro card content type (uses global proCardConfig including height)
  if (type === 'pro-card' && proCardConfig) {
    return <ProCard config={proCardConfig} height={proCardConfig.height} duration={duration} bounce={bounce} />
  }

  // Checklist content type (uses global checklistConfig)
  if (type === 'checklist' && checklistConfig) {
    return <Checklist config={checklistConfig} duration={duration} bounce={bounce} />
  }

  // Pricing select content type (uses global pricingSelectConfig)
  if (type === 'pricing-select' && pricingSelectConfig && selectedTier && onTierSelect) {
    return (
      <PricingSelectSlot
        config={config}
        globalConfig={pricingSelectConfig}
        selectedTier={selectedTier}
        onTierSelect={onTierSelect}
        containerWidth={containerWidth}
      />
    )
  }

  // Text content type
  // When animation disabled, render static text
  if (!textEnabled) {
    return (
      <div
        className="flex w-full flex-col justify-center overflow-hidden"
        style={{ height }}
      >
        <p className="text-sm text-secondary leading-relaxed">
          {text || 'Enter content text...'}
        </p>
      </div>
    )
  }

  // Build transition based on easing type
  const getTransition = () => {
    if (textEasing === 'spring') {
      return { type: 'spring' as const, duration, bounce }
    }
    const easingCurve = EASING_CURVES[textEasing as keyof typeof EASING_CURVES]
    return { duration, ease: easingCurve ?? 'easeOut' }
  }

  const transition = getTransition()
  const animatePresenceMode = textMode === 'flip' ? 'wait' : 'popLayout'

  return (
    <div
      className="flex w-full flex-col justify-center overflow-hidden"
      style={{ height }}
    >
      <AnimatePresence mode={animatePresenceMode} initial={false}>
        <motion.p
          key={text ?? ''}
          initial={{ opacity: 0, y: textYOffset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -textYOffset }}
          transition={transition}
          className="text-sm text-secondary leading-relaxed"
        >
          {text || 'Enter content text...'}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
