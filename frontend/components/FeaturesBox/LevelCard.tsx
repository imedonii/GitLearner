type LevelCardProp = {
  level: string
  color: string
  lessons: string
  description: string
  icon: React.ReactNode
}

export const LevelCard = ({
  level,
  color,
  lessons,
  description,
  icon,
}: LevelCardProp) => {
  const colorClasses = {
    emerald: 'border-emerald-500/30 bg-emerald-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
  }

  return (
    <div
      className={`border rounded-lg p-6 ${
        colorClasses[color as keyof typeof colorClasses]
      }`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{level}</h3>
      <p className="text-sm text-slate-400 mb-3">{lessons}</p>
      <p className="text-slate-300">{description}</p>
    </div>
  )
}
