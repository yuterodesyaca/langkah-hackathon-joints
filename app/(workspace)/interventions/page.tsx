import { Plus } from "lucide-react";
import { InterventionBoard } from "@/components/intervention-board";
import { PageHeading } from "@/components/page-heading";

export default function InterventionsPage() {
  return <><PageHeading eyebrow="AKSI PENDAMPINGAN" title="Tindak lanjut" description="Rencanakan, koordinasikan, dan pantau setiap bentuk dukungan siswa." actions={<button className="button primary"><Plus size={17}/> Buat tindak lanjut</button>}/><div className="deadline-banner"><div><span>4</span><p><strong>Tindak lanjut membutuhkan perhatian minggu ini</strong><small>Dua akan jatuh tempo besok dan dua belum memiliki pembaruan.</small></p></div><button className="button light-small">Tinjau sekarang</button></div><InterventionBoard/></>;
}
