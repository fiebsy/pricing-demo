'use client'

import { useState } from 'react'
import { SettingsModal } from './settings-modal'

export function UserMenu() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setSettingsOpen(true)}
        className="relative flex items-center justify-center"
      >
        {/* Avatar */}
        <img
          src="/character-avatars/goku.jpg"
          alt="User avatar"
          className="size-8 rounded-full object-cover"
        />
        {/* Status Indicator */}
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-primary bg-success-primary" />
      </button>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
