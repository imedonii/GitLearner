import { ChevronRight } from 'lucide-react'

export const FAQItem = ({
  question,
  answer,
}: {
  question: string
  answer: string
}) => {
  return (
    <details className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 group hover:border-slate-600 transition-colors">
      <summary className="font-semibold cursor-pointer flex items-center justify-between">
        {question}
        <ChevronRight className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform" />
      </summary>
      <p className="text-slate-400 mt-4">{answer}</p>
    </details>
  )
}
