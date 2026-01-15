'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ChevronRight,
  Play,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Terminal,
  GitBranch,
  Book,
  Settings,
  Eye,
  RotateCcw,
  FileCode,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HelpAndTipsProps {
  onTryInPlayground?: (command: string) => void
}

interface GitCommand {
  id: string
  name: string
  syntax: string
  description: string
  whenToUse: string
  example: string
  category: string
  isCommon?: boolean
}

interface Tip {
  id: string
  type: 'warning' | 'pro' | 'do' | 'dont'
  title: string
  description: string
}

const categories = [
  { id: 'getting-started', label: 'Getting Started', icon: Book },
  { id: 'repository-setup', label: 'Repository Setup', icon: FileCode },
  { id: 'staging-committing', label: 'Staging & Committing', icon: Terminal },
  { id: 'branching-merging', label: 'Branching & Merging', icon: GitBranch },
  { id: 'remote-repos', label: 'Remote Repositories', icon: GitBranch },
  { id: 'undo-fix', label: 'Undo & Fix', icon: RotateCcw },
  { id: 'inspection-logs', label: 'Inspection & Logs', icon: Eye },
  { id: 'configuration', label: 'Configuration', icon: Settings },
  { id: 'advanced', label: 'Advanced Tips', icon: Lightbulb },
]

