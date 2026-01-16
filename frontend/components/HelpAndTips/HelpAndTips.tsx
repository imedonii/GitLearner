'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ChevronRight,
  Play,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Terminal,
  GitBranch,
  Book,
  Settings,
  Eye,
  RotateCcw,
  FileCode,
  Loader2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  useHelpAndTips,
  GitCommand,
  Tip,
} from '@/hooks/HelpAndTips/useHelpAndTips'

interface HelpAndTipsProps {
  onTryInPlayground?: (command: string) => void
}

// Icon mapping for categories
const iconMap = {
  Book,
  FileCode,
  Terminal,
  GitBranch,
  RotateCcw,
  Eye,
  Settings,
  Lightbulb,
}

export default function HelpAndTips({ onTryInPlayground }: HelpAndTipsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['commonly-used', 'tips'])
  )
  const router = useRouter()

  // Fetch data from backend
  const {
    categories,
    commands,
    tips,
    commonCommands: fetchedCommonCommands,
    isLoading,
    isError,
  } = useHelpAndTips()

  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      return (
        commands?.filter((cmd) => cmd.category.name === activeCategory) || []
      )
    }

    const query = searchQuery.toLowerCase()
    return (
      commands?.filter(
        (cmd) =>
          cmd.name.toLowerCase().includes(query) ||
          cmd.description.toLowerCase().includes(query) ||
          cmd.syntax.toLowerCase().includes(query)
      ) || []
    )
  }, [searchQuery, activeCategory, commands])

  const commonCommands = fetchedCommonCommands || []

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const getTipIcon = (type: Tip['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      case 'pro':
        return <Lightbulb className="w-5 h-5" />
      case 'do':
        return <CheckCircle2 className="w-5 h-5" />
      case 'dont':
        return <XCircle className="w-5 h-5" />
    }
  }

  const getTipStyles = (type: Tip['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
      case 'pro':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      case 'do':
        return 'bg-green-500/10 border-green-500/30 text-green-400'
      case 'dont':
        return 'bg-red-500/10 border-red-500/30 text-red-400'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-400" />
          <p className="text-slate-400">Loading help and tips...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-8 h-8 mx-auto mb-4 text-red-400" />
          <p className="text-slate-400">
            Failed to load help and tips. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Help & Tips
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Git commands, explanations, and best practices
                </p>
              </div>

              <button
                onClick={() => router.push('/learning-path')}
                className="text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-lg bg-slate-800 hover:bg-emerald-600"
              >
                {'Continue Learning ->'}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search commands (e.g. git commit, git push)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="w-64 shrink-0 sticky top-32 h-fit">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                Categories
              </h3>
              <nav className="space-y-1">
                {categories?.map((category) => {
                  const Icon =
                    iconMap[category.icon as keyof typeof iconMap] || Book
                  const isActive = activeCategory === category.name
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.name)
                        setSearchQuery('')
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.label}
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-8">
            {/* Search Results or Category Commands */}
            {searchQuery.trim() ? (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">
                  Search Results ({filteredCommands.length})
                </h2>
                {filteredCommands.length === 0 ? (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-center">
                    <Terminal className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">
                      No commands found matching &quot;{searchQuery}&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCommands.map((cmd) => (
                      <CommandBlock
                        key={cmd.id}
                        command={cmd}
                        onTryInPlayground={onTryInPlayground}
                      />
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <>
                {/* Commonly Used Commands */}
                {activeCategory === 'getting-started' && (
                  <section>
                    <button
                      onClick={() => toggleSection('commonly-used')}
                      className="w-full flex items-center justify-between mb-4 group"
                    >
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-emerald-400" />
                        Commonly Used Commands
                      </h2>
                      {expandedSections.has('commonly-used') ? (
                        <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.has('commonly-used') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 overflow-hidden"
                        >
                          {commonCommands.map((cmd) => (
                            <CommandBlock
                              key={cmd.id}
                              command={cmd}
                              onTryInPlayground={onTryInPlayground}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>
                )}

                {/* Category Commands */}
                <section>
                  <h2 className="text-xl font-bold text-white mb-4">
                    {
                      categories?.find((cat) => cat.name === activeCategory)
                        ?.label
                    }
                  </h2>
                  <div className="space-y-4">
                    {filteredCommands.map((cmd) => (
                      <CommandBlock
                        key={cmd.id}
                        command={cmd}
                        onTryInPlayground={onTryInPlayground}
                      />
                    ))}
                  </div>
                </section>

                {/* Tips & Best Practices */}
                <section>
                  <button
                    onClick={() => toggleSection('tips')}
                    className="w-full flex items-center justify-between mb-4 group"
                  >
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      Tips & Best Practices
                    </h2>
                    {expandedSections.has('tips') ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSections.has('tips') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                      >
                        {tips?.map((tip) => (
                          <div
                            key={tip.id}
                            className={`p-4 rounded-lg border ${getTipStyles(
                              tip.type
                            )} flex gap-3`}
                          >
                            <div className="shrink-0 mt-0.5">
                              {getTipIcon(tip.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                {tip.title}
                              </h3>
                              <p className="text-sm opacity-90">
                                {tip.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </>
            )}

            {/* Footer Actions */}
            <footer className="border-t border-slate-800 pt-6 mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => router.push('/learning-path')}
                  className="px-6 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Learning Path
                </button>
                {onTryInPlayground && (
                  <button
                    onClick={() => onTryInPlayground('')}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Try in Playground
                  </button>
                )}
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

interface CommandBlockProps {
  command: GitCommand
  onTryInPlayground?: (command: string) => void
}

function CommandBlock({ command, onTryInPlayground }: CommandBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
    >
      {/* Command Name */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-emerald-400 font-mono">
          {command.name}
        </h3>
        {command.isCommon && (
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded">
            Common
          </span>
        )}
      </div>

      {/* Syntax */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Syntax
        </h4>
        <div className="bg-slate-950/50 border border-slate-800 rounded p-3 overflow-x-auto">
          <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap">
            {command.syntax}
          </pre>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Description
        </h4>
        <p className="text-slate-300 text-sm leading-relaxed">
          {command.description}
        </p>
      </div>

      {/* When to Use */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          When to Use
        </h4>
        <p className="text-slate-400 text-sm leading-relaxed">
          {command.whenToUse}
        </p>
      </div>

      {/* Example */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Example
        </h4>
        <div className="bg-slate-950/50 border border-slate-800 rounded p-3 overflow-x-auto">
          <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap">
            {command.example}
          </pre>
        </div>
      </div>

      {/* Action Button */}
      {onTryInPlayground && (
        <button
          onClick={() => onTryInPlayground(command.name)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Play className="w-4 h-4" />
          Try in Playground
        </button>
      )}
    </motion.div>
  )
}
