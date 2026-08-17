import React from 'react'
import { HeaderBrand } from './HeaderBrand'
import { HeaderSearch } from './HeaderSearch'
import { HeaderActions } from './HeaderActions'

export interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  urgentAlertCount?: number
  onUrgentAlertClick?: () => void
  onToggleSidebar?: () => void
}

export function Header({
  searchQuery,
  onSearchChange,
  urgentAlertCount = 0,
  onUrgentAlertClick,
  onToggleSidebar
}: HeaderProps): React.JSX.Element {
  return (
    <header className="sticky top-0 z-30 bg-[#0F253B] text-white border-b border-[rgba(255,255,255,0.08)] shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 h-[70px] gap-4">
        <HeaderBrand onToggleSidebar={onToggleSidebar} />

        <HeaderSearch searchQuery={searchQuery} onSearchChange={onSearchChange} />

        <HeaderActions
          urgentAlertCount={urgentAlertCount}
          onUrgentAlertClick={onUrgentAlertClick}
        />
      </div>

      <HeaderSearch
        isMobile
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </header>
  )
}

export * from './HeaderBrand'
export * from './HeaderSearch'
export * from './HeaderActions'
