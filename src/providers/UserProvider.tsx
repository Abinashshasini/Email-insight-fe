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
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  logout: async () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
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

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
