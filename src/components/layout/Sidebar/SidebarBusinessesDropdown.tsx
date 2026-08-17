import React from 'react'
import { cn } from '../../../utils/cn'
import {
  Building2,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { RISK_BANDS } from '../../../types/constants'
import type { Business, EnrichedAssessment } from '../../../types/schemas'

export interface SidebarBusinessesDropdownProps {
  isOpen: boolean
  onToggleOpen: () => void
  isActiveTab: boolean
  onSelectTab: () => void
  businesses: Business[]
  assessments: EnrichedAssessment[]
  selectedBusinessId: number | null
  onSelectBusiness: (businessId: number) => void
}

export function SidebarBusinessesDropdown({
  isOpen,
  onToggleOpen,
  isActiveTab,
  onSelectTab,
  businesses,
  assessments,
  selectedBusinessId,
  onSelectBusiness
}: SidebarBusinessesDropdownProps): React.JSX.Element {
  // Split businesses into Pending and Assessed/Approved sub-lists
  const pendingBusinesses: { business: Business; assessment?: EnrichedAssessment }[] = []
  const assessedBusinesses: { business: Business; assessment?: EnrichedAssessment }[] = []

  businesses.forEach((business) => {
    const assessment = assessments.find((a) => a.businessId === business.id)
    if (!assessment || assessment.status === 'Pending' || assessment.creditReport?.score == null) {
      pendingBusinesses.push({ business, assessment })
    } else {
      assessedBusinesses.push({ business, assessment })
    }
  })

  return (
    <div className="space-y-1">
      {/* Dropdown Header Button */}
      <button
        onClick={() => {
          onToggleOpen()
          if (!isActiveTab) {
            onSelectTab()
          }
        }}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group cursor-pointer text-left',
          isActiveTab
            ? 'bg-[#1A3A54] text-white shadow-xs border-l-4 border-l-[#61B8D8]'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        )}
      >
        <div className="flex items-center gap-2.5">
          <Building2
            className={cn(
              'w-4 h-4 transition-colors',
              isActiveTab ? 'text-[#61B8D8]' : 'text-white/50 group-hover:text-white'
            )}
          />
          <span>Businesses</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bg-[#61B8D8]/20 text-[#61B8D8] text-[10px] font-bold px-1.5 py-0.5 rounded">
            {businesses.length}
          </span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
          )}
        </div>
      </button>

      {/* Dropdown Content with Grouped Sub-lists */}
      {isOpen && (
        <div className="pl-4 pr-1 py-1 space-y-3 border-l-2 border-white/10 ml-4 my-1">
          {/* Sub-list 1: PENDING BUSINESSES (ON TOP) */}
          {pendingBusinesses.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FF6D63]">
                <Clock className="w-3 h-3" />
                <span>Pending ({pendingBusinesses.length})</span>
              </div>

              {pendingBusinesses.map(({ business }) => {
                const isSelected = isActiveTab && selectedBusinessId === business.id
                return (
                  <button
                    key={business.id}
                    onClick={() => {
                      onSelectTab()
                      onSelectBusiness(business.id)
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left group cursor-pointer',
                      isSelected
                        ? 'bg-[#FF6D63] text-white font-bold shadow-xs'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
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
                    <span className="shrink-0 bg-[#FF6D63]/20 text-[#FF6D63] text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Pending
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Sub-list 2: ASSESSED & COMPLETED BUSINESSES */}
          {assessedBusinesses.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#61B8D8]">
                <CheckCircle2 className="w-3 h-3" />
                <span>Assessed ({assessedBusinesses.length})</span>
              </div>

              {assessedBusinesses.map(({ business, assessment }) => {
                const isSelected = isActiveTab && selectedBusinessId === business.id
                const riskBand = assessment?.creditReport?.riskBand

                return (
                  <button
                    key={business.id}
                    onClick={() => {
                      onSelectTab()
                      onSelectBusiness(business.id)
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left group cursor-pointer',
                      isSelected
                        ? 'bg-[#61B8D8] text-[#0F253B] font-bold shadow-xs'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <div className="truncate mr-1">
                      <div className="truncate">{business.name}</div>
                      <div
                        className={cn(
                          'text-[10px]',
                          isSelected ? 'text-[#0F253B]/70' : 'text-white/40'
                        )}
                      >
                        {business.industry}
                      </div>
                    </div>

                    {/* Red dot for High Risk businesses only */}
                    {riskBand === RISK_BANDS.HIGH && (
                      <span
                        className="w-2.5 h-2.5 rounded-full bg-[#FF274B] shrink-0 animate-pulse"
                        title="High Risk - Needs Attention"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
