// server/src/app/enrollment/enrollment.controller.ts
import { type Request, type Response, type NextFunction } from "express"
import { Validation } from "../../middleware/validation"
import { ResponseHandler } from "../../utils/response-handler"
import {
  ADD_ENROLLMENT,
  PARAMS_ENROLL_ID,
  PARAMS_ITEM_ID,
  UPDATE_ITEM_STATUS,
  UPDATE_ITEM_NILAI,
  PUT_REMINDER,
  UPDATE_ITEM_DESC, // ⬅️ tambahkan ini
} from "./enrollment.validation"
import { EnrollmentService } from "./enrollment.service"

export class EnrollmentController {
  // POST /api/enrollments  (student self)
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const body = await Validation.validate(ADD_ENROLLMENT, req.body)
      const data = await EnrollmentService.add(sid, body)
      return ResponseHandler.created(res, { data }, "Enrollment created & items generated")
    } catch (err) {
      next(err)
    }
  }

  // GET /api/me/enrollments
  static async myEnrollments(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const data = await EnrollmentService.myEnrollments(sid)
      return ResponseHandler.success(res, { items: data })
    } catch (err) {
      next(err)
    }
  }

  // GET /api/enrollments/:enrollId/items
  static async listItems(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { enrollId } = await Validation.validate(PARAMS_ENROLL_ID, req.params)
      const items = await EnrollmentService.items(enrollId, sid)
      return ResponseHandler.success(res, { items })
    } catch (err) {
      next(err)
    }
  }

  // PATCH /api/items/:itemId/status
  static async updateItemStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { itemId } = await Validation.validate(PARAMS_ITEM_ID, req.params)
      const { status } = await Validation.validate(UPDATE_ITEM_STATUS, req.body)
      const data = await EnrollmentService.setItemStatus(itemId, sid, status)
      return ResponseHandler.success(res, { data }, "Status updated")
    } catch (err) {
      next(err)
    }
  }

  // PATCH /api/items/:itemId/nilai
  static async updateItemNilai(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { itemId } = await Validation.validate(PARAMS_ITEM_ID, req.params)
      const { nilai } = await Validation.validate(UPDATE_ITEM_NILAI, req.body)
      const data = await EnrollmentService.setItemNilai(itemId, sid, nilai)
      return ResponseHandler.success(res, { data }, "Nilai updated")
    } catch (err) {
      next(err)
    }
  }

  // PUT /api/items/:itemId/reminder
  static async putReminder(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { itemId } = await Validation.validate(PARAMS_ITEM_ID, req.params)
      const body = await Validation.validate(PUT_REMINDER, req.body)
      const data = await EnrollmentService.putReminder(itemId, sid, body)
      return ResponseHandler.success(res, { data }, "Reminder preference saved")
    } catch (err) {
      next(err)
    }
  }

  // DELETE /api/enrollments/:enrollId
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { enrollId } = await Validation.validate(PARAMS_ENROLL_ID, req.params)
      const data = await EnrollmentService.unenroll(enrollId, sid)
      return ResponseHandler.success(res, data, "Enrollment dihapus")
    } catch (err) { next(err) }
  }

  // POST /api/enrollments/:enrollId/sync-deadlines
  static async syncDeadlines(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { enrollId } = await Validation.validate(PARAMS_ENROLL_ID, req.params)
      const data = await EnrollmentService.syncDeadlines(enrollId, sid)
      return ResponseHandler.success(res, data, "Deadlines disinkronkan")
    } catch (err) { next(err) }
  }

  // GET /api/items/:itemId
  static async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { itemId } = await Validation.validate(PARAMS_ITEM_ID, req.params)
      const data = await EnrollmentService.getItem(itemId, sid)
      return ResponseHandler.success(res, { data })
    } catch (err) { next(err) }
  }

  // PATCH /api/items/:itemId/desc
  static async updateItemDesc(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const { itemId } = await Validation.validate(PARAMS_ITEM_ID, req.params)
      const { deskripsi } = await Validation.validate(UPDATE_ITEM_DESC, req.body)
      const data = await EnrollmentService.setItemDesc(itemId, sid, deskripsi)
      return ResponseHandler.success(res, { data }, "Deskripsi diperbarui")
    } catch (err) { next(err) }
  }
}
