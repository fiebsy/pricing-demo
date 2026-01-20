'use client'

import { useEffect } from 'react'

export default function CarouselLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    document.body.classList.add('hide-nav')
    return () => document.body.classList.remove('hide-nav')
  }, [])

  return (
    <>
      <style>{`
        body.hide-nav nav,
        body.hide-nav [role="switch"] {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  )
}
