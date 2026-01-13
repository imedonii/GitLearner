'use client'

import { Check, GitBranch, Lock, Rocket, Sparkles, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export type KnowledgeLevel = 'beginner' | 'intermediate' | 'pro'

interface KnowledgeLevelPageProps {
  onSelectLevel: (level: KnowledgeLevel) => void
}

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
    id: 'beginner',
    icon: Sparkles,
    title: 'Beginner',
    subtitle: "I'm new to Git or just starting",
    description: 'Structured learning path with step-by-step guidance',
    features: [
      'Locked learning path',
      'Must complete lessons in order',
      'Guided terminal practice',
      'Detailed explanations',
    ],
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
    borderColor: 'border-green-500/50',
    slug: 'new_here',
  },
  {
    id: 'intermediate',
    icon: Zap,
    title: 'I Know Things',
    subtitle: "I've used Git but want to improve",
    description: 'Flexible learning with all lessons unlocked',
    features: [
      'All lessons unlocked',
      'Free navigation',
      'Practice at your pace',
      'Track your progress',
    ],
    color: 'from-yellow-500 to-orange-500',
    iconColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/50',
    slug: 'i_know_things',
  },
  {
    id: 'pro',
    icon: Rocket,
    title: 'Pro',
    subtitle: 'I use Git daily',
    description: 'Full access with advanced topics and challenges',
    features: [
      'Full access to everything',
      'Advanced topics',
      'Jump to any command',
      'Challenge mode',
    ],
    color: 'from-red-500 to-pink-500',
    iconColor: 'text-red-400',
    borderColor: 'border-red-500/50',
    slug: 'pro_level',
  },
]

export const Level = () => {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<KnowledgeLevel>('beginner')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {levels.map((level, index) => {
            const Icon = level.icon
            const isSelected = selectedLevel === level.id
            const isDisabled = level.id !== 'beginner'

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-slate-900 border-2 rounded-xl p-6 text-left transition-all ${
                  isDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                } ${
                  isSelected
                    ? `${level.borderColor} shadow-lg`
                    : 'border-slate-700'
                }`}
              >
                {/* Coming Soon Badge for disabled levels */}
                {isDisabled && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded-full">
                    Coming Soon
                  </div>
                )}

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
                  {level.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      {feature.includes('Locked') ||
                      feature.includes('Must') ? (
                        <Lock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Check
                          className={`w-4 h-4 ${level.iconColor} mt-0.5 flex-shrink-0`}
                        />
                      )}
                      <span className="text-xs text-slate-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedLevel || isLoading}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all text-lg"
          >
            {isLoading ? 'Setting up...' : 'Continue'}
          </button>
        </motion.div>

        {/* Help Text */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Other levels will be available soon
        </p>
      </motion.div>
    </div>
  )
}
