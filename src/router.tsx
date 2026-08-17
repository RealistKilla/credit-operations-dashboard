import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { OverviewView } from './views/Overview'
import { BusinessesView } from './views/Businesses'
import { AssessmentsView } from './views/Assessments'
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
        element: <AssessmentsView />,
        errorElement: <RootErrorBoundary />
      },
      {
        path: '*',
        element: <Navigate to="/overview" replace />
      }
    ]
  }
])
