import { GitState, GitFile } from '../GitSimulator/gitSimulator'

/**
 * Creates a new untracked file
 */
export function createUntrackedFile(fileName: string): GitFile {
  return {
    id: Date.now().toString(),
    name: fileName,
    tracked: false,
    modified: false,
    staged: false,
    content: '',
  }
}

/**
 * Marks a tracked file as modified (only if it's tracked)
 */
export function markFileAsModified(
  gitState: GitState,
  fileName: string,
  content: string
): GitState {
  // Check if file is tracked
  const isTracked = gitState.trackedFiles.includes(fileName)

  if (!isTracked) {
    // Untracked files don't become modified when edited
    return gitState
  }

  // Check if file is already in working directory or staging area
  const inWorking = gitState.workingDirectory.some((f) => f.name === fileName)
  const inStaging = gitState.stagingArea.some((f) => f.name === fileName)

  if (inWorking || inStaging) {
    // File is already marked as modified or staged, just update content
    return {
      ...gitState,
      workingDirectory: gitState.workingDirectory.map((f) =>
        f.name === fileName ? { ...f, content } : f
      ),
      stagingArea: gitState.stagingArea.map((f) =>
        f.name === fileName ? { ...f, content } : f
      ),
    }
  }

  // File is tracked and clean, mark as modified
  const modifiedFile: GitFile = {
    id: Date.now().toString(),
    name: fileName,
    tracked: true,
    modified: true,
    staged: false,
    content,
  }

  return {
    ...gitState,
    workingDirectory: [...gitState.workingDirectory, modifiedFile],
  }
}

/**
 * Gets the visual status of a file for display purposes
 */
export function getFileStatus(
  gitState: GitState,
  fileName: string
): 'untracked' | 'modified' | 'staged' | 'clean' {
  // Check if in staging area
  const inStaging = gitState.stagingArea.some((f) => f.name === fileName)
  if (inStaging) return 'staged'

  // Check if in working directory
  const fileInWorking = gitState.workingDirectory.find(
    (f) => f.name === fileName
  )
  if (fileInWorking) {
    return fileInWorking.tracked ? 'modified' : 'untracked'
  }

  // Check if tracked (committed before)
  const isTracked = gitState.trackedFiles.includes(fileName)
  if (isTracked) return 'clean'

  return 'untracked'
}

/**
 * Adds a file to working directory (for touch command)
 */
export function addFileToWorkingDirectory(
  gitState: GitState,
  fileName: string
): GitState {
  // Check if file already exists
  const inWorking = gitState.workingDirectory.some((f) => f.name === fileName)
  const inStaging = gitState.stagingArea.some((f) => f.name === fileName)

  if (inWorking || inStaging) {
    // File already exists, don't add again
    return gitState
  }

  // Add as untracked file
  const newFile = createUntrackedFile(fileName)

  return {
    ...gitState,
    workingDirectory: [...gitState.workingDirectory, newFile],
  }
}
