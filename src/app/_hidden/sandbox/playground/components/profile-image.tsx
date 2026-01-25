'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import type { ProfileImageProps } from '../types'

// CSS for squircle clip path (matching Delphi's profile image)
const squircleClipPath = `path('M0 54C0 29.1898 0 16.7847 6.81896 8.91159C8.26871 7.21128 9.92653 5.70228 11.7549 4.42159C20.1339 -1.44861 33.1961 -1.44861 59.3206 -1.44861H84.6794C110.804 -1.44861 123.866 -1.44861 132.245 4.42159C134.073 5.70228 135.731 7.21128 137.181 8.91159C144 16.7847 144 29.1898 144 54V90C144 114.81 144 127.215 137.181 135.088C135.731 136.789 134.073 138.298 132.245 139.578C123.866 145.449 110.804 145.449 84.6794 145.449H59.3206C33.1961 145.449 20.1339 145.449 11.7549 139.578C9.92653 138.298 8.26871 136.789 6.81896 135.088C0 127.215 0 114.81 0 90V54Z')`

/**
 * Profile image with squircle mask and hover upload overlay
 * Uses semantic design tokens
 */
export function ProfileImage({ src, alt, onUpload }: ProfileImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onUpload) {
      onUpload(file)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="group relative cursor-pointer"
      >
        {/* Image container with squircle clip */}
        <div
          className="relative overflow-hidden shadow-lg"
          style={{
            width: 144,
            height: 144,
            clipPath: squircleClipPath,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 size-full object-cover"
          />
          {/* Inset shadow overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              clipPath: squircleClipPath,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* Hover overlay */}
        <div
          className={cn(
            'absolute inset-0 grid place-items-center',
            'bg-overlay/50',
            'opacity-0 transition-opacity duration-200',
            'group-hover:opacity-100'
          )}
          style={{
            clipPath: squircleClipPath,
          }}
        >
          <div className="flex flex-col items-center gap-1 text-white">
            {/* Camera icon */}
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14.25 7C13.1454 7 12.25 7.89543 12.25 9C12.25 10.1046 13.1454 11 14.25 11C15.3546 11 16.25 10.1046 16.25 9C16.25 7.89543 15.3546 7 14.25 7Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 3C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7ZM14.7071 13.2929L18.9323 17.518C18.9764 17.3528 19 17.1792 19 17V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V13.5858L7.29289 11.2929C7.68342 10.9024 8.31658 10.9024 8.70711 11.2929L12 14.5858L13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm font-medium">Upload</span>
          </div>
        </div>
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  )
}
