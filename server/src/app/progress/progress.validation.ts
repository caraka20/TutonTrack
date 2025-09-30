// server/src/app/progress/progress.validation.ts
import z, { ZodType } from "zod"

export const ME_PROGRESS_QUERY = z.object({
  days: z.coerce.number().int().min(1).max(30).default(3),
})

export const ADMIN_STUDENT_PROGRESS_PARAMS = z.object({
  sid: z.coerce.number().int().positive(),
})
export const ADMIN_STUDENT_PROGRESS_QUERY = ME_PROGRESS_QUERY

export type AdminEnrollmentsQuery = {
  page: number
  limit: number
  courseId?: number
  q?: string
  minPct?: number
  maxPct?: number
  overdueOnly?: boolean
}

export const ADMIN_ENROLLMENTS_QUERY: ZodType<AdminEnrollmentsQuery> = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  courseId: z.coerce.number().int().positive().optional(),
  q: z.string().trim().min(1).max(120).optional(),
  minPct: z.coerce.number().min(0).max(100).optional(),
  maxPct: z.coerce.number().min(0).max(100).optional(),
  overdueOnly: z.coerce.boolean().optional(),
})
