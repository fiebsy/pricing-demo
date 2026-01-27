'use client'

import type { CardConfig, SwipeConfig } from '../config/types'

interface SwipeableCardProps {
  text: string
  isActive: boolean
  position: number
  onSwipe: (isTrue: boolean) => void
  cardConfig: CardConfig
  swipeConfig: SwipeConfig
  triggerDirection: 'left' | 'right' | null
}

export function SwipeableCard(props: SwipeableCardProps) {
  return <div className="absolute inset-0 bg-secondary rounded-2xl p-4">{props.text}</div>
}