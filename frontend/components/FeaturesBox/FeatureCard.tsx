import { motion } from 'framer-motion'

type FeatureCardProp = {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

export const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: FeatureCardProp) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-emerald-400/50 transition-colors"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  )
}
