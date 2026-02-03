/**
 * StackingNav - Root Anchor Renderer
 *
 * Renders the root "All" button with anchor/unanchor animation.
 * Extracted from stack-level.tsx lines 179-211.
 *
 * @module features/stacking-nav/components
 */

'use client'

import { motion } from 'motion/react'
import type { StackItem, AnimationConfig, StyleConfig } from '../types'
import { getAnchoredZIndex } from '../config'
import { getTransition } from '../utils/animations'
import { AnimatedItem } from './animated-item'

interface RootAnchorProps {
  anchorItem: StackItem
  isAnchored: boolean
  animationConfig: AnimationConfig
  styleConfig: StyleConfig
  shouldReduceMotion: boolean
  isCollapsingNow: boolean
  timeScale: number
}

export function RootAnchor({
  anchorItem,
  isAnchored,
  animationConfig,
  styleConfig,
  shouldReduceMotion,
  isCollapsingNow,
  timeScale,
}: RootAnchorProps) {
  const anchorOffset = styleConfig.peekOffset * 0 // depth 0

  const anchorTransition = isCollapsingNow
    ? {
        ...getTransition(animationConfig),
        layout: {
          duration: animationConfig.collapseLayoutDuration / timeScale,
          ease: 'easeOut' as const,
        },
      }
    : getTransition(animationConfig)

  return (
    <motion.div
      key={anchorItem.id}
      layout="position"
      className={isAnchored ? 'absolute top-0 left-0 inline-flex' : 'inline-flex'}
      style={{
        zIndex: isAnchored ? getAnchoredZIndex(0) : 100,
      }}
      initial={shouldReduceMotion ? undefined : { opacity: 0 }}
      animate={{
        opacity: 1,
        x: isAnchored ? anchorOffset : 0,
      }}
      transition={anchorTransition}
    >
      <AnimatedItem
        item={anchorItem}
        index={0}
        levelIndices={[0]}
        isAnchored={isAnchored}
      />
    </motion.div>
  )
}
