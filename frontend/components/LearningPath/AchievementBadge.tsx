import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Zap, Award, Target, Rocket } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: 'trophy' | 'star' | 'zap' | 'award' | 'target' | 'rocket'
  unlocked: boolean
}

interface AchievementBadgeProps {
  achievement: Achievement
  onUnlock?: (id: string) => void
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  award: Award,
  target: Target,
  rocket: Rocket,
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const Icon = iconMap[achievement.icon]

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        achievement.unlocked
          ? 'bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border-emerald-500/50'
          : 'bg-slate-800/30 border-slate-700 opacity-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-lg ${
            achievement.unlocked ? 'bg-emerald-500/20' : 'bg-slate-700/50'
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              achievement.unlocked ? 'text-emerald-400' : 'text-slate-500'
            }`}
          />
        </div>
        <div className="flex-1">
          <h4
            className={`font-semibold ${
              achievement.unlocked ? 'text-white' : 'text-slate-500'
            }`}
          >
            {achievement.title}
          </h4>
          <p className="text-sm text-slate-400 mt-1">
            {achievement.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function AchievementToast({
  achievement,
}: {
  achievement: Achievement
}) {
  const [visible, setVisible] = useState(true)
  const Icon = iconMap[achievement.icon]

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-br from-emerald-500/90 to-blue-500/90 backdrop-blur-lg rounded-lg shadow-2xl p-4 max-w-sm border-2 border-emerald-400"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="bg-white/20 p-3 rounded-full"
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <div className="text-sm text-white/80 font-medium">
                Achievement Unlocked!
              </div>
              <div className="text-white font-bold">{achievement.title}</div>
              <div className="text-sm text-white/70 mt-1">
                {achievement.description}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const achievements: Achievement[] = [
  {
    id: 'first-init',
    title: 'Getting Started',
    description: 'Initialize your first Git repository',
    icon: 'rocket',
    unlocked: false,
  },
  {
    id: 'first-commit',
    title: 'First Snapshot',
    description: 'Create your first commit',
    icon: 'trophy',
    unlocked: false,
  },
  {
    id: 'five-commits',
    title: 'Committed Developer',
    description: 'Make 5 commits',
    icon: 'star',
    unlocked: false,
  },
  {
    id: 'branch-master',
    title: 'Branch Master',
    description: 'Create and switch to a new branch',
    icon: 'target',
    unlocked: false,
  },
  {
    id: 'first-push',
    title: 'Going Remote',
    description: 'Push your code to a remote repository',
    icon: 'zap',
    unlocked: false,
  },
  {
    id: 'complete-all',
    title: 'Git Expert',
    description: 'Complete all 14 lessons',
    icon: 'award',
    unlocked: false,
  },
]
