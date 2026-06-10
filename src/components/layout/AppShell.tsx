'use client'
import { UserProvider, useUser } from '@/providers/UserProvider'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

interface AppShellProps {
  title: string
  children: React.ReactNode
  onSyncComplete?: () => void
  noPadding?: boolean
}

function ShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-[#F7F7F5] dark:bg-[#0A0A0A] animate-pulse">
      <div className="hidden md:flex flex-col w-55 shrink-0 bg-white dark:bg-[#111111] border-r border-[#E4E4E0] dark:border-[#1F1F1F]">
        <div className="h-13 border-b border-[#E4E4E0] dark:border-[#1F1F1F] px-5 flex items-center">
          <div className="h-4 w-8 bg-[#E8E8E5] dark:bg-[#222222] rounded" />
        </div>
        <div className="flex-1 py-4 px-3 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 bg-[#F0F0EE] dark:bg-[#1A1A1A] rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-13 border-b border-[#E4E4E0] dark:border-[#1F1F1F] bg-[#F7F7F5] dark:bg-[#0A0A0A]" />
        <div className="flex-1 p-6 space-y-4">
          <div className="h-8 w-64 bg-[#E8E8E5] dark:bg-[#222222] rounded-lg" />
          <div className="h-4 w-96 bg-[#F0F0EE] dark:bg-[#1A1A1A] rounded" />
          <div className="grid grid-cols-4 gap-3 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ShellInner({ title, children, onSyncComplete, noPadding }: AppShellProps) {
  const { loading } = useUser()

  if (loading) return <ShellSkeleton />

  return (
    <div className="flex h-screen bg-[#F7F7F5] dark:bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} onSyncComplete={onSyncComplete} />
        <main className={noPadding ? 'flex-1 overflow-hidden' : 'flex-1 overflow-y-auto p-6'}>
          {children}
        </main>
      </div>
    </div>
  )
}

export function AppShell({ title, children, onSyncComplete, noPadding }: AppShellProps) {
  return (
    <UserProvider>
      <ShellInner title={title} onSyncComplete={onSyncComplete} noPadding={noPadding}>
        {children}
      </ShellInner>
    </UserProvider>
  )
}
