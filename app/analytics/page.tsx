'use client'
import { AppShell } from '@/components/layout/AppShell'
import { mockSpendData, mockCategories, mockMerchants } from '@/lib/mock-data'
import { useTheme } from '@/providers/ThemeProvider'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'

function SpendChart() {
  const { theme } = useTheme()
  const axisColor = theme === 'dark' ? '#4A4A4A' : '#AAAAAA'
  const gridColor = theme === 'dark' ? '#1F1F1F' : '#E4E4E0'
  const tooltipBg = theme === 'dark' ? '#1A1A1A' : '#FFFFFF'
  const tooltipBorder = theme === 'dark' ? '#2E2E2E' : '#E4E4E0'

  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-lg p-4">
      <h3 className="text-[13px] font-medium text-[#111111] dark:text-[#F2F2F2] mb-4">Weekly spend</h3>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={mockSpendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F2F2F2" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#F2F2F2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="week" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: tooltipBg, border: `0.5px solid ${tooltipBorder}`, borderRadius: '6px', fontSize: 12 }}
            labelStyle={{ color: axisColor }}
            formatter={(v) => [`₹${Number(v).toLocaleString()}`, 'Spend']}
          />
          <Area type="monotone" dataKey="amount" stroke={theme === 'dark' ? '#F2F2F2' : '#111111'} strokeWidth={1.5} fill="url(#spendGrad)" dot={{ fill: theme === 'dark' ? '#F2F2F2' : '#111111', r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function CategoryBreakdown() {
  const { theme } = useTheme()
  const tooltipBg = theme === 'dark' ? '#1A1A1A' : '#FFFFFF'
  const tooltipBorder = theme === 'dark' ? '#2E2E2E' : '#E4E4E0'

  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-lg p-4">
      <h3 className="text-[13px] font-medium text-[#111111] dark:text-[#F2F2F2] mb-4">Categories</h3>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie data={mockCategories} dataKey="value" cx="50%" cy="50%" innerRadius={36} outerRadius={54} strokeWidth={0}>
              {mockCategories.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: tooltipBg, border: `0.5px solid ${tooltipBorder}`, borderRadius: '6px', fontSize: 12 }}
              formatter={(v, name) => [`${v}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1.5">
          {mockCategories.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
              <span className="text-[12px] text-[#888888] dark:text-[#8A8A8A]">{c.name}</span>
              <span className="ml-auto font-mono text-[12px] text-[#111111] dark:text-[#F2F2F2]">{c.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MerchantList() {
  const total = mockMerchants.reduce((sum, m) => sum + m.amount, 0)

  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-lg p-4">
      <h3 className="text-[13px] font-medium text-[#111111] dark:text-[#F2F2F2] mb-4">Top merchants</h3>
      <div className="space-y-2">
        {mockMerchants.map((m) => (
          <div key={m.name} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#111111] dark:text-[#F2F2F2]">{m.name}</span>
              <span className="font-mono text-[12px] text-[#888888] dark:text-[#8A8A8A]">₹{m.amount.toLocaleString()}</span>
            </div>
            <div className="w-full h-1 bg-[#E8E8E5] dark:bg-[#222222] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#111111] dark:bg-[#F2F2F2] rounded-full"
                style={{ width: `${(m.amount / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-2">
          <SpendChart />
        </div>
        <CategoryBreakdown />
        <MerchantList />
      </div>
    </AppShell>
  )
}
