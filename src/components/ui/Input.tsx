import React from 'react'
import { cn } from '../../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, error, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5A6B76]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full bg-white text-[#1A1A1A] placeholder:text-[#839098] text-sm rounded-xl border border-[#CFD8DD] px-3.5 py-2.5 transition-all duration-150',
            'focus:outline-none focus:border-[#268FB6] focus:ring-3 focus:ring-[#61B8D8]/20',
            'disabled:bg-[#F5F7F9] disabled:text-[#839098] disabled:cursor-not-allowed',
            leftIcon && 'pl-9',
            rightIcon && 'pr-9',
            error && 'border-[#FF274B] focus:border-[#FF274B] focus:ring-[#FF274B]/20',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5A6B76]">
            {rightIcon}
          </div>
        )}
        {error && <p className="mt-1 text-xs text-[#FF274B] font-medium">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
