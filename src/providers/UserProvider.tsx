'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

interface User {
  _id: string
  googleId: string
  name: string
  email: string
  picture: string | null
  createdAt: string
  updatedAt: string
  __v: number
}

interface UserContextType {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
  syncing: boolean
  syncResult: string | null
  handleSync: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  syncing: false,
  syncResult: null,
  handleSync: async () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    api
      .get<User>('/auth/me')
      .then(setUser)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const logout = async () => {
    await api.post('/auth/logout')
    router.push('/login')
  }

  const handleSync = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await api.post<{ emailsSynced: number }>('/gmail/sync')
      setSyncResult(`Synced ${res.emailsSynced} emails`)
    } catch (e: unknown) {
      setSyncResult(e instanceof Error ? e.message : 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, logout, syncing, syncResult, handleSync }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
