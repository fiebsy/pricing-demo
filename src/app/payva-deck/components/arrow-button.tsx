'use client'

import { motion } from 'motion/react'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { cn } from '@/lib/utils'

interface ArrowButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
  disabled?: boolean
}

export function ArrowButton({ direction, onClick, disabled }: ArrowButtonProps) {
  const Icon = direction === 'left' ? ArrowLeft01Icon : ArrowRight01Icon

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'print-hidden',
        'flex items-center justify-center',
        'w-36 h-36',
        'text-secondary hover:text-primary',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        'transition-all duration-200',
        'motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary'
      )}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <HugeIcon icon={Icon} size={60} strokeWidth="medium" className="opacity-30" />
    </motion.button>
  )
}
