import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { RISK_BANDS } from '../../types/constants'
import type { EnrichedAssessment } from '../../types/schemas'
import { PieChart, Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'

export interface OverviewPortfolioDistributionProps {
  assessments: EnrichedAssessment[]
}

export function OverviewPortfolioDistribution({
  assessments
}: OverviewPortfolioDistributionProps): React.JSX.Element {
  const totalCount = assessments.length || 1

  // Risk band segments
  const lowRisk = assessments.filter((a) => a.creditReport?.riskBand === RISK_BANDS.LOW).length
  const mediumRisk = assessments.filter((a) => a.creditReport?.riskBand === RISK_BANDS.MEDIUM).length
  const highRisk = assessments.filter((a) => a.creditReport?.riskBand === RISK_BANDS.HIGH).length
  const pending = assessments.filter((a) => !a.creditReport?.riskBand || a.status === 'Pending').length

  const lowPct = (lowRisk / totalCount) * 100
  const medPct = (mediumRisk / totalCount) * 100
  const highPct = (highRisk / totalCount) * 100
  const pendingPct = (pending / totalCount) * 100

  // Calculate average score among completed
  const completedWithScore = assessments.filter((a) => a.creditReport?.score != null)
  const avgScore =
    completedWithScore.length > 0
      ? Math.round(
          completedWithScore.reduce((acc, a) => acc + (a.creditReport?.score || 0), 0) /
            completedWithScore.length
        )
      : null

  // Cash flow aggregates
  const totalCredits = assessments.reduce((acc, a) => acc + (a.bankStatement?.totalCredits || 0), 0)
  const totalDebits = assessments.reduce((acc, a) => acc + (a.bankStatement?.totalDebits || 0), 0)
  const netCashFlow = totalCredits - totalDebits
  const netMargin = totalCredits > 0 ? (netCashFlow / totalCredits) * 100 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Credit Risk Distribution Card */}
      <Card className="p-0 overflow-hidden">
        <CardHeader className="border-b border-[#F0F2F3] bg-[#F5F7F9]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#0F253B] text-white rounded-lg">
                <PieChart className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm">Risk Tier Distribution</CardTitle>
                <CardDescription>Portfolio credit band allocation</CardDescription>
              </div>
            </div>
            {avgScore && (
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#839098]">Avg Score</span>
                <div className="text-base font-extrabold text-[#0F253B]">{avgScore} / 850</div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          {/* Segmented Multi-color Distribution Bar */}
          <div className="w-full h-3.5 bg-[#E2EAF0] rounded-full overflow-hidden flex shadow-inner">
            {lowPct > 0 && (
              <div
                style={{ width: `${lowPct}%` }}
                className="h-full bg-[#1AAE4E] transition-all duration-500"
                title={`Low Risk: ${lowRisk} (${lowPct.toFixed(0)}%)`}
              />
            )}
            {medPct > 0 && (
              <div
                style={{ width: `${medPct}%` }}
                className="h-full bg-[#D97706] transition-all duration-500"
                title={`Medium Risk: ${mediumRisk} (${medPct.toFixed(0)}%)`}
              />
            )}
            {highPct > 0 && (
              <div
                style={{ width: `${highPct}%` }}
                className="h-full bg-[#FF274B] transition-all duration-500"
                title={`High Risk: ${highRisk} (${highPct.toFixed(0)}%)`}
              />
            )}
            {pendingPct > 0 && (
              <div
                style={{ width: `${pendingPct}%` }}
                className="h-full bg-[#64748B] transition-all duration-500"
                title={`Pending: ${pending} (${pendingPct.toFixed(0)}%)`}
              />
            )}
          </div>

          {/* Risk Band Legend & Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {/* Low Risk */}
            <div className="p-2.5 bg-[#E8F8EE] rounded-xl border border-[#BBF7D0]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                <span className="w-2 h-2 rounded-full bg-[#1AAE4E]" />
                <span>Low Risk</span>
              </div>
              <div className="text-lg font-extrabold text-[#15803D] mt-1">{lowRisk}</div>
              <div className="text-[10px] text-[#15803D]/80 font-medium">{lowPct.toFixed(0)}% of total</div>
            </div>

            {/* Medium Risk */}
            <div className="p-2.5 bg-[#FFF8E6] rounded-xl border border-[#FED7AA]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#B45309]">
                <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                <span>Medium Risk</span>
              </div>
              <div className="text-lg font-extrabold text-[#B45309] mt-1">{mediumRisk}</div>
              <div className="text-[10px] text-[#B45309]/80 font-medium">{medPct.toFixed(0)}% of total</div>
            </div>

            {/* High Risk */}
            <div className="p-2.5 bg-[#FFEEF2] rounded-xl border border-[#FECDD3]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#E11D48]">
                <span className="w-2 h-2 rounded-full bg-[#FF274B]" />
                <span>High Risk</span>
              </div>
              <div className="text-lg font-extrabold text-[#E11D48] mt-1">{highRisk}</div>
              <div className="text-[10px] text-[#E11D48]/80 font-medium">{highPct.toFixed(0)}% of total</div>
            </div>

            {/* Pending */}
            <div className="p-2.5 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#475569]">
                <span className="w-2 h-2 rounded-full bg-[#64748B]" />
                <span>Pending</span>
              </div>
              <div className="text-lg font-extrabold text-[#475569] mt-1">{pending}</div>
              <div className="text-[10px] text-[#475569]/80 font-medium">{pendingPct.toFixed(0)}% of total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Portfolio Bank Statement Cash Flow Card */}
      <Card className="p-0 overflow-hidden">
        <CardHeader className="border-b border-[#F0F2F3] bg-[#F5F7F9]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#FF6D63] text-white rounded-lg">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm">Bank Statement Liquidity</CardTitle>
                <CardDescription>Aggregate cash flow across evaluated accounts</CardDescription>
              </div>
            </div>
            <span className="bg-[#1AAE4E]/10 text-[#1AAE4E] text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+{formatPercentage(netMargin)} Net Margin</span>
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Total Credits */}
            <div className="p-3 bg-[#F5F7F9] rounded-xl border border-[rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-1 text-[11px] font-bold uppercase text-[#5A6B76]">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1AAE4E]" />
                <span>Total Inflow</span>
              </div>
              <div className="text-base font-extrabold text-[#0F253B] mt-1">
                {formatCurrency(totalCredits)}
              </div>
              <div className="text-[10px] text-[#839098]">Total credits indexed</div>
            </div>

            {/* Total Debits */}
            <div className="p-3 bg-[#F5F7F9] rounded-xl border border-[rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-1 text-[11px] font-bold uppercase text-[#5A6B76]">
                <ArrowDownRight className="w-3.5 h-3.5 text-[#FF274B]" />
                <span>Total Outflow</span>
              </div>
              <div className="text-base font-extrabold text-[#0F253B] mt-1">
                {formatCurrency(totalDebits)}
              </div>
              <div className="text-[10px] text-[#839098]">Total debits serviced</div>
            </div>

            {/* Net Position */}
            <div className="p-3 bg-[#EAF6FB] rounded-xl border border-[#BAE6FD]">
              <div className="flex items-center gap-1 text-[11px] font-bold uppercase text-[#268FB6]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Net Liquidity</span>
              </div>
              <div className="text-base font-extrabold text-[#268FB6] mt-1">
                {formatCurrency(netCashFlow)}
              </div>
              <div className="text-[10px] text-[#268FB6]/80">Net cash retained</div>
            </div>
          </div>

          <div className="p-3 bg-[#F5F7F9] rounded-xl border border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs">
            <span className="text-[#5A6B76] font-medium">Bank Statement Verification Depth:</span>
            <span className="font-bold text-[#0F253B]">3 to 6 Months Verified Ingestion</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
