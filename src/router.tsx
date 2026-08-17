import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { OverviewView } from './views/Overview'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/overview" replace />
      },
      {
        path: 'overview',
        element: <OverviewView />
      },
      {
        path: 'businesses',
        element: <Navigate to="/businesses/1" replace />
      },
      {
        path: 'businesses/:businessId',
        element: (
          <div className="p-8 text-center text-[#5A6B76] bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm">
            <p className="font-bold text-lg text-[#0F253B]">Businesses Deep Dive</p>
            <p className="text-xs mt-1">Interactive Credit Assessment & Statement Analysis (TICK-04)</p>
          </div>
        )
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
