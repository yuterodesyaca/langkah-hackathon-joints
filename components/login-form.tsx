"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LoaderCircle, ShieldCheck } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  function submit(event: React.FormEvent) { event.preventDefault(); setLoading(true); setTimeout(() => router.push("/dashboard"), 650); }
  return <form className="login-form" onSubmit={submit}><div className="form-field"><label htmlFor="email">Email sekolah</label><input id="email" type="email" defaultValue="guru@demo.langkah.id" required/></div><div className="form-field"><label htmlFor="password">Kata sandi</label><div className="password-field"><input id="password" type={show ? "text" : "password"} defaultValue="langkah2026" required/><button type="button" onClick={() => setShow(!show)} aria-label="Tampilkan kata sandi">{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></div><div className="login-options"><label><input type="checkbox" defaultChecked/> Ingat saya</label><button type="button">Lupa kata sandi?</button></div><button className="button primary full login-button" disabled={loading}>{loading ? <LoaderCircle className="spin" size={18}/> : <>Masuk ke ruang kerja <ArrowRight size={18}/></>}</button><div className="demo-hint"><ShieldCheck size={18}/><span><strong>Akun demonstrasi sudah terisi</strong><small>Klik masuk untuk menjelajahi seluruh fitur Langkah.</small></span></div></form>;
}
