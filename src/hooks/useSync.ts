'use client'
import { useState, useRef } from 'react'
import { api } from '@/lib/api'

export type SyncStatus = 'idle' | 'queued' | 'running' | 'complete' | 'failed'

export interface SyncState {
  status: SyncStatus
  phase: 'collecting' | 'saving' | null
  progress: number
  emailsSynced: number
  totalFound: number
  idsFound: number
  error: string | null
}

export function useSync(onComplete?: () => void) {
  const [state, setState] = useState<SyncState>({
    status: 'idle',
    phase: null,
    progress: 0,
    emailsSynced: 0,
    totalFound: 0,
    idsFound: 0,
    error: null,
  })

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }

  const startSync = async () => {
    setState(s => ({ ...s, status: 'queued', progress: 0, error: null }))

    try {
      const { jobId } = await api.post<{ jobId: string }>('/gmail/sync')

      pollRef.current = setInterval(async () => {
        try {
          const job = await api.get<{
            status: string
            phase: 'collecting' | 'saving' | null
            progress: number
            emailsSynced: number
            totalFound: number
            idsFound: number
            error: string | null
          }>(`/gmail/sync/status/${jobId}`)

          setState(s => ({
            ...s,
            status: job.status as SyncStatus,
            phase: job.phase,
            progress: job.progress,
            emailsSynced: job.emailsSynced,
            totalFound: job.totalFound,
            idsFound: job.idsFound,
            error: job.error,
          }))

          if (job.status === 'complete' || job.status === 'failed') {
            stopPolling()
            if (job.status === 'complete') onComplete?.()
          }
        } catch {
          stopPolling()
          setState(s => ({ ...s, status: 'failed', error: 'Polling failed' }))
        }
      }, 3000)
    } catch (e: unknown) {
      setState(s => ({
        ...s,
        status: 'failed',
        error: e instanceof Error ? e.message : 'Failed to start sync',
      }))
    }
  }

  return { ...state, startSync }
}
