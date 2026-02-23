/**
 * Modal Header Component
 *
 * Renders the modal header section with:
 * - Asset (placeholder or coin-stack)
 * - Title with crossfade animation
 * - Optional subtext with crossfade animation
 */

'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { Stage, HeaderConfig, AnimationConfig, CoinStackStateId } from '../config/types'
import { AssetRenderer } from './asset-renderer'
import { CrossfadeText } from './crossfade-text'

// ============================================================================
// Typography Classes
// ============================================================================

const TITLE_SIZE_CLASSES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
} as const

const TITLE_WEIGHT_CLASSES = {
  '400': 'font-normal',
  '500': 'font-medium',
  '600': 'font-semibold',
  '700': 'font-bold',
} as const

const SUBTEXT_SIZE_CLASSES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
} as const

// ============================================================================
// Types
// ============================================================================

interface ModalHeaderProps {
  /** Current stage */
  stage: Stage
  /** Header configuration */
  config: HeaderConfig
  /** Animation configuration */
  animation: AnimationConfig
}

// ============================================================================
// Component
// ============================================================================

export function ModalHeader({ stage, config, animation }: ModalHeaderProps) {
  const { header: stageHeader } = stage
  const { title, subtext, assetStateId } = stageHeader

  return (
    <motion.div layout className="flex w-full flex-col">
      {/* Asset */}
      {config.showAsset && (
        <div className="mb-2">
          <AssetRenderer
            config={config.asset}
            activeStateId={assetStateId as CoinStackStateId}
            duration={animation.duration}
            bounce={animation.bounce}
          />
        </div>
      )}

      {/* Title */}
      <div
        className={cn(
          TITLE_SIZE_CLASSES[config.title.size],
          TITLE_WEIGHT_CLASSES[config.title.weight],
          config.title.color
        )}
      >
        <CrossfadeText
          text={title}
          duration={animation.duration}
          bounce={animation.bounce}
          yOffset={6}
          mode="crossfade"
          easing="spring"
        />
      </div>

      {/* Subtext */}
      {config.subtext.show && subtext && (
        <div
          className={cn(
            'mt-1',
            SUBTEXT_SIZE_CLASSES[config.subtext.size],
            TITLE_WEIGHT_CLASSES[config.subtext.weight],
            config.subtext.color
          )}
        >
          <CrossfadeText
            text={subtext}
            duration={animation.duration}
            bounce={animation.bounce}
            yOffset={4}
            mode="crossfade"
            easing="spring"
          />
        </div>
      )}
    </motion.div>
  )
}
