'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'

export const EmailVerification = () => {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()

    // Start countdown timer
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all filled
    if (newCode.every((digit) => digit) && index === 5) {
      handleVerify(newCode.join(''))
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const digits = pastedData.split('').filter((char) => /^\d$/.test(char))

    const newCode = [...code]
    digits.forEach((digit, index) => {
      if (index < 6) newCode[index] = digit
    })
    setCode(newCode)

    // Focus last filled input
    const lastIndex = Math.min(digits.length, 5)
    inputRefs.current[lastIndex]?.focus()

    // Auto-submit if complete
    if (newCode.every((digit) => digit)) {
      handleVerify(newCode.join(''))
    }
  }

  const handleVerify = async (verificationCode: string) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      //   onVerify(verificationCode)
      setLoading(false)
    }, 1500)

    router.push('/auth/levels')
  }

  const handleResend = async () => {
    setResendLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResendLoading(false)
      setCanResend(false)
      setResendTimer(60)

      // Restart countdown
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 1000)
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
            {loading ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Mail className="w-8 h-8 text-white" />
            )}
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-slate-400">
            We sent a verification code to
            <br />
            <span className="text-emerald-400 font-medium">
              user@example.com
            </span>
            {/* <span className="text-emerald-400 font-medium">{email}</span> */}
          </p>
        </div>

        {/* Verification Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl"
        >
          <h2 className="text-lg font-semibold text-white mb-6 text-center">
            Enter 6-digit code
          </h2>

          {/* Code Input */}
          <div className="flex gap-2 mb-6" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el
                  }
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full aspect-square text-center text-2xl font-bold bg-slate-800 border-2 border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={() => handleVerify(code.join(''))}
            disabled={code.some((digit) => !digit) || loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Verify Account
              </>
            )}
          </button>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400 mb-2">
              Didn't receive the code?
            </p>
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors disabled:opacity-50"
              >
                {resendLoading ? 'Sending...' : 'Resend Code'}
              </button>
            ) : (
              <p className="text-sm text-slate-500">
                Resend available in {resendTimer}s
              </p>
            )}
          </div>
        </motion.div>

        {/* Help Text */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Check your spam folder if you don't see the email
        </p>
      </motion.div>
    </div>
  )
}
