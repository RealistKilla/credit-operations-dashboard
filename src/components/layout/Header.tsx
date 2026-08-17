import React from 'react'
import { Search, Bell, User, Menu } from 'lucide-react'
import { Input } from '../ui/Input'

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
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
              aria-label="Toggle sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2.5 select-none">
            {/* Lula Logo Icon */}
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

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-2 hidden sm:block">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search businesses, reg numbers, assessments..."
            leftIcon={<Search className="w-4 h-4 text-white/40" />}
            className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:bg-white focus:text-[#1A1A1A] focus:placeholder:text-[#839098] rounded-xl h-10 transition-colors"
          />
        </div>

        {/* Right: Environment status, Notifications, Analyst Profile */}
        <div className="flex items-center gap-3">
          {/* Live environment pill */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#1A3A54] border border-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#1AAE4E] animate-pulse" />
            <span className="text-[11px] font-medium">Live Feed</span>
          </div>

          {/* Urgent Attention Alert Bell */}
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

          {/* Analyst Avatar / Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#1A3A54] border border-[#61B8D8]/40 flex items-center justify-center text-[#61B8D8]">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">Credit Analyst</span>
              <span className="text-[10px] text-[#61B8D8] font-medium">Underwriting Ops</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (under header on small screens) */}
      <div className="sm:hidden px-4 pb-3">
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search businesses, reg no..."
          leftIcon={<Search className="w-4 h-4 text-white/40" />}
          className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:bg-white focus:text-[#1A1A1A] focus:placeholder:text-[#839098] rounded-xl h-9 text-xs"
        />
      </div>
    </header>
  )
}
