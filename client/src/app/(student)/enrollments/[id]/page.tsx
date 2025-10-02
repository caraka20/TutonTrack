"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getEnrollmentItems,
  updateItemStatus,
  updateItemNilai,
  getCourseName,
  syncEnrollmentDeadlines,
} from "@/services/enrollment.service";
import { showError, showSuccess, confirm } from "@/utils/alert";
import EnrollmentHeader from "@/components/enrollments/EnrollmentHeader";
import SectionBlock from "@/components/enrollments/SectionBlock";
import ItemRow from "@/components/enrollments/ItemRow";
import type { Item, Status } from "@/types/enrollment";

type ViewState = "loading" | "ready" | "idle";

export default function EnrollmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const enrollId = Number(id);

  const [state, setState] = useState<ViewState>("loading");
  const [items, setItems] = useState<Item[]>([]);
  const [courseName, setCourseName] = useState<string>("Mata kuliah");

  // draft nilai (belum dikirim)
  const [draftNilai, setDraftNilai] = useState<Record<number, number>>({});
  const [saving, setSaving] = useState(false);
  const dirtyCount = Object.keys(draftNilai).length;

  const load = async () => {
    setState("loading");
    try {
      const list = await getEnrollmentItems(enrollId);
      setItems(list as Item[]);
      const anyCourse = (list as Item[])[0]?.course ?? undefined;
      setCourseName(getCourseName(anyCourse));
      setDraftNilai({});
      setState("ready");
    } catch (e) {
      setState("idle");
      await showError(e, "Gagal memuat item enrollment.");
    }
  };

  useEffect(() => {
    if (Number.isFinite(enrollId)) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrollId]);

  const grouped = useMemo(() => {
    const g: Record<string, Item[]> = {};
    for (const it of items) {
      const key = it.jenis;
      if (!g[key]) g[key] = [];
      g[key].push(it);
    }
    for (const k of Object.keys(g)) {
      g[k].sort((a, b) => Number(a.sesi ?? 0) - Number(b.sesi ?? 0));
    }
    return g;
  }, [items]);

  const progressPct = useMemo(() => {
    if (!items.length) return 0;
    const done = items.filter((x) => x.status === "SELESAI").length;
    return Math.round((done / items.length) * 100);
  }, [items]);

  /* ====== Actions ====== */

  const prettyJenis = (s: string) => s.toUpperCase(); // bisa diubah kalau mau label human-readable

  // Toggle status + SweetAlert
  const toggleStatus = async (it: Item) => {
    try {
      const next: Status = it.status === "SELESAI" ? "BELUM" : "SELESAI";
      await updateItemStatus(it.id, next);

      const patch: Partial<Item> = { status: next };

      if (next === "SELESAI" && it.jenis.toUpperCase() === "ABSEN") {
        await updateItemNilai(it.id, 100);
        patch.nilai = 100;
        setDraftNilai((d) => {
          const n = { ...d };
          delete n[it.id];
          return n;
        });
      }

      setItems((prev) => prev.map((x) => (x.id === it.id ? { ...x, ...patch } : x)));

      // SweetAlert feedback
      if (next === "SELESAI") {
        await showSuccess("Mantap!", `${prettyJenis(it.jenis)} ditandai selesai.`);
      } else {
        await showSuccess("Perubahan disimpan", `${prettyJenis(it.jenis)} dikembalikan ke belum.`);
      }
    } catch (e) {
      await showError(e, "Gagal mengubah status.");
    }
  };

  // Edit nilai lokal (draft)
  const setNilaiDraft = (idItem: number, val: number | "") => {
    setDraftNilai((prev) => {
      const next = { ...prev };
      if (val === "" || Number.isNaN(Number(val))) {
        delete next[idItem];
        return next;
      }
      next[idItem] = Math.max(0, Math.min(100, Number(val)));
      return next;
    });
  };

  // Simpan semua draft
  const onSave = async () => {
    if (!dirtyCount) return;
    setSaving(true);
    try {
      const jobs = Object.entries(draftNilai).map(async ([sid, v]) =>
        updateItemNilai(Number(sid), v)
      );
      await Promise.all(jobs);

      setItems((prev) =>
        prev.map((x) => (draftNilai[x.id] !== undefined ? { ...x, nilai: draftNilai[x.id] } : x))
      );
      setDraftNilai({});
      await showSuccess("Perubahan disimpan.");
    } catch (e) {
      await showError(e, "Sebagian perubahan gagal disimpan.");
    } finally {
      setSaving(false);
    }
  };

  // Simpan hanya satu item (inline button)
  const onSaveSingle = async (idItem: number) => {
    const v = draftNilai[idItem];
    if (typeof v !== "number") return;
    try {
      await updateItemNilai(idItem, v);
      setItems((prev) => prev.map((x) => (x.id === idItem ? { ...x, nilai: v } : x)));
      setDraftNilai((d) => {
        const n = { ...d };
        delete n[idItem];
        return n;
      });
      await showSuccess("Nilai tersimpan.");
    } catch (e) {
      await showError(e, "Gagal menyimpan nilai.");
    }
  };

  const onSync = async () => {
    const ok = await confirm(
      "Sinkronisasi deadline sekarang?\nIni akan menyalin template deadline dari master matkul."
    );
    if (!ok) return;
    try {
      const affected = await syncEnrollmentDeadlines(enrollId);
      await showSuccess("Sinkronisasi berhasil", `${affected} item terisi deadline.`);
      await load();
    } catch (e) {
      await showError(e, "Gagal sinkronisasi deadline.");
    }
  };

  /* ====== Render ====== */

  if (state === "loading") {
    return (
      <div className="space-y-6">
        <EnrollmentHeader
          courseName={courseName}
          progressPct={progressPct}
          onBack={() => router.push("/enrollments")}
          onSync={onSync}
          onSave={onSave}
          saving={saving}
          dirtyCount={dirtyCount}
        />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-white/10 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (state === "idle") {
    return (
      <div className="space-y-6">
        <EnrollmentHeader
          courseName={courseName}
          progressPct={progressPct}
          onBack={() => router.push("/enrollments")}
          onSync={onSync}
          onSave={onSave}
          saving={saving}
          dirtyCount={dirtyCount}
        />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-white/80">Tidak dapat memuat data.</div>
        </div>
      </div>
    );
  }

  const order = ["ABSEN", "DISKUSI", "TUGAS", "QUIZ", ...Object.keys(grouped).filter((k) =>
    !["ABSEN", "DISKUSI", "TUGAS", "QUIZ"].includes(k)
  )];

  return (
    <div className="space-y-6">
      <EnrollmentHeader
        courseName={courseName}
        progressPct={progressPct}
        onBack={() => router.push("/enrollments")}
        onSync={onSync}
        onSave={onSave}
        saving={saving}
        dirtyCount={dirtyCount}
      />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-white/75">Belum ada item. Coba sinkron deadline.</div>
        ) : (
          <div className="space-y-3">
        {order.map((jenis) => {
        const list = grouped[jenis];
        if (!list) return null;
        return (
            <SectionBlock
            key={jenis}
            title={jenis}
            defaultOpen={false}   // ⬅️ tertutup secara default
            count={list.length}
            >
            <div className="space-y-2">
                {list.map((it) => (
                <ItemRow
                    key={it.id}
                    item={it}
                    valueDraft={draftNilai[it.id]}
                    onToggle={() => void toggleStatus(it)}
                    onChangeNilai={(v) => setNilaiDraft(it.id, v)}
                    onSaveDraft={
                    draftNilai[it.id] !== undefined
                        ? () => void onSaveSingle(it.id)
                        : undefined
                    }
                />
                ))}
            </div>
            </SectionBlock>
        );
        })}
          </div>
        )}
      </div>

      <div className="text-right">
        <Link
          href="/enrollments"
          className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline text-white/80"
        >
          ← Kembali ke daftar matkul
        </Link>
      </div>
    </div>
  );
}
