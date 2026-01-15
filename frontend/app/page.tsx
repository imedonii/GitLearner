// app/page.tsx
'use client'

import GuestLayout from './guest/layout'
import GuestPage from './guest/page'
import LoadingPage from '@/components/LoadingPage/LoadingPage'
import { useState, useEffect } from 'react'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time - you can replace this with actual loading logic
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <GuestLayout>
        <GuestPage />
      </GuestLayout>
    </div>
  )
}
