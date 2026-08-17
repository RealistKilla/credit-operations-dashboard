import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useBusinesses,
  useAssessments,
  useCreditReports,
  useBankStatements
} from '../../api/queries'
import { useSearch } from '../../context/SearchContext'
import { OverviewMetricsGrid } from './OverviewMetricsGrid'
import { OverviewAttentionSection } from './OverviewAttentionSection'
import { OverviewRecentAssessments } from './OverviewRecentAssessments'
import { OverviewPendingAssessments } from './OverviewPendingAssessments'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/ErrorState'

export function OverviewView(): React.JSX.Element {
  const navigate = useNavigate()
  const { searchQuery } = useSearch()

  // TanStack Query Hooks for data fetching directly from json-server endpoints
  const {
    data: businesses = [],
    isLoading: isBusinessesLoading,
    isError: isBusinessesError,
    isFetching: isBusinessesFetching,
    refetch: refetchBusinesses
  } = useBusinesses()

  const {
    data: assessments = [],
    isLoading: isAssessmentsLoading,
    isError: isAssessmentsError,
    isFetching: isAssessmentsFetching,
    refetch: refetchAssessments
  } = useAssessments()

  const {
    data: creditReports = [],
    isLoading: isCreditReportsLoading,
    isError: isCreditReportsError,
    isFetching: isCreditReportsFetching,
    refetch: refetchCreditReports
  } = useCreditReports()

  const {
    data: bankStatements = [],
    isLoading: isBankStatementsLoading,
    isError: isBankStatementsError,
    isFetching: isBankStatementsFetching,
    refetch: refetchBankStatements
  } = useBankStatements()

  const isLoading =
    isBusinessesLoading ||
    isAssessmentsLoading ||
    isCreditReportsLoading ||
    isBankStatementsLoading

  const isError =
    isBusinessesError ||
    isAssessmentsError ||
    isCreditReportsError ||
    isBankStatementsError

  const isRetrying =
    isBusinessesFetching ||
    isAssessmentsFetching ||
    isCreditReportsFetching ||
    isBankStatementsFetching

  const refetchAll = () => {
    refetchBusinesses()
    refetchAssessments()
    refetchCreditReports()
    refetchBankStatements()
  }

  // Filter assessments based on search query
  const filteredAssessments = useMemo(() => {
    const safeAssessments = Array.isArray(assessments) ? assessments : []
    const safeBusinesses = Array.isArray(businesses) ? businesses : []
    const safeCreditReports = Array.isArray(creditReports) ? creditReports : []

    if (!searchQuery) return safeAssessments
    const query = searchQuery.toLowerCase()
    return safeAssessments.filter((assessment) => {
      const business = safeBusinesses.find((b) => b.id === assessment.businessId)
      const report = safeCreditReports.find((c) => c.assessmentId === assessment.id)
      const name = business?.name.toLowerCase() || ''
      const reg = business?.registrationNumber.toLowerCase() || ''
      const industry = business?.industry.toLowerCase() || ''
      const status = assessment.status.toLowerCase()
      const risk = report?.riskBand?.toLowerCase() || ''
      return (
        name.includes(query) ||
        reg.includes(query) ||
        industry.includes(query) ||
        status.includes(query) ||
        risk.includes(query)
      )
    })
  }, [assessments, businesses, creditReports, searchQuery])

  // Split into Completed vs Pending
  const completedAssessments = useMemo(() => {
    return (filteredAssessments || []).filter((a) => a.status === 'Complete')
  }, [filteredAssessments])

  const pendingAssessments = useMemo(() => {
    return (filteredAssessments || []).filter((a) => a.status === 'Pending')
  }, [filteredAssessments])

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12 animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Skeleton className="h-72 lg:col-span-2" />
          <Skeleton className="h-72 lg:col-span-1" />
        </div>
      </div>
    )
  }

  // Error recovery state
  if (isError) {
    return (
      <ErrorState
        title="Oops, something went wrong!"
        message="Please try again or contact support. Ensure the local json-server API is running on port 3001."
        onRetry={refetchAll}
        isRetrying={isRetrying}
      />
    )
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Title Bar */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0F253B] tracking-tight">
          Credit Operations Overview
        </h1>
        <p className="text-xs text-[#5A6B76] mt-1">
          High-level operational summary of business assessments and credit status.
        </p>
      </div>

      {/* 1. Priority Attention Banner */}
      <OverviewAttentionSection
        businesses={businesses}
        assessments={assessments}
        creditReports={creditReports}
        onSelectBusiness={(businessId) => {
          navigate(`/businesses/${businessId}`)
        }}
      />

      {/* 2. Top-level Summary Metrics Grid */}
      <OverviewMetricsGrid
        businesses={businesses}
        assessments={assessments}
        creditReports={creditReports}
        bankStatements={bankStatements}
      />

      {/* 3. Side-by-side Tables: Assessed Businesses (Left) + Pending Queue (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Assessed Businesses (2 Columns) */}
        <div className="lg:col-span-2">
          <OverviewRecentAssessments
            businesses={businesses}
            completedAssessments={completedAssessments}
            creditReports={creditReports}
            bankStatements={bankStatements}
            onSelectBusiness={(businessId) => {
              navigate(`/businesses/${businessId}`)
            }}
            onViewAllAssessments={() => navigate('/assessments')}
          />
        </div>

        {/* Pending Queue Table (1 Column) */}
        <div className="lg:col-span-1">
          <OverviewPendingAssessments
            businesses={businesses}
            pendingAssessments={pendingAssessments}
            onSelectBusiness={(businessId) => {
              navigate(`/businesses/${businessId}`)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export * from './OverviewMetricsGrid'
export * from './OverviewAttentionSection'
export * from './OverviewRecentAssessments'
export * from './OverviewPendingAssessments'
