'use client'
import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { mockEmails, mockMetrics } from '@/lib/mock-data'
import { PriorityBadge } from '@/components/ui/PriorityBadge'
import { CategoryChip } from '@/components/ui/CategoryChip'
import { InsightType } from '@/types'
import { Zap } from 'lucide-react'

const filters = [
  { label: 'All',        key: 'all' },
  { label: 'Flights',    key: 'flight' },
  { label: 'Finance',    key: 'finance' },
  { label: 'Deliveries', key: 'delivery' },
  { label: 'Movies',     key: 'movie' },
  { label: 'Promos',     key: 'promo' },
]

export default function EmailsPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? mockEmails
    : mockEmails.filter((e) => e.type === activeFilter)

  return (
    <AppShell title="Emails">

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-[#111111] dark:text-[#F2F2F2] tracking-[-0.02em]">
          {mockMetrics.totalEmails.toLocaleString()} emails scanned
        </h1>
        <p className="text-[14px] text-[#888888] dark:text-[#8A8A8A] mt-1">
          Showing {filtered.length} emails · {mockEmails.filter(e => e.extracted).length} with extracted insights
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3.5 py-1.5 text-[13px] rounded-lg border transition-colors
              ${activeFilter === f.key
                ? 'bg-[#F0F0EE] dark:bg-[#1A1A1A] border-[#DDDDD8] dark:border-[#2E2E2E] text-[#111111] dark:text-[#F2F2F2] font-medium'
                : 'bg-transparent border-transparent text-[#888888] dark:text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#F2F2F2]'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-xl overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-[120px_1fr_90px_70px] gap-4 px-5 py-3 bg-[#F7F7F5] dark:bg-[#0F0F0F] border-b border-[#E4E4E0] dark:border-[#1F1F1F]">
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#AAAAAA] dark:text-[#555555]">Sender</span>
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#AAAAAA] dark:text-[#555555]">Subject</span>
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#AAAAAA] dark:text-[#555555]">Received</span>
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#AAAAAA] dark:text-[#555555] text-right">Score</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[14px] text-[#888888] dark:text-[#8A8A8A]">No emails in this category.</p>
          </div>
        ) : filtered.map((email) => (
          <div
            key={email.id}
            className="grid grid-cols-[120px_1fr_90px_70px] gap-4 px-5 py-4 border-b border-[#E4E4E0] dark:border-[#1F1F1F] last:border-0 hover:bg-[#F7F7F5] dark:hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
          >
            {/* Sender + type chip */}
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[13px] font-medium text-[#111111] dark:text-[#F2F2F2] truncate">
                {email.sender}
              </span>
              <CategoryChip type={email.type as InsightType} />
            </div>

            {/* Subject + from address */}
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[14px] text-[#111111] dark:text-[#F2F2F2] truncate leading-snug">
                {email.subject}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#AAAAAA] dark:text-[#555555] truncate">{email.from}</span>
                {email.extracted && (
                  <span className="shrink-0 flex items-center gap-0.5 text-[10px] text-[#888888] dark:text-[#8A8A8A]">
                    <Zap size={9} />insight extracted
                  </span>
                )}
              </div>
            </div>

            {/* Date */}
            <span className="text-[12px] font-mono text-[#888888] dark:text-[#8A8A8A] self-center">
              {email.receivedAt}
            </span>

            {/* Score */}
            <div className="flex justify-end items-center">
              <PriorityBadge score={email.score} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[12px] text-[#AAAAAA] dark:text-[#555555]">
        Score = PIE's confidence that this email contains actionable information.
      </p>

    </AppShell>
  )
}
