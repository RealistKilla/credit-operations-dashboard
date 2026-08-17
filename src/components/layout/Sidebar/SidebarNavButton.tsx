import React from 'react'
import { cn } from '../../../utils/cn'

export interface SidebarNavButtonProps {
  label: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
  badge?: React.ReactNode
  accentColor?: 'coral' | 'sky' | 'green'
}

export function SidebarNavButton({
  label,
  icon,
  isActive,
  onClick,
  badge,
  accentColor = 'coral'
}: SidebarNavButtonProps): React.JSX.Element {
  const borderStyles = {
    coral: 'border-l-[#FF6D63]',
    sky: 'border-l-[#61B8D8]',
    green: 'border-l-[#1AAE4E]'
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group cursor-pointer text-left',
        isActive
          ? cn('bg-[#1A3A54] text-white shadow-xs border-l-4', borderStyles[accentColor])
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'w-4 h-4 transition-colors flex items-center justify-center',
            isActive ? 'text-white' : 'text-white/50 group-hover:text-white'
          )}
        >
          {icon}
        </span>
        <span>{label}</span>
      </div>
      {badge && <div className="shrink-0">{badge}</div>}
    </button>
  )
}
