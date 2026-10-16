import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({ label, value, note, trend, icon: Icon, tone = "purple" }: { label: string; value: string; note: string; trend?: "up" | "down"; icon: LucideIcon; tone?: "purple" | "amber" | "green" | "rose" }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon tone-${tone}`}><Icon size={20} /></div>
      <div className="stat-copy"><span>{label}</span><strong>{value}</strong><small className={trend ? `trend-${trend}` : ""}>{trend === "up" && <ArrowUpRight size={13} />}{trend === "down" && <ArrowDownRight size={13} />}{note}</small></div>
    </article>
  );
}
