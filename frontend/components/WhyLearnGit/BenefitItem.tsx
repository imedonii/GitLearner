type BenefitItemProps = {
  icon: React.ReactNode
  text: string
}

export const BenefitItem = ({ icon, text }: BenefitItemProps) => {
  return (
    <div className="flex items-start gap-3 bg-slate-800/30 rounded-lg p-4">
      <div className="mt-0.5">{icon}</div>
      <p className="text-slate-300">{text}</p>
    </div>
  )
}
