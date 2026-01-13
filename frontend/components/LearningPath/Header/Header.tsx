'use client'

import { Rocket, Sparkles, Zap, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUser, levelSlugToKey } from '@/hooks/Auth/useUser'
import UserProfile from './UserProfile/UserProfile'
import { LevelBadge } from './LevelBadge/LevelBadge'

interface HeaderProps {
  onShowAchievements?: () => void
  achievementsCount?: { unlocked: number; total: number }
  progressPercentage?: number
  gitLevel?: string
}

export const Header = ({
  onShowAchievements,
  achievementsCount = { unlocked: 0, total: 6 },
  progressPercentage = 0,
  gitLevel = 'beginner',
}: HeaderProps) => {
  const { user } = useUser()

  const getNextMilestone = () => {
    if (progressPercentage < 50) {
      return { level: 'I Know Things', progress: 50 }
    } else if (progressPercentage < 100) {
      return { level: 'Pro', progress: 100 }
    }
    return null
  }

  const nextMilestone = getNextMilestone()

  const levelConfig = {
    beginner: {
      icon: Sparkles,
      label: 'Beginner',
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/50',
    },
    intermediate: {
      icon: Zap,
      label: 'I Know Things',
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/50',
    },
    pro: {
      icon: Rocket,
      label: 'Pro',
      color: 'from-red-500 to-pink-500',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/50',
    },
  }

  const config = levelConfig[gitLevel as keyof typeof levelConfig] || levelConfig.beginner
  const Icon = config.icon

  const userLevelKey = levelSlugToKey(user?.level?.slug)
  const currentLevel = levelConfig[userLevelKey]

  const onLogout = () => {}

  const onChangeLevel = (level: string) => {
    // TODO: Implement level change via API
    console.log('Change level to:', level)
  }

  return (
    <header className="h-18 z-9999 fixed w-[calc(100%-20rem)] px-5 py-2 ml-80 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Git Level Badge */}
        <LevelBadge
          progressPercentage={progressPercentage}
          label={config.label}
          icon={Icon}
        />

        <div>
          {
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShowAchievements}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/50 hover:from-emerald-500/30 hover:to-blue-500/30 transition-all"
            >
              <Trophy className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-semibold">
                {achievementsCount.unlocked}/{achievementsCount.total}
              </span>
            </motion.button>
          }
        </div>

        {/* Right - User Profile */}

        <UserProfile
          user={{
            name: user?.fullName || '',
            email: user?.email || '',
            level: userLevelKey,
          }}
          onLogout={onLogout}
          onChangeLevel={onChangeLevel}
        />
      </div>
    </header>
  )
}
