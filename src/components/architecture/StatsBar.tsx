'use client';
import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 32, suffix: '%', label: 'of inbox filtered at source — zero compute cost' },
  { value: 1690, label: 'emails synced & categorised in one run' },
  { value: 2, label: 'isolated queues — sync vs extraction workloads' },
  { value: 0, label: 'false positives in flight extraction (47-email test set)' },
  { value: 3, prefix: '×', label: 'automatic retries with exponential backoff' },
  { value: 100, suffix: '%', label: 'jobs survive server restarts (Redis-backed)' },
];

const DURATION = 600;

function StatCard({ stat, start }: { stat: Stat; start: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || stat.value === 0) {
      setDisplay(stat.value);
      return;
    }

    let raf = 0;
    let startTs: number | null = null;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      const t = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, stat.value]);

  return (
    <div className="flex flex-col gap-1.5 px-5 py-4 bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-xl min-w-[150px] flex-1">
      <span className="text-[28px] font-light tabular-nums text-[#111111] dark:text-[#F2F2F2] tracking-[-0.03em] leading-none">
        {stat.prefix ?? ''}
        {display.toLocaleString('en-US')}
        {stat.suffix ?? ''}
      </span>
      <span className="text-[12px] leading-[1.5] text-[#888888] dark:text-[#8A8A8A]">
        {stat.label}
      </span>
    </div>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap gap-3">
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} start={start} />
      ))}
    </div>
  );
}
