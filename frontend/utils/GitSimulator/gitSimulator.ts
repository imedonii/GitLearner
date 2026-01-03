export interface GitFile {
  name: string
  id: string
  tracked: boolean // Has been committed at least once
  modified: boolean // Has changes since last commit (only for tracked files)
  staged: boolean // Ready to be committed
  content: string // File content
}

export interface Commit {
  id: string
  message: string
  author: string
  files: GitFile[]
  timestamp: number
  parents: string[] // Parent commit IDs for merge visualization
  branch: string // Branch this commit was made on
}

export interface BranchInfo {
  name: string
  commitId: string | null // Points to latest commit on this branch
  color: string // For visualization
}

export interface RemoteBranch {
  name: string
  commitId: string | null
}

export interface GitState {
  initialized: boolean
  currentBranch: string
  branches: BranchInfo[]
  remoteBranches: RemoteBranch[]
  workingDirectory: GitFile[] // Modified or untracked files
  stagingArea: GitFile[]
  commits: Commit[]
  remotePushed: boolean
  head: string | null // Current HEAD commit ID
  trackedFiles: string[] // Files that have been committed at least once
}

const branchColors = [
  '#10b981', // emerald
  '#3b82f6', // blue
  '#a855f7', // purple
  '#f59e0b', // amber
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
]

let colorIndex = 0

function getBranchColor(): string {
  const color = branchColors[colorIndex % branchColors.length]
  colorIndex++
  return color
}

export const initialGitState: GitState = {
  initialized: false,
  currentBranch: 'main',
  branches: [{ name: 'main', commitId: null, color: '#10b981' }],
  remoteBranches: [],
  workingDirectory: [],
  stagingArea: [],
  commits: [],
  remotePushed: false,
  head: null,
  trackedFiles: [],
}

let commitCounter = 0

