'use client'
import { motion } from 'framer-motion'
import { ChevronRight, Trophy } from 'lucide-react'
import { AchievementPreview } from './AchievementPreview'

export const AchievementsSection = () => {
  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Track Your Progress
        </h2>
        <p className="text-xl text-slate-300 mb-10">
          Unlock achievements and level up as you master Git
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <AchievementPreview
            icon="🎯"
            title="First Commit"
            description="Make your first commit"
          />
          <AchievementPreview
            icon="🌿"
            title="Branch Master"
            description="Create and merge branches"
          />
          <AchievementPreview
            icon="🏆"
            title="Git Pro"
            description="Complete all lessons"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="bg-slate-800/50 border border-emerald-500/30 rounded-full px-6 py-3">
            <span className="text-emerald-400 font-semibold">Beginner</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600" />
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-full px-6 py-3">
            <span className="text-blue-400 font-semibold">I Know Things</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600" />
          <div className="bg-slate-800/50 border border-purple-500/30 rounded-full px-6 py-3">
            <span className="text-purple-400 font-semibold">Pro</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
