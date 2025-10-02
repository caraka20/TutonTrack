"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function SectionBlock({
  title,
  children,
  defaultOpen = true,
  count,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
}) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.04]">
      <button
        className="w-full flex items-center justify-between gap-3 px-3 py-2.5"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium tracking-wide text-white/85">{title}</span>
          {typeof count === "number" && (
            <span className="text-[11px] rounded-md border border-white/10 bg-white/10 px-1.5 py-0.5">
              {count}
            </span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-3 pb-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
