import { FC } from 'react'

interface ExpandVerticalArrowsProps {
  size?: number
  className?: string
}

const ExpandVerticalArrows: FC<ExpandVerticalArrowsProps> = ({ size = 16, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`expand-vertical-arrows ${className}`}
    >
      <style>{`
        .expand-vertical-arrows .arrow-up {
          transform: translateY(0px);
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .expand-vertical-arrows .arrow-down {
          transform: translateY(0px);
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .expand-arrows-active .expand-vertical-arrows .arrow-up {
          transform: translateY(-2px);
        }
        .expand-arrows-active .expand-vertical-arrows .arrow-down {
          transform: translateY(2px);
        }
      `}</style>

      {/* Up Chevron */}
      <g className="arrow-up">
        <path
          d="M5.5 5.5L8 3L10.5 5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Down Chevron */}
      <g className="arrow-down">
        <path
          d="M5.5 10.5L8 13L10.5 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export { ExpandVerticalArrows }
