import { AppShell } from '@/components/layout/AppShell'
import { InsightCard } from '@/components/insights/InsightCard'
import { mockInsights } from '@/lib/mock-data'
import { Insight } from '@/types'

export default function InsightsPage() {
  return (
    <AppShell title="Insights">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[13px] text-[#888888] dark:text-[#8A8A8A]">
          {mockInsights.length} extracted insights
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mockInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight as Insight} />
        ))}
      </div>
    </AppShell>
  )
}
