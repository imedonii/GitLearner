export {
  executeGitCommand,
  type GitState,
  initialGitState,
  type GitFile,
} from './GitSimulator/gitSimulator'
export {
  type FileSystem,
  type FileNode,
  createInitialFileSystem,
  getFileTree,
  updateFileContent,
  executeShellCommand,
} from './FileSystemSimulator/fileSystemSimulator'
export {
  addFileToWorkingDirectory,
  markFileAsModified,
} from './GitFileManager/gitFileManager'
