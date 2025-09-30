// server/src/app/progress/progress.controller.ts
import { type Request, type Response, type NextFunction } from "express"
import { Validation } from "../../middleware/validation"
import { ResponseHandler } from "../../utils/response-handler"
import {
  ADMIN_ENROLLMENTS_QUERY,
  ADMIN_STUDENT_PROGRESS_PARAMS,
  ADMIN_STUDENT_PROGRESS_QUERY,
  ME_PROGRESS_QUERY,
} from "./progress.validation"
import { ProgressService } from "./progress.service"

export class ProgressController {
  // GET /api/me/progress
  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { days } = await Validation.validate(ME_PROGRESS_QUERY, req.query)
      const data = await ProgressService.me(sid, days)
      return ResponseHandler.success(res, data)
    } catch (err) {
      next(err)
    }
  }

  // GET /api/admin/students/:sid/progress
  static async student(req: Request, res: Response, next: NextFunction) {
    try {
      const { sid } = await Validation.validate(ADMIN_STUDENT_PROGRESS_PARAMS, req.params)
      const { days } = await Validation.validate(ADMIN_STUDENT_PROGRESS_QUERY, req.query)
      const data = await ProgressService.student(sid, days)
      return ResponseHandler.success(res, data)
    } catch (err) {
      next(err)
    }
  }

  // GET /api/admin/enrollments
  static async adminEnrollments(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await Validation.validate(ADMIN_ENROLLMENTS_QUERY, req.query)
      const { items, total } = await ProgressService.adminEnrollmentsList(query)
      return ResponseHandler.success(res, { items, total })
    } catch (err) {
      next(err)
    }
  }
}
