"use client";

import { useEffect, useMemo, useState } from "react";
import {
  adminListCourses,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse,
  type AdminCourse,
  type Paginated,
} from "@/services/course-admin.service";
import { ApiError } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import CoursesToolbar from "./_toolbar";
import CoursesTable from "./_table";
import CourseFormModal from "./_modal";
import PaginationBar from "./_pagination";
import Swal from "sweetalert2";

type SortBy = "createdAt" | "nama";
type SortDir = "asc" | "desc";

export default function AdminCoursesPage() {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [data, setData] = useState<Paginated<AdminCourse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [modal, setModal] =
    useState<null | { type: "create" } | { type: "edit"; row: AdminCourse }>(null);
  const [submitting, setSubmitting] = useState(false);

  const rows: AdminCourse[] = Array.isArray(data?.data) ? data!.data : [];

  const totalPages = useMemo(() => {
    const lim = data?.limit || limit || 1;
    const total = data?.total ?? 0;
    if (total > 0) return Math.max(1, Math.ceil(total / lim));
    // fallback optimistis kalau BE tidak kirim total
    return rows.length === lim ? page + 1 : 1;
  }, [data, limit, rows.length, page]);

  async function fetchList() {
    setLoading(true);
    setErr(null);
    try {
      const res = await adminListCourses({
        q: q.trim() || undefined,
        page,
        limit,
        sortBy,
        sortDir,
      });
      setData(res);
    } catch (e) {
      const status = e instanceof ApiError ? e.status : undefined;
      const msg = e instanceof Error ? e.message : "Gagal memuat data";
      setErr(msg);

      // ⬇️ Redirect hanya saat GAGAL MEMUAT LIST (awal/refresh)
      if (status === 401) {
        await Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "Sesi kamu habis atau token tidak valid. Silakan login lagi.",
        });
        window.location.href = "/admin/login";
      } else {
        void Swal.fire({ icon: "error", title: "Error", text: String(msg) });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page, limit, sortBy, sortDir]);

  const openCreate = () => setModal({ type: "create" });
  const openEdit = (row: AdminCourse) => setModal({ type: "edit", row });

  async function handleSubmit(v: { nama: string }) {
    if (!modal) return;
    setSubmitting(true);
    try {
      if (modal.type === "create") {
        await adminCreateCourse({ nama: v.nama });
        setPage(1);
        void Swal.fire({ icon: "success", title: "Course dibuat" });
      } else {
        await adminUpdateCourse(modal.row.id, { nama: v.nama });
        void Swal.fire({ icon: "success", title: "Course diperbarui" });
      }
      setModal(null);
      await fetchList();
    } catch (e) {
      const status = e instanceof ApiError ? e.status : undefined;
      const msg = e instanceof Error ? e.message : "Gagal menyimpan course";

      // ⬇️ JANGAN redirect otomatis saat aksi form.
      if (status === 401) {
        await Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "Sesi kamu habis atau token tidak valid. Buka tab baru dan login ulang, lalu coba lagi.",
        });
      } else {
        void Swal.fire({ icon: "error", title: "Gagal", text: String(msg) });
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(row: AdminCourse) {
    const ask = await Swal.fire({
      icon: "question",
      title: `Hapus course "${row.nama}"?`,
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
    });
    if (!ask.isConfirmed) return;

    try {
      await adminDeleteCourse(row.id);
      if (data && data.data.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchList();
      }
      void Swal.fire({ icon: "success", title: "Course dihapus" });
    } catch (e) {
      const status = e instanceof ApiError ? e.status : undefined;
      const msg = e instanceof Error ? e.message : "Gagal menghapus course.";

      // ⬇️ JANGAN redirect otomatis saat hapus juga.
      if (status === 401) {
        await Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "Sesi kamu habis atau token tidak valid. Buka tab baru dan login ulang, lalu coba lagi.",
        });
        return;
      }

      // deteksi relasi → tawarkan force
      if (/relasi|enrollment|deadline|items|HAS_RELATIONS/i.test(msg)) {
        const askForce = await Swal.fire({
          icon: "warning",
          title: "Course punya relasi",
          html:
            'Course ini masih punya <b>enrollment/deadlines/items</b>.<br/>' +
            "Hapus semua data terkait dan course sekaligus?",
          showCancelButton: true,
          confirmButtonText: "Hapus Semua",
          cancelButtonText: "Batal",
          confirmButtonColor: "#ef4444",
        });
        if (!askForce.isConfirmed) return;

        try {
          await adminDeleteCourse(row.id, { force: true });
          if (data && data.data.length === 1 && page > 1) setPage((p) => p - 1);
          else await fetchList();
          void Swal.fire({ icon: "success", title: "Course & relasi dihapus" });
        } catch (ee) {
          const m2 = ee instanceof Error ? ee.message : "Force delete gagal.";
          void Swal.fire({ icon: "error", title: "Gagal", text: String(m2) });
        }
      } else {
        void Swal.fire({ icon: "error", title: "Gagal", text: msg });
      }
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div>
          <div className="text-sm text-white/60">Admin</div>
          <h1 className="text-xl font-semibold leading-tight">Courses</h1>
        </div>
        <div className="flex-1" />
        <button onClick={openCreate} className="btn-primary rounded-xl px-4 py-2 text-sm">
          + Tambah
        </button>
      </div>

      <CoursesToolbar
        q={q}
        onQChange={(v) => { setPage(1); setQ(v); }}
        sortBy={sortBy}
        sortDir={sortDir}
        onSortByChange={(v) => { setPage(1); setSortBy(v); }}
        onSortDirChange={(v) => { setPage(1); setSortDir(v); }}
        limit={limit}
        onLimitChange={(n) => { setPage(1); setLimit(n); }}
      />

      <Card className="border-white/10 bg-white/[0.04] backdrop-blur-xl">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-11 rounded-lg bg-white/8 animate-pulse" />
              ))}
            </div>
          ) : err ? (
            <div className="p-6 text-rose-300">{err}</div>
          ) : rows.length === 0 ? (
            <div className="p-6 text-center">
              <div className="text-white/80 font-medium">Tidak ada data</div>
              <div className="text-white/50 text-sm mt-1">Coba ubah filter atau tambahkan course baru.</div>
              <button
                onClick={openCreate}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 hover:bg-white/[0.14]"
              >
                + Tambah Course
              </button>
            </div>
          ) : (
            <>
              <CoursesTable rows={rows} onEdit={openEdit} onDelete={handleDelete} />
              <PaginationBar
                page={data?.page ?? page}
                totalPages={totalPages}
                total={data?.total ?? rows.length}
                limit={data?.limit ?? limit}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => p + 1)} // biarkan bebas; server yang menentukan habis/tidak
                onJump={(p) => setPage(p)}
              />
            </>
          )}
        </CardContent>
      </Card>

      {modal && (
        <CourseFormModal
          mode={modal}
          submitting={submitting}
          onClose={() => setModal(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
