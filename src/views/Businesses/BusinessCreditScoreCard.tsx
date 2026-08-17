import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { ScoreGauge } from '../../components/ui/ScoreGauge'
import { RISK_BAND_CONFIG, RISK_BANDS } from '../../types/constants'
import type { CreditReport } from '../../types/schemas'
import { Shield, AlertTriangle, Info } from 'lucide-react'

export interface BusinessCreditScoreCardProps {
  creditReport?: CreditReport | null
}

export function BusinessCreditScoreCard({
  creditReport
}: BusinessCreditScoreCardProps): React.JSX.Element {
  const score = creditReport?.score
  const riskBand = creditReport?.riskBand
  const isThinFile = creditReport?.isThinFile

  const config = (riskBand && RISK_BAND_CONFIG[riskBand]) || RISK_BAND_CONFIG[RISK_BANDS.PENDING]

  return (
    <Card className="p-0 overflow-hidden shadow-sm flex flex-col justify-between">
      <CardHeader className="border-b border-[#F0F2F3] bg-[#F5F7F9]/50 flex-row items-center justify-between space-y-0 py-3.5 px-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#0F253B] text-white rounded-lg">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm">Credit Score & Risk Profile</CardTitle>
            <p className="text-[11px] text-[#5A6B76]">Bureau score model (300–850 scale)</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
        {/* Score Gauge Visual */}
        <ScoreGauge
          score={score}
          riskBand={riskBand}
          isThinFile={isThinFile}
          size="md"
        />

        {/* Risk Profile Policy Description */}
        <div className="w-full bg-[#F5F7F9] p-3.5 rounded-xl border border-[rgba(0,0,0,0.06)] text-xs space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-[#0F253B]">
            <Info className="w-3.5 h-3.5 text-[#268FB6]" />
            <span>Underwriting Summary</span>
          </div>
          <p className="text-[#5A6B76] leading-relaxed">
            {config.description}
          </p>
        </div>

        {/* Thin File Callout if Flagged */}
        {isThinFile && (
          <div className="w-full bg-[#FFEEF2] border border-[#FECDD3] p-3.5 rounded-xl text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#FF274B] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#E11D48]">Thin Credit File Detected</p>
              <p className="text-[#5A6B76] text-[11px] mt-0.5">
                This business has limited statutory credit history. Underwriting approval requires additional bank statement covenants or security.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
