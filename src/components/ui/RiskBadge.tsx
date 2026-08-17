import React from 'react'
import { Badge } from './Badge'
import { RISK_BANDS, RISK_BAND_CONFIG } from '../../types/constants'
import type { RiskBand } from '../../types/schemas'
import { ShieldCheck, AlertTriangle, ShieldAlert, Clock, FileWarning } from 'lucide-react'

export interface RiskBadgeProps {
  riskBand: RiskBand | null | undefined
  isThinFile?: boolean | null
  showIcon?: boolean
  showQualification?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function RiskBadge({
  riskBand,
  isThinFile = false,
  showIcon = true,
  showQualification = false,
  size = 'md',
  className
}: RiskBadgeProps): React.JSX.Element {
  if (!riskBand) {
    return (
      <Badge variant="secondary" size={size} className={className}>
        {showIcon && <Clock className="w-3 h-3" />}
        <span>Pending Assessment</span>
      </Badge>
    )
  }

  const config = RISK_BAND_CONFIG[riskBand] || RISK_BAND_CONFIG[RISK_BANDS.PENDING]

  let variant: 'success' | 'warning' | 'danger' | 'secondary' = 'secondary'
  let Icon = Clock

  if (riskBand === RISK_BANDS.LOW) {
    variant = 'success'
    Icon = ShieldCheck
  } else if (riskBand === RISK_BANDS.MEDIUM) {
    variant = 'warning'
    Icon = AlertTriangle
  } else if (riskBand === RISK_BANDS.HIGH) {
    variant = 'danger'
    Icon = ShieldAlert
  }

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <Badge variant={variant} size={size} className={className}>
        {showIcon && <Icon className="w-3 h-3 shrink-0" />}
        <span>{config.label}</span>
      </Badge>
      {showQualification && config.qualification && (
        <span className="text-[11px] font-medium text-[#5A6B76]">
          ({config.qualification})
        </span>
      )}
      {isThinFile && (
        <Badge variant="purple" size="sm" title="Thin credit history file">
          <FileWarning className="w-3 h-3" />
          <span>Thin File</span>
        </Badge>
      )}
    </div>
  )
}
