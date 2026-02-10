'use client'

import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'

export function SearchBar() {
  return (
    <div className="flex h-9 w-64 items-center gap-2 rounded-lg bg-secondary px-3">
      <HugeIcon icon={Search01Icon} size={16} className="text-tertiary" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 bg-transparent text-sm text-primary placeholder:text-tertiary focus:outline-none"
      />
      <kbd className="flex items-center gap-0.5 rounded bg-tertiary/30 px-1.5 py-0.5 text-xs text-tertiary">
        <span className="text-[10px]">⌘</span>
        <span>/</span>
      </kbd>
    </div>
  )
}
