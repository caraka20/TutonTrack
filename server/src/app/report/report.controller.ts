// server/src/app/report/report.controller.ts
import { type Request, type Response, type NextFunction } from "express"
import { Validation } from "../../middleware/validation"
import { ResponseHandler } from "../../utils/response-handler"
import { ReportService } from "./report.service"
import { ReportValidation } from "./report.validation"

export class ReportController {
  // GET /api/admin/reports/overdue
  static async overdue(req: Request, res: Response, next: NextFunction) {
    try {
      const q = await Validation.validate(ReportValidation.OVERDUE_QUERY, req.query as any)
      const data = await ReportService.overdue(q)
      return ResponseHandler.success(res, data)
    } catch (err) { next(err) }
  }

  // GET /api/admin/reports/export.csv
  static async exportCsv(req: Request, res: Response, next: NextFunction) {
    try {
      const q = await Validation.validate(ReportValidation.EXPORT_QUERY, req.query as any)
      const csv = await ReportService.exportCsv(q.courseId)

      res.setHeader("Content-Type", "text/csv; charset=utf-8")
      res.setHeader("Content-Disposition", 'attachment; filename="export.csv"')
      return res.status(200).send(csv)
    } catch (err) { next(err) }
  }
}
