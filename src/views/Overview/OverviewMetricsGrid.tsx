import React from 'react'
import { Card } from '../../components/ui/Card'
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Coins
} from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import type { Business, Assessment, CreditReport, BankStatement } from '../../types/schemas'

export interface OverviewMetricsGridProps {
  businesses: Business[]
  assessments: Assessment[]
  creditReports: CreditReport[]
  bankStatements: BankStatement[]
}

export function OverviewMetricsGrid({
  businesses,
  assessments,
  creditReports,
  bankStatements
}: OverviewMetricsGridProps): React.JSX.Element {
  const totalBusinesses = businesses.length
  const completedCount = assessments.filter((a) => a.status === 'Complete').length
  const pendingCount = assessments.filter((a) => a.status === 'Pending').length
  const highRiskCount = creditReports.filter((c) => c.riskBand === 'High').length

  const totalCredits = bankStatements.reduce((sum, b) => {
    return sum + (b.totalCredits ?? 0)
  }, 0)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {/* 1. Total Businesses */}
      <Card className="p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#0F253B] text-white shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6B76]">
            Total Businesses
          </p>
          <p className="text-xl font-extrabold text-[#0F253B] tabular-nums">
            {totalBusinesses}
          </p>
        </div>
      </Card>

      {/* 2. Completed Assessments */}
      <Card className="p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#E8F8EE] text-[#15803D] shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6B76]">
            Completed
          </p>
          <p className="text-xl font-extrabold text-[#15803D] tabular-nums">
            {completedCount}
          </p>
        </div>
      </Card>

      {/* 3. Pending Assessments */}
      <Card className="p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#F1F5F9] text-[#475569] shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6B76]">
            Pending
          </p>
          <p className="text-xl font-extrabold text-[#475569] tabular-nums">
            {pendingCount}
          </p>
        </div>
      </Card>

      {/* 4. High Risk Flagged */}
      <Card className="p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#FFEEF2] text-[#E11D48] shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6B76]">
            High Risk
          </p>
          <p className="text-xl font-extrabold text-[#E11D48] tabular-nums">
            {highRiskCount}
          </p>
        </div>
      </Card>

      {/* 5. Total Turnover Analyzed */}
      <Card className="p-4 flex items-center gap-3 col-span-2 sm:col-span-1">
        <div className="p-2.5 rounded-xl bg-[#FFF0EE] text-[#FF6D63] shrink-0">
          <Coins className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6B76]">
            Total Turnover
          </p>
          <p className="text-lg font-extrabold text-[#0F253B] tabular-nums whitespace-nowrap">
            {formatCurrency(totalCredits)}
          </p>
        </div>
      </Card>
    </div>
  )
}
