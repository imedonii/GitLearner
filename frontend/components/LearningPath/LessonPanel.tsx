import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Target,
  Code,
  Rocket,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/UI'
import { Lesson as ApiLesson } from '@/hooks/Lessons/useLessons'
import { useState, useEffect } from 'react'

// Extend API lesson type with optional UI-only fields
type Lesson = ApiLesson & {
  content?: string
  completed?: boolean
  practiceTask?: string
}

interface LessonPanelProps {
  lesson?: Lesson
  onComplete?: () => void
  className?: string
  isLoading: boolean
  isError: boolean
  updateLesson: (id: string, data: Partial<ApiLesson>) => Promise<ApiLesson>
  isUpdating: boolean
  level: string
}

export default function LessonPanel({
  lesson: initialLesson,
  onComplete,
  className = '',
  isLoading,
  isError: error,
  updateLesson,
  isUpdating,
  level,
}: LessonPanelProps) {
  const [lesson, setLesson] = useState<Lesson | null>(initialLesson || null)
  const [isCompleting, setIsCompleting] = useState(false)

  // Update lesson when fetchedLesson changes or when initialLesson changes
  useEffect(() => {
    if (initialLesson) {
      setLesson(initialLesson)
    }
  }, [initialLesson])

  const handleComplete = async () => {
    if (!lesson || !onComplete) return

    try {
      setIsCompleting(true)
      await updateLesson(lesson.id, { completed: true })
      onComplete()
    } catch (err) {
      console.error('Error completing lesson:', err)
    } finally {
      setIsCompleting(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 p-6 ${className}`}
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div
        className={`bg-red-900/10 border border-red-500/30 rounded-lg p-6 ${className}`}
      >
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>Error loading lesson: {error}</span>
        </div>
      </div>
    )
  }

  // No lesson found
  if (!lesson) {
    return (
      <div
        className={`bg-slate-900/50 border border-slate-700 rounded-lg p-6 ${className}`}
      >
        <div className="text-center py-8 text-slate-400">
          <p>No lesson selected</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 p-6 shadow-lg ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {lesson.title}
              </h2>
              <p className="text-slate-300">{lesson.description}</p>
            </div>
          </div>

          {/* Complete Button */}
          {!lesson?.completed && level === 'newbie' && (
            <Button
              onClick={onComplete}
              className="w-1/6 bg-emerald-500 hover:bg-emerald-600"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Marking as Complete...
                </>
              ) : (
                'Mark as Complete'
              )}
            </Button>
          )}
        </div>
        {lesson.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </motion.div>
        )}
      </div>

      <div className="space-y-4 mt-6">
        {/* Objective */}
        {lesson.objective && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Target className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-400 mb-1">Objective</h3>
                <p className="text-slate-300 text-sm">{lesson.objective}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {lesson.content && (
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-slate-300 whitespace-pre-line">
              {lesson.content}
            </p>
          </div>
        )}

        {/* Example Command */}
        {lesson.exampleCommand && (
          <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <h3 className="text-sm font-semibold text-emerald-400">
                Example Commands:
              </h3>
            </div>
            {lesson.exampleCommand.split('\n').map((cmd, idx) => (
              <code
                key={idx}
                className="text-white font-mono bg-slate-900 px-3 py-2 rounded block mb-1 last:mb-0 text-sm"
              >
                {cmd}
              </code>
            ))}
          </div>
        )}

        {/* Practice Task */}
        {lesson.practiceTask && (
          <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Rocket className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-400 mb-1">
                  Practice Task
                </h3>
                <p className="text-slate-300 text-sm whitespace-pre-line">
                  {lesson.practiceTask}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hint */}
        {lesson.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-purple-400 mb-1">Hint</h3>
                <p className="text-slate-300 text-sm whitespace-pre-line">
                  {lesson.hint}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
