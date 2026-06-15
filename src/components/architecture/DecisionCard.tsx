import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Decision {
  icon: LucideIcon;
  title: string;
  body: ReactNode;
}

export function DecisionCard({ icon: Icon, title, body }: Decision) {
  return (
    <div className="flex flex-col gap-3 p-6 bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 shrink-0 rounded-lg bg-[#E8E8E5] dark:bg-[#1A1A1A] border border-[#E4E4E0] dark:border-[#2E2E2E] flex items-center justify-center">
          <Icon size={15} className="text-[#111111] dark:text-[#F2F2F2]" />
        </div>
        <h3 className="text-[15px] font-medium text-[#111111] dark:text-[#F2F2F2] tracking-[-0.01em]">
          {title}
        </h3>
      </div>
      <p className="text-[13px] leading-[1.65] text-[#666666] dark:text-[#9A9A9A]">
        {body}
      </p>
    </div>
  );
}
