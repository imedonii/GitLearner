'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AchievementToast,
  achievements as initialAchievements,
  Achievement,
} from './AchievementBadge'
import AchievementsModal from './AchievementsModal'
import { StatBox } from './StatBox'
import GitFlowDiagram from './GitFlowDiagram'
import TwoComputerSimulation from './TwoComputerSimulation'
import Terminal from './Terminal'
import LessonPanel from './LessonPanel'
import { executeGitCommand, GitState, initialGitState } from '@/utils'
import { useLessons } from '@/hooks/Lessons/useLessons'
import Sidebar from './Sidebar'
import type { KnowledgeLevel } from './KnowledgeLevelPage'
import { useUser, levelSlugToKey } from '@/hooks/Auth/useUser'
import { useRouter } from 'next/navigation'

export const LearningPath = () => {
  const { user } = useUser()
  const router = useRouter()
  const { lessons, isLoading, isError, updateLesson, isUpdating } = useLessons()
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)
  const [gitState, setGitState] = useState<GitState>(initialGitState)
  const [showPushAnimation, setShowPushAnimation] = useState(false)
  const [showPullAnimation, setShowPullAnimation] = useState(false)
  const [newlyUnlockedAchievement, setNewlyUnlockedAchievement] =
    useState<Achievement | null>(null)
  const [showAchievements, setShowAchievements] = useState(false)
  const [totalCommits, setTotalCommits] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  )
  const [achievements, setAchievements] = useState(initialAchievements)

  const onPlayground = () => {
    router.push('/playground')
  }

  const onCheatSheet = () => {
    router.push('/cheatsheet')
  }

  const onGoHome = () => {
    router.push('/')
  }

  // Set current lesson ID on initial load or when lessons change
  useEffect(() => {
    if (lessons && lessons.length > 0 && !currentLessonId) {
      setCurrentLessonId(lessons[0].id)
    }
  }, [lessons, currentLessonId])

  // Check for completing all lessons
  useEffect(() => {
    if (
      lessons &&
      completedLessons.size === lessons.length &&
      lessons.length > 0
    ) {
      unlockAchievement('complete-all')
    }
  }, [completedLessons, lessons])

  const currentLesson =
    lessons && currentLessonId
      ? lessons.find((l) => l.id === currentLessonId) || null
      : null

  // Map backend lessons to sidebar items (simple, DB-driven)
  const lessonItems = (lessons ?? []).map((lesson) => {
    const isCompleted = completedLessons.has(lesson.id)
    // TEMP: treat all as beginner until you wire real Level info
    const level: 'beginner' | 'mid' | 'pro' = 'beginner'

    return {
      id: lesson.id,
      title: lesson.title,
      completed: isCompleted,
      locked: false,
      level,
      description: lesson.description,
    }
  })

  const handleCommand = (command: string) => {
    const result = executeGitCommand(command, gitState)

    if (result.newState) {
      setGitState(result.newState)

      // Trigger animations for push/pull
      if (command.includes('push')) {
        setShowPushAnimation(true)
        setTimeout(() => setShowPushAnimation(false), 2000)
      }
      if (command.includes('pull')) {
        setShowPullAnimation(true)
        setTimeout(() => setShowPullAnimation(false), 2000)
      }

      // Auto-complete certain lessons based on actions
      if (result.type === 'success') {
        autoCompleteLesson(command)
        checkAchievements(command, result.newState)
      }
    }

    return result
  }

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements?.find((a) => a.id === achievementId)
    if (achievement && !achievement.unlocked) {
      const updatedAchievements = achievements?.map((a) =>
        a.id === achievementId ? { ...a, unlocked: true } : a
      )
      setAchievements?.(updatedAchievements || [])
      setNewlyUnlockedAchievement({ ...achievement, unlocked: true })

      // Clear the toast after animation
      setTimeout(() => {
        setNewlyUnlockedAchievement(null)
      }, 5000)
    }
  }

  const checkAchievements = (command: string, newState: GitState) => {
    // First Init
    if (command === 'git init' && newState.initialized) {
      unlockAchievement('first-init')
    }

    // First Commit
    if (command.startsWith('git commit') && newState.commits.length === 1) {
      unlockAchievement('first-commit')
    }

    // Five Commits
    if (command.startsWith('git commit')) {
      const newTotal = totalCommits + 1
      setTotalCommits(newTotal)
      if (newTotal >= 5) {
        unlockAchievement('five-commits')
      }
    }

    // Branch Master
    if (
      command.startsWith('git checkout -b') ||
      (command.startsWith('git branch ') && newState.branches.length > 1)
    ) {
      unlockAchievement('branch-master')
    }

    // First Push
    if (command.startsWith('git push') && newState.remotePushed) {
      unlockAchievement('first-push')
    }
  }

  const autoCompleteLesson = (command: string) => {
    if (!lessons || !currentLessonId) return

    const lessonCompletionMap: Record<string, string> = {
      'git init': 'init',
      'git status': 'status',
      'git add': 'add',
      'git commit': 'commit',
      'git log': 'log',
      'git branch': 'branch',
      'git checkout': 'checkout',
      'git push': 'push',
      'git pull': 'pull',
      'git clone': 'clone',
    }

    const activeLesson = lessons.find((l) => l.id === currentLessonId)

    for (const [cmd, slug] of Object.entries(lessonCompletionMap)) {
      if (command.startsWith(cmd) && activeLesson?.slug === slug) {
        handleCompleteLesson()
        break
      }
    }
  }

  const handleCompleteLesson = () => {
    if (!currentLessonId) return

    setCompletedLessons((prev) => {
      const newCompleted = new Set(prev)
      newCompleted.add(currentLessonId)
      return newCompleted
    })

    // toast.success('Lesson completed! ')

    // Auto-advance to next lesson after 1.5 seconds
    setTimeout(() => {
      if (!currentLessonId || !lessons || lessons.length === 0) return

      const currentIndex = lessons.findIndex((l) => l.id === currentLessonId)
      if (currentIndex < lessons.length - 1) {
        setCurrentLessonId(lessons[currentIndex + 1].id)
      }
    }, 1500)
  }

  const handleLessonSelect = (id: string) => {
    setCurrentLessonId(id)
    // Reset git state when changing lessons
    setGitState(initialGitState)
  }

  // Show different visualizations based on lesson slug
  const showTwoComputer = ['push', 'pull', 'clone'].includes(
    currentLesson?.slug ?? ''
  )

  const unlockedCount = achievements?.filter((a) => a.unlocked).length || 0

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading lessons...
      </div>
    )
  if (isError)
    return <div className="text-red-500 p-4">Error loading lessons</div>
  if (!lessons || lessons.length === 0)
    return <div className="p-4">No lessons available</div>

  if (currentLessonId && !currentLesson) {
    return <div className="p-4">Lesson not found</div>
  }

  return (
    <div className="flex-1 bg-slate-950 pt-20">
      {/* Achievement Toast */}
      {newlyUnlockedAchievement && (
        <AchievementToast achievement={newlyUnlockedAchievement} />
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <AchievementsModal
          achievements={achievements || []}
          onClose={() => setShowAchievements(false)}
        />
      )}

      <Sidebar
        lessons={lessonItems}
        currentLessonId={currentLessonId ?? lessonItems[0]?.id}
        onLessonSelect={handleLessonSelect}
        onGoHome={onGoHome}
        onPlayground={onPlayground}
        onCheatSheet={onCheatSheet}
        userLevel={levelSlugToKey(user?.level?.slug)}
      />

      {/* Main Content Area - with margin for fixed sidebar, entire page scrollable */}
      <div className="flex-1 ml-80 overflow-y-auto">
        <div className="min-h-screen flex flex-col">
          {/* Lesson Panel */}
          <div className="p-4 border-b border-slate-700 bg-slate-900">
            <LessonPanel
              showCompleteButton={true}
              lesson={currentLesson ?? undefined}
              onComplete={handleCompleteLesson}
              updateLesson={updateLesson}
              isUpdating={isUpdating}
              isLoading={isLoading}
              isError={isError}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Terminal */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <Terminal
                  onCommand={handleCommand}
                  currentPath={gitState.initialized ? '~/my-project' : '~'}
                />
              </motion.div>

              {/* Right: Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4"
              >
                {showTwoComputer ? (
                  <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
                    <h2 className="text-lg font-bold mb-4 text-emerald-400">
                      Remote Collaboration
                    </h2>
                    <TwoComputerSimulation
                      localCommits={gitState.commits}
                      remoteCommits={
                        gitState.remotePushed ? gitState.commits : []
                      }
                      collaboratorCommits={[]}
                      showPushAnimation={showPushAnimation}
                      showPullAnimation={showPullAnimation}
                    />
                  </div>
                ) : (
                  <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
                    <h2 className="text-lg font-bold mb-4 text-emerald-400">
                      Git Flow Visualization
                    </h2>
                    <GitFlowDiagram
                      workingFiles={gitState.workingDirectory}
                      stagedFiles={gitState.stagingArea}
                      committedFiles={
                        gitState.commits.length > 0
                          ? [
                              {
                                id: 'commits',
                                name: `${gitState.commits.length} commit(s)`,
                              },
                            ]
                          : []
                      }
                      remotePushed={gitState.remotePushed}
                      showRemote={false}
                    />
                  </div>
                )}

                {/* Quick Stats */}
                <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
                  <h3 className="text-sm font-semibold text-slate-400 mb-3">
                    Repository Status
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <StatBox
                      label="Branch"
                      value={gitState.currentBranch}
                      color="blue"
                    />
                    <StatBox
                      label="Commits"
                      value={gitState.commits.length.toString()}
                      color="emerald"
                    />
                    <StatBox
                      label="Staged"
                      value={gitState.stagingArea.length.toString()}
                      color="purple"
                    />
                    <StatBox
                      label="Modified"
                      value={gitState.workingDirectory.length.toString()}
                      color="orange"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
