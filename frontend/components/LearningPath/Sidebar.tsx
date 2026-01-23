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
import AppTooltip from '@/components/UI/AppTooltip'
import { useState, useMemo } from 'react'
import { useLevelsWithStyling, LevelWithStyling } from '@/hooks/Content/useContent'
import { levelSlugToKey } from '@/hooks/Auth/useUser'

export interface LessonItem {
  id: string
  title: string
  completed: boolean
  locked?: boolean
  level: string // level slug
  description?: string
  category?: string | null
  order: number
  isPaid?: boolean
}

interface SidebarProps {
  lessons: LessonItem[]
  currentLessonId: string
  onLessonSelect: (id: string) => void
  onGoHome: () => void
  onPlayground: () => void
  onCheatSheet: () => void
  onHelpAndTips: () => void
  userLevel?: string
  subscribed?: boolean
}

interface LessonGroup {
  level: string // slug
  name: string
  color: string
  bgColor: string
  borderColor: string
  emoji: string
  isPaid: boolean
  lessons: LessonItem[]
}

// Fallback level configs
const defaultLevelConfigs: Record<
  string,
  {
    name: string
    color: string
    bgColor: string
    borderColor: string
    emoji: string
  }
> = {
  newbie: {
    name: 'Newbie',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    emoji: '🔵',
  },
  beginner: {
    name: 'Beginner',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    emoji: '🟢',
  },
  mid: {
    name: 'I Know Things',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    emoji: '🟡',
  },
  pro: {
    name: 'Pro',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    emoji: '🔴',
  },
}

// Progress bar color mapping
const progressBarColors: Record<string, string> = {
  newbie: 'bg-blue-400',
  beginner: 'bg-emerald-400',
  mid: 'bg-yellow-400',
  pro: 'bg-red-400',
}

