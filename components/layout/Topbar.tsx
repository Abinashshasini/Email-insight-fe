'use client'
import { RefreshCw } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

interface TopbarProps {
  title: string
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="h-13 sticky top-0 z-10 flex items-center justify-between px-5 bg-[#F7F7F5] dark:bg-[#0A0A0A] border-b border-[#E4E4E0] dark:border-[#1F1F1F]">
      <h1 className="text-[14px] font-medium text-[#111111] dark:text-[#F2F2F2] tracking-[-0.01em]">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-[#888888] dark:text-[#4A4A4A] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-lg hover:text-[#111111] dark:hover:text-[#8A8A8A] transition-colors">
          <RefreshCw size={11} />
          Sync
        </button>
        <div className="w-7 h-7 rounded-full bg-[#E8E8E5] dark:bg-[#222222] flex items-center justify-center">
          <span className="text-[11px] font-medium text-[#111111] dark:text-[#F2F2F2]">A</span>
        </div>
      </div>
    </header>
  )
}
