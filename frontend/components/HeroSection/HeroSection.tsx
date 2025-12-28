'use client'

import { motion } from 'framer-motion'
import { GitBranch, Play } from 'lucide-react'
import { Button } from '@/components/UI/button'

export const HeroSection = () => {
  const onStart = () => {
    // Handle start learning action
  }

  return (
    <div className="container mx-auto px-6 py-30">
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
            Learn Git
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
          <Button
            onClick={onStart}
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg gap-2"
          >
            <Play className="w-5 h-5" />
            Start Learning
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
