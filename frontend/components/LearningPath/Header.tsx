'use client'

import { useState } from 'react'
import {
  Settings,
  LogOut,
  X,
  User,
  Rocket,
  Sparkles,
  Zap,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/hooks/Auth/useUser'

type UserProfileProps = {
  onLogout: () => void
  onResetProgress: () => void
  onProfileClick?: () => void
}

export const Header = ({
  onLogout,
  onResetProgress,
  onProfileClick,
}: UserProfileProps) => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showResetWarning, setShowResetWarning] = useState(false)

  const levelConfig = {
    beginner: { icon: Sparkles, color: 'text-green-400', label: 'Beginner' },
    intermediate: {
      icon: Zap,
      color: 'text-yellow-400',
      label: 'Intermediate',
    },
    pro: { icon: Rocket, color: 'text-red-400', label: 'Pro' },
  }

  const currentLevel = levelConfig[user?.level ? 'beginner' : 'intermediate']
  const CurrentLevelIcon = currentLevel.icon

  const confirmResetProgress = () => {
    onResetProgress()
    setShowResetWarning(false)
    setShowSettings(false)
  }

  return (
    <div className="h-16 z-9999 fixed w-full ml-80 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-lg">
      {/* Profile Button */}
      <div className="relative flex items-center gap-2 px-3 py-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-white">
              {user?.fullName ?? 'Git Learner'}
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <CurrentLevelIcon className={`w-3 h-3 ${currentLevel.color}`} />
              {currentLevel.label}
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
                  <p className="font-semibold text-white">{user?.fullName}</p>
                  <p className="text-sm text-slate-400">{user?.email}</p>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {onProfileClick && (
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        onProfileClick()
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowSettings(true)
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Knowledge Level</span>
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

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-slate-900 rounded-xl border-2 border-slate-700 shadow-2xl max-w-md w-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Reset Progress */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-3">
                    Danger Zone
                  </h3>
                  <button
                    onClick={() => setShowResetWarning(true)}
                    className="w-full flex items-center gap-3 p-3 bg-red-500/10 border-2 border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span className="font-medium">Reset Learning Progress</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reset Progress Warning */}
      <AnimatePresence>
        {showResetWarning && (
          <WarningModal
            title="Reset All Progress?"
            message="This will delete all your completed lessons and achievements. This action cannot be undone."
            onConfirm={confirmResetProgress}
            onCancel={() => setShowResetWarning(false)}
            danger
          />
        )}
      </AnimatePresence>
    </div>
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
