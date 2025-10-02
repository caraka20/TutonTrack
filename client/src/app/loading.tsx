// loading di level root: aktif saat refresh/SSR awal
export default function RootLoading() {
  return (
    <div className="min-h-dvh grid place-items-center bg-[var(--ut-bg-dark,#0b1020)]
      bg-[radial-gradient(80%_120%_at_10%_10%,rgba(0,51,153,.35),transparent_60%),radial-gradient(70%_100%_at_90%_90%,rgba(42,167,255,.25),transparent_60%)]
      animate-[fadeIn_.2s_ease-out]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="ut-spinner h-16 w-16" />
        </div>
        <p className="text-sm text-white/70 tracking-wide">Memuat…</p>
      </div>
    </div>
  );
}
