"use client";

import { useEffect, useMemo, useState } from "react";
import {
  adminListStudents,
  adminCreateStudent,
  adminUpdateStudent,
  adminDeleteStudent,
  type AdminStudent,
  type Paginated,
} from "@/services/admin.service";
import { Card, CardContent } from "@/components/ui/card";

/* ============ kecil-kecil util ============ */
const cls = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");
const fmtDate = (s: string) => new Date(s).toLocaleString();

/* ============ tipe lokal ============ */
type SortOption = "createdAt:desc" | "createdAt:asc" | "nama:asc" | "nama:desc";
type FormMode = { type: "create" } | { type: "edit"; row: AdminStudent };

export default function AdminStudentsPage() {
  /* ====== query & data ====== */
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortOption>("createdAt:desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [data, setData] = useState<Paginated<AdminStudent> | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  /* ====== modal form ====== */
  const [modal, setModal] = useState<FormMode | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    const lim = data.limit || 1;
    return Math.max(1, Math.ceil((data.total || 0) / lim));
  }, [data]);

  /* ====== loader ====== */
  const fetchList = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await adminListStudents({ q: q.trim() || undefined, sort, page, limit });
      setData(res);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, sort, page, limit]);

  /* ====== handlers ====== */
  const openCreate = () => setModal({ type: "create" });
  const openEdit = (row: AdminStudent) => setModal({ type: "edit", row });

  const onDelete = async (row: AdminStudent) => {
    const ok = window.confirm(`Hapus student "${row.nama}" (${row.nim})?`);
    if (!ok) return;
    try {
      await adminDeleteStudent(row.id);
      void fetchList();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus student");
    }
  };

  const onSubmitForm = async (fd: { nim: string; noHp: string; nama: string }) => {
    if (!modal) return;
    setSubmitting(true);
    try {
      if (modal.type === "create") {
        await adminCreateStudent(fd);
        if (page !== 1) setPage(1);
      } else {
        await adminUpdateStudent(modal.row.id, fd);
      }
      setModal(null);
      await fetchList();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setSubmitting(false);
    }
  };

  /* ====== UI ====== */
  const rows: AdminStudent[] = Array.isArray(data?.data) ? data!.data : [];

  return (
    <div className="space-y-5">
      {/* header + actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h1 className="text-lg font-semibold">Students</h1>
        <div className="flex-1" />
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
            placeholder="Cari nama/NIM/HP…"
            className="h-9 rounded-lg border border-white/15 bg-white/10 px-3 outline-none placeholder:text-white/50"
          />
          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value as SortOption);
            }}
            className="h-9 rounded-lg border border-white/15 bg-white/10 px-2"
          >
            <option value="createdAt:desc">Terbaru</option>
            <option value="createdAt:asc">Terlama</option>
            <option value="nama:asc">Nama A–Z</option>
            <option value="nama:desc">Nama Z–A</option>
          </select>
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="h-9 rounded-lg border border-white/15 bg-white/10 px-2"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}/hal
              </option>
            ))}
          </select>
          <button
            onClick={openCreate}
            className="h-9 rounded-lg border border-white/15 bg-white/10 px-3 font-medium hover:bg-white/[0.14]"
          >
            + Tambah
          </button>
        </div>
      </div>

      {/* table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 rounded bg-white/10 animate-pulse" />
              ))}
            </div>
          ) : err ? (
            <div className="p-4 text-rose-400">Error: {err}</div>
          ) : rows.length === 0 ? (
            <div className="p-4 text-white/70">Belum ada data.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-[780px] w-full text-sm">
                  <thead className="text-white/70">
                    <tr className="border-b border-white/10">
                      <th className="text-left p-3">Nama</th>
                      <th className="text-left p-3">NIM</th>
                      <th className="text-left p-3">No. HP</th>
                      <th className="text-left p-3">Dibuat</th>
                      <th className="text-left p-3">Diupdate</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((s) => (
                      <tr key={s.id} className="border-b border-white/5">
                        <td className="p-3 font-medium">{s.nama}</td>
                        <td className="p-3">{s.nim}</td>
                        <td className="p-3">{s.noHp}</td>
                        <td className="p-3 text-white/70">{fmtDate(s.createdAt)}</td>
                        <td className="p-3 text-white/70">{fmtDate(s.updatedAt)}</td>
                        <td className="p-3">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEdit(s)}
                              className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 hover:bg-white/[0.14]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete(s)}
                              className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-rose-300 hover:bg-rose-400/15"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="flex items-center justify-between p-3">
                <div className="text-xs text-white/60">
                  Halaman {data?.page ?? 1} / {totalPages} • Total {data?.total ?? 0}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={cls(
                      "rounded-lg border px-3 py-1",
                      page <= 1
                        ? "border-white/10 text-white/40"
                        : "border-white/15 bg-white/10 hover:bg-white/[0.14]",
                    )}
                  >
                    Prev
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={cls(
                      "rounded-lg border px-3 py-1",
                      page >= totalPages
                        ? "border-white/10 text-white/40"
                        : "border-white/15 bg-white/10 hover:bg-white/[0.14]",
                    )}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* modal form */}
      {modal && (
        <StudentFormModal
          mode={modal}
          submitting={submitting}
          onClose={() => setModal(null)}
          onSubmit={onSubmitForm}
        />
      )}
    </div>
  );
}

/* ============ Modal Tambah/Edit ============ */
function StudentFormModal({
  mode,
  submitting,
  onClose,
  onSubmit,
}: {
  mode: { type: "create" } | { type: "edit"; row: AdminStudent };
  submitting: boolean;
  onClose: () => void;
  onSubmit: (v: { nim: string; noHp: string; nama: string }) => void;
}) {
  const [nim, setNim] = useState(mode.type === "edit" ? mode.row.nim : "");
  const [noHp, setNoHp] = useState(mode.type === "edit" ? mode.row.noHp : "");
  const [nama, setNama] = useState(mode.type === "edit" ? mode.row.nama : "");

  const title = mode.type === "edit" ? "Edit Student" : "Tambah Student";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative w-[92%] max-w-md rounded-2xl border border-white/15 bg-[rgba(20,24,38,0.9)] backdrop-blur p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-semibold">{title}</div>

        <div className="mt-3 space-y-3">
          <div>
            <label className="text-sm text-white/70">NIM</label>
            <input
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="mt-1 w-full h-9 rounded-lg border border-white/15 bg-white/10 px-3 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-white/70">Nama</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="mt-1 w-full h-9 rounded-lg border border-white/15 bg-white/10 px-3 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-white/70">No. HP</label>
            <input
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              className="mt-1 w-full h-9 rounded-lg border border-white/15 bg-white/10 px-3 outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 hover:bg-white/[0.14]"
          >
            Batal
          </button>
          <button
            onClick={() => onSubmit({ nim, noHp, nama })}
            disabled={submitting || !nim.trim() || !nama.trim() || !noHp.trim()}
            className={cls(
              "rounded-lg px-3 py-1.5 border font-medium",
              submitting
                ? "border-white/10 text-white/60"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15",
            )}
          >
            {submitting ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
