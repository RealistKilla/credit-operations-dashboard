import React from 'react'
import { AlertCircle, ArrowRight, ShieldAlert } from 'lucide-react'
import type { Business, Assessment, CreditReport } from '../../types/schemas'
import { RISK_BANDS } from '../../types/constants'

export interface OverviewAttentionSectionProps {
  businesses: Business[]
  assessments: Assessment[]
  creditReports: CreditReport[]
  onSelectBusiness: (businessId: number) => void
}

export function OverviewAttentionSection({
  businesses,
  assessments,
  creditReports,
  onSelectBusiness
}: OverviewAttentionSectionProps): React.JSX.Element | null {
  // Find accounts needing attention: High Risk or Pending Assessment
  const attentionItems: {
    businessId: number
    name: string
    reason: string
  }[] = []

  assessments.forEach((assessment) => {
    const business = businesses.find((b) => b.id === assessment.businessId)
    const report = creditReports.find((c) => c.assessmentId === assessment.id)
    const name = business?.name || `Business #${assessment.businessId}`

    if (report?.riskBand === RISK_BANDS.HIGH) {
      attentionItems.push({
        businessId: assessment.businessId,
        name,
        reason: report.isThinFile
          ? `Score ${report.score ?? 'N/A'} • High Risk (Thin File)`
          : `Score ${report.score ?? 'N/A'} • High Risk`
      })
    } else if (assessment.status === 'Pending') {
      attentionItems.push({
        businessId: assessment.businessId,
        name,
        reason: 'Pending Assessment'
      })
    }
  })

  if (attentionItems.length === 0) return null

  return (
    <div className="bg-[#FFEEF2] border border-[#FECDD3] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#FF274B]/10 text-[#FF274B] rounded-xl shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#0F253B]">
            Attention Required ({attentionItems.length} Businesses)
          </h4>
          <p className="text-xs text-[#5A6B76] mt-0.5">
            Businesses flagged with high credit risk or pending assessments:
          </p>

          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            {attentionItems.map((item) => (
              <button
                key={item.businessId}
                onClick={() => onSelectBusiness(item.businessId)}
                className="inline-flex items-center gap-1.5 bg-white border border-[#FECDD3] hover:border-[#FF274B] text-[#0F253B] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#FF274B]" />
                <span>{item.name}</span>
                <span className="text-[11px] font-normal text-[#839098]">({item.reason})</span>
                <ArrowRight className="w-3 h-3 text-[#5A6B76]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
