'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

export interface Email {
  _id: string
  gmailMessageId: string
  threadId: string
  userId: string
  sender: string
  subject: string
  snippet: string
  bodyHtml: string
  receivedAt: string
  processed: boolean
  category: string | null
  priorityScore: number | null
  createdAt: string
  updatedAt: string
  __v: number
}

interface EmailsResponse {
  emails: Email[]
  total: number
  page: number
  limit: number
}

// Shared in-memory cache so the detail page reads instantly without an extra fetch
const emailCache = new Map<string, Email>()

export function useEmails() {
  const [emails, setEmails] = useState<Email[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const limit = 20

  const fetchEmails = async (pageNum = 1) => {
    setLoading(true)
    try {
      const res = await api.get<EmailsResponse>(`/gmail?page=${pageNum}&limit=${limit}`)
      res.emails.forEach((e) => emailCache.set(e._id, e))
      setEmails(res.emails)
      setTotal(res.total)
      setPage(pageNum)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    api
      .get<EmailsResponse>(`/gmail?page=1&limit=${limit}`)
      .then((res) => {
        res.emails.forEach((e) => emailCache.set(e._id, e))
        setEmails(res.emails)
        setTotal(res.total)
        setPage(1)
      })
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(total / limit)

  return { emails, total, page, totalPages, loading, fetchEmails }
}

export function useEmailById(id: string) {
  const cached = emailCache.get(id)
  const [email] = useState<Email | null>(cached ?? null)

  return { email, loading: !email, error: !email ? 'Email not found — please go back and reopen.' : null }
}
