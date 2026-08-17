import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { RiskBadge } from '../../components/ui/RiskBadge'
import { Button } from '../../components/ui/Button'
import { formatCurrency, formatDate } from '../../utils/formatters'
import type { Business, Assessment, CreditReport, BankStatement } from '../../types/schemas'
import { ArrowRight, Building2, Calendar, CheckCircle2 } from 'lucide-react'

export interface OverviewRecentAssessmentsProps {
  businesses: Business[]
  completedAssessments: Assessment[]
  creditReports: CreditReport[]
  bankStatements: BankStatement[]
  onSelectBusiness: (businessId: number) => void
  onViewAllAssessments: () => void
}

export function OverviewRecentAssessments({
  businesses,
  completedAssessments,
  creditReports,
  bankStatements,
  onSelectBusiness,
  onViewAllAssessments
}: OverviewRecentAssessmentsProps): React.JSX.Element {
  return (
    <Card className="p-0 overflow-hidden shadow-sm flex flex-col h-full">
      <CardHeader className="border-b border-[#F0F2F3] bg-[#F5F7F9]/50 flex-row items-center justify-between space-y-0 py-3.5 px-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#1AAE4E] text-white rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm">Assessed Businesses ({completedAssessments.length})</CardTitle>
            <p className="text-[11px] text-[#5A6B76]">Fully indexed credit profiles & bank records</p>
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

      <CardContent className="p-0 flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#F0F2F3] bg-[#F5F7F9]/30 text-[#5A6B76] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Business</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Risk Band</th>
                <th className="py-3 px-4">Turnover (Credits)</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F3]">
              {completedAssessments.map((assessment) => {
                const business = businesses.find((b) => b.id === assessment.businessId)
                const report = creditReports.find((c) => c.assessmentId === assessment.id)
                const statement = bankStatements.find((b) => b.assessmentId === assessment.id)
                const score = report?.score

                return (
                  <tr
                    key={assessment.id}
                    className="hover:bg-[#F8FCFE] transition-colors group cursor-pointer"
                    onClick={() => onSelectBusiness(assessment.businessId)}
                  >
                    {/* Business Name & Reg */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#F2F9FC] text-[#0F253B] flex items-center justify-center font-bold text-xs shrink-0">
                          {business?.name ? business.name.charAt(0) : <Building2 className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-[#0F253B] text-xs">
                            {business?.name || `Business #${assessment.businessId}`}
                          </div>
                          <div className="text-[10px] text-[#839098] font-mono">
                            {business?.registrationNumber || '—'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="py-3.5 px-4 text-[#5A6B76]">
                      {business?.industry || '—'}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#5A6B76] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#839098]" />
                        <span>{formatDate(assessment.createdDate)}</span>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-4">
                      {score != null ? (
                        <span className="font-bold text-[#0F253B] text-sm tabular-nums">
                          {score}
                        </span>
                      ) : (
                        <span className="text-[#839098] italic text-xs">Pending</span>
                      )}
                    </td>

                    {/* Risk Band */}
                    <td className="py-3.5 px-4">
                      <RiskBadge
                        riskBand={report?.riskBand}
                        isThinFile={report?.isThinFile}
                        size="sm"
                      />
                    </td>

                    {/* Total Credits */}
                    <td className="py-3.5 px-4 font-semibold text-[#0F253B] tabular-nums whitespace-nowrap">
                      {statement?.totalCredits != null
                        ? formatCurrency(statement.totalCredits)
                        : <span className="text-[#839098] italic text-xs">Pending</span>}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectBusiness(assessment.businessId)
                        }}
                        className="text-[11px] h-7 px-2.5"
                      >
                        View
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
