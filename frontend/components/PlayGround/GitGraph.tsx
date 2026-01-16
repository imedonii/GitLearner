import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, GitCommit, Info } from 'lucide-react'
import {
  GitState,
  Commit,
  BranchInfo,
} from '../../utils/GitSimulator/gitSimulator'
import * as Tooltip from '@radix-ui/react-tooltip'

interface GitGraphProps {
  gitState: GitState
}

interface CommitNode {
  commit: Commit
  x: number
  y: number
  branchIndex: number
  color: string
}

export default function GitGraph({ gitState }: GitGraphProps) {
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null)
  const [showExplainer, setShowExplainer] = useState(false)

  if (!gitState.initialized) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <GitBranch className="w-16 h-16 text-slate-600 mb-4" />
        <p className="text-slate-400 text-lg">No repository initialized</p>
        <p className="text-slate-500 text-sm mt-2">
          Run <code className="bg-slate-800 px-2 py-1 rounded">git init</code>{' '}
          to get started
        </p>
      </div>
    )
  }

  if (gitState.commits.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <GitCommit className="w-16 h-16 text-slate-600 mb-4" />
        <p className="text-slate-400 text-lg">No commits yet</p>
        <p className="text-slate-500 text-sm mt-2">
          Make your first commit to see the graph
        </p>
        <div className="mt-4 text-xs text-slate-600 bg-slate-800/50 rounded-lg p-3 max-w-sm">
          <p className="mb-2">Try these commands:</p>
          <code className="block text-emerald-400">git add .</code>
          <code className="block text-emerald-400 mt-1">
            git commit -m &quot;Initial commit&quot;
          </code>
        </div>
      </div>
    )
  }

  // Build the graph layout
  const commitNodes: CommitNode[] = []
  const nodeSpacing = 80
  const branchSpacing = 60
  const startY = 60

  // Create a map of branch names to their index and info
  const branchMap = new Map<string, { index: number; info: BranchInfo }>()
  gitState.branches.forEach((branch, index) => {
    branchMap.set(branch.name, { index, info: branch })
  })

  // Position commits
  gitState.commits.forEach((commit, index) => {
    const branchData = branchMap.get(commit.branch)
    const branchIndex = branchData?.index || 0
    const branchColor = branchData?.info.color || '#10b981'

    commitNodes.push({
      commit,
      x: 50 + branchIndex * branchSpacing,
      y: startY + index * nodeSpacing,
      branchIndex,
      color: branchColor,
    })
  })

  const svgHeight = Math.max(
    400,
    startY + gitState.commits.length * nodeSpacing + 60
  )
  const svgWidth = Math.max(
    400,
    50 + gitState.branches.length * branchSpacing + 150
  )

  return (
    <Tooltip.Provider>
      <div className="h-full flex flex-col bg-slate-900/50 rounded-lg border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-white">
                Branch & Commit Graph
              </h3>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              On branch:{' '}
              <span className="text-emerald-400 font-mono">
                {gitState.currentBranch}
              </span>
              {gitState.head && (
                <span className="ml-3">
                  HEAD →{' '}
                  <span className="text-blue-400 font-mono">
                    {gitState.head.substring(0, 7)}
                  </span>
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowExplainer(!showExplainer)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors"
          >
            <Info className="w-3 h-3" />
            {showExplainer ? 'Hide' : 'Explain'}
          </button>
        </div>

        {/* Explainer Panel */}
        <AnimatePresence>
          {showExplainer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-slate-700 bg-slate-800/30"
            >
              <div className="p-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Commit Nodes</p>
                    <p className="text-slate-400 text-xs">
                      Each circle represents a commit in your repository
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GitBranch className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Branches</p>
                    <p className="text-slate-400 text-xs">
                      Different colored lines show different branches
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 border-2 border-yellow-400 rounded-full mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">HEAD Pointer</p>
                    <p className="text-slate-400 text-xs">
                      Shows your current position in the commit history
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Graph */}
        <div className="flex-1 overflow-auto p-4">
          <svg width={svgWidth} height={svgHeight} className="mx-auto">
            {/* Branch Lines */}
            {gitState.branches.map((branch, branchIndex) => {
              const branchCommits = commitNodes.filter(
                (node) => node.branchIndex === branchIndex
              )
              if (branchCommits.length === 0) return null

              return (
                <g key={branch.name}>
                  {/* Vertical branch line */}
                  {branchCommits.map((node, i) => {
                    if (i === branchCommits.length - 1) return null
                    const nextNode = branchCommits[i + 1]
                    return (
                      <motion.line
                        key={`line-${node.commit.id}`}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        x1={node.x}
                        y1={node.y}
                        x2={nextNode.x}
                        y2={nextNode.y}
                        stroke={branch.color}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    )
                  })}

                  {/* Branch label at the end */}
                  {branchCommits.length > 0 && (
                    <g>
                      <rect
                        x={branchCommits[branchCommits.length - 1].x + 20}
                        y={branchCommits[branchCommits.length - 1].y - 10}
                        width={Math.max(60, branch.name.length * 7)}
                        height="20"
                        rx="10"
                        fill={branch.color}
                        opacity="0.2"
                      />
                      <rect
                        x={branchCommits[branchCommits.length - 1].x + 20}
                        y={branchCommits[branchCommits.length - 1].y - 10}
                        width={Math.max(60, branch.name.length * 7)}
                        height="20"
                        rx="10"
                        fill="none"
                        stroke={branch.color}
                        strokeWidth="1.5"
                      />
                      <text
                        x={branchCommits[branchCommits.length - 1].x + 50}
                        y={branchCommits[branchCommits.length - 1].y + 4}
                        fill={branch.color}
                        fontSize="12"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {branch.name}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* Commit Nodes */}
            {commitNodes.map((node, index) => {
              const isHead = node.commit.id === gitState.head
              const isOnCurrentBranch =
                node.commit.branch === gitState.currentBranch

              return (
                <Tooltip.Root key={node.commit.id}>
                  <Tooltip.Trigger asChild>
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setSelectedCommit(node.commit)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* HEAD indicator */}
                      {isHead && (
                        <>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="18"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="2"
                            strokeDasharray="3,3"
                          >
                            <animate
                              attributeName="r"
                              values="18;22;18"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </>
                      )}

                      {/* Main commit circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="12"
                        fill={node.color}
                        stroke={isOnCurrentBranch ? '#ffffff' : node.color}
                        strokeWidth={isOnCurrentBranch ? '2' : '0'}
                      />

                      {/* Inner dot for emphasis */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="4"
                        fill="white"
                        opacity="0.8"
                      />
                    </motion.g>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl max-w-xs z-50"
                      sideOffset={5}
                    >
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400">Commit</p>
                        <p className="text-sm font-mono text-emerald-400">
                          {node.commit.id}
                        </p>
                        <p className="text-sm text-white mt-2">
                          {node.commit.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                          <span>By {node.commit.author}</span>
                          <span>•</span>
                          <span>
                            {new Date(
                              node.commit.timestamp
                            ).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-700">
                          <p className="text-xs text-slate-400">
                            {node.commit.files.length} file(s) changed
                          </p>
                        </div>
                      </div>
                      <Tooltip.Arrow className="fill-slate-700" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              )
            })}
          </svg>
        </div>

        {/* Commit Details Panel */}
        <AnimatePresence>
          {selectedCommit && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-700 bg-slate-800/50"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Commit Details
                    </p>
                    <p className="font-mono text-emerald-400 text-sm">
                      {selectedCommit.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCommit(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs">Message</p>
                    <p className="text-white">{selectedCommit.message}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-xs">Author</p>
                      <p className="text-white">{selectedCommit.author}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Branch</p>
                      <p className="text-white">{selectedCommit.branch}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-400 text-xs">Timestamp</p>
                    <p className="text-white text-xs">
                      {new Date(selectedCommit.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-xs mb-1">
                      Files Changed ({selectedCommit.files.length})
                    </p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {selectedCommit.files.map((file) => (
                        <div
                          key={file.id}
                          className="bg-slate-800 rounded px-2 py-1 text-xs font-mono text-slate-300"
                        >
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Tooltip.Provider>
  )
}
