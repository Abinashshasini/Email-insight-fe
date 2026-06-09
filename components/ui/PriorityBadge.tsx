import { cn } from '@/lib/utils'

interface PriorityBadgeProps {
  score: number
}

export function PriorityBadge({ score }: PriorityBadgeProps) {
  const cls =
    score >= 90
      ? 'text-[#111111] dark:text-[#F2F2F2] bg-[#E8E8E5] dark:bg-[#222222] font-semibold'
      : score >= 60
      ? 'text-amber-500 bg-amber-950/30'
      : score >= 20
      ? 'text-[#888888] dark:text-[#8A8A8A] bg-transparent'
      : 'text-[#AAAAAA] dark:text-[#4A4A4A] bg-transparent opacity-60'

  return (
    <span className={cn('font-mono text-[12px] px-2 py-0.5 rounded', cls)}>
      {score}
    </span>
  )
}
