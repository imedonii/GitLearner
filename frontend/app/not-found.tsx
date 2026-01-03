'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Home, Code } from 'lucide-react'
import { Button } from '@/components/UI/button'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NotFound = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500/50 mb-8"
        >
          <AlertCircle className="w-12 h-12 text-red-400" />
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-8xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Oops! This page doesn't exist.
          </h2>
          <p className="text-slate-400 mb-8">
            The page you're looking for could not be found. It might have been
            removed, renamed, or did not exist in the first place.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => router.push('/')}
            className="border border-emerald-500 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 gap-2 text-lg"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Button>

          <Button
            onClick={() => router.push('/playground')}
            className="border border-emerald-500 bg-transparent text-emerald-400 hover:bg-emerald-900/50 hover:text-white px-8 py-6 gap-2 text-lg"
          >
            <Code className="w-5 h-5" />
            Go to Playground
          </Button>
        </motion.div>

        {/* Fun Git Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-4 bg-slate-900 border border-slate-700 rounded-lg"
        >
          <code className="text-sm text-slate-400 font-mono">
            $ git checkout {pathname || 'page'}
            <br />
            <span className="text-red-400">
              error: pathspec '{pathname || 'page'}' did not match any file(s)
              known to git
            </span>
          </code>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
