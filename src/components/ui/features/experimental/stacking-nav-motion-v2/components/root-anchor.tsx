/**
 * StackingNav V2 - Root Anchor Renderer
 *
 * Renders the root "All" button with anchor/unanchor animation.
 *
 * @module features/stacking-nav-v2/components
 */

'use client'

import { motion } from 'motion/react'
import type { StackItem, AnimationConfig, StyleConfig } from '../types'
import { getAnchoredZIndex } from '../config'
import { getTransition, getCollapseLayoutTransition } from '../utils/animations'
import { AnimatedItem } from './animated-item'

interface RootAnchorProps {
  anchorItem: StackItem
  isAnchored: boolean
  animationConfig: AnimationConfig
  styleConfig: StyleConfig
  shouldReduceMotion: boolean
  isCollapsingNow: boolean
}

export function RootAnchor({
  anchorItem,
  isAnchored,
  animationConfig,
  styleConfig,
  shouldReduceMotion,
  isCollapsingNow,
}: RootAnchorProps) {
  const anchorOffset = styleConfig.peekOffset * 0 // depth 0

  const anchorTransition = isCollapsingNow
    ? {
        ...getTransition(animationConfig),
        ...getCollapseLayoutTransition(animationConfig),
      }
    : getTransition(animationConfig)

  return (
    <motion.div
      key={anchorItem.id}
      layout="position"
      className={isAnchored ? 'absolute left-0 top-0 inline-flex' : 'inline-flex'}
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
