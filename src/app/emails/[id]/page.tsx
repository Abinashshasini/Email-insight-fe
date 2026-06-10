'use client'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { useEmailById } from '@/hooks/useEmails'

/* ─── helpers ─────────────────────────────────────────── */

function parseSender(raw: string): { name: string; address: string } {
  const m = raw.match(/^([^<]+)<([^>]+)>/)
  if (m) {
    const name = m[1].trim().replace(/^["']+|["']+$/g, '').trim()
    return { name: name || m[2].trim(), address: m[2].trim() }
  }
  return { name: raw.replace(/^["']+|["']+$/g, '').trim(), address: raw }
}

function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 45%, 45%)`
}

const CATEGORY_COLORS: Record<string, string> = {
  travel:   'bg-blue-100   text-blue-700   dark:bg-blue-900/30  dark:text-blue-400',
  finance:  'bg-green-100  text-green-700  dark:bg-green-900/30 dark:text-green-400',
  shopping: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  work:     'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  social:   'bg-pink-100   text-pink-700   dark:bg-pink-900/30  dark:text-pink-400',
}

/* ─── viewer ───────────────────────────────────────────── */

function EmailViewer({ id }: { id: string }) {
  const router = useRouter()
  const { email, loading, error } = useEmailById(id)

  if (loading) {
    return (
      <div className="max-w-3xl space-y-5 animate-pulse">
        <div className="h-4 w-20 bg-[#E8E8E5] dark:bg-[#222222] rounded" />
        <div className="h-8 w-3/4 bg-[#E8E8E5] dark:bg-[#222222] rounded-lg" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E8E8E5] dark:bg-[#222222]" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-36 bg-[#E8E8E5] dark:bg-[#222222] rounded" />
            <div className="h-3 w-48 bg-[#F0F0EE] dark:bg-[#1A1A1A] rounded" />
          </div>
        </div>
        <div className="h-px bg-[#E4E4E0] dark:bg-[#1F1F1F]" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-[#F0F0EE] dark:bg-[#1A1A1A]" style={{ width: `${90 - i * 8}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (error || !email) {
    return (
      <div className="max-w-3xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[13px] text-[#888888] dark:text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#F2F2F2] transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Inbox
        </button>
        <div className="py-20 text-center">
          <p className="text-[14px] text-[#888888] dark:text-[#8A8A8A]">
            {error ?? 'Email not found.'}
          </p>
        </div>
      </div>
    )
  }

  const { name, address } = parseSender(email.sender)
  const initial = name.charAt(0).toUpperCase()
  const receivedFull = new Date(email.receivedAt).toLocaleString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="max-w-3xl">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-[13px] text-[#888888] dark:text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#F2F2F2] transition-colors mb-6 group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Inbox
      </button>

      {/* Subject */}
      <h1 className="text-[26px] font-semibold text-[#111111] dark:text-[#F2F2F2] tracking-[-0.03em] leading-tight mb-5">
        {email.subject}
      </h1>

      {/* Sender card */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[14px] font-semibold text-white"
            style={{ background: stringToColor(address) }}
          >
            {initial}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#111111] dark:text-[#F2F2F2]">{name}</p>
            <p className="text-[12px] text-[#888888] dark:text-[#8A8A8A]">{address}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="text-right shrink-0 space-y-1">
          <div className="flex items-center justify-end gap-1.5 text-[12px] text-[#888888] dark:text-[#8A8A8A]">
            <Clock size={11} />
            {receivedFull}
          </div>
          {email.category && (
            <div className="flex items-center justify-end gap-1.5">
              <Tag size={10} className="text-[#AAAAAA] dark:text-[#555555]" />
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[email.category] ?? 'bg-[#F0F0EE] text-[#888888]'}`}>
                {email.category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E4E4E0] dark:bg-[#1F1F1F] mb-6" />

      {/* Body */}
      <div className="text-[14px] leading-relaxed">
        {email.bodyHtml ? (
          <iframe
            srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                     font-size: 14px; line-height: 1.6; color: #333; margin: 0; padding: 0; word-break: break-word; }
              a { color: #1a73e8; }
              img { max-width: 100%; height: auto; }
              table { max-width: 100%; }
            </style></head><body>${email.bodyHtml}</body></html>`}
            sandbox="allow-same-origin"
            className="w-full border-none"
            style={{ minHeight: '400px' }}
            onLoad={(e) => {
              const iframe = e.currentTarget
              const doc = iframe.contentDocument
              if (doc) iframe.style.height = doc.documentElement.scrollHeight + 32 + 'px'
            }}
            title="Email content"
          />
        ) : (
          <p className="whitespace-pre-wrap text-[#555555] dark:text-[#8A8A8A]">{email.snippet}</p>
        )}
      </div>

    </div>
  )
}

/* ─── page ─────────────────────────────────────────────── */

export default function EmailDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <AppShell title="Email">
      <EmailViewer id={id} />
    </AppShell>
  )
}
