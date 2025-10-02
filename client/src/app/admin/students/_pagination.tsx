"use client";

type Props = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (p: number) => void;
};

export default function PaginationBar({
  page,
  totalPages,
  total,
  limit,
  onPrev,
  onNext,
  onJump,
}: Props) {
  const start = (page - 1) * limit + 1;
  const end = Math.min(total, page * limit);

  // window halaman di sekitar current (maks 5)
  const max = 5;
  const to = Math.min(totalPages, page + Math.floor(max / 2));
  const from = Math.max(1, Math.min(page - Math.floor(max / 2), to - max + 1));
  const pages: number[] = Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between p-3">
      <div className="text-xs text-white/70">
        Menampilkan <span className="font-medium text-white/90">{total ? start : 0}</span>
        <span className="font-medium text-white/90">–{end}</span> dari{" "}
        <span className="font-medium text-white/90">{total}</span> data
      </div>

      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={onPrev}
          className={[
            "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5",
            page <= 1 ? "border-white/10 text-white/40" : "border-white/12 bg-white/[0.06] hover:bg-white/[0.10]",
          ].join(" ")}
        >
          ‹ Prev
        </button>

        {from > 1 && (
          <>
            <button
              onClick={() => onJump(1)}
              className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-1.5 hover:bg-white/[0.10]"
            >
              1
            </button>
            <span className="px-1 text-white/40">…</span>
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onJump(p)}
            className={[
              "rounded-lg border px-3 py-1.5",
              p === page
                ? "border-white/20 bg-white/15 text-white"
                : "border-white/12 bg-white/[0.06] hover:bg-white/[0.10]",
            ].join(" ")}
          >
            {p}
          </button>
        ))}

        {to < totalPages && (
          <>
            <span className="px-1 text-white/40">…</span>
            <button
              onClick={() => onJump(totalPages)}
              className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-1.5 hover:bg-white/[0.10]"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={page >= totalPages}
          onClick={onNext}
          className={[
            "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5",
            page >= totalPages ? "border-white/10 text-white/40" : "border-white/12 bg-white/[0.06] hover:bg-white/[0.10]",
          ].join(" ")}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}
