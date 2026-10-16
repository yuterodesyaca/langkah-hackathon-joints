import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return <div className="empty-state"><span><Icon size={24} /></span><strong>{title}</strong><p>{description}</p></div>;
}
