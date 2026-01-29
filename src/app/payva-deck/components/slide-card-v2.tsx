'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'
import { contentDelays } from '../lib/animations'
import { CSSProperties } from 'react'

interface SlideCardV2Props {
  children: React.ReactNode
  /** Classes for customization (padding, etc.) */
  className?: string
  /** Enable entrance animation */
  animate?: boolean
  /** Animation delay in seconds */
  delay?: number
  /** Motion props for custom animations */
  motionProps?: Omit<HTMLMotionProps<'div'>, 'className' | 'style'>
  /** Export mode for conditional rendering */
  exportMode?: 'screen' | 'desktop-export' | 'mobile-export'
}

/**
 * Generate SVG gradient as data URI for mobile fallback
 */
function generateGradientSVG(fromColor = '#f5f5f7', toColor = '#fafafa'): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${fromColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${toColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#gradient)" />
    </svg>
  `.replace(/\n/g, '').replace(/\s+/g, ' ').trim()
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function SlideCardV2({
  children,
  className,
  animate = true,
  delay = contentDelays.stat,
  motionProps,
  exportMode = 'screen',
}: SlideCardV2Props) {
  
  // Determine styles based on export mode
  const getCardStyles = (): { className: string; style?: CSSProperties } => {
    switch (exportMode) {
      case 'mobile-export':
        // Simplified styles for mobile PDF export
        return {
          className: cn(
            // Simple rounded corners (no corner-squircle)
            'rounded-2xl',
            // Solid background color
            'bg-tertiary',
            // Simple border instead of complex shine
            'border border-secondary',
            className
          ),
          style: {
            // SVG gradient fallback for mobile
            backgroundImage: `url("${generateGradientSVG('#f5f5f7', '#fafafa')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Simple box shadow instead of complex shine
            boxShadow: 'inset 0 0 0 1px rgba(100, 100, 110, 0.15)',
          }
        }
      
      case 'desktop-export':
        // Full effects for desktop PDF export (no animation)
        return {
          className: cn(
            'rounded-[40px] corner-squircle',
            'bg-gradient-to-br from-tertiary to-quaternary',
            'shine-1',
            className
          )
        }
      
      case 'screen':
      default:
        // Full effects with animation for screen viewing
        return {
          className: cn(
            'rounded-[40px] corner-squircle',
            'bg-tertiary',
            'border border-secondary',
            className
          )
        }
    }
  }

  const cardStyles = getCardStyles()

  // Static rendering for exports or when animation is disabled
  if (!animate || exportMode !== 'screen') {
    return (
      <div 
        className={cardStyles.className}
        style={cardStyles.style}
        data-card-v2={exportMode}
      >
        {children}
      </div>
    )
  }

  // Animated rendering for screen viewing
  return (
    <motion.div
      className={cardStyles.className}
      style={cardStyles.style}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      data-card-v2={exportMode}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

/**
 * Hook to determine export mode from DOM context
 * This allows components to automatically adapt based on parent container
 */
export function useExportMode(): 'screen' | 'desktop-export' | 'mobile-export' {
  if (typeof window === 'undefined') return 'screen'
  
  // Check for export mode data attribute on parent containers
  const exportContainer = document.querySelector('[data-export-v2]')
  if (exportContainer) {
    const mode = exportContainer.getAttribute('data-export-v2')
    if (mode === 'mobile') return 'mobile-export'
    if (mode === 'desktop') return 'desktop-export'
  }
  
  // Check for PDF export mode class
  if (document.querySelector('.pdf-export-mode-v2.mobile-export')) {
    return 'mobile-export'
  }
  if (document.querySelector('.pdf-export-mode-v2.desktop-export')) {
    return 'desktop-export'
  }
  
  return 'screen'
}