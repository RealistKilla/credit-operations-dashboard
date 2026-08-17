import React from 'react'
import { cn } from '../../utils/cn'
import { Card } from './Card'

export interface MetricCardProps {
  title: string
  value: string | number | React.ReactNode
  subtitle?: string
  icon?: React.ReactNode
  variant?: 'default' | 'primary' | 'coral' | 'sky' | 'success' | 'warning' | 'danger'
  trend?: {
    value: string
    isPositive?: boolean
  }
  active?: boolean
  onClick?: () => void
  className?: string
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  variant = 'default',
  trend,
  active = false,
  onClick,
  className
}: MetricCardProps): React.JSX.Element {
  const iconBgStyles = {
    default: 'bg-[#F2F9FC] text-[#0F253B]',
    primary: 'bg-[#0F253B] text-white',
    coral: 'bg-[#FFF0EE] text-[#FF6D63]',
    sky: 'bg-[#EAF6FB] text-[#268FB6]',
    success: 'bg-[#E8F8EE] text-[#15803D]',
    warning: 'bg-[#FFF8E6] text-[#B45309]',
    danger: 'bg-[#FFEEF2] text-[#E11D48]'
  }

  const borderStyles = {
    default: 'hover:border-[#CFD8DD]',
    primary: 'border-l-4 border-l-[#0F253B]',
    coral: 'border-l-4 border-l-[#FF6D63]',
    sky: 'border-l-4 border-l-[#61B8D8]',
    success: 'border-l-4 border-l-[#1AAE4E]',
    warning: 'border-l-4 border-l-[#D97706]',
    danger: 'border-l-4 border-l-[#FF274B]'
  }

  return (
    <Card
      hoverable={!!onClick}
      className={cn(
        'p-5 relative transition-all duration-200',
        onClick && 'cursor-pointer select-none active:scale-[0.99]',
        active && 'ring-2 ring-[#0F253B] shadow-md',
        borderStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#5A6B76]">{title}</p>
          <div className="text-2xl font-extrabold text-[#0F253B] tracking-tight tabular-nums">
            {value}
          </div>
          {subtitle && <p className="text-xs text-[#839098]">{subtitle}</p>}
        </div>
        {icon && (
          <div className={cn('p-2.5 rounded-xl shrink-0 flex items-center justify-center', iconBgStyles[variant])}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-[#F0F2F3] flex items-center gap-1.5 text-xs font-medium">
          <span className={cn('font-bold', trend.isPositive ? 'text-[#15803D]' : 'text-[#E11D48]')}>
            {trend.value}
          </span>
          <span className="text-[#839098]">vs last period</span>
        </div>
      )}
    </Card>
  )
}
