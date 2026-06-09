'use client'
import Image from 'next/image'
import { RefreshCw, Check, LogOut } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useUser } from '@/providers/UserProvider'

interface TopbarProps {
  title: string
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function Topbar({ title }: TopbarProps) {
  const { user, syncing, syncResult, handleSync, logout } = useUser()

  return (
    <header className="h-13 sticky top-0 z-10 flex items-center justify-between px-5 bg-[#F7F7F5] dark:bg-[#0A0A0A] border-b border-[#E4E4E0] dark:border-[#1F1F1F]">
      <h1 className="text-[14px] font-medium text-[#111111] dark:text-[#F2F2F2] tracking-[-0.01em]">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Sync button + result */}
        <div className="flex items-center gap-2">
          {syncResult && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-[#888888] dark:text-[#8A8A8A]">
              <Check size={10} className="text-[#22C55E]" />
              {syncResult}
            </span>
          )}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-[#888888] dark:text-[#8A8A8A] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-lg hover:text-[#111111] dark:hover:text-[#F2F2F2] hover:border-[#DDDDD8] dark:hover:border-[#555555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={11} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing…' : 'Sync'}
          </button>
        </div>

        {/* Avatar + logout */}
        <div className="relative group">
          <button className="w-7 h-7 rounded-full overflow-hidden bg-[#E8E8E5] dark:bg-[#222222] flex items-center justify-center">
            {user?.picture ? (
              <Image src={user.picture} alt={user.name} width={28} height={28} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[11px] font-medium text-[#111111] dark:text-[#F2F2F2]">
                {user ? initials(user.name) : '…'}
              </span>
            )}
          </button>
          {/* Dropdown on hover */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-xl shadow-sm opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
            {user && (
              <div className="px-4 py-3 border-b border-[#E4E4E0] dark:border-[#1F1F1F]">
                <p className="text-[12px] font-medium text-[#111111] dark:text-[#F2F2F2] truncate">{user.name}</p>
                <p className="text-[11px] text-[#888888] dark:text-[#8A8A8A] truncate mt-0.5">{user.email}</p>
              </div>
            )}
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] text-[#888888] dark:text-[#8A8A8A] hover:text-[#EF4444] hover:bg-[#F7F7F5] dark:hover:bg-[#1A1A1A] transition-colors"
            >
              <LogOut size={12} />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
