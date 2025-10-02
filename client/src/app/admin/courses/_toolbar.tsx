"use client";

import { useEffect, useState } from "react";

type SortBy = "createdAt" | "nama";
type SortDir = "asc" | "desc";

export default function CoursesToolbar(props: {
  q: string;
  onQChange: (v: string) => void;
  sortBy: SortBy;
  sortDir: SortDir;
  onSortByChange: (v: SortBy) => void;
  onSortDirChange: (v: SortDir) => void;
  limit: number;
  onLimitChange: (v: number) => void;
}) {
  const [localQ, setLocalQ] = useState(props.q);

  useEffect(() => {
    const t = setTimeout(() => props.onQChange(localQ), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localQ]);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur px-3 py-3 md:px-4 md:py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <input
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            placeholder="Cari nama course…"
            className="w-full h-11 rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur px-10 text-sm outline-none transition focus:bg-white/[0.08] focus:border-white/20 placeholder:text-white/55"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          {localQ && (
            <button
              onClick={() => { setLocalQ(""); props.onQChange(""); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={props.sortBy}
              onChange={(e) => props.onSortByChange(e.target.value as SortBy)}
              className="h-11 rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur pr-7 pl-3 text-sm outline-none focus:bg-white/[0.08] focus:border-white/20"
            >
              <option value="createdAt">Tanggal</option>
              <option value="nama">Nama</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/70">▾</span>
          </div>
          <div className="relative">
            <select
              value={props.sortDir}
              onChange={(e) => props.onSortDirChange(e.target.value as SortDir)}
              className="h-11 rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur pr-7 pl-3 text-sm outline-none focus:bg-white/[0.08] focus:border-white/20"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/70">▾</span>
          </div>
          <div className="relative">
            <select
              value={props.limit}
              onChange={(e) => props.onLimitChange(Number(e.target.value))}
              className="h-11 rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur pr-7 pl-3 text-sm outline-none focus:bg-white/[0.08] focus:border-white/20"
            >
              {[10, 20, 50, 100].map((n) => <option key={n} value={n}>{n}/hal</option>)}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/70">▾</span>
          </div>
        </div>
      </div>
    </div>
  );
}
