"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ListChecks,
  User2,
  LogOut,
  Menu as MenuIcon,
} from "lucide-react";
import { clearToken } from "@/lib/auth";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RouteLoader from "@/components/ui/route-loader";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/enrollments", label: "Matkul", icon: BookOpen },
  { href: "/items", label: "Progress", icon: ListChecks },
  { href: "/profile", label: "Profil", icon: User2 },
];

export default function StudentShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const r = useRouter();
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    clearToken();
    r.replace("/login");
  };

  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <div
      className="
        min-h-dvh text-white relative
        bg-[var(--ut-bg-dark,#0b1020)]
        bg-[radial-gradient(80%_120%_at_10%_10%,rgba(0,51,153,.35),transparent_60%),radial-gradient(70%_100%_at_90%_90%,rgba(42,167,255,.25),transparent_60%)]
      "
    >
      <RouteLoader />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Topbar (mobile) */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <Link href="/dashboard" className="inline-flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg border border-white/15 shadow"
              style={{ background: "linear-gradient(135deg,#f5b700,#2aa7ff)" }}
            />
            <span className="font-semibold">TutonTrack</span>
          </Link>

          <button
            className="rounded-lg border border-white/15 bg-white/10 p-2 hover:bg-white/[0.14]"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
            title="Menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <div className="absolute inset-0 bg-black/40" />
                <motion.div
                  className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] p-3"
                  initial={{ x: -340 }}
                  animate={{ x: 0 }}
                  exit={{ x: -340 }}
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

          {/* CONTENT */}
          <main className="min-w-0">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 sm:p-6 lg:p-8">
              <div className="mx-auto w-full max-w-[980px]">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ path, onLogout }: { path: string | null; onLogout: () => void }) {
  return (
    <div className="flex h-full w-[280px] flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3">
      {/* Brand */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 px-2 py-1.5">
        <div
          className="h-8 w-8 rounded-lg border border-white/15 shadow"
          style={{ background: "linear-gradient(135deg,#f5b700,#2aa7ff)" }}
        />
        <span className="font-semibold">TutonTrack</span>
      </Link>

      {/* Nav */}
      <nav className="mt-3 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = path?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group relative flex items-center gap-2 px-3 py-2 rounded-xl border transition",
                active
                  ? "border-white/20 bg-white/[0.12]"
                  : "border-transparent hover:bg-white/[0.06]",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[3px] rounded-r",
                  active
                    ? "bg-gradient-to-b from-[#2aa7ff] to-[#f5b700]"
                    : "bg-white/0 group-hover:bg-white/20",
                ].join(" ")}
              />
              <Icon className="h-4 w-4 opacity-90" />
              <span className={["text-sm", active ? "text-white" : "text-white/90 group-hover:text-white"].join(" ")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Spacer → tombol logout selalu di bawah (desktop & mobile) */}
      <div className="mt-4 flex-1" />

      <button
        onClick={onLogout}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm
                   border-rose-400/30 bg-rose-500/15 hover:bg-rose-500/20 text-rose-200 transition"
        title="Keluar"
      >
        <LogOut className="h-4 w-4" />
        Keluar
      </button>
    </div>
  );
}
