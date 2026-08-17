import React from 'react'
import { Card } from '../../components/ui/Card'
import { RiskBadge } from '../../components/ui/RiskBadge'
import { Button } from '../../components/ui/Button'
import { formatCurrency, formatDate } from '../../utils/formatters'
import type { EnrichedAssessment } from '../../types/schemas'
import { Building2, Calendar, ArrowRight, Trophy, AlertCircle } from 'lucide-react'

export interface AssessmentsRankedTableProps {
  assessments: EnrichedAssessment[]
  onSelectBusiness: (businessId: number) => void
}

export function AssessmentsRankedTable({
  assessments = [],
  onSelectBusiness
}: AssessmentsRankedTableProps): React.JSX.Element {
  const safeList = Array.isArray(assessments) ? assessments : []

  if (safeList.length === 0) {
    return (
      <Card className="p-12 text-center bg-white border border-[rgba(0,0,0,0.08)] shadow-sm space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#F5F7F9] text-[#839098] flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0F253B]">No Matching Assessments Found</h3>
        <p className="text-xs text-[#5A6B76] max-w-sm mx-auto">
          No credit assessments match your active filter criteria. Try expanding the score range or resetting filters.
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-0 overflow-hidden shadow-sm bg-white border border-[rgba(0,0,0,0.08)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#F0F2F3] bg-[#F5F7F9]/60 text-[#5A6B76] font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4 w-12 text-center">Rank</th>
              <th className="py-3.5 px-4">Business & Registration</th>
              <th className="py-3.5 px-4">Industry</th>
              <th className="py-3.5 px-4">Date Assessed</th>
              <th className="py-3.5 px-4">Credit Score</th>
              <th className="py-3.5 px-4">Risk Profile</th>
              <th className="py-3.5 px-4">Turnover (Inflow)</th>
              <th className="py-3.5 px-4">Net Cash Flow</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F2F3]">
            {safeList.map((item, index) => {
              const business = item.business
              const report = item.creditReport
              const statement = item.bankStatement
              const score = report?.score
              const rank = index + 1
              const isPending = item.status === 'Pending' || score == null
              const isNetPositive = (item.netCashFlow ?? 0) >= 0

              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#F8FCFE] transition-colors group cursor-pointer"
                  onClick={() => onSelectBusiness(item.businessId)}
                >
                  {/* Rank Column */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      {rank === 1 && score != null && score >= 700 ? (
                        <div className="w-6 h-6 rounded-full bg-[#1AAE4E] text-white flex items-center justify-center font-bold text-xs shadow-xs" title="Top Ranked SME">
                          <Trophy className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="font-extrabold text-[#5A6B76] text-xs">
                          #{rank}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Business & Registration */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#F2F9FC] text-[#0F253B] group-hover:bg-[#FF6D63] group-hover:text-white flex items-center justify-center font-bold text-xs transition-colors shrink-0">
                        {business?.name ? business.name.charAt(0) : <Building2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-bold text-[#0F253B] text-xs group-hover:text-[#268FB6] transition-colors">
                          {business?.name || `Business #${item.businessId}`}
                        </div>
                        <div className="text-[10px] text-[#839098] font-mono">
                          {business?.registrationNumber || 'Pending Reg'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Industry */}
                  <td className="py-4 px-4 font-medium text-[#5A6B76]">
                    {business?.industry || '—'}
                  </td>

                  {/* Date Assessed */}
                  <td className="py-4 px-4 text-[#5A6B76] whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#839098]" />
                      <span>{formatDate(item.createdDate)}</span>
                    </div>
                  </td>

                  {/* Credit Score */}
                  <td className="py-4 px-4">
                    {score != null ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-extrabold text-[#0F253B]">
                          <span className="text-sm tabular-nums">{score}</span>
                          <span className="text-[10px] text-[#839098] font-normal">/ 850</span>
                        </div>
                        <div className="w-20 h-1.5 bg-[#E2EAF0] rounded-full overflow-hidden">
                          <div
                            style={{ width: `${((score - 300) / 550) * 100}%` }}
                            className={`h-full rounded-full ${
                              score >= 700
                                ? 'bg-[#1AAE4E]'
                                : score >= 500
                                ? 'bg-[#D97706]'
                                : 'bg-[#FF274B]'
                            }`}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] font-medium text-[#839098] italic">
                        Pending Score
                      </span>
                    )}
                  </td>

                  {/* Risk Profile & Thin File Tag */}
                  <td className="py-4 px-4">
                    <RiskBadge
                      riskBand={report?.riskBand}
                      isThinFile={report?.isThinFile}
                      showQualification
                      size="sm"
                    />
                  </td>

                  {/* Turnover (Inflow) */}
                  <td className="py-4 px-4 font-semibold text-[#0F253B] tabular-nums whitespace-nowrap">
                    {statement?.totalCredits != null
                      ? formatCurrency(statement.totalCredits)
                      : <span className="text-[#839098] italic text-xs">Pending</span>}
                  </td>

                  {/* Net Cash Flow */}
                  <td className="py-4 px-4 tabular-nums whitespace-nowrap">
                    {item.netCashFlow != null ? (
                      <span
                        className={`font-semibold ${
                          isNetPositive ? 'text-[#15803D]' : 'text-[#E11D48]'
                        }`}
                      >
                        {formatCurrency(item.netCashFlow)}
                      </span>
                    ) : (
                      <span className="text-[#839098] italic text-xs">—</span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    <Button
                      variant={isPending ? 'outline' : 'ghost'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectBusiness(item.businessId)
                      }}
                      rightIcon={<ArrowRight className="w-3 h-3" />}
                      className="text-[11px] h-7 px-2.5"
                    >
                      {isPending ? 'Inspect' : 'Details'}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
