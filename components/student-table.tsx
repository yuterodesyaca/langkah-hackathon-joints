import Link from "next/link";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import type { Student } from "@/lib/types";
import { SupportBadge } from "./support-badge";

export function StudentTable({ data, compact = false }: { data: Student[]; compact?: boolean }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead><tr><th>Siswa</th><th>Kelas</th><th>Kehadiran</th><th>Perubahan nilai</th><th>Kebutuhan dukungan</th><th><span className="sr-only">Aksi</span></th></tr></thead>
        <tbody>{data.map((student) => {
          const scoreDiff = student.averageScore - student.previousScore;
          return <tr key={student.id}>
            <td><Link href={`/students/${student.id}`} className="student-cell"><span className="avatar" style={{ background: student.avatar }}>{student.initials}</span><span><strong>{student.name}</strong><small>Diperbarui {student.updatedAt}</small></span></Link></td>
            <td>{student.className}</td>
            <td><div className="metric-cell"><strong>{student.attendance}%</strong><span className="mini-track"><i style={{ width: `${student.attendance}%` }} /></span></div></td>
            <td><span className={scoreDiff < 0 ? "negative" : "positive"}>{scoreDiff > 0 ? "+" : ""}{scoreDiff} poin</span></td>
            <td><SupportBadge level={student.supportLevel} short={compact} /></td>
            <td><Link href={`/students/${student.id}`} className="icon-button small" aria-label={`Buka profil ${student.name}`}>{compact ? <ArrowUpRight size={17} /> : <MoreHorizontal size={18} />}</Link></td>
          </tr>;
        })}</tbody>
      </table>
    </div>
  );
}
