import {
  File,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { FileNode } from '../../utils/FileSystemSimulator/fileSystemSimulator'
import { GitState } from '../../utils/GitSimulator/gitSimulator'
import { useState } from 'react'

interface FileTreePanelProps {
  files: FileNode[]
  onFileClick: (file: FileNode) => void
  selectedFile: FileNode | null
  gitState?: GitState
}

export default function FileTreePanel({
  files,
  onFileClick,
  selectedFile,
  gitState,
}: FileTreePanelProps) {
  const [expandedDirectories, setExpandedDirectories] = useState<Set<string>>(
    new Set(['~/projects'])
  )

  const toggleDirectory = (path: string) => {
    setExpandedDirectories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  // Helper function to get Git status for a file
  const getGitStatus = (
    filePath: string
  ): 'untracked' | 'modified' | 'staged' | null => {
    if (!gitState?.initialized) return null

    // Extract just the filename from the path for Git comparison
    const fileName = filePath.split('/').pop() || ''

    // Check if in staging area
    if (gitState.stagingArea.some((f) => f.name === fileName)) {
      return 'staged'
    }

    // Check if in working directory
    const fileInWorking = gitState.workingDirectory.find(
      (f) => f.name === fileName
    )
    if (fileInWorking) {
      return fileInWorking.tracked ? 'modified' : 'untracked'
    }

    // File is clean (committed and no changes)
    return null
  }

  // Recursive tree node component
  const TreeNode = ({
    node,
    depth = 0,
  }: {
    node: FileNode
    depth?: number
  }) => {
    const isExpanded = expandedDirectories.has(node.path)
    const hasChildren = node.children && node.children.length > 0
    const paddingLeft = depth * 16

    if (node.type === 'directory') {
      return (
        <div>
          <button
            onClick={() => toggleDirectory(node.path)}
            className="w-full flex items-center gap-1 px-2 py-1.5 text-sm text-slate-300 hover:bg-slate-800 rounded transition-colors"
            style={{ paddingLeft: `${paddingLeft + 8}px` }}
          >
            {hasChildren &&
              (isExpanded ? (
                <ChevronDown className="w-3 h-3 text-slate-500" />
              ) : (
                <ChevronRight className="w-3 h-3 text-slate-500" />
              ))}
            {!hasChildren && <div className="w-3" />}
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-blue-400" />
            )}
            <span>{node.name}</span>
          </button>

          {isExpanded && node.children && (
            <div>
              {node.children.map((child) => (
                <TreeNode key={child.path} node={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      )
    }

    // File node
    const gitStatus = getGitStatus(node.path)
    return (
      <button
        onClick={() => onFileClick(node)}
        className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
          selectedFile?.path === node.path
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
            : 'text-slate-300 hover:bg-slate-800'
        }`}
        style={{ paddingLeft: `${paddingLeft + 8}px` }}
      >
        <div className="w-3" /> {/* Spacing for alignment */}
        <File className="w-4 h-4" />
        <span className="flex-1 text-left">{node.name}</span>
        {gitStatus === 'modified' && (
          <span className="text-orange-400 text-xs" title="Modified">
            ●
          </span>
        )}
        {gitStatus === 'staged' && (
          <span className="text-green-400 text-xs" title="Staged">
            ●
          </span>
        )}
        {gitStatus === 'untracked' && (
          <span className="text-red-400 text-xs" title="Untracked">
            ●
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="h-full bg-slate-900/50 rounded-lg border border-slate-700 p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">
        File Explorer
      </h3>

      <div className="space-y-0.5">
        {files.map((node) => (
          <TreeNode key={node.path} node={node} />
        ))}

        {files.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-4">
            No files yet. Use{' '}
            <code className="text-emerald-400">touch filename</code> to create
            files.
          </div>
        )}
      </div>
    </div>
  )
}
