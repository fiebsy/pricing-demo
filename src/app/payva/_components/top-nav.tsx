'use client'

import { SearchBar } from './search-bar'
import { UserMenu } from './user-menu'
import { NavTabs } from './nav-tabs'

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary bg-primary">
      {/* Brand Row */}
      <div className="flex h-14 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/origins/dragon-ball.jpg"
            alt="Karate Mentors logo"
            className="size-6 rounded-md corner-squircle object-cover"
          />
          <span className="text-base font-semibold text-primary">Karate Mentors</span>
        </div>

        {/* Search + Avatar */}
        <div className="flex items-center gap-4">
          <SearchBar />
          <UserMenu />
        </div>
      </div>

      {/* Tabs Row */}
      <NavTabs />
    </header>
  )
}
