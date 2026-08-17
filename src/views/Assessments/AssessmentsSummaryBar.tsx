import React from 'react'
import { Card } from '../../components/ui/Card'
import { formatCurrency } from '../../utils/formatters'
import { RISK_BANDS } from '../../types/constants'
import type { EnrichedAssessment } from '../../types/schemas'
import { Building2, ShieldCheck, AlertTriangle, ShieldAlert, Clock, Coins } from 'lucide-react'

export interface AssessmentsSummaryBarProps {
  filteredAssessments: EnrichedAssessment[]
  totalAssessmentsCount: number
}

export function AssessmentsSummaryBar({
  filteredAssessments = [],
  totalAssessmentsCount = 0
}: AssessmentsSummaryBarProps): React.JSX.Element {
  const safeList = Array.isArray(filteredAssessments) ? filteredAssessments : []

  const lowRiskCount = safeList.filter(
    (a) => a.creditReport?.riskBand === RISK_BANDS.LOW
  ).length

  const mediumRiskCount = safeList.filter(
    (a) => a.creditReport?.riskBand === RISK_BANDS.MEDIUM
  ).length

  const highRiskCount = safeList.filter(
    (a) => a.creditReport?.riskBand === RISK_BANDS.HIGH
  ).length

  const pendingCount = safeList.filter(
    (a) => a.status === 'Pending' || !a.creditReport?.riskBand
  ).length

  const totalCreditsVolume = safeList.reduce((sum, a) => {
    return sum + (a.bankStatement?.totalCredits ?? 0)
  }, 0)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* Total Filtered */}
      <Card className="p-3.5 bg-white flex items-center gap-2.5">
        <div className="p-2 bg-[#0F253B] text-white rounded-xl shrink-0">
          <Building2 className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#839098] uppercase tracking-wider block">
            Matching
          </span>
          <span className="text-base font-extrabold text-[#0F253B] tabular-nums">
            {safeList.length} <span className="text-xs font-normal text-[#839098]">/ {totalAssessmentsCount}</span>
          </span>
        </div>
      </Card>

      {/* Low Risk / Qualified */}
      <Card className="p-3.5 bg-white flex items-center gap-2.5">
        <div className="p-2 bg-[#E8F8EE] text-[#15803D] rounded-xl shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#839098] uppercase tracking-wider block">
            Prime / Low
          </span>
          <span className="text-base font-extrabold text-[#15803D] tabular-nums">
            {lowRiskCount}
          </span>
        </div>
      </Card>

      {/* Medium Risk / In Review */}
      <Card className="p-3.5 bg-white flex items-center gap-2.5">
        <div className="p-2 bg-[#FFF8E6] text-[#B45309] rounded-xl shrink-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#839098] uppercase tracking-wider block">
            Moderate
          </span>
          <span className="text-base font-extrabold text-[#B45309] tabular-nums">
            {mediumRiskCount}
          </span>
        </div>
      </Card>

      {/* High Risk / Attention */}
      <Card className="p-3.5 bg-white flex items-center gap-2.5">
        <div className="p-2 bg-[#FFEEF2] text-[#E11D48] rounded-xl shrink-0">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#839098] uppercase tracking-wider block">
            High Risk
          </span>
          <span className="text-base font-extrabold text-[#E11D48] tabular-nums">
            {highRiskCount}
          </span>
        </div>
      </Card>

      {/* Pending */}
      <Card className="p-3.5 bg-white flex items-center gap-2.5">
        <div className="p-2 bg-[#F1F5F9] text-[#475569] rounded-xl shrink-0">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#839098] uppercase tracking-wider block">
            Pending
          </span>
          <span className="text-base font-extrabold text-[#475569] tabular-nums">
            {pendingCount}
          </span>
        </div>
      </Card>

      {/* Turnover Volume */}
      <Card className="p-3.5 bg-white flex items-center gap-2.5 col-span-2 sm:col-span-1">
        <div className="p-2 bg-[#FFF0EE] text-[#FF6D63] rounded-xl shrink-0">
          <Coins className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#839098] uppercase tracking-wider block">
            Turnover Total
          </span>
          <span className="text-sm font-extrabold text-[#0F253B] tabular-nums whitespace-nowrap">
            {formatCurrency(totalCreditsVolume)}
          </span>
        </div>
      </Card>
    </div>
  )
}
