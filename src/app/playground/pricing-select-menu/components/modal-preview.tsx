/**
 * ModalPreview Component
 *
 * Renders playground content within a static modal-like container
 * for testing positioning and transitions in a modal context.
 */

import { cn } from '@/lib/utils'
import type { ModalPreviewConfig } from '../config/types'
import { getBackgroundClass, getBorderColorClass } from '../utils/style-mappers'

interface ModalPreviewProps {
  config: ModalPreviewConfig
  children: React.ReactNode
  controls?: React.ReactNode
}

const backdropClasses: Record<ModalPreviewConfig['background'], string> = {
  none: '',
  light: 'bg-white/50',
  dark: 'bg-black/50',
  blur: 'bg-black/30 backdrop-blur-sm',
}

export function ModalPreview({ config, children, controls }: ModalPreviewProps) {
  if (!config.enabled) {
    return (
      <div className="flex flex-col items-center gap-6">
        {children}
        {controls}
      </div>
    )
  }

  const modalStyle: React.CSSProperties = {
    width: config.modalWidth,
    height: config.modalHeight,
    borderRadius: config.modalBorderRadius,
    borderWidth: config.modalBorderWidth,
    borderStyle: config.modalBorderWidth > 0 ? 'solid' : undefined,
  }

  return (
    <div className={cn('fixed inset-0 flex flex-col items-center justify-center gap-6', backdropClasses[config.background])}>
      <div
        className={cn(
          'flex items-center justify-center p-6 shadow-xl',
          getBackgroundClass(config.modalBackground),
          config.modalBorderWidth > 0 && getBorderColorClass(config.modalBorderColor)
        )}
        style={modalStyle}
      >
        {children}
      </div>
      {controls}
    </div>
  )
}
