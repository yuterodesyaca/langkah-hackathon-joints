import { Circle } from "lucide-react";
import { levelLabel } from "@/lib/support";
import type { SupportLevel } from "@/lib/types";

export function SupportBadge({ level, short = false }: { level: SupportLevel; short?: boolean }) {
  return (
    <span className={`support-badge support-${level}`}>
      <Circle size={8} fill="currentColor" strokeWidth={0} />
      {short ? (level === "tinggi" ? "Segera" : level === "sedang" ? "Pantau" : "Stabil") : levelLabel(level)}
    </span>
  );
}
