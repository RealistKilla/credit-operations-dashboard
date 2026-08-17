import React, { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { CheckCircle2, HelpCircle, XCircle, Check, ShieldCheck } from 'lucide-react'

export interface BusinessDecisionActionBarProps {
  businessName: string
  riskBand?: string | null
}

export function BusinessDecisionActionBar({
  businessName,
  riskBand
}: BusinessDecisionActionBarProps): React.JSX.Element {
  const [decision, setDecision] = useState<'approved' | 'info_requested' | 'declined' | null>(null)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null)

  const handleDecision = (type: 'approved' | 'info_requested' | 'declined') => {
    setIsSubmitting(true)
    setTimeout(() => {
      setDecision(type)
      setIsSubmitting(false)
      if (type === 'approved') {
        setConfirmedMessage(`Credit facility approved for ${businessName}. Handover dispatched to disbursements.`)
      } else if (type === 'info_requested') {
        setConfirmedMessage(`Information request sent to ${businessName}. Account flagged for document update.`)
      } else {
        setConfirmedMessage(`Application declined for ${businessName}. Underwriting record logged.`)
      }
    }, 400)
  }

  return (
    <Card className="p-5 border border-[rgba(0,0,0,0.08)] bg-white shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F2F3] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#0F253B] text-white rounded-xl">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F253B]">Underwriting Decision & Handover</h3>
            <p className="text-xs text-[#5A6B76]">
              Record the credit committee determination for {businessName}
            </p>
          </div>
        </div>

        {riskBand && (
          <span className="text-xs font-semibold text-[#5A6B76] self-start sm:self-auto bg-[#F5F7F9] px-2.5 py-1 rounded-lg">
            Assessed Tier: <strong className="text-[#0F253B]">{riskBand} Risk</strong>
          </span>
        )}
      </div>

      {/* Confirmation feedback alert */}
      {confirmedMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center justify-between gap-2 border ${
            decision === 'approved'
              ? 'bg-[#E8F8EE] text-[#15803D] border-[#BBF7D0]'
              : decision === 'info_requested'
              ? 'bg-[#EAF6FB] text-[#268FB6] border-[#BAE6FD]'
              : 'bg-[#FFEEF2] text-[#E11D48] border-[#FECDD3]'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            <Check className="w-4 h-4 shrink-0" />
            <span>{confirmedMessage}</span>
          </div>
          <button
            onClick={() => setConfirmedMessage(null)}
            className="text-[11px] underline font-medium hover:opacity-80 cursor-pointer"
          >
            Change Decision
          </button>
        </div>
      )}

      {/* Action Decision Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Underwriting Notes Input */}
        <div className="flex-1">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add optional underwriting rationale or covenant notes (e.g. 3-month review)..."
            className="w-full bg-[#F5F7F9] text-[#1A1A1A] placeholder:text-[#839098] text-xs rounded-xl border border-[#CFD8DD] px-3.5 py-2.5 focus:outline-none focus:border-[#268FB6] focus:ring-2 focus:ring-[#268FB6]/20 transition-all"
          />
        </div>

        {/* 3 Decision Handover Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          {/* 1. Accept / Approve */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleDecision('approved')}
            isLoading={isSubmitting && decision === 'approved'}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
            className="bg-[#1AAE4E] hover:bg-[#15803D] focus:ring-[#1AAE4E]/50 text-white font-semibold text-xs"
          >
            Approve Facility
          </Button>

          {/* 2. Request Info */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDecision('info_requested')}
            isLoading={isSubmitting && decision === 'info_requested'}
            leftIcon={<HelpCircle className="w-4 h-4" />}
            className="border-[#61B8D8] text-[#268FB6] hover:bg-[#EAF6FB] font-semibold text-xs"
          >
            Request Info
          </Button>

          {/* 3. Decline */}
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDecision('declined')}
            isLoading={isSubmitting && decision === 'declined'}
            leftIcon={<XCircle className="w-4 h-4" />}
            className="bg-[#FF274B] hover:bg-[#E11D48] text-white font-semibold text-xs"
          >
            Decline
          </Button>
        </div>
      </div>
    </Card>
  )
}
