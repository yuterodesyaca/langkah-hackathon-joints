"use client";

import { useState } from "react";
import { Bell, Bot, Check, Database, Eye, LockKeyhole, ShieldCheck } from "lucide-react";

export function SettingsPanel() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({ email: true, reminders: true, ai: true, anonymize: true });
  const toggle = (key: keyof typeof settings) => setSettings((current) => ({ ...current, [key]: !current[key] }));
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2200); }
  return <div className="settings-grid">
    <section className="panel settings-section"><div className="settings-title"><span><Bell size={19}/></span><div><h2>Notifikasi</h2><p>Atur pengingat yang membantu tindak lanjut tepat waktu.</p></div></div><SettingRow title="Ringkasan melalui email" description="Terima ringkasan kebutuhan dukungan setiap Senin." checked={settings.email} onChange={() => toggle("email")}/><SettingRow title="Pengingat jatuh tempo" description="Notifikasi satu hari sebelum jadwal intervensi." checked={settings.reminders} onChange={() => toggle("reminders")}/></section>
    <section className="panel settings-section"><div className="settings-title"><span><Bot size={19}/></span><div><h2>Asisten AI</h2><p>AI bersifat opsional dan memiliki fallback berbasis aturan.</p></div></div><SettingRow title="Aktifkan rekomendasi AI" description="Personalisasi saran berdasarkan indikator dan kekuatan siswa." checked={settings.ai} onChange={() => toggle("ai")}/><div className="info-banner"><ShieldCheck size={18}/><p>Nama lengkap dan catatan mentah tidak dikirim ke penyedia AI. Langkah hanya mengirim faktor yang relevan dan telah diminimalkan.</p></div></section>
    <section className="panel settings-section"><div className="settings-title"><span><Database size={19}/></span><div><h2>Data dan privasi</h2><p>Kontrol perlindungan data siswa pada ruang kerja ini.</p></div></div><SettingRow title="Anonimkan laporan analitik" description="Sembunyikan identitas siswa pada seluruh laporan agregat." checked={settings.anonymize} onChange={() => toggle("anonymize")}/><div className="privacy-list"><div><LockKeyhole size={17}/><span><strong>Akses berbasis peran</strong><small>Guru hanya melihat siswa yang didampingi.</small></span></div><div><Eye size={17}/><span><strong>Jejak akses</strong><small>Perubahan dan akses data sensitif tercatat.</small></span></div></div></section>
    <section className="panel settings-section"><div className="settings-title"><span className="avatar avatar-purple">IR</span><div><h2>Profil pendamping</h2><p>Informasi yang terlihat oleh tim sekolah.</p></div></div><div className="form-grid two"><label className="form-field"><span>Nama</span><input defaultValue="Ibu Rani"/></label><label className="form-field"><span>Peran</span><input defaultValue="Guru BK"/></label><label className="form-field"><span>Sekolah</span><input defaultValue="SMA Harapan Bangsa"/></label><label className="form-field"><span>Semester</span><input defaultValue="Ganjil 2026/2027"/></label></div></section>
    <div className="settings-save"><p>Perubahan hanya berlaku untuk ruang kerja sekolah ini.</p><button className="button primary" onClick={save}>{saved ? <Check size={17}/> : null}{saved ? "Tersimpan" : "Simpan perubahan"}</button></div>
  </div>;
}
function SettingRow({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: () => void }) { return <div className="setting-row"><div><strong>{title}</strong><p>{description}</p></div><button role="switch" aria-checked={checked} className={`toggle ${checked ? "on" : ""}`} onClick={onChange}><span/></button></div>; }
