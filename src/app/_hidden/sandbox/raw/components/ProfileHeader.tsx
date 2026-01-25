'use client'

import { cn } from '@/lib/utils'

interface ProfileHeaderProps {
  onEdit: () => void
}

/**
 * ProfileHeader - Header actions bar
 *
 * Contains:
 * - Private badge
 * - Share button
 * - Edit button
 */
export function ProfileHeader({ onEdit }: ProfileHeaderProps) {
  return (
    <div className="absolute right-0 top-0">
      <div
        className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2"
        style={{
          animationDuration: '500ms',
          animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Private badge */}
        <span
          className={cn(
            'flex items-center gap-1.5',
            'px-2.5 py-1.5',
            'rounded-full',
            'text-sm font-medium',
            'bg-tertiary',
            'text-tertiary'
          )}
        >
          <LockIcon />
          Private
        </span>

        {/* Share button */}
        <button
          type="button"
          className={cn(
            'cursor-pointer select-none',
            'flex items-center justify-center gap-1.5',
            'px-3 py-1.5',
            'rounded-full',
            'text-base font-[450]',
            'backdrop-blur-sm',
            'bg-quaternary',
            'text-primary',
            'hover:text-primary',
            'hover:bg-quaternary',
            'active:bg-quaternary',
            'transition-colors',
            'border border-transparent'
          )}
        >
          <ShareIcon />
          Share
        </button>

        {/* Edit button */}
        <button
          type="button"
          onClick={onEdit}
          className={cn(
            'cursor-pointer select-none',
            'flex items-center justify-center',
            'px-3 py-1.5 gap-1.5',
            'rounded-full',
            'text-base font-[450]',
            'backdrop-blur-sm',
            'bg-brand-solid',
            'text-white',
            'hover:bg-brand-solid_hover',
            'active:bg-brand-solid_hover',
            'transition-colors',
            'border border-transparent'
          )}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

// Icons
function LockIcon() {
  return (
    <svg
      className="size-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg
      className="size-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 9L21 3M21 3H15M21 3L13 11M10 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
