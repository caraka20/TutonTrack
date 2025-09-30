// server/src/app/admin/admin.controller.ts
import { type Request, type Response, type NextFunction } from "express"
import { Validation } from "../../middleware/validation"
import { ResponseHandler } from "../../utils/response-handler"
import { AdminDeadlineValidation, AdminValidation } from "./admin.validation"
import { AdminService } from "./admin.service"

export class AdminController {
  // POST /api/admin/login
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(AdminValidation.LOGIN, req.body)
      const data = await AdminService.login(body.username, body.password)
      return ResponseHandler.success(res, data, "Admin logged in")
    } catch (err) { next(err) }
  }

  static async apply(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(AdminDeadlineValidation.APPLY, req.body)
      const data = await AdminService.apply(body)
      return ResponseHandler.success(res, data, "Deadlines applied")
    } catch (err) { next(err) }
  }

  // POST /api/admin/deadlines/shift
  static async shift(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(AdminDeadlineValidation.SHIFT, req.body)
      const data = await AdminService.shift(body)
      return ResponseHandler.success(res, data, "Deadlines shifted")
    } catch (err) { next(err) }
  }

}
