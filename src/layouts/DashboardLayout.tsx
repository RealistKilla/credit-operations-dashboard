import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { useBusinesses, useAssessments } from '../api/queries'
import { useSearch } from '../context/SearchContext'
import { Skeleton } from '../components/ui/Skeleton'

export function DashboardLayout(): React.JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { searchQuery, setSearchQuery } = useSearch()
  const { businessId } = useParams<{ businessId?: string }>()

  const { data: businesses = [], isLoading: isBusinessesLoading } = useBusinesses()
  const { data: assessments = [], isLoading: isAssessmentsLoading } = useAssessments()

  // Calculate urgent alert count
  const urgentAlertCount = assessments.filter(
    (a) => a.status === 'Pending'
  ).length

  const selectedBusinessId = businessId ? parseInt(businessId, 10) : null

  return (
    <div className="min-h-screen bg-[#F5F7F9] flex flex-col font-sans antialiased text-[#1A1A1A]">
      {/* 1. Global Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        urgentAlertCount={urgentAlertCount}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* 2. Main Layout Area with Sidebar & Routed Content */}
      <div className="flex-1 flex w-full relative">
        {/* Left Navigation Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 top-[70px] z-20 md:static md:block transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          {isBusinessesLoading || isAssessmentsLoading ? (
            <div className="w-[260px] bg-[#0F253B] p-4 space-y-4 min-h-[calc(100vh-70px)]">
              <Skeleton className="h-10 bg-white/10" />
              <Skeleton className="h-10 bg-white/10" />
              <Skeleton className="h-10 bg-white/10" />
            </div>
          ) : (
            <Sidebar
              businesses={businesses}
              assessments={assessments.map((a) => ({
                ...a,
                business: businesses.find((b) => b.id === a.businessId) || null,
                creditReport: null,
                bankStatement: null,
                scoreItems: [],
                netCashFlow: null
              }))}
              selectedBusinessId={selectedBusinessId}
              onCloseMobileDrawer={() => setSidebarOpen(false)}
            />
          )}
        </div>

        {/* Mobile Drawer Overlay Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-10 md:hidden top-[70px]"
          />
        )}

        {/* Main Routed Outlet Pane */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
