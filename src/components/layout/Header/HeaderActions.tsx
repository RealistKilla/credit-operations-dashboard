import React from 'react'
import { User } from 'lucide-react'

export function HeaderActions(): React.JSX.Element {
  return (
    <div className="flex items-center gap-3">
      {/* Analyst Session Profile */}
      <div className="flex items-center gap-2 select-none">
        <div className="w-8 h-8 rounded-full bg-[#1A3A54] border border-[#61B8D8]/40 flex items-center justify-center text-[#61B8D8]">
          <User className="w-4 h-4" />
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-white leading-tight">Credit Analyst</span>
          <span className="text-[10px] text-[#61B8D8] font-medium">Underwriting Ops</span>
        </div>
      </div>
    </div>
  )
}
