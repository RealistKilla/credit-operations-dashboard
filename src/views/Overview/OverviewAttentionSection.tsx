import React from 'react'
import { AttentionBanner, type AttentionItem } from '../../components/ui/AttentionBanner'
import type { EnrichedAssessment } from '../../types/schemas'
import { RISK_BANDS } from '../../types/constants'

export interface OverviewAttentionSectionProps {
  assessments: EnrichedAssessment[]
  onSelectBusiness: (businessId: number) => void
  onDismiss?: () => void
}

export function OverviewAttentionSection({
  assessments,
  onSelectBusiness,
  onDismiss
}: OverviewAttentionSectionProps): React.JSX.Element | null {
  const attentionItems: AttentionItem[] = []

  assessments.forEach((assessment) => {
    const businessName = assessment.business?.name || `Business #${assessment.businessId}`

    if (assessment.creditReport?.riskBand === RISK_BANDS.HIGH) {
      attentionItems.push({
        id: assessment.businessId,
        businessName,
        issue: assessment.creditReport.isThinFile
          ? 'Score: 384 • High Risk • Thin File Flag'
          : `Score: ${assessment.creditReport.score || 'N/A'} • High Risk`,
        score: assessment.creditReport.score,
        riskBand: assessment.creditReport.riskBand,
        isThinFile: assessment.creditReport.isThinFile,
        actionLabel: 'Review Risk File'
      })
    } else if (assessment.status === 'Pending' || assessment.creditReport?.score == null) {
      attentionItems.push({
        id: assessment.businessId,
        businessName,
        issue: 'Pending Assessment • Missing Bank Records',
        score: null,
        riskBand: null,
        isThinFile: null,
        actionLabel: 'Check Status'
      })
    }
  })

  if (attentionItems.length === 0) return null

  return (
    <AttentionBanner
      items={attentionItems}
      onSelectBusiness={onSelectBusiness}
      onDismiss={onDismiss}
      className="my-1"
    />
  )
}
