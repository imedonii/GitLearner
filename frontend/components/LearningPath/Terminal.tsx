import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success'
  text: string
}

interface TerminalProps {
  onCommand: (command: string) => {
    output: string
    type: 'error' | 'success' | 'output'
  }
  currentPath?: string
  username?: string
  hostname?: string
}

export default function Terminal({
  onCommand,
  currentPath = '~',
  username = 'learner',
  hostname = 'learn-git',
}: TerminalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', text: 'Welcome to Learn Git Interactive Terminal!' },
    {
      type: 'output',
      text: "Type 'help' for available commands or 'git help' for Git commands.",
    },
    { type: 'output', text: '' },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Handle clear command specially
    if (input.trim() === 'clear' || input.trim() === 'cls') {
      setHistory([])
      setInput('')
      return
    }

    // Create the prompt for this command
    const prompt = `${username}@${hostname}:${currentPath}$`

    // Add command to history
    const newHistory: TerminalLine[] = [
      ...history,
      { type: 'command', text: `${prompt} ${input}` },
    ]

    // Execute command
    const result = onCommand(input.trim())

    if (result.output) {
      // Split multiline output
      const lines = result.output.split('\n')
      lines.forEach((line) => {
        newHistory.push({ type: result.type, text: line })
      })
    }

    setHistory(newHistory)
    setCommandHistory([...commandHistory, input])
    setHistoryIndex(-1)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  const prompt = `${username}@${hostname}:${currentPath}$`

  return (
    <div
      className="bg-slate-950 rounded-lg border border-slate-700 overflow-hidden shadow-2xl h-full flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700 flex-shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-slate-400 text-sm ml-4 font-mono">
          {username}@{hostname}: {currentPath}
        </span>
      </div>

      {/* Terminal Content */}
      <div
        ref={outputRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
      >
        {history.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="mb-1"
          >
            {line.type === 'command' && (
              <div className="text-emerald-400">{line.text}</div>
            )}
            {line.type === 'output' && (
              <div className="text-slate-300 whitespace-pre-wrap">
                {line.text}
              </div>
            )}
            {line.type === 'error' && (
              <div className="text-red-400">{line.text}</div>
            )}
            {line.type === 'success' && (
              <div className="text-green-400">{line.text}</div>
            )}
          </motion.div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-start gap-2">
          <span className="text-emerald-400 whitespace-nowrap">{prompt}</span>
          <div className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-100 outline-none font-mono"
              autoFocus
              spellCheck={false}
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="w-2 h-4 bg-emerald-400 ml-0.5"
            />
          </div>
        </form>

        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}
