/**
 * MockProfileContent Component
 *
 * Fake profile content to display behind the radial blur effect.
 * Used for visual testing of blur/overlay behavior.
 *
 * @module playground/radial-blur/layout
 */

export interface MockProfileContentProps {
  className?: string
}

export function MockProfileContent({ className }: MockProfileContentProps) {
  return (
    <div className={className}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Mock profile header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-tertiary" />
          <h1 className="text-display-md font-display text-primary">
            Profile Name
          </h1>
          <p className="text-lg text-secondary">
            This content sits behind the radial blur effect.
            Adjust the controls to see how the blur fades.
          </p>
        </div>

        {/* Mock cards */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-secondary border border-primary"
            >
              <div className="h-4 w-24 rounded bg-tertiary mb-2" />
              <div className="h-3 w-full rounded bg-quaternary" />
              <div className="h-3 w-3/4 rounded bg-quaternary mt-1" />
            </div>
          ))}
        </div>

        {/* More mock content blocks */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-tertiary">
              <div className="h-3 w-full rounded bg-quaternary" />
              <div className="h-3 w-5/6 rounded bg-quaternary mt-2" />
              <div className="h-3 w-4/6 rounded bg-quaternary mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
