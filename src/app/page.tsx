'use client'

import { Button } from '@/v2/components/ui/button'
import { SearchInput } from '@/v2/components/ui/search-input'
import { Badge } from '@/v2/components/ui/badge'
import { 
  StarIcon,
  CheckmarkSquare03Icon,
  AlertCircleIcon,
  FireSecurityIcon,
  Settings01Icon,
  UserMultiple02Icon,
} from '@hugeicons-pro/core-stroke-rounded'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* Header */}
        <div className="border-b border-secondary pb-12 mb-12">
          <h1 className="font-display text-display-lg text-primary">
            Components
          </h1>
        </div>

        {/* Components Sections */}
        <div className="flex flex-col gap-12">
          {/* Buttons */}
          <section className="space-y-6">
            <h2 className="text-quaternary text-xs font-medium tracking-wide uppercase">
              Buttons
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button size="md" hierarchy="primary">
                  Primary
                </Button>
                <Button size="md" hierarchy="secondary">
                  Secondary
                </Button>
                <Button size="md" hierarchy="tertiary">
                  Tertiary
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button.WithIcon size="md" hierarchy="primary" icon={Settings01Icon}>
                  With Icon
                </Button.WithIcon>
                <Button.WithIcon size="md" hierarchy="secondary" icon={UserMultiple02Icon}>
                  Secondary Icon
                </Button.WithIcon>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" hierarchy="primary">Small</Button>
                <Button size="md" hierarchy="primary">Medium</Button>
                <Button size="lg" hierarchy="primary">Large</Button>
              </div>
            </div>
          </section>

          {/* Search Input */}
          <section className="border-t border-secondary pt-12 space-y-6">
            <h2 className="text-quaternary text-xs font-medium tracking-wide uppercase">
              Search Input
            </h2>
            
            <div className="space-y-4">
              <SearchInput 
                placeholder="Search components..."
                size="md"
              />
              
              <SearchInput 
                placeholder="Small search"
                size="sm"
              />
            </div>
          </section>

          {/* Badges */}
          <section className="border-t border-secondary pt-12 space-y-6">
            <h2 className="text-quaternary text-xs font-medium tracking-wide uppercase">
              Badges
            </h2>
            
            <div className="space-y-6">
              {/* Types */}
              <div>
                <p className="text-sm text-tertiary mb-3">Badge Types</p>
                <div className="flex flex-wrap gap-3">
                  <Badge type="pill" color="brand">Pill</Badge>
                  <Badge type="badge" color="brand">Badge</Badge>
                  <Badge type="modern" color="brand">Modern</Badge>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <p className="text-sm text-tertiary mb-3">With Icons</p>
                <div className="flex flex-wrap gap-3">
                  <Badge.WithIcon type="modern" color="brand" size="md" icon={StarIcon}>
                    Featured
                  </Badge.WithIcon>
                  <Badge.WithIcon type="modern" color="success" size="md" icon={CheckmarkSquare03Icon}>
                    Verified
                  </Badge.WithIcon>
                  <Badge.WithIcon type="modern" color="warning" size="md" icon={AlertCircleIcon}>
                    Alert
                  </Badge.WithIcon>
                  <Badge.WithIcon type="modern" color="error" size="md" icon={FireSecurityIcon}>
                    Urgent
                  </Badge.WithIcon>
                </div>
              </div>

              {/* Status Dots */}
              <div>
                <p className="text-sm text-tertiary mb-3">Status Indicators</p>
                <div className="flex flex-wrap gap-3">
                  <Badge.WithDot type="modern" color="gray" dotColor="success" size="sm">
                    Active
                  </Badge.WithDot>
                  <Badge.WithDot type="modern" color="gray" dotColor="warning" size="sm">
                    Pending
                  </Badge.WithDot>
                  <Badge.WithDot type="modern" color="gray" dotColor="error" size="sm">
                    Inactive
                  </Badge.WithDot>
                  <Badge.WithDot type="modern" color="gray" dotColor="blue" size="sm">
                    In Progress
                  </Badge.WithDot>
                </div>
              </div>

              {/* Colors */}
              <div>
                <p className="text-sm text-tertiary mb-3">Color Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Badge type="modern" color="gray" size="sm">Gray</Badge>
                  <Badge type="modern" color="brand" size="sm">Brand</Badge>
                  <Badge type="modern" color="success" size="sm">Success</Badge>
                  <Badge type="modern" color="warning" size="sm">Warning</Badge>
                  <Badge type="modern" color="error" size="sm">Error</Badge>
                  <Badge type="modern" color="blue" size="sm">Blue</Badge>
                  <Badge type="modern" color="purple" size="sm">Purple</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="border-t border-secondary pt-12">
            <div className="text-center">
              <p className="text-sm text-tertiary mb-2">
                Built with Tailwind v4 · Squircle · HugeIcons Pro · SILK
              </p>
              <p className="text-xs text-quaternary">
                Semantic design tokens with automatic dark mode
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

