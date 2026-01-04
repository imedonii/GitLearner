export const lessons: any[] = [
  {
    id: 'intro',
    title: 'Introduction to Git',
    description: 'What is Git and why use it?',
    explanation:
      'Git is a distributed version control system that tracks changes in your code over time. It allows you to save snapshots of your project, collaborate with others, and revert to previous versions if needed. Think of it as a time machine for your code!',
    exampleCommand: 'git --version',
    objective: 'Understand the purpose of Git and version control',
    hint: 'Git helps you answer: Who changed what, when, and why?',
  },
  {
    id: 'init',
    title: 'Repository Basics',
    description: 'Initialize your first Git repository',
    explanation:
      "A Git repository (or 'repo') is a folder that Git tracks. The 'git init' command creates a hidden .git folder that stores all the version history. This transforms a regular folder into a Git repository.",
    exampleCommand: 'git init',
    objective: 'Initialize a new Git repository',
    hint: "Run 'git init' in the terminal to create a new repository",
  },
  {
    id: 'status',
    title: 'Understanding Git Status',
    description: "Check what's happening in your repository",
    explanation:
      "The 'git status' command is your best friend. It shows which files have changed, which are staged for commit, and which branch you're on. Use it frequently to understand your repository's current state.",
    exampleCommand: 'git status',
    objective: 'Learn to check repository status',
    hint: "Always run 'git status' before and after other Git commands",
  },
  {
    id: 'working-staging',
    title: 'Working Directory vs Staging Area',
    description: 'Understand the three-stage architecture',
    explanation:
      "Git has three main areas: Working Directory (your actual files), Staging Area (files prepared for commit), and Repository (committed snapshots). Files must be 'staged' before they can be committed. This lets you choose exactly what to include in each commit.",
    exampleCommand: 'git status',
    objective: 'Understand the three stages of Git',
    hint: 'Working → Staging → Repository. Each stage has a purpose!',
  },
  {
    id: 'add',
    title: 'Git Add - Staging Files',
    description: 'Add files to the staging area',
    explanation:
      "The 'git add' command moves files from your working directory to the staging area. You can add specific files or use 'git add .' to add all changed files. Staging lets you carefully select what goes into your next commit.",
    exampleCommand: 'git add .',
    objective: 'Stage files for commit',
    hint: "Use 'git add .' to stage all files, or 'git add filename' for specific files",
  },
  {
    id: 'commit',
    title: 'Git Commit - Saving Snapshots',
    description: 'Create permanent snapshots of your code',
    explanation:
      "The 'git commit' command saves a snapshot of all staged files. Each commit needs a message describing what changed. Commits are like save points in a video game - you can always return to them later. Write clear, descriptive messages!",
    exampleCommand: 'git commit -m "Add homepage layout"',
    objective: 'Create your first commit',
    hint: 'Good commit messages explain WHY you made changes, not just what changed',
  },
  {
    id: 'log',
    title: 'Git Log - View History',
    description: 'See your commit history',
    explanation:
      "The 'git log' command shows all commits in your repository's history. Each commit has a unique ID (hash), author, date, and message. This is how you can see what changed over time and who made each change.",
    exampleCommand: 'git log',
    objective: "View your repository's commit history",
    hint: "Try 'git log --oneline' for a compact view",
  },
  {
    id: 'branch',
    title: 'Git Branch - Parallel Development',
    description: 'Create and manage branches',
    explanation:
      "Branches let you work on different features simultaneously without affecting the main code. Think of them as parallel universes for your project. The default branch is usually called 'main' or 'master'. You can create new branches for experiments or features.",
    exampleCommand: 'git branch feature-login',
    objective: 'Create a new branch',
    hint: 'Branches are cheap and easy - use them liberally!',
  },
  {
    id: 'checkout',
    title: 'Git Checkout - Switch Branches',
    description: 'Move between branches',
    explanation:
      "The 'git checkout' command switches between branches. When you checkout a branch, Git updates your files to match that branch's state. Use 'git checkout -b name' to create and switch to a new branch in one command.",
    exampleCommand: 'git checkout -b new-feature',
    objective: 'Switch between branches',
    hint: 'Always commit or stash your changes before switching branches!',
  },
  {
    id: 'merge',
    title: 'Git Merge - Combining Branches',
    description: 'Merge changes from one branch to another',
    explanation:
      "Merging combines changes from different branches. When you finish a feature on a branch, you merge it back into main. Git automatically combines the changes, but sometimes you'll need to resolve conflicts if the same code was changed in both branches.",
    exampleCommand: 'git merge feature-branch',
    objective: 'Merge a branch into the current branch',
    hint: 'Always checkout the branch you want to merge INTO, then run merge',
  },
  {
    id: 'push',
    title: 'Git Push - Share Your Work',
    description: 'Upload commits to a remote repository',
    explanation:
      "The 'git push' command uploads your local commits to a remote repository (like GitHub). This shares your work with others and backs it up in the cloud. You typically push to 'origin', which is the default name for your remote repository.",
    exampleCommand: 'git push origin main',
    objective: 'Push commits to remote repository',
    hint: 'Always pull before you push to get the latest changes',
  },
  {
    id: 'pull',
    title: 'Git Pull - Get Updates',
    description: 'Download and merge remote changes',
    explanation:
      "The 'git pull' command downloads commits from a remote repository and merges them into your current branch. Use this to get your teammates' latest changes. It's actually a combination of 'git fetch' and 'git merge'.",
    exampleCommand: 'git pull',
    objective: 'Pull changes from remote repository',
    hint: "Pull regularly to stay up-to-date with your team's changes",
  },
  {
    id: 'clone',
    title: 'Git Clone - Copy Repositories',
    description: 'Download an existing repository',
    explanation:
      "The 'git clone' command creates a local copy of a remote repository. This is how you start working on an existing project. It downloads all files, commits, and branches. You only need to clone once per project.",
    exampleCommand: 'git clone https://github.com/user/repo.git',
    objective: 'Clone a remote repository',
    hint: 'Cloning creates a new folder with the repository name',
  },
  {
    id: 'conflicts',
    title: 'Conflict Resolution',
    description: 'Handle merge conflicts',
    explanation:
      "Conflicts happen when Git can't automatically merge changes because the same code was modified in different ways. Git marks conflicted areas in your files. You must manually choose which changes to keep, then stage and commit the resolved files.",
    exampleCommand: 'git status (to see conflicts)',
    objective: 'Understand how to resolve merge conflicts',
    hint: "Don't panic! Conflicts are normal. Edit the file, remove conflict markers, then commit.",
  },
];
