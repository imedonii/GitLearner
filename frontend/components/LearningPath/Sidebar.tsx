import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  GitBranch,
  Home,
  BookOpen,
  Code,
  Zap,
  HelpCircle,
  Lock,
  Play,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/UI'
import { useState } from 'react'
import HelpDialog from './HelpDialog'
import { KnowledgeLevel } from './KnowledgeLevelPage'
import { LessonLevel } from '@/utils/lessons'

export interface LessonItem {
  id: string
  title: string
  completed: boolean
  locked?: boolean
  level: LessonLevel
  description?: string
}

interface SidebarProps {
  lessons: LessonItem[]
  currentLessonId: string
  onLessonSelect: (id: string) => void
  onGoHome: () => void
  onPlayground: () => void
  onCheatSheet: () => void
  userLevel?: KnowledgeLevel
}

interface LessonGroup {
  level: LessonLevel
  name: string
  color: string
  bgColor: string
  borderColor: string
  emoji: string
  lessons: LessonItem[]
}

export default function Sidebar({
  lessons,
  currentLessonId,
  onLessonSelect,
  onGoHome,
  onPlayground,
  onCheatSheet,
  userLevel,
}: SidebarProps) {
  const [showHelp, setShowHelp] = useState(false)
  const [expandedLevels, setExpandedLevels] = useState<Set<LessonLevel>>(
    new Set(['beginner', 'mid', 'pro'])
  )

  // Group lessons by level
  const groupedLessons: LessonGroup[] = [
    {
      level: 'beginner',
      name: 'Beginner',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      emoji: '🟢',
      lessons: lessons.filter((l) => l.level === 'beginner'),
    },
    {
      level: 'mid',
      name: 'I Know Things',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      emoji: '🟡',
      lessons: lessons.filter((l) => l.level === 'mid'),
    },
    {
      level: 'pro',
      name: 'Pro',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      emoji: '🔴',
      lessons: lessons.filter((l) => l.level === 'pro'),
    },
  ]

  const toggleLevel = (level: LessonLevel) => {
    setExpandedLevels((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(level)) {
        newSet.delete(level)
      } else {
        newSet.add(level)
      }
      return newSet
    })
  }

  const totalCompleted = lessons.filter((l) => l.completed).length
  const totalProgress = (totalCompleted / lessons.length) * 100

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col h-screen fixed left-0 top-0">
      {/* Header - Fixed at top */}
      <div className="p-6 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <GitBranch className="w-8 h-8 text-emerald-400" />
          <h1 className="text-2xl font-bold text-white">Git Learner</h1>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-emerald-400 font-semibold">
              {totalCompleted}/{lessons.length}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-gradient-to-r from-emerald-400 to-blue-500 h-full"
            />
          </div>
        </div>
      </div>

      {/* Quick Navigation - Fixed */}
      <div className="p-4 border-b border-slate-700 space-y-2 flex-shrink-0">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
          onClick={onGoHome}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
          onClick={onPlayground}
        >
          <Code className="w-4 h-4 mr-2" />
          Playground Mode
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
          onClick={onCheatSheet}
        >
          <Zap className="w-4 h-4 mr-2" />
          Cheat Sheet
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
          onClick={() => setShowHelp(true)}
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Help & Tips
        </Button>
      </div>

      {/* Lessons List - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <h2 className="font-semibold text-white">Learning Path</h2>
        </div>

        <div className="space-y-3">
          {groupedLessons.map((group) => {
            const isExpanded = expandedLevels.has(group.level)
            const completedInLevel = group.lessons.filter(
              (l) => l.completed
            ).length
            const progressInLevel =
              (completedInLevel / group.lessons.length) * 100

            return (
              <div key={group.level} className="space-y-2">
                {/* Level Header */}
                <button
                  onClick={() => toggleLevel(group.level)}
                  className={`w-full p-3 rounded-lg ${group.bgColor} ${group.borderColor} border hover:opacity-80 transition-opacity`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-lg">{group.emoji}</span>
                      <span className={`font-semibold ${group.color}`}>
                        {group.name}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {completedInLevel}/{group.lessons.length}
                    </span>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressInLevel}%` }}
                      transition={{ duration: 0.3 }}
                      className={`h-full ${
                        group.level === 'beginner'
                          ? 'bg-emerald-400'
                          : group.level === 'mid'
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                      }`}
                    />
                  </div>
                </button>

                {/* Lessons in Level */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1 pl-2"
                    >
                      {group.lessons.map((lesson, index) => {
                        const isLocked =
                          lesson.locked && userLevel === 'beginner'
                        const isCurrent = currentLessonId === lesson.id

                        // Get level badge emoji
                        const levelEmoji = group.emoji

                        return (
                          <motion.button
                            key={lesson.id}
                            onClick={() =>
                              !isLocked && onLessonSelect(lesson.id)
                            }
                            whileHover={!isLocked ? { x: 4 } : {}}
                            disabled={isLocked}
                            title={
                              isLocked
                                ? 'Complete previous lessons to unlock'
                                : lesson.description || undefined
                            }
                            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                              isCurrent
                                ? 'bg-emerald-500/20 border border-emerald-500/50 text-white'
                                : isLocked
                                ? 'text-slate-600 opacity-50 cursor-not-allowed'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {isLocked ? (
                                <Lock className="w-5 h-5 text-slate-600" />
                              ) : lesson.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                              ) : isCurrent ? (
                                <Play className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-xs">{levelEmoji}</span>
                                <span className="text-xs text-slate-500">
                                  Lesson{' '}
                                  {lessons.findIndex(
                                    (l) => l.id === lesson.id
                                  ) + 1}
                                </span>
                              </div>
                              <div className="text-sm font-medium">
                                {lesson.title}
                              </div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </div>
  )
}
