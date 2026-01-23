'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  Code2,
  Trophy,
  ChevronRight,
  Sprout,
  LucideIcon,
  Loader2,
} from 'lucide-react'
import { Button } from '../UI'
import { LevelCard } from './LevelCard'
import { useRouter } from 'next/navigation'
import { useLevelsWithStyling, LevelWithStyling } from '@/hooks/Content/useContent'
import { sectionAnimation } from '@/constants'

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Code2,
  Trophy,
  Seedling: Sprout,
}

// Fallback data
const fallbackLevels: LevelWithStyling[] = [
  {
    id: 'level-beginner',
    name: 'Beginner',
    slug: 'beginner',
    description: 'Learn Git basics, commands, and workflows',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    emoji: '🟢',
    icon: 'GraduationCap',
    order: 1,
  },
  {
    id: 'level-mid',
    name: 'I Know Things',
    slug: 'mid',
    description: 'Master branching, merging, and collaboration',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    emoji: '🟡',
    icon: 'Code2',
    order: 2,
  },
  {
    id: 'level-pro',
    name: 'Pro',
    slug: 'pro',
    description: 'Advanced techniques and best practices',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    emoji: '🔴',
    icon: 'Trophy',
    order: 3,
  },
]

// Color mapping for LevelCard
const colorMapping: Record<string, string> = {
  'text-emerald-400': 'emerald',
  'text-blue-400': 'blue',
  'text-yellow-400': 'purple', // Map to purple for visual consistency
  'text-red-400': 'purple',
}

export const FeaturesBox = () => {
  const router = useRouter()
  const { data: levels, isLoading } = useLevelsWithStyling()

  // Filter to show only beginner, mid, and pro (not newbie) and use fallback if needed
  const displayLevels =
    levels && levels.length > 0
      ? levels.filter((l) => ['beginner', 'mid', 'pro'].includes(l.slug))
      : fallbackLevels

  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div {...sectionAnimation} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Structured Learning Path
          </h2>
          <p className="text-xl text-slate-300">
            Progress from Beginner → I Know Things → Pro
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {displayLevels.map((level) => {
              const IconComponent = iconMap[level.icon || 'GraduationCap'] || GraduationCap
              const cardColor = colorMapping[level.color || 'text-emerald-400'] || 'emerald'

              return (
                <LevelCard
                  key={level.id}
                  level={level.name}
                  color={cardColor}
                  lessons={`${level.slug === 'beginner' ? 'Lessons 1-7' : level.slug === 'mid' ? 'Lessons 8-11' : 'Lessons 12-14'}`}
                  description={level.description || ''}
                  icon={<IconComponent className="w-8 h-8" />}
                />
              )
            })}
          </div>
        )}

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
