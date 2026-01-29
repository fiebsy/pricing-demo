'use client'

import { useCallback, useState, useEffect } from 'react'
import PrinterIcon from '@hugeicons-pro/core-stroke-rounded/PrinterIcon'
import Loading03Icon from '@hugeicons-pro/core-stroke-rounded/Loading03Icon'
import SmartPhone01Icon from '@hugeicons-pro/core-stroke-rounded/SmartPhone01Icon'
import LaptopIcon from '@hugeicons-pro/core-stroke-rounded/LaptopIcon'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { cn } from '@/lib/utils'

interface ExportButtonV2Props {
  onExport?: () => void
  /** Show device indicator */
  showDeviceIndicator?: boolean
  /** Force specific mode for testing */
  forceMode?: 'auto' | 'desktop' | 'mobile'
}

/**
 * Export button V2 with mobile detection and fallbacks
 * Uses the new /api/payva-deck/export-pdf-v2 endpoint
 */
export function ExportButtonV2({ 
  onExport, 
  showDeviceIndicator = true,
  forceMode = 'auto'
}: ExportButtonV2Props) {
  const [isExporting, setIsExporting] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  
  // Detect if running on mobile device
  useEffect(() => {
    if (forceMode !== 'auto') {
      setIsMobileDevice(forceMode === 'mobile')
      return
    }
    
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || ''
      const mobileRegex = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i
      setIsMobileDevice(mobileRegex.test(userAgent))
    }
    
    checkMobile()
    
    // Also check on resize in case of device emulation
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [forceMode])

  const handleExport = useCallback(async () => {
    if (isExporting) return

    setIsExporting(true)

    try {
      // Use V2 endpoint
      const response = await fetch('/api/payva-deck/export-pdf-v2')

      if (!response.ok) {
        const error = await response.json()
        console.error('Export V2 failed:', error)
        throw new Error(error.message || 'Export failed')
      }

      // Get export mode from response headers
      const exportMode = response.headers.get('X-Export-Mode')
      const exportVersion = response.headers.get('X-Export-Version')
      console.log(`Export successful: ${exportVersion} in ${exportMode} mode`)

      // Get the PDF blob and trigger download
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch?.[1] || `PAYVA-Pitch-Deck-V2-${isMobileDevice ? 'Mobile' : 'Desktop'}.pdf`

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
      console.error('PDF Export V2 failed:', error)
      // Could add toast notification here
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsExporting(false)
    }
  }, [isExporting, isMobileDevice, onExport])

  return (
    <div className="flex items-center gap-2">
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
        aria-label={isExporting ? 'Exporting PDF...' : 'Export to PDF (V2)'}
      >
        <HugeIcon
          icon={isExporting ? Loading03Icon : PrinterIcon}
          size={16}
          className={isExporting ? 'animate-spin' : ''}
        />
        <span>{isExporting ? 'Exporting...' : 'Export PDF V2'}</span>
      </button>
      
      {showDeviceIndicator && !isExporting && (
        <div 
          className={cn(
            'flex items-center gap-1 px-3 py-1.5',
            'text-xs',
            'rounded-md',
            isMobileDevice 
              ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
              : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
          )}
          title={isMobileDevice ? 'Mobile export mode' : 'Desktop export mode'}
        >
          <HugeIcon
            icon={isMobileDevice ? SmartPhone01Icon : LaptopIcon}
            size={14}
          />
          <span>{isMobileDevice ? 'Mobile' : 'Desktop'}</span>
        </div>
      )}
    </div>
  )
}