import React from 'react'
import { OverviewMetricsGrid } from './OverviewMetricsGrid'
import { OverviewAttentionSection } from './OverviewAttentionSection'
import { OverviewPortfolioDistribution } from './OverviewPortfolioDistribution'
import { OverviewRecentAssessments } from './OverviewRecentAssessments'
import type { DashboardData } from '../../types/schemas'
import { NAV_ITEMS, type NavItem } from '../../types/constants'
import { Sparkles } from 'lucide-react'

export interface OverviewViewProps {
  dashboardData: DashboardData
  searchQuery: string
  onSelectBusiness: (businessId: number) => void
  onNavigateTab: (tab: NavItem) => void
}

export function OverviewView({
  dashboardData,
  searchQuery,
  onSelectBusiness,
  onNavigateTab
}: OverviewViewProps): React.JSX.Element {
  const { businesses, assessments } = dashboardData

  // Filter assessments if search query is present
  const filteredAssessments = assessments.filter((assessment) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    const name = assessment.business?.name.toLowerCase() || ''
    const reg = assessment.business?.registrationNumber.toLowerCase() || ''
    const industry = assessment.business?.industry.toLowerCase() || ''
    const status = assessment.status.toLowerCase()
    const risk = assessment.creditReport?.riskBand?.toLowerCase() || ''
    const id = assessment.id.toString()
    return (
      name.includes(query) ||
      reg.includes(query) ||
      industry.includes(query) ||
      status.includes(query) ||
      risk.includes(query) ||
      id.includes(query)
    )
  })

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(0,0,0,0.08)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0F253B] tracking-tight">
              Executive Credit Operations Overview
            </h1>
            <span className="bg-[#1AAE4E]/15 text-[#15803D] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
              Operational
            </span>
          </div>
          <p className="text-xs text-[#5A6B76] mt-1">
            Real-time portfolio underwriting intelligence, credit scores, cash flow liquidity, and risk allocation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#0F253B] bg-white px-3 py-1.5 rounded-xl border border-[rgba(0,0,0,0.08)] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6D63]" />
          <span>Underwriting Engine Active</span>
        </div>
      </div>

      {/* 1. Priority Attention Banner for High Risk / Pending accounts */}
      <OverviewAttentionSection
        assessments={assessments}
        onSelectBusiness={(businessId) => {
          onNavigateTab(NAV_ITEMS.BUSINESSES)
          onSelectBusiness(businessId)
        }}
      />

      {/* 2. Top-level KPI Metrics Grid */}
      <OverviewMetricsGrid
        totalBusinessesCount={businesses.length}
        assessments={assessments}
        onFilterRiskBand={() => onNavigateTab(NAV_ITEMS.ASSESSMENTS)}
      />

      {/* 3. Portfolio Risk Distribution & Cash Flow Velocity */}
      <OverviewPortfolioDistribution assessments={assessments} />

      {/* 4. Recent Assessed Business Pipeline Table */}
      <OverviewRecentAssessments
        assessments={filteredAssessments}
        onSelectBusiness={(businessId) => {
          onNavigateTab(NAV_ITEMS.BUSINESSES)
          onSelectBusiness(businessId)
        }}
        onViewAllAssessments={() => onNavigateTab(NAV_ITEMS.ASSESSMENTS)}
      />
    </div>
  )
}

export * from './OverviewMetricsGrid'
export * from './OverviewAttentionSection'
export * from './OverviewPortfolioDistribution'
export * from './OverviewRecentAssessments'
