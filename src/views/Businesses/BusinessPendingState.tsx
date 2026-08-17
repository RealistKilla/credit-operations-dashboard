import React from 'react'
import { Card } from '../../components/ui/Card'
import { Clock, FileUp, Database, ShieldAlert } from 'lucide-react'

export interface BusinessPendingStateProps {
  businessName: string
}

export function BusinessPendingState({
  businessName
}: BusinessPendingStateProps): React.JSX.Element {
  return (
    <Card className="p-8 border-[#FED7AA] bg-gradient-to-b from-[#FFFDF7] to-white shadow-sm space-y-6">
      <div className="text-center space-y-2 max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF8E6] text-[#D97706] border border-[#FED7AA] flex items-center justify-center mx-auto shadow-xs">
          <Clock className="w-7 h-7 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-[#0F253B]">
          Assessment Pending for {businessName}
        </h3>
        <p className="text-xs text-[#5A6B76] leading-relaxed">
          This business is queued for credit assessment. Bank statement data and automated bureau scoring are awaiting ingestion.
        </p>
      </div>

      {/* Underwriting Checklist Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
        {/* Step 1 */}
        <div className="p-4 bg-white rounded-xl border border-[#FED7AA]/60 space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[#D97706]">
            <FileUp className="w-4 h-4" />
            <span className="text-xs font-bold">1. Statement Upload</span>
          </div>
          <p className="text-[11px] text-[#5A6B76]">
            Bank statement CSV or PDF transaction files awaiting upload.
          </p>
          <span className="inline-block bg-[#FFF8E6] text-[#D97706] text-[10px] font-bold px-2 py-0.5 rounded">
            Awaiting Files
          </span>
        </div>

        {/* Step 2 */}
        <div className="p-4 bg-white rounded-xl border border-[rgba(0,0,0,0.06)] space-y-2 text-center sm:text-left opacity-75">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[#5A6B76]">
            <Database className="w-4 h-4" />
            <span className="text-xs font-bold">2. Financial Indexing</span>
          </div>
          <p className="text-[11px] text-[#839098]">
            Automated turnover extraction and cash flow debit/credit reconciliation.
          </p>
          <span className="inline-block bg-[#F1F5F9] text-[#475569] text-[10px] font-bold px-2 py-0.5 rounded">
            Queued
          </span>
        </div>

        {/* Step 3 */}
        <div className="p-4 bg-white rounded-xl border border-[rgba(0,0,0,0.06)] space-y-2 text-center sm:text-left opacity-75">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[#5A6B76]">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs font-bold">3. Risk Scoring</span>
          </div>
          <p className="text-[11px] text-[#839098]">
            Bureau model rating (300–850) and 4 category sub-score calculation.
          </p>
          <span className="inline-block bg-[#F1F5F9] text-[#475569] text-[10px] font-bold px-2 py-0.5 rounded">
            Pending
          </span>
        </div>
      </div>
    </Card>
  )
}
