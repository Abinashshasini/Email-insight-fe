interface MetricCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
  trend?: string
}

export function MetricCard({ label, value, sub, accent, trend }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-xl p-5 hover:border-[#DDDDD8] dark:hover:border-[#2E2E2E] transition-colors">
      <p className="text-[12px] font-medium text-[#888888] dark:text-[#8A8A8A] mb-3 tracking-wide">
        {label}
      </p>
      <p
        className={`font-mono text-[36px] font-light leading-none tracking-[-0.03em] mb-2
          ${accent ? 'text-[#111111] dark:text-[#F2F2F2] font-medium' : 'text-[#111111] dark:text-[#F2F2F2]'}`}
      >
        {value}
      </p>
      {sub && (
        <p className="text-[12px] text-[#888888] dark:text-[#8A8A8A]">{sub}</p>
      )}
      {trend && (
        <p className="mt-1 text-[11px] font-mono text-[#AAAAAA] dark:text-[#555555]">{trend}</p>
      )}
    </div>
  )
}
