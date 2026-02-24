/**
 * Demo Page Icon Components
 *
 * Extracted from demo page for modularity.
 */

export function CaretLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CaretDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 2.66666V13.3333M2.66666 7.99999H13.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AiLoadIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M3 12C8 10.5 10.5 8 12 3C13.5 8 16 10.5 21 12C16 13.5 13.5 16 12 21C10.5 16 8 13.5 3 12Z"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function VideoIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <path
        d="M1.75 7H4.29545M1.75 7V4.375M1.75 7V9.625M4.29545 7H9.70455M4.29545 7V9.625M4.29545 7V4.375M1.75 4.375V3.65909C1.75 2.60473 2.60473 1.75 3.65909 1.75H4.29545M1.75 4.375H4.29545M1.75 9.625V10.3409C1.75 11.3953 2.60473 12.25 3.65909 12.25H4.29545M1.75 9.625H4.29545M9.70455 7H12.25M9.70455 7V9.91665M9.70455 7V4.375M4.29545 9.625V12.25M4.29545 4.375V1.75M12.25 7V4.375M12.25 7V9.91665M9.70455 9.91665V12.25M9.70455 9.91665H12.25M9.70455 4.375V1.75M9.70455 4.375H12.25M12.25 4.375V3.65909C12.25 2.60473 11.3953 1.75 10.3409 1.75H9.70455M12.25 9.91665V10.3409C12.25 11.3953 11.3953 12.25 10.3409 12.25H9.70455M9.70455 12.25H4.29545M9.70455 1.75H4.29545"
        stroke="#4AA883"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CommandIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_cmd)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.12301 1.6478C3.40009 1.39203 3.76334 1.25 4.14043 1.25H7.85845C8.23555 1.25 8.5988 1.39203 8.8759 1.6478L11.0738 3.67665C11.6998 4.2545 11.7194 5.2371 11.117 5.8395L7.0601 9.89645C6.4743 10.4823 5.52455 10.4823 4.93878 9.89645L0.881846 5.8395C0.279432 5.2371 0.299075 4.2545 0.925086 3.67665L3.12301 1.6478ZM5.103 4.10356C5.29825 3.90829 5.29825 3.59171 5.103 3.39645C4.90774 3.20119 4.59116 3.20119 4.3959 3.39645L3.3959 4.39645C3.20064 4.59171 3.20064 4.9083 3.3959 5.10355L4.3959 6.10355C4.59116 6.2988 4.90774 6.2988 5.103 6.10355C5.29825 5.9083 5.29825 5.5917 5.103 5.39645L4.45656 4.75L5.103 4.10356Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_cmd">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 5.24537e-07)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
