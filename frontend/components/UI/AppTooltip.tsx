import { motion, AnimatePresence } from 'framer-motion'
import { Lock } from 'lucide-react'

interface TooltipProps {
  isVisible: boolean
  content: string
  variant?: 'premium' | 'locked'
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export default function Tooltip({
  isVisible,
  content,
  variant = 'premium',
  position = 'top',
  className = '',
}: TooltipProps) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return '-top-10 left-1/2 -translate-x-1/2'
      case 'bottom':
        return '-bottom-10 left-1/2 -translate-x-1/2'
      case 'left':
        return 'top-1/2 -left-10 -translate-y-1/2'
      case 'right':
        return 'top-1/2 -right-10 -translate-y-1/2'
      default:
        return '-top-10 left-1/2 -translate-x-1/2'
    }
  }

  const getVariantClasses = () => {
    if (variant === 'premium') {
      return 'bg-gradient-to-r from-yellow-900 to-orange-900 border-yellow-500/50 text-yellow-400'
    } else {
      return 'bg-slate-700 border-slate-600 text-slate-300'
    }
  }

  const getArrowClasses = () => {
    const base = 'absolute w-2 h-2 border-b border-r rotate-45 z-50'
    if (variant === 'premium') {
      return `${base} bg-gradient-to-r from-yellow-900 to-orange-900 border-yellow-500/50`
    } else {
      return `${base} bg-slate-700 border-slate-600`
    }
  }

  const getArrowPosition = () => {
    switch (position) {
      case 'top':
        return '-bottom-1 left-1/2 -translate-x-1/2'
      case 'bottom':
        return '-top-1 left-1/2 -translate-x-1/2'
      case 'left':
        return 'top-1/2 -right-1 -translate-y-1/2 border-l border-t'
      case 'right':
        return 'top-1/2 -left-1 -translate-y-1/2 border-r border-b'
      default:
        return '-bottom-1 left-1/2 -translate-x-1/2'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
            x: position === 'left' ? 10 : position === 'right' ? -10 : 0,
          }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{
            opacity: 0,
            y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
            x: position === 'left' ? 10 : position === 'right' ? -10 : 0,
          }}
          className={`absolute ${getPositionClasses()} flex items-center gap-1 px-2 py-1 border text-xs rounded-full shadow-xl whitespace-nowrap z-50 ${getVariantClasses()} ${className}`}
        >
          {variant === 'premium' && <Lock className="w-3 h-3" />}
          {content}
          <div className={`${getArrowClasses()} ${getArrowPosition()}`} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
