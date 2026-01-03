export const AudienceCard = ({
  emoji,
  title,
  description,
}: {
  emoji: string
  title: string
  description: string
}) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center hover:border-emerald-500/30 transition-colors">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}
