import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Import your lessons array
import { lessons } from './lessons-data'; // adjust path if needed

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  // 1️⃣ Seed Levels
  const levelsData = [
    { name: 'New here', slug: 'new_here' },
    { name: 'I know things', slug: 'i_know_things' },
    { name: 'Pro', slug: 'pro_level' },
  ];

  await prisma.level.createMany({
    data: levelsData,
    skipDuplicates: true,
  });

  console.log('✅ Seeded levels!');

  // 2️⃣ Fetch Levels to get IDs
  const levels = await prisma.level.findMany();

  // Helper to get levelId by slug
  const getLevelId = (slug: string) => {
    const level = levels.find((l) => l.slug === slug);
    if (!level) throw new Error(`Level with slug "${slug}" not found`);
    return level.id;
  };

  // 3️⃣ Seed Leasons from lessons array
  for (const lesson of lessons) {
    // Assign levelId based on some logic, e.g. beginner → 'new_here', intermediate → 'i_know_things', pro → 'pro_level'
    // Here we'll map by index as an example
    let levelSlug = 'new_here';
    if (lesson.id === 'branch' || lesson.id === 'checkout')
      levelSlug = 'i_know_things';
    if (lesson.id === 'rebase' || lesson.id === 'merge')
      levelSlug = 'pro_level';

    await prisma.leasons.upsert({
      where: { slug: lesson.id }, // use your `slug` column
      update: {},
      create: {
        slug: lesson.id,
        title: lesson.title,
        description: lesson.description,
        explanation: lesson.explanation,
        exampleCommand: lesson.exampleCommand,
        hint: lesson.hint,
        objective: lesson.objective,
        levelId: getLevelId(levelSlug),
      },
    });
  }

  console.log('✅ Seeded lessons!');

  // 4️⃣ Seed Git Command Categories
  const categoriesData = [
    { name: 'getting-started', label: 'Getting Started', icon: 'Book' },
    { name: 'repository-setup', label: 'Repository Setup', icon: 'FileCode' },
    { name: 'staging-committing', label: 'Staging & Committing', icon: 'Terminal' },
    { name: 'branching-merging', label: 'Branching & Merging', icon: 'GitBranch' },
    { name: 'remote-repos', label: 'Remote Repositories', icon: 'GitBranch' },
    { name: 'undo-fix', label: 'Undo & Fix', icon: 'RotateCcw' },
    { name: 'inspection-logs', label: 'Inspection & Logs', icon: 'Eye' },
    { name: 'configuration', label: 'Configuration', icon: 'Settings' },
    { name: 'advanced', label: 'Advanced Tips', icon: 'Lightbulb' },
  ];

  await prisma.gitCommandCategory.createMany({
    data: categoriesData,
    skipDuplicates: true,
  });

  console.log('✅ Seeded git command categories!');

  // 5️⃣ Fetch Categories to get IDs
  const categories = await prisma.gitCommandCategory.findMany();

  const getCategoryId = (name: string) => {
    const category = categories.find((c) => c.name === name);
    if (!category) throw new Error(`Category with name "${name}" not found`);
    return category.id;
  };

  // 6️⃣ Seed Git Commands
  const commandsData = [
    // Getting Started
    {
      name: 'git --version',
      syntax: 'git --version',
      description: 'Check which version of Git is installed on your system.',
      whenToUse: 'When you want to verify Git is installed or check your Git version.',
      example: 'git --version\n# Output: git version 2.40.0',
      categoryId: getCategoryId('getting-started'),
      isCommon: false,
    },
    {
      name: 'git help',
      syntax: 'git help <command>',
      description: 'Display help information about Git commands.',
      whenToUse: 'When you need detailed information about a specific Git command.',
      example: 'git help commit\ngit help push',
      categoryId: getCategoryId('getting-started'),
      isCommon: false,
    },
    // Repository Setup
    {
      name: 'git init',
      syntax: 'git init [directory-name]',
      description: 'Initialize a new Git repository in the current or specified directory.',
      whenToUse: 'When starting a new project or converting an existing project to use Git.',
      example: 'git init\n# Or create new directory and initialize\ngit init my-project',
      categoryId: getCategoryId('repository-setup'),
      isCommon: true,
    },
    {
      name: 'git clone',
      syntax: 'git clone <repository-url> [directory-name]',
      description: 'Clone an existing repository from a remote source to your local machine.',
      whenToUse: 'When you want to work on an existing project or contribute to open source.',
      example: 'git clone https://github.com/user/repo.git\ngit clone https://github.com/user/repo.git my-folder',
      categoryId: getCategoryId('repository-setup'),
      isCommon: true,
    },
    // Staging & Committing
    {
      name: 'git status',
      syntax: 'git status',
      description: 'Show the current state of your working directory and staging area.',
      whenToUse: 'Before committing to see which files have been modified, staged, or are untracked.',
      example: 'git status\n# Shows modified, staged, and untracked files',
      categoryId: getCategoryId('staging-committing'),
      isCommon: true,
    },
    {
      name: 'git add',
      syntax: 'git add <file-path>\ngit add .\ngit add -A',
      description: 'Add file changes to the staging area (index) for the next commit.',
      whenToUse: 'After making changes to files and you want to prepare them for a commit.',
      example: 'git add README.md\ngit add .\ngit add -A',
      categoryId: getCategoryId('staging-committing'),
      isCommon: true,
    },
    {
      name: 'git commit',
      syntax: 'git commit -m "message"\ngit commit -am "message"',
      description: 'Record changes to the repository with a descriptive message.',
      whenToUse: 'After staging changes with git add and you\'re ready to save a snapshot.',
      example: 'git commit -m "Add login feature"\ngit commit -am "Fix header bug"',
      categoryId: getCategoryId('staging-committing'),
      isCommon: true,
    },
    {
      name: 'git diff',
      syntax: 'git diff\ngit diff --staged\ngit diff <branch1> <branch2>',
      description: 'Show differences between commits, branches, working directory, and staging area.',
      whenToUse: 'To review what changes have been made before committing or comparing branches.',
      example: 'git diff\ngit diff --staged\ngit diff main feature-branch',
      categoryId: getCategoryId('staging-committing'),
      isCommon: true,
    },
    // Branching & Merging
    {
      name: 'git branch',
      syntax: 'git branch\ngit branch <branch-name>\ngit branch -d <branch-name>',
      description: 'List, create, or delete branches in your repository.',
      whenToUse: 'To manage branches, create feature branches, or clean up merged branches.',
      example: 'git branch\ngit branch feature-login\ngit branch -d old-feature',
      categoryId: getCategoryId('branching-merging'),
      isCommon: true,
    },
    {
      name: 'git checkout',
      syntax: 'git checkout <branch-name>\ngit checkout -b <new-branch>',
      description: 'Switch to another branch or create and switch to a new branch.',
      whenToUse: 'When you want to work on a different branch or start a new feature.',
      example: 'git checkout main\ngit checkout -b feature-payment',
      categoryId: getCategoryId('branching-merging'),
      isCommon: true,
    },
    {
      name: 'git switch',
      syntax: 'git switch <branch-name>\ngit switch -c <new-branch>',
      description: 'Modern alternative to checkout for switching branches.',
      whenToUse: 'Preferred over checkout for switching branches (clearer intent).',
      example: 'git switch main\ngit switch -c feature-navbar',
      categoryId: getCategoryId('branching-merging'),
      isCommon: true,
    },
    {
      name: 'git merge',
      syntax: 'git merge <branch-name>\ngit merge --no-ff <branch-name>',
      description: 'Merge changes from one branch into the current branch.',
      whenToUse: 'When you want to integrate changes from a feature branch into main.',
      example: 'git checkout main\ngit merge feature-login',
      categoryId: getCategoryId('branching-merging'),
      isCommon: true,
    },
    // Remote Repositories
    {
      name: 'git remote',
      syntax: 'git remote -v\ngit remote add <name> <url>\ngit remote remove <name>',
      description: 'Manage connections to remote repositories.',
      whenToUse: 'To view, add, or remove remote repository connections.',
      example: 'git remote -v\ngit remote add origin https://github.com/user/repo.git\ngit remote remove old-origin',
      categoryId: getCategoryId('remote-repos'),
      isCommon: true,
    },
    {
      name: 'git fetch',
      syntax: 'git fetch\ngit fetch <remote>\ngit fetch <remote> <branch>',
      description: 'Download objects and refs from a remote repository without merging.',
      whenToUse: 'To see what others have pushed without affecting your working directory.',
      example: 'git fetch origin\ngit fetch origin main',
      categoryId: getCategoryId('remote-repos'),
      isCommon: true,
    },
    {
      name: 'git pull',
      syntax: 'git pull\ngit pull <remote> <branch>\ngit pull --rebase',
      description: 'Fetch from remote and merge into the current branch (fetch + merge).',
      whenToUse: 'To update your local branch with the latest changes from remote.',
      example: 'git pull origin main\ngit pull --rebase origin main',
      categoryId: getCategoryId('remote-repos'),
      isCommon: true,
    },
    {
      name: 'git push',
      syntax: 'git push\ngit push <remote> <branch>\ngit push -u origin <branch>',
      description: 'Upload local commits to a remote repository.',
      whenToUse: 'After committing changes locally and you want to share them with others.',
      example: 'git push origin main\ngit push -u origin feature-branch',
      categoryId: getCategoryId('remote-repos'),
      isCommon: true,
    },
    // Undo & Fix
    {
      name: 'git restore',
      syntax: 'git restore <file>\ngit restore --staged <file>',
      description: 'Restore working tree files or unstage changes.',
      whenToUse: 'To discard changes in working directory or remove files from staging area.',
      example: 'git restore README.md\ngit restore --staged style.css',
      categoryId: getCategoryId('undo-fix'),
      isCommon: true,
    },
    {
      name: 'git reset',
      syntax: 'git reset <file>\ngit reset --soft HEAD~1\ngit reset --hard HEAD~1',
      description: 'Reset current HEAD to a specified state.',
      whenToUse: 'To undo commits or unstage files. Use with caution!',
      example: 'git reset HEAD~1\ngit reset --soft HEAD~1\ngit reset --hard origin/main',
      categoryId: getCategoryId('undo-fix'),
      isCommon: false,
    },
    {
      name: 'git revert',
      syntax: 'git revert <commit-hash>',
      description: 'Create a new commit that undoes changes from a previous commit.',
      whenToUse: 'To safely undo a commit without rewriting history (safe for shared branches).',
      example: 'git revert a1b2c3d\ngit revert HEAD',
      categoryId: getCategoryId('undo-fix'),
      isCommon: true,
    },
    {
      name: 'git stash',
      syntax: 'git stash\ngit stash pop\ngit stash list',
      description: 'Temporarily save changes that you don\'t want to commit yet.',
      whenToUse: 'When you need to switch branches but aren\'t ready to commit current changes.',
      example: 'git stash\ngit stash pop\ngit stash list',
      categoryId: getCategoryId('undo-fix'),
      isCommon: true,
    },
    // Inspection & Logs
    {
      name: 'git log',
      syntax: 'git log\ngit log --oneline\ngit log --graph --all',
      description: 'Show commit history for the current branch.',
      whenToUse: 'To review project history, find commit hashes, or see what changed.',
      example: 'git log\ngit log --oneline --graph --all\ngit log --author="John"',
      categoryId: getCategoryId('inspection-logs'),
      isCommon: true,
    },
    {
      name: 'git show',
      syntax: 'git show <commit-hash>',
      description: 'Show detailed information about a specific commit.',
      whenToUse: 'When you want to see what changed in a particular commit.',
      example: 'git show a1b2c3d\ngit show HEAD~2',
      categoryId: getCategoryId('inspection-logs'),
      isCommon: false,
    },
    {
      name: 'git blame',
      syntax: 'git blame <file>',
      description: 'Show who last modified each line of a file.',
      whenToUse: 'To find out who wrote or last changed a specific line of code.',
      example: 'git blame README.md\ngit blame -L 10,20 app.js',
      categoryId: getCategoryId('inspection-logs'),
      isCommon: false,
    },
    // Configuration
    {
      name: 'git config',
      syntax: 'git config --global user.name "Name"\ngit config --global user.email "email@example.com"',
      description: 'Set configuration values for your Git installation.',
      whenToUse: 'When setting up Git for the first time or changing user settings.',
      example: 'git config --global user.name "John Doe"\ngit config --global user.email "john@example.com"\ngit config --list',
      categoryId: getCategoryId('configuration'),
      isCommon: true,
    },
    // Advanced
    {
      name: 'git rebase',
      syntax: 'git rebase <branch>\ngit rebase -i HEAD~3',
      description: 'Reapply commits on top of another base commit (rewrite history).',
      whenToUse: 'To create a cleaner commit history or update feature branch with main.',
      example: 'git rebase main\ngit rebase -i HEAD~3',
      categoryId: getCategoryId('advanced'),
      isCommon: false,
    },
    {
      name: 'git cherry-pick',
      syntax: 'git cherry-pick <commit-hash>',
      description: 'Apply changes from specific commits to the current branch.',
      whenToUse: 'When you want to apply a specific commit from another branch.',
      example: 'git cherry-pick a1b2c3d',
      categoryId: getCategoryId('advanced'),
      isCommon: false,
    },
    {
      name: 'git tag',
      syntax: 'git tag <tag-name>\ngit tag -a v1.0 -m "Version 1.0"',
      description: 'Create, list, or delete tags (version markers).',
      whenToUse: 'To mark specific points in history as important (releases, versions).',
      example: 'git tag v1.0.0\ngit tag -a v1.0.0 -m "Release version 1.0"',
      categoryId: getCategoryId('advanced'),
      isCommon: false,
    },
  ];

  for (const command of commandsData) {
    await prisma.gitCommand.upsert({
      where: { name: command.name },
      update: {},
      create: command,
    });
  }

  console.log('✅ Seeded git commands!');

  // 7️⃣ Seed Tips
  const tipsData = [
    {
      type: 'warning' as const,
      title: 'Be Careful with Force Push',
      description: 'Using git push --force can overwrite others\' work. Use --force-with-lease instead, which is safer.',
    },
    {
      type: 'pro' as const,
      title: 'Commit Often, Push When Done',
      description: 'Make small, frequent commits locally. Push to remote when your feature is complete and tested.',
    },
    {
      type: 'do' as const,
      title: 'Write Clear Commit Messages',
      description: 'Use imperative mood: \'Add feature\' not \'Added feature\'. Be specific about what changed and why.',
    },
    {
      type: 'dont' as const,
      title: 'Don\'t Commit Sensitive Data',
      description: 'Never commit passwords, API keys, or secrets. Use .gitignore and environment variables instead.',
    },
    {
      type: 'pro' as const,
      title: 'Use .gitignore Properly',
      description: 'Add node_modules, .env, build files, and IDE configs to .gitignore to keep your repo clean.',
    },
    {
      type: 'warning' as const,
      title: 'Avoid Rebasing Public Branches',
      description: 'Never rebase commits that have been pushed to shared/public branches. Use merge instead.',
    },
    {
      type: 'do' as const,
      title: 'Pull Before You Push',
      description: 'Always pull the latest changes before pushing to avoid conflicts and keep history clean.',
    },
    {
      type: 'pro' as const,
      title: 'Use Branches for Features',
      description: 'Create a new branch for each feature or bug fix. Keep main/master stable and deployable.',
    },
    {
      type: 'dont' as const,
      title: 'Don\'t Modify Pushed Commits',
      description: 'Once pushed, avoid amending or resetting commits. It causes issues for collaborators.',
    },
    {
      type: 'pro' as const,
      title: 'Learn to Read Git Log',
      description: 'Use git log --oneline --graph --all to visualize your branch structure and commit history.',
    },
  ];

  await prisma.tip.createMany({
    data: tipsData,
    skipDuplicates: true,
  });

  console.log('✅ Seeded tips!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
