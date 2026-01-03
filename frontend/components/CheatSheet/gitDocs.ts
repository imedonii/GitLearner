interface CommandBlock {
  command: string
  syntax: string
  description: string
  example: string
  notes?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

interface Section {
  id: string
  title: string
  commands: CommandBlock[]
}

const gitDocs: Section[] = [
  {
    id: 'basics',
    title: 'Git Basics',
    commands: [
      {
        command: 'git init',
        syntax: 'git init',
        description: 'Initialize a new Git repository in the current directory',
        example: 'git init',
        notes: 'Creates a .git directory with all necessary repository files',
        difficulty: 'beginner',
      },
      {
        command: 'git status',
        syntax: 'git status',
        description: 'Show the working tree status and staged changes',
        example: 'git status',
        notes: "Use this frequently to see what's changed",
        difficulty: 'beginner',
      },
      {
        command: 'git config',
        syntax: 'git config --global user.name "Your Name"',
        description: 'Set configuration values for your Git installation',
        example: 'git config --global user.email "you@example.com"',
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'staging',
    title: 'Staging & Committing',
    commands: [
      {
        command: 'git add',
        syntax: 'git add <file> | git add .',
        description: 'Add file contents to the staging area',
        example: 'git add index.html\ngit add .',
        notes: "Use '.' to add all changes in the current directory",
        difficulty: 'beginner',
      },
      {
        command: 'git commit',
        syntax: 'git commit -m "message"',
        description: 'Record changes to the repository',
        example: 'git commit -m "Add login feature"',
        notes: 'Always write clear, descriptive commit messages',
        difficulty: 'beginner',
      },
      {
        command: 'git commit --amend',
        syntax: 'git commit --amend',
        description: 'Modify the most recent commit',
        example: 'git commit --amend -m "Updated message"',
        notes: "Don't amend commits that have been pushed",
        difficulty: 'intermediate',
      },
      {
        command: 'git reset',
        syntax: 'git reset <file>',
        description: 'Unstage a file while retaining the changes',
        example: 'git reset index.html',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'branches',
    title: 'Branching & Merging',
    commands: [
      {
        command: 'git branch',
        syntax: 'git branch <branch-name>',
        description: 'List, create, or delete branches',
        example: 'git branch feature-login\ngit branch -d old-branch',
        difficulty: 'beginner',
      },
      {
        command: 'git checkout',
        syntax: 'git checkout <branch>',
        description: 'Switch branches or restore working tree files',
        example: 'git checkout main\ngit checkout -b new-feature',
        notes: 'Use -b to create and checkout a new branch',
        difficulty: 'beginner',
      },
      {
        command: 'git merge',
        syntax: 'git merge <branch>',
        description: 'Join two or more development histories together',
        example: 'git merge feature-branch',
        notes: "Make sure you're on the branch you want to merge into",
        difficulty: 'intermediate',
      },
      {
        command: 'git rebase',
        syntax: 'git rebase <branch>',
        description: 'Reapply commits on top of another base tip',
        example: 'git rebase main',
        notes: 'Never rebase commits that have been pushed publicly',
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'remote',
    title: 'Remote Repositories',
    commands: [
      {
        command: 'git clone',
        syntax: 'git clone <url>',
        description: 'Clone a repository into a new directory',
        example: 'git clone https://github.com/user/repo.git',
        difficulty: 'beginner',
      },
      {
        command: 'git remote',
        syntax: 'git remote add <name> <url>',
        description: 'Manage set of tracked repositories',
        example: 'git remote add origin https://github.com/user/repo.git',
        difficulty: 'beginner',
      },
      {
        command: 'git push',
        syntax: 'git push <remote> <branch>',
        description: 'Update remote refs along with associated objects',
        example: 'git push origin main\ngit push -u origin feature',
        notes: 'Use -u to set upstream tracking',
        difficulty: 'beginner',
      },
      {
        command: 'git pull',
        syntax: 'git pull <remote> <branch>',
        description: 'Fetch from and integrate with another repository',
        example: 'git pull origin main',
        notes: 'Equivalent to git fetch + git merge',
        difficulty: 'beginner',
      },
      {
        command: 'git fetch',
        syntax: 'git fetch <remote>',
        description: 'Download objects and refs from another repository',
        example: 'git fetch origin',
        notes: 'Updates remote-tracking branches without merging',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'history',
    title: 'Viewing History',
    commands: [
      {
        command: 'git log',
        syntax: 'git log [options]',
        description: 'Show commit logs',
        example: 'git log\ngit log --oneline\ngit log --graph',
        difficulty: 'beginner',
      },
      {
        command: 'git diff',
        syntax: 'git diff [options]',
        description:
          'Show changes between commits, commit and working tree, etc',
        example: 'git diff\ngit diff --staged',
        difficulty: 'beginner',
      },
      {
        command: 'git show',
        syntax: 'git show <commit>',
        description: 'Show various types of objects',
        example: 'git show HEAD\ngit show abc123',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'undoing',
    title: 'Undoing Changes',
    commands: [
      {
        command: 'git restore',
        syntax: 'git restore <file>',
        description: 'Restore working tree files',
        example: 'git restore index.html\ngit restore --staged file.txt',
        notes: 'Replaces the older git checkout for restoring files',
        difficulty: 'intermediate',
      },
      {
        command: 'git revert',
        syntax: 'git revert <commit>',
        description:
          'Create a new commit that undoes changes from a previous commit',
        example: 'git revert HEAD\ngit revert abc123',
        notes: 'Safe for public commits - creates new commit',
        difficulty: 'intermediate',
      },
      {
        command: 'git reset --hard',
        syntax: 'git reset --hard <commit>',
        description:
          'Reset current HEAD to the specified state, discarding all changes',
        example: 'git reset --hard HEAD~1',
        notes: '⚠️ DANGEROUS: Permanently deletes uncommitted changes',
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'stashing',
    title: 'Stashing',
    commands: [
      {
        command: 'git stash',
        syntax: 'git stash [push]',
        description: 'Stash the changes in a dirty working directory away',
        example: 'git stash\ngit stash push -m "WIP: feature"',
        difficulty: 'intermediate',
      },
      {
        command: 'git stash pop',
        syntax: 'git stash pop',
        description: 'Apply stashed changes and remove from stash list',
        example: 'git stash pop',
        difficulty: 'intermediate',
      },
      {
        command: 'git stash list',
        syntax: 'git stash list',
        description: 'List all stashed changes',
        example: 'git stash list',
        difficulty: 'intermediate',
      },
    ],
  },
]

export default gitDocs
