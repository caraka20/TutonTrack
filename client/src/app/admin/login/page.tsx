// client/src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, ShieldAlert, User } from "lucide-react";
import { adminLogin } from "@/services/admin.service";
import { setAdminToken } from "@/lib/auth"; // <-- PENTING: pakai admin token
import Link from "next/link";

export default function AdminLoginPage() {
  const r = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = username.trim().length >= 3 && password.length >= 4 && !submitting;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setErr(null);

    try {
      const res = await adminLogin({ username: username.trim(), password });
      setAdminToken(res.token);                // <-- SIMPAN di tt:admin_token
      r.replace("/admin");
    } catch (error: unknown) {
      let msg = "Gagal login. Periksa username / password.";
      if (error && typeof error === "object") {
        const e = error as { message?: string; payload?: any };
        msg = e.message ?? msg;
      }
      setErr(msg);
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
        min-h-dvh grid place-items-center text-white
        bg-[var(--ut-bg-dark,#0b1020)]
        bg-[radial-gradient(80%_120%_at_10%_10%,rgba(0,51,153,.35),transparent_60%),radial-gradient(70%_100%_at_90%_90%,rgba(42,167,255,.25),transparent_60%)]
        px-4
      "
    >
      <div className="w-full max-w-[420px]">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div
            className="h-10 w-10 rounded-xl border border-white/15 shadow"
            style={{ background: "linear-gradient(135deg,#f5b700,#2aa7ff)" }}
          />
          <div className="text-lg font-semibold tracking-tight">TutonTrack — Admin</div>
        </div>

        <div className="rounded-2xl border border-white/12 bg-white/5 backdrop-blur p-5 sm:p-6">
          <h1 className="text-xl font-semibold mb-1">Masuk Admin</h1>
          <p className="text-sm text-white/70 mb-5">Gunakan kredensial admin yang valid.</p>

          {err && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm">
              <ShieldAlert className="h-4 w-4 mt-[2px] text-rose-300" />
              <span>{err}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-white/80">Username</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-10 py-2.5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-80" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/80">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-10 py-2.5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-80" />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-white/10"
                  aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={[
                "w-full rounded-xl px-4 py-2.5 font-medium shadow-lg transition",
                canSubmit
                  ? "bg-gradient-to-br from-[#f5b700] to-[#2aa7ff] text-black hover:brightness-110"
                  : "bg-white/10 text-white/50 cursor-not-allowed",
              ].join(" ")}
            >
              {submitting ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-white/60">
            Bukan admin?{" "}
            <Link href="/login" className="text-white hover:underline">
              Masuk sebagai mahasiswa
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} TutonTrack. All rights reserved.
        </p>
      </div>
    </div>
  );
}
