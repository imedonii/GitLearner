import { GitBranch } from 'lucide-react'
import { Button } from '@/components/UI'

type NavbarProps = {
  onSignIn: () => void
  onSignUp: () => void
}

const Navbar = ({ onSignIn, onSignUp }: NavbarProps) => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-8 h-8 text-emerald-400" />
          <span className="text-xl font-bold">Git Learner</span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={onSignIn}
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Sign In
          </Button>
          <Button
            onClick={onSignUp}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
