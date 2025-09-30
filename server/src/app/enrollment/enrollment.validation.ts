// server/src/app/enrollment/enrollment.validation.ts
import z, { ZodType } from "zod"
import {
  AddEnrollmentBody,
  ItemNilaiBody,
  ItemStatusBody,
  ReminderPrefBody,
} from "./enrollment.model"

/* ===== util: opsi quiz sesi ===== */
const QUIZ_SESI = z.array(z.number().int().min(1).max(8)).min(1).max(8).optional()

/* ===== body add enrollment ===== */
const BY_ID = z.object({
  courseId: z.coerce.number().int().positive(),
  withQuiz: z.boolean().optional(),
  quizSesi: QUIZ_SESI,
})

const BY_NAME = z.object({
  courseName: z.string().trim().min(2).max(120),
  withQuiz: z.boolean().optional(),
  quizSesi: QUIZ_SESI,
})

export const ADD_ENROLLMENT: ZodType<AddEnrollmentBody> = z.union([BY_ID, BY_NAME])

/* ===== params ===== */
export const PARAMS_ENROLL_ID = z.object({
  enrollId: z.coerce.number().int().positive(),
})

export const PARAMS_ITEM_ID = z.object({
  itemId: z.coerce.number().int().positive(),
})

/* ===== patch item status / nilai ===== */
export const UPDATE_ITEM_STATUS: ZodType<ItemStatusBody> = z.object({
  status: z.enum(["BELUM", "SELESAI"]),
})

export const UPDATE_ITEM_NILAI: ZodType<ItemNilaiBody> = z.object({
  nilai: z.number().min(0).max(100),
})

/* ===== put reminder pref ===== */
export const PUT_REMINDER: ZodType<ReminderPrefBody> = z.object({
  offsetMin: z.coerce.number().int().min(0).default(1440),
  active: z.boolean().default(true),
  note: z.string().trim().max(255).nullish(),
})

/* ===== PATCH /items/:id/desc ===== */
export const UPDATE_ITEM_DESC = z.object({
  deskripsi: z.string().trim().min(1, "Deskripsi tidak boleh kosong").max(255),
})

/* ===== helper normalisasi quiz sesi ===== */
export function normalizeQuizSesi(arr?: number[]): number[] | undefined {
  if (!arr || !arr.length) return undefined
  const set = new Set(arr.filter((n) => Number.isInteger(n) && n >= 1 && n <= 8))
  return Array.from(set).sort((a, b) => a - b)
}
