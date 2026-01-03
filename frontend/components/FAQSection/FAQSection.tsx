'use client'

import { motion } from 'framer-motion'
import { FAQItem } from './FAQItem'

export const FAQSection = () => {
  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <FAQItem
            question="Do I need Git installed on my computer?"
            answer="No! Our interactive playground simulates Git entirely in the browser. However, we recommend installing Git later to practice on real projects."
          />
          <FAQItem
            question="Is this platform free?"
            answer="Yes! Learn Git is completely free. All features including lessons, playground, cheat sheet, and documentation are available at no cost."
          />
          <FAQItem
            question="Can I use it without creating an account?"
            answer="Yes! You can explore the playground, cheat sheet, and documentation without logging in. Create an account to track progress and earn achievements."
          />
          <FAQItem
            question="How long does it take to learn Git?"
            answer="Most users complete the learning path in 2-4 hours. You can learn at your own pace and revisit lessons anytime."
          />
          <FAQItem
            question="What if I get stuck?"
            answer="Check our documentation section for detailed guides, or experiment in the playground where it's safe to make mistakes!"
          />
        </div>
      </motion.div>
    </section>
  )
}
