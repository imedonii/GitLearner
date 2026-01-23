'use client'

import { motion } from 'framer-motion'
import { FAQItem } from './FAQItem'
import { useFAQs, FAQ } from '@/hooks/Content/useContent'
import { sectionAnimation } from '@/constants'
import { Loader2 } from 'lucide-react'

// Fallback data for when API is not available
const fallbackFAQs: Pick<FAQ, 'id' | 'question' | 'answer'>[] = [
  {
    id: 'faq-0',
    question: 'Do I need Git installed on my computer?',
    answer:
      'No! Our interactive playground simulates Git entirely in the browser. However, we recommend installing Git later to practice on real projects.',
  },
  {
    id: 'faq-1',
    question: 'Is this platform free?',
    answer:
      'Yes! Learn Git is completely free. All features including lessons, playground, cheat sheet, and documentation are available at no cost.',
  },
  {
    id: 'faq-2',
    question: 'Can I use it without creating an account?',
    answer:
      'Yes! You can explore the playground, cheat sheet, and documentation without logging in. Create an account to track progress and earn achievements.',
  },
  {
    id: 'faq-3',
    question: 'How long does it take to learn Git?',
    answer:
      'Most users complete the learning path in 2-4 hours. You can learn at your own pace and revisit lessons anytime.',
  },
  {
    id: 'faq-4',
    question: 'What if I get stuck?',
    answer:
      "Check our documentation section for detailed guides, or experiment in the playground where it's safe to make mistakes!",
  },
]

export const FAQSection = () => {
  const { data: faqs, isLoading, isError } = useFAQs()

  // Use API data if available, otherwise use fallback
  const faqData = faqs && faqs.length > 0 ? faqs : fallbackFAQs

  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div {...sectionAnimation} className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          </div>
        ) : (
          <div className="space-y-4">
            {faqData.map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
