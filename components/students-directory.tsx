"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { students } from "@/lib/data";
import type { SupportLevel } from "@/lib/types";
import { StudentTable } from "./student-table";

export function StudentsDirectory() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<SupportLevel | "semua">("semua");
  const [className, setClassName] = useState("semua");

  const classes = [...new Set(students.map((student) => student.className))];
  const filtered = useMemo(() => students.filter((student) => {
    const matchesQuery = `${student.name} ${student.className}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (level === "semua" || student.supportLevel === level) && (className === "semua" || student.className === className);
  }), [query, level, className]);

  return (
    <section className="panel directory-panel">
      <div className="filter-row">
        <label className="field-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau kelas..." /></label>
        <label className="select-wrap"><Filter size={16} /><select value={level} onChange={(event) => setLevel(event.target.value as SupportLevel | "semua")}><option value="semua">Semua dukungan</option><option value="tinggi">Dukungan segera</option><option value="sedang">Perlu dipantau</option><option value="stabil">Berkembang stabil</option></select></label>
        <label className="select-wrap"><select value={className} onChange={(event) => setClassName(event.target.value)}><option value="semua">Semua kelas</option>{classes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <span className="result-count">{filtered.length} siswa</span>
      </div>
      {filtered.length ? <StudentTable data={filtered} /> : <div className="no-results"><strong>Siswa tidak ditemukan</strong><p>Coba ubah kata pencarian atau filter.</p></div>}
    </section>
  );
}
