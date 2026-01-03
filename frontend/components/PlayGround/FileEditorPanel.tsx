import { useState, useEffect } from 'react'
import { Save, X } from 'lucide-react'
import { FileNode } from '../../utils/FileSystemSimulator/fileSystemSimulator'
import { Button } from '../UI/button'

interface FileEditorPanelProps {
  file: FileNode | null
  onSave: (content: string) => void
  onClose: () => void
}

export default function FileEditorPanel({
  file,
  onSave,
  onClose,
}: FileEditorPanelProps) {
  const [content, setContent] = useState('')

  useEffect(() => {
    if (file) {
      setContent(file.content)
    }
  }, [file])

  if (!file) {
    return (
      <div className="h-full bg-slate-900/50 rounded-lg border border-slate-700 flex items-center justify-center py-5">
        <div className="text-center text-slate-500">
          <p className="text-sm">Select a file to edit</p>
          <p className="text-xs mt-2">
            or create one with{' '}
            <code className="text-emerald-400">touch filename.txt</code>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-slate-900/50 rounded-lg border border-slate-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{file.name}</span>
          {file.modified && (
            <span className="text-xs text-orange-400">● Modified</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onSave(content)}
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
          <Button
            onClick={onClose}
            size="sm"
            variant="ghost"
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-4 bg-slate-950 text-slate-300 font-mono text-sm outline-none resize-none"
        placeholder="Start typing..."
        spellCheck={false}
      />
    </div>
  )
}
