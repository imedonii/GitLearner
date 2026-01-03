'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/UI'
import { Star, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CheatSheetCommand } from './CheatSheetCommand'

export const CheatSheetSection = () => {
  const router = useRouter()
  const onNavigateToCheatSheet = () => {
    router.push('/cheatsheet')
  }

  return (
    <section className="py-20 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 space-y-4">
              <CheatSheetCommand
                command="git status"
                description="Check working directory status"
              />
              <CheatSheetCommand
                command="git add <file>"
                description="Stage files for commit"
              />
              <CheatSheetCommand
                command="git commit -m 'message'"
                description="Commit staged changes"
              />
              <CheatSheetCommand
                command="git push origin main"
                description="Push to remote repository"
              />
              <div className="text-center pt-2">
                <span className="text-sm text-slate-500">
                  + 50 more commands
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-4">
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-semibold">
                Free & Always Accessible
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Git Cheat Sheet
            </h2>
            <p className="text-xl text-slate-300 mb-6">
              Quick reference for daily Git commands with copy-ready examples
            </p>
            <Button
              onClick={onNavigateToCheatSheet}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
            >
              <FileText className="w-5 h-5" />
              View Cheat Sheet
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
