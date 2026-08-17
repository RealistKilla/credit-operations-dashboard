import React from 'react'
import { cn } from '../../utils/cn'
import { RiskBadge } from './RiskBadge'
import type { RiskBand } from '../../types/schemas'

export interface ScoreGaugeProps {
  score: number | null | undefined
  riskBand?: RiskBand | null
  isThinFile?: boolean | null
  minScore?: number
  maxScore?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ScoreGauge({
  score,
  riskBand,
  isThinFile = false,
  minScore = 300,
  maxScore = 850,
  size = 'md',
  className
}: ScoreGaugeProps): React.JSX.Element {
  const isPending = score == null

  // Normalize score between 0 and 1
  const normalized = isPending
    ? 0
    : Math.min(Math.max((score - minScore) / (maxScore - minScore), 0), 1)

  // Determine tier & colors
  let strokeColor = '#64748B'
  let labelColor = 'text-[#64748B]'
  let qualificationText = 'Pending Data'

  if (score != null) {
    if (score >= 700) {
      strokeColor = '#1AAE4E'
      labelColor = 'text-[#15803D]'
      qualificationText = 'Tier 1 - Prime Qualification'
    } else if (score >= 500) {
      strokeColor = '#D97706'
      labelColor = 'text-[#B45309]'
      qualificationText = 'Tier 2 - Standard / Conditional'
    } else {
      strokeColor = '#FF274B'
      labelColor = 'text-[#E11D48]'
      qualificationText = 'Tier 3 - Subprime / Attention'
    }
  }

  // Semi-circle SVG dimensions
  const dimensions = {
    sm: { width: 140, height: 80, strokeWidth: 10, radius: 55, fontSize: 'text-2xl' },
    md: { width: 200, height: 115, strokeWidth: 14, radius: 80, fontSize: 'text-4xl' },
    lg: { width: 260, height: 150, strokeWidth: 18, radius: 105, fontSize: 'text-5xl' }
  }[size]

  const circumference = Math.PI * dimensions.radius
  const strokeDashoffset = circumference - normalized * circumference

  return (
    <div className={cn('flex flex-col items-center justify-center p-4', className)}>
      <div className="relative flex items-center justify-center" style={{ width: dimensions.width, height: dimensions.height }}>
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height + 10}`}
          className="overflow-visible"
        >
          {/* Background Track Arc */}
          <path
            d={`M ${dimensions.strokeWidth / 2 + 5} ${dimensions.height} A ${dimensions.radius} ${dimensions.radius} 0 0 1 ${dimensions.width - dimensions.strokeWidth / 2 - 5} ${dimensions.height}`}
            fill="none"
            stroke="#E2EAF0"
            strokeWidth={dimensions.strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Colored Arc */}
          {!isPending && (
            <path
              d={`M ${dimensions.strokeWidth / 2 + 5} ${dimensions.height} A ${dimensions.radius} ${dimensions.radius} 0 0 1 ${dimensions.width - dimensions.strokeWidth / 2 - 5} ${dimensions.height}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={dimensions.strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          )}
        </svg>

        {/* Center Score Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span className={cn('font-extrabold tracking-tight tabular-nums', dimensions.fontSize, labelColor)}>
            {score != null ? score : '—'}
          </span>
          <span className="text-[11px] font-semibold text-[#5A6B76] uppercase tracking-wider -mt-1">
            out of {maxScore}
          </span>
        </div>
      </div>

      {/* Range boundaries */}
      <div className="w-full flex justify-between text-[11px] font-semibold text-[#839098] px-3 mt-1.5" style={{ maxWidth: dimensions.width }}>
        <span>{minScore}</span>
        <span>{maxScore}</span>
      </div>

      {/* Risk Badge & Tier Info */}
      <div className="mt-3 flex flex-col items-center gap-1.5">
        <RiskBadge riskBand={riskBand} isThinFile={isThinFile} size="md" />
        <span className="text-[11px] font-medium text-[#5A6B76]">{qualificationText}</span>
      </div>
    </div>
  )
}
