import React from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  elevated?: boolean
}

export function Card({
  className,
  hoverable = false,
  elevated = false,
  children,
  ...props
}: CardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-[0_2px_8px_rgba(15,37,59,0.04)] transition-all duration-200',
        elevated && 'shadow-[0_8px_24px_rgba(15,37,59,0.08)] border-[rgba(0,0,0,0.12)]',
        hoverable && 'hover:shadow-[0_8px_20px_rgba(15,37,59,0.08)] hover:border-[rgba(0,0,0,0.15)] hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div className={cn('p-6 pb-3 flex flex-col space-y-1.5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.JSX.Element {
  return (
    <h3
      className={cn('text-base font-bold text-[#0F253B] tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element {
  return (
    <p className={cn('text-xs text-[#5A6B76]', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn('p-6 pt-0 flex items-center border-t border-[#F0F2F3] mt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}
