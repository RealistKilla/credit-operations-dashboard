import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useBusinesses,
  useAssessments,
  useCreditReports,
  useBankStatements,
  useScoreItems
} from '../../api/queries'
import { BusinessProfileHeader } from './BusinessProfileHeader'
import { BusinessCreditScoreCard } from './BusinessCreditScoreCard'
import { BusinessFinancialAnalysis } from './BusinessFinancialAnalysis'
import { BusinessCategoryScoreBreakdown } from './BusinessCategoryScoreBreakdown'
import { BusinessPendingState } from './BusinessPendingState'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/ErrorState'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function BusinessesView(): React.JSX.Element {
  const { businessId: paramId } = useParams<{ businessId?: string }>()
  const navigate = useNavigate()
  const currentBusinessId = paramId ? parseInt(paramId, 10) : 1

  // 1. Fetch businesses list
  const {
    data: businesses = [],
    isLoading: isBusinessesLoading,
    isError: isBusinessesError,
    isFetching: isBusinessesFetching,
    refetch: refetchBusinesses
  } = useBusinesses()

  // 2. Fetch assessments list
  const {
    data: assessments = [],
    isLoading: isAssessmentsLoading,
    isError: isAssessmentsError,
    isFetching: isAssessmentsFetching,
    refetch: refetchAssessments
  } = useAssessments()

  // 3. Fetch credit reports
  const {
    data: creditReports = [],
    isLoading: isCreditReportsLoading,
    isError: isCreditReportsError,
    isFetching: isCreditReportsFetching,
    refetch: refetchCreditReports
  } = useCreditReports()

  // 4. Fetch bank statements
  const {
    data: bankStatements = [],
    isLoading: isBankStatementsLoading,
    isError: isBankStatementsError,
    isFetching: isBankStatementsFetching,
    refetch: refetchBankStatements
  } = useBankStatements()

  // 5. Fetch score items
  const {
    data: scoreItems = [],
    isLoading: isScoreItemsLoading,
    isError: isScoreItemsError,
    isFetching: isScoreItemsFetching,
    refetch: refetchScoreItems
  } = useScoreItems()

  const isLoading =
    isBusinessesLoading ||
    isAssessmentsLoading ||
    isCreditReportsLoading ||
    isBankStatementsLoading ||
    isScoreItemsLoading

  const isError =
    isBusinessesError ||
    isAssessmentsError ||
    isCreditReportsError ||
    isBankStatementsError ||
    isScoreItemsError

  const isRetrying =
    isBusinessesFetching ||
    isAssessmentsFetching ||
    isCreditReportsFetching ||
    isBankStatementsFetching ||
    isScoreItemsFetching

  const refetchAll = () => {
    refetchBusinesses()
    refetchAssessments()
    refetchCreditReports()
    refetchBankStatements()
    refetchScoreItems()
  }

  // Derive selected business data
  const business = useMemo(() => {
    return businesses.find((b) => b.id === currentBusinessId) || null
  }, [businesses, currentBusinessId])

  const assessment = useMemo(() => {
    return assessments.find((a) => a.businessId === currentBusinessId) || null
  }, [assessments, currentBusinessId])

  const creditReport = useMemo(() => {
    if (!assessment) return null
    return creditReports.find((c) => c.assessmentId === assessment.id) || null
  }, [creditReports, assessment])

  const bankStatement = useMemo(() => {
    if (!assessment) return null
    return bankStatements.find((b) => b.assessmentId === assessment.id) || null
  }, [bankStatements, assessment])

  const businessScoreItems = useMemo(() => {
    if (!assessment) return []
    return scoreItems.filter((s) => s.assessmentId === assessment.id)
  }, [scoreItems, assessment])

  // Loading skeleton placeholder
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12 animate-pulse">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  // Error recovery state
  if (isError) {
    return (
      <ErrorState
        title="Oops, something went wrong!"
        message="Unable to fetch business credit data. Please verify the API server is running on port 3001."
        onRetry={refetchAll}
        isRetrying={isRetrying}
      />
    )
  }

  // Business not found
  if (!business) {
    return (
      <Card className="p-8 text-center max-w-md mx-auto my-12 space-y-4">
        <h3 className="text-lg font-bold text-[#0F253B]">Business Not Found</h3>
        <p className="text-xs text-[#5A6B76]">
          No business was found with ID #{currentBusinessId}.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/overview')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Return to Overview
        </Button>
      </Card>
    )
  }

  const isPending = assessment?.status === 'Pending' || creditReport?.score == null

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Business Profile Header */}
      <BusinessProfileHeader
        business={business}
        allBusinesses={businesses}
        assessment={assessment}
        creditReport={creditReport}
        onSelectBusiness={(id) => navigate(`/businesses/${id}`)}
      />

      {/* 2. Main Content Area */}
      {isPending ? (
        <BusinessPendingState businessName={business.name} />
      ) : (
        <>
          {/* Top Section: Credit Score Profile + Bank Statement Financials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            <BusinessCreditScoreCard creditReport={creditReport} />
            <BusinessFinancialAnalysis bankStatement={bankStatement} />
          </div>

          {/* Bottom Section: Category Sub-Scores Breakdown */}
          <BusinessCategoryScoreBreakdown scoreItems={businessScoreItems} />
        </>
      )}
    </div>
  )
}

export * from './BusinessProfileHeader'
export * from './BusinessCreditScoreCard'
export * from './BusinessFinancialAnalysis'
export * from './BusinessCategoryScoreBreakdown'
export * from './BusinessPendingState'
