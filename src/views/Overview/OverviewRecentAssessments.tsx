import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import { RiskBadge } from '../../components/ui/RiskBadge'
import { Button } from '../../components/ui/Button'
import { formatCurrency, formatDate } from '../../utils/formatters'
import type { EnrichedAssessment } from '../../types/schemas'
import { FileText, ArrowRight, Building2, Calendar } from 'lucide-react'

export interface OverviewRecentAssessmentsProps {
  assessments: EnrichedAssessment[]
  onSelectBusiness: (businessId: number) => void
  onViewAllAssessments: () => void
}

export function OverviewRecentAssessments({
  assessments,
  onSelectBusiness,
  onViewAllAssessments
}: OverviewRecentAssessmentsProps): React.JSX.Element {
  return (
    <Card className="p-0 overflow-hidden shadow-sm">
      <CardHeader className="border-b border-[#F0F2F3] bg-[#F5F7F9]/50 flex-row items-center justify-between space-y-0 py-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#0F253B] text-white rounded-lg">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm">Assessed Business Pipeline</CardTitle>
            <CardDescription>Recent credit underwriting evaluations and underwriting status</CardDescription>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAllAssessments}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="text-xs"
        >
          View Full Ranking
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#F0F2F3] bg-[#F5F7F9]/30 text-[#5A6B76] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Business & Registration</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Date Assessed</th>
                <th className="py-3 px-4">Credit Score</th>
                <th className="py-3 px-4">Risk Profile</th>
                <th className="py-3 px-4">Turnover (Inflow)</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F3]">
              {assessments.map((assessment) => {
                const business = assessment.business
                const creditReport = assessment.creditReport
                const score = creditReport?.score
                const isPending = assessment.status === 'Pending' || score == null

                return (
                  <tr
                    key={assessment.id}
                    className="hover:bg-[#F8FCFE] transition-colors group cursor-pointer"
                    onClick={() => onSelectBusiness(assessment.businessId)}
                  >
                    {/* Business & Registration */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F2F9FC] border border-[#CFD8DD]/50 text-[#0F253B] flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#FF6D63] group-hover:text-white group-hover:border-transparent transition-colors">
                          {business?.name ? business.name.charAt(0) : <Building2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-[#0F253B] text-xs group-hover:text-[#268FB6] transition-colors">
                            {business?.name || `Business #${assessment.businessId}`}
                          </div>
                          <div className="text-[10px] text-[#839098] font-mono">
                            {business?.registrationNumber || 'Pending Reg'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="py-3.5 px-4 font-medium text-[#5A6B76]">
                      {business?.industry || 'N/A'}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#5A6B76] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#839098]" />
                        <span>{formatDate(assessment.createdDate)}</span>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-4">
                      {score != null ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 font-extrabold text-[#0F253B]">
                            <span>{score}</span>
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

                    {/* Risk Profile */}
                    <td className="py-3.5 px-4">
                      <RiskBadge
                        riskBand={creditReport?.riskBand}
                        isThinFile={creditReport?.isThinFile}
                        showQualification
                        size="sm"
                      />
                    </td>

                    {/* Turnover / Credits */}
                    <td className="py-3.5 px-4 font-semibold text-[#0F253B] tabular-nums whitespace-nowrap">
                      {assessment.bankStatement?.totalCredits != null
                        ? formatCurrency(assessment.bankStatement.totalCredits)
                        : <span className="text-[#839098] italic">Awaiting Docs</span>}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant={isPending ? 'outline' : 'ghost'}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectBusiness(assessment.businessId)
                        }}
                        className="text-[11px] h-7 px-2.5"
                      >
                        {isPending ? 'Inspect' : 'View File'}
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
