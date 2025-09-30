import { type Response, type NextFunction } from "express"
import { type UserRequest } from "../../types/express"
import { Validation } from "../../middleware/validation"
import { ResponseHandler } from "../../utils/response-handler"
import { DashboardService } from "./dashboard.service"
import { DashboardValidation } from "./dashboard.validation"

export class DashboardController {
  // GET /api/admin/dashboard/summary
  static async summary(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const q = await Validation.validate(DashboardValidation.SUMMARY_QUERY, req.query as any)
      const data = await DashboardService.summary(q)
      return ResponseHandler.success(res, data)
    } catch (err) { next(err) }
  }

  // GET /api/admin/dashboard/top-risk
  static async topRisk(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const q = await Validation.validate(DashboardValidation.TOP_RISK_QUERY, req.query as any)
      const data = await DashboardService.topRisk(q)
      return ResponseHandler.success(res, data)
    } catch (err) { next(err) }
  }

  // GET /api/admin/dashboard/courses/heatmap
  static async coursesHeatmap(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const data = await DashboardService.coursesHeatmap()
      return ResponseHandler.success(res, data)
    } catch (err) { next(err) }
  }
}
