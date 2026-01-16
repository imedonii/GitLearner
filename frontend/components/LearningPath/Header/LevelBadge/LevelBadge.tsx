import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Rocket } from 'lucide-react'
import { useState } from 'react'

type LevelBadgeType = {
  progressPercentage: number
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export const LevelBadge = ({
  progressPercentage,
  label,
  icon: Icon,
}: LevelBadgeType) => {
  const [showLevelTooltip, setShowLevelTooltip] = useState<boolean>(false)

  const getNextMilestone = () => {
    if (progressPercentage < 50) {
      return { level: 'I Know Things', progress: 50 }
    } else if (progressPercentage < 100) {
      return { level: 'Pro', progress: 100 }
    }
    return null
  }

  const nextMilestone = getNextMilestone()

  return (
    <div className="relative">
      <motion.button
        onMouseEnter={() => setShowLevelTooltip(true)}
        onMouseLeave={() => setShowLevelTooltip(false)}
        whileHover={{ scale: 1.05 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-green-500/50 bg-green-500/10 transition-all`}
      >
        <Icon className="w-5 h-5 text-green-400" />
        <span className="font-semibold text-white">{label}</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showLevelTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4 z-50"
          >
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-semibold text-green-400">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className="h-full bg-gradient-to-r text-green-400"
                  />
                </div>
              </div>

              {nextMilestone && (
                <div className="text-xs text-slate-400">
                  <span className="text-white font-medium">
                    {nextMilestone.progress - progressPercentage}%
                  </span>{' '}
                  to reach{' '}
                  <span className="text-white font-medium">
                    {nextMilestone.level}
                  </span>
                </div>
              )}

              {!nextMilestone && (
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <Rocket className="w-3 h-3" />
                  You&apos;ve mastered Git!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
