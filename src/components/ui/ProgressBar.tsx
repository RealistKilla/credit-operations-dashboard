import React from 'react'
import { cn } from '../../utils/cn'

export interface ProgressBarProps {
  value: number | null | undefined
  max?: number
  label?: string
  sublabel?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  dynamicColor?: boolean
  customColor?: string
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  sublabel,
  showValue = true,
  size = 'md',
  dynamicColor = true,
  customColor,
  className
}: ProgressBarProps): React.JSX.Element {
  const percentage = value != null ? Math.min(Math.max((value / max) * 100, 0), 100) : 0

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }

  // Dynamic risk color scale for credit scores (0-100)
  let barColor = 'bg-[#61B8D8]'
  let textColor = 'text-[#0F253B]'

  if (customColor) {
    barColor = customColor
  } else if (dynamicColor && value != null) {
    if (value >= 70) {
      barColor = 'bg-[#1AAE4E]'
      textColor = 'text-[#15803D]'
    } else if (value >= 50) {
      barColor = 'bg-[#D97706]'
      textColor = 'text-[#B45309]'
    } else {
      barColor = 'bg-[#FF274B]'
      textColor = 'text-[#E11D48]'
    }
  }

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="text-[#0F253B]">{label}</span>
            {sublabel && <span className="text-[11px] font-normal text-[#5A6B76]">({sublabel})</span>}
          </div>
          {showValue && (
            <span className={cn('tabular-nums font-bold', textColor)}>
              {value != null ? `${value.toFixed(1)}%` : 'N/A'}
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-[#E2EAF0] rounded-full overflow-hidden', sizeStyles[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
