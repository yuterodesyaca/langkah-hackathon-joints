import Link from "next/link";
import { Download, UserPlus } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { StudentsDirectory } from "@/components/students-directory";

export default function StudentsPage() {
  return <><PageHeading eyebrow="DATA PENDAMPINGAN" title="Siswa" description="Lihat perkembangan dan kebutuhan dukungan siswa dalam satu tempat." actions={<><button className="button ghost"><Download size={17}/> Ekspor laporan</button><Link href="/assessment" className="button primary"><UserPlus size={17}/> Tambah asesmen</Link></>}/><div className="mini-summary"><span><strong>128</strong><small>Total siswa</small></span><span><strong className="rose-text">14</strong><small>Dukungan segera</small></span><span><strong className="amber-text">27</strong><small>Perlu dipantau</small></span><span><strong className="green-text">87</strong><small>Berkembang stabil</small></span></div><StudentsDirectory/></>;
}
