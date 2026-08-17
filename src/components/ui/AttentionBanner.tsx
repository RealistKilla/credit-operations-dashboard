import React from 'react'
import { cn } from '../../utils/cn'
import { AlertCircle, ArrowRight, ShieldAlert, X } from 'lucide-react'
import { Button } from './Button'

export interface AttentionItem {
  id: number
  businessName: string
  issue: string
  score?: number | null
  riskBand?: string | null
  isThinFile?: boolean | null
  actionLabel?: string
  onAction?: () => void
}

export interface AttentionBannerProps {
  items: AttentionItem[]
  onSelectBusiness?: (businessId: number) => void
  onDismiss?: () => void
  className?: string
}

export function AttentionBanner({
  items,
  onSelectBusiness,
  onDismiss,
  className
}: AttentionBannerProps): React.JSX.Element | null {
  if (!items || items.length === 0) return null

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#FFEEF2] via-[#FFF5F7] to-[#FFF8E6] border border-[#FECDD3] rounded-2xl p-4 shadow-sm relative overflow-hidden',
        className
      )}
    >
      {/* Decorative accent strip */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#FF274B]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#FF274B]/10 text-[#FF274B] rounded-xl shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-[#0F253B]">
                Attention Required: {items.length} Business{items.length > 1 ? 'es' : ''} Need Review
              </h4>
              <span className="bg-[#FF274B] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Priority
              </span>
            </div>
            <p className="text-xs text-[#5A6B76] mt-0.5">
              High risk or incomplete documentation flagged for immediate credit analyst intervention.
            </p>

            {/* List of flagged companies */}
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectBusiness && onSelectBusiness(item.id)}
                  className="inline-flex items-center gap-1.5 bg-white border border-[#FECDD3] hover:border-[#FF274B] text-[#0F253B] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs hover:shadow transition-all group cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-[#FF274B]" />
                  <span>{item.businessName}</span>
                  <span className="text-[11px] font-normal text-[#839098]">({item.issue})</span>
                  <ArrowRight className="w-3 h-3 text-[#5A6B76] group-hover:translate-x-0.5 group-hover:text-[#FF6D63] transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="self-start md:self-center text-[#5A6B76] hover:text-[#0F253B]"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
