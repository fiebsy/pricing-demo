'use client'

import type { StatusIslandConfig } from '../config/types'

export interface Notification {
  id: string
  type: 'upload_complete' | 'confidence_change' | 'regeneration' | 'info'
  title: string
  subtitle: string
  timestamp: Date
}

interface StatusIslandProps {
  config: StatusIslandConfig
  uploadProgress?: number
  filesUploaded?: number
  compositeScore?: number
  confidenceValue?: number
  confidenceLevel?: 'low' | 'medium' | 'high'
  notifications?: Notification[]
  onDismissNotification?: (id: string) => void
  position?: 'top-right' | 'bottom-center'
}

export function StatusIsland(props: StatusIslandProps) {
  return (
    <div className="fixed top-4 right-4 p-4 bg-secondary rounded-2xl shadow-lg">
      {props.config.showScore && props.compositeScore && (
        <div className="text-2xl font-bold">{props.compositeScore}</div>
      )}
      {props.config.showConfidence && props.confidenceValue && (
        <div className="text-sm text-secondary">Confidence: {props.confidenceValue}%</div>
      )}
      {props.config.showNotifications && props.notifications && props.notifications.length > 0 && (
        <div className="mt-2 space-y-1">
          {props.notifications.map((notif) => (
            <div key={notif.id} className="text-xs text-tertiary">
              {notif.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}