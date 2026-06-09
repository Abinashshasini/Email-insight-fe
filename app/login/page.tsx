'use client';
import { useState } from 'react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Zap, Check, Loader2, Plane, CreditCard, Package } from 'lucide-react';

type LoginState = 'idle' | 'loading' | 'success';

export default function LoginPage() {
  const [state, setState] = useState<LoginState>('idle');

  const handleLogin = () => {
    window.open
    setTimeout(() => setState('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #888 1px, transparent 1px),
            linear-gradient(to bottom, #888 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.035,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, #666 1px, transparent 1px),
            linear-gradient(to bottom, #666 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.06,
        }}
      />

      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-[440px] w-full px-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#111111] dark:bg-[#F2F2F2] rounded-xl flex items-center justify-center">
            <Zap size={20} className="text-[#F2F2F2] dark:text-[#111111]" />
          </div>
          <span className="text-[26px] font-medium text-[#111111] dark:text-[#F2F2F2] tracking-[-0.03em]">
            PIE
          </span>
        </div>

        {/* Badge */}
        <div className="mb-10 px-4 py-1.5 bg-[#E8E8E5] dark:bg-[#1A1A1A] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-full">
          <span className="text-[12px] font-mono text-[#888888] dark:text-[#8A8A8A] tracking-widest uppercase">
            Personal Intelligence Engine
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[42px] font-light text-[#111111] dark:text-[#F2F2F2] text-center leading-[1.1] tracking-[-0.03em] mb-5">
          Stop hunting through
          <br />
          <span className="font-semibold">your inbox.</span>
        </h1>

        <p className="text-[16px] text-[#888888] dark:text-[#8A8A8A] text-center leading-[1.6] mb-10 max-w-90">
          PIE connects to Gmail and automatically pulls out flights, bill due
          dates, deliveries, and bookings — organized and prioritized before you
          open the app.
        </p>

        {/* Extracted examples — shows the product, doesn't just describe it */}
        <div className="w-full flex flex-col gap-2 mb-10">
          {[
            {
              icon: <Plane size={13} className="text-blue-400 shrink-0" />,
              label: 'IndiGo 6E 342 — Terminal 2, today 18:45',
              meta: 'from goindigo.in',
              chip: 'flight',
              chipCls:
                'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300',
            },
            {
              icon: (
                <CreditCard size={13} className="text-amber-400 shrink-0" />
              ),
              label: 'HDFC Card bill ₹8,240 — due tomorrow',
              meta: 'from hdfcbank.com',
              chip: 'finance',
              chipCls:
                'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300',
            },
            {
              icon: <Package size={13} className="text-green-400 shrink-0" />,
              label: 'Amazon order out for delivery today',
              meta: 'from amazon.in',
              chip: 'delivery',
              chipCls:
                'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300',
            },
          ].map((item) => (
            <div
              key={item.chip}
              className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-xl"
            >
              {item.icon}
              <span className="flex-1 text-[13px] text-[#111111] dark:text-[#E0E0E0] truncate">
                {item.label}
              </span>
              <span
                className={`shrink-0 px-2 py-0.5 text-[10px] font-mono rounded uppercase tracking-wide ${item.chipCls}`}
              >
                {item.chip}
              </span>
            </div>
          ))}
          <p className="text-center text-[12px] text-[#AAAAAA] dark:text-[#555555] mt-1">
            All extracted automatically — zero manual tagging.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleLogin}
          disabled={state === 'loading' || state === 'success'}
          className={`w-full flex items-center justify-center gap-3 h-12 rounded-xl border text-[15px] font-medium transition-all
            ${
              state === 'success'
                ? 'bg-[#111111] dark:bg-[#F2F2F2] border-[#111111] dark:border-[#F2F2F2] text-[#F2F2F2] dark:text-[#111111]'
                : state === 'loading'
                  ? 'border-[#888888] dark:border-[#888888] text-[#111111] dark:text-[#F2F2F2] bg-transparent'
                  : 'border-[#E4E4E0] dark:border-[#2E2E2E] text-[#111111] dark:text-[#F2F2F2] hover:border-[#888888] dark:hover:border-[#888888]'
            }`}
        >
          {state === 'loading' && (
            <Loader2 size={16} className="animate-spin" />
          )}
          {state === 'success' && <Check size={16} />}
          {state === 'idle' && (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          {state === 'idle' && 'Continue with Google'}
          {state === 'loading' && 'Connecting...'}
          {state === 'success' && 'Connected'}
        </button>

        <p className="mt-5 text-[12px] text-[#AAAAAA] dark:text-[#4A4A4A] text-center leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          <br />
          We only request read access.
        </p>
      </div>
    </div>
  );
}
