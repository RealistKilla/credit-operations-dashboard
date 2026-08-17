import React from 'react'
import { Sparkles } from 'lucide-react'

export interface SidebarRiskPulseProps {
  highRiskCount?: number
}

export function SidebarRiskPulse({ highRiskCount = 0 }: SidebarRiskPulseProps): React.JSX.Element {
  return (
    <div className="mt-6 p-3.5 bg-gradient-to-br from-[#1A3A54] to-[#0C1E2F] rounded-2xl border border-white/10 space-y-2 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6D63]" />
          <span>Risk Pulse</span>
        </div>
        {highRiskCount > 0 && (
          <span className="bg-[#FF274B]/20 text-[#FF274B] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
            {highRiskCount} Alert{highRiskCount > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <p className="text-[11px] text-white/60 leading-relaxed">
        Real-time credit score aggregation and bank statement liquidity indexing for SME funding.
      </p>
    </div>
  )
}
