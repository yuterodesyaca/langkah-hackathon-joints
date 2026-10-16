import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2, ClipboardPlus, HeartHandshake, Sparkles, TrendingUp, TriangleAlert, Users } from "lucide-react";
import { DashboardTrendChart } from "@/components/dashboard-charts";
import { PageHeading } from "@/components/page-heading";
import { ProgressRing } from "@/components/progress-ring";
import { StatCard } from "@/components/stat-card";
import { StudentTable } from "@/components/student-table";
import { interventions, studentById, students } from "@/lib/data";

export default function DashboardPage() {
  const priority = students.filter(s => s.supportLevel !== "stabil").slice(0, 4);
  return <>
    <PageHeading eyebrow="KAMIS, 15 OKTOBER 2026" title="Selamat pagi, Ibu Rani 👋" description="Berikut perkembangan pendampingan siswa hari ini." actions={<><Link className="button ghost" href="/interventions"><CalendarCheck size={17}/> Lihat jadwal</Link><Link className="button primary" href="/assessment"><ClipboardPlus size={17}/> Asesmen baru</Link></>}/>
    <div className="stat-grid"><StatCard label="Dukungan segera" value="14" note="3 lebih sedikit bulan ini" trend="down" icon={TriangleAlert} tone="rose"/><StatCard label="Perlu dipantau" value="27" note="5 asesmen perlu ditinjau" icon={Users} tone="amber"/><StatCard label="Intervensi aktif" value="12" note="4 jatuh tempo minggu ini" icon={HeartHandshake} tone="purple"/><StatCard label="Perkembangan positif" value="79" note="Naik 8% dari bulan lalu" trend="up" icon={TrendingUp} tone="green"/></div>
    <div className="dashboard-grid"><section className="panel priority-panel"><div className="panel-head"><div><span className="eyebrow">PRIORITAS HARI INI</span><h2>Siswa yang perlu disapa</h2><p>Berdasarkan perubahan terbaru dan tindak lanjut yang belum selesai.</p></div><Link href="/students" className="text-link">Lihat semua <ArrowRight size={15}/></Link></div><StudentTable data={priority} compact/></section>
      <section className="panel progress-panel"><div className="panel-head"><div><span className="eyebrow">BULAN INI</span><h2>Progres pendampingan</h2></div></div><ProgressRing value={72} label="tuntas"/><div className="progress-details"><div><i className="green-dot"/><span><strong>18</strong><small>Intervensi selesai</small></span></div><div><i className="purple-dot"/><span><strong>7</strong><small>Sedang berjalan</small></span></div><div><i className="amber-dot"/><span><strong>4</strong><small>Direncanakan</small></span></div></div><Link href="/interventions" className="button soft full">Kelola tindak lanjut <ArrowRight size={16}/></Link></section>
      <section className="panel trend-panel"><div className="panel-head"><div><span className="eyebrow">TREN SEKOLAH</span><h2>Kebutuhan dukungan segera</h2><p>Jumlah siswa selama enam bulan terakhir.</p></div><span className="positive-label">↓ 22% sejak Mei</span></div><DashboardTrendChart/></section>
      <section className="panel schedule-panel"><div className="panel-head"><div><span className="eyebrow">JADWAL TERDEKAT</span><h2>Tindak lanjut berikutnya</h2></div><Link href="/interventions" className="icon-button small"><ArrowRight size={17}/></Link></div><div className="schedule-list">{interventions.filter(i=>i.status!=="selesai").slice(0,3).map((item,index)=>{const s=studentById(item.studentId)!;return <div key={item.id}><span className="date-box"><strong>{16+index}</strong><small>OKT</small></span><div><strong>{item.title}</strong><small><span className="avatar micro" style={{background:s.avatar}}>{s.initials}</span>{s.name} · {item.owner}</small></div><span className={`status-dot ${index===0?"urgent":""}`}/></div>})}</div></section>
    </div>
    <section className="nudge-card"><span className="nudge-icon"><Sparkles size={22}/></span><div><strong>Insight hari ini</strong><p>Tindak lanjut yang dimulai dalam 7 hari setelah perubahan kehadiran memiliki peluang penyelesaian <b>1,8× lebih tinggi.</b></p></div><Link href="/analytics" className="text-link">Lihat analitik <ArrowRight size={15}/></Link><CheckCircle2 className="nudge-decor"/></section>
  </>;
}
