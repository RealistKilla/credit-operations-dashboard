import React from 'react'
import { MetricCard } from '../../components/ui/MetricCard'
import {
  Building2,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Clock,
  Coins
} from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import { RISK_BANDS } from '../../types/constants'
import type { EnrichedAssessment } from '../../types/schemas'

export interface OverviewMetricsGridProps {
  totalBusinessesCount: number
  assessments: EnrichedAssessment[]
  onFilterRiskBand?: (riskBand: string) => void
}

export function OverviewMetricsGrid({
  totalBusinessesCount,
  assessments,
  onFilterRiskBand
}: OverviewMetricsGridProps): React.JSX.Element {
  // Aggregate assessment counts
  const lowRiskCount = assessments.filter(
    (a) => a.creditReport?.riskBand === RISK_BANDS.LOW
  ).length

  const mediumRiskCount = assessments.filter(
    (a) => a.creditReport?.riskBand === RISK_BANDS.MEDIUM
  ).length

  const highRiskCount = assessments.filter(
    (a) => a.creditReport?.riskBand === RISK_BANDS.HIGH
  ).length

  const pendingCount = assessments.filter(
    (a) => !a.creditReport?.riskBand || a.status === 'Pending'
  ).length

  // Calculate total turnover credits analysed across bank statements
  const totalTurnoverCredits = assessments.reduce((acc, a) => {
    return acc + (a.bankStatement?.totalCredits || 0)
  }, 0)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {/* 1. Total Businesses */}
      <MetricCard
        title="Total Assessed"
        value={totalBusinessesCount}
        subtitle="Active SME portfolio"
        variant="primary"
        icon={<Building2 className="w-5 h-5 text-white" />}
      />

      {/* 2. Low Risk / Qualified */}
      <MetricCard
        title="Qualified (Low)"
        value={lowRiskCount}
        subtitle="Prime tier approval"
        variant="success"
        icon={<ShieldCheck className="w-5 h-5 text-[#15803D]" />}
        onClick={onFilterRiskBand ? () => onFilterRiskBand(RISK_BANDS.LOW) : undefined}
      />

      {/* 3. Medium Risk */}
      <MetricCard
        title="In Review (Med)"
        value={mediumRiskCount}
        subtitle="Conditional tier"
        variant="warning"
        icon={<AlertTriangle className="w-5 h-5 text-[#B45309]" />}
        onClick={onFilterRiskBand ? () => onFilterRiskBand(RISK_BANDS.MEDIUM) : undefined}
      />

      {/* 4. High Risk */}
      <MetricCard
        title="Attention (High)"
        value={highRiskCount}
        subtitle="Subprime / Thin File"
        variant="danger"
        icon={<ShieldAlert className="w-5 h-5 text-[#E11D48]" />}
        onClick={onFilterRiskBand ? () => onFilterRiskBand(RISK_BANDS.HIGH) : undefined}
      />

      {/* 5. Pending Assessments */}
      <MetricCard
        title="Pending Ingestion"
        value={pendingCount}
        subtitle="Awaiting data sync"
        variant="sky"
        icon={<Clock className="w-5 h-5 text-[#268FB6]" />}
        onClick={onFilterRiskBand ? () => onFilterRiskBand(RISK_BANDS.PENDING) : undefined}
      />

      {/* 6. Total Turnover Analysed */}
      <MetricCard
        title="Turnover Analysed"
        value={formatCurrency(totalTurnoverCredits)}
        subtitle="Statement credits total"
        variant="coral"
        icon={<Coins className="w-5 h-5 text-[#FF6D63]" />}
      />
    </div>
  )
}
