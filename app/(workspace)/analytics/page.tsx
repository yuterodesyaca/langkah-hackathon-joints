import { Download, TrendingUp, Users, CheckCircle2, Clock3 } from "lucide-react";
import { AnalyticsCharts } from "@/components/analytics-charts";
import { PageHeading } from "@/components/page-heading";
import { StatCard } from "@/components/stat-card";

export default function AnalyticsPage() {
  return <><PageHeading eyebrow="LAPORAN AGREGAT" title="Analitik pendampingan" description="Ukur perkembangan program tanpa kehilangan konteks manusia di balik data." actions={<button className="button ghost"><Download size={17}/> Unduh laporan</button>}/><div className="stat-grid analytics-stats"><StatCard label="Siswa berkembang positif" value="79" note="Naik 8% dari bulan lalu" trend="up" icon={TrendingUp} tone="green"/><StatCard label="Cakupan asesmen" value="92%" note="118 dari 128 siswa" icon={Users} tone="purple"/><StatCard label="Intervensi selesai" value="38" note="Dalam semester ini" icon={CheckCircle2} tone="green"/><StatCard label="Rata-rata waktu respons" value="4,2 hari" note="Lebih cepat 1,3 hari" trend="down" icon={Clock3} tone="amber"/></div><AnalyticsCharts/></>;
}
