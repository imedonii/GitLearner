'use client'
import { motion } from 'framer-motion'
import { Code2, GitBranch, Star, Users } from 'lucide-react'
import { BenefitItem } from './BenefitItem'

export const WhyLearnGit = () => {
  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Why Learn Git?
          </h2>
          <p className="text-xl text-slate-300">
            Master the essential tool for modern software development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BenefitItem
            icon={<Code2 className="w-10 h-10 text-emerald-400" />}
            title="Version Control Fundamentals"
            description="Track every change, never lose work, and experiment safely"
          />
          <BenefitItem
            icon={<Users className="w-10 h-10 text-blue-400" />}
            title="Team Collaboration"
            description="Work seamlessly with teams on shared codebases"
          />
          <BenefitItem
            icon={<Star className="w-10 h-10 text-purple-400" />}
            title="Industry Standard"
            description="Used by millions of developers worldwide"
          />
          <BenefitItem
            icon={<GitBranch className="w-10 h-10 text-pink-400" />}
            title="GitHub & GitLab"
            description="Essential for open-source and portfolio projects"
          />
        </div>
      </motion.div>
    </section>
  )
}
