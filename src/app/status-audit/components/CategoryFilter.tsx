/**
 * Category Filter Component
 *
 * Clickable chips to filter table data by category.
 */

'use client'

interface CategoryFilterProps<T extends string> {
  categories: T[]
  selected: T | null
  onChange: (category: T | null) => void
  colorMap?: Record<T, string>
}

const DEFAULT_COLORS: Record<string, string> = {
  // Status subcategories
  HEALTHY: 'bg-success/10 text-success border-success/20',
  AT_RISK: 'bg-warning/10 text-warning border-warning/20',
  OTHER_ACTIVE: 'bg-info/10 text-info border-info/20',
  LOST_PENDING: 'bg-error/10 text-error border-error/20',
  COMPLETED: 'bg-success/10 text-success border-success/20',
  SETTLED: 'bg-tertiary text-secondary border-tertiary',
  OTHER_CLOSED: 'bg-tertiary text-secondary border-tertiary',
  NEVER_STARTED: 'bg-tertiary text-secondary border-tertiary',
  // Transition change categories
  PROGRESSION: 'bg-success/10 text-success border-success/20',
  ESCALATION: 'bg-warning/10 text-warning border-warning/20',
  RECOVERY: 'bg-success/10 text-success border-success/20',
  SETTLEMENT: 'bg-info/10 text-info border-info/20',
  OSCILLATION: 'bg-tertiary text-secondary border-tertiary',
  ADMINISTRATIVE: 'bg-tertiary text-secondary border-tertiary',
}

export function CategoryFilter<T extends string>({
  categories,
  selected,
  onChange,
  colorMap,
}: CategoryFilterProps<T>) {
  const colors = colorMap || DEFAULT_COLORS

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-tertiary text-xs">Filter:</span>
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
          selected === null
            ? 'bg-secondary text-primary border-secondary'
            : 'bg-transparent text-tertiary border-transparent hover:bg-secondary/50'
        }`}
      >
        All
      </button>
      {categories.map((category) => {
        const isSelected = selected === category
        const colorClasses = colors[category] || 'bg-tertiary text-secondary border-tertiary'

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(isSelected ? null : category)}
            className={`rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
              isSelected
                ? colorClasses
                : 'bg-transparent text-tertiary border-transparent hover:bg-secondary/50'
            }`}
          >
            {category.replace(/_/g, ' ')}
          </button>
        )
      })}
    </div>
  )
}
