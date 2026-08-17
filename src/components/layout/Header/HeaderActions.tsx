import React from 'react'
import { Bell, User } from 'lucide-react'

export interface HeaderActionsProps {
  urgentAlertCount?: number
  onUrgentAlertClick?: () => void
}

export function HeaderActions({
  urgentAlertCount = 0,
  onUrgentAlertClick
}: HeaderActionsProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-3">
      {/* Live environment feed status */}
      <div className="hidden lg:flex items-center gap-1.5 bg-[#1A3A54] border border-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full select-none">
        <span className="w-2 h-2 rounded-full bg-[#1AAE4E] animate-pulse" />
        <span className="text-[11px] font-medium">Live Feed</span>
      </div>

      {/* Urgent Alert Notification Bell */}
      <button
        onClick={onUrgentAlertClick}
        className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
        title="Urgent attention required"
        aria-label="Urgent notifications"
      >
        <Bell className="w-5 h-5" />
        {urgentAlertCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF274B] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-bounce">
            {urgentAlertCount}
          </span>
        )}
      </button>

      {/* Analyst Session Profile */}
      <div className="flex items-center gap-2 pl-2 border-l border-white/10 select-none">
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
