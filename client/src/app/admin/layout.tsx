// client/src/app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users2, BookOpen, CalendarClock, BellRing, FileBarChart2, LogOut, Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clearAllTokens, getAdminToken } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/students", label: "Students", icon: Users2 },
  { href: "/admin/courses",  label: "Courses",  icon: BookOpen },
  { href: "/admin/deadlines",label: "Deadlines",icon: CalendarClock },
  { href: "/admin/reminders",label: "Reminders",icon: BellRing },
  { href: "/admin/reports",  label: "Reports",  icon: FileBarChart2 },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const r = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Guard: wajib ada token admin; kalau tidak, redirect login
  useEffect(() => {
    const admin = getAdminToken();
    if (!admin) r.replace("/admin/login");
  }, [r]);

  // Tutup drawer saat route berubah
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const onLogout = () => {
    clearAllTokens(); // hapus admin & student/legacy
    r.replace("/admin/login");
  };

  return (
    <div
      className="
        min-h-dvh text-white relative
        bg-[var(--ut-bg-dark,#0b1020)]
        bg-[radial-gradient(80%_120%_at_10%_10%,rgba(0,51,153,.35),transparent_60%),radial-gradient(70%_100%_at_90%_90%,rgba(42,167,255,.25),transparent_60%)]
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Topbar (mobile) */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <Link href="/admin" className="inline-flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg border border-white/15 shadow"
              style={{ background: "linear-gradient(135deg,#f5b700,#2aa7ff)" }}
            />
            <span className="font-semibold">TutonTrack Admin</span>
          </Link>
          <button
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 inline-flex items-center gap-2"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-5 lg:gap-7 pb-10">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block sticky top-6 self-start">
            <Sidebar path={path} onLogout={onLogout} />
          </aside>

          {/* Drawer mobile */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-50 lg:hidden"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <div className="absolute inset-0 bg-black/40" />
                <motion.div
                  className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] p-3"
                  initial={{ x: -340 }} animate={{ x: 0 }} exit={{ x: -340 }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3 h-full">
                    <Sidebar path={path} onLogout={onLogout} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <main className="min-w-0">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 sm:p-6 lg:p-8">
              <div className="mx-auto w-full max-w-[1100px]">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ path, onLogout }: { path: string | null; onLogout: () => void }) {
  const isActive = (href: string, exact?: boolean) => {
    if (!path) return false;
    return exact ? path === href : path.startsWith(href);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3 w-[280px] h-full flex flex-col">
      {/* Brand */}
      <Link href="/admin" className="inline-flex items-center gap-2 px-2 py-1.5">
        <div
          className="h-8 w-8 rounded-lg border border-white/15 shadow"
          style={{ background: "linear-gradient(135deg,#f5b700,#2aa7ff)" }}
        />
        <span className="font-semibold">TutonTrack Admin</span>
      </Link>

      {/* Nav */}
      <nav className="mt-3 space-y-1 flex-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-2 px-3 py-2 rounded-xl border transition",
                active
                  ? "border-white/20 bg-white/[0.12]"
                  : "border-transparent hover:bg-white/[0.06]",
              ].join(" ")}
            >
              <Icon className="h-4 w-4 opacity-90" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm
                     border-rose-400/40 bg-rose-400/10 text-rose-200 hover:bg-rose-400/15"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}
