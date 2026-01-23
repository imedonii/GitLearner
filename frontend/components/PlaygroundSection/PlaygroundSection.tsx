'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/UI'
import { Rocket, ChevronRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PlaygroundFeature } from './PlaygroundFeature'
import { usePlaygroundFeatures, PlaygroundFeature as PlaygroundFeatureType } from '@/hooks/Content/useContent'
import { sectionAnimation } from '@/constants'

// Fallback data for when API is not available
const fallbackFeatures: Pick<PlaygroundFeatureType, 'id' | 'text'>[] = [
  { id: 'feature-0', text: 'Simulated terminal with real Git commands' },
  { id: 'feature-1', text: 'Live file editing & status tracking' },
  { id: 'feature-2', text: 'Visual Git flow diagram (GitKraken-style)' },
  { id: 'feature-3', text: 'No installation required' },
]

export const PlaygroundSection = () => {
  const router = useRouter()
  const { data: features, isLoading } = usePlaygroundFeatures()

  const onNavigateToPlayground = () => {
    router.push('/playground')
  }

  // Use API data if available, otherwise use fallback
  const featureData = features && features.length > 0 ? features : fallbackFeatures

  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div {...sectionAnimation} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Practice in a Real Git Playground
            </h2>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
              </div>
            ) : (
              <ul className="space-y-4 mb-8">
                {featureData.map((feature) => (
                  <PlaygroundFeature key={feature.id} text={feature.text} />
                ))}
              </ul>
            )}
            <Button
              onClick={onNavigateToPlayground}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
            >
              <Rocket className="w-5 h-5" />
              Open Playground
            </Button>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
              <span className="text-sm text-slate-400">Git Playground</span>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-32 h-16 bg-slate-800 border border-emerald-500/50 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-400">Working Dir</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-16 bg-slate-800 border border-blue-500/50 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-400">Staging</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-16 bg-slate-800 border border-purple-500/50 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-400">Local Repo</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-emerald-400">
                $ git add file.txt
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
