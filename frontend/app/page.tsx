// app/page.tsx
import GuestLayout from './guest/layout'
import GuestPage from './guest/page'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <GuestLayout>
        <GuestPage />
      </GuestLayout>
    </div>
  )
}
