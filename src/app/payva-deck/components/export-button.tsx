'use client'

import { useCallback } from 'react'
import PrinterIcon from '@hugeicons-pro/core-stroke-rounded/PrinterIcon'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { cn } from '@/lib/utils'

interface ExportButtonProps {
  onExport?: () => void
}

export function ExportButton({ onExport }: ExportButtonProps) {
  const handleExport = useCallback(() => {
    // Add print-mode class for PDF export
    document.body.classList.add('print-mode')

    // Trigger print dialog
    window.print()

    // Remove print-mode class after print dialog closes
    const cleanup = () => {
      document.body.classList.remove('print-mode')
      window.removeEventListener('afterprint', cleanup)
    }
    window.addEventListener('afterprint', cleanup)

    onExport?.()
  }, [onExport])

  return (
    <button
      onClick={handleExport}
      className={cn(
        'print-hidden',
        'flex items-center gap-2 px-4 py-2',
        'text-sm text-secondary hover:text-primary',
        'bg-secondary hover:bg-tertiary',
        'rounded-lg',
        'transition-colors duration-200',
        'motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary'
      )}
      aria-label="Export to PDF"
    >
      <HugeIcon icon={PrinterIcon} size={16} />
      <span>Export PDF</span>
    </button>
  )
}
