import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Settings,
  LogOut,
  Sparkles,
  Zap,
  Rocket,
} from 'lucide-react'
import ProfileSettingsModal from './ProfileSettingsModal'
import type { User as UserType } from '@/hooks/Auth/useUser'
import { levelSlugToKey } from '@/hooks/Auth/useUser'

interface UserProfileProps {
  user: UserType
  onLogout: () => void
}

export default function UserProfile({
  user,
  onLogout,
}: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)

  const levelConfig = {
    beginner: { icon: Sparkles, color: 'text-green-400', label: 'Beginner' },
    intermediate: {
      icon: Zap,
      color: 'text-yellow-400',
      label: 'Intermediate',
    },
    pro: { icon: Rocket, color: 'text-red-400', label: 'Pro' },
  }

  const userLevelKey = levelSlugToKey(user.level?.slug)
  const currentLevel = levelConfig[userLevelKey]
  const CurrentLevelIcon = currentLevel?.icon || Sparkles

  return (
    <>
      {/* Profile Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-white">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <CurrentLevelIcon className={`w-3 h-3 ${currentLevel?.color || 'text-green-400'}`} />
              {currentLevel?.label || 'Unknown'}
            </p>
          </div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-20"
              >
                {/* User Info */}
                <div className="p-4 border-b border-slate-700">
                  <p className="font-semibold text-white">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowProfileSettings(true)
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={showProfileSettings}
        onClose={() => setShowProfileSettings(false)}
        user={user}
      />
    </>
  )
}
