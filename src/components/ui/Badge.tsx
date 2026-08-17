import React from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'purple'
  size?: 'sm' | 'md'
  pill?: boolean
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  pill = true,
  children,
  ...props
}: BadgeProps): React.JSX.Element {
  const variantStyles = {
    default: 'bg-[#0F253B] text-white border-transparent',
    secondary: 'bg-[#E2EAF0] text-[#0F253B] border-transparent',
    outline: 'bg-transparent text-[#0F253B] border-[#CFD8DD]',
    success: 'bg-[#E8F8EE] text-[#15803D] border-[#BBF7D0]',
    warning: 'bg-[#FFF8E6] text-[#B45309] border-[#FED7AA]',
    danger: 'bg-[#FFEEF2] text-[#E11D48] border-[#FECDD3]',
    info: 'bg-[#EAF6FB] text-[#268FB6] border-[#BAE6FD]',
    purple: 'bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]'
  }

  const sizeStyles = {
    sm: 'text-[11px] font-semibold px-2 py-0.5',
    md: 'text-xs font-semibold px-2.5 py-1'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border transition-colors select-none font-medium',
        pill ? 'rounded-full' : 'rounded-md',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
