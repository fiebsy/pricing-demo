'use client'

import { cn } from '@/lib/utils'
import { config, bgColorVars } from '../config'

interface AskMeAboutCardProps {
  questions: string[]
}

/**
 * AskMeAboutCard - Questions section with styling
 *
 * Contains:
 * - Header with chat icon and "Chats" button
 * - Question buttons with staggered animations
 * - Hardcoded padding/radius from config
 */
export function AskMeAboutCard({ questions }: AskMeAboutCardProps) {
  if (questions.length === 0) return null

  const {
    questionsBackground,
    questionsBackgroundOpacity,
    questionsSectionPaddingX,
    questionsSectionPaddingY,
    questionsHeaderPaddingX,
    questionsHeaderPaddingY,
    questionsItemsInset,
    questionsItemsPaddingX,
    questionsItemsPaddingY,
    questionsItemsBorderRadius,
  } = config

  // Background style with opacity
  const opacity = questionsBackgroundOpacity / 100
  const backgroundStyle: React.CSSProperties =
    opacity === 0
      ? { backgroundColor: 'transparent' }
      : {
          backgroundColor: `color-mix(in srgb, ${bgColorVars[questionsBackground]} ${opacity * 100}%, transparent)`,
        }

  return (
    <div
      className={cn(
        '-ml-5.5 -mr-5.5 mb-8 rounded-none pb-2 md:rounded-[30px]',
        'animate-in fade-in slide-in-from-bottom-4',
        'text-secondary'
      )}
      style={{
        ...backgroundStyle,
        paddingLeft: questionsSectionPaddingX,
        paddingRight: questionsSectionPaddingX,
        paddingTop: questionsSectionPaddingY,
        paddingBottom: 8,
        animationDelay: '240ms',
        animationDuration: '500ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationFillMode: 'backwards',
      }}
    >
      {/* Questions header */}
      <div
        className="flex w-full items-center justify-between"
        style={{
          paddingLeft: questionsHeaderPaddingX,
          paddingRight: questionsHeaderPaddingX,
          paddingBottom: questionsHeaderPaddingY,
        }}
      >
        <h2 className="relative w-full text-xl font-[580]">
          <div className="flex w-full items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 animate-in fade-in duration-300">
              <ChatBubbleIcon />
              Ask me about
            </span>
            <div className="absolute right-[-8px] top-[-8px]">
              <button
                type="button"
                className={cn(
                  'flex h-[34px] items-center gap-4 px-2 py-1.5',
                  'rounded-full',
                  'text-base font-[450]',
                  'backdrop-blur-xs',
                  'bg-quaternary',
                  'text-primary',
                  'hover:text-primary',
                  'hover:bg-quaternary',
                  'opacity-70',
                  'cursor-pointer',
                  'animate-in zoom-in-95 duration-200'
                )}
              >
                <span className="flex items-center gap-1 text-[13px] font-[500] sm:pr-1">
                  <HistoryIcon />
                  <span>Chats</span>
                </span>
              </button>
            </div>
          </div>
        </h2>
      </div>

      {/* Question items */}
      <div
        className="flex flex-col gap-2"
        style={{ marginLeft: questionsItemsInset }}
      >
        {questions.map((question, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'w-fit cursor-pointer bg-tertiary',
              'text-left',
              'hover:bg-quaternary',
              'transition-all duration-400 active:scale-95',
              'animate-in fade-in slide-in-from-bottom-4'
            )}
            style={{
              paddingLeft: questionsItemsPaddingX,
              paddingRight: questionsItemsPaddingX,
              paddingTop: questionsItemsPaddingY,
              paddingBottom: questionsItemsPaddingY,
              borderRadius: questionsItemsBorderRadius,
              animationDelay: `${80 + index * 80}ms`,
              animationDuration: '500ms',
              animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              animationFillMode: 'backwards',
            }}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

// Icons
function ChatBubbleIcon() {
  return (
    <svg
      className="size-4"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.999 9.505c0 4.73-4.59 8.273-9.853 8.273-1.214 0-2.38-.185-3.459-.523-.431.315-.94.584-1.441.803-.709.309-1.48.552-2.173.698-.644.136-1.372.222-1.915.09-.25-.06-.788-.25-.97-.843-.17-.559.122-1.027.296-1.254.976-1.276 1.383-1.912 1.472-2.637C.916 12.808.293 11.224.293 9.505c0-4.73 4.589-8.273 9.853-8.273s9.853 3.543 9.853 8.273"
        fill="currentColor"
      />
    </svg>
  )
}

function HistoryIcon() {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5.99932V5C4 4.44772 3.55228 4 3 4C2.44772 4 2 4.44772 2 5V9C2 9.55228 2.44772 10 3 10H7C7.55228 10 8 9.55228 8 9C8 8.44772 7.55228 8 7 8H5.06997C6.45395 5.60755 9.04015 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4183 16.4182 20 12 20C8.51828 20 5.55363 17.7753 4.45492 14.6668C4.27088 14.146 3.69955 13.8731 3.17884 14.0572C2.65812 14.2412 2.3852 14.8125 2.56925 15.3332C3.94156 19.2159 7.64434 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C8.72763 2 5.82381 3.57164 4 5.99932ZM12 7C12.5523 7 13 7.44772 13 8V11.5858L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.44772 11.4477 7 12 7Z"
        fill="currentColor"
      />
    </svg>
  )
}
