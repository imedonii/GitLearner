'use client'

import { motion } from 'framer-motion'
import { GitBranch, Play, Terminal } from 'lucide-react'
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
    <section className="container mx-auto px-6 py-30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <GitBranch className="w-16 h-16 text-emerald-400" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Learn Git Interactively
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
        >
          Master Git through interactive visualization and hands-on practice.
          See how Git works in real-time with our terminal simulator and visual
          flow diagrams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex gap-4 justify-center">
            <Button
              onClick={onStart}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg gap-2"
            >
              <Play className="w-5 h-5" />
              Start Learning
            </Button>

            <Button
              onClick={onPlayground}
              size="lg"
              className="bg-transparent border border-emerald-600 text-emerald-400 hover:text-emerald-100 px-8 py-6 text-lg gap-2 transition-colors duration-200 hover:border-emerald-500 hover:bg-transparent"
            >
              <Terminal className="w-5 h-5" />
              Playground
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
