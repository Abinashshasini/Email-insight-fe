import { AppShell } from '@/components/layout/AppShell'
import { mockTimelineEvents } from '@/lib/mock-data'
import { InsightType } from '@/types'
import { Plane, CreditCard, Film, Package, Hotel, ShoppingBag, AlertCircle } from 'lucide-react'

const typeIcon: Record<InsightType, React.ReactNode> = {
  flight:   <Plane size={14} className="text-blue-400" />,
  finance:  <CreditCard size={14} className="text-amber-400" />,
  movie:    <Film size={14} className="text-purple-400" />,
  delivery: <Package size={14} className="text-green-400" />,
  hotel:    <Hotel size={14} className="text-teal-400" />,
  shopping: <ShoppingBag size={14} className="text-orange-400" />,
  social:   <span className="text-[12px] text-gray-400 leading-none">@</span>,
  promo:    <span className="text-[12px] text-gray-500 leading-none">%</span>,
}

const dotColor: Record<InsightType, string> = {
  flight:   'bg-blue-400',
  finance:  'bg-amber-400',
  movie:    'bg-purple-400',
  delivery: 'bg-green-400',
  hotel:    'bg-teal-400',
  shopping: 'bg-orange-400',
  social:   'bg-gray-400',
  promo:    'bg-gray-500',
}

function groupByBucket(events: typeof mockTimelineEvents) {
  const map = new Map<string, typeof mockTimelineEvents>()
  for (const e of events) {
    if (!map.has(e.bucket)) map.set(e.bucket, [])
    map.get(e.bucket)!.push(e)
  }
  return map
}

const upcoming = mockTimelineEvents.filter(e => !e.past)
const urgentCount = upcoming.filter(e => e.urgent).length

export default function TimelinePage() {
  const grouped = groupByBucket(mockTimelineEvents)

  return (
    <AppShell title="Timeline">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-[22px] font-semibold text-[#111111] dark:text-[#F2F2F2] tracking-[-0.02em]">
          Your schedule
        </h1>
        <p className="text-[14px] text-[#888888] dark:text-[#8A8A8A] mt-1">
          {upcoming.length} upcoming events
          {urgentCount > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 text-[#EF4444]">
              <AlertCircle size={12} />
              {urgentCount} need{urgentCount === 1 ? 's' : ''} attention
            </span>
          )}
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-2xl">
        {Array.from(grouped.entries()).map(([bucket, events], bucketIdx) => {
          const isPastBucket = events.every(e => e.past)
          return (
            <div key={bucket} className={`mb-8 ${isPastBucket ? 'opacity-50' : ''}`}>

              {/* Bucket label */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[11px] font-mono uppercase tracking-[0.12em] font-semibold
                  ${isPastBucket
                    ? 'text-[#AAAAAA] dark:text-[#555555]'
                    : 'text-[#888888] dark:text-[#8A8A8A]'
                  }`}
                >
                  {bucket}
                </span>
                <div className="flex-1 border-t border-[#E4E4E0] dark:border-[#1F1F1F]" />
                {!isPastBucket && (
                  <span className="text-[11px] font-mono text-[#AAAAAA] dark:text-[#555555]">
                    {events.length} event{events.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Events with vertical rail */}
              <div className="relative ml-3">
                {/* Vertical connecting line */}
                <div className="absolute left-[7px] top-3 bottom-3 w-px bg-[#E4E4E0] dark:bg-[#1F1F1F]" />

                <div className="space-y-2">
                  {events.map((event) => (
                    <div key={event.id} className="relative flex items-start gap-5">

                      {/* Timeline dot */}
                      <div className="relative z-10 shrink-0 mt-3.5">
                        {event.urgent ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] ring-2 ring-[#EF4444]/20 dark:ring-[#EF4444]/30" />
                        ) : (
                          <div className={`w-3.5 h-3.5 rounded-full ${
                            event.past
                              ? 'bg-[#E4E4E0] dark:bg-[#2E2E2E]'
                              : dotColor[event.type as InsightType] ?? 'bg-gray-400'
                          }`} />
                        )}
                      </div>

                      {/* Event card */}
                      <div
                        className={`flex-1 mb-1 rounded-xl border transition-colors cursor-pointer
                          ${event.urgent
                            ? 'bg-[#FFF5F5] dark:bg-[#1A0A0A] border-[#FCA5A5]/40 dark:border-[#EF4444]/20 hover:border-[#FCA5A5]/70 dark:hover:border-[#EF4444]/40'
                            : 'bg-white dark:bg-[#111111] border-[#E4E4E0] dark:border-[#1F1F1F] hover:border-[#DDDDD8] dark:hover:border-[#2E2E2E]'
                          }`}
                      >
                        <div className="px-4 py-3.5">
                          {/* Top row: icon + title + time */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="shrink-0 mt-0.5">
                                {typeIcon[event.type as InsightType]}
                              </div>
                              <p className={`text-[14px] font-semibold leading-snug tracking-[-0.01em]
                                ${event.past ? 'text-[#888888] dark:text-[#555555]' : 'text-[#111111] dark:text-[#F2F2F2]'}`}
                              >
                                {event.title}
                              </p>
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="text-[12px] font-mono text-[#888888] dark:text-[#8A8A8A]">
                                {event.time}
                              </p>
                              {event.countdown && (
                                <p className={`text-[11px] font-mono mt-0.5 ${
                                  event.urgent ? 'text-[#EF4444]' : 'text-[#AAAAAA] dark:text-[#555555]'
                                }`}>
                                  {event.countdown}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Subtitle */}
                          <p className="mt-1 ml-[26px] text-[12px] text-[#888888] dark:text-[#8A8A8A]">
                            {event.subtitle}
                          </p>

                          {/* Detail callout for urgent */}
                          {event.detail && event.urgent && (
                            <p className="mt-2.5 ml-[26px] text-[12px] text-[#EF4444]/80 dark:text-[#EF4444]/70 leading-relaxed">
                              {event.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </AppShell>
  )
}
