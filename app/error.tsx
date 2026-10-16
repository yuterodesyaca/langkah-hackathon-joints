"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="not-found"><span><AlertTriangle size={30}/></span><small>TERJADI KENDALA</small><h1>Langkah ini belum berhasil</h1><p>Data Anda tetap aman. Coba muat kembali halaman ini.</p><button className="button primary" onClick={reset}><RefreshCcw size={17}/> Coba lagi</button></main>; }
