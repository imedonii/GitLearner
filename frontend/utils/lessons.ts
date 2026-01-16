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
    id: 'help',
    title: 'Get Help in Git',
    description: 'Learn how to access Git help and documentation',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git help' command shows documentation for Git commands. You can use it to understand how a command works, its options, and examples. It is very useful when you are stuck or learning Git.",
    exampleCommand: 'git help',
    objective: 'Learn how to access Git documentation',
    hint: "Try 'git help status' to see help for a specific command",
    practiceTask:
      "Run 'git help' or 'git help status' in the Playground to explore Git documentation.",
  },
  {
    id: 'version',
    title: 'Check Git Version',
    description: 'Verify that Git is installed on your system',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git version' command shows the currently installed Git version. This helps you confirm that Git is installed and check which version you are using.",
    exampleCommand: 'git version or git -v',
    objective: 'Check the installed Git version',
    hint: 'If Git is installed correctly, it will show a version number',
    practiceTask: "Run 'git version' or 'git -v' in the Playground terminal.",
  },
  {
    id: 'config',
    title: 'Configure Git User',
    description: 'Set your Git username and email',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git config --global' command sets your username and email for all Git repositories on your computer. Git uses this information to identify who made each commit.",
    exampleCommand:
      'git config --global user.name "Your Name"\n' +
      'git config --global user.email "you@example.com"',
    objective: 'Configure Git user identity',
    hint: 'Use your real name and a valid email address',
    practiceTask:
      "Set your name and email using 'git config --global' in the Playground.",
  },

  {
    id: 'init',
    title: 'Start a New Repository',
    description: 'Create a new Git repository locally',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git init' command creates a new Git repository in your current directory. It creates a hidden .git folder that stores all the version control information.",
    exampleCommand: 'git init',
    objective: 'Initialize a new Git repository',
    hint: 'Run this command inside your project folder',
    practiceTask:
      "Run 'git init' in the Playground to create a new repository.",
  },

  {
    id: 'clone',
    title: 'Clone a Repository',
    description: 'Copy an existing repository from a remote source',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git clone' command downloads a copy of an existing repository from a remote source like GitHub. It includes all files, history, and branches.",
    exampleCommand: 'git clone https://github.com/user/repo.git',
    objective: 'Clone a remote repository',
    hint: 'Replace the URL with a real repository link',
    practiceTask:
      "Try cloning a sample repository using 'git clone' in the Playground.",
  },

  {
    id: 'status',
    title: 'Check Repository Status',
    description: 'See the current state of your files',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git status' command shows which files are modified, staged, or untracked. It helps you understand what is happening in your repository before committing.",
    exampleCommand: 'git status',
    objective: 'Understand the current state of your repository',
    hint: 'Run this command often to stay aware of changes',
    practiceTask:
      "Run 'git status' after making changes to files in the Playground.",
  },

  {
    id: 'add',
    title: 'Stage Changes',
    description: 'Prepare files for commit',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git add' command stages changes so they can be included in the next commit. You can add specific files or all changes at once.",
    exampleCommand: 'git add .',
    objective: 'Stage files for committing',
    hint: "Use 'git add .' to stage all changes",
    practiceTask: "Modify a file and run 'git add .' in the Playground.",
  },
  {
    id: 'commit',
    title: 'Commit Changes',
    description: 'Save your changes with a message',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git commit' command saves staged changes to the repository history. Each commit includes a message that explains what was changed.",
    exampleCommand: 'git commit -m "Initial commit"',
    objective: 'Create a commit with a message',
    hint: 'Write clear and meaningful commit messages',
    practiceTask:
      "Commit your staged changes using 'git commit -m' in the Playground.",
  },
  {
    id: 'push',
    title: 'Push Changes to Remote',
    description: 'Upload commits to a remote repository',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git push' command sends your local commits to a remote repository like GitHub. This allows others to see your changes.",
    exampleCommand: 'git push origin main',
    objective: 'Push local commits to a remote repository',
    hint: 'Make sure you have a remote repository set',
    practiceTask:
      "Simulate pushing changes using 'git push' in the Playground.",
  },
  {
    id: 'pull',
    title: 'Pull Updates from Remote',
    description: 'Download and merge remote changes',
    level: 'beginner' as LessonLevel,
    explanation:
      "The 'git pull' command downloads new changes from a remote repository and merges them into your current branch.",
    exampleCommand: 'git pull origin main',
    objective: 'Update your local repository with remote changes',
    hint: 'Pull often to stay up to date with the team',
    practiceTask: "Run 'git pull' in the Playground to fetch remote updates.",
  },

  // {
  //   id: 'log',
  //   title: 'View Commit History',
  //   description: 'See a visual summary of commits',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git log' command displays your repository's commit history. Use 'git log --oneline' for a compact view, 'git log --graph' for a visual branch structure, or combine them: 'git log --graph --oneline --all'. This helps you understand your project's evolution.",
  //   exampleCommand:
  //     'git log\ngit log --oneline\ngit log --graph --oneline --all',
  //   objective: 'Explore and visualize your commit history',
  //   hint: "Try '--graph --oneline --all' for a beautiful branch visualization",
  //   practiceTask: 'View your commit history: git log --oneline',
  // },
  // {
  //   id: 'undo-commits',
  //   title: 'Undo or Modify Commits',
  //   description: 'Change or remove the last commit safely',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "Use 'git reset HEAD^' to undo the last commit while keeping changes in your working directory. Use 'git commit --amend' to modify the last commit's message or add forgotten files. These are powerful tools for fixing mistakes before pushing to remote!",
  //   exampleCommand: "git reset HEAD^\ngit commit --amend -m 'Better message'",
  //   objective: 'Learn to safely fix recent commits',
  //   hint: 'Use --amend for small fixes, reset to undo commits. Be careful with pushed commits!',
  //   practiceTask: 'Make a commit, then amend it: git commit --amend',
  // },
  // {
  //   id: 'stash',
  //   title: 'Stash Changes Temporarily',
  //   description: 'Save changes without committing',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git stash' command temporarily saves your uncommitted changes and gives you a clean working directory. This is perfect when you need to switch branches but aren't ready to commit. Use 'git stash pop' to restore the changes later.",
  //   exampleCommand: 'git stash\ngit stash pop\ngit stash list',
  //   objective: 'Learn to temporarily save work in progress',
  //   hint: 'Stash before switching branches if you have uncommitted work',
  //   practiceTask:
  //     'Make changes, stash them, then pop them back: git stash && git stash pop',
  // },
  // {
  //   id: 'merge-rebase',
  //   title: 'Merge and Rebase Branches',
  //   description: 'Combine changes from different branches',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "Merging combines changes from one branch into another with 'git merge <branch>'. Rebasing with 'git rebase <branch>' moves your commits on top of another branch, creating a cleaner linear history. Merge preserves history, rebase rewrites it for clarity.",
  //   exampleCommand: 'git merge feature-branch\ngit rebase main',
  //   objective: 'Master two ways of integrating branches',
  //   hint: 'Merge for collaborative branches, rebase for personal feature branches',
  //   practiceTask: 'Merge a branch: git merge <branch-name>',
  // },
  // {
  //   id: 'cherry-pick',
  //   title: 'Cherry-Pick Commits',
  //   description: 'Apply a specific commit from another branch',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git cherry-pick <commit>' command applies a specific commit from another branch to your current branch. This is useful when you need just one fix or feature from another branch without merging everything. Find commit hashes with 'git log'.",
  //   exampleCommand: 'git cherry-pick a3f5b2c\ngit cherry-pick main~3',
  //   objective: 'Selectively apply commits across branches',
  //   hint: 'Use git log to find the commit hash you want to cherry-pick',
  //   practiceTask: "Find a commit hash with 'git log' then cherry-pick it",
  // },

  // // ============================================
  // // PRO - Remote & Collaboration
  // // ============================================
  // {
  //   id: 'clone',
  //   title: 'Clone a Remote Repository',
  //   description: 'Copy an existing remote repository to your local machine',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git clone <url>' command creates a complete local copy of a remote repository. It downloads all files, commits, branches, and history from platforms like GitHub, GitLab, or Bitbucket. Cloning automatically sets up the remote connection as 'origin' and checks out the default branch.",
  //   exampleCommand:
  //     'git clone https://github.com/user/repo.git\ngit clone git@github.com:user/repo.git',
  //   objective: 'Download and work with existing remote repositories',
  //   hint: 'Cloning is how you start contributing to existing projects. You only clone once!',
  //   practiceTask: 'In a real terminal, try: git clone <repository-url>',
  // },
  // {
  //   id: 'remote-view',
  //   title: 'View Remote Repositories',
  //   description: 'List all remote repositories and their URLs',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git remote -v' command lists all configured remote repositories with their fetch and push URLs. This shows you where your repository is connected - typically to GitHub, GitLab, or other hosting services. The '-v' flag stands for 'verbose' and shows the URLs.",
  //   exampleCommand: 'git remote -v\ngit remote show origin',
  //   objective: 'Understand which remote repositories are connected',
  //   hint: "'origin' is the default name for your main remote repository",
  //   practiceTask: "Run 'git remote -v' to see your configured remotes",
  // },
  // {
  //   id: 'remote-add',
  //   title: 'Add a Remote Repository',
  //   description: 'Connect your local repository to a remote',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git remote add' command connects your local repository to a remote server. The most common remote name is 'origin', representing your primary remote repository. You can add multiple remotes for different purposes like 'upstream' for the original repository in forks.",
  //   exampleCommand:
  //     'git remote add origin https://github.com/user/repo.git\ngit remote add upstream https://github.com/original/repo.git',
  //   objective: 'Link local repository to remote hosting services',
  //   hint: 'Add a remote after creating a repository on GitHub/GitLab to connect them',
  //   practiceTask: "After 'git init', add a remote: git remote add origin <url>",
  // },
  // {
  //   id: 'fetch',
  //   title: 'Fetch Updates from Remote',
  //   description: 'Download commits from remote without merging',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git fetch' command downloads commits, files, and branches from the remote repository but doesn't merge them into your work. This lets you review changes before integrating them. It's safer than pull because it doesn't automatically modify your working directory.",
  //   exampleCommand: 'git fetch\ngit fetch origin\ngit fetch --all',
  //   objective: 'Safely download remote changes without merging',
  //   hint: "Fetch downloads data: Remote → Local. Use 'git merge' afterward to integrate changes.",
  //   practiceTask: 'Fetch remote changes: git fetch origin',
  // },
  // {
  //   id: 'pull',
  //   title: 'Pull Changes from Remote',
  //   description: 'Fetch and automatically merge remote updates',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git pull' command downloads commits from a remote repository and automatically merges them into your current branch. It's essentially 'git fetch' + 'git merge' combined. Use this to get your teammates' latest changes and stay synchronized with the remote repository.",
  //   exampleCommand: 'git pull\ngit pull origin main\ngit pull --rebase',
  //   objective: 'Download and integrate remote changes into your branch',
  //   hint: 'Pull before pushing: Remote → Local. Always pull to get latest changes before starting work!',
  //   practiceTask: 'Update your branch: git pull origin main',
  // },
  // {
  //   id: 'push',
  //   title: 'Push Local Commits to Remote',
  //   description: 'Send your local commits to the remote repository',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git push' command uploads your local commits to the remote repository, making them available to others. Use 'git push origin <branch>' to push a specific branch. The '-u' flag sets up tracking so future pushes/pulls don't need the branch name specified.",
  //   exampleCommand:
  //     'git push origin main\ngit push -u origin feature-branch\ngit push',
  //   objective: 'Share your commits with the remote repository',
  //   hint: 'Push uploads data: Local → Remote. Always pull before pushing to avoid conflicts!',
  //   practiceTask: 'Push your commits: git push origin main',
  // },
  // {
  //   id: 'track-remote',
  //   title: 'Track a Remote Branch',
  //   description: 'Set your local branch to track a remote branch',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git branch -u' (or '--set-upstream-to') command sets up tracking between your local branch and a remote branch. Once tracking is configured, you can use 'git pull' and 'git push' without specifying the remote and branch names. This simplifies your workflow.",
  //   exampleCommand:
  //     'git branch -u origin/main\ngit branch --set-upstream-to=origin/feature',
  //   objective: 'Configure branch tracking for easier push/pull',
  //   hint: "Tracking lets you use just 'git push' instead of 'git push origin branch'",
  //   practiceTask: 'Set up tracking: git branch -u origin/main',
  // },
  // {
  //   id: 'remote-branches',
  //   title: 'View Remote Branches',
  //   description: 'List all branches on the remote repository',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git branch -r' command lists all branches that exist on the remote repository. These are references to the state of branches in the remote repository at the time of your last fetch. Use 'git branch -a' to see both local and remote branches together.",
  //   exampleCommand: 'git branch -r\ngit branch -a\ngit branch -rv',
  //   objective: 'Discover available branches on the remote',
  //   hint: "Remote branches are shown as 'origin/branch-name'. Fetch first to update the list!",
  //   practiceTask: 'View remote branches: git branch -r',
  // },
  // {
  //   id: 'remote-remove',
  //   title: 'Remove a Remote Connection',
  //   description: 'Disconnect a remote repository from your local repo',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git remote remove' (or 'git remote rm') command disconnects a remote repository from your local repository. This doesn't delete anything on the remote server - it just removes the connection from your local config. Use this when you no longer need to sync with a particular remote.",
  //   exampleCommand: 'git remote remove origin\ngit remote rm old-backup',
  //   objective: 'Remove outdated or unnecessary remote connections',
  //   hint: 'This only removes the connection, not the actual remote repository',
  //   practiceTask: 'Remove a remote: git remote remove <remote-name>',
  // },
  // {
  //   id: 'fetch-prune',
  //   title: 'Fetch and Prune Remote Branches',
  //   description: 'Clean up stale remote branch references',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git fetch --prune' command downloads updates from the remote and removes references to branches that no longer exist on the remote. This keeps your local repository clean by removing 'phantom' remote branches that have been deleted by others.",
  //   exampleCommand: 'git fetch --prune\ngit fetch -p\ngit remote prune origin',
  //   objective: 'Synchronize and clean up remote branch references',
  //   hint: 'Prune removes stale remote branches that were deleted on the server',
  //   practiceTask: 'Clean up old remote branches: git fetch --prune',
  // },
  // {
  //   id: 'force-push',
  //   title: 'Force Push to Remote (Advanced)',
  //   description: 'Forcefully overwrite remote branch with your local version',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "The 'git push -f' (force push) command overwrites the remote branch with your local branch, even if it would lose commits. This is dangerous for shared branches! Use 'git push --force-with-lease' as a safer alternative that checks if others have pushed changes. Only force push on personal branches or when you know what you're doing.",
  //   exampleCommand:
  //     'git push -f origin feature\ngit push --force-with-lease origin my-branch',
  //   objective: 'Understand when and how to safely force push',
  //   hint: "⚠️ DANGER: Force push can delete others' work! Use --force-with-lease for safety.",
  //   practiceTask:
  //     '⚠️ Only use on personal branches: git push --force-with-lease',
  // },
  // {
  //   id: 'push-pull',
  //   title: 'Understanding Push/Pull Data Flow',
  //   description: 'Master the bidirectional sync between local and remote',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "Git synchronization works in two directions: Pull (Remote → Local) downloads and merges changes, while Push (Local → Remote) uploads your commits. Always pull before pushing to integrate others' work first. This workflow prevents conflicts and keeps teams synchronized. Remember: Fetch is safe (download only), Pull is fetch + merge, Push uploads.",
  //   exampleCommand:
  //     '# Standard workflow:\ngit pull origin main\n# Make changes and commit\ngit push origin main',
  //   objective: 'Master the complete remote synchronization workflow',
  //   hint: 'Flow: Remote ←→ Local. Pull first, work, commit, then push!',
  //   practiceTask:
  //     'Practice full cycle: git pull → make changes → git add → git commit → git push',
  // },
  // {
  //   id: 'config',
  //   title: 'Configure Git Settings',
  //   description: 'Set user identity and preferences',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "Use 'git config' to set your name, email, and preferences. Add '--global' to apply settings to all repositories, or omit it for repository-specific config. Your name and email appear in every commit you make, so set these first!",
  //   exampleCommand:
  //     "git config --global user.name 'Your Name'\ngit config --global user.email 'you@example.com'\ngit config --list",
  //   objective: 'Configure Git with your identity and preferences',
  //   hint: 'Set your name and email globally before making commits',
  //   practiceTask: 'Check your config: git config --list',
  // },
  // {
  //   id: 'git-files',
  //   title: 'Understanding Git Configuration Files',
  //   description: 'Learn the key files Git uses',
  //   level: 'pro' as LessonLevel,
  //   explanation:
  //     "Git uses several important files: '.git/config' (repository settings), '~/.gitconfig' (global user settings), and '.gitignore' (files to ignore). The .gitignore file tells Git which files to never track (like secrets, build files, or IDE settings).",
  //   exampleCommand:
  //     "# Create .gitignore:\necho 'node_modules/' > .gitignore\necho '.env' >> .gitignore",
  //   objective: "Understand Git's configuration and ignore patterns",
  //   hint: 'Always add .gitignore before committing to avoid tracking unwanted files',
  //   practiceTask:
  //     'Create a .gitignore file with common patterns like node_modules/, .env, *.log',
  // },
]
