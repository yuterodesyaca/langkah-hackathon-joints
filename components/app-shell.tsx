"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BarChart3, Bell, ClipboardCheck, GraduationCap, LayoutDashboard, LifeBuoy, Menu, Search, Settings, Users, X } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/students", label: "Siswa", icon: Users },
  { href: "/assessment", label: "Asesmen", icon: ClipboardCheck },
  { href: "/interventions", label: "Tindak lanjut", icon: LifeBuoy },
  { href: "/analytics", label: "Analitik", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);

  return (
    <div className="app-shell">
      <aside className={cn("sidebar", open && "sidebar-open")}>
        <div className="sidebar-top">
          <Logo />
          <button className="icon-button sidebar-close" onClick={() => setOpen(false)} aria-label="Tutup navigasi"><X size={20} /></button>
        </div>
        <div className="school-card">
          <span className="school-icon"><GraduationCap size={20} /></span>
          <span><small>Ruang kerja</small><strong>SMA Harapan Bangsa</strong></span>
        </div>
        <nav className="sidebar-nav" aria-label="Navigasi utama">
          <small className="nav-label">MENU UTAMA</small>
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("nav-link", active && "active")}><item.icon size={19} /><span>{item.label}</span>{item.href === "/interventions" && <em>4</em>}</Link>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <Link href="/settings" className={cn("nav-link", pathname === "/settings" && "active")}><Settings size={19} /><span>Pengaturan</span></Link>
          <div className="user-card">
            <span className="avatar avatar-purple">IR</span>
            <span><strong>Ibu Rani</strong><small>Guru BK</small></span>
            <span className="online-dot" title="Online" />
          </div>
        </div>
      </aside>
      {open && <button className="sidebar-backdrop" onClick={() => setOpen(false)} aria-label="Tutup navigasi" />}
      <div className="app-content">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setOpen(true)} aria-label="Buka navigasi"><Menu size={21} /></button>
          <div className="top-search"><Search size={18} /><input aria-label="Cari siswa" placeholder="Cari siswa, kelas, atau tindak lanjut..." /></div>
          <div className="topbar-actions">
            <span className="semester-pill">Semester Ganjil · 2026/2027</span>
            <div className="notification-wrap">
              <button className="icon-button" onClick={() => setNotifications(!notifications)} aria-label="Notifikasi"><Bell size={20} /><span className="notification-dot" /></button>
              {notifications && <div className="notification-popover"><div className="popover-head"><strong>Notifikasi</strong><span>2 baru</span></div><div className="notification-item"><span className="dot danger" /><div><strong>Nadia perlu ditindaklanjuti</strong><small>Asesmen diperbarui 12 menit lalu</small></div></div><div className="notification-item"><span className="dot warning" /><div><strong>Intervensi Rizky jatuh tempo</strong><small>Besok, 16 Oktober</small></div></div></div>}
            </div>
          </div>
        </header>
        <main className="workspace">{children}</main>
      </div>
    </div>
  );
}
