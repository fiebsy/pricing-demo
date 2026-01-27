'use client'

import type { ToastConfig } from '../config/types'

interface ToastProps {
  title: string
  subtitle: string
  visible: boolean
  config: ToastConfig
}

export function Toast(props: ToastProps) {
  if (!props.visible) return null
  
  return (
    <div className="p-4 bg-secondary rounded-2xl shadow-lg">
      <h3 className="font-medium">{props.title}</h3>
      <p className="text-sm text-secondary">{props.subtitle}</p>
    </div>
  )
}