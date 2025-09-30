import z, { ZodType } from "zod"
import { JenisTugas, ReminderStatus } from "@prisma/client"
import { GenerateDueBody, ReminderListQuery } from "./reminder.model"

export class ReminderValidation {
  static readonly LIST_QUERY: ZodType<ReminderListQuery> = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    status: z.nativeEnum(ReminderStatus).optional(), // default PENDING (service)
    dueWithinMin: z.coerce.number().int().min(1).max(60 * 24 * 30).optional(), // max 30 hari
    courseId: z.coerce.number().int().positive().optional(),
    studentId: z.coerce.number().int().positive().optional(),
    jenis: z.nativeEnum(JenisTugas).optional(),
  })

  static readonly PARAMS_ID = z.object({
    id: z.coerce.number().int().positive(),
  })

  static readonly GENERATE_DUE: ZodType<GenerateDueBody> = z.object({
    defaultOffsetMin: z.coerce.number().int().min(1).max(60 * 24 * 7).optional(), // sampai 7 hari
    horizonDays: z.coerce.number().int().min(1).max(60).optional(),               // 1..60 hari
  })
}
