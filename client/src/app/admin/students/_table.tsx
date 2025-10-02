"use client";
import { AdminStudent } from "@/services/admin.service";

const fmtDate = (s: string) => new Date(s).toLocaleString();

export default function StudentsTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: AdminStudent[];
  onEdit: (row: AdminStudent) => void;
  onDelete: (row: AdminStudent) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[860px] w-full text-sm">
        <thead className="sticky top-0 z-10 bg-white/[0.04] backdrop-blur text-white/70">
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
          {rows.map((s, i) => (
            <tr
              key={s.id}
              className={[
                "border-b border-white/5",
                i % 2 === 1 ? "bg-white/[0.02]" : "",
                "hover:bg-white/[0.06] transition"
              ].join(" ")}
            >
              <td className="p-3 font-medium">{s.nama}</td>
              <td className="p-3">{s.nim}</td>
              <td className="p-3">{s.noHp}</td>
              <td className="p-3 text-white/70">{fmtDate(s.createdAt)}</td>
              <td className="p-3 text-white/70">{fmtDate(s.updatedAt)}</td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(s)}
                    className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-1 hover:bg-white/[0.10]"
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
  );
}
