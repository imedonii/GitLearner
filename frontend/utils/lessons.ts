interface Lesson {
  id: string
  title: string
  description: string
  explanation: string
  exampleCommand: string
  objective: string
  hint?: string
  completed?: boolean
  level?: LessonLevel
  practiceTask?: string
}

export type LessonLevel = 'beginner' | 'mid' | 'pro'

export const lessons: Lesson[] = [
  // ============================================
  // BEGINNER - Getting Started & Basic Commits
  // ============================================
  {
    id: 'init',
    title: 'Start a New Repository',
    description: 'Create a new Git repository locally',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git init' command creates a new Git repository in your current directory. It creates a hidden .git folder that stores all the version control information. This is the first step to start tracking your project with Git.",
    exampleCommand: 'git init',
    objective: 'Initialize a new Git repository from scratch',
    hint: "Run 'git init' in an empty folder to start version control",
    practiceTask:
      "Try running 'git init' in the Playground terminal to create your first repository!",
  },
  {
    id: 'add',
    title: 'Add Files to Staging Area',
    description: 'Track new files and stage changes for commit',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git add' command stages files for your next commit. You can add specific files with 'git add <file>' or stage all changes with 'git add .' This prepares changes to be permanently saved in your repository's history.",
    exampleCommand: 'git add .\ngit add <file>',
    objective: 'Stage files to prepare them for commit',
    hint: "Use 'git add .' to stage all changes, or specify individual files",
    practiceTask:
      "Try: Create a file with 'touch README.md' then stage it with 'git add README.md'",
  },

  // ============================================
  // MID - Branching & Intermediate Commands
  // ============================================
  {
    id: 'branch-list',
    title: 'List All Branches',
    description: 'See all branches and recent activity',
    level: 'mid' as LessonLevel,
    explanation:
      "The 'git branch' command lists all your local branches. The current branch is marked with an asterisk (*). Use 'git branch --sort=-committerdate' to see branches sorted by most recent activity first. This helps you keep track of active work and old branches.",
    exampleCommand: 'git branch\ngit branch --sort=-committerdate',
    objective: "View and organize your repository's branches",
    hint: 'The * symbol shows your current branch. Use sorting to find recent work!',
    practiceTask: "Run 'git branch' to see all branches in your repository",
  },
  {
    id: 'branch-create',
    title: 'Create a New Branch',
    description: 'Start a new branch for features or experiments',
    level: 'mid' as LessonLevel,
    explanation:
      "Creating a branch lets you work on new features or experiments without affecting the main codebase. 'git switch -c <name>' (modern) or 'git checkout -b <name>' (classic) creates a new branch and switches to it immediately. Branches are lightweight and cheap - use them liberally!",
    exampleCommand:
      'git switch -c feature-login\ngit checkout -b feature-login',
    objective: 'Create and switch to a new branch',
    hint: "Use descriptive branch names like 'feature-auth' or 'fix-bug-123'",
    practiceTask: 'Create a new branch: git switch -c my-feature',
  },
  {
    id: 'branch-switch',
    title: 'Switch Between Branches',
    description: 'Move between different branches',
    level: 'mid' as LessonLevel,
    explanation:
      "Switching branches updates your working directory to match the target branch's state. Use 'git switch <name>' (modern) or 'git checkout <name>' (classic). Always commit or stash your changes before switching to avoid losing work!",
    exampleCommand: 'git switch main\ngit checkout main',
    objective: 'Navigate between different branches',
    hint: 'Commit your changes before switching branches to prevent conflicts',
    practiceTask: 'Switch back to main branch: git switch main',
  },
  {
    id: 'branch-delete',
    title: 'Delete a Branch',
    description: 'Remove a branch safely or forcefully',
    level: 'mid' as LessonLevel,
    explanation:
      "After merging a feature branch, you can delete it to keep your repository clean. Use 'git branch -d <name>' for safe deletion (only if merged) or 'git branch -D <name>' to force delete. This removes the branch pointer but doesn't delete the commits if they're already merged.",
    exampleCommand: 'git branch -d feature-login\ngit branch -D old-branch',
    objective: 'Clean up old or merged branches',
    hint: 'Use -d for safety (prevents deleting unmerged work), -D to force delete',
    practiceTask: 'Delete a merged branch: git branch -d <branch-name>',
  },
  {
    id: 'mv',
    title: 'Move or Rename Files',
    description: 'Rename or move files tracked by Git',
    level: 'mid' as LessonLevel,
    explanation:
      "The 'git mv' command renames or moves files while keeping Git's tracking history intact. It's equivalent to manually moving the file and running 'git add' on both old and new locations. This preserves the file's history through the rename.",
    exampleCommand:
      'git mv old-name.txt new-name.txt\ngit mv src/file.js lib/file.js',
    objective: 'Rename or relocate files while preserving history',
    hint: "Always use 'git mv' instead of regular 'mv' to keep Git tracking",
    practiceTask: 'Rename a file: git mv README.txt README.md',
  },
  {
    id: 'rm',
    title: 'Remove Files from Repository',
    description: 'Delete files from repository or stop tracking them',
    level: 'mid' as LessonLevel,
    explanation:
      "Use 'git rm <file>' to delete a file from both Git and your working directory. Use 'git rm --cached <file>' to stop tracking a file but keep it locally. This is useful for files you accidentally committed or want to add to .gitignore.",
    exampleCommand: 'git rm unwanted-file.txt\ngit rm --cached secret.env',
    objective: 'Remove or untrack files properly',
    hint: 'Use --cached to keep the file locally but remove it from Git tracking',
    practiceTask: 'Untrack a file without deleting it: git rm --cached <file>',
  },
  {
    id: 'reset',
    title: 'Reset and Unstage Changes',
    description: 'Undo staged changes or move commits',
    level: 'mid' as LessonLevel,
    explanation:
      "The 'git reset' command unstages files or moves your branch pointer. Use 'git reset <file>' to unstage a specific file, or 'git reset' to unstage everything. This doesn't delete your changes - just removes them from the staging area.",
    exampleCommand: 'git reset\ngit reset <file>',
    objective: 'Learn to unstage files without losing changes',
    hint: 'Reset unstages files but keeps your changes in the working directory',
    practiceTask: 'Stage a file, then unstage it: git reset <file>',
  },

  // ============================================
  // PRO - Advanced / History / Remote Workflow
  // ============================================
  {
    id: 'diff',
    title: 'View File Differences',
    description: 'Compare unstaged or staged changes',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git diff' command shows what changed in your files. Use 'git diff' to see unstaged changes, 'git diff --staged' to see what's about to be committed, and 'git diff HEAD' to see all changes since the last commit. This helps you review your work before committing.",
    exampleCommand: 'git diff\ngit diff --staged\ngit diff HEAD',
    objective: 'Review and compare changes before committing',
    hint: "Use diff before committing to review exactly what you're saving",
    practiceTask:
      "Make changes to a file, then run 'git diff' to see the differences",
  },
  {
    id: 'log',
    title: 'View Commit History',
    description: 'See a visual summary of commits',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git log' command displays your repository's commit history. Use 'git log --oneline' for a compact view, 'git log --graph' for a visual branch structure, or combine them: 'git log --graph --oneline --all'. This helps you understand your project's evolution.",
    exampleCommand:
      'git log\ngit log --oneline\ngit log --graph --oneline --all',
    objective: 'Explore and visualize your commit history',
    hint: "Try '--graph --oneline --all' for a beautiful branch visualization",
    practiceTask: 'View your commit history: git log --oneline',
  },
  {
    id: 'undo-commits',
    title: 'Undo or Modify Commits',
    description: 'Change or remove the last commit safely',
    level: 'pro' as LessonLevel,
    explanation:
      "Use 'git reset HEAD^' to undo the last commit while keeping changes in your working directory. Use 'git commit --amend' to modify the last commit's message or add forgotten files. These are powerful tools for fixing mistakes before pushing to remote!",
    exampleCommand: "git reset HEAD^\ngit commit --amend -m 'Better message'",
    objective: 'Learn to safely fix recent commits',
    hint: 'Use --amend for small fixes, reset to undo commits. Be careful with pushed commits!',
    practiceTask: 'Make a commit, then amend it: git commit --amend',
  },
  {
    id: 'stash',
    title: 'Stash Changes Temporarily',
    description: 'Save changes without committing',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git stash' command temporarily saves your uncommitted changes and gives you a clean working directory. This is perfect when you need to switch branches but aren't ready to commit. Use 'git stash pop' to restore the changes later.",
    exampleCommand: 'git stash\ngit stash pop\ngit stash list',
    objective: 'Learn to temporarily save work in progress',
    hint: 'Stash before switching branches if you have uncommitted work',
    practiceTask:
      'Make changes, stash them, then pop them back: git stash && git stash pop',
  },
  {
    id: 'merge-rebase',
    title: 'Merge and Rebase Branches',
    description: 'Combine changes from different branches',
    level: 'pro' as LessonLevel,
    explanation:
      "Merging combines changes from one branch into another with 'git merge <branch>'. Rebasing with 'git rebase <branch>' moves your commits on top of another branch, creating a cleaner linear history. Merge preserves history, rebase rewrites it for clarity.",
    exampleCommand: 'git merge feature-branch\ngit rebase main',
    objective: 'Master two ways of integrating branches',
    hint: 'Merge for collaborative branches, rebase for personal feature branches',
    practiceTask: 'Merge a branch: git merge <branch-name>',
  },
  {
    id: 'cherry-pick',
    title: 'Cherry-Pick Commits',
    description: 'Apply a specific commit from another branch',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git cherry-pick <commit>' command applies a specific commit from another branch to your current branch. This is useful when you need just one fix or feature from another branch without merging everything. Find commit hashes with 'git log'.",
    exampleCommand: 'git cherry-pick a3f5b2c\ngit cherry-pick main~3',
    objective: 'Selectively apply commits across branches',
    hint: 'Use git log to find the commit hash you want to cherry-pick',
    practiceTask: "Find a commit hash with 'git log' then cherry-pick it",
  },

  // ============================================
  // PRO - Remote & Collaboration
  // ============================================
  {
    id: 'clone',
    title: 'Clone a Remote Repository',
    description: 'Copy an existing remote repository to your local machine',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git clone <url>' command creates a complete local copy of a remote repository. It downloads all files, commits, branches, and history from platforms like GitHub, GitLab, or Bitbucket. Cloning automatically sets up the remote connection as 'origin' and checks out the default branch.",
    exampleCommand:
      'git clone https://github.com/user/repo.git\ngit clone git@github.com:user/repo.git',
    objective: 'Download and work with existing remote repositories',
    hint: 'Cloning is how you start contributing to existing projects. You only clone once!',
    practiceTask: 'In a real terminal, try: git clone <repository-url>',
  },
  {
    id: 'remote-view',
    title: 'View Remote Repositories',
    description: 'List all remote repositories and their URLs',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git remote -v' command lists all configured remote repositories with their fetch and push URLs. This shows you where your repository is connected - typically to GitHub, GitLab, or other hosting services. The '-v' flag stands for 'verbose' and shows the URLs.",
    exampleCommand: 'git remote -v\ngit remote show origin',
    objective: 'Understand which remote repositories are connected',
    hint: "'origin' is the default name for your main remote repository",
    practiceTask: "Run 'git remote -v' to see your configured remotes",
  },
  {
    id: 'remote-add',
    title: 'Add a Remote Repository',
    description: 'Connect your local repository to a remote',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git remote add' command connects your local repository to a remote server. The most common remote name is 'origin', representing your primary remote repository. You can add multiple remotes for different purposes like 'upstream' for the original repository in forks.",
    exampleCommand:
      'git remote add origin https://github.com/user/repo.git\ngit remote add upstream https://github.com/original/repo.git',
    objective: 'Link local repository to remote hosting services',
    hint: 'Add a remote after creating a repository on GitHub/GitLab to connect them',
    practiceTask: "After 'git init', add a remote: git remote add origin <url>",
  },
  {
    id: 'fetch',
    title: 'Fetch Updates from Remote',
    description: 'Download commits from remote without merging',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git fetch' command downloads commits, files, and branches from the remote repository but doesn't merge them into your work. This lets you review changes before integrating them. It's safer than pull because it doesn't automatically modify your working directory.",
    exampleCommand: 'git fetch\ngit fetch origin\ngit fetch --all',
    objective: 'Safely download remote changes without merging',
    hint: "Fetch downloads data: Remote → Local. Use 'git merge' afterward to integrate changes.",
    practiceTask: 'Fetch remote changes: git fetch origin',
  },
  {
    id: 'pull',
    title: 'Pull Changes from Remote',
    description: 'Fetch and automatically merge remote updates',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git pull' command downloads commits from a remote repository and automatically merges them into your current branch. It's essentially 'git fetch' + 'git merge' combined. Use this to get your teammates' latest changes and stay synchronized with the remote repository.",
    exampleCommand: 'git pull\ngit pull origin main\ngit pull --rebase',
    objective: 'Download and integrate remote changes into your branch',
    hint: 'Pull before pushing: Remote → Local. Always pull to get latest changes before starting work!',
    practiceTask: 'Update your branch: git pull origin main',
  },
  {
    id: 'push',
    title: 'Push Local Commits to Remote',
    description: 'Send your local commits to the remote repository',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git push' command uploads your local commits to the remote repository, making them available to others. Use 'git push origin <branch>' to push a specific branch. The '-u' flag sets up tracking so future pushes/pulls don't need the branch name specified.",
    exampleCommand:
      'git push origin main\ngit push -u origin feature-branch\ngit push',
    objective: 'Share your commits with the remote repository',
    hint: 'Push uploads data: Local → Remote. Always pull before pushing to avoid conflicts!',
    practiceTask: 'Push your commits: git push origin main',
  },
  {
    id: 'track-remote',
    title: 'Track a Remote Branch',
    description: 'Set your local branch to track a remote branch',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git branch -u' (or '--set-upstream-to') command sets up tracking between your local branch and a remote branch. Once tracking is configured, you can use 'git pull' and 'git push' without specifying the remote and branch names. This simplifies your workflow.",
    exampleCommand:
      'git branch -u origin/main\ngit branch --set-upstream-to=origin/feature',
    objective: 'Configure branch tracking for easier push/pull',
    hint: "Tracking lets you use just 'git push' instead of 'git push origin branch'",
    practiceTask: 'Set up tracking: git branch -u origin/main',
  },
  {
    id: 'remote-branches',
    title: 'View Remote Branches',
    description: 'List all branches on the remote repository',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git branch -r' command lists all branches that exist on the remote repository. These are references to the state of branches in the remote repository at the time of your last fetch. Use 'git branch -a' to see both local and remote branches together.",
    exampleCommand: 'git branch -r\ngit branch -a\ngit branch -rv',
    objective: 'Discover available branches on the remote',
    hint: "Remote branches are shown as 'origin/branch-name'. Fetch first to update the list!",
    practiceTask: 'View remote branches: git branch -r',
  },
  {
    id: 'remote-remove',
    title: 'Remove a Remote Connection',
    description: 'Disconnect a remote repository from your local repo',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git remote remove' (or 'git remote rm') command disconnects a remote repository from your local repository. This doesn't delete anything on the remote server - it just removes the connection from your local config. Use this when you no longer need to sync with a particular remote.",
    exampleCommand: 'git remote remove origin\ngit remote rm old-backup',
    objective: 'Remove outdated or unnecessary remote connections',
    hint: 'This only removes the connection, not the actual remote repository',
    practiceTask: 'Remove a remote: git remote remove <remote-name>',
  },
  {
    id: 'fetch-prune',
    title: 'Fetch and Prune Remote Branches',
    description: 'Clean up stale remote branch references',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git fetch --prune' command downloads updates from the remote and removes references to branches that no longer exist on the remote. This keeps your local repository clean by removing 'phantom' remote branches that have been deleted by others.",
    exampleCommand: 'git fetch --prune\ngit fetch -p\ngit remote prune origin',
    objective: 'Synchronize and clean up remote branch references',
    hint: 'Prune removes stale remote branches that were deleted on the server',
    practiceTask: 'Clean up old remote branches: git fetch --prune',
  },
  {
    id: 'force-push',
    title: 'Force Push to Remote (Advanced)',
    description: 'Forcefully overwrite remote branch with your local version',
    level: 'pro' as LessonLevel,
    explanation:
      "The 'git push -f' (force push) command overwrites the remote branch with your local branch, even if it would lose commits. This is dangerous for shared branches! Use 'git push --force-with-lease' as a safer alternative that checks if others have pushed changes. Only force push on personal branches or when you know what you're doing.",
    exampleCommand:
      'git push -f origin feature\ngit push --force-with-lease origin my-branch',
    objective: 'Understand when and how to safely force push',
    hint: "⚠️ DANGER: Force push can delete others' work! Use --force-with-lease for safety.",
    practiceTask:
      '⚠️ Only use on personal branches: git push --force-with-lease',
  },
  {
    id: 'push-pull',
    title: 'Understanding Push/Pull Data Flow',
    description: 'Master the bidirectional sync between local and remote',
    level: 'pro' as LessonLevel,
    explanation:
      "Git synchronization works in two directions: Pull (Remote → Local) downloads and merges changes, while Push (Local → Remote) uploads your commits. Always pull before pushing to integrate others' work first. This workflow prevents conflicts and keeps teams synchronized. Remember: Fetch is safe (download only), Pull is fetch + merge, Push uploads.",
    exampleCommand:
      '# Standard workflow:\ngit pull origin main\n# Make changes and commit\ngit push origin main',
    objective: 'Master the complete remote synchronization workflow',
    hint: 'Flow: Remote ←→ Local. Pull first, work, commit, then push!',
    practiceTask:
      'Practice full cycle: git pull → make changes → git add → git commit → git push',
  },
  {
    id: 'config',
    title: 'Configure Git Settings',
    description: 'Set user identity and preferences',
    level: 'pro' as LessonLevel,
    explanation:
      "Use 'git config' to set your name, email, and preferences. Add '--global' to apply settings to all repositories, or omit it for repository-specific config. Your name and email appear in every commit you make, so set these first!",
    exampleCommand:
      "git config --global user.name 'Your Name'\ngit config --global user.email 'you@example.com'\ngit config --list",
    objective: 'Configure Git with your identity and preferences',
    hint: 'Set your name and email globally before making commits',
    practiceTask: 'Check your config: git config --list',
  },
  {
    id: 'git-files',
    title: 'Understanding Git Configuration Files',
    description: 'Learn the key files Git uses',
    level: 'pro' as LessonLevel,
    explanation:
      "Git uses several important files: '.git/config' (repository settings), '~/.gitconfig' (global user settings), and '.gitignore' (files to ignore). The .gitignore file tells Git which files to never track (like secrets, build files, or IDE settings).",
    exampleCommand:
      "# Create .gitignore:\necho 'node_modules/' > .gitignore\necho '.env' >> .gitignore",
    objective: "Understand Git's configuration and ignore patterns",
    hint: 'Always add .gitignore before committing to avoid tracking unwanted files',
    practiceTask:
      'Create a .gitignore file with common patterns like node_modules/, .env, *.log',
  },
]
