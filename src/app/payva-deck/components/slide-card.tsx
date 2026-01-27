'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'
import { contentDelays } from '../lib/animations'

interface SlideCardProps {
  children: React.ReactNode
  /** Classes for customization (padding, etc.) */
  className?: string
  /** Enable entrance animation */
  animate?: boolean
  /** Animation delay in seconds */
  delay?: number
  /** Motion props for custom animations */
  motionProps?: Omit<HTMLMotionProps<'div'>, 'className' | 'style'>
}

export function SlideCard({
  children,
  className,
  animate = true,
  delay = contentDelays.stat,
  motionProps,
}: SlideCardProps) {
  const cardClasses = cn(
    'rounded-2xl corner-squircle shine-1',
    'bg-gradient-to-br from-tertiary to-quaternary',
    className
  )

  if (!animate) {
    return (
      <div className={cardClasses}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
