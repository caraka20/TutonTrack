// src/app/admin/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Users2,
  BookOpen,
  CalendarClock,
  ClipboardList,
  BellRing,
  ChevronRight,
} from "lucide-react";

type Tile = {
  href: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  accent: string; // tailwind bg tint
};

export default function AdminHomePage() {
  const tiles: Tile[] = useMemo(
    () => [
      {
        href: "/admin/students",
        title: "Students",
        desc: "Kelola data mahasiswa, NIM & kontak.",
        icon: Users2,
        accent: "bg-sky-500/20",
      },
      {
        href: "/admin/courses",
        title: "Courses",
        desc: "Buat & edit mata kuliah, deadlines master.",
        icon: BookOpen,
        accent: "bg-amber-500/20",
      },
      {
        href: "/admin/deadlines",
        title: "Deadlines",
        desc: "Shift/apply tenggat ke seluruh enrollment.",
        icon: CalendarClock,
        accent: "bg-fuchsia-500/20",
      },
      {
        href: "/admin/reminders",
        title: "Reminders",
        desc: "Atur pengingat & broadcast terjadwal.",
        icon: BellRing,
        accent: "bg-emerald-500/20",
      },
      {
        href: "/admin/reports",
        title: "Reports",
        desc: "Pantau progres & risiko per course.",
        icon: ClipboardList,
        accent: "bg-indigo-500/20",
      },
    ],
    [],
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <header className="flex items-start gap-4">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
          <span className="block h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white/60">Admin</p>
          <h1 className="truncate text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-white/60">
            Pusat kontrol: kelola entities, tenggat, pengingat, dan laporan.
          </p>
        </div>
        <div className="flex-1" />
        <Link href="/admin/courses" className="btn-primary rounded-xl px-4 py-2 text-sm">
          Mulai Kelola
        </Link>
      </header>

      {/* Tiles */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ href, title, desc, icon: Icon, accent }) => (
          <Link
            key={href}
            href={href}
            className="group glass-ring relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] transition hover:bg-white/[0.06]"
          >
            <div className="flex items-start gap-3">
              <div
                className={[
                  "rounded-xl p-2.5 ring-1 ring-white/10",
                  accent,
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-0.5 line-clamp-2 text-sm text-white/70">{desc}</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 translate-x-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white/70" />
            </div>
          </Link>
        ))}
      </section>

      {/* Quick tips / status bar */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <h4 className="text-sm font-semibold">Tips cepat</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
          <li>Gunakan kolom pencarian & sort di setiap modul untuk filter lebih cepat.</li>
          <li>Di halaman Courses, kamu bisa apply master deadlines ke semua enrollment.</li>
          <li>Kalau penghapusan ditolak karena relasi, gunakan opsi force delete (dengan hati-hati).</li>
        </ul>
      </section>
    </div>
  );
}
