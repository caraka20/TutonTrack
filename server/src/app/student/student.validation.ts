import { z } from "zod"

/** Normalisasi noHp ke digit-only. '0xxxx' -> '62xxxx'. '+62...' -> '62...' */
export function normalizePhone(input: string) {
  const raw = (input || "").trim()
  const digits = raw.replace(/[^\d]/g, "")
  if (!digits) return ""
  if (digits.startsWith("62")) return digits
  if (digits.startsWith("0")) return "62" + digits.slice(1)
  return digits
}

/** Register (publik) */
export const REGISTER = z.object({
  nim: z.string().min(3, "nim too short").max(30, "nim too long"),
  noHp: z.string().min(8, "noHp too short").max(20, "noHp too long"),
  nama: z.string().min(2, "nama too short").max(100, "nama too long"),
})

/** Login (nim ATAU noHp wajib salah satu) */
export const LOGIN = z
  .object({
    nim: z.string().min(3).max(30).optional(),
    noHp: z.string().min(8).max(20).optional(),
  })
  .refine((v) => !!(v.nim || v.noHp), { message: "nim or noHp is required" })

/** Update profil diri (JWT) */
export const UPDATE_ME = z
  .object({
    nama: z.string().min(2).max(100).optional(),
    noHp: z.string().min(8).max(20).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "no updates specified" })

/** Admin create/update */
export const ADMIN_CREATE = REGISTER
export const ADMIN_UPDATE = z
  .object({
    nim: z.string().min(3).max(30).optional(),
    noHp: z.string().min(8).max(20).optional(),
    nama: z.string().min(2).max(100).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "no updates specified" })

/** Listing & filter (admin) */
export const LIST_QUERY = z.object({
  q: z.string().max(120).optional(),
  nim: z.string().min(3).max(30).optional(),
  noHp: z.string().min(8).max(20).optional(),
  courseId: z.coerce.number().int().positive().optional(),
  sort: z
    .enum(["createdAt:asc", "createdAt:desc", "nama:asc", "nama:desc"])
    .default("createdAt:desc"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

/** Params */
export const PARAMS_ID = z.object({
  id: z.coerce.number().int().positive(),
})

export const EXISTS = z.object({
  nim: z.string().min(3).max(30).optional(),
  noHp: z.string().min(8).max(20).optional(),
}).refine(v => !!(v.nim || v.noHp), { message: "nim or noHp is required" })