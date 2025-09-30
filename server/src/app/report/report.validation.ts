// server/src/app/report/report.validation.ts
import z, { ZodType } from "zod"
import { OverdueQuery, ExportCsvQuery } from "./report.model"

export class ReportValidation {
  static readonly OVERDUE_QUERY: ZodType<OverdueQuery> = z.object({
    courseId: z.coerce.number().int().positive().optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sortDir: z.enum(["asc", "desc"]).default("asc"),
  })

  static readonly EXPORT_QUERY: ZodType<ExportCsvQuery> = z.object({
    courseId: z.coerce.number().int().positive().optional(),
  })
}