const commands: GitCommand[] = [
  // Getting Started
  {
    id: 'git-version',
    name: 'git --version',
    syntax: 'git --version',
    description: 'Check which version of Git is installed on your system.',
    whenToUse:
      'When you want to verify Git is installed or check your Git version.',
    example: 'git --version\n# Output: git version 2.40.0',
    category: 'getting-started',
    isCommon: false,
  },
  {
    id: 'git-help',
    name: 'git help',
    syntax: 'git help <command>',
    description: 'Display help information about Git commands.',
    whenToUse:
      'When you need detailed information about a specific Git command.',
    example: 'git help commit\ngit help push',
    category: 'getting-started',
    isCommon: false,
  },

  // Repository Setup
  {
    id: 'git-init',
    name: 'git init',
    syntax: 'git init [directory-name]',
    description:
      'Initialize a new Git repository in the current or specified directory.',
    whenToUse:
      'When starting a new project or converting an existing project to use Git.',
    example:
      'git init\n# Or create new directory and initialize\ngit init my-project',
    category: 'repository-setup',
    isCommon: true,
  },
  {
    id: 'git-clone',
    name: 'git clone',
    syntax: 'git clone <repository-url> [directory-name]',
    description:
      'Clone an existing repository from a remote source to your local machine.',
    whenToUse:
      'When you want to work on an existing project or contribute to open source.',
    example:
      'git clone https://github.com/user/repo.git\ngit clone https://github.com/user/repo.git my-folder',
    category: 'repository-setup',
    isCommon: true,
  },

  // Staging & Committing
  {
    id: 'git-status',
    name: 'git status',
    syntax: 'git status',
    description:
      'Show the current state of your working directory and staging area.',
    whenToUse:
      'Before committing to see which files have been modified, staged, or are untracked.',
    example: 'git status\n# Shows modified, staged, and untracked files',
    category: 'staging-committing',
    isCommon: true,
  },
  {
    id: 'git-add',
    name: 'git add',
    syntax: 'git add <file-path>\ngit add .\ngit add -A',
    description:
      'Add file changes to the staging area (index) for the next commit.',
    whenToUse:
      'After making changes to files and you want to prepare them for a commit.',
    example: 'git add README.md\ngit add .\ngit add -A',
    category: 'staging-committing',
    isCommon: true,
  },
  {
    id: 'git-commit',
    name: 'git commit',
    syntax: 'git commit -m "message"\ngit commit -am "message"',
    description: 'Record changes to the repository with a descriptive message.',
    whenToUse:
      "After staging changes with git add and you're ready to save a snapshot.",
    example:
      'git commit -m "Add login feature"\ngit commit -am "Fix header bug"',
    category: 'staging-committing',
    isCommon: true,
  },
  {
    id: 'git-diff',
    name: 'git diff',
    syntax: 'git diff\ngit diff --staged\ngit diff <branch1> <branch2>',
    description:
      'Show differences between commits, branches, working directory, and staging area.',
    whenToUse:
      'To review what changes have been made before committing or comparing branches.',
    example: 'git diff\ngit diff --staged\ngit diff main feature-branch',
    category: 'staging-committing',
    isCommon: true,
  },

  // Branching & Merging
  {
    id: 'git-branch',
    name: 'git branch',
    syntax: 'git branch\ngit branch <branch-name>\ngit branch -d <branch-name>',
    description: 'List, create, or delete branches in your repository.',
    whenToUse:
      'To manage branches, create feature branches, or clean up merged branches.',
    example: 'git branch\ngit branch feature-login\ngit branch -d old-feature',
    category: 'branching-merging',
    isCommon: true,
  },
  {
    id: 'git-checkout',
    name: 'git checkout',
    syntax: 'git checkout <branch-name>\ngit checkout -b <new-branch>',
    description:
      'Switch to another branch or create and switch to a new branch.',
    whenToUse:
      'When you want to work on a different branch or start a new feature.',
    example: 'git checkout main\ngit checkout -b feature-payment',
    category: 'branching-merging',
    isCommon: true,
  },
  {
    id: 'git-switch',
    name: 'git switch',
    syntax: 'git switch <branch-name>\ngit switch -c <new-branch>',
    description: 'Modern alternative to checkout for switching branches.',
    whenToUse:
      'Preferred over checkout for switching branches (clearer intent).',
    example: 'git switch main\ngit switch -c feature-navbar',
    category: 'branching-merging',
    isCommon: true,
  },
  {
    id: 'git-merge',
    name: 'git merge',
    syntax: 'git merge <branch-name>\ngit merge --no-ff <branch-name>',
    description: 'Merge changes from one branch into the current branch.',
    whenToUse:
      'When you want to integrate changes from a feature branch into main.',
    example: 'git checkout main\ngit merge feature-login',
    category: 'branching-merging',
    isCommon: true,
  },

  // Remote Repositories
  {
    id: 'git-remote',
    name: 'git remote',
    syntax:
      'git remote -v\ngit remote add <name> <url>\ngit remote remove <name>',
    description: 'Manage connections to remote repositories.',
    whenToUse: 'To view, add, or remove remote repository connections.',
    example:
      'git remote -v\ngit remote add origin https://github.com/user/repo.git\ngit remote remove old-origin',
    category: 'remote-repos',
    isCommon: true,
  },
  {
    id: 'git-fetch',
    name: 'git fetch',
    syntax: 'git fetch\ngit fetch <remote>\ngit fetch <remote> <branch>',
    description:
      'Download objects and refs from a remote repository without merging.',
    whenToUse:
      'To see what others have pushed without affecting your working directory.',
    example: 'git fetch origin\ngit fetch origin main',
    category: 'remote-repos',
    isCommon: true,
  },
  {
    id: 'git-pull',
    name: 'git pull',
    syntax: 'git pull\ngit pull <remote> <branch>\ngit pull --rebase',
    description:
      'Fetch from remote and merge into the current branch (fetch + merge).',
    whenToUse:
      'To update your local branch with the latest changes from remote.',
    example: 'git pull origin main\ngit pull --rebase origin main',
    category: 'remote-repos',
    isCommon: true,
  },
  {
    id: 'git-push',
    name: 'git push',
    syntax: 'git push\ngit push <remote> <branch>\ngit push -u origin <branch>',
    description: 'Upload local commits to a remote repository.',
    whenToUse:
      'After committing changes locally and you want to share them with others.',
    example: 'git push origin main\ngit push -u origin feature-branch',
    category: 'remote-repos',
    isCommon: true,
  },

  // Undo & Fix
  {
    id: 'git-restore',
    name: 'git restore',
    syntax: 'git restore <file>\ngit restore --staged <file>',
    description: 'Restore working tree files or unstage changes.',
    whenToUse:
      'To discard changes in working directory or remove files from staging area.',
    example: 'git restore README.md\ngit restore --staged style.css',
    category: 'undo-fix',
    isCommon: true,
  },
  {
    id: 'git-reset',
    name: 'git reset',
    syntax:
      'git reset <file>\ngit reset --soft HEAD~1\ngit reset --hard HEAD~1',
    description: 'Reset current HEAD to a specified state.',
    whenToUse: 'To undo commits or unstage files. Use with caution!',
    example:
      'git reset HEAD~1\ngit reset --soft HEAD~1\ngit reset --hard origin/main',
    category: 'undo-fix',
    isCommon: false,
  },
  {
    id: 'git-revert',
    name: 'git revert',
    syntax: 'git revert <commit-hash>',
    description:
      'Create a new commit that undoes changes from a previous commit.',
    whenToUse:
      'To safely undo a commit without rewriting history (safe for shared branches).',
    example: 'git revert a1b2c3d\ngit revert HEAD',
    category: 'undo-fix',
    isCommon: true,
  },
  {
    id: 'git-stash',
    name: 'git stash',
    syntax: 'git stash\ngit stash pop\ngit stash list',
    description: "Temporarily save changes that you don't want to commit yet.",
    whenToUse:
      "When you need to switch branches but aren't ready to commit current changes.",
    example: 'git stash\ngit stash pop\ngit stash list',
    category: 'undo-fix',
    isCommon: true,
  },

  // Inspection & Logs
  {
    id: 'git-log',
    name: 'git log',
    syntax: 'git log\ngit log --oneline\ngit log --graph --all',
    description: 'Show commit history for the current branch.',
    whenToUse:
      'To review project history, find commit hashes, or see what changed.',
    example:
      'git log\ngit log --oneline --graph --all\ngit log --author="John"',
    category: 'inspection-logs',
    isCommon: true,
  },
  {
    id: 'git-show',
    name: 'git show',
    syntax: 'git show <commit-hash>',
    description: 'Show detailed information about a specific commit.',
    whenToUse: 'When you want to see what changed in a particular commit.',
    example: 'git show a1b2c3d\ngit show HEAD~2',
    category: 'inspection-logs',
    isCommon: false,
  },
  {
    id: 'git-blame',
    name: 'git blame',
    syntax: 'git blame <file>',
    description: 'Show who last modified each line of a file.',
    whenToUse: 'To find out who wrote or last changed a specific line of code.',
    example: 'git blame README.md\ngit blame -L 10,20 app.js',
    category: 'inspection-logs',
    isCommon: false,
  },

  // Configuration
  {
    id: 'git-config',
    name: 'git config',
    syntax:
      'git config --global user.name "Name"\ngit config --global user.email "email@example.com"',
    description: 'Set configuration values for your Git installation.',
    whenToUse:
      'When setting up Git for the first time or changing user settings.',
    example:
      'git config --global user.name "John Doe"\ngit config --global user.email "john@example.com"\ngit config --list',
    category: 'configuration',
    isCommon: true,
  },

  // Advanced
  {
    id: 'git-rebase',
    name: 'git rebase',
    syntax: 'git rebase <branch>\ngit rebase -i HEAD~3',
    description:
      'Reapply commits on top of another base commit (rewrite history).',
    whenToUse:
      'To create a cleaner commit history or update feature branch with main.',
    example: 'git rebase main\ngit rebase -i HEAD~3',
    category: 'advanced',
    isCommon: false,
  },
  {
    id: 'git-cherry-pick',
    name: 'git cherry-pick',
    syntax: 'git cherry-pick <commit-hash>',
    description: 'Apply changes from specific commits to the current branch.',
    whenToUse: 'When you want to apply a specific commit from another branch.',
    example: 'git cherry-pick a1b2c3d',
    category: 'advanced',
    isCommon: false,
  },
  {
    id: 'git-tag',
    name: 'git tag',
    syntax: 'git tag <tag-name>\ngit tag -a v1.0 -m "Version 1.0"',
    description: 'Create, list, or delete tags (version markers).',
    whenToUse:
      'To mark specific points in history as important (releases, versions).',
    example: 'git tag v1.0.0\ngit tag -a v1.0.0 -m "Release version 1.0"',
    category: 'advanced',
    isCommon: false,
  },
]

