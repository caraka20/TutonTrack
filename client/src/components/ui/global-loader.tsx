"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * GlobalLoader menampilkan:
 * - progress bar tipis di atas (gradien UT)
 * - overlay halus
 * - spinner elegan di tengah
 * Aktif setiap pathname berubah (navigasi client).
 */
export default function GlobalLoader() {
  const path = usePathname();
  const prev = useRef<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prev.current === null) { prev.current = path; return; }
    setShow(true);
    // sembunyikan cepat; cukup untuk memberi kesan ada transisi
    const t = setTimeout(() => setShow(false), 500);
    prev.current = path;
    return () => clearTimeout(t);
  }, [path]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Top progress */}
          <motion.div
            key="topbar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              transformOrigin: "0 50%", position: "fixed", top: 0, left: 0, right: 0, height: 3,
              background: "linear-gradient(90deg,var(--ut-gold,#f5b700),var(--ut-sky,#2aa7ff))",
              zIndex: 70
            }}
          />
          {/* Overlay + spinner */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-60 grid place-items-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .25 }}
          >
            <div className="absolute inset-0 bg-black/15" />
            <div className="ut-spinner h-10 w-10" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
