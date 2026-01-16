'use client'

import { motion } from 'framer-motion'
import { Play, Terminal } from 'lucide-react'
import { Button } from '@/components/UI/button'
import { useRouter } from 'next/navigation'

export const HeroSection = () => {
  const router = useRouter()
  const onStart = () => {
    router.push('/learning-path')
  }

  const onPlayground = () => {
    router.push('/playground')
  }

  return (
    <section className="container mx-auto px-6">
      <section className="py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Learn Git the{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Visual & Interactive
              </span>{' '}
              Way
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl lg:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Practice real Git commands, understand branches visually, and master
            version control step by step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={onStart}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg gap-2 shadow-lg shadow-emerald-500/30 cursor-pointer"
            >
              <Play className="w-5 h-5" />
              Start Learning
            </Button>
            <Button
              onClick={onPlayground}
              size="lg"
              className="bg-transparent border border-emerald-600 text-emerald-400 hover:text-emerald-100 px-8 py-6 text-lg gap-2 transition-colors duration-200 hover:border-emerald-500 hover:bg-transparent cursor-pointer"
            >
              <Terminal className="w-5 h-5" />
              Try Playground
            </Button>
          </motion.div>

          {/* Terminal Preview Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-slate-400 ml-2">terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-emerald-400 mb-2">$ git status</div>
              <div className="text-slate-300 mb-4">
                On branch <span className="text-blue-400">main</span>
                <br />
                Your branch is up to date.
              </div>
              <div className="text-emerald-400 mb-2">$ git add .</div>
              <div className="text-emerald-400 mb-2">
                $ git commit -m &quot;Initial commit&quot;
              </div>
              <div className="text-slate-300">
                [main <span className="text-yellow-400">a3f5b2c</span>] Initial
                commit
                <br />
                <span className="text-green-400">3 files changed</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </section>
  )
}
