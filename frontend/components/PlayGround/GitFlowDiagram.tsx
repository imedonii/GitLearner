import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Folder, Database, Cloud } from 'lucide-react'

interface GitFile {
  name: string
  id: string
}

interface GitFlowDiagramProps {
  workingFiles: GitFile[]
  stagedFiles: GitFile[]
  committedFiles: GitFile[]
  remotePushed: boolean
  showRemote?: boolean
}

export default function GitFlowDiagram({
  workingFiles,
  stagedFiles,
  committedFiles,
  remotePushed,
  showRemote = true,
}: GitFlowDiagramProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Working Directory */}
      <GitStage
        title="Working Directory"
        icon={<Folder className="w-5 h-5" />}
        files={workingFiles}
        color="blue"
        description="Modified files"
      />

      {/* Arrow */}
      <Arrow label="git add" />

      {/* Staging Area */}
      <GitStage
        title="Staging Area"
        icon={<FileText className="w-5 h-5" />}
        files={stagedFiles}
        color="purple"
        description="Ready to commit"
      />

      {/* Arrow */}
      <Arrow label="git commit" />

      {/* Local Repository */}
      <GitStage
        title="Local Repository"
        icon={<Database className="w-5 h-5" />}
        files={committedFiles}
        color="emerald"
        description="Committed snapshots"
      />

      {showRemote && (
        <>
          {/* Arrow */}
          <Arrow label="git push" />

          {/* Remote Repository */}
          <GitStage
            title="Remote (GitHub)"
            icon={<Cloud className="w-5 h-5" />}
            files={remotePushed ? committedFiles : []}
            color="orange"
            description="Shared repository"
          />
        </>
      )}
    </div>
  )
}

function GitStage({
  title,
  icon,
  files,
  color,
  description,
}: {
  title: string
  icon: React.ReactNode
  files: GitFile[]
  color: 'blue' | 'purple' | 'emerald' | 'orange'
  description: string
}) {
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-500/10',
    purple: 'border-purple-500 bg-purple-500/10',
    emerald: 'border-emerald-500 bg-emerald-500/10',
    orange: 'border-orange-500 bg-orange-500/10',
  }

  const iconColorClasses = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    orange: 'text-orange-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border-2 rounded-lg p-3 ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={iconColorClasses[color]}>{icon}</div>
        <div>
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {files.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-slate-500 text-xs italic"
            >
              Empty
            </motion.div>
          ) : (
            files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-slate-800/60 rounded px-2 py-1.5 text-xs text-slate-200 flex items-center gap-2"
              >
                <FileText className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span className="truncate">{file.name}</span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-1">
      <div className="text-center">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-emerald-400 text-xl"
        >
          ↓
        </motion.div>
        <span className="text-xs text-slate-500 font-mono">{label}</span>
      </div>
    </div>
  )
}
