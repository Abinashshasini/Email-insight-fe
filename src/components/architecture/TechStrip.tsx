const TECH = [
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Redis',
  'BullMQ',
  'Gmail API',
  'OAuth 2.0',
];

export function TechStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {TECH.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1.5 text-[12px] font-mono text-[#888888] dark:text-[#8A8A8A] bg-[#E8E8E5] dark:bg-[#1A1A1A] border border-[#E4E4E0] dark:border-[#2E2E2E] rounded-full"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
