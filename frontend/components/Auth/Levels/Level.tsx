'use client'

import { Check, GitBranch, Lock, Rocket, Sparkles, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/Auth/useUser'
import AppTooltip from '@/components/UI/AppTooltip'

export type KnowledgeLevel = 'newbie' | 'beginner' | 'mid' | 'pro'

interface LevelCard {
  id: KnowledgeLevel
  icon: typeof Sparkles
  title: string
  subtitle: string
  description: string
  features: string[]
  color: string
  iconColor: string
  borderColor: string
  slug: string
}

const levels: LevelCard[] = [
  {
    id: 'newbie',
    icon: Sparkles,
    title: 'Newbie',
    subtitle: "I'm completely new to Git",
    description: 'Start from the very basics with gentle introductions',
    features: [
      'Conceptual foundations',
      'No terminal required initially',
      'Step-by-step explanations',
      'Perfect for absolute beginners',
    ],
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/50',
    slug: 'newbie',
  },
]

export const Level = () => {
  const router = useRouter()
  const { user } = useUser()
  const [selectedLevel, setSelectedLevel] = useState<KnowledgeLevel>('newbie')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lockedLevelTooltip, setLockedLevelTooltip] =
    useState<KnowledgeLevel | null>(null)

  const isLevelLocked = (levelId: KnowledgeLevel) => {
    return levelId !== 'newbie' // Only newbie is available for new users
  }

  const handleContinue = async () => {
    if (!selectedLevel) return

    setIsLoading(true)
    setError(null)

    try {
      const selectedLevelData = levels.find((l) => l.id === selectedLevel)
      if (!selectedLevelData) return

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/set-level`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ levelSlug: selectedLevelData.slug }),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to set level')
      }

      router.push('/learning-path')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 mb-4"
          >
            <GitBranch className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-3">
            How well do you know Git?
          </h1>
          <p className="text-lg text-slate-400">
            Choose your learning path to get started
          </p>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {levels.map((level, index) => {
            const Icon = level.icon
            const isSelected = selectedLevel === level.id
            const isLocked = isLevelLocked(level.id)

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-slate-900 border-2 rounded-xl p-6 text-left transition-all ${
                  isLocked
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer hover:border-slate-600'
                } ${
                  isSelected
                    ? level.borderColor + ' shadow-lg'
                    : 'border-slate-700'
                }`}
                onClick={() => !isLocked && setSelectedLevel(level.id)}
                onMouseEnter={() => isLocked && setLockedLevelTooltip(level.id)}
                onMouseLeave={() => setLockedLevelTooltip(null)}
              >
                 {/* Premium Tooltip */}
                 <AppTooltip
                   isVisible={lockedLevelTooltip === level.id && isLocked}
                   content="Premium"
                   variant="premium"
                   position="top"
                 />

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${level.color} mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {level.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4">{level.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-slate-300 mb-4">
                  {level.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {level.features.map((feature) => {
                    return (
                      <div key={feature} className="flex items-start gap-2">
                        {feature.includes('Locked') ||
                        feature.includes('Must') ? (
                          <Lock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Check
                            className={`w-4 h-4 ${level.iconColor} mt-0.5 flex-shrink-0`}
                          />
                        )}
                        <span className="text-xs text-slate-400">
                          {feature}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleContinue}
            disabled={!selectedLevel || isLoading}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Setting up your path...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-center text-sm text-red-400 mt-4">
            {error}
          </p>
        )}

        {/* Help Text */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Higher levels unlock as you complete your current level
        </p>
      </motion.div>
    </div>
  )
}
