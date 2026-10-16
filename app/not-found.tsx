import Link from "next/link";
import { ArrowLeft, Footprints } from "lucide-react";

export default function NotFound() { return <main className="not-found"><span><Footprints size={30}/></span><small>404</small><h1>Halaman belum ditemukan</h1><p>Sepertinya langkah Anda membawa ke tempat yang belum tersedia.</p><Link href="/dashboard" className="button primary"><ArrowLeft size={17}/> Kembali ke ringkasan</Link></main>; }
