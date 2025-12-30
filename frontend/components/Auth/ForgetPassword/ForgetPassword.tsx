'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  GitBranch,
  Loader2,
  Lock,
  Mail,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type Step = 'email' | 'verify' | 'reset' | 'success'

export const ForgetPassword = () => {
  const router = useRouter()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email.includes('@')) {
      setError('Please enter a valid email')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep('verify')
    }, 1000)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep('reset')
    }, 1000)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 1000)
  }

  const handleGoToSignIn = () => {
    router.push('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 mb-4"
          >
            <GitBranch className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {step === 'success' ? 'Password Reset!' : 'Reset Password'}
          </h1>
          <p className="text-slate-400">
            {step === 'email' && 'Enter your email to receive a reset code'}
            {step === 'verify' && 'Enter the code we sent to your email'}
            {step === 'reset' && 'Choose a new password'}
            {step === 'success' && 'Your password has been successfully reset'}
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl"
        >
          {/* Back Button */}
          {step === 'email' && (
            <button
              onClick={handleGoToSignIn}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </motion.div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </form>
          )}

          {/* Step 2: Verify Code */}
          {step === 'verify' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-center text-2xl font-mono tracking-widest placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                  {confirmPassword && newPassword === confirmPassword && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-500" />
              </motion.div>

              <p className="text-slate-300 mb-6">
                You can now sign in with your new password
              </p>

              <button
                onClick={handleGoToSignIn}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all"
              >
                Continue to Login
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
