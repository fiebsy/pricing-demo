'use client'

export default function DemoRawPage() {
  return (
    <div className="h-screen w-full max-h-screen font-normal bg-white">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-6 h-6 shrink-0 bg-white rounded-full shadow-[0px_0px_0px_1px_rgba(17,24,39,0.08),0px_2px_2px_-1px_rgba(17,24,39,0.08),0px_4px_4px_0px_rgba(17,24,39,0.04)] hover:bg-gray-50 transition-all">
            <CaretLeftIcon />
          </button>
          <div className="flex w-px h-5 bg-gray-200 shrink-0"></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md border border-white bg-[#EAF9F3] shadow-[0px_0px_0px_1px_rgba(17,24,39,0.12)] w-5 h-5 shrink-0">
              <VideoIcon />
            </div>
            <span className="font-semibold text-sm text-gray-900">Video</span>
            <span className="px-[5px] py-0.5 bg-white rounded-lg inline-flex justify-start items-center gap-0.5 overflow-hidden ml-1 border border-gray-200">
              <CommandIcon />
              <span className="text-gray-900 text-xs font-semibold">20</span>
            </span>
          </div>
        </div>
        <button className="hidden text-sm font-medium text-gray-500 hover:text-gray-700">
          Edit
        </button>
      </div>

      {/* Main Content */}
      <div className="flex min-[980px]:flex-row flex-col p-12 pt-8 min-[980px]:h-[calc(100vh-4rem)] h-full w-full min-[980px]:justify-center justify-start min-[980px]:items-center items-start min-[980px]:gap-12 gap-8 text-sm">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-5 min-[980px]:w-[304px] w-full shrink-0 min-[980px]:h-full h-auto justify-between max-h-[800px] relative z-1">
          <div className="flex flex-col gap-5 relative z-1 h-full overflow-scroll">
            {/* Prompt Section */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Prompt
              </label>
              <div className="relative">
                <textarea
                  placeholder="Describe your video or drop your script and assets here..."
                  className="text-gray-900 placeholder:text-gray-500 h-40 w-full resize-none rounded-lg bg-gray-100 p-3 focus:outline-none hover:bg-gray-200 focus:bg-gray-200 transition-colors flex items-center justify-between"
                />
                <button className="absolute left-2 bottom-2 text-gray-900 w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all bg-white/0 shadow-none hover:bg-white hover:shadow-[0px_0px_0px_1px_rgba(17,24,39,0.08),0px_2px_2px_-1px_rgba(17,24,39,0.08),0px_4px_4px_0px_rgba(17,24,39,0.04)]">
                  <PlusIcon />
                </button>
              </div>
            </div>

            {/* Brand Kit Section */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Brand Kit
              </label>
              <button className="w-full rounded-lg bg-gray-100 p-2 pr-3 h-14 hover:bg-gray-200 transition-colors flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 w-full min-w-0">
                  <div className="h-10 shrink-0 relative aspect-3/2 overflow-hidden rounded-lg bg-[#50BFFF] text-white text-sm font-bold flex items-center justify-center">
                    Aa
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      Dovetail
                    </div>
                    <div className="text-xs text-gray-500">
                      Recently updated
                    </div>
                  </div>
                </div>
                <CaretDownIcon />
              </button>
            </div>

            {/* Length Section */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Length
              </label>
              <button className="w-full h-9 rounded-lg p-2 pl-3 pr-3 transition-colors bg-gray-100 hover:bg-gray-200 flex items-center justify-between gap-4">
                <span className="text-sm text-gray-900">~ 1 minute</span>
                <CaretDownIcon />
              </button>
            </div>
          </div>
          {/* Generate Button */}
          <button className="w-full shrink-0 text-sm font-semibold cursor-pointer rounded-lg transition-colors no-animation focus:outline-none bg-blue-600 border border-blue-700 text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.12),0px_0px_0px_1px_rgba(17,24,39,0.12),0px_2px_2px_-2px_rgba(17,24,39,0.08),0px_4px_4px_0px_rgba(17,24,39,0.04)] hover:bg-blue-500 hover:border-blue-600 active:bg-blue-600 active:border-blue-700 active:shadow-none !h-9 px-4 text-sm relative">
            Generate
            <span className="px-[5px] py-0.5 bg-white rounded-lg inline-flex justify-start items-center gap-0.5 overflow-hidden ml-2 shadow-[0px_0px_0px_1px_rgba(17,24,39,0.12),0px_2px_2px_-2px_rgba(17,24,39,0.03),0px_4px_4px_0px_rgba(17,24,39,0.03),0px_8px_8px_0px_rgba(17,24,39,0.03),0px_16px_16px_0px_rgba(17,24,39,0.03)] text-gray-900 text-xs font-semibold">
              <CommandIcon />
              100
            </span>
          </button>
        </div>

        {/* Right Preview Area */}
        <div className="flex min-[980px]:flex-1 flex-initial min-[980px]:h-full h-auto w-full justify-center items-center max-h-none sm:max-h-[800px] min-w-0 min-h-[480px]">
          <div className="flex flex-col gap-2 h-full w-full items-center justify-center select-none bg-gray-50 rounded-2xl border-8 border-white shadow-[0px_0px_0px_1px_rgba(17,24,39,0.08)]">
            <AiLoadIcon className="mb-3" />
            <p className="text-sm text-gray-400">Ready when you are</p>
            <p className="text-sm text-gray-300">
              Adjust settings on the left panel to begin
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Icon Components
function CaretLeftIcon({ className }: { className?: string }) {
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
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CaretDownIcon({ className }: { className?: string }) {
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
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
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

function AiLoadIcon({ className }: { className?: string }) {
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

function VideoIcon({ className }: { className?: string }) {
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

function CommandIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_cmd_raw)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.12301 1.6478C3.40009 1.39203 3.76334 1.25 4.14043 1.25H7.85845C8.23555 1.25 8.5988 1.39203 8.8759 1.6478L11.0738 3.67665C11.6998 4.2545 11.7194 5.2371 11.117 5.8395L7.0601 9.89645C6.4743 10.4823 5.52455 10.4823 4.93878 9.89645L0.881846 5.8395C0.279432 5.2371 0.299075 4.2545 0.925086 3.67665L3.12301 1.6478ZM5.103 4.10356C5.29825 3.90829 5.29825 3.59171 5.103 3.39645C4.90774 3.20119 4.59116 3.20119 4.3959 3.39645L3.3959 4.39645C3.20064 4.59171 3.20064 4.9083 3.3959 5.10355L4.3959 6.10355C4.59116 6.2988 4.90774 6.2988 5.103 6.10355C5.29825 5.9083 5.29825 5.5917 5.103 5.39645L4.45656 4.75L5.103 4.10356Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_cmd_raw">
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
