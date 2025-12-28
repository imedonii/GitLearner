'use client'
import { motion } from 'framer-motion'
import { Terminal, GitBranch, BookOpen } from 'lucide-react'
import { FeatureCard } from './FeatureCard'

export const FeaturesBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
    >
      <FeatureCard
        icon={<Terminal className="w-8 h-8 text-emerald-400" />}
        title="Interactive Terminal"
        description="Type real Git commands and see instant feedback in our simulated terminal environment."
        delay={0.8}
      />
      <FeatureCard
        icon={<GitBranch className="w-8 h-8 text-blue-400" />}
        title="Visual Flow Diagrams"
        description="Watch files move through working directory, staging area, and repositories with beautiful animations."
        delay={0.9}
      />
      <FeatureCard
        icon={<BookOpen className="w-8 h-8 text-purple-400" />}
        title="Step-by-Step Lessons"
        description="Follow a curated learning path from basics to advanced concepts like branching and merging."
        delay={1.0}
      />
    </motion.div>
  )
}
