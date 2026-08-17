import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { formatDate } from '../../utils/formatters'
import type { Business, Assessment } from '../../types/schemas'
import { Clock, AlertCircle, Building2, ArrowRight } from 'lucide-react'

export interface OverviewPendingAssessmentsProps {
  businesses?: Business[]
  pendingAssessments?: Assessment[]
  onSelectBusiness: (businessId: number) => void
}

export function OverviewPendingAssessments({
  businesses = [],
  pendingAssessments = [],
  onSelectBusiness
}: OverviewPendingAssessmentsProps): React.JSX.Element {
  const safeList = Array.isArray(pendingAssessments) ? pendingAssessments : []

  return (
    <Card className="p-0 overflow-hidden shadow-sm border-[#FED7AA] bg-white flex flex-col h-full">
      <CardHeader className="border-b border-[#FED7AA]/60 bg-[#FFF8E6] flex-row items-center justify-between space-y-0 py-3.5 px-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#D97706] text-white rounded-lg">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm text-[#0F253B]">Pending Queue</CardTitle>
            <p className="text-[11px] text-[#B45309] font-medium">
              {safeList.length} Assessment{safeList.length !== 1 ? 's' : ''} Awaiting Ingestion
            </p>
          </div>
        </div>
        <span className="bg-[#D97706] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          Action Required
        </span>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col justify-between">
        {safeList.length === 0 ? (
          <div className="p-6 text-center text-[#839098] space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#E8F8EE] text-[#15803D] flex items-center justify-center mx-auto">
              ✓
            </div>
            <p className="text-xs font-semibold">All assessments complete</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F0F2F3]">
            {safeList.map((assessment) => {
              const business = (businesses || []).find((b) => b.id === assessment.businessId)
              return (
                <div
                  key={assessment.id}
                  className="p-4 hover:bg-[#FFFDF7] transition-colors group cursor-pointer"
                  onClick={() => onSelectBusiness(assessment.businessId)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#FFF0EE] text-[#FF6D63] border border-[#FECDD3] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {business?.name ? business.name.charAt(0) : <Building2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0F253B] text-xs group-hover:text-[#268FB6] transition-colors">
                          {business?.name || `Business #${assessment.businessId}`}
                        </h4>
                        <p className="text-[10px] text-[#839098] font-mono">
                          {business?.registrationNumber || 'No Reg Number'}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-[#5A6B76]">
                          <span className="bg-[#F1F5F9] px-1.5 py-0.5 rounded">
                            {business?.industry || 'Unknown Industry'}
                          </span>
                          <span>•</span>
                          <span>Created {formatDate(assessment.createdDate)}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectBusiness(assessment.businessId)
                      }}
                      className="text-[11px] h-7 px-2.5 shrink-0 border-[#FED7AA] hover:bg-[#FFF8E6] text-[#B45309]"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>

                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#B45309] bg-[#FFF8E6] p-2 rounded-lg border border-[#FED7AA]/50 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                    <span>Awaiting bank statement uploads & financial indexing</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
