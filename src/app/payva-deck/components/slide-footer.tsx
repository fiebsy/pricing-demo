'use client'

interface SlideFooterProps {
  current: number
  total: number
}

export function SlideFooter({ current, total }: SlideFooterProps) {
  return (
    <div className="hidden print:block absolute bottom-8 right-8 text-sm text-tertiary font-mono">
      {current + 1} / {total}
    </div>
  )
}
