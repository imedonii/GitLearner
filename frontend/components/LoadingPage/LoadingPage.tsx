import { motion } from 'framer-motion'
import { GitBranch, Terminal, Code, Zap } from 'lucide-react'
import { useMemo } from 'react'

export default function LoadingPage() {
  const particles = useMemo(() => [
    { x: 100, y: 200, animateY: 400, duration: 3.5, delay: 0 },
    { x: 300, y: 150, animateY: 350, duration: 4.2, delay: 0.5 },
    { x: 500, y: 300, animateY: 500, duration: 3.8, delay: 1.0 },
    { x: 700, y: 100, animateY: 300, duration: 4.5, delay: 0.3 },
    { x: 900, y: 250, animateY: 450, duration: 3.2, delay: 0.8 },
    { x: 200, y: 400, animateY: 600, duration: 4.1, delay: 1.2 },
    { x: 400, y: 50, animateY: 250, duration: 3.9, delay: 0.6 },
    { x: 600, y: 350, animateY: 550, duration: 4.3, delay: 0.9 },
    { x: 800, y: 180, animateY: 380, duration: 3.6, delay: 1.4 },
    { x: 150, y: 280, animateY: 480, duration: 4.0, delay: 0.2 },
    { x: 350, y: 120, animateY: 320, duration: 3.7, delay: 1.1 },
    { x: 550, y: 420, animateY: 620, duration: 4.4, delay: 0.7 },
    { x: 750, y: 80, animateY: 280, duration: 3.3, delay: 1.3 },
    { x: 950, y: 320, animateY: 520, duration: 4.2, delay: 0.4 },
    { x: 250, y: 220, animateY: 420, duration: 3.8, delay: 1.0 },
    { x: 450, y: 380, animateY: 580, duration: 4.1, delay: 0.5 },
    { x: 650, y: 60, animateY: 260, duration: 3.5, delay: 1.2 },
    { x: 850, y: 290, animateY: 490, duration: 4.3, delay: 0.8 },
    { x: 50, y: 160, animateY: 360, duration: 3.9, delay: 1.5 },
    { x: 1100, y: 240, animateY: 440, duration: 4.0, delay: 0.3 },
  ], [])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
          }}
          animate={{
            y: [null, particle.animateY],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        {/* Logo with Pulse Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Glow Effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-emerald-400/30 rounded-full blur-2xl"
            />

            {/* Git Branch Icon */}
            <div className="relative bg-gradient-to-br from-emerald-400 to-blue-500 p-6 rounded-2xl shadow-2xl">
              <GitBranch className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Learn Git
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-slate-400 text-lg mb-12"
        >
          Master version control interactively
        </motion.p>

        {/* Loading Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500"
            />
          </div>
        </div>

        {/* Animated Icons */}
        <div className="flex justify-center gap-6">
          {[
            { icon: Terminal, delay: 0.6, color: 'text-emerald-400' },
            { icon: Code, delay: 0.8, color: 'text-blue-400' },
            { icon: Zap, delay: 1.0, color: 'text-purple-400' },
          ].map(({ icon: Icon, delay, color }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
              transition={{
                duration: 2,
                delay,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              <Icon className={`w-8 h-8 ${color}`} />
            </motion.div>
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-2 text-slate-500"
        >
          <span>Loading</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >
            .
          </motion.span>
        </motion.div>

        {/* Terminal-style Loading Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 max-w-lg mx-auto"
        >
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-left font-mono text-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-emerald-400 mb-1"
            >
              $ git init learn-git
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-slate-400 mb-1"
            >
              Initialized empty Git repository...
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-blue-400 mb-1"
            >
              $ git add lessons/
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-purple-400"
            >
              $ git commit -m &quot;Ready to learn!&quot;
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-10 right-10 w-32 h-32 border-2 border-emerald-400/20 rounded-full"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-10 left-10 w-40 h-40 border-2 border-blue-400/20 rounded-full"
      />
    </div>
  )
}
