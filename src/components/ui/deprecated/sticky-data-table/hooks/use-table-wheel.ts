import { useEffect } from 'react'

interface UseTableWheelProps {
  bodyScrollRef: React.RefObject<HTMLDivElement | null>
}

export function useTableWheel({ bodyScrollRef }: UseTableWheelProps) {
  useEffect(() => {
    const bodyScroll = bodyScrollRef.current
    if (!bodyScroll) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // CRITICAL: preventDefault FIRST to stop browser's default scroll handling
        e.preventDefault()
        e.stopPropagation()

        // Redirect vertical scroll to the window
        window.scrollBy({
          top: e.deltaY,
          behavior: 'instant',
        })
      }
    }

    bodyScroll.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      bodyScroll.removeEventListener('wheel', handleWheel)
    }
  }, [bodyScrollRef])
}
