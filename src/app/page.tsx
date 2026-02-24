import Link from 'next/link'

const PLAYGROUNDS = [
  {
    title: 'Modal',
    description: 'Base UI Dialog + Motion — configurable stages, pricing flow, wireframes',
    href: '/playground/modal',
  },
  {
    title: 'Modal V2',
    description: 'Refactored 5-phase modal — pricing to success flow with fluid buttons',
    href: '/playground/modal-v2',
  },
  {
    title: 'Pricing Select Menu',
    description: 'Expandable tier selection with A/B variants',
    href: '/playground/pricing-select-menu',
  },
  {
    title: 'Button Fluid Layout',
    description: 'Fluid width transitions with animated state changes',
    href: '/playground/button-fluid-layout',
  },
  {
    title: 'Coin Stack',
    description: 'Animated coin stack asset with spring transitions',
    href: '/playground/coin-stack',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-primary">PAYVA Design System</h1>
          <p className="mt-1 text-sm text-secondary">Modal challenge — core components</p>
        </div>

        <div className="flex flex-col gap-3">
          {PLAYGROUNDS.map((pg) => (
            <Link
              key={pg.href}
              href={pg.href}
              className="group flex flex-col gap-1 rounded-xl bg-secondary p-4 transition-colors hover:bg-tertiary"
            >
              <span className="text-sm font-medium text-primary group-hover:text-primary">
                {pg.title}
              </span>
              <span className="text-xs text-tertiary">
                {pg.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
