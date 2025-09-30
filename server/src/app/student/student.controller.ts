import { type Request, type Response, type NextFunction } from 'express'
import { Validation } from '../../middleware/validation'
import { ResponseHandler } from '../../utils/response-handler'
import { StudentService } from './student.service'
import { ADMIN_CREATE, ADMIN_UPDATE, EXISTS, LIST_QUERY, LOGIN, PARAMS_ID, REGISTER, UPDATE_ME } from './student.validation'

export class StudentController {
  // PUBLIC
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(REGISTER, req.body)
      const { data, token } = await StudentService.register(body, true)
      return ResponseHandler.created(res, { data, token }, 'Account created')
    } catch (err) { next(err) }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(LOGIN, req.body)
      const { data, token } = await StudentService.login(body)
      return ResponseHandler.success(res, { data, token }, 'Login success')
    } catch (err) { next(err) }
  }

  // STUDENT (JWT)
  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const result = await StudentService.getMe(sid)
      return ResponseHandler.success(res, result)
    } catch (err) { next(err) }
  }

  static async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const sid = Number((req as any).user?.id)
      const body = await Validation.validate(UPDATE_ME, req.body)
      const result = await StudentService.updateMe(sid, body)
      return ResponseHandler.success(res, result, 'Profil diperbarui')
    } catch (err) { next(err) }
  }

  // ADMIN
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await Validation.validate(LIST_QUERY, req.query)
      const { data, page, limit, total } = await StudentService.list(query)
      return ResponseHandler.paginated(res, data, { page, limit, total })
      // atau:
      // return ResponseHandler.success(res, { data, page, limit, total })
    } catch (err) { next(err) }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(ADMIN_CREATE, req.body)
      const result = await StudentService.create(body)
      return ResponseHandler.created(res, result, 'Student created')
    } catch (err) { next(err) }
  }

  static async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const params = await Validation.validate(PARAMS_ID, req.params as any)
      const result = await StudentService.detail(params)
      return ResponseHandler.success(res, result)
    } catch (err) { next(err) }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const params = await Validation.validate(PARAMS_ID, req.params as any)
      const body = await Validation.validate(ADMIN_UPDATE, req.body)
      const result = await StudentService.update(params, body)
      return ResponseHandler.success(res, result, 'Student updated')
    } catch (err) { next(err) }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const params = await Validation.validate(PARAMS_ID, req.params as any)
      await StudentService.remove(params)
      return ResponseHandler.success(res, { deleted: true }, 'Student deleted')
    } catch (err) { next(err) }
  }

  static async exists(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await Validation.validate(EXISTS, req.body)
      const result = await StudentService.exists(body)
      return ResponseHandler.success(res, result)
    } catch (err) { next(err) }
  }

}
