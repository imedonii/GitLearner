import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Settings,
  LogOut,
  AlertTriangle,
  Sparkles,
  Zap,
  Rocket,
} from 'lucide-react'
import ProfileSettingsModal from './ProfileSettingsModal'

interface UserProfileProps {
  user: {
    firstName: string
    lastName: string
    email: string
    level: string
  }
  onLogout: () => void
  onChangeLevel: (level: string) => void
}

export default function UserProfile({
  user,
  onLogout,
  onChangeLevel,
}: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showLevelWarning, setShowLevelWarning] = useState(false)
  const [pendingLevel, setPendingLevel] = useState<string | null>(null)

  const levelConfig = {
    beginner: { icon: Sparkles, color: 'text-green-400', label: 'Beginner' },
    intermediate: {
      icon: Zap,
      color: 'text-yellow-400',
      label: 'Intermediate',
    },
    pro: { icon: Rocket, color: 'text-red-400', label: 'Pro' },
  }

  const currentLevel = levelConfig[user.level as keyof typeof levelConfig]
  const CurrentLevelIcon = currentLevel?.icon || Sparkles

  const confirmLevelChange = () => {
    if (pendingLevel) {
      onChangeLevel(pendingLevel)
      setShowLevelWarning(false)
      setPendingLevel(null)
      setShowProfileSettings(false)
    }
  }

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
        onChangeLevel={(level) => {
          if (user.level === 'beginner' && level !== 'beginner') {
            setPendingLevel(level)
            setShowLevelWarning(true)
          } else {
            onChangeLevel(level)
          }
        }}
      />

      {/* Level Change Warning */}
      <AnimatePresence>
        {showLevelWarning && (
          <WarningModal
            title="Unlock All Lessons?"
            message="Changing from Beginner mode will unlock all lessons. You can still track your progress, but lessons won't be locked anymore."
            onConfirm={confirmLevelChange}
            onCancel={() => {
              setShowLevelWarning(false)
              setPendingLevel(null)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function WarningModal({
  title,
  message,
  onConfirm,
  onCancel,
  danger = false,
}: {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  danger?: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-slate-900 rounded-xl border-2 border-slate-700 shadow-2xl max-w-sm w-full p-6"
      >
        <div
          className={`w-12 h-12 rounded-full ${
            danger ? 'bg-red-500/20' : 'bg-yellow-500/20'
          } flex items-center justify-center mb-4`}
        >
          <AlertTriangle
            className={`w-6 h-6 ${danger ? 'text-red-400' : 'text-yellow-400'}`}
          />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-slate-800 hover:bg-slate-750 text-white font-medium rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 ${
              danger
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-emerald-500 hover:bg-emerald-600'
            } text-white font-medium rounded-lg transition-all`}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  )
}
