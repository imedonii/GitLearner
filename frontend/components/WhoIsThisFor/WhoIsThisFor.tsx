'use client'

import { motion } from 'framer-motion'
import { AudienceCard } from './AudienceCard'

export const WhoIsThisFor = () => {
  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Who Is This For?
          </h2>
          <p className="text-xl text-slate-300">
            Perfect for anyone starting their Git journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AudienceCard
            emoji="🌱"
            title="Complete Beginners"
            description="Never used Git before? Start from zero with no prerequisites"
          />
          <AudienceCard
            emoji="🎓"
            title="Students"
            description="Learn version control for your school projects and future career"
          />
          <AudienceCard
            emoji="💼"
            title="Junior Developers"
            description="Master Git to excel in your first developer role"
          />
          <AudienceCard
            emoji="🚀"
            title="Self-Taught Programmers"
            description="Add professional version control skills to your toolkit"
          />
        </div>
      </motion.div>
    </section>
  )
}
