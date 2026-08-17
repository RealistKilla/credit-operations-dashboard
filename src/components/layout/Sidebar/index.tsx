import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../../../utils/cn'
import { LayoutDashboard, FileCheck2 } from 'lucide-react'
import type { Business, EnrichedAssessment } from '../../../types/schemas'
import { SidebarNavButton } from './SidebarNavButton'
import { SidebarBusinessesDropdown } from './SidebarBusinessesDropdown'

export interface SidebarProps {
  businesses: Business[]
  assessments: EnrichedAssessment[]
  selectedBusinessId?: number | null
  className?: string
  onCloseMobileDrawer?: () => void
}

export function Sidebar({
  businesses,
  assessments,
  selectedBusinessId,
  className,
  onCloseMobileDrawer
}: SidebarProps): React.JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [businessesOpen, setBusinessesOpen] = useState(true)

  const pathname = location.pathname
  const isOverview = pathname === '/' || pathname.startsWith('/overview')
  const isBusinesses = pathname.startsWith('/businesses')
  const isAssessments = pathname.startsWith('/assessments')

  // Calculate metrics for badges
  const totalBusinesses = businesses.length
  const completedAssessments = assessments.filter(
    (a) => a.status === 'Complete'
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
            isActive={isOverview}
            onClick={() => {
              navigate('/overview')
              onCloseMobileDrawer?.()
            }}
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
            isActiveTab={isBusinesses}
            onSelectTab={() => {
              navigate('/businesses/1')
              onCloseMobileDrawer?.()
            }}
            businesses={businesses}
            assessments={assessments}
            selectedBusinessId={selectedBusinessId ?? null}
            onSelectBusiness={(id) => {
              navigate(`/businesses/${id}`)
              onCloseMobileDrawer?.()
            }}
          />

          {/* 3. Assessments & Ranking */}
          <SidebarNavButton
            label="Assessments"
            icon={<FileCheck2 className="w-4 h-4" />}
            isActive={isAssessments}
            onClick={() => {
              navigate('/assessments')
              onCloseMobileDrawer?.()
            }}
            accentColor="green"
            badge={
              <span className="bg-[#1AAE4E]/20 text-[#1AAE4E] text-[10px] font-bold px-1.5 py-0.5 rounded">
                {completedAssessments}/{totalBusinesses}
              </span>
            }
          />
        </div>
      </div>
    </aside>
  )
}

export * from './SidebarNavButton'
export * from './SidebarBusinessesDropdown'
