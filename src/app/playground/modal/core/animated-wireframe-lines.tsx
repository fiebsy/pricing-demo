/**
 * AnimatedWireframeLines Component
 *
 * Wireframe lines that morph height and animate individual lines in/out.
 * Uses layout prop for container height morphing and AnimatePresence for line transitions.
 */

'use client'

import { motion, AnimatePresence } from 'motion/react'

interface AnimatedWireframeLinesProps {
  lineCount: number
  lineGap: number
  height: number
  /** Duration of layout/line animations in seconds */
  duration?: number
  /** Spring bounce (0-1) */
  bounce?: number
  /** Stagger delay between lines in seconds */
  stagger?: number
}

export function AnimatedWireframeLines({
  lineCount,
  lineGap,
  height,
  duration = 0.4,
  bounce = 0.1,
  stagger = 0.03,
}: AnimatedWireframeLinesProps) {
  // Generate stable keys for lines based on their index
  const lines = Array.from({ length: lineCount }, (_, i) => ({
    id: `line-${i}`,
    index: i,
    // Last line is shorter to simulate truncated text
    width: i === lineCount - 1 ? '60%' : '100%',
  }))

  // Line animation duration is proportional to main duration
  const lineDuration = duration * 0.4

  return (
    <div
      className="flex w-full flex-col justify-center overflow-hidden"
      style={{ height, gap: lineGap }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {lines.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, scaleY: 0.5 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.5 }}
            transition={{
              duration: lineDuration,
              delay: line.index * stagger,
            }}
            className="h-2 origin-center rounded-full bg-quaternary/40"
            style={{ width: line.width }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
