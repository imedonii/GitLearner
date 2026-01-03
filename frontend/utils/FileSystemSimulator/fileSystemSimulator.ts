export interface FileNode {
  name: string
  type: 'file' | 'directory'
  content: string
  modified: boolean
  path: string
  children?: FileNode[] // For directory hierarchy
}

export interface FileSystem {
  currentPath: string
  files: Map<string, FileNode>
  directories: Set<string>
}

export function createInitialFileSystem(): FileSystem {
  return {
    currentPath: '~',
    files: new Map(),
    directories: new Set(['~', '~/projects']),
  }
}

export function executeShellCommand(
  command: string,
  fileSystem: FileSystem
): { output: string; newFileSystem: FileSystem } {
  const parts = command.trim().split(/\s+/)
  const cmd = parts[0]
  const args = parts.slice(1)

  let output = ''
  let newFileSystem = { ...fileSystem }

  switch (cmd) {
    case 'pwd':
      output = fileSystem.currentPath
      break

    case 'ls':
    case 'dir':
      const currentDir = fileSystem.currentPath
      const items: string[] = []

      // Add directories
      fileSystem.directories.forEach((dir) => {
        if (
          dir.startsWith(currentDir + '/') &&
          !dir.substring(currentDir.length + 1).includes('/')
        ) {
          const dirName = dir.substring(currentDir.length + 1)
          items.push(`\x1b[34m${dirName}/\x1b[0m`)
        }
      })

      // Add files
      fileSystem.files.forEach((file, path) => {
        if (
          path.startsWith(currentDir + '/') &&
          !path.substring(currentDir.length + 1).includes('/')
        ) {
          const color = file.modified ? '\x1b[33m' : '\x1b[0m'
          items.push(`${color}${file.name}\x1b[0m`)
        }
      })

      output = items.length > 0 ? items.join('  ') : ''
      break

    case 'cd':
      if (args.length === 0) {
        newFileSystem.currentPath = '~'
      } else {
        const target = args[0]
        let newPath: string

        if (target === '..') {
          const pathParts = fileSystem.currentPath.split('/')
          pathParts.pop()
          newPath = pathParts.length > 0 ? pathParts.join('/') : '~'
        } else if (target.startsWith('/')) {
          newPath = target
        } else if (target === '~') {
          newPath = '~'
        } else {
          newPath =
            fileSystem.currentPath === '~'
              ? `~/${target}`
              : `${fileSystem.currentPath}/${target}`
        }

        if (fileSystem.directories.has(newPath)) {
          newFileSystem.currentPath = newPath
        } else {
          output = `cd: ${target}: No such file or directory`
        }
      }
      break

    case 'mkdir':
      if (args.length === 0) {
        output = 'mkdir: missing operand'
      } else {
        const dirName = args[0]
        const newDirPath =
          fileSystem.currentPath === '~'
            ? `~/${dirName}`
            : `${fileSystem.currentPath}/${dirName}`

        if (fileSystem.directories.has(newDirPath)) {
          output = `mkdir: cannot create directory '${dirName}': File exists`
        } else {
          newFileSystem.directories = new Set(fileSystem.directories)
          newFileSystem.directories.add(newDirPath)
        }
      }
      break

    case 'touch':
      if (args.length === 0) {
        output = 'touch: missing file operand'
      } else {
        const fileName = args[0]
        const filePath =
          fileSystem.currentPath === '~'
            ? `~/${fileName}`
            : `${fileSystem.currentPath}/${fileName}`

        newFileSystem.files = new Map(fileSystem.files)
        if (!newFileSystem.files.has(filePath)) {
          newFileSystem.files.set(filePath, {
            name: fileName,
            type: 'file',
            content: '',
            modified: false,
            path: filePath,
          })
        }
      }
      break

    case 'rm':
      if (args.length === 0) {
        output = 'rm: missing operand'
      } else {
        const fileName = args[0]
        const filePath =
          fileSystem.currentPath === '~'
            ? `~/${fileName}`
            : `${fileSystem.currentPath}/${fileName}`

        newFileSystem.files = new Map(fileSystem.files)
        if (newFileSystem.files.has(filePath)) {
          newFileSystem.files.delete(filePath)
        } else {
          output = `rm: cannot remove '${fileName}': No such file or directory`
        }
      }
      break

    case 'clear':
      output = '\x1b[2J\x1b[H' // ANSI clear screen
      break

    default:
      output = `${cmd}: command not found`
  }

  return { output, newFileSystem }
}

export function getFileTree(fileSystem: FileSystem): FileNode[] {
  const rootChildren: FileNode[] = []
  const dirMap = new Map<string, FileNode>()

  // Create directory nodes
  const sortedDirs = Array.from(fileSystem.directories).sort()
  sortedDirs.forEach((dirPath) => {
    if (dirPath === '~') return

    const parts = dirPath.split('/').filter((p) => p !== '~')
    const name = parts[parts.length - 1]

    const dirNode: FileNode = {
      name,
      type: 'directory',
      content: '',
      modified: false,
      path: dirPath,
      children: [],
    }

    dirMap.set(dirPath, dirNode)
  })

  // Build hierarchy for directories
  sortedDirs.forEach((dirPath) => {
    if (dirPath === '~') return

    const dirNode = dirMap.get(dirPath)
    if (!dirNode) return

    // Find parent directory
    const parts = dirPath.split('/')
    if (parts.length === 2 && parts[0] === '~') {
      // Top-level directory (direct child of ~)
      rootChildren.push(dirNode)
    } else {
      // Nested directory - find parent
      const parentPath = parts.slice(0, -1).join('/')
      const parentNode = dirMap.get(parentPath)
      if (parentNode && parentNode.children) {
        parentNode.children.push(dirNode)
      }
    }
  })

  // Add files to their respective directories
  fileSystem.files.forEach((file) => {
    const parts = file.path.split('/')

    if (parts.length === 2 && parts[0] === '~') {
      // File in root directory
      rootChildren.push(file)
    } else {
      // File in subdirectory
      const parentPath = parts.slice(0, -1).join('/')
      const parentNode = dirMap.get(parentPath)
      if (parentNode && parentNode.children) {
        parentNode.children.push(file)
      }
    }
  })

  return rootChildren
}

export function updateFileContent(
  fileSystem: FileSystem,
  filePath: string,
  content: string
): FileSystem {
  const newFileSystem = { ...fileSystem }
  newFileSystem.files = new Map(fileSystem.files)

  const file = newFileSystem.files.get(filePath)
  if (file) {
    newFileSystem.files.set(filePath, {
      ...file,
      content,
      modified: true,
    })
  }

  return newFileSystem
}
