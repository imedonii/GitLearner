import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Cloud, ArrowRight, ArrowLeft } from 'lucide-react'

interface Commit {
  id: string
  message: string
  author: string
}

interface TwoComputerSimulationProps {
  localCommits: Commit[]
  remoteCommits: Commit[]
  collaboratorCommits: Commit[]
  showPushAnimation?: boolean
  showPullAnimation?: boolean
}

export default function TwoComputerSimulation({
  localCommits,
  remoteCommits,
  collaboratorCommits,
  showPushAnimation = false,
  showPullAnimation = false,
}: TwoComputerSimulationProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Local Computer (Developer A) */}
      <ComputerView
        title="Your Computer"
        subtitle="Local Machine"
        icon={<Monitor className="w-6 h-6 text-blue-400" />}
        commits={localCommits}
        color="blue"
      />

      {/* Remote Repository */}
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Push Arrow */}
        <AnimatePresence>
          {showPushAnimation && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex items-center gap-2 text-emerald-400"
            >
              <span className="text-sm font-mono">git push</span>
              <motion.div
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remote Repository Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500 rounded-xl p-6 w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <Cloud className="w-8 h-8 text-orange-400" />
            <div>
              <h3 className="font-bold text-white">GitHub</h3>
              <p className="text-xs text-slate-400">Remote Repository</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-slate-400 mb-2">Commits:</div>
            <AnimatePresence mode="popLayout">
              {remoteCommits.length === 0 ? (
                <div className="text-slate-500 text-sm italic">
                  No commits yet
                </div>
              ) : (
                remoteCommits.map((commit) => (
                  <motion.div
                    key={commit.id}
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="bg-slate-900/60 rounded px-3 py-2 text-sm"
                  >
                    <div className="text-orange-400 font-mono text-xs mb-1">
                      {commit.id}
                    </div>
                    <div className="text-slate-200">{commit.message}</div>
                    <div className="text-slate-500 text-xs mt-1">
                      {commit.author}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Pull Arrow */}
        <AnimatePresence>
          {showPullAnimation && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex items-center gap-2 text-purple-400"
            >
              <motion.div
                animate={{ x: [0, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
              <span className="text-sm font-mono">git pull</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collaborator Computer (Developer B) */}
      <ComputerView
        title="Collaborator"
        subtitle="Another Developer"
        icon={<Monitor className="w-6 h-6 text-purple-400" />}
        commits={collaboratorCommits}
        color="purple"
      />
    </div>
  )
}

function ComputerView({
  title,
  subtitle,
  icon,
  commits,
  color,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  commits: Commit[]
  color: 'blue' | 'purple'
}) {
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-500/10',
    purple: 'border-purple-500 bg-purple-500/10',
  }

  const accentColor = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-2 rounded-xl p-6 ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <div>
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-slate-400 mb-2">Local Commits:</div>
        <AnimatePresence mode="popLayout">
          {commits.length === 0 ? (
            <div className="text-slate-500 text-sm italic">No commits yet</div>
          ) : (
            commits.map((commit) => (
              <motion.div
                key={commit.id}
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="bg-slate-900/60 rounded px-3 py-2 text-sm"
              >
                <div className={`font-mono text-xs mb-1 ${accentColor[color]}`}>
                  {commit.id}
                </div>
                <div className="text-slate-200">{commit.message}</div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
