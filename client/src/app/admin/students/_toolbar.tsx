"use client";
import { useEffect, useState } from "react";

type SortOption = "createdAt:desc" | "createdAt:asc" | "nama:asc" | "nama:desc";

export default function StudentsToolbar(props: {
  q: string;
  onQChange: (v: string) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  limit: number;
  onLimitChange: (v: number) => void;
}) {
  const [localQ, setLocalQ] = useState(props.q);

  // debounce 300ms untuk search
  useEffect(() => {
    const t = setTimeout(() => props.onQChange(localQ), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localQ]);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur px-3 py-3 md:px-4 md:py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.25)]">
      {/* ring glow tipis */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl [padding:1px] [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]" />

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <input
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") props.onQChange(localQ.trim());
              if (e.key === "Escape" && localQ) { setLocalQ(""); props.onQChange(""); }
            }}
            placeholder="Cari nama / NIM / No. HP…"
            className="w-full h-11 rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur px-10 text-sm outline-none transition focus:bg-white/[0.08] focus:border-white/20 placeholder:text-white/55"
          />
          {/* icon search */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          {/* clear button */}
          {localQ && (
            <button
              onClick={() => { setLocalQ(""); props.onQChange(""); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-white/10"
              aria-label="Clear"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="relative">
            <select
              value={props.sort}
              onChange={(e) => props.onSortChange(e.target.value as SortOption)}
              className="h-11 rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur pr-9 pl-3 text-sm outline-none transition focus:bg-white/[0.08] focus:border-white/20"
            >
              <option value="createdAt:desc">Terbaru</option>
              <option value="createdAt:asc">Terlama</option>
              <option value="nama:asc">Nama A–Z</option>
              <option value="nama:desc">Nama Z–A</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/70">▾</span>
          </div>

          {/* Limit */}
          <div className="relative">
            <select
              value={props.limit}
              onChange={(e) => props.onLimitChange(Number(e.target.value))}
              className="h-11 rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur pr-7 pl-3 text-sm outline-none transition focus:bg-white/[0.08] focus:border-white/20"
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>{n}/hal</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/70">▾</span>
          </div>
        </div>
      </div>
    </div>
  );
}
