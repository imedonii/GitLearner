export const lessons: any[] = [
  {
    id: 'help',
    title: 'Get Help in Git',
    description: 'Learn how to access Git help and documentation',
    explanation:
      "The 'git help' command shows documentation for Git commands. You can use it to understand how a command works, its options, and examples. It is very useful when you are stuck or learning Git.",
    exampleCommand: 'git help',
    objective: 'Learn how to access Git documentation',
    hint: "Try 'git help status' to see help for a specific command",
    isPaid: false,
    order: 1,
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
    order: 2,
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
    order: 3,
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
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
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
    order: 9,
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
    order: 10,
  },
];
