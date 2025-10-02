"use client";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export function getErrorMessage(e: unknown, fallback = "Terjadi kesalahan") {
  if (typeof e === "string") return e;
  if (e && typeof e === "object") {
    const m = (e as { message?: unknown }).message;
    if (typeof m === "string" && m.trim()) return m;
  }
  return fallback;
}

export async function showSuccess(title: string, text?: string) {
  await Swal.fire({ icon: "success", title, text, confirmButtonText: "OK" });
}

export async function showError(e: unknown, fallback?: string) {
  await Swal.fire({
    icon: "error",
    title: "Gagal",
    text: getErrorMessage(e, fallback ?? "Operasi gagal. Coba lagi."),
    confirmButtonText: "OK",
  });
}

export async function confirm(text: string, title = "Yakin?") {
  const res = await Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
  return res.isConfirmed;
}
