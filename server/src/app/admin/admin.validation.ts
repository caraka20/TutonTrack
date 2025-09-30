// server/src/app/admin/admin.validation.ts
import { JenisTugas } from "@prisma/client"
import z, { ZodType } from "zod"
export class AdminValidation {
  static readonly LOGIN = z.object({
    username: z.string().trim().min(3).max(50),
    password: z.string().min(4),
  })
}

const sesiRule = (jenis?: JenisTugas, sesi?: number[]) => {
  if (!jenis || !sesi?.length) return true
  if (jenis === "DISKUSI" || jenis === "ABSEN") return sesi.every((s) => s >= 1 && s <= 8)
  if (jenis === "TUGAS") return sesi.every((s) => [3, 5, 7].includes(s))
  if (jenis === "QUIZ") return sesi.every((s) => s >= 1)
  return false
}

export type ApplyBody = {
  courseIds?: number[]
  studentIds?: number[]
  jenis?: JenisTugas
  sesi?: number[]
}

export type ShiftBody = ApplyBody & {
  days: number
  includeCompleted?: boolean
  minDate?: string | Date
  maxDate?: string | Date
}

export class AdminDeadlineValidation {
  static readonly APPLY: ZodType<ApplyBody> = z.object({
    courseIds: z.array(z.coerce.number().int().positive()).min(1).optional(),
    studentIds: z.array(z.coerce.number().int().positive()).min(1).optional(),
    jenis: z.nativeEnum(JenisTugas).optional(),
    sesi: z.array(z.coerce.number().int().positive()).min(1).optional(),
  }).superRefine((v, ctx) => {
    if (!v.courseIds && !v.studentIds && !v.jenis && !v.sesi) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Minimal satu filter harus diisi (courseIds / studentIds / jenis / sesi)" })
    }
    if (!sesiRule(v.jenis, v.sesi)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["sesi"], message: "Sesi tidak valid untuk jenis yang dipilih" })
    }
  })

  static readonly SHIFT: ZodType<ShiftBody> = z.object({
    days: z.coerce.number().int().min(-30).max(30), // batas aman
    includeCompleted: z.boolean().optional(),
    courseIds: z.array(z.coerce.number().int().positive()).min(1).optional(),
    studentIds: z.array(z.coerce.number().int().positive()).min(1).optional(),
    jenis: z.nativeEnum(JenisTugas).optional(),
    sesi: z.array(z.coerce.number().int().positive()).min(1).optional(),
    minDate: z.coerce.date().optional(),
    maxDate: z.coerce.date().optional(),
  }).superRefine((v, ctx) => {
    if (!v.courseIds && !v.studentIds && !v.jenis && !v.sesi && !v.minDate && !v.maxDate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Hindari shift global: isi salah satu filter (courseIds/studentIds/jenis/sesi/minDate/maxDate)" })
    }
    if (!sesiRule(v.jenis, v.sesi)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["sesi"], message: "Sesi tidak valid untuk jenis yang dipilih" })
    }
  })
}