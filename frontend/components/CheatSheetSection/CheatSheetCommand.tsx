import { Copy } from 'lucide-react'

export const CheatSheetCommand = ({
  command,
  description,
}: {
  command: string
  description: string
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors">
      <div>
        <code className="text-emerald-400 text-sm">{command}</code>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </div>
      <Copy className="w-4 h-4 text-slate-500 cursor-pointer hover:text-emerald-400" />
    </div>
  )
}
