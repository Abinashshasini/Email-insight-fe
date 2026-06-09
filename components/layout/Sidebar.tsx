'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Mail,
  Zap,
  Calendar,
  MessageSquare,
  BarChart2,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/emails', icon: Mail, label: 'Emails' },
  { href: '/insights', icon: Zap, label: 'Insights' },
  { href: '/timeline', icon: Calendar, label: 'Timeline' },
  { href: '/assistant', icon: MessageSquare, label: 'Assistant' },
  { href: '/analytics', icon: BarChart2, label: 'Analytics' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-[220px] shrink-0 h-screen sticky top-0 bg-white dark:bg-[#111111] border-r border-[#E4E4E0] dark:border-[#1F1F1F]">
      {/* Logo */}
      <div className="h-[52px] flex items-center px-5 border-b border-[#E4E4E0] dark:border-[#1F1F1F]">
        <span className="text-[15px] font-medium tracking-tight text-[#111111] dark:text-[#F2F2F2]">
          PIE
        </span>
        <span className="ml-2 text-[10px] text-[#AAAAAA] dark:text-[#555555] font-mono">●</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors group
                ${active
                  ? 'bg-[#F0F0EE] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#F2F2F2] border-l-2 border-[#111111] dark:border-[#F2F2F2]'
                  : 'text-[#888888] dark:text-[#4A4A4A] hover:bg-[#F0F0EE] dark:hover:bg-[#1A1A1A] hover:text-[#111111] dark:hover:text-[#8A8A8A] border-l-2 border-transparent'
                }`}
            >
              <Icon size={16} strokeWidth={1.5} className="shrink-0" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[#E4E4E0] dark:border-[#1F1F1F]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#E8E8E5] dark:bg-[#222222] flex items-center justify-center shrink-0">
            <span className="text-[11px] font-medium text-[#111111] dark:text-[#F2F2F2]">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[#111111] dark:text-[#F2F2F2] truncate">Abinash</p>
            <p className="text-[11px] text-[#888888] dark:text-[#4A4A4A] truncate">abinash@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
