"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * RouteLoader: tampilkan progress tipis di atas + overlay subtle
 * ketika pathname berubah. Durasi singkat agar terasa responsif.
 */
export default function RouteLoader() {
  const path = usePathname();
  const prev = useRef<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Abaikan render pertama
    if (prev.current === null) {
      prev.current = path;
      return;
    }
    // Saat path berubah → tampilkan loader sejenak
    setShow(true);
    const t = setTimeout(() => setShow(false), 450); // 450ms
    prev.current = path;
    return () => clearTimeout(t);
  }, [path]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Top progress bar */}
          <motion.div
            key="topbar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              transformOrigin: "0 50%",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg, var(--ut-gold, #f5b700), var(--ut-sky, #2aa7ff))",
              zIndex: 60,
            }}
          />
          {/* Subtle page dim */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "black",
              zIndex: 50,
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