export default function Sidebar({
  lessons,
  currentLessonId,
  onLessonSelect,
  onGoHome,
  onPlayground,
  onCheatSheet,
  onHelpAndTips,
  userLevel,
  subscribed = false,
}: SidebarProps) {
  const { data: apiLevels } = useLevelsWithStyling()

  // Build level configs from API or use fallback
  const levelConfigs = useMemo(() => {
    if (!apiLevels || apiLevels.length === 0) {
      return defaultLevelConfigs
    }

    const configs: Record<string, typeof defaultLevelConfigs[string]> = {}
    apiLevels.forEach((level) => {
      configs[level.slug] = {
        name: level.name,
        color: level.color || defaultLevelConfigs[level.slug]?.color || 'text-gray-400',
        bgColor: level.bgColor || defaultLevelConfigs[level.slug]?.bgColor || 'bg-gray-500/10',
        borderColor: level.borderColor || defaultLevelConfigs[level.slug]?.borderColor || 'border-gray-500/30',
        emoji: level.emoji || defaultLevelConfigs[level.slug]?.emoji || '❓',
      }
    })
    return configs
  }, [apiLevels])

  // Determine level order from API or use default
  const levelOrder = useMemo(() => {
    if (apiLevels && apiLevels.length > 0) {
      return [...apiLevels].sort((a, b) => a.order - b.order).map((l) => l.slug)
    }
    return ['newbie', 'beginner', 'mid', 'pro']
  }, [apiLevels])

  // Build grouped lessons dynamically for all levels
  const groupedLessons: LessonGroup[] = useMemo(() => {
    return levelOrder
      .map((slug) => {
        const apiLevel = apiLevels?.find((l) => l.slug === slug)
        const config = levelConfigs[slug] || {
          name: slug,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          emoji: '❓',
        }
        const levelLessons = lessons
          .filter((l) => l.level === slug)
          .sort((a, b) => a.order - b.order)

        return {
          level: slug,
          name: config.name,
          color: config.color,
          bgColor: config.bgColor,
          borderColor: config.borderColor,
          emoji: config.emoji,
          isPaid: apiLevel?.isPaid ?? (slug === 'mid' || slug === 'pro'), // fallback to hardcoded
          lessons: levelLessons,
        }
      })
      .filter((group) => group.lessons.length > 0)
  }, [levelOrder, levelConfigs, lessons, apiLevels])

  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(
    new Set(userLevel ? [userLevel] : [])
  )
  const [premiumTooltip, setPremiumTooltip] = useState<string | null>(null)
  const [lessonTooltip, setLessonTooltip] = useState<string | null>(null)

  // Check if a lesson is premium locked (isPaid and user not subscribed)
  const isLessonPremiumLocked = (lesson: LessonItem) => {
    return !subscribed && lesson.isPaid === true
  }

  // Check if a level is premium (based on level's isPaid from API)
  const isLevelPremium = (group: LessonGroup) => {
    return !subscribed && group.isPaid
  }

  // Helper to check if level is premium by slug (for backward compat)
  const isLevelPremiumBySlug = (levelSlug: string) => {
    const group = groupedLessons.find((g) => g.level === levelSlug)
    return group ? isLevelPremium(group) : false
  }

  const toggleLevel = (level: string) => {
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
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          onClick={onGoHome}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          onClick={onPlayground}
        >
          <Code className="w-4 h-4 mr-2" />
          Playground Mode
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          onClick={onCheatSheet}
        >
          <Zap className="w-4 h-4 mr-2" />
          Cheat Sheet
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          onClick={onHelpAndTips}
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
              group.lessons.length > 0
                ? (completedInLevel / group.lessons.length) * 100
                : 0

            return (
              <div key={group.level} className="space-y-2">
                {/* Level Header */}
                <div
                  className="relative"
                  onMouseEnter={() =>
                    isLevelPremium(group) &&
                    setPremiumTooltip(group.level)
                  }
                  onMouseLeave={() => setPremiumTooltip(null)}
                >
                  <button
                    onClick={() => toggleLevel(group.level)}
                    className={`w-full p-3 rounded-lg ${group.bgColor} ${
                      group.borderColor
                    } border hover:opacity-80 transition-opacity`}
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
                        {/* Show lock icon for premium levels */}
                        {isLevelPremium(group) && (
                          <Lock className="w-4 h-4 text-yellow-400" />
                        )}
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
                          progressBarColors[group.level] || 'bg-gray-400'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Premium Tooltip */}
                  <AppTooltip
                    isVisible={
                      premiumTooltip === group.level &&
                      isLevelPremium(group)
                    }
                    content="Premium"
                    variant="premium"
                    position="top"
                  />
                </div>

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
                      {group.lessons.map((lesson) => {
                        // Backend now handles all lock logic including premium
                        // lesson.locked is true if: isPaid && !subscribed, OR previous lesson not completed
                        const isLocked = lesson.locked ?? false
                        const isCurrent = currentLessonId === lesson.id

                        // Get level badge emoji
                        const levelEmoji = group.emoji
                        // Check if this specific lesson is premium locked
                        const isPremiumLocked = isLessonPremiumLocked(lesson)

                        return (
                          <div key={lesson.id} className="relative">
                            <motion.button
                              onClick={() =>
                                !isLocked && onLessonSelect(lesson.id)
                              }
                              whileHover={!isLocked ? { x: 4 } : {}}
                              disabled={isLocked}
                              onMouseEnter={() =>
                                isLocked && setLessonTooltip(lesson.id)
                              }
                              onMouseLeave={() => setLessonTooltip(null)}
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
                                    {group.lessons.findIndex(
                                      (l) => l.id === lesson.id
                                    ) + 1}
                                  </span>
                                </div>
                                <div className="text-sm font-medium">
                                  {lesson.title}
                                </div>
                              </div>
                            </motion.button>

                            {/* Premium or Locked Tooltip */}
                            <AppTooltip
                              isVisible={
                                lessonTooltip === lesson.id && isLocked
                              }
                              content={
                                isPremiumLocked
                                  ? 'Premium'
                                  : 'Complete previous lessons'
                              }
                              variant={isPremiumLocked ? 'premium' : 'locked'}
                              position="top"
                            />
                          </div>
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
    </div>
  )
}
