"use client";

import type { AdminCourse } from "@/services/course-admin.service";

const fmtDate = (s: string) => new Date(s).toLocaleString();

export default function CoursesTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: AdminCourse[];
  onEdit: (row: AdminCourse) => void;
  onDelete: (row: AdminCourse) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[720px] w-full text-sm">
        <thead className="text-white/70">
          <tr className="border-b border-white/10">
            <th className="text-left p-3">Nama Course</th>
            <th className="text-left p-3">Total Deadlines</th>
            <th className="text-left p-3">Dibuat</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id} className="border-b border-white/5">
              <td className="p-3 font-medium">{c.nama}</td>
              <td className="p-3">{c.deadlineCount}</td>
              <td className="p-3 text-white/70">{fmtDate(c.createdAt)}</td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 hover:bg-white/[0.14]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(c)}
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
