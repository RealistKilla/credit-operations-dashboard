import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { CATEGORY_DESCRIPTIONS } from '../../types/constants'
import type { ScoreItem } from '../../types/schemas'
import { Sliders, CheckCircle, AlertCircle } from 'lucide-react'

export interface BusinessCategoryScoreBreakdownProps {
  scoreItems?: ScoreItem[]
}

export function BusinessCategoryScoreBreakdown({
  scoreItems = []
}: BusinessCategoryScoreBreakdownProps): React.JSX.Element {
  const safeItems = Array.isArray(scoreItems) ? scoreItems : []

  return (
    <Card className="p-0 overflow-hidden shadow-sm">
      <CardHeader className="border-b border-[#F0F2F3] bg-[#F5F7F9]/50 flex-row items-center justify-between space-y-0 py-3.5 px-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#268FB6] text-white rounded-lg">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm">Score Category Breakdown</CardTitle>
            <p className="text-[11px] text-[#5A6B76]">
              Sub-category credit scoring models (0–100 index)
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {safeItems.length === 0 ? (
          <div className="text-center py-6 text-[#839098] space-y-1">
            <AlertCircle className="w-6 h-6 text-[#D97706] mx-auto" />
            <p className="text-xs font-semibold text-[#0F253B]">No Category Sub-scores Available</p>
            <p className="text-[11px]">Assessment is pending or scoring data has not been ingested.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {safeItems.map((item) => {
              const description =
                CATEGORY_DESCRIPTIONS[item.category] ||
                'Credit metric evaluated by automated scoring models.'

              return (
                <div
                  key={item.id}
                  className="p-4 bg-[#F5F7F9] rounded-xl border border-[rgba(0,0,0,0.06)] space-y-2.5 hover:border-[#CFD8DD] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#0F253B] flex items-center gap-1.5">
                        {item.category}
                        {item.score >= 70 && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#1AAE4E]" />
                        )}
                      </h4>
                      <p className="text-[11px] text-[#5A6B76] mt-0.5 leading-relaxed">
                        {description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-[#0F253B] tabular-nums">
                        {item.score}
                      </span>
                      <span className="text-[10px] text-[#839098] block">/ 100</span>
                    </div>
                  </div>

                  <ProgressBar
                    value={item.score}
                    max={100}
                    size="md"
                    showValue={false}
                    dynamicColor
                  />
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
