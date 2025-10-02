// client/src/components/auth/AuthShell.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div
      className="
        relative min-h-dvh w-full
        text-white
        bg-[var(--ut-bg-dark)]
        /* gradient UT: biru tua → biru muda */
        bg-[radial-gradient(80%_120%_at_10%_10%,_rgba(0,51,153,0.55),transparent_60%),_radial-gradient(70%_100%_at_90%_90%,_rgba(42,167,255,0.35),transparent_60%)]
        px-4
      "
    >
      {/* decorative blobs dengan warna UT */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full"
             style={{ background: "radial-gradient(closest-side, rgba(0,51,153,.35), transparent)" }} />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full"
             style={{ background: "radial-gradient(closest-side, rgba(245,183,0,.25), transparent)" }} />
      </div>

      {/* wrapper centering presisi */}
      <div className="mx-auto grid min-h-dvh max-w-[28rem] place-items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative w-full"
        >
          {/* glass card */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.06] to-transparent" />

            <div className="relative p-6 sm:p-8">
              <div className="mb-6 text-center">
                <Link href="/" className="inline-flex items-center gap-2">
                  <div
                    className="h-9 w-9 rounded-xl shadow-md"
                    style={{ background: "linear-gradient(135deg, var(--ut-gold), var(--ut-sky))" }}
                  />
                  <span className="text-lg font-semibold tracking-tight">TutonTrack</span>
                </Link>
                <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
              </div>

              {children}

              {footer && (
                <div className="mt-6 text-center text-sm text-white/85">
                  {footer}
                </div>
              )}
            </div>

            {/* subtle border glow (emas) */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1"
              style={{ boxShadow: "0 0 0 1px rgba(245,183,0,.18) inset" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
