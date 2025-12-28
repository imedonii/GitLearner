'use client'

// app/guest/layout.tsx
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function GuestLayout({ children }: { children: ReactNode }) {
  // Auth Handlers
  const onSignIn = () => {}

  const onSignUp = () => {}

  return (
    <div>
      {/* Navbar */}
      <Navbar onSignIn={onSignIn} onSignUp={onSignUp} />

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
