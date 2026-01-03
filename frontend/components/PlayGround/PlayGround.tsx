'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, GitBranch, RotateCcw } from 'lucide-react'
import { Button } from '@/components/UI/button'
import Terminal from './Terminal'
import FileTreePanel from './FileTreePanel'
import FileEditorPanel from './FileEditorPanel'
import GitFlowDiagram from './GitFlowDiagram'
import GitGraph from './GitGraph'
import {
  executeGitCommand,
  GitState,
  initialGitState,
} from '../../utils/GitSimulator/gitSimulator'
import {
  FileSystem,
  FileNode,
  createInitialFileSystem,
  getFileTree,
  updateFileContent,
  executeShellCommand,
} from '../../utils/FileSystemSimulator/fileSystemSimulator'
import {
  addFileToWorkingDirectory,
  markFileAsModified,
} from '../../utils/GitFileManager/gitFileManager'
import { useRouter } from 'next/navigation'

export default function PlayGround() {
  const router = useRouter()
  const [gitState, setGitState] = useState<GitState>(initialGitState)
  const [fileSystem, setFileSystem] = useState<FileSystem>(
    createInitialFileSystem()
  )
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim()

    // Handle help command
    if (trimmedCommand === 'help') {
      return {
        output: `Available Shell Commands:
  ls, dir           - List files and folders
  pwd               - Show current path
  cd <folder>       - Change directory
  mkdir <name>      - Create directory
  touch <file>      - Create file
  rm <file>         - Remove file
  clear, cls        - Clear terminal

Git Commands:
  git init          - Initialize repository
  git status        - Check repository status
  git add <file>    - Add file to staging
  git add .         - Add all files to staging
  git commit -m "msg" - Commit staged changes
  git log           - View commit history
  git branch        - List branches
  git branch <name> - Create new branch
  git checkout <branch> - Switch branch
  git checkout -b <name> - Create and switch to branch
  git push          - Push commits to remote
  git pull          - Pull from remote`,
        type: 'output' as const,
      }
    }

    // Check if it's a git command
    if (trimmedCommand.startsWith('git ') || trimmedCommand === 'git') {
      const result = executeGitCommand(trimmedCommand, gitState)
      if (result.newState) {
        setGitState(result.newState)
      }
      return result
    }

    // Otherwise, handle as shell command
    const shellResult = executeShellCommand(trimmedCommand, fileSystem)
    setFileSystem(shellResult.newFileSystem)

    // Check if files were created/modified and update Git state
    if (trimmedCommand.startsWith('touch ')) {
      const fileName = trimmedCommand.split(/\s+/)[1]
      if (fileName && gitState.initialized) {
        // Add file to working directory as untracked
        const updatedGitState = addFileToWorkingDirectory(gitState, fileName)
        setGitState(updatedGitState)
      }
    }

    // Handle rm command - remove from Git tracking too
    if (trimmedCommand.startsWith('rm ')) {
      const fileName = trimmedCommand.split(/\s+/)[1]
      if (fileName) {
        setGitState({
          ...gitState,
          workingDirectory: gitState.workingDirectory.filter(
            (f) => f.name !== fileName
          ),
          stagingArea: gitState.stagingArea.filter((f) => f.name !== fileName),
        })
      }
    }

    return {
      output: shellResult.output,
      type: 'output' as const,
    }
  }

  const handleReset = () => {
    setGitState(initialGitState)
    setFileSystem(createInitialFileSystem())
    setSelectedFile(null)
  }

  const handleFileSave = (content: string) => {
    if (selectedFile) {
      const newFileSystem = updateFileContent(
        fileSystem,
        selectedFile.path,
        content
      )
      setFileSystem(newFileSystem)

      // Mark file as modified in Git ONLY if it's tracked
      if (gitState.initialized) {
        const updatedGitState = markFileAsModified(
          gitState,
          selectedFile.name,
          content
        )
        setGitState(updatedGitState)
      }
    }
  }

  const fileTree = getFileTree(fileSystem)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-emerald-400" />
              <div>
                <h1 className="text-xl font-bold">Playground Mode</h1>
                <p className="text-sm text-slate-400">
                  Experiment freely with Git commands
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500"
            >
              <GitBranch className="w-6 h-6 text-white" />
            </motion.div>

            <h1 className="text-xl font-bold text-white">Git Learner</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-500 gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>

            <Button
              onClick={() => router.push('/learning-path')}
              variant="outline"
              className="cursor-pointer border-slate-400 text-slate-300 hover:bg-slate-800/50 hover:text-white gap-2"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar - File Tree, File Editor & Repository Info */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            {/* File Tree */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FileTreePanel
                files={fileTree}
                onFileClick={setSelectedFile}
                selectedFile={selectedFile}
                gitState={gitState}
              />
            </motion.div>

            {/* File Editor */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FileEditorPanel
                file={selectedFile}
                onSave={handleFileSave}
                onClose={() => setSelectedFile(null)}
              />
            </motion.div>

            {/* Repository Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 rounded-lg border border-slate-700 p-4"
            >
              <h2 className="text-lg font-bold mb-4 text-blue-400">
                Repository Info
              </h2>

              <div className="space-y-3 text-sm">
                <InfoRow
                  label="Initialized"
                  value={gitState.initialized ? 'Yes' : 'No'}
                  highlight={gitState.initialized}
                />
                <InfoRow
                  label="Current Branch"
                  value={gitState.currentBranch}
                />
                <InfoRow
                  label="Total Commits"
                  value={gitState.commits.length.toString()}
                />
                <InfoRow
                  label="Working Files"
                  value={gitState.workingDirectory.length.toString()}
                />
                <InfoRow
                  label="Staged Files"
                  value={gitState.stagingArea.length.toString()}
                />
              </div>

              {gitState.commits.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">
                    Recent Commits
                  </h3>
                  <div className="space-y-2">
                    {gitState.commits
                      .slice(-3)
                      .reverse()
                      .map((commit) => (
                        <div
                          key={commit.id}
                          className="bg-slate-800/50 rounded p-2"
                        >
                          <div className="text-xs text-emerald-400 font-mono">
                            {commit.id}
                          </div>
                          <div className="text-xs text-slate-300 mt-1">
                            {commit.message}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Center - Terminal */}
          <div className="col-span-12 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[calc(100vh-200px)]"
            >
              <Terminal
                onCommand={handleCommand}
                currentPath={fileSystem.currentPath}
              />
            </motion.div>
          </div>

          {/* Right - Git Flow Visualization */}
          <div className="col-span-12 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 rounded-lg border border-slate-700 p-4"
            >
              <h2 className="text-lg font-bold mb-4 text-emerald-400">
                Git Flow Visualization
              </h2>
              <GitFlowDiagram
                workingFiles={gitState.workingDirectory}
                stagedFiles={gitState.stagingArea}
                committedFiles={
                  gitState.commits.length > 0
                    ? [
                        {
                          id: 'commits',
                          name: `${gitState.commits.length} commit(s)`,
                        },
                      ]
                    : []
                }
                remotePushed={gitState.remotePushed}
                showRemote={true}
              />
            </motion.div>
          </div>
        </div>

        {/* Git Branch & Commit Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 mb-8"
        >
          <GitGraph gitState={gitState} />
        </motion.div>
      </div>
    </div>
  )
}

function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400">{label}:</span>
      <span
        className={
          highlight ? 'text-emerald-400 font-semibold' : 'text-white font-mono'
        }
      >
        {value}
      </span>
    </div>
  )
}
