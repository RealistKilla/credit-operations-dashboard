import React, { useState } from 'react'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { OverviewView } from './views/Overview'
import { useDashboardData } from './api/queries'
import { NAV_ITEMS, type NavItem } from './types/constants'
import { Skeleton } from './components/ui/Skeleton'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './components/ui/Button'

export default function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<NavItem>(NAV_ITEMS.OVERVIEW)
  const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const { data: dashboardData, isLoading, isError, error, refetch } = useDashboardData()

  // Calculate urgent alert count (High risk or pending)
  const urgentAlertCount = dashboardData
    ? dashboardData.assessments.filter(
        (a) => a.creditReport?.riskBand === 'High' || a.status === 'Pending'
      ).length
    : 0

  return (
    <div className="min-h-screen bg-[#F5F7F9] flex flex-col font-sans antialiased text-[#1A1A1A]">
      {/* 1. Global App Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        urgentAlertCount={urgentAlertCount}
        onUrgentAlertClick={() => {
          setActiveTab(NAV_ITEMS.OVERVIEW)
        }}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* 2. Main Dashboard Layout Area */}
      <div className="flex-1 flex w-full relative">
        {/* Left Sidebar (Desktop + Mobile drawer) */}
        <div
          className={`
            fixed inset-y-0 left-0 top-[70px] z-20 md:static md:block transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          {dashboardData ? (
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab)
                setSidebarOpen(false)
              }}
              businesses={dashboardData.businesses}
              assessments={dashboardData.assessments}
              selectedBusinessId={selectedBusinessId}
              onSelectBusiness={(id) => {
                setSelectedBusinessId(id)
                setActiveTab(NAV_ITEMS.BUSINESSES)
                setSidebarOpen(false)
              }}
            />
          ) : (
            <div className="w-[260px] bg-[#0F253B] p-4 space-y-4 min-h-[calc(100vh-70px)]">
              <Skeleton className="h-10 bg-white/10" />
              <Skeleton className="h-10 bg-white/10" />
              <Skeleton className="h-10 bg-white/10" />
            </div>
          )}
        </div>

        {/* Mobile backdrop overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-10 md:hidden top-[70px]"
          />
        )}

        {/* Main Content Pane */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {isLoading && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-28" />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Skeleton className="h-64" />
                <Skeleton className="h-64" />
              </div>
            </div>
          )}

          {isError && (
            <div className="bg-[#FFEEF2] border border-[#FECDD3] rounded-2xl p-8 text-center max-w-lg mx-auto mt-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FF274B]/10 text-[#FF274B] flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F253B]">Unable to Connect to API</h3>
                <p className="text-xs text-[#5A6B76] mt-1.5">
                  Please ensure the local JSON server is active by running:
                </p>
                <div className="mt-2 bg-[#0F253B] text-[#61B8D8] font-mono text-xs py-2 px-3 rounded-lg inline-block">
                  npm run api
                </div>
                <p className="text-[11px] text-[#839098] mt-2">
                  {error instanceof Error ? error.message : 'Network error'}
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => refetch()}
                leftIcon={<RefreshCw className="w-4 h-4" />}
                className="mt-2"
              >
                Retry Connection
              </Button>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {activeTab === NAV_ITEMS.OVERVIEW && (
                <OverviewView
                  searchQuery={searchQuery}
                  onSelectBusiness={(businessId) => {
                    setSelectedBusinessId(businessId)
                    setActiveTab(NAV_ITEMS.BUSINESSES)
                  }}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === NAV_ITEMS.BUSINESSES && (
                <div className="p-8 text-center text-[#5A6B76]">
                  <p className="font-bold text-lg text-[#0F253B]">Businesses Deep Dive</p>
                  <p className="text-xs mt-1">Selected Business ID: {selectedBusinessId} (TICK-04)</p>
                </div>
              )}

              {activeTab === NAV_ITEMS.ASSESSMENTS && (
                <div className="p-8 text-center text-[#5A6B76]">
                  <p className="font-bold text-lg text-[#0F253B]">Assessments & Qualification Ranking</p>
                  <p className="text-xs mt-1">Filter and ranking view (TICK-05)</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
