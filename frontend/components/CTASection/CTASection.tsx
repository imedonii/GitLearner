'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/UI'
import { Rocket, Terminal } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const CTASection = () => {
  const router = useRouter()
  const onStart = () => {
    router.push('/learning-path')
  }
  const onNavigateToPlayground = () => {
    router.push('/playground')
  }

  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start Mastering Git Today
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who learned Git the visual and
            interactive way
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={onStart}
              size="lg"
              className="border bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-10 py-6 text-lg gap-2 shadow-lg"
            >
              <Rocket className="w-5 h-5" />
              Start Learning
            </Button>
            <Button
              onClick={onNavigateToPlayground}
              size="lg"
              className="border border-emerald-500 text-white bg-transparent hover:bg-slate-800 px-10 py-6 text-lg gap-2"
            >
              <Terminal className="w-5 h-5" />
              Try Playground
            </Button>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            No credit card required • Free forever • Start immediately
          </p>
        </div>
      </motion.div>
    </section>
  )
}
