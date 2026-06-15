'use client';
import type { CSSProperties } from 'react';
import {
  Mail,
  RefreshCw,
  Tags,
  Layers,
  Cpu,
  Database,
  LayoutDashboard,
  Server,
  type LucideIcon,
} from 'lucide-react';

type Reveal = 'category' | 'json';

interface NodeDef {
  id: string;
  name: string;
  icon: LucideIcon;
  sub: string;
  queue?: boolean;
  reveal?: Reveal;
}

const NODES: Record<string, NodeDef> = {
  express: { id: 'express', name: 'Express API', icon: Server, sub: 'POST /sync · enqueue' },
  emailq: { id: 'emailq', name: 'email-sync queue', icon: Layers, sub: 'BullMQ · rate-limited', queue: true },
  sync: { id: 'sync', name: 'Sync Worker', icon: RefreshCw, sub: 'concurrency: 5 · retry ×3' },
  gmail: { id: 'gmail', name: 'Gmail API', icon: Mail, sub: '-category:promotions -social' },
  cat: { id: 'cat', name: 'Categoriser', icon: Tags, sub: '14 categories · domain-first', reveal: 'category' },
  exq: { id: 'exq', name: 'extraction queue', icon: Layers, sub: 'BullMQ · isolated', queue: true },
  exw: { id: 'exw', name: 'Extraction Worker', icon: Cpu, sub: 'concurrency: 10 · regex-first', reveal: 'json' },
  insights: { id: 'insights', name: 'Insights', icon: Database, sub: 'typed · deduplicated' },
  dash: { id: 'dash', name: 'Dashboard', icon: LayoutDashboard, sub: 'realtime · prioritised' },
};

// Main left→right pipeline (the dot travels these on desktop)
const MAIN = [NODES.gmail, NODES.sync, NODES.cat, NODES.exq, NODES.exw, NODES.insights, NODES.dash];
// Causal order for the stacked mobile/reduced-motion view
const VERTICAL = [
  NODES.express,
  NODES.emailq,
  NODES.sync,
  NODES.gmail,
  NODES.cat,
  NODES.exq,
  NODES.exw,
  NODES.insights,
  NODES.dash,
];

const N = MAIN.length;
const POS = (i: number) => 7 + (i / (N - 1)) * 86; // left % of each node center
const ARRIVE = (i: number) => 5 + (i / (N - 1)) * 70; // dot arrival time %
const PAUSE = 4;
const r = (n: number) => Math.round(n * 100) / 100;

function buildCss(): string {
  // travelling dot keyframes (left + opacity)
  const travel: string[] = [`0%{left:${r(POS(0))}%;opacity:0}`, `3%{opacity:1}`];
  for (let i = 0; i < N; i++) {
    travel.push(`${r(ARRIVE(i))}%{left:${r(POS(i))}%}`);
    travel.push(`${r(ARRIVE(i) + PAUSE)}%{left:${r(POS(i))}%}`);
  }
  travel.push(`88%{left:${r(POS(N - 1))}%;opacity:1}`);
  travel.push(`94%{left:${r(POS(N - 1))}%;opacity:0}`);
  travel.push(`100%{left:${r(POS(0))}%;opacity:0}`);

  // per-node activation: animate the inherited custom property --on 0→1→0
  const nodeAnims: string[] = [];
  const nodeKeys: string[] = [];
  for (let i = 0; i < N; i++) {
    const a = ARRIVE(i);
    const off1 = Math.max(0, a - 3);
    const hold = a + PAUSE;
    const off2 = hold + 3;
    nodeKeys.push(`.pipe-n-${i}`);
    nodeAnims.push(
      `.pipe-n-${i}{animation:pon-${i} var(--cycle) linear infinite}` +
        `@keyframes pon-${i}{0%{--on:0}${r(off1)}%{--on:0}${r(a)}%{--on:1}${r(hold)}%{--on:1}${r(off2)}%{--on:0}100%{--on:0}}`,
    );
  }

  return `
@property --on{syntax:"<number>";inherits:true;initial-value:0}
.pipe-dot{animation:pipe-travel var(--cycle) linear infinite}
@keyframes pipe-travel{${travel.join('')}}
${nodeAnims.join('\n')}
@media (prefers-reduced-motion: reduce){
  .pipe-dot{display:none}
  ${nodeKeys.join(',')}{animation:none!important;--on:1}
}`;
}

const CSS = buildCss();

function ThreeBars() {
  return (
    <div className="flex flex-col gap-[3px] w-9">
      <span
        className="h-[5px] rounded-full bg-[#5B9DFF]"
        style={{
          transform: 'translateX(calc(var(--on) * 22px))',
          opacity: 'calc(1 - var(--on) * 0.9)',
        }}
      />
      <span className="h-[5px] rounded-full bg-[#9CC2FF] dark:bg-[#3C5C8F]" />
      <span className="h-[5px] rounded-full bg-[#C9DCFF] dark:bg-[#2A3F5F]" />
    </div>
  );
}

