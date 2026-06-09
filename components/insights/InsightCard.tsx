import { Insight, InsightType } from '@/types'
import { CategoryChip } from '@/components/ui/CategoryChip'
import { Plane, CreditCard, Film, Package, Hotel, ShoppingBag } from 'lucide-react'

const icons: Record<InsightType, React.ReactNode> = {
  flight:   <Plane size={14} className="text-blue-400" />,
  finance:  <CreditCard size={14} className="text-amber-400" />,
  movie:    <Film size={14} className="text-purple-400" />,
  delivery: <Package size={14} className="text-green-400" />,
  hotel:    <Hotel size={14} className="text-teal-400" />,
  shopping: <ShoppingBag size={14} className="text-orange-400" />,
  social:   <span className="text-gray-400 text-[12px]">@</span>,
  promo:    <span className="text-gray-500 text-[12px]">%</span>,
}

function formatData(type: InsightType, data: Record<string, unknown>): string {
  if (type === 'flight') {
    return `${data.airline} ${data.flightNumber} · ${data.origin} → ${data.destination} · PNR: ${data.pnr}`
  }
  if (type === 'finance') {
    return `₹${data.amount} due · Account ****${data.accountLast4}`
  }
  if (type === 'movie') {
    return `${data.venue} · Seats ${data.seats}`
  }
  if (type === 'delivery') {
    return `${data.merchant} · Order ${data.orderNumber}`
  }
  if (type === 'hotel') {
    return `${data.hotelName} · Conf: ${data.confirmationId}`
  }
  if (type === 'shopping') {
    return `${data.merchant} · Order ${data.orderNumber} · ₹${data.amount}`
  }
  return ''
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

interface InsightCardProps {
  insight: Insight
}

export function InsightCard({ insight }: InsightCardProps) {
  const urgent = insight.confidence > 0.95
  return (
    <div
      className={`bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F]
        rounded-lg p-4 hover:border-[#DDDDD8] dark:hover:border-[#2E2E2E]
        hover:-translate-y-px transition-all cursor-pointer
        ${urgent ? 'border-l-2 border-l-[#111111] dark:border-l-[#F2F2F2]' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icons[insight.type as InsightType]}
          <CategoryChip type={insight.type as InsightType} />
        </div>
        <span className="text-[11px] font-mono text-[#888888] dark:text-[#4A4A4A]">
          {timeAgo(insight.extractedAt)}
        </span>
      </div>
      <p className="text-[13px] font-medium text-[#111111] dark:text-[#F2F2F2] mb-1 leading-snug">
        {insight.subject}
      </p>
      <p className="text-[12px] text-[#888888] dark:text-[#8A8A8A] leading-relaxed">
        {formatData(insight.type as InsightType, insight.data)}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-[#AAAAAA] dark:text-[#4A4A4A] truncate">{insight.sender}</span>
        <span className="text-[10px] font-mono text-[#AAAAAA] dark:text-[#555555]">
          {Math.round(insight.confidence * 100)}% conf.
        </span>
      </div>
    </div>
  )
}
