import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/UI'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface QuizProps {
  questions: QuizQuestion[]
  onComplete: (score: number) => void
  className?: string
}

export default function Quiz({ questions, onComplete, className = '' }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setAnswers([...answers, answerIndex])
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const score = answers.filter((answer, index) =>
        answer === questions[index].correctAnswer
      ).length
      onComplete(score)
    }
  }

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  if (!question) return null

  return (
    <div className={`bg-slate-800 rounded-lg border border-slate-700 p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">
          Quiz: Question {currentQuestion + 1} of {questions.length}
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-slate-300 text-lg">{question.question}</p>

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                showResult
                  ? index === question.correctAnswer
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                    : index === selectedAnswer
                    ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                    : 'bg-slate-700 text-slate-400'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {showResult && index === question.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {showResult && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3"
          >
            <p className="text-blue-300 text-sm">{question.explanation}</p>
          </motion.div>
        )}

        {showResult && (
          <div className="flex justify-end">
            <Button onClick={handleNext} className="bg-emerald-500 hover:bg-emerald-600">
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}