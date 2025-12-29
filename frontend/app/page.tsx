// app/page.tsx
import { Metadata } from 'next'
import GuestLayout from './guest/layout'
import GuestPage from './guest/page'

export const metadata: Metadata = {
  title: 'Git Learner - Learn Git Interactively',
  description:
    'Master Git with interactive visual tutorials, terminal simulations, and hands-on exercises.',
  openGraph: {
    title: 'Git Learner - Learn Git Interactively',
    description:
      'Master Git with interactive visual tutorials, terminal simulations, and hands-on exercises.',
    images: ['https://gitlearner.com/logo.svg'],
  },
  alternates: {
    canonical: 'https://gitlearner.com',
  },
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <GuestLayout>
        <GuestPage />
      </GuestLayout>
    </div>
  )
}
