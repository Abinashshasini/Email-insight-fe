'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Mail, Sparkles, Clock, Tag, BarChart2, FlaskConical, X, Loader2 } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { useEmails, type Email } from '@/hooks/useEmails'
import { api } from '@/lib/api'

/* ─── helpers ─────────────────────────────────────────── */

function parseSender(raw: string): { name: string; address: string } {
  const m = raw.match(/^([^<]+)<([^>]+)>/)
  if (m) {
    const name = m[1].trim().replace(/^["']+|["']+$/g, '').trim()
    return { name: name || m[2].trim(), address: m[2].trim() }
  }
  return { name: raw.replace(/^["']+|["']+$/g, '').trim(), address: raw }
}

function formatDate(iso: string, long = false): string {
  const d = new Date(iso)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
  if (long) return d.toLocaleString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  if (diffDays === 0) return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  if (diffDays < 7) return d.toLocaleDateString('en-IN', { weekday: 'short' })
  if (d.getFullYear() === now.getFullYear()) return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })
}

function avatarColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  const h = Math.abs(hash) % 360
  return `hsl(${h},50%,42%)`
}

const CAT_STYLE: Record<string, { bar: string; badge: string; label: string }> = {
  travel:   { bar: '#3b82f6', badge: 'bg-blue-100   text-blue-700   dark:bg-blue-900/30  dark:text-blue-400',   label: 'Travel'   },
  finance:  { bar: '#22c55e', badge: 'bg-green-100  text-green-700  dark:bg-green-900/30 dark:text-green-400',  label: 'Finance'  },
  shopping: { bar: '#f97316', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', label: 'Shopping' },
  work:     { bar: '#8b5cf6', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', label: 'Work'     },
  social:   { bar: '#ec4899', badge: 'bg-pink-100   text-pink-700   dark:bg-pink-900/30  dark:text-pink-400',   label: 'Social'   },
}

/* ─── email row ────────────────────────────────────────── */

function EmailRow({ email, selected, onClick }: { email: Email; selected: boolean; onClick: () => void }) {
  const { name } = parseSender(email.sender)
  const unread = !email.processed
  const cat = email.category ? CAT_STYLE[email.category] : null

  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-stretch gap-0 transition-colors relative
        ${selected
          ? 'bg-[#F0F4FF] dark:bg-[#151c2c]'
          : 'hover:bg-[#F7F7F7] dark:hover:bg-[#161616]'
        }
        border-b border-[#EBEBEB] dark:border-[#1A1A1A]`}
    >
      {/* Category / unread bar */}
      <div
        className="w-0.5 shrink-0 self-stretch"
        style={{ background: cat ? cat.bar : unread ? '#1a73e8' : 'transparent' }}
      />

      <div className="flex items-start gap-3 px-3 py-3 flex-1 min-w-0">
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[12px] font-bold text-white mt-0.5"
          style={{ background: avatarColor(email.sender) }}
        >
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className={`text-[13px] truncate ${unread ? 'font-semibold text-[#111111] dark:text-[#F2F2F2]' : 'text-[#555555] dark:text-[#8A8A8A]'}`}>
              {name}
            </span>
            <span className={`text-[11px] shrink-0 ${unread ? 'font-medium text-[#111111] dark:text-[#F2F2F2]' : 'text-[#AAAAAA] dark:text-[#555555]'}`}>
              {formatDate(email.receivedAt)}
            </span>
          </div>

          <p className={`text-[12.5px] truncate mb-0.5 ${unread ? 'font-medium text-[#222222] dark:text-[#DDDDDD]' : 'text-[#666666] dark:text-[#666666]'}`}>
            {email.subject}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-[11.5px] text-[#AAAAAA] dark:text-[#555555] truncate flex-1">
              {email.snippet}
            </p>
            {cat && (
              <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${cat.badge}`}>
                {cat.label}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#1a73e8] dark:bg-[#8ab4f8]" />
      )}
    </button>
  )
}

/* ─── email reader ─────────────────────────────────────── */

function EmailReader({ email }: { email: Email }) {
  const { name, address } = parseSender(email.sender)
  const cat = email.category ? CAT_STYLE[email.category] : null

  return (
    <div className="flex h-full">

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-7 pb-5 border-b border-[#EBEBEB] dark:border-[#1A1A1A]">
          <h1 className="text-[22px] font-semibold text-[#111111] dark:text-[#F2F2F2] tracking-[-0.025em] leading-snug mb-4">
            {email.subject}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[15px] font-bold text-white"
                style={{ background: avatarColor(email.sender) }}
              >
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#111111] dark:text-[#F2F2F2]">{name}</p>
                <p className="text-[11.5px] text-[#888888] dark:text-[#8A8A8A]">{address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#AAAAAA] dark:text-[#555555]">
              <Clock size={11} />
              {formatDate(email.receivedAt, true)}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {email.bodyHtml ? (
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>
                * { box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                       font-size: 14px; line-height: 1.65; color: #1a1a1a; margin: 0; padding: 0;
                       word-break: break-word; -webkit-text-size-adjust: 100%; }
                a { color: #1a73e8; text-decoration: none; }
                a:hover { text-decoration: underline; }
                img { max-width: 100%; height: auto; display: block; }
                table { max-width: 100%; border-collapse: collapse; }
                p { margin: 0 0 12px; }
              </style></head><body>${email.bodyHtml}</body></html>`}
              sandbox="allow-same-origin"
              className="w-full border-none"
              style={{ minHeight: '300px' }}
              onLoad={(e) => {
                const f = e.currentTarget
                const doc = f.contentDocument
                if (doc) f.style.height = doc.documentElement.scrollHeight + 40 + 'px'
              }}
              title="Email content"
            />
          ) : (
            <p className="text-[14px] leading-relaxed text-[#555555] dark:text-[#8A8A8A] whitespace-pre-wrap">
              {email.snippet}
            </p>
          )}
        </div>
      </div>

      {/* PIE insights sidebar */}
      <div className="w-64 shrink-0 border-l border-[#EBEBEB] dark:border-[#1A1A1A] bg-[#FAFAF9] dark:bg-[#0D0D0D] overflow-y-auto">
        <div className="px-4 pt-5 pb-4 border-b border-[#EBEBEB] dark:border-[#1A1A1A]">
          <div className="flex items-center gap-2 mb-0.5">
            <Sparkles size={13} className="text-[#888888] dark:text-[#8A8A8A]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] dark:text-[#8A8A8A]">
              PIE Analysis
            </span>
          </div>
        </div>

        <div className="px-4 py-4 space-y-5">

          {/* Category */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Tag size={11} className="text-[#AAAAAA] dark:text-[#555555]" />
              <span className="text-[10px] uppercase tracking-widest text-[#AAAAAA] dark:text-[#555555]">Category</span>
            </div>
            {cat ? (
              <span className={`inline-flex text-[12px] px-2.5 py-1 rounded-full font-medium ${cat.badge}`}>
                {cat.label}
              </span>
            ) : (
              <span className="text-[12px] text-[#CCCCCC] dark:text-[#333333] italic">Not categorized</span>
            )}
          </div>

          {/* Priority */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart2 size={11} className="text-[#AAAAAA] dark:text-[#555555]" />
              <span className="text-[10px] uppercase tracking-widest text-[#AAAAAA] dark:text-[#555555]">Priority</span>
            </div>
            {email.priorityScore !== null ? (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-semibold text-[#111111] dark:text-[#F2F2F2]">
                    {email.priorityScore}/100
                  </span>
                  <span className="text-[11px] text-[#888888] dark:text-[#8A8A8A]">
                    {email.priorityScore >= 70 ? 'High' : email.priorityScore >= 40 ? 'Medium' : 'Low'}
                  </span>
                </div>
                <div className="h-1.5 bg-[#E8E8E5] dark:bg-[#222222] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${email.priorityScore}%`,
                      background: email.priorityScore >= 70 ? '#ef4444' : email.priorityScore >= 40 ? '#f97316' : '#22c55e',
                    }}
                  />
                </div>
              </div>
            ) : (
              <span className="text-[12px] text-[#CCCCCC] dark:text-[#333333] italic">Not scored</span>
            )}
          </div>

          {/* Processing status */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={11} className="text-[#AAAAAA] dark:text-[#555555]" />
              <span className="text-[10px] uppercase tracking-widest text-[#AAAAAA] dark:text-[#555555]">Extraction</span>
            </div>
            {email.processed ? (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                <span className="text-[12px] text-[#22c55e]">Insights extracted</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AAAAAA] dark:bg-[#444444] animate-pulse" />
                <span className="text-[12px] text-[#AAAAAA] dark:text-[#555555]">Pending analysis</span>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="pt-3 border-t border-[#EBEBEB] dark:border-[#1A1A1A] space-y-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#CCCCCC] dark:text-[#333333]">Thread ID</span>
              <p className="text-[11px] font-mono text-[#AAAAAA] dark:text-[#555555] truncate mt-0.5">{email.threadId}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── empty state ──────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-8">
      <div className="w-14 h-14 rounded-2xl bg-[#F0F0EE] dark:bg-[#1A1A1A] flex items-center justify-center mb-1">
        <Mail size={22} className="text-[#CCCCCC] dark:text-[#444444]" />
      </div>
      <p className="text-[15px] font-medium text-[#888888] dark:text-[#8A8A8A]">Select an email</p>
      <p className="text-[13px] text-[#CCCCCC] dark:text-[#444444] max-w-52">
        Click any email on the left to read it here.
      </p>
    </div>
  )
}

/* ─── debug overlay ────────────────────────────────────── */

function DebugOverlay({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const res = await api.get('/gmail/debug/general-senders')
      setData(res)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[80vh] flex flex-col bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E4E0] dark:border-[#1F1F1F]">
          <div className="flex items-center gap-2.5">
            <FlaskConical size={15} className="text-[#888888] dark:text-[#8A8A8A]" />
            <span className="text-[13px] font-semibold text-[#111111] dark:text-[#F2F2F2]">
              Debug — general-senders
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0F0EE] dark:bg-[#1A1A1A] text-[#888888] dark:text-[#8A8A8A]">
              GET /gmail/debug/general-senders
            </span>
          </div>
          <button onClick={onClose} className="text-[#888888] hover:text-[#111111] dark:hover:text-[#F2F2F2] transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!data && !error && !loading && (
            <p className="text-[13px] text-[#888888] dark:text-[#8A8A8A]">
              Click the button below to call the endpoint.
            </p>
          )}
          {error && (
            <p className="text-[13px] text-[#EF4444] font-mono">{error}</p>
          )}
          {data && (
            <pre className="text-[12px] font-mono text-[#111111] dark:text-[#F2F2F2] whitespace-pre-wrap break-all leading-relaxed">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#E4E4E0] dark:border-[#1F1F1F] flex justify-end">
          <button
            onClick={run}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-[12px] font-medium bg-[#111111] dark:bg-[#F2F2F2] text-white dark:text-[#111111] rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <FlaskConical size={12} />}
            {loading ? 'Loading…' : 'Run'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── main app ─────────────────────────────────────────── */

interface EmailsAppProps {
  emails: Email[]
  total: number
  page: number
  totalPages: number
  loading: boolean
  fetchEmails: (page?: number) => void
}

function EmailsApp({ emails, total, page, totalPages, loading, fetchEmails }: EmailsAppProps) {
  const [selected, setSelected] = useState<Email | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [debugOpen, setDebugOpen] = useState(false)

  const unreadCount = emails.filter((e) => !e.processed).length
  const filtered = filter === 'unread' ? emails.filter((e) => !e.processed) : emails

  return (
    <div className="flex h-full">

      {/* ── Left pane ── */}
      <div className="w-80 shrink-0 flex flex-col border-r border-[#E4E4E0] dark:border-[#1F1F1F] bg-white dark:bg-[#111111]">

        {/* Pane header */}
        <div className="px-4 pt-4 pb-0 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[18px] font-semibold text-[#111111] dark:text-[#F2F2F2] tracking-[-0.025em]">
              Inbox
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#AAAAAA] dark:text-[#555555]">
                {total.toLocaleString()} emails
              </span>
              <button
                onClick={() => setDebugOpen(true)}
                title="Debug: general-senders"
                className="w-6 h-6 flex items-center justify-center rounded-md text-[#CCCCCC] dark:text-[#444444] hover:text-[#888888] dark:hover:text-[#8A8A8A] hover:bg-[#F0F0EE] dark:hover:bg-[#1A1A1A] transition-colors"
              >
                <FlaskConical size={13} />
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex border-b border-[#EBEBEB] dark:border-[#1A1A1A]">
            {(['all', 'unread'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium border-b-2 -mb-px transition-colors
                  ${filter === f
                    ? 'border-[#111111] dark:border-[#F2F2F2] text-[#111111] dark:text-[#F2F2F2]'
                    : 'border-transparent text-[#888888] dark:text-[#8A8A8A] hover:text-[#444444] dark:hover:text-[#CCCCCC]'
                  }`}
              >
                {f === 'all' ? 'All' : 'Unread'}
                {f === 'unread' && unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#1a73e8] text-white leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="divide-y divide-[#EBEBEB] dark:divide-[#1A1A1A]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-[#E8E8E5] dark:bg-[#222222] shrink-0" />
                  <div className="flex-1 space-y-2 pt-0.5">
                    <div className="flex justify-between">
                      <div className="h-3 w-24 bg-[#E8E8E5] dark:bg-[#222222] rounded" />
                      <div className="h-3 w-10 bg-[#F0F0EE] dark:bg-[#1A1A1A] rounded" />
                    </div>
                    <div className="h-3 w-40 bg-[#F0F0EE] dark:bg-[#1A1A1A] rounded" />
                    <div className="h-2.5 w-full bg-[#F0F0EE] dark:bg-[#1A1A1A] rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.map((email) => (
            <EmailRow
              key={email._id}
              email={email}
              selected={selected?._id === email._id}
              onClick={() => setSelected(email)}
            />
          ))}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <p className="text-[13px] text-[#888888] dark:text-[#8A8A8A]">No emails here.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-t border-[#EBEBEB] dark:border-[#1A1A1A]">
            <span className="text-[11px] font-mono text-[#AAAAAA] dark:text-[#555555]">
              {page} / {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => fetchEmails(page - 1)}
                disabled={page === 1 || loading}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E4E4E0] dark:border-[#2E2E2E] text-[#888888] dark:text-[#8A8A8A] disabled:opacity-30 hover:bg-[#F0F0EE] dark:hover:bg-[#1A1A1A] transition-colors"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={() => fetchEmails(page + 1)}
                disabled={page === totalPages || loading}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E4E4E0] dark:border-[#2E2E2E] text-[#888888] dark:text-[#8A8A8A] disabled:opacity-30 hover:bg-[#F0F0EE] dark:hover:bg-[#1A1A1A] transition-colors"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right pane ── */}
      <div className="flex-1 overflow-hidden bg-white dark:bg-[#0E0E0E]">
        {selected ? <EmailReader email={selected} /> : <EmptyState />}
      </div>

      {/* Debug overlay */}
      {debugOpen && <DebugOverlay onClose={() => setDebugOpen(false)} />}

    </div>
  )
}

/* ─── page ─────────────────────────────────────────────── */

export default function EmailsPage() {
  const { emails, total, page, totalPages, loading, fetchEmails } = useEmails()

  return (
    <AppShell title="Emails" noPadding onSyncComplete={() => fetchEmails(1)}>
      <EmailsApp
        emails={emails}
        total={total}
        page={page}
        totalPages={totalPages}
        loading={loading}
        fetchEmails={fetchEmails}
      />
    </AppShell>
  )
}
