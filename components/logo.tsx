import Link from "next/link";
import { Footprints } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Langkah beranda">
      <span className="brand-mark"><Footprints size={21} strokeWidth={2.4} /></span>
      {!compact && <span>langkah<span className="brand-dot">.</span></span>}
    </Link>
  );
}
