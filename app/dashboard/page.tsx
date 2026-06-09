import { AppShell } from '@/components/layout/AppShell'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents'
import { RecentInsights } from '@/components/dashboard/RecentInsights'
import { mockMetrics } from '@/lib/mock-data'

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">

      {/* Greeting */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[12px] font-mono text-[#888888] dark:text-[#8A8A8A] uppercase tracking-widest">
            Live
          </span>
        </div>
        <h1 className="text-[28px] font-semibold text-[#111111] dark:text-[#F2F2F2] tracking-[-0.02em] leading-tight">
          Good morning, Abinash.
        </h1>
        <p className="text-[15px] text-[#888888] dark:text-[#8A8A8A] mt-1.5">
          Tuesday, 15 January · 2 flights and 1 bill need your attention today.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Emails scanned"
          value={mockMetrics.totalEmails.toLocaleString()}
          sub="across all time"
        />
        <MetricCard
          label="Insights today"
          value={mockMetrics.todayInsights}
          sub="extracted this morning"
        />
        <MetricCard
          label="Need attention"
          value={mockMetrics.pendingActions}
          sub="flights, bills"
        />
        <MetricCard
          label="Accuracy"
          value={`${mockMetrics.extractionRate}%`}
          sub={`regex ${mockMetrics.regexRate}% · ai ${mockMetrics.aiRate}%`}
          trend="↑ 2% vs last week"
          accent
        />
      </div>

      {/* Upcoming events */}
      <div className="mb-4">
        <UpcomingEvents />
      </div>

      {/* Recent insights */}
      <RecentInsights />

    </AppShell>
  )
}
