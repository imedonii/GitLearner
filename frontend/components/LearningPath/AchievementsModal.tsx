import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy } from 'lucide-react'
import { AchievementBadge, Achievement } from './AchievementBadge'

interface AchievementsModalProps {
  achievements: Achievement[]
  onClose: () => void
}

export default function AchievementsModal({
  achievements,
  onClose,
}: AchievementsModalProps) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const progress = (unlockedCount / achievements.length) * 100

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-slate-900 rounded-xl border-2 border-emerald-500/30 shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-b border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/20">
                  <Trophy className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Achievements
                  </h2>
                  <p className="text-slate-400">
                    Track your Git learning progress
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Overall Progress</span>
                <span className="text-white font-semibold">
                  {unlockedCount} / {achievements.length}
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AchievementBadge achievement={achievement} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700 p-4 bg-slate-800/50">
            <p className="text-center text-sm text-slate-400">
              Keep practicing Git commands to unlock all achievements! 🚀
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
