export const lessons: any[] = [
  {
    id: 'what-is-git',
    title: 'What Is Git?',
    description: 'Detailed Explanation of Git',
    explanation: `Git is a version control system. That means it helps you save, track, and manage changes in your files over time.

Real-life example

Imagine you are writing an essay for school:

First version: essay.docx

Then: essay_final.docx

Then: essay_final_v2.docx

Then: essay_final_really_final.docx

This quickly becomes messy, confusing, and risky. You might delete the wrong file or lose a good version.

Git solves this problem by:

Keeping one project

Saving a history of every important change

Letting you go back in time to any previous version

Instead of creating many files, Git quietly remembers every change behind the scenes.`,
    exampleCommand: '',
    objective: 'Understand what Git is and why it exists',
    hint: '',
    isPaid: false,
    order: 1,
    category: 'Git Concepts',
  },
  {
    id: 'why-need-git',
    title: 'Why Do We Need Git?',
    description: 'Understanding the problems Git solves',
    explanation: `When projects become bigger, problems start to appear.

Without Git:

You can accidentally break your project

You cannot easily go back to a working version

Two people editing the same file can overwrite each other's work

You don't know who changed what and why

Real-life example

Imagine working on a group project in Google Docs without history:

Someone deletes a paragraph

No one knows who did it

You cannot restore the old version

Git fixes this by:

Tracking every change

Showing who made the change

Allowing you to undo mistakes safely`,
    exampleCommand: '',
    objective: 'Learn why Git is necessary for development',
    hint: '',
    isPaid: false,
    order: 2,
    category: 'Git Concepts',
  },
  {
    id: 'git-vs-github',
    title: 'Git vs GitHub (Very Common Confusion)',
    description: 'Clearing up the Git vs GitHub confusion',
    explanation: `Many beginners think Git and GitHub are the same thing — they are not.

Simple explanation:

Git → the tool

GitHub → the platform

Real-life example

Think of:

Git as a camera 📸

GitHub as cloud storage ☁️

You can:

Use Git without GitHub

Save your project history locally on your computer

GitHub:

Stores Git projects online

Allows team collaboration

Acts as a backup if your computer breaks

So:

Git tracks changes

GitHub shares and stores them online`,
    exampleCommand: '',
    objective: 'Understand the difference between Git and GitHub',
    hint: '',
    isPaid: false,
    order: 3,
    category: 'Git Concepts',
  },
  {
    id: 'what-is-repository',
    title: 'What Is a Repository?',
    description: 'Understanding Git repositories',
    explanation: `A repository (repo) is a project folder that Git is watching.

What's inside a repository?

Your project files (HTML, CSS, JS, etc.)

A hidden system that stores:

Change history

Versions

Information about commits

Real-life example

Imagine a notebook:

The pages = your files

The table of contents = Git history

When a folder becomes a repository:

Git starts remembering every important change

The folder becomes "version controlled"

A repository is not just files — it's files plus memory.`,
    exampleCommand: '',
    objective: 'Learn what a Git repository is',
    hint: '',
    isPaid: false,
    order: 4,
    category: 'Git Concepts',
  },
  {
    id: 'git-snapshots',
    title: 'How Git Tracks Changes (Snapshots Explained)',
    description: 'Understanding Git snapshots',
    explanation: `Git does not save changes like Word or Google Docs.

Instead, Git works with snapshots.

What is a snapshot?

A snapshot is a picture of how your project looks at a specific moment.

Real-life example

Imagine taking photos of your room:

Morning → clean

Afternoon → messy

Night → clean again

Each photo shows the full state, not just what changed.

Git works the same way:

Each save (commit) is a full snapshot

Git connects snapshots together as history

This makes Git:

Fast

Reliable

Easy to restore old versions`,
    exampleCommand: '',
    objective: 'Understand how Git tracks changes with snapshots',
    hint: '',
    isPaid: false,
    order: 5,
    category: 'Git Concepts',
  },
  {
    id: 'git-words',
    title: 'Important Git Words (Conceptual Understanding)',
    description: 'Key Git terminology',
    explanation: `Before using commands, you must understand Git's language.

Some key ideas:

Repository → the project

Commit → a saved snapshot

History → timeline of commits

Branch → a separate path of development

Real-life example

Think of a video game:

Save points = commits

Game timeline = history

Alternate story paths = branches

Understanding these words first makes commands feel logical, not scary.`,
    exampleCommand: '',
    objective: 'Learn essential Git terminology',
    hint: '',
    isPaid: false,
    order: 6,
    category: 'Git Concepts',
  },
  {
    id: 'help',
    title: 'Get Help in Git',
    description: 'Learn how to access Git help and documentation',
    explanation:
      "The 'git help' command shows documentation for Git commands. You can use it to understand how a command works, its options, and examples. It is very useful when you are stuck or learning Git.",
    exampleCommand: 'git help',
    objective: 'Learn how to access Git documentation',
    hint: "Try 'git help status' to see help for a specific command",
    completionPattern: '^git help$',
    isPaid: false,
    order: 7,
    category: 'Getting Started',
  },
  {
    id: 'version',
    title: 'Check Git Version',
    description: 'Verify that Git is installed on your system',
    explanation:
      "The 'git version' command shows the currently installed Git version. This helps you confirm that Git is installed and check which version you are using.",
    exampleCommand: 'git version or git -v',
    objective: 'Check the installed Git version',
    hint: 'If Git is installed correctly, it will show a version number',
    isPaid: false,
    order: 8,
    category: 'Getting Started',
  },
  {
    id: 'config',
    title: 'Configure Git User',
    description: 'Set your Git username and email',
    explanation:
      "The 'git config --global' command sets your username and email for all Git repositories on your computer. Git uses this information to identify who made each commit.",
    exampleCommand:
      'git config --global user.name "Your Name"\n' +
      'git config --global user.email "you@example.com"',
    objective: 'Configure Git user identity',
    hint: 'Use your real name and a valid email address',
    isPaid: false,
    order: 9,
    category: 'Getting Started',
  },

  {
    id: 'init',
    title: 'Start a New Repository',
    description: 'Create a new Git repository locally',
    explanation:
      "The 'git init' command creates a new Git repository in your current directory. It creates a hidden .git folder that stores all the version control information.",
    exampleCommand: 'git init',
    objective: 'Initialize a new Git repository',
    hint: 'Run this command inside your project folder',
    isPaid: false,
    order: 10,
    category: 'Repository Management',
  },

  {
    id: 'clone',
    title: 'Clone a Repository',
    description: 'Copy an existing repository from a remote source',
    explanation:
      "The 'git clone' command downloads a copy of an existing repository from a remote source like GitHub. It includes all files, history, and branches.",
    exampleCommand: 'git clone https://github.com/user/repo.git',
    objective: 'Clone a remote repository',
    hint: 'Replace the URL with a real repository link',
    isPaid: false,
    order: 11,
    category: 'Repository Management',
  },

  {
    id: 'status',
    title: 'Check Repository Status',
    description: 'See the current state of your files',
    explanation:
      "The 'git status' command shows which files are modified, staged, or untracked. It helps you understand what is happening in your repository before committing.",
    exampleCommand: 'git status',
    objective: 'Understand the current state of your repository',
    hint: 'Run this command often to stay aware of changes',
    isPaid: false,
    order: 12,
    category: 'Working with Changes',
  },

  {
    id: 'add',
    title: 'Stage Changes',
    description: 'Prepare files for commit',
    explanation:
      "The 'git add' command stages changes so they can be included in the next commit. You can add specific files or all changes at once.",
    exampleCommand: 'git add .',
    objective: 'Stage files for committing',
    hint: "Use 'git add .' to stage all changes",
    isPaid: false,
    order: 13,
    category: 'Working with Changes',
  },
  {
    id: 'commit',
    title: 'Commit Changes',
    description: 'Save your changes with a message',
    explanation:
      "The 'git commit' command saves staged changes to the repository history. Each commit includes a message that explains what was changed.",
    exampleCommand: 'git commit -m "Initial commit"',
    objective: 'Create a commit with a message',
    hint: 'Write clear and meaningful commit messages',
    isPaid: false,
    order: 14,
    category: 'Working with Changes',
  },
  {
    id: 'push',
    title: 'Push Changes to Remote',
    description: 'Upload commits to a remote repository',
    explanation:
      "The 'git push' command sends your local commits to a remote repository like GitHub. This allows others to see your changes.",
    exampleCommand: 'git push origin main',
    objective: 'Push local commits to a remote repository',
    hint: 'Make sure you have a remote repository set',
    isPaid: false,
    order: 15,
    category: 'Remote Collaboration',
  },
  {
    id: 'pull',
    title: 'Pull Updates from Remote',
    description: 'Download and merge remote changes',
    explanation:
      "The 'git pull' command downloads new changes from a remote repository and merges them into your current branch.",
    exampleCommand: 'git pull origin main',
    objective: 'Update your local repository with remote changes',
    hint: 'Pull often to stay up to date with the team',
    isPaid: false,
    order: 16,
    category: 'Remote Collaboration',
  },
];
