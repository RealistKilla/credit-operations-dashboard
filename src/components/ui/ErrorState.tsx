import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './Button'
import { Card } from './Card'

export interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  isRetrying?: boolean
  className?: string
}

export function ErrorState({
  title = 'Oops, something went wrong!',
  message = 'Please try again or contact support.',
  onRetry,
  isRetrying = false,
  className
}: ErrorStateProps): React.JSX.Element {
  return (
    <Card className={`p-8 text-center max-w-lg mx-auto my-8 space-y-4 border-[#FECDD3] bg-[#FFEEF2] ${className || ''}`}>
      <div className="w-14 h-14 rounded-full bg-[#FF274B]/10 text-[#FF274B] flex items-center justify-center mx-auto shadow-inner">
        <AlertCircle className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#0F253B] tracking-tight">{title}</h3>
        <p className="text-xs text-[#5A6B76] mt-1.5 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <div className="pt-2">
          <Button
            variant="primary"
            onClick={onRetry}
            isLoading={isRetrying}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="px-5 shadow-sm"
          >
            Try Again
          </Button>
        </div>
      )}
    </Card>
  )
}
