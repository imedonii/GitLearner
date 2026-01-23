'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  Terminal,
  AlertCircle,
  Info,
  GitBranch,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  useCheatSheet,
  CheatSheetSection as CheatSheetSectionType,
  CheatSheetCommand,
} from '@/hooks/Content/useContent'
import gitDocs from './gitDocs' // Fallback data
import { COLORS } from '@/constants'

interface LocalCommandBlock {
  command: string
  syntax: string
  description: string
  example: string
  notes?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

interface LocalSection {
  id: string
  title: string
  commands: LocalCommandBlock[]
}

export const CheatSheet = () => {
  const router = useRouter()
  const { data: apiSections, isLoading, isError } = useCheatSheet()

  // Convert API data to local format or use fallback
  const sections: LocalSection[] = useMemo(() => {
    if (apiSections && apiSections.length > 0) {
      return apiSections.map((section) => ({
        id: section.slug,
        title: section.title,
        commands: section.commands.map((cmd) => ({
          command: cmd.command,
          syntax: cmd.syntax,
          description: cmd.description,
          example: cmd.example,
          notes: cmd.notes,
          difficulty: cmd.difficulty,
        })),
      }))
    }
    return gitDocs
  }, [apiSections])

  const [selectedSection, setSelectedSection] = useState(sections[0]?.id || 'basics')
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const onLearningPath = () => {
    router.push('/learning-path')
  }

  const currentSection =
    sections.find((s) => s.id === selectedSection) || sections[0]

  const filteredCommands = useMemo(() => {
    if (!currentSection) return []
    return currentSection.commands.filter((cmd) => {
      const matchesSearch =
        cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDifficulty =
        !difficultyFilter || cmd.difficulty === difficultyFilter
      return matchesSearch && matchesDifficulty
    })
  }, [currentSection, searchQuery, difficultyFilter])

  const handleCopy = (text: string, commandName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandName)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-400" />
          <p className="text-slate-400">Loading cheat sheet...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-center gap-4 p-4 cursor-pointer"
        onClick={() => router.push('/')}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500"
        >
          <GitBranch className="w-6 h-6 text-white" />
        </motion.div>

        <h1 className="text-xl font-bold text-white">Git Learner</h1>
      </div>

      <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">
              Git Documentation & Cheat Sheet
            </h1>
          </div>
          <div>
            <button
              onClick={onLearningPath}
              className="text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-lg bg-slate-800 hover:bg-emerald-600"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-900/50 border-b border-slate-700 px-6 py-4 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            <FilterButton
              active={difficultyFilter === null}
              onClick={() => setDifficultyFilter(null)}
              label="All"
            />
            <FilterButton
              active={difficultyFilter === 'beginner'}
              onClick={() => setDifficultyFilter('beginner')}
              label="Beginner"
              color="green"
            />
            <FilterButton
              active={difficultyFilter === 'intermediate'}
              onClick={() => setDifficultyFilter('intermediate')}
              label="Intermediate"
              color="yellow"
            />
            <FilterButton
              active={difficultyFilter === 'advanced'}
              onClick={() => setDifficultyFilter('advanced')}
              label="Advanced"
              color="red"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Navigation */}
        <nav className="w-64 bg-slate-900 border-r border-slate-700 p-4 overflow-y-auto">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Sections
          </h2>
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  selectedSection === section.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{section.title}</span>
                {selectedSection === section.id && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Right Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {currentSection?.title}
            </h2>

            <div className="space-y-6">
              {filteredCommands.map((cmd) => (
                <CommandCard
                  key={cmd.command}
                  command={cmd}
                  onCopy={handleCopy}
                  isCopied={copiedCommand === cmd.command}
                />
              ))}

              {filteredCommands.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No commands found matching your search.
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean
  onClick: () => void
  label: string
  color?: string
}) {
  const colorStyles = COLORS.difficulty

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border transition-all ${
        active
          ? color === 'green'
            ? `${colorStyles.beginner.bg} ${colorStyles.beginner.border} ${colorStyles.beginner.text}`
            : color === 'yellow'
            ? `${colorStyles.intermediate.bg} ${colorStyles.intermediate.border} ${colorStyles.intermediate.text}`
            : color === 'red'
            ? `${colorStyles.advanced.bg} ${colorStyles.advanced.border} ${colorStyles.advanced.text}`
            : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
          : 'border-slate-700 text-slate-400 hover:bg-slate-800'
      }`}
    >
      {label}
    </button>
  )
}

function CommandCard({
  command,
  onCopy,
  isCopied,
}: {
  command: LocalCommandBlock
  onCopy: (text: string, name: string) => void
  isCopied: boolean
}) {
  const difficultyColors = COLORS.difficulty

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white font-mono">
              {command.command}
            </h3>
            {command.difficulty && (
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${
                  difficultyColors[command.difficulty].bg
                } ${difficultyColors[command.difficulty].border} ${
                  difficultyColors[command.difficulty].text
                }`}
              >
                {command.difficulty}
              </span>
            )}
          </div>
          <p className="text-slate-400">{command.description}</p>
        </div>
      </div>

      {/* Syntax */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
          Syntax
        </label>
        <div className="relative">
          <pre className="bg-slate-950 border border-slate-700 rounded-lg p-4 text-emerald-400 font-mono text-sm overflow-x-auto">
            {command.syntax}
          </pre>
          <button
            onClick={() => onCopy(command.syntax, command.command)}
            className="absolute top-2 right-2 p-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4 text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="w-4 h-4 text-slate-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Example */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
          Example
        </label>
        <pre className="bg-slate-950 border border-slate-700 rounded-lg p-4 text-blue-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
          {command.example}
        </pre>
      </div>

      {/* Notes */}
      {command.notes && (
        <div className="flex items-start gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
          {command.notes.includes('DANGEROUS') ? (
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          )}
          <p className="text-sm text-slate-300">{command.notes}</p>
        </div>
      )}
    </motion.div>
  )
}
