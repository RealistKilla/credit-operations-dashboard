import React, { useState } from 'react'
import { cn } from '../../../utils/cn'
import { LayoutDashboard, FileCheck2 } from 'lucide-react'
import { NAV_ITEMS, type NavItem, RISK_BANDS } from '../../../types/constants'
import type { Business, EnrichedAssessment } from '../../../types/schemas'
import { SidebarNavButton } from './SidebarNavButton'
import { SidebarBusinessesDropdown } from './SidebarBusinessesDropdown'
import { SidebarRiskPulse } from './SidebarRiskPulse'

export interface SidebarProps {
  activeTab: NavItem
  onTabChange: (tab: NavItem) => void
  businesses: Business[]
  assessments: EnrichedAssessment[]
  selectedBusinessId: number | null
  onSelectBusiness: (businessId: number) => void
  className?: string
}

export function Sidebar({
  activeTab,
  onTabChange,
  businesses,
  assessments,
  selectedBusinessId,
  onSelectBusiness,
  className
}: SidebarProps): React.JSX.Element {
  const [businessesOpen, setBusinessesOpen] = useState(true)

  // Calculate metrics for badges
  const totalBusinesses = businesses.length
  const completedAssessments = assessments.filter((a) => a.status === 'Complete').length
  const highRiskCount = assessments.filter(
    (a) => a.creditReport?.riskBand === RISK_BANDS.HIGH
  ).length

  return (
    <aside
      className={cn(
        'w-[260px] bg-[#0F253B] text-white flex flex-col shrink-0 min-h-[calc(100vh-70px)] border-r border-[rgba(255,255,255,0.08)] select-none',
        className
      )}
    >
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Operations Navigation Menu */}
        <div className="space-y-1.5">
          <p className="px-3 text-[11px] font-bold text-white/40 uppercase tracking-wider mb-2">
            Operations Menu
          </p>

          {/* 1. Overview */}
          <SidebarNavButton
            label="Overview"
            icon={<LayoutDashboard className="w-4 h-4" />}
            isActive={activeTab === NAV_ITEMS.OVERVIEW}
            onClick={() => onTabChange(NAV_ITEMS.OVERVIEW)}
            accentColor="coral"
            badge={
              <span className="bg-white/10 text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Live
              </span>
            }
          />

          {/* 2. Businesses Dropdown (with Pending and Assessed sub-lists) */}
          <SidebarBusinessesDropdown
            isOpen={businessesOpen}
            onToggleOpen={() => setBusinessesOpen(!businessesOpen)}
            isActiveTab={activeTab === NAV_ITEMS.BUSINESSES}
            onSelectTab={() => onTabChange(NAV_ITEMS.BUSINESSES)}
            businesses={businesses}
            assessments={assessments}
            selectedBusinessId={selectedBusinessId}
            onSelectBusiness={onSelectBusiness}
          />

          {/* 3. Assessments & Ranking */}
          <SidebarNavButton
            label="Assessments"
            icon={<FileCheck2 className="w-4 h-4" />}
            isActive={activeTab === NAV_ITEMS.ASSESSMENTS}
            onClick={() => onTabChange(NAV_ITEMS.ASSESSMENTS)}
            accentColor="green"
            badge={
              <span className="bg-[#1AAE4E]/20 text-[#1AAE4E] text-[10px] font-bold px-1.5 py-0.5 rounded">
                {completedAssessments}/{totalBusinesses}
              </span>
            }
          />
        </div>

        {/* Risk Pulse Card */}
        <SidebarRiskPulse highRiskCount={highRiskCount} />
      </div>
    </aside>
  )
}

export * from './SidebarNavButton'
export * from './SidebarBusinessesDropdown'
export * from './SidebarRiskPulse'
