'use client'

import { useCallback, useState } from 'react'
import PrinterIcon from '@hugeicons-pro/core-stroke-rounded/PrinterIcon'
import Loading03Icon from '@hugeicons-pro/core-stroke-rounded/Loading03Icon'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { cn } from '@/lib/utils'

interface ExportButtonProps {
  onExport?: () => void
}

/**
 * Export button that generates a PDF via server-side Puppeteer.
 * Produces perfectly-formatted slides matching PowerPoint dimensions.
 */
export function ExportButton({ onExport }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = useCallback(async () => {
    if (isExporting) return

    setIsExporting(true)

    try {
      const response = await fetch('/api/payva-deck/export-pdf')

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Export failed')
      }

      // Get the PDF blob and trigger download
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      // Extract filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch?.[1] || 'PAYVA-Pitch-Deck.pdf'

      // Create download link and click it
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the blob URL
      URL.revokeObjectURL(url)

      onExport?.()
    } catch (error) {
      console.error('PDF export failed:', error)
      // Could add toast notification here
    } finally {
      setIsExporting(false)
    }
  }, [isExporting, onExport])

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={cn(
        'print-hidden',
        'flex items-center gap-2 px-4 py-2',
        'text-sm text-secondary hover:text-primary',
        'bg-secondary hover:bg-tertiary',
        'rounded-lg',
        'transition-colors duration-200',
        'motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
      aria-label={isExporting ? 'Exporting PDF...' : 'Export to PDF'}
    >
      <HugeIcon
        icon={isExporting ? Loading03Icon : PrinterIcon}
        size={16}
        className={isExporting ? 'animate-spin' : ''}
      />
      <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
    </button>
  )
}
