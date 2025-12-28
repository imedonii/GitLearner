'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/UI/button'
import { Zap } from 'lucide-react'

export const BecomeMaster = () => {
  const onStart = () => {
    // Implementation would go here
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="text-center mt-20"
    >
      <p className="text-slate-400 mb-6">Ready to become a Git master?</p>
      <Button
        onClick={onStart}
        variant="outline"
        size="lg"
        className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-emerald-400/80 gap-2 cursor-pointer"
      >
        <Zap className="w-5 h-5" />
        Begin Your Journey
      </Button>
    </motion.div>
  )
}
