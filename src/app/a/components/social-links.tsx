'use client'

import { cn } from '@/lib/utils'
import { inputStyles } from './text-input'

interface SocialLinksProps {
  links: string[]
  onChange: (links: string[]) => void
}

/**
 * Social links list with URL parsing and domain icons
 */
export function SocialLinks({ links, onChange }: SocialLinksProps) {
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    onChange(newLinks)
  }

  const handleRemove = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index)
    onChange(newLinks)
  }

  const handleAdd = () => {
    onChange([...links, ''])
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="ml-3.5 text-sm font-medium text-[var(--color-gray-900)]">
        Social Links
      </h3>
      <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <SocialLinkItem
            key={index}
            value={link}
            onChange={(value) => handleLinkChange(index, value)}
            onRemove={() => handleRemove(index)}
          />
        ))}

        {/* Add link button */}
        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            'flex w-fit cursor-pointer items-center gap-2',
            'rounded-xl bg-[var(--color-gray-900)]/5 px-3 py-2.5',
            'text-sm text-[var(--color-gray-600)]',
            'hover:bg-[var(--color-gray-900)]/10',
            'transition-colors'
          )}
        >
          {/* Plus icon */}
          <svg
            className="size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6C12.4142 6 12.75 6.33579 12.75 6.75V11.25H17.25C17.6642 11.25 18 11.5858 18 12C18 12.4142 17.6642 12.75 17.25 12.75H12.75V17.25C12.75 17.6642 12.4142 18 12 18C11.5858 18 11.25 17.6642 11.25 17.25V12.75H6.75C6.33579 12.75 6 12.4142 6 12C6 11.5858 6.33579 11.25 6.75 11.25H11.25V6.75C11.25 6.33579 11.5858 6 12 6Z"
              fill="currentColor"
            />
          </svg>
          Add link
        </button>
      </div>
    </div>
  )
}

/**
 * Parse URL to extract domain and path for display
 */
function parseUrl(url: string): { domain: string; path: string; icon: 'linkedin' | 'globe' } {
  // Normalize URL - add protocol if missing
  let normalizedUrl = url
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    normalizedUrl = `https://${url}`
  }

  try {
    const urlObj = new URL(normalizedUrl)
    const hostname = urlObj.hostname.replace('www.', '')
    const path = urlObj.pathname.replace(/^\//, '').replace(/\/$/, '')

    // Determine icon based on domain
    let icon: 'linkedin' | 'globe' = 'globe'
    if (hostname.includes('linkedin.com')) {
      icon = 'linkedin'
    }

    return {
      domain: hostname,
      path: path || '',
      icon,
    }
  } catch {
    return {
      domain: url,
      path: '',
      icon: 'globe',
    }
  }
}

/**
 * Individual social link input with domain icon and parsed display
 */
function SocialLinkItem({
  value,
  onChange,
  onRemove,
}: {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}) {
  const parsed = parseUrl(value)
  const hasValue = value.length > 0

  return (
    <div
      style={{
        opacity: 1,
        height: 'auto',
        transform: 'none',
        transformOrigin: '0% 50% 0px',
      }}
    >
      <div
        className="relative w-fit min-w-[260px] max-w-full"
        style={{ transform: 'none' }}
      >
        {/* Domain icon */}
        <div className="absolute left-3 top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center rounded">
          {parsed.icon === 'linkedin' ? (
            <LinkedInIcon />
          ) : (
            <GlobeIcon />
          )}
        </div>

        {/* Parsed URL display overlay */}
        {hasValue && (
          <div
            className={cn(
              'pointer-events-none absolute top-1/2 z-10 -translate-y-1/2',
              'text-sm transition-opacity duration-200',
              'opacity-100'
            )}
            style={{ left: '2.5rem' }}
          >
            <span className="text-[var(--color-gray-900)]/50">
              {parsed.domain}
              {parsed.path && '/'}
            </span>
            <span className="text-[var(--color-gray-900)]">{parsed.path}</span>
          </div>
        )}

        {/* Actual input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add link"
          className={cn(
            inputStyles,
            'h-10 w-full px-4 py-2.5',
            '[field-sizing:content]'
          )}
          style={{
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
            minWidth: '260px',
            fontSize: '14px',
            transition: 'color 200ms',
            caretColor: 'var(--color-gray-900)',
            color: hasValue ? 'transparent' : 'inherit',
          }}
        />

        {/* Remove button */}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove link"
          className={cn(
            'absolute right-2 top-1/2 z-10 -translate-y-1/2',
            'flex size-5 cursor-pointer items-center justify-center rounded'
          )}
        >
          <svg
            className="size-3.5 text-[var(--color-gray-500)] transition-opacity duration-200"
            style={{ opacity: 0.4 }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 5L19 19M19 5L5 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

function LinkedInIcon() {
  return (
    <svg
      className="size-4 text-[var(--color-gray-500)]"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19.65 3H4.35C3.99196 3 3.64858 3.14223 3.39541 3.39541C3.14223 3.64858 3 3.99196 3 4.35V19.65C3 20.008 3.14223 20.3514 3.39541 20.6046C3.64858 20.8578 3.99196 21 4.35 21H19.65C20.008 21 20.3514 20.8578 20.6046 20.6046C20.8578 20.3514 21 20.008 21 19.65V4.35C21 3.99196 20.8578 3.64858 20.6046 3.39541C20.3514 3.14223 20.008 3 19.65 3ZM8.4 18.3H5.7V10.2H8.4V18.3ZM7.05 8.625C6.74056 8.61616 6.4406 8.51632 6.18758 8.33797C5.93456 8.15962 5.7397 7.91066 5.62737 7.6222C5.51503 7.33374 5.49019 7.01857 5.55595 6.71607C5.6217 6.41358 5.77515 6.13716 5.9971 5.92138C6.21906 5.70559 6.49968 5.55999 6.80391 5.50278C7.10814 5.44556 7.42248 5.47927 7.70766 5.59969C7.99284 5.7201 8.23622 5.92189 8.40737 6.17983C8.57853 6.43778 8.66987 6.74044 8.67 7.05C8.66289 7.47331 8.4885 7.8766 8.18495 8.17173C7.88139 8.46685 7.47335 8.62982 7.05 8.625ZM18.3 18.3H15.6V14.034C15.6 12.756 15.06 12.297 14.358 12.297C14.1522 12.3107 13.9511 12.3649 13.7663 12.4566C13.5815 12.5482 13.4166 12.6755 13.2811 12.831C13.1457 12.9866 13.0422 13.1674 12.9768 13.363C12.9114 13.5586 12.8853 13.7652 12.9 13.971C12.8955 14.0129 12.8955 14.0551 12.9 14.097V18.3H10.2V10.2H12.81V11.37C13.0733 10.9695 13.435 10.6433 13.8605 10.4227C14.286 10.2021 14.761 10.0944 15.24 10.11C16.635 10.11 18.264 10.884 18.264 13.404L18.3 18.3Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg
      className="size-4 text-[var(--color-gray-500)]"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C9.79086 21 8 16.9706 8 12C8 7.02944 9.79086 3 12 3M12 21C14.2091 21 16 16.9706 16 12C16 7.02944 14.2091 3 12 3M3 12C3 7.02944 7.02944 3 12 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}
