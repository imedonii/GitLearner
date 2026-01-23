// Animation configurations for Framer Motion
export const ANIMATIONS = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const

// Common section wrapper animation props
export const sectionAnimation = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

// Color scheme configurations
export const COLORS = {
  levels: {
    newbie: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      gradient: 'from-blue-400 to-blue-500',
      solid: 'bg-blue-500',
    },
    beginner: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      gradient: 'from-emerald-400 to-emerald-500',
      solid: 'bg-emerald-500',
    },
    mid: {
      text: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      gradient: 'from-yellow-400 to-yellow-500',
      solid: 'bg-yellow-400',
    },
    pro: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      gradient: 'from-red-400 to-red-500',
      solid: 'bg-red-400',
    },
  },
  difficulty: {
    beginner: {
      text: 'text-green-400',
      bg: 'bg-green-400/10',
      border: 'border-green-400/30',
    },
    intermediate: {
      text: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      border: 'border-yellow-400/30',
    },
    advanced: {
      text: 'text-red-400',
      bg: 'bg-red-400/10',
      border: 'border-red-400/30',
    },
  },
  tipTypes: {
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
    },
    pro: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
    },
    do: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
    },
    dont: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
    },
  },
} as const

// Gradient presets
export const GRADIENTS = {
  primary: 'bg-gradient-to-r from-emerald-400 to-blue-500',
  secondary: 'bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400',
  achievement: 'bg-gradient-to-r from-yellow-400 to-orange-500',
  button: 'bg-gradient-to-r from-emerald-500 to-blue-500',
  buttonHover: 'hover:from-emerald-600 hover:to-blue-600',
} as const

// Layout constants
export const LAYOUT = {
  maxWidth: 'max-w-7xl',
  sectionPadding: 'py-20',
  containerPadding: 'px-6',
} as const

// Type exports
export type LevelKey = keyof typeof COLORS.levels
export type DifficultyKey = keyof typeof COLORS.difficulty
export type TipTypeKey = keyof typeof COLORS.tipTypes