const tips: Tip[] = [
  {
    id: 'tip-1',
    type: 'warning',
    title: 'Be Careful with Force Push',
    description:
      "Using git push --force can overwrite others' work. Use --force-with-lease instead, which is safer.",
  },
  {
    id: 'tip-2',
    type: 'pro',
    title: 'Commit Often, Push When Done',
    description:
      'Make small, frequent commits locally. Push to remote when your feature is complete and tested.',
  },
  {
    id: 'tip-3',
    type: 'do',
    title: 'Write Clear Commit Messages',
    description:
      "Use imperative mood: 'Add feature' not 'Added feature'. Be specific about what changed and why.",
  },
  {
    id: 'tip-4',
    type: 'dont',
    title: "Don't Commit Sensitive Data",
    description:
      'Never commit passwords, API keys, or secrets. Use .gitignore and environment variables instead.',
  },
  {
    id: 'tip-5',
    type: 'pro',
    title: 'Use .gitignore Properly',
    description:
      'Add node_modules, .env, build files, and IDE configs to .gitignore to keep your repo clean.',
  },
  {
    id: 'tip-6',
    type: 'warning',
    title: 'Avoid Rebasing Public Branches',
    description:
      'Never rebase commits that have been pushed to shared/public branches. Use merge instead.',
  },
  {
    id: 'tip-7',
    type: 'do',
    title: 'Pull Before You Push',
    description:
      'Always pull the latest changes before pushing to avoid conflicts and keep history clean.',
  },
  {
    id: 'tip-8',
    type: 'pro',
    title: 'Use Branches for Features',
    description:
      'Create a new branch for each feature or bug fix. Keep main/master stable and deployable.',
  },
  {
    id: 'tip-9',
    type: 'dont',
    title: "Don't Modify Pushed Commits",
    description:
      'Once pushed, avoid amending or resetting commits. It causes issues for collaborators.',
  },
  {
    id: 'tip-10',
    type: 'pro',
    title: 'Learn to Read Git Log',
    description:
      'Use git log --oneline --graph --all to visualize your branch structure and commit history.',
  },
]

