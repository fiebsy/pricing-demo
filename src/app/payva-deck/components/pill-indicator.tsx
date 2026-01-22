'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface PillIndicatorProps {
  total: number
  current: number
  onSelect: (index: number) => void
}

export function PillIndicator({ total, current, onSelect }: PillIndicatorProps) {
  return (
    <div className="print-hidden flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(index)}
          className={cn(
            'h-[3px] rounded-full',
            'transition-colors duration-200',
            'motion-reduce:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
            index === current
              ? 'bg-[var(--color-fg-primary)]'
              : 'bg-[var(--color-fg-disabled_subtle)] hover:bg-[var(--color-fg-quaternary)]'
          )}
          animate={{
            width: index === current ? 12 : 6,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current ? 'true' : undefined}
        />
      ))}
    </div>
  )
}
