import React from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  pill?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      pill = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none active:scale-[0.98]'

    const variantStyles = {
      primary:
        'bg-[#FF6D63] text-white hover:bg-[#E85B51] shadow-sm hover:shadow focus:ring-[#FF6D63]/50 border border-transparent font-semibold',
      secondary:
        'bg-[#0F253B] text-white hover:bg-[#1A3A54] shadow-sm focus:ring-[#0F253B]/50 border border-transparent font-semibold',
      outline:
        'bg-white text-[#0F253B] border border-[#CFD8DD] hover:bg-[#F5F7F9] hover:border-[#0F253B] focus:ring-[#0F253B]/30',
      ghost:
        'bg-transparent text-[#0F253B] hover:bg-[#EAF6FB] hover:text-[#268FB6] focus:ring-[#61B8D8]/50',
      danger:
        'bg-[#FF274B] text-white hover:bg-[#E11D48] shadow-sm focus:ring-[#FF274B]/50 border border-transparent font-semibold',
      link:
        'bg-transparent text-[#268FB6] underline-offset-4 hover:underline p-0 h-auto font-medium focus:ring-0'
    }

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-3 gap-2.5 h-12 text-base font-semibold',
      icon: 'h-9 w-9 p-0'
    }

    const radiusStyles = pill ? 'rounded-full' : 'rounded-lg'

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], radiusStyles, className)}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
