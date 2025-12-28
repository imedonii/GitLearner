'use client'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { BenefitItem } from './BenefitItem'

export const WhyLearnGit = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="mt-24 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
        Why Learn Git?
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <BenefitItem
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
          text="Industry-standard version control used by millions of developers"
        />
        <BenefitItem
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
          text="Essential skill for collaborating on team projects"
        />
        <BenefitItem
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
          text="Track changes, experiment safely, and never lose your work"
        />
        <BenefitItem
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
          text="Required knowledge for open-source contributions"
        />
      </div>
    </motion.div>
  )
}
