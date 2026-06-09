import Link from 'next/link'
import { mockInsights } from '@/lib/mock-data'
import { CategoryChip } from '@/components/ui/CategoryChip'
import { InsightType } from '@/types'
import { ArrowRight } from 'lucide-react'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'just now'
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function extractedValue(type: InsightType, data: Record<string, unknown>): string {
  if (type === 'flight')   return `${data.airline} ${data.flightNumber} · ${data.origin} → ${data.destination}`
  if (type === 'finance')  return `₹${data.amount} due · ends in ${data.accountLast4}`
  if (type === 'movie')    return `${data.movieName} · Seats ${data.seats}`
  if (type === 'delivery') return `${data.merchant} · Order ${data.orderNumber}`
  if (type === 'hotel')    return `${data.hotelName}`
  if (type === 'shopping') return `${data.merchant} · ₹${data.amount}`
  return ''
}

export function RecentInsights() {
  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-semibold text-[#111111] dark:text-[#F2F2F2] tracking-[-0.01em]">
            Extracted today
          </h2>
          <p className="text-[12px] text-[#888888] dark:text-[#8A8A8A] mt-0.5">
            What PIE pulled from your inbox
          </p>
        </div>
        <Link
          href="/insights"
          className="text-[12px] text-[#888888] dark:text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#F2F2F2] transition-colors flex items-center gap-1"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div>
        {mockInsights.slice(0, 5).map((insight) => (
          <div
            key={insight.id}
            className="flex items-center gap-3 py-3 border-b border-[#E4E4E0] dark:border-[#1F1F1F] last:border-0 hover:bg-[#F7F7F5] dark:hover:bg-[#1A1A1A] -mx-5 px-5 transition-colors cursor-pointer"
          >
            <CategoryChip type={insight.type as InsightType} />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#111111] dark:text-[#F2F2F2] truncate">
                {extractedValue(insight.type as InsightType, insight.data)}
              </p>
              <p className="text-[11px] text-[#AAAAAA] dark:text-[#555555] truncate mt-0.5">
                {insight.sender}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-[11px] font-mono text-[#AAAAAA] dark:text-[#555555]">
                {timeAgo(insight.extractedAt)}
              </span>
              <p className="text-[10px] font-mono text-[#AAAAAA] dark:text-[#555555] mt-0.5">
                {Math.round(insight.confidence * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
