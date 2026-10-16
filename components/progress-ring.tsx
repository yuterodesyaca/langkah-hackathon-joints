export function ProgressRing({ value, label, tone = "purple" }: { value: number; label: string; tone?: "purple" | "green" | "amber" }) {
  return <div className="progress-summary"><div className={`progress-ring ring-${tone}`} style={{ "--progress": `${value * 3.6}deg` } as React.CSSProperties}><span><strong>{value}%</strong><small>{label}</small></span></div></div>;
}
