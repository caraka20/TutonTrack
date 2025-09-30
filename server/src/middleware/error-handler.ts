// src/middleware/error-handler.ts
import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { errorResponse } from '../utils/api-response'
import { AppError } from './app-error'
import { Prisma } from '@prisma/client'

// helper kecil: duck-typing RepoError (punya status number & message string)
function isRepoError(e: unknown): e is { status?: number; message: string; details?: any } {
  return !!e && typeof (e as any).message === 'string' && typeof (e as any).status === 'number'
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // 1) Zod validation error
  if (err instanceof ZodError) {
    const formatted = err.issues.map(e => ({
      field: e.path?.join('.') || '(unknown)',
      message: e.message,
    }))
    return errorResponse(res, 'Validation failed', 400, 'VALIDATION_ERROR', formatted)
  }

  // 2) RepoError (atau error dari repository yang bawa status)
  if (isRepoError(err)) {
    const status = err.status ?? 400
    const code =
      status === 401 ? 'UNAUTHORIZED' :
      status === 403 ? 'FORBIDDEN' :
      status === 404 ? 'NOT_FOUND' :
      status >= 500 ? 'INTERNAL_SERVER_ERROR' :
      'BAD_REQUEST'
    return errorResponse(
      res,
      err.message,
      status,
      code as 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST',
      err.details // boleh undefined
    )
  }

  // 3) Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      // unique constraint violated
      return errorResponse(res, 'Unique constraint violated', 409, 'BAD_REQUEST', {
        target: (err.meta as any)?.target,
      })
    }
    if (err.code === 'P2025') {
      // record not found
      return errorResponse(res, 'Record not found', 404, 'NOT_FOUND')
    }
    // fallback prisma → bad request
    return errorResponse(res, `Database error (${err.code})`, 400, 'BAD_REQUEST')
  }

  // 4) Custom AppError (punyamu)
  if (err instanceof AppError) {
    return errorResponse(
      res,
      err.message,
      err.statusCode || 500,
      (err.code as any) || 'INTERNAL_SERVER_ERROR',
      (err as any).details
    )
  }

  // 5) Generic JS Error
  if (err instanceof Error) {
    return errorResponse(res, err.message || 'Unexpected error', 500, 'INTERNAL_SERVER_ERROR')
  }

  // 6) Unknown
  return errorResponse(res, 'Unknown error', 500, 'INTERNAL_SERVER_ERROR')
}