function generateCommitId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function executeGitCommand(
  command: string,
  state: GitState
): {
  output: string
  type: 'error' | 'success' | 'output'
  newState?: GitState
} {
  const parts = command.trim().split(/\s+/)
  const mainCommand = parts[0]
  const subCommand = parts[1]

  // Git version
  if (command === 'git --version' || command === 'git -v') {
    return {
      output: 'git version 2.45.1',
      type: 'output',
    }
  }

  // Git help (detailed)
  if (command === 'git --help' || command === 'git help') {
    return {
      output: `usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone             Clone a repository into a new directory
   init              Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add               Add file contents to the index
   mv                Move or rename a file, a directory, or a symlink
   restore           Restore working tree files
   rm                Remove files from the working tree and from the index
   sparse-checkout   Initialize and modify the sparse-checkout

examine the history and state (see also: git help revisions)
   bisect            Use binary search to find the commit that introduced a bug
   diff              Show changes between commits, commit and working tree, etc
   grep              Print lines matching a pattern
   log               Show commit logs
   show              Show various types of objects
   status            Show the working tree status

grow, mark and tweak your common history
   branch            List, create, or delete branches
   commit            Record changes to the repository
   merge             Join two or more development histories together
   rebase            Reapply commits on top of another base tip
   reset             Reset current HEAD to the specified state
   switch            Switch branches
   tag               Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch             Download objects and refs from another repository
   pull              Fetch from and integrate with another repository or a local branch
   push              Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
See 'git --help' for more information.`,
      type: 'output',
    }
  }

  // Git init
  if (command === 'git init') {
    if (state.initialized) {
      return {
        output: 'Reinitialized existing Git repository',
        type: 'output',
        newState: state,
      }
    }
    return {
      output: 'Initialized empty Git repository in ~/my-project/.git/',
      type: 'success',
      newState: { ...state, initialized: true },
    }
  }

  // Check if repository is initialized
  if (!state.initialized && mainCommand === 'git') {
    return {
      output:
        'fatal: not a git repository (or any of the parent directories): .git',
      type: 'error',
    }
  }

  // Git status
  if (command === 'git status') {
    let output = `On branch ${state.currentBranch}\n`

    // Categorize files correctly
    const untrackedFiles = state.workingDirectory.filter((f) => !f.tracked)
    const modifiedFiles = state.workingDirectory.filter(
      (f) => f.tracked && f.modified
    )
    const stagedFiles = state.stagingArea

    if (
      stagedFiles.length === 0 &&
      modifiedFiles.length === 0 &&
      untrackedFiles.length === 0
    ) {
      output += 'nothing to commit, working tree clean'
    } else {
      if (stagedFiles.length > 0) {
        output += '\nChanges to be committed:\n'
        output += '  (use "git restore --staged <file>..." to unstage)\n'
        stagedFiles.forEach((file) => {
          const status = file.tracked ? 'modified' : 'new file'
          output += `        ${status}:   ${file.name}\n`
        })
      }

      if (modifiedFiles.length > 0) {
        output += '\nChanges not staged for commit:\n'
        output +=
          '  (use "git add <file>..." to update what will be committed)\n'
        modifiedFiles.forEach((file) => {
          output += `        modified:   ${file.name}\n`
        })
      }

      if (untrackedFiles.length > 0) {
        output += '\nUntracked files:\n'
        output +=
          '  (use "git add <file>..." to include in what will be committed)\n'
        untrackedFiles.forEach((file) => {
          output += `        ${file.name}\n`
        })
      }
    }

    return { output, type: 'output' }
  }

  // Git add
  if (command.startsWith('git add')) {
    if (parts.length < 3) {
      return {
        output: 'Nothing specified, nothing added.',
        type: 'error',
      }
    }

    const filePattern = parts[2]
    let newState = { ...state }

    if (
      filePattern === '.' ||
      filePattern === '-A' ||
      filePattern === '--all'
    ) {
      // Add all files
      if (state.workingDirectory.length === 0) {
        // Create some sample files if none exist
        newState.workingDirectory = [
          {
            id: '1',
            name: 'index.html',
            tracked: false,
            modified: false,
            staged: false,
            content: '',
          },
          {
            id: '2',
            name: 'style.css',
            tracked: false,
            modified: false,
            staged: false,
            content: '',
          },
          {
            id: '3',
            name: 'script.js',
            tracked: false,
            modified: false,
            staged: false,
            content: '',
          },
        ]
      }
      newState.stagingArea = [...state.workingDirectory]
      newState.workingDirectory = []

      return {
        output: `Added ${newState.stagingArea.length} file(s) to staging area`,
        type: 'success',
        newState,
      }
    } else {
      // Add specific file
      const fileExists = state.workingDirectory.find(
        (f) => f.name === filePattern
      )
      if (!fileExists) {
        // Create the file if it doesn't exist
        const newFile = {
          id: Date.now().toString(),
          name: filePattern,
          tracked: false,
          modified: false,
          staged: false,
          content: '',
        }
        newState.stagingArea = [...state.stagingArea, newFile]
      } else {
        newState.stagingArea = [...state.stagingArea, fileExists]
        newState.workingDirectory = state.workingDirectory.filter(
          (f) => f.name !== filePattern
        )
      }

      return {
        output: `Added '${filePattern}' to staging area`,
        type: 'success',
        newState,
      }
    }
  }

  // Git commit
  if (command.startsWith('git commit')) {
    if (state.stagingArea.length === 0) {
      return {
        output: 'nothing to commit (staging area is empty)',
        type: 'error',
      }
    }

    const messageMatch = command.match(/-m\s+["']([^"']+)["']/)
    const message = messageMatch ? messageMatch[1] : 'No commit message'

    // Get parent commit(s) - the current HEAD or current branch's last commit
    const currentBranchInfo = state.branches.find(
      (b) => b.name === state.currentBranch
    )
    const parents = currentBranchInfo?.commitId
      ? [currentBranchInfo.commitId]
      : []

    const newCommit: Commit = {
      id: generateCommitId(),
      message,
      author: 'You',
      files: [...state.stagingArea],
      timestamp: Date.now(),
      parents,
      branch: state.currentBranch,
    }

    commitCounter++

    // Update the current branch to point to this new commit
    const updatedBranches = state.branches.map((branch) =>
      branch.name === state.currentBranch
        ? { ...branch, commitId: newCommit.id }
        : branch
    )

    // Get file names that were staged
    const stagedFileNames = state.stagingArea.map((file) => file.name)

    // Remove committed files from working directory (they're now clean)
    const updatedWorkingDirectory = state.workingDirectory.filter(
      (file) => !stagedFileNames.includes(file.name)
    )

    const newState = {
      ...state,
      commits: [...state.commits, newCommit],
      branches: updatedBranches,
      stagingArea: [],
      workingDirectory: updatedWorkingDirectory,
      remotePushed: false,
      head: newCommit.id,
      trackedFiles: [
        ...new Set([
          ...state.trackedFiles,
          ...state.stagingArea.map((file) => file.name),
        ]),
      ],
    }

    return {
      output: `[${state.currentBranch} ${newCommit.id}] ${message}\n ${state.stagingArea.length} file(s) changed`,
      type: 'success',
      newState,
    }
  }

  // Git log
  if (command.startsWith('git log')) {
    if (state.commits.length === 0) {
      return {
        output: 'No commits yet',
        type: 'output',
      }
    }

    let output = ''
    const commits = [...state.commits].reverse()

    commits.forEach((commit, index) => {
      output += `commit ${commit.id}\n`
      output += `Author: ${commit.author}\n`
      output += `\n    ${commit.message}\n`
      if (index < commits.length - 1) output += '\n'
    })

    return { output, type: 'output' }
  }

  // Git branch
  if (command === 'git branch') {
    let output = ''
    state.branches.forEach((branch) => {
      if (branch.name === state.currentBranch) {
        output += `* ${branch.name}\n`
      } else {
        output += `  ${branch.name}\n`
      }
    })
    return { output, type: 'output' }
  }

  if (command.startsWith('git branch ') && parts.length === 3) {
    const newBranch = parts[2]
    if (state.branches.some((branch) => branch.name === newBranch)) {
      return {
        output: `fatal: A branch named '${newBranch}' already exists.`,
        type: 'error',
      }
    }

    // New branch points to current HEAD (same as current branch)
    const newBranchInfo: BranchInfo = {
      name: newBranch,
      commitId: state.head,
      color: getBranchColor(),
    }

    return {
      output: `Created branch '${newBranch}'`,
      type: 'success',
      newState: {
        ...state,
        branches: [...state.branches, newBranchInfo],
      },
    }
  }

  // Git checkout
  if (command.startsWith('git checkout')) {
    const branchName = parts[2]

    if (!branchName) {
      return {
        output: 'error: missing branch name',
        type: 'error',
      }
    }

    if (parts.includes('-b')) {
      // Create and checkout new branch
      const newBranchName = parts[3] || parts[2]
      if (state.branches.some((branch) => branch.name === newBranchName)) {
        return {
          output: `fatal: A branch named '${newBranchName}' already exists.`,
          type: 'error',
        }
      }

      // New branch starts from current HEAD
      const newBranch: BranchInfo = {
        name: newBranchName,
        commitId: state.head,
        color: getBranchColor(),
      }

      return {
        output: `Switched to a new branch '${newBranchName}'`,
        type: 'success',
        newState: {
          ...state,
          branches: [...state.branches, newBranch],
          currentBranch: newBranchName,
        },
      }
    } else {
      // Switch to existing branch
      const targetBranch = state.branches.find(
        (branch) => branch.name === branchName
      )
      if (!targetBranch) {
        return {
          output: `error: pathspec '${branchName}' did not match any file(s) known to git`,
          type: 'error',
        }
      }

      return {
        output: `Switched to branch '${branchName}'`,
        type: 'success',
        newState: {
          ...state,
          currentBranch: branchName,
          head: targetBranch.commitId,
        },
      }
    }
  }

  // Git push
  if (command.startsWith('git push')) {
    if (state.commits.length === 0) {
      return {
        output: 'error: no commits to push',
        type: 'error',
      }
    }

    return {
      output: `Pushed ${state.commits.length} commit(s) to origin/${state.currentBranch}`,
      type: 'success',
      newState: {
        ...state,
        remotePushed: true,
      },
    }
  }

  // Git pull
  if (command === 'git pull') {
    return {
      output: 'Already up to date.',
      type: 'success',
    }
  }

  // Git clone
  if (command.startsWith('git clone')) {
    return {
      output: 'Cloning into repository...\nClone complete!',
      type: 'success',
    }
  }

  // Help command
  if (
    command === 'help' ||
    command === 'git help' ||
    command === 'git --help'
  ) {
    return {
      output: `Available commands:
  git init          - Initialize repository
  git status        - Check repository status
  git add <file>    - Add file to staging
  git add .         - Add all files to staging
  git commit -m "message" - Commit staged changes
  git log           - View commit history
  git branch        - List branches
  git branch <name> - Create new branch
  git checkout <branch> - Switch branch
  git checkout -b <name> - Create and switch to branch
  git push          - Push commits to remote
  git pull          - Pull from remote
  clear             - Clear terminal`,
      type: 'output',
    }
  }

  // Clear command
  if (command === 'clear' || command === 'cls') {
    return {
      output: '',
      type: 'output',
      newState: state,
    }
  }

  // Unknown command
  return {
    output: `git: '${subCommand}' is not a git command. See 'git --help'.`,
    type: 'error',
  }
}
