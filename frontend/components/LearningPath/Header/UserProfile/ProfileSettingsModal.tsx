'use client'

import { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  User,
  Mail,
  Lock,
  Sparkles,
  Zap,
  Rocket,
  Trophy,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from 'lucide-react'
import { useUpdateProfile, useUserProgress } from '@/hooks/Auth/useUpdateProfile'
import { User as UserType, levelSlugToKey } from '@/hooks/Auth/useUser'

interface ProfileSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserType
}

const levelConfig = {
  beginner: { icon: Sparkles, color: 'text-green-400', bgColor: 'bg-green-500/10', label: 'Beginner' },
  intermediate: { icon: Zap, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', label: 'Intermediate' },
  pro: { icon: Rocket, color: 'text-red-400', bgColor: 'bg-red-500/10', label: 'Pro' },
}

export default function ProfileSettingsModal({
  isOpen,
  onClose,
  user,
}: ProfileSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'progress'>('profile')
  
  // Profile form state
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const { updateProfile, changePassword, isUpdatingProfile, isChangingPassword } = useUpdateProfile()
  const { progress, isLoading: isLoadingProgress } = useUserProgress()

  // Reset form when modal opens
  useLayoutEffect(() => {
    if (isOpen) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setProfileMessage(null)
      setPasswordMessage(null)
    }
  }, [isOpen, user.firstName, user.lastName, user.email])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMessage(null)

    try {
      await updateProfile({
        firstName: firstName !== user.firstName ? firstName : undefined,
        lastName: lastName !== user.lastName ? lastName : undefined,
        email: email !== user.email ? email : undefined,
      })
      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error: unknown) {
      setProfileMessage({
        type: 'error',
        text: (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to update profile'
      })
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage(null)

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      })
      setPasswordMessage({ type: 'success', text: 'Password changed successfully!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: unknown) {
      setPasswordMessage({
        type: 'error',
        text: (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to change password'
      })
    }
  }

  const currentLevelKey = levelSlugToKey(user.level?.slug)
  const currentLevel = levelConfig[currentLevelKey]
  const CurrentLevelIcon = currentLevel?.icon || Sparkles

  // State for portal mounting
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Prevent body scroll when modal is open
  useLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-slate-900 rounded-xl border-2 border-slate-700 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Profile Settings</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <User className="w-4 h-4 inline-block mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'password'
                    ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Lock className="w-4 h-4 inline-block mr-2" />
                Password
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'progress'
                    ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Trophy className="w-4 h-4 inline-block mr-2" />
                Progress
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Current Level Display */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Current Level
                    </label>
                     <div className={`flex items-center gap-3 p-3 rounded-lg border-2 ${currentLevel?.bgColor} border-slate-700`}>
                       <CurrentLevelIcon className={`w-5 h-5 ${currentLevel?.color}`} />
                       <span className="text-white font-medium">{currentLevel?.label || 'Unknown'}</span>
                     </div>
                  </div>

                  {/* Message */}
                  {profileMessage && (
                    <div className={`p-3 rounded-lg ${
                      profileMessage.type === 'success' 
                        ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-400' 
                        : 'bg-red-500/10 border border-red-500/50 text-red-400'
                    }`}>
                      {profileMessage.text}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isUpdatingProfile || (firstName === user.firstName && lastName === user.lastName && email === user.email)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
                  >
                    {isUpdatingProfile ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  {passwordMessage && (
                    <div className={`p-3 rounded-lg ${
                      passwordMessage.type === 'success' 
                        ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-400' 
                        : 'bg-red-500/10 border border-red-500/50 text-red-400'
                    }`}>
                      {passwordMessage.text}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
                  >
                    {isChangingPassword ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </button>
                </form>
              )}

              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  {isLoadingProgress ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                    </div>
                  ) : progress ? (
                    <>
                      {/* Progress Overview */}
                      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Learning Progress</h3>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${currentLevel?.bgColor}`}>
                            <CurrentLevelIcon className={`w-4 h-4 ${currentLevel?.color}`} />
                            <span className={`text-sm font-medium ${currentLevel?.color}`}>
                              {currentLevel?.label}
                            </span>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Completed Lessons</span>
                            <span className="text-white font-medium">
                              {progress.completedLessons} / {progress.totalLessons}
                            </span>
                          </div>
                          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress.percentage}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                            />
                          </div>
                          <p className="text-right text-sm text-emerald-400 mt-1">
                            {progress.percentage}% Complete
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-900 rounded-lg p-4 text-center">
                            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{progress.completedLessons}</p>
                            <p className="text-xs text-slate-400">Lessons Completed</p>
                          </div>
                          <div className="bg-slate-900 rounded-lg p-4 text-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{progress.percentage}%</p>
                            <p className="text-xs text-slate-400">Progress</p>
                          </div>
                        </div>
                      </div>

                      {/* Recent Completions */}
                      {progress.recentCompletions.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-slate-300 mb-3">
                            Recent Completions
                          </h3>
                          <div className="space-y-2">
                            {progress.recentCompletions.map((completion, index) => (
                              <div
                                key={completion.lessonId}
                                className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700"
                              >
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-medium truncate">
                                    {completion.lessonTitle}
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    {new Date(completion.completedAt).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">No progress data available yet.</p>
                      <p className="text-sm text-slate-500">Complete some lessons to see your progress!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
