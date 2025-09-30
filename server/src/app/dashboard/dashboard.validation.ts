import z, { ZodType } from "zod"
import { SummaryQuery, TopRiskQuery } from "./dashboard.model"

export class DashboardValidation {
  static readonly SUMMARY_QUERY: ZodType<SummaryQuery> = z.object({
    dueWithinDays: z.coerce.number().int().min(1).max(60).default(3),
  })

  static readonly TOP_RISK_QUERY: ZodType<TopRiskQuery> = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(10),
    minEnrollments: z.coerce.number().int().min(0).max(50).optional(),
  })
}
