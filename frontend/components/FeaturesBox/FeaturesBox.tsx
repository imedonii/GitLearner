'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Code2, Trophy, ChevronRight } from 'lucide-react'
import { Button } from '../UI'
import { LevelCard } from './LevelCard'
import { useRouter } from 'next/navigation'

export const FeaturesBox = () => {
  const router = useRouter()
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
            Structured Learning Path
          </h2>
          <p className="text-xl text-slate-300">
            Progress from Beginner → I Know Things → Pro
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <LevelCard
            level="Beginner"
            color="emerald"
            lessons="Lessons 1-7"
            description="Learn Git basics, commands, and workflows"
            icon={<GraduationCap className="w-8 h-8" />}
          />
          <LevelCard
            level="I Know Things"
            color="blue"
            lessons="Lessons 8-11"
            description="Master branching, merging, and collaboration"
            icon={<Code2 className="w-8 h-8" />}
          />
          <LevelCard
            level="Pro"
            color="purple"
            lessons="Lessons 12-14"
            description="Advanced techniques and best practices"
            icon={<Trophy className="w-8 h-8" />}
          />
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
          <p className="text-slate-400 mb-4">
            <span className="text-yellow-400">⚠️</span> Login required to start
            learning and track progress
          </p>
          <Button
            onClick={() => router.push('/learning-path')}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white gap-2"
          >
            View Learning Path
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
