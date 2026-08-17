import React from 'react'
import { Menu } from 'lucide-react'

export interface HeaderBrandProps {
  onToggleSidebar?: () => void
}

export function HeaderBrand({ onToggleSidebar }: HeaderBrandProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-3">
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center gap-2.5 select-none">
        {/* Lula Brand Icon */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6D63] to-[#FF8E86] flex items-center justify-center shadow-md">
          <span className="font-extrabold text-lg text-white tracking-tighter">L</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-white">lula</span>
            <span className="text-[10px] font-bold text-[#61B8D8] bg-[#61B8D8]/15 px-1.5 py-0.5 rounded uppercase tracking-wider">
              Credit Ops
            </span>
          </div>
          <span className="text-[10px] text-white/50 hidden sm:inline-block -mt-0.5 font-medium">
            Risk & Underwriting Portal
          </span>
        </div>
      </div>
    </div>
  )
}
