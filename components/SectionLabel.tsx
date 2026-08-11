export default function SectionLabel({
  num,
  label,
  className = "",
}: {
  num: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-champagne ${className}`}>
      <span>{num}</span>
      <span className="h-px w-8 bg-champagne/50" />
      <span>{label}</span>
    </div>
  );
}
