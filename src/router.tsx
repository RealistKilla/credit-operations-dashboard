import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { OverviewView } from './views/Overview'
import { BusinessesView } from './views/Businesses'
import { RootErrorBoundary } from './components/layout/RootErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/overview" replace />
      },
      {
        path: 'overview',
        element: <OverviewView />,
        errorElement: <RootErrorBoundary />
      },
      {
        path: 'businesses',
        element: <Navigate to="/businesses/1" replace />
      },
      {
        path: 'businesses/:businessId',
        element: <BusinessesView />,
        errorElement: <RootErrorBoundary />
      },
      {
        path: 'assessments',
        element: (
          <div className="p-8 text-center text-[#5A6B76] bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm">
            <p className="font-bold text-lg text-[#0F253B]">Assessments & Qualification Ranking</p>
            <p className="text-xs mt-1">Multi-Filter Credit Ranking Table (TICK-05)</p>
          </div>
        )
      },
      {
        path: '*',
        element: <Navigate to="/overview" replace />
      }
    ]
  }
])