function NodeCard({ node }: { node: NodeDef }) {
  const Icon = node.icon;
  return (
    <div className="relative w-full px-3.5 py-3 bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-xl">
      {/* activation ring (brightens + glows as --on → 1) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl border border-[#5B9DFF]"
        style={{
          opacity: 'var(--on)',
          boxShadow: '0 0 0 1px rgba(91,157,255,0.35), 0 6px 22px -8px rgba(91,157,255,0.55)',
        }}
      />
      <div className="relative flex items-center gap-2.5">
        {node.queue ? (
          <ThreeBars />
        ) : (
          <Icon size={16} className="shrink-0 text-[#111111] dark:text-[#F2F2F2]" />
        )}
        <span className="text-[12.5px] font-medium leading-tight text-[#111111] dark:text-[#F2F2F2]">
          {node.name}
        </span>
      </div>
      <p
        className="relative mt-2 text-[10.5px] font-mono leading-tight text-[#888888] dark:text-[#8A8A8A]"
        style={{ opacity: 'calc(0.45 + 0.55 * var(--on))' }}
      >
        {node.sub}
      </p>

      {node.reveal === 'category' && (
        <div className="relative mt-2 flex items-center gap-1.5">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#AAAAAA] dark:text-[#555]">
            →
          </span>
          <div className="h-[18px] overflow-hidden">
            <div
              className="flex flex-col"
              style={{ transform: 'translateY(calc(var(--on) * -36px))' }}
            >
              {['promotions', 'finance', 'travel'].map((c) => (
                <span
                  key={c}
                  className="h-[18px] flex items-center px-1.5 text-[10px] font-mono rounded uppercase tracking-wide bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 whitespace-nowrap"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {node.reveal === 'json' && (
        <p
          className="relative mt-2 text-[9.5px] font-mono leading-tight text-emerald-600 dark:text-emerald-400 whitespace-nowrap"
          style={{ opacity: 'var(--on)' }}
        >
          {'{ flight: "6E 6536", pnr: "RFYT3H" }'}
        </p>
      )}
    </div>
  );
}

export function PipelineDiagram() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── Desktop: animated horizontal pipeline ── */}
      <div
        className="relative mx-auto hidden lg:block w-full max-w-[1040px] h-[300px]"
        style={{ '--cycle': '12s' } as CSSProperties}
      >
        {/* main rail */}
        <div className="absolute top-[60px] left-[7%] right-[7%] h-px bg-[#E4E4E0] dark:bg-[#2E2E2E]" />
        {/* connector arrows between main nodes */}
        {MAIN.slice(0, -1).map((_, i) => (
          <span
            key={i}
            className="absolute top-[60px] -translate-y-1/2 text-[#C8C8C4] dark:text-[#3A3A3A] text-[11px]"
            style={{ left: `${r((POS(i) + POS(i + 1)) / 2)}%`, transform: 'translate(-50%,-50%)' }}
          >
            ▶
          </span>
        ))}

        {/* main nodes */}
        {MAIN.map((node, i) => (
          <div
            key={node.id}
            className={`pipe-n-${i} absolute top-[28px] -translate-x-1/2 w-[132px]`}
            style={{ left: `${r(POS(i))}%` }}
          >
            <NodeCard node={node} />
          </div>
        ))}

        {/* branch: Express API → email-sync queue → up into Sync Worker (idx 1) */}
        <div
          className="absolute flex items-center gap-2"
          style={{ top: '186px', left: `${r(POS(1))}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-[120px]">
            <NodeCard node={NODES.express} />
          </div>
          <span className="text-[#C8C8C4] dark:text-[#3A3A3A] text-[11px]">▶</span>
          <div className="w-[124px]">
            <NodeCard node={NODES.emailq} />
          </div>
        </div>
        {/* elbow connector from branch up to Sync Worker */}
        <div
          className="absolute w-px bg-[#E4E4E0] dark:bg-[#2E2E2E]"
          style={{ left: `${r(POS(1))}%`, top: '92px', height: '94px' }}
        />
        <span
          className="absolute text-[#C8C8C4] dark:text-[#3A3A3A] text-[10px] leading-none"
          style={{ left: `${r(POS(1))}%`, top: '88px', transform: 'translateX(-50%)' }}
        >
          ▲
        </span>
        <span
          className="absolute text-[9px] font-mono uppercase tracking-widest text-[#AAAAAA] dark:text-[#555]"
          style={{ left: `${r(POS(1))}%`, top: '160px', transform: 'translateX(-50%)' }}
        >
          sync trigger
        </span>

        {/* the travelling email */}
        <div
          className="pipe-dot absolute top-[60px] z-10"
          style={{ transform: 'translate(-50%,-50%)' }}
        >
          <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#5B9DFF] shadow-[0_0_16px_4px_rgba(91,157,255,0.6)]">
            <Mail size={11} className="text-white" />
          </span>
        </div>
      </div>

      {/* ── Mobile / tablet: static, fully-lit vertical pipeline ── */}
      <div className="lg:hidden flex flex-col items-center gap-0">
        {VERTICAL.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center w-full max-w-[280px]">
            <div className="w-full" style={{ '--on': 1 } as CSSProperties}>
              <NodeCard node={node} />
            </div>
            {i < VERTICAL.length - 1 && (
              <span className="my-1 text-[#C8C8C4] dark:text-[#3A3A3A] text-[11px] leading-none">
                ▼
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
