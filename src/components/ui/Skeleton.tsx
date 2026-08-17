import React from 'react'
import { cn } from '../../utils/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  pill?: boolean
}

export function Skeleton({ className, pill = false, ...props }: SkeletonProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'animate-pulse bg-[#E2EAF0] dark:bg-[#D5D9DC]',
        pill ? 'rounded-full' : 'rounded-xl',
        className
      )}
      {...props}
    />
  )
}