export default function HelpAndTips({ onTryInPlayground }: HelpAndTipsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['commonly-used', 'tips'])
  )
  const router = useRouter()

  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      return commands.filter((cmd) => cmd.category === activeCategory)
    }

    const query = searchQuery.toLowerCase()
    return commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(query) ||
        cmd.description.toLowerCase().includes(query) ||
        cmd.syntax.toLowerCase().includes(query)
    )
  }, [searchQuery, activeCategory])

  const commonCommands = commands.filter((cmd) => cmd.isCommon)

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const getTipIcon = (type: Tip['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      case 'pro':
        return <Lightbulb className="w-5 h-5" />
      case 'do':
        return <CheckCircle2 className="w-5 h-5" />
      case 'dont':
        return <XCircle className="w-5 h-5" />
    }
  }

  const getTipStyles = (type: Tip['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
      case 'pro':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      case 'do':
        return 'bg-green-500/10 border-green-500/30 text-green-400'
      case 'dont':
        return 'bg-red-500/10 border-red-500/30 text-red-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Help & Tips
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Git commands, explanations, and best practices
                </p>
              </div>

              <button
                onClick={() => router.push('/learning-path')}
                className="text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-lg bg-slate-800 hover:bg-emerald-600"
              >
                {'Continue Learning ->'}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search commands (e.g. git commit, git push)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="w-64 shrink-0 sticky top-32 h-fit">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                Categories
              </h3>
              <nav className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isActive = activeCategory === category.id
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id)
                        setSearchQuery('')
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.label}
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-8">
            {/* Search Results or Category Commands */}
            {searchQuery.trim() ? (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">
                  Search Results ({filteredCommands.length})
                </h2>
                {filteredCommands.length === 0 ? (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-center">
                    <Terminal className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">
                      No commands found matching "{searchQuery}"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCommands.map((cmd) => (
                      <CommandBlock
                        key={cmd.id}
                        command={cmd}
                        onTryInPlayground={onTryInPlayground}
                      />
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <>
                {/* Commonly Used Commands */}
                {activeCategory === 'getting-started' && (
                  <section>
                    <button
                      onClick={() => toggleSection('commonly-used')}
                      className="w-full flex items-center justify-between mb-4 group"
                    >
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-emerald-400" />
                        Commonly Used Commands
                      </h2>
                      {expandedSections.has('commonly-used') ? (
                        <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.has('commonly-used') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 overflow-hidden"
                        >
                          {commonCommands.map((cmd) => (
                            <CommandBlock
                              key={cmd.id}
                              command={cmd}
                              onTryInPlayground={onTryInPlayground}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>
                )}

                {/* Category Commands */}
                <section>
                  <h2 className="text-xl font-bold text-white mb-4">
                    {categories.find((cat) => cat.id === activeCategory)?.label}
                  </h2>
                  <div className="space-y-4">
                    {filteredCommands.map((cmd) => (
                      <CommandBlock
                        key={cmd.id}
                        command={cmd}
                        onTryInPlayground={onTryInPlayground}
                      />
                    ))}
                  </div>
                </section>

                {/* Tips & Best Practices */}
                <section>
                  <button
                    onClick={() => toggleSection('tips')}
                    className="w-full flex items-center justify-between mb-4 group"
                  >
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      Tips & Best Practices
                    </h2>
                    {expandedSections.has('tips') ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSections.has('tips') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                      >
                        {tips.map((tip) => (
                          <div
                            key={tip.id}
                            className={`p-4 rounded-lg border ${getTipStyles(
                              tip.type
                            )} flex gap-3`}
                          >
                            <div className="shrink-0 mt-0.5">
                              {getTipIcon(tip.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                {tip.title}
                              </h3>
                              <p className="text-sm opacity-90">
                                {tip.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </>
            )}

            {/* Footer Actions */}
            <footer className="border-t border-slate-800 pt-6 mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  //   onClick={onBack}
                  className="px-6 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Learning Path
                </button>
                {onTryInPlayground && (
                  <button
                    onClick={() => onTryInPlayground('')}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Try in Playground
                  </button>
                )}
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

interface CommandBlockProps {
  command: GitCommand
  onTryInPlayground?: (command: string) => void
}

function CommandBlock({ command, onTryInPlayground }: CommandBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
    >
      {/* Command Name */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-emerald-400 font-mono">
          {command.name}
        </h3>
        {command.isCommon && (
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded">
            Common
          </span>
        )}
      </div>

      {/* Syntax */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Syntax
        </h4>
        <div className="bg-slate-950/50 border border-slate-800 rounded p-3 overflow-x-auto">
          <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap">
            {command.syntax}
          </pre>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Description
        </h4>
        <p className="text-slate-300 text-sm leading-relaxed">
          {command.description}
        </p>
      </div>

      {/* When to Use */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          When to Use
        </h4>
        <p className="text-slate-400 text-sm leading-relaxed">
          {command.whenToUse}
        </p>
      </div>

      {/* Example */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Example
        </h4>
        <div className="bg-slate-950/50 border border-slate-800 rounded p-3 overflow-x-auto">
          <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap">
            {command.example}
          </pre>
        </div>
      </div>

      {/* Action Button */}
      {onTryInPlayground && (
        <button
          onClick={() => onTryInPlayground(command.name)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Play className="w-4 h-4" />
          Try in Playground
        </button>
      )}
    </motion.div>
  )
}
