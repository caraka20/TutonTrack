import { type Response, type NextFunction } from "express"
import { type Request } from "express-serve-static-core"
import { ResponseHandler } from "../../utils/response-handler"
import { Validation } from "../../middleware/validation"
import { ReminderService } from "./reminder.service"
import { ReminderValidation } from "./reminder.validation"

/** NOTE: req.admin & req.user sudah ditambah di deklarasi global kamu */
export class ReminderController {
  // GET /api/admin/reminders
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      // hanya OWNER/ADMIN (middleware sudah jaga), di sini langsung validasi query
      const q = await Validation.validate(ReminderValidation.LIST_QUERY, req.query)
      const data = await ReminderService.list(q)
      return ResponseHandler.success(res, data)
    } catch (err) { next(err) }
  }

  // POST /api/admin/reminders/:id/send
  static async send(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await Validation.validate(ReminderValidation.PARAMS_ID, req.params as any)
      const adminId = req.admin?.id // pakai deklarasi kamu
      const data = await ReminderService.send(id, adminId)
      return ResponseHandler.success(res, data, "Reminder sent")
    } catch (err) { next(err) }
  }

  // POST /api/admin/reminders/generate-due
  static async generateDue(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(ReminderValidation.GENERATE_DUE, req.body)
      const data = await ReminderService.generateDue(body)
      return ResponseHandler.success(res, data, "Pending reminders generated")
    } catch (err) { next(err) }
  }
}
