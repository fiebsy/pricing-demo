'use client'

import { Dialog } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            'fixed inset-0 z-50 bg-black/50',
            'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            'transition-opacity duration-200'
          )}
        />
        <Dialog.Popup
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-2xl bg-secondary p-6 shadow-xl',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            'transition-all duration-200'
          )}
        >
          <Dialog.Title className="text-lg font-semibold text-primary">
            Settings
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-secondary">
            Configure your preferences and account settings.
          </Dialog.Description>

          {/* Settings Content Placeholder */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-tertiary/30 p-3">
              <span className="text-sm text-primary">Theme</span>
              <span className="text-sm text-tertiary">System</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-tertiary/30 p-3">
              <span className="text-sm text-primary">Notifications</span>
              <span className="text-sm text-tertiary">Enabled</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-tertiary/30 p-3">
              <span className="text-sm text-primary">Language</span>
              <span className="text-sm text-tertiary">English</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Dialog.Close
              className={cn(
                'rounded-lg bg-brand-solid px-4 py-2 text-sm font-medium text-on-brand',
                'transition-colors hover:bg-brand-solid-hover'
              )}
            >
              Done
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
