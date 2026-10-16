"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Check, ChevronRight, Clock3, Plus, Search } from "lucide-react";
import { interventions as initialInterventions, studentById } from "@/lib/data";
import type { InterventionStatus } from "@/lib/types";

const tabs: Array<{ value: InterventionStatus | "semua"; label: string }> = [{ value: "semua", label: "Semua" }, { value: "direncanakan", label: "Direncanakan" }, { value: "berjalan", label: "Berjalan" }, { value: "selesai", label: "Selesai" }];

export function InterventionBoard() {
  const [items, setItems] = useState(initialInterventions);
  const [tab, setTab] = useState<InterventionStatus | "semua">("semua");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(false);
  const visible = useMemo(() => items.filter((item) => (tab === "semua" || item.status === tab) && `${item.title} ${studentById(item.studentId)?.name}`.toLowerCase().includes(query.toLowerCase())), [items, tab, query]);

  function complete(id: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, status: "selesai", progress: 100 } : item));
    setToast(true); setTimeout(() => setToast(false), 2600);
  }

  return <>
    <section className="panel intervention-panel">
      <div className="board-toolbar"><div className="tabs">{tabs.map((item) => <button key={item.value} className={tab === item.value ? "active" : ""} onClick={() => setTab(item.value)}>{item.label}<span>{item.value === "semua" ? items.length : items.filter((i) => i.status === item.value).length}</span></button>)}</div><label className="field-search small"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari tindak lanjut..." /></label></div>
      <div className="intervention-list">{visible.map((item) => {
        const student = studentById(item.studentId)!;
        return <article className="intervention-item" key={item.id}>
          <div className={`type-icon type-${item.type.toLowerCase()}`}>{item.type.charAt(0)}</div>
          <div className="intervention-main"><div className="intervention-title"><span className={`status status-${item.status}`}>{item.status}</span><h3>{item.title}</h3></div><Link href={`/students/${student.id}`} className="student-inline"><span className="avatar tiny" style={{ background: student.avatar }}>{student.initials}</span>{student.name} · {student.className}</Link><p>{item.lastNote}</p><div className="progress-line"><i style={{ width: `${item.progress}%` }} /><span>{item.progress}%</span></div></div>
          <div className="intervention-meta"><span><Calendar size={15} />{item.dueDate}</span><span><Clock3 size={15} />{item.owner}</span>{item.status !== "selesai" ? <button className="button soft small-button" onClick={() => complete(item.id)}><Check size={15} /> Tandai selesai</button> : <span className="completed-label"><Check size={15} /> Selesai</span>}</div>
          <Link href={`/students/${student.id}`} className="icon-button small"><ChevronRight size={18} /></Link>
        </article>;
      })}{!visible.length && <div className="no-results"><strong>Belum ada tindak lanjut</strong><p>Buat intervensi baru atau ubah filter yang dipilih.</p><button className="button primary"><Plus size={16} /> Buat tindak lanjut</button></div>}</div>
    </section>
    {toast && <div className="toast"><Check size={18} /><span><strong>Tindak lanjut diselesaikan</strong><small>Progres siswa telah diperbarui.</small></span></div>}
  </>;
}
