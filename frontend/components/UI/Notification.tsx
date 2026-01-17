import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface NotificationItem {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}

interface NotificationProps extends NotificationItem {
  onClose: (id: string) => void
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  description,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose(id), 300) // Allow animation to complete
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/50 bg-emerald-600'
      case 'error':
        return 'border-red-500/50 bg-red-600'
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-600'
      case 'info':
        return 'border-blue-500/50 bg-blue-600'
      default:
        return 'border-slate-500/50 bg-slate-600'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3 }}
          className={`relative p-4 mb-2 border ${getTypeStyles()} rounded-lg shadow-xl max-w-sm`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-white text-sm">{title}</h4>
              {description && (
                <p className="text-slate-300 text-sm mt-1">{description}</p>
              )}
            </div>
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => onClose(id), 300)
              }}
              className="ml-4 text-slate-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Notification
