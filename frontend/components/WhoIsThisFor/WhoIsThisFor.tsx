'use client'

import { motion } from 'framer-motion'
import { AudienceCard } from './AudienceCard'
import { useAudiences, Audience } from '@/hooks/Content/useContent'
import { sectionAnimation } from '@/constants'
import { Loader2 } from 'lucide-react'

// Fallback data for when API is not available
const fallbackAudiences: Pick<Audience, 'id' | 'emoji' | 'title' | 'description'>[] = [
  {
    id: 'audience-0',
    emoji: '🌱',
    title: 'Complete Beginners',
    description: 'Never used Git before? Start from zero with no prerequisites',
  },
  {
    id: 'audience-1',
    emoji: '🎓',
    title: 'Students',
    description: 'Learn version control for your school projects and future career',
  },
  {
    id: 'audience-2',
    emoji: '💼',
    title: 'Junior Developers',
    description: 'Master Git to excel in your first developer role',
  },
  {
    id: 'audience-3',
    emoji: '🚀',
    title: 'Self-Taught Programmers',
    description: 'Add professional version control skills to your toolkit',
  },
]

export const WhoIsThisFor = () => {
  const { data: audiences, isLoading } = useAudiences()

  // Use API data if available, otherwise use fallback
  const audienceData = audiences && audiences.length > 0 ? audiences : fallbackAudiences

  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div {...sectionAnimation} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Who Is This For?
          </h2>
          <p className="text-xl text-slate-300">
            Perfect for anyone starting their Git journey
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceData.map((audience) => (
              <AudienceCard
                key={audience.id}
                emoji={audience.emoji}
                title={audience.title}
                description={audience.description}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
