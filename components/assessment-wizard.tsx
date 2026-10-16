"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, ChevronLeft, Info, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { students } from "@/lib/data";
import { calculateSupport, levelLabel, type SupportResult } from "@/lib/support";

const initialForm = { studentId: "nadiap", attendance: 68, previousAttendance: 86, averageScore: 67, previousScore: 79, engagement: 2, motivation: 2, economicConstraint: true, familyResponsibility: true, languageBarrier: false, note: "" };

export function AssessmentWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState<SupportResult | null>(null);
  const selectedStudent = useMemo(() => students.find((student) => student.id === form.studentId)!, [form.studentId]);
  const update = (key: keyof typeof form, value: string | number | boolean) => setForm((current) => ({ ...current, [key]: value }));

  function analyze() {
    setResult(calculateSupport(form));
    setStep(3);
  }

  return (
    <div className="assessment-layout">
      <aside className="stepper-panel panel">
        <span className="eyebrow">ASESMEN TERARAH</span>
        <h2>Kenali kebutuhan, bukan memberi label.</h2>
        <p>Hasil asesmen adalah rekomendasi pendampingan. Guru tetap menjadi pengambil keputusan.</p>
        <div className="stepper">
          {[{ n: 1, t: "Pilih siswa", d: "Identitas dan konteks" }, { n: 2, t: "Indikator dukungan", d: "Akademik dan keseharian" }, { n: 3, t: "Tinjau hasil", d: "Rekomendasi transparan" }].map((item) => <div className={`step ${step === item.n ? "current" : ""} ${step > item.n ? "done" : ""}`} key={item.n}><span>{step > item.n ? <Check size={16} /> : item.n}</span><div><strong>{item.t}</strong><small>{item.d}</small></div></div>)}
        </div>
        <div className="privacy-note"><ShieldCheck size={19} /><span><strong>Privasi sejak awal</strong><small>Catat hanya data yang relevan untuk pendampingan.</small></span></div>
      </aside>

      <section className="panel assessment-form-card">
        {step === 1 && <>
          <div className="form-head"><span>Langkah 1 dari 3</span><h2>Pilih siswa yang akan didampingi</h2><p>Pastikan asesmen dilakukan berdasarkan observasi dan percakapan, bukan asumsi.</p></div>
          <div className="form-grid one">
            <label className="form-field"><span>Nama siswa</span><select value={form.studentId} onChange={(event) => {
              const next = students.find((student) => student.id === event.target.value)!;
              setForm({ ...form, studentId: next.id, attendance: next.attendance, previousAttendance: next.previousAttendance, averageScore: next.averageScore, previousScore: next.previousScore, engagement: next.engagement, motivation: next.motivation, economicConstraint: next.economicConstraint, familyResponsibility: next.familyResponsibility, languageBarrier: next.languageBarrier });
            }}>{students.map((student) => <option value={student.id} key={student.id}>{student.name} · {student.className}</option>)}</select></label>
            <div className="selected-student"><span className="avatar large" style={{ background: selectedStudent.avatar }}>{selectedStudent.initials}</span><span><strong>{selectedStudent.name}</strong><small>{selectedStudent.className} · Pendamping: {selectedStudent.counselor}</small></span><CheckCircle2 size={22} /></div>
            <label className="form-field"><span>Catatan konteks awal <em>opsional</em></span><textarea value={form.note} onChange={(event) => update("note", event.target.value)} placeholder="Contoh: perubahan yang diamati dalam dua minggu terakhir..." rows={4} /></label>
          </div>
          <div className="form-actions"><span /><button className="button primary" onClick={() => setStep(2)}>Lanjut ke indikator <ArrowRight size={17} /></button></div>
        </>}

        {step === 2 && <>
          <div className="form-head"><span>Langkah 2 dari 3</span><h2>Lengkapi indikator kebutuhan dukungan</h2><p>Gunakan data terbaru dan pilih kondisi yang sudah diketahui atau dikonfirmasi.</p></div>
          <div className="form-section"><h3>Akademik dan kehadiran</h3><div className="form-grid two">
            <NumberField label="Kehadiran saat ini (%)" value={form.attendance} onChange={(v) => update("attendance", v)} />
            <NumberField label="Kehadiran periode lalu (%)" value={form.previousAttendance} onChange={(v) => update("previousAttendance", v)} />
            <NumberField label="Rata-rata nilai saat ini" value={form.averageScore} onChange={(v) => update("averageScore", v)} />
            <NumberField label="Rata-rata nilai periode lalu" value={form.previousScore} onChange={(v) => update("previousScore", v)} />
          </div></div>
          <div className="form-section"><h3>Keterlibatan dan motivasi</h3><div className="form-grid two">
            <ScaleField label="Keterlibatan di kelas" value={form.engagement} onChange={(v) => update("engagement", v)} />
            <ScaleField label="Motivasi belajar" value={form.motivation} onChange={(v) => update("motivation", v)} />
          </div></div>
          <div className="form-section"><h3>Konteks pendukung</h3><div className="check-grid">
            <CheckField label="Kendala ekonomi terkonfirmasi" checked={form.economicConstraint} onChange={(v) => update("economicConstraint", v)} />
            <CheckField label="Tanggung jawab membantu keluarga" checked={form.familyResponsibility} onChange={(v) => update("familyResponsibility", v)} />
            <CheckField label="Hambatan bahasa pembelajaran" checked={form.languageBarrier} onChange={(v) => update("languageBarrier", v)} />
          </div></div>
          <div className="form-actions"><button className="button ghost" onClick={() => setStep(1)}><ChevronLeft size={17} /> Kembali</button><button className="button primary" onClick={analyze}><Sparkles size={17} /> Analisis kebutuhan</button></div>
        </>}

        {step === 3 && result && <>
          <div className="form-head"><span>Langkah 3 dari 3</span><h2>Hasil pendampingan {selectedStudent.name}</h2><p>Setiap alasan dapat ditelusuri dan tetap perlu ditinjau oleh guru.</p></div>
          <div className={`assessment-result result-${result.level}`}><div><span>Tingkat kebutuhan dukungan</span><h3>{levelLabel(result.level)}</h3><p>Skor indikator {result.score}/100 · bukan nilai akademik atau diagnosis siswa.</p></div><strong>{result.score}</strong></div>
          <div className="explain-grid"><div className="result-block"><h3>Mengapa hasil ini muncul?</h3>{result.factors.length ? <ul>{result.factors.map((factor) => <li key={factor}><Info size={16} />{factor}</li>)}</ul> : <p>Tidak ditemukan perubahan yang memerlukan perhatian khusus.</p>}</div><div className="result-block accent"><h3>Langkah yang disarankan</h3><ol>{result.recommendations.map((recommendation) => <li key={recommendation}>{recommendation}</li>)}</ol></div></div>
          <div className="human-review"><ShieldCheck size={20} /><p><strong>Wajib ditinjau manusia.</strong> Konfirmasi hasil melalui percakapan empatik dengan siswa sebelum menentukan tindak lanjut.</p></div>
          <div className="form-actions"><button className="button ghost" onClick={() => { setStep(1); setResult(null); }}><RotateCcw size={17} /> Asesmen baru</button><Link className="button primary" href={`/students/${selectedStudent.id}`}>Simpan & buka profil <ArrowRight size={17} /></Link></div>
        </>}
      </section>
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="form-field"><span>{label}</span><input type="number" min={0} max={100} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}
function ScaleField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <div className="form-field"><span>{label}</span><div className="scale-field">{[1, 2, 3, 4, 5].map((item) => <button type="button" className={value === item ? "selected" : ""} onClick={() => onChange(item)} key={item}>{item}</button>)}</div><small>1 = sangat rendah · 5 = sangat baik</small></div>;
}
function CheckField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={`check-card ${checked ? "checked" : ""}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span>{checked && <Check size={15} />}</span><strong>{label}</strong></label>;
}
