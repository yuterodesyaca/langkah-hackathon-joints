"use client";

import { useState } from "react";
import { Bot, CheckCircle2, LoaderCircle, RefreshCcw, ShieldCheck, Sparkles } from "lucide-react";
import type { Student } from "@/lib/types";

export function RecommendationPanel({ student }: { student: Student }) {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [text, setText] = useState("Mulai percakapan empatik untuk memahami hambatan kehadiran, lalu susun dukungan yang dapat disepakati bersama siswa dan keluarga.");

  async function generate() {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/recommend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: student.id, factors: student.factors, strengths: student.strengths }) });
      const data = await response.json();
      setText(data.recommendation);
      setGenerated(true);
    } finally { setLoading(false); }
  }

  return <section className="panel ai-panel"><div className="ai-heading"><span className="ai-icon"><Sparkles size={20}/></span><div><span className="eyebrow">ASISTEN LANGKAH</span><h2>Rekomendasi pendampingan</h2></div><span className="safe-ai"><ShieldCheck size={14}/> Human-in-the-loop</span></div><p className="ai-copy">{text}</p><div className="suggestion-list"><div><CheckCircle2 size={17}/><span><strong>Prioritas pertama</strong>Jadwalkan check-in personal minggu ini.</span></div><div><CheckCircle2 size={17}/><span><strong>Libatkan dukungan</strong>Verifikasi bantuan yang tersedia tanpa membuat siswa merasa disalahkan.</span></div></div><button className="button soft full" disabled={loading} onClick={generate}>{loading ? <LoaderCircle className="spin" size={17}/> : generated ? <RefreshCcw size={17}/> : <Bot size={17}/>}{loading ? "Menyusun rekomendasi..." : generated ? "Susun ulang rekomendasi" : "Personalisasi dengan AI"}</button><small className="ai-disclosure">AI membantu merangkum opsi. Keputusan akhir selalu dibuat oleh pendamping siswa.</small></section>;
}
