type StatBoxProps = {
  label: string
  value: string
  color: string
}

export const StatBox: React.FC<StatBoxProps> = ({
  label,
  value,
  color,
}: StatBoxProps) => {
  const colorClasses: Record<string, string> = {
    blue: 'text-blue-400 bg-blue-400/10',
    emerald: 'text-emerald-400 bg-emerald-400/10',
    purple: 'text-purple-400 bg-purple-400/10',
    orange: 'text-orange-400 bg-orange-400/10',
  }

  return (
    <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div
        className={`text-lg font-bold font-mono ${
          colorClasses[color].split(' ')[0]
        }`}
      >
        {value}
      </div>
    </div>
  )
}
