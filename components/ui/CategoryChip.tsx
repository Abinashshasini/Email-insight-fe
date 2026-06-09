import { InsightType } from '@/types'
import { cn } from '@/lib/utils'

const styles: Record<InsightType, string> = {
  flight:   'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  finance:  'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  movie:    'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
  delivery: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400',
  hotel:    'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
  shopping: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
  social:   'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  promo:    'bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-500',
}

interface CategoryChipProps {
  type: InsightType
}

export function CategoryChip({ type }: CategoryChipProps) {
  return (
    <span
      className={cn(
        'shrink-0 px-2 py-0.5 text-[10px] font-mono rounded uppercase tracking-wide',
        styles[type] ?? styles.promo
      )}
    >
      {type}
    </span>
  )
}
