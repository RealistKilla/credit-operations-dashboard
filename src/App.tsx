import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { SearchProvider } from './context/SearchContext'

export default function App(): React.JSX.Element {
  return (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  )
}
