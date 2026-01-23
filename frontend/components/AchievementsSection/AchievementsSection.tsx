'use client'
import { motion } from 'framer-motion'
import { ChevronRight, Trophy, Loader2 } from 'lucide-react'
import { AchievementPreview } from './AchievementPreview'
import {
  useAchievements,
  useLevelsWithStyling,
  Achievement,
} from '@/hooks/Content/useContent'
import { sectionAnimation } from '@/constants'

// Fallback achievements for display
const fallbackAchievements: Pick<Achievement, 'id' | 'title' | 'description' | 'icon'>[] = [
  {
    id: 'first-commit',
    title: 'First Commit',
    description: 'Make your first commit',
    icon: 'target',
  },
  {
    id: 'branch-master',
    title: 'Branch Master',
    description: 'Create and merge branches',
    icon: 'trophy',
  },
  {
    id: 'complete-all',
    title: 'Git Pro',
    description: 'Complete all lessons',
    icon: 'award',
  },
]

// Emoji mapping for achievements
const iconToEmoji: Record<string, string> = {
  target: '🎯',
  trophy: '🌿',
  award: '🏆',
  star: '⭐',
  zap: '⚡',
  rocket: '🚀',
}

export const AchievementsSection = () => {
  const { data: achievements, isLoading: isLoadingAchievements } = useAchievements()
  const { data: levels, isLoading: isLoadingLevels } = useLevelsWithStyling()

  // Use first 3 achievements for preview
  const previewAchievements =
    achievements && achievements.length > 0
      ? achievements.slice(0, 3)
      : fallbackAchievements

  // Filter levels for display (beginner, mid, pro)
  const displayLevels =
    levels && levels.length > 0
      ? levels.filter((l) => ['beginner', 'mid', 'pro'].includes(l.slug))
      : [
          { slug: 'beginner', name: 'Beginner', color: 'text-emerald-400', borderColor: 'border-emerald-500/30' },
          { slug: 'mid', name: 'I Know Things', color: 'text-blue-400', borderColor: 'border-blue-500/30' },
          { slug: 'pro', name: 'Pro', color: 'text-purple-400', borderColor: 'border-purple-500/30' },
        ]

  const isLoading = isLoadingAchievements || isLoadingLevels

  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div
        {...sectionAnimation}
        className="max-w-6xl mx-auto text-center"
      >
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Track Your Progress
        </h2>
        <p className="text-xl text-slate-300 mb-10">
          Unlock achievements and level up as you master Git
        </p>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {previewAchievements.map((achievement) => (
                <AchievementPreview
                  key={achievement.id}
                  icon={iconToEmoji[achievement.icon] || '🎯'}
                  title={achievement.title}
                  description={achievement.description}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              {displayLevels.map((level, index) => (
                <div key={level.slug} className="flex items-center gap-4">
                  <div
                    className={`bg-slate-800/50 ${level.borderColor || 'border-slate-500/30'} border rounded-full px-6 py-3`}
                  >
                    <span className={`${level.color || 'text-slate-400'} font-semibold`}>
                      {level.name}
                    </span>
                  </div>
                  {index < displayLevels.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </section>
  )
}
