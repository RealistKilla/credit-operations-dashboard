import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { api } from './client'
import type {
  Business,
  Assessment,
  CreditReport,
  BankStatement,
  ScoreItem,
  DashboardData
} from '../types/schemas'

export const queryKeys = {
  businesses: ['businesses'] as const,
  business: (id?: number) => ['businesses', id] as const,
  assessments: (params?: { businessId?: number }) => ['assessments', params] as const,
  assessment: (id?: number) => ['assessments', id] as const,
  creditReports: (params?: { assessmentId?: number }) => ['creditReports', params] as const,
  bankStatements: (params?: { assessmentId?: number }) => ['bankStatements', params] as const,
  scoreItems: (params?: { assessmentId?: number }) => ['scoreItems', params] as const,
  dashboard: ['dashboard'] as const
}

export function useBusinesses(): UseQueryResult<Business[], Error> {
  return useQuery({
    queryKey: queryKeys.businesses,
    queryFn: api.getBusinesses,
    staleTime: 1000 * 60 * 5
  })
}

export function useBusiness(id?: number): UseQueryResult<Business, Error> {
  return useQuery({
    queryKey: queryKeys.business(id),
    queryFn: () => {
      if (!id) throw new Error('Business ID is required')
      return api.getBusinessById(id)
    },
    enabled: typeof id === 'number'
  })
}

export function useAssessments(params?: { businessId?: number }): UseQueryResult<Assessment[], Error> {
  return useQuery({
    queryKey: queryKeys.assessments(params),
    queryFn: () => api.getAssessments(params),
    staleTime: 1000 * 60 * 5
  })
}

export function useCreditReports(params?: { assessmentId?: number }): UseQueryResult<CreditReport[], Error> {
  return useQuery({
    queryKey: queryKeys.creditReports(params),
    queryFn: () => api.getCreditReports(params),
    staleTime: 1000 * 60 * 5
  })
}

export function useBankStatements(params?: { assessmentId?: number }): UseQueryResult<BankStatement[], Error> {
  return useQuery({
    queryKey: queryKeys.bankStatements(params),
    queryFn: () => api.getBankStatements(params),
    staleTime: 1000 * 60 * 5
  })
}

export function useScoreItems(params?: { assessmentId?: number }): UseQueryResult<ScoreItem[], Error> {
  return useQuery({
    queryKey: queryKeys.scoreItems(params),
    queryFn: () => api.getScoreItems(params),
    staleTime: 1000 * 60 * 5
  })
}

export function useDashboardData(): UseQueryResult<DashboardData, Error> {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: api.getFullDashboardData,
    staleTime: 1000 * 60 * 2
  })
}
