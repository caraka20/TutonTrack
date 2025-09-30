import { Response } from "express"

export class ResponseHandler {
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    statusCode = 200
  ) {
    return res.status(statusCode).json({ status: "success", message, data })
  }

  static created<T>(res: Response, data: T, message = "Created") {
    return this.success(res, data, message, 201)
  }

  static paginated<T>(
    res: Response,
    data: T,
    pagination: { page: number; limit: number; total: number; totalPages?: number },
    message = "Success"
  ) {
    const totalPages =
      pagination.totalPages ??
      Math.max(1, Math.ceil(pagination.total / Math.max(1, pagination.limit)))

    return res
      .status(200)
      .json({ status: "success", message, data, pagination: { ...pagination, totalPages } })
  }

  static error(
    res: Response,
    message = "Something went wrong",
    statusCode = 500,
    code?: string,
    details?: unknown
  ) {
    return res.status(statusCode).json({
      status: "error",
      message,
      ...(code ? { code } : {}),
      ...(typeof details !== "undefined" ? { details } : {}),
    })
  }

  // ==== Helpers khusus supaya controller bersih ====
  static notFound(res: Response, message = "Not found") {
    return this.error(res, message, 404)
  }

  static badRequest(res: Response, message = "Bad request", details?: unknown) {
    return this.error(res, message, 400, "BAD_REQUEST", details)
  }

  static unauthorized(res: Response, message = "Unauthorized") {
    return this.error(res, message, 401, "UNAUTHORIZED")
  }

  static forbidden(res: Response, message = "Forbidden") {
    return this.error(res, message, 403, "FORBIDDEN")
  }

  static deleted(res: Response, message = "Deleted") {
    // pola yang sering kamu pakai: { deleted: true }
    return this.success(res, { deleted: true } as any, message, 200)
  }
}
