'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-lg overflow-hidden">
      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] transition-colors
          ${theme === 'dark'
            ? 'bg-[#1A1A1A] text-[#F2F2F2]'
            : 'bg-transparent text-[#AAAAAA] hover:text-[#888888]'
          }`}
      >
        <Moon size={12} />
        Dark
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] transition-colors
          ${theme === 'light'
            ? 'bg-[#EBEBEB] text-[#111111]'
            : 'bg-transparent text-[#4A4A4A] hover:text-[#888888]'
          }`}
      >
        <Sun size={12} />
        Light
      </button>
    </div>
  )
}
