import { useQuery } from '@tanstack/react-query'
import { api } from './client'

export const queryKeys = {
  businesses: ['businesses'],
  business: (id) => ['businesses', id],
  assessments: (params) => ['assessments', params],
  assessment: (id) => ['assessments', id],
  creditReports: (params) => ['creditReports', params],
  bankStatements: (params) => ['bankStatements', params],
  scoreItems: (params) => ['scoreItems', params],
  dashboard: ['dashboard']
}

export function useBusinesses() {
  return useQuery({
    queryKey: queryKeys.businesses,
    queryFn: api.getBusinesses,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}

export function useBusiness(id) {
  return useQuery({
    queryKey: queryKeys.business(id),
    queryFn: () => api.getBusinessById(id),
    enabled: !!id
  })
}

export function useAssessments(params) {
  return useQuery({
    queryKey: queryKeys.assessments(params),
    queryFn: () => api.getAssessments(params),
    staleTime: 1000 * 60 * 5
  })
}

export function useCreditReports(params) {
  return useQuery({
    queryKey: queryKeys.creditReports(params),
    queryFn: () => api.getCreditReports(params),
    staleTime: 1000 * 60 * 5
  })
}

export function useBankStatements(params) {
  return useQuery({
    queryKey: queryKeys.bankStatements(params),
    queryFn: () => api.getBankStatements(params),
    staleTime: 1000 * 60 * 5
  })
}

export function useScoreItems(params) {
  return useQuery({
    queryKey: queryKeys.scoreItems(params),
    queryFn: () => api.getScoreItems(params),
    staleTime: 1000 * 60 * 5
  })
}

export function useDashboardData() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: api.getFullDashboardData,
    staleTime: 1000 * 60 * 2
  })
}
