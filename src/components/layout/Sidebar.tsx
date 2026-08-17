import React, { useState } from 'react'
import { cn } from '../../utils/cn'
import {
  LayoutDashboard,
  Building2,
  FileCheck2,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { NAV_ITEMS, type NavItem, RISK_BANDS } from '../../types/constants'
import type { Business, EnrichedAssessment } from '../../types/schemas'

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
        {/* Navigation list */}
        <div className="space-y-1.5">
          <p className="px-3 text-[11px] font-bold text-white/40 uppercase tracking-wider mb-2">
            Operations Menu
          </p>

          {/* 1. Overview */}
          <button
            onClick={() => onTabChange(NAV_ITEMS.OVERVIEW)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group cursor-pointer text-left',
              activeTab === NAV_ITEMS.OVERVIEW
                ? 'bg-[#1A3A54] text-white shadow-xs border-l-4 border-l-[#FF6D63]'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            )}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard
                className={cn(
                  'w-4 h-4 transition-colors',
                  activeTab === NAV_ITEMS.OVERVIEW ? 'text-[#FF6D63]' : 'text-white/50 group-hover:text-white'
                )}
              />
              <span>Overview</span>
            </div>
            <span className="bg-white/10 text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Live
            </span>
          </button>

          {/* 2. Businesses (Dropdown) */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setBusinessesOpen(!businessesOpen)
                if (activeTab !== NAV_ITEMS.BUSINESSES) {
                  onTabChange(NAV_ITEMS.BUSINESSES)
                }
              }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group cursor-pointer text-left',
                activeTab === NAV_ITEMS.BUSINESSES
                  ? 'bg-[#1A3A54] text-white shadow-xs border-l-4 border-l-[#61B8D8]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              <div className="flex items-center gap-2.5">
                <Building2
                  className={cn(
                    'w-4 h-4 transition-colors',
                    activeTab === NAV_ITEMS.BUSINESSES
                      ? 'text-[#61B8D8]'
                      : 'text-white/50 group-hover:text-white'
                  )}
                />
                <span>Businesses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-[#61B8D8]/20 text-[#61B8D8] text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {totalBusinesses}
                </span>
                {businessesOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                )}
              </div>
            </button>

            {/* Dropdown items */}
            {businessesOpen && (
              <div className="pl-6 pr-1 py-1 space-y-1 border-l-2 border-white/10 ml-4 my-1">
                {businesses.map((business) => {
                  const isSelected =
                    activeTab === NAV_ITEMS.BUSINESSES && selectedBusinessId === business.id
                  const assessment = assessments.find((a) => a.businessId === business.id)
                  const riskBand = assessment?.creditReport?.riskBand

                  return (
                    <button
                      key={business.id}
                      onClick={() => {
                        onTabChange(NAV_ITEMS.BUSINESSES)
                        onSelectBusiness(business.id)
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left group cursor-pointer',
                        isSelected
                          ? 'bg-[#FF6D63] text-white font-bold shadow-xs'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      <div className="truncate mr-1">
                        <div className="truncate">{business.name}</div>
                        <div
                          className={cn(
                            'text-[10px]',
                            isSelected ? 'text-white/80' : 'text-white/40'
                          )}
                        >
                          {business.industry}
                        </div>
                      </div>

                      {/* Mini Risk Indicator */}
                      <span className="shrink-0">
                        {riskBand === RISK_BANDS.LOW && (
                          <span className="w-2 h-2 rounded-full bg-[#1AAE4E] inline-block" title="Low Risk" />
                        )}
                        {riskBand === RISK_BANDS.MEDIUM && (
                          <span className="w-2 h-2 rounded-full bg-[#D97706] inline-block" title="Medium Risk" />
                        )}
                        {riskBand === RISK_BANDS.HIGH && (
                          <span className="w-2 h-2 rounded-full bg-[#FF274B] inline-block animate-pulse" title="High Risk - Attention" />
                        )}
                        {!riskBand && (
                          <span className="w-2 h-2 rounded-full bg-[#64748B] inline-block" title="Pending" />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* 3. Assessments & Ranking */}
          <button
            onClick={() => onTabChange(NAV_ITEMS.ASSESSMENTS)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group cursor-pointer text-left',
              activeTab === NAV_ITEMS.ASSESSMENTS
                ? 'bg-[#1A3A54] text-white shadow-xs border-l-4 border-l-[#1AAE4E]'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            )}
          >
            <div className="flex items-center gap-2.5">
              <FileCheck2
                className={cn(
                  'w-4 h-4 transition-colors',
                  activeTab === NAV_ITEMS.ASSESSMENTS
                    ? 'text-[#1AAE4E]'
                    : 'text-white/50 group-hover:text-white'
                )}
              />
              <span>Assessments</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-[#1AAE4E]/20 text-[#1AAE4E] text-[10px] font-bold px-1.5 py-0.5 rounded">
                {completedAssessments}/{totalBusinesses}
              </span>
            </div>
          </button>
        </div>

        {/* Bottom Card: Underwriting Highlights */}
        <div className="mt-6 p-3.5 bg-gradient-to-br from-[#1A3A54] to-[#0C1E2F] rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6D63]" />
              <span>Risk Pulse</span>
            </div>
            {highRiskCount > 0 && (
              <span className="bg-[#FF274B]/20 text-[#FF274B] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                {highRiskCount} Alert
              </span>
            )}
          </div>
          <p className="text-[11px] text-white/60 leading-relaxed">
            Real-time credit score aggregation and bank statement liquidity indexing for SME funding.
          </p>
        </div>
      </div>
    </aside>
  )
}
