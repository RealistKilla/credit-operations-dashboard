import React from 'react'
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function RootErrorBoundary(): React.JSX.Element {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage = 'Please try again or contact support.'

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="min-h-screen bg-[#F5F7F9] flex items-center justify-center p-4">
      <Card className="p-8 text-center max-w-md w-full border-[#FECDD3] bg-white shadow-lg space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#FFEEF2] text-[#FF274B] flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#0F253B] tracking-tight">
            Oops, something went wrong!
          </h2>
          <p className="text-xs text-[#5A6B76] mt-2 leading-relaxed">
            {errorMessage}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Try Again
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/overview')}
            leftIcon={<Home className="w-4 h-4" />}
          >
            Go to Overview
          </Button>
        </div>
      </Card>
    </div>
  )
}
