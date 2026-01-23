'use client'
import { motion } from 'framer-motion'
import {
  Code2,
  GitBranch,
  Star,
  Users,
  LucideIcon,
  Loader2,
} from 'lucide-react'
import { BenefitItem } from './BenefitItem'
import { useBenefits, Benefit } from '@/hooks/Content/useContent'
import { sectionAnimation } from '@/constants'
import { ReactNode } from 'react'

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  Code2,
  Users,
  Star,
  GitBranch,
}

// Color class mapping
const colorMap: Record<string, string> = {
  'text-emerald-400': 'text-emerald-400',
  'text-blue-400': 'text-blue-400',
  'text-purple-400': 'text-purple-400',
  'text-pink-400': 'text-pink-400',
}

// Fallback data for when API is not available
const fallbackBenefits: Pick<Benefit, 'id' | 'icon' | 'color' | 'title' | 'description'>[] = [
  {
    id: 'benefit-0',
    icon: 'Code2',
    color: 'text-emerald-400',
    title: 'Version Control Fundamentals',
    description: 'Track every change, never lose work, and experiment safely',
  },
  {
    id: 'benefit-1',
    icon: 'Users',
    color: 'text-blue-400',
    title: 'Team Collaboration',
    description: 'Work seamlessly with teams on shared codebases',
  },
  {
    id: 'benefit-2',
    icon: 'Star',
    color: 'text-purple-400',
    title: 'Industry Standard',
    description: 'Used by millions of developers worldwide',
  },
  {
    id: 'benefit-3',
    icon: 'GitBranch',
    color: 'text-pink-400',
    title: 'GitHub & GitLab',
    description: 'Essential for open-source and portfolio projects',
  },
]

interface RenderBenefit {
  id: string
  icon: ReactNode
  title: string
  description: string
}

export const WhyLearnGit = () => {
  const { data: benefits, isLoading } = useBenefits()

  // Transform API data or use fallback
  const benefitData = benefits && benefits.length > 0 ? benefits : fallbackBenefits

  // Create renderable benefits with icon components
  const renderableBenefits: RenderBenefit[] = benefitData.map((benefit) => {
    const IconComponent = iconMap[benefit.icon] || Code2
    const colorClass = colorMap[benefit.color] || 'text-emerald-400'
    
    return {
      id: benefit.id,
      icon: <IconComponent className={`w-10 h-10 ${colorClass}`} />,
      title: benefit.title,
      description: benefit.description,
    }
  })

  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div {...sectionAnimation} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Why Learn Git?
          </h2>
          <p className="text-xl text-slate-300">
            Master the essential tool for modern software development
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderableBenefits.map((benefit) => (
              <BenefitItem
                key={benefit.id}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
