// server/src/app/course/course.validation.ts
import z, { ZodType } from "zod";
import { JenisTugas } from "@prisma/client";

import type {
  CourseListQuery,
  CreateCourseBody,
  UpdateCourseBody,
  PutDeadlinesBody,
} from "./course.model";

/** ====== Query: /api/courses/suggest ====== */
export const COURSE_SUGGEST_QUERY = z.object({
  q: z.string().trim().min(1, "q minimal 1 karakter"),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

/** ====== Query: /api/courses (admin) ====== */
export const COURSE_LIST_QUERY: ZodType<CourseListQuery> = z.object({
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(["nama", "createdAt"]).default("createdAt"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
});

/** ====== Params :id ====== */
export const PARAMS_ID = z.object({
  id: z.coerce.number().int().positive(),
});

/** ====== Body: POST /api/courses ====== */
export const CREATE_COURSE: ZodType<CreateCourseBody> = z.object({
  nama: z.string().trim().min(2).max(120),
});

/** ====== Body: PATCH /api/courses/:id ====== */
export const UPDATE_COURSE: ZodType<UpdateCourseBody> = z
  .object({
    nama: z.string().trim().min(2).max(120).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, {
    message: "Tidak ada field yang diubah",
  });

/** helper: koersi deadlineAt → Date|null (tanpa undefined) */
const DEADLINE_AT = z.preprocess((v) => {
  if (v === undefined || v === null || v === "") return null;
  if (v instanceof Date) return v;
  if (typeof v === "string" || typeof v === "number") {
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}, z.date().nullable());

/** ====== Body: PUT /api/courses/:courseId/deadlines ====== */
export const PUT_DEADLINES_BODY: ZodType<PutDeadlinesBody> = z.object({
  items: z
    .array(
      z.object({
        jenis: z.nativeEnum(JenisTugas),
        sesi: z.coerce.number().int().min(1),
        deadlineAt: DEADLINE_AT, // -> hasil akhir: Date | null (tanpa undefined)
      })
    )
    .min(1, "Minimal 1 item"),
});
