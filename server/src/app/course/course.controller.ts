// server/src/app/course/course.controller.ts
import type { Request, Response, NextFunction } from "express";
import { Validation } from "../../middleware/validation";
import { ResponseHandler } from "../../utils/response-handler";
import { CourseService } from "./course.service";
import {
  COURSE_SUGGEST_QUERY,
  COURSE_LIST_QUERY,
  PARAMS_ID,
  CREATE_COURSE,
  UPDATE_COURSE,
  PUT_DEADLINES_BODY,
} from "./course.validation";
import type { CourseListQuery, PutDeadlinesBody } from "./course.model";

export class CourseController {
  // GET /api/courses/suggest (public)
  static async suggest(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, limit } = Validation.validate(COURSE_SUGGEST_QUERY, req.query as any);
      const items = await CourseService.suggest(q, limit);
      return ResponseHandler.success(res, items);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/courses (admin)
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = Validation.validate(COURSE_LIST_QUERY, req.query as any) as CourseListQuery;
      const { items, total } = await CourseService.list(query);
      return ResponseHandler.paginated(res, items, {
        page: query.page,
        limit: query.limit,
        total,
      });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/courses/:id (admin)
  static async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = Validation.validate(PARAMS_ID, req.params as any);
      const data = await CourseService.detail(id);
      return ResponseHandler.success(res, data);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/courses (student allowed)
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = Validation.validate(CREATE_COURSE, req.body as any);
      const data = await CourseService.create(body);
      return ResponseHandler.created(res, data, "Course created");
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/courses/:id (admin)
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = Validation.validate(PARAMS_ID, req.params as any);
      const body = Validation.validate(UPDATE_COURSE, req.body as any);
      const data = await CourseService.update(id, body);
      return ResponseHandler.success(res, data, "Course updated");
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/courses/:id (admin)
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = Validation.validate(PARAMS_ID, req.params as any);
      const force = String(req.query.force ?? "") === "1";
      const data = await CourseService.remove(id, force);
      return ResponseHandler.success(res, data, force ? "Course force-deleted" : "Course deleted");
    } catch (err) {
      next(err);
    }
  }

  // PUT /api/courses/:id/deadlines (admin)
  static async putDeadlines(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: courseId } = Validation.validate(PARAMS_ID, req.params as any);
      // pastikan generics → koersi deadlineAt: string → Date
      const body = Validation.validate<PutDeadlinesBody>(PUT_DEADLINES_BODY, req.body as any);
      const data = await CourseService.putDeadlines(courseId, body);
      return ResponseHandler.success(res, data, "Deadlines saved");
    } catch (err) {
      next(err);
    }
  }

  // GET /api/courses/:id/deadlines (admin)
  static async getDeadlines(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: courseId } = Validation.validate(PARAMS_ID, req.params as any);
      const items = await CourseService.getDeadlines(courseId);
      return ResponseHandler.success(res, { items });
    } catch (err) {
      next(err);
    }
  }

  // POST /api/courses/:id/deadlines/apply (admin)
  static async applyDeadlines(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: courseId } = Validation.validate(PARAMS_ID, req.params as any);
      const data = await CourseService.applyDeadlines(courseId);
      return ResponseHandler.success(res, data, "Deadlines applied");
    } catch (err) {
      next(err);
    }
  }
}
