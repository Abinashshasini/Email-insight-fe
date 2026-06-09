import { Plane, Film, CreditCard, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const typeIcon: Record<string, React.ReactNode> = {
  flight:  <Plane size={14} className="text-blue-400" />,
  movie:   <Film size={14} className="text-purple-400" />,
  finance: <CreditCard size={14} className="text-amber-400" />,
}

const events = [
  {
    type: 'flight',
    title: 'IndiGo 6E 342 to Delhi',
    detail: 'BLR Terminal 2 · PNR ABC123',
    time: 'Today, 18:45',
    urgency: 'in 6h',
    urgent: true,
  },
  {
    type: 'movie',
    title: 'Pushpa 2: The Rule',
    detail: 'PVR Forum Mall · Seats F4, F5',
    time: 'Today, 21:00',
    urgency: 'in 9h',
    urgent: false,
  },
  {
    type: 'finance',
    title: 'HDFC Credit Card bill due',
    detail: '₹8,240 · Account ending 4521',
    time: 'Tomorrow',
    urgency: 'tomorrow',
    urgent: true,
  },
]

export function UpcomingEvents() {
  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-semibold text-[#111111] dark:text-[#F2F2F2] tracking-[-0.01em]">
            Needs your attention
          </h2>
          <p className="text-[12px] text-[#888888] dark:text-[#8A8A8A] mt-0.5">
            3 time-sensitive items in the next 48 hours
          </p>
        </div>
        <Link
          href="/timeline"
          className="text-[12px] text-[#888888] dark:text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#F2F2F2] transition-colors flex items-center gap-1"
        >
          Full timeline <ArrowRight size={12} />
        </Link>
      </div>

      <div className="space-y-1.5">
        {events.map((e, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-lg border transition-colors cursor-pointer
              ${e.urgent
                ? 'border-[#DDDDD8] dark:border-[#2E2E2E] bg-[#F7F7F5] dark:bg-[#1A1A1A] hover:bg-[#F0F0EE] dark:hover:bg-[#1F1F1F]'
                : 'border-[#E4E4E0] dark:border-[#1F1F1F] bg-transparent hover:bg-[#F7F7F5] dark:hover:bg-[#1A1A1A]'
              }`}
          >
            <div className="shrink-0">{typeIcon[e.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[#111111] dark:text-[#F2F2F2] truncate">
                {e.title}
              </p>
              <p className="text-[12px] text-[#888888] dark:text-[#8A8A8A] mt-0.5 truncate">
                {e.detail}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[12px] font-mono text-[#888888] dark:text-[#8A8A8A]">{e.time}</p>
              <p className={`text-[11px] font-mono mt-0.5 ${e.urgent ? 'text-[#EF4444]' : 'text-[#AAAAAA] dark:text-[#555555]'}`}>
                {e.urgency}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
