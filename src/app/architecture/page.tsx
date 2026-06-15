import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, Split, Filter, Regex, Workflow } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { PipelineDiagram } from '@/components/architecture/PipelineDiagram';
import { StatsBar } from '@/components/architecture/StatsBar';
import { DecisionCard, type Decision } from '@/components/architecture/DecisionCard';
import { TechStrip } from '@/components/architecture/TechStrip';

export const metadata: Metadata = {
  title: 'How PIE works — Architecture',
  description:
    "One email's journey from inbox to insight, through a priority-based, queue-driven pipeline.",
};

// inline mono snippet, matching the badge style
function M({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1 py-0.5 text-[12px] font-mono rounded bg-[#E8E8E5] dark:bg-[#1A1A1A] text-[#111111] dark:text-[#F2F2F2]">
      {children}
    </code>
  );
}

const DECISIONS: Decision[] = [
  {
    icon: Workflow,
    title: 'Queues over inline processing',
    body: (
      <>
        Sync ran via <M>setImmediate</M> inside the API process — fine for one user, fatal at scale:
        jobs died on restart and concurrent syncs choked the event loop. Moved to BullMQ with a
        dedicated worker process. Jobs now survive crashes and scale horizontally.
      </>
    ),
  },
  {
    icon: Split,
    title: 'Two queues, split by workload — not by feature',
    body: (
      <>
        Sync jobs are long-running and Gmail-rate-limited (concurrency 5). Extraction jobs are short,
        local CPU work (concurrency 10). One queue would force one config on both and let floods of
        cheap jobs starve critical ones. Isolation = independent tuning, scaling, and blast radius.
      </>
    ),
  },
  {
    icon: Filter,
    title: 'Filter at source, classify at write',
    body: (
      <>
        The Gmail query excludes promotions/social before fetching — 32% of the inbox never costs an
        API call, a DB write, or a categoriser cycle. Surviving emails are categorised once, inline
        during sync. Never re-scan stored data.
      </>
    ),
  },
  {
    icon: Regex,
    title: 'Regex first, AI as fallback',
    body: (
      <>
        Structured senders (airlines, banks) parse with regex at zero cost. Only low-confidence
        leftovers will route to an LLM, rationed by a token bucket. Misses are logged to mine new
        regex rules — the cheap path&apos;s hit rate grows over time.
      </>
    ),
  },
];

function GridBackground() {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #888 1px, transparent 1px),
            linear-gradient(to bottom, #888 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: 0.035,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, #666 1px, transparent 1px),
            linear-gradient(to bottom, #666 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: 0.06,
        }}
      />
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block px-3 py-1 bg-[#E8E8E5] dark:bg-[#1A1A1A] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-full">
      <span className="text-[11px] font-mono text-[#888888] dark:text-[#8A8A8A] tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#0A0A0A] relative overflow-hidden">
      <GridBackground />

      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <main className="relative z-10 max-w-[1100px] mx-auto px-6 py-20 sm:py-28 flex flex-col gap-28">
        {/* Section 1 — Hero + animated pipeline */}
        <section className="flex flex-col items-center">
          <SectionLabel>Personal Intelligence Engine</SectionLabel>
          <h1 className="mt-8 text-[40px] sm:text-[52px] font-light text-[#111111] dark:text-[#F2F2F2] text-center leading-[1.05] tracking-[-0.03em]">
            How <span className="font-semibold">PIE</span> works
          </h1>
          <p className="mt-5 max-w-[560px] text-center text-[16px] leading-[1.6] text-[#888888] dark:text-[#8A8A8A]">
            One email&apos;s journey from inbox to insight — through a priority-based, queue-driven
            pipeline.
          </p>

          <div className="mt-16 w-full">
            <PipelineDiagram />
          </div>
        </section>

        {/* Section 2 — Numbers bar */}
        <section className="flex flex-col gap-7">
          <SectionLabel>By the numbers</SectionLabel>
          <StatsBar />
        </section>

        {/* Section 3 — Design decisions */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <SectionLabel>Why it&apos;s built this way</SectionLabel>
            <p className="max-w-[600px] text-[15px] leading-[1.6] text-[#888888] dark:text-[#8A8A8A]">
              Each choice traded something. Here&apos;s what, and why.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DECISIONS.map((d) => (
              <DecisionCard key={d.title} {...d} />
            ))}
          </div>
        </section>

        {/* Section 4 — Tech stack strip */}
        <section className="flex flex-col items-center gap-6">
          <SectionLabel>Built with</SectionLabel>
          <TechStrip />
        </section>

        {/* Section 5 — Footer CTA */}
        <section className="flex flex-col items-center gap-6 pb-4">
          <h2 className="text-[28px] sm:text-[34px] font-light text-[#111111] dark:text-[#F2F2F2] text-center tracking-[-0.03em]">
            Want to see it running?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 h-11 px-6 rounded-xl bg-[#111111] dark:bg-[#F2F2F2] text-[#F2F2F2] dark:text-[#111111] text-[14px] font-medium transition-opacity hover:opacity-90"
            >
              Open PIE
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            {/* TODO: replace href with the public repository URL */}
            <a
              href="#"
              className="flex items-center gap-2 h-11 px-6 rounded-xl border border-[#E4E4E0] dark:border-[#2E2E2E] text-[#111111] dark:text-[#F2F2F2] text-[14px] font-medium transition-colors hover:border-[#888888] dark:hover:border-[#888888]"
            >
              <Code2 size={15} />
              View source
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
