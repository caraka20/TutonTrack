import type { Request, Response, NextFunction } from "express"
import { ResponseHandler } from "../../utils/response-handler"
import { Validation } from "../../middleware/validation"
import { PUT_SESSION_WINDOWS_BODY } from "./session-window.validation"
import { SessionWindowService } from "./session-window.service"

export class SessionWindowController {
  // GET /api/admin/session-windows
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await SessionWindowService.list()
      return ResponseHandler.success(res, { items })
    } catch (err) { next(err) }
  }

  // PUT /api/admin/session-windows
  static async put(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(PUT_SESSION_WINDOWS_BODY, req.body)
      const data = await SessionWindowService.put(body)
      return ResponseHandler.success(res, data, "Session windows saved")
    } catch (err) { next(err) }
  }
}
