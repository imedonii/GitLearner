import { CheckCircle2 } from 'lucide-react'

export const PlaygroundFeature = ({ text }: { text: string }) => {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
      <span className="text-slate-300">{text}</span>
    </div>
  )
}
