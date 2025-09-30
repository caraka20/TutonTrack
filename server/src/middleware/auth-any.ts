// server/src/middleware/auth-any.ts
import type { Request, Response, NextFunction } from "express"
import { authStudent } from "./auth-student"
import { authAdmin } from "./auth-admin"

/**
 * Menerima token student ATAU admin.
 * - Coba validasi student dulu → next() jika sukses.
 * - Jika gagal, coba admin → next() jika sukses.
 * - Kalau dua-duanya gagal → 401.
 */
export async function authAny(req: Request, res: Response, next: NextFunction) {
  let done = false
  await new Promise<void>((resolve) => {
    authStudent(req as any, res, (err?: any) => {
      if (!err) { done = true; resolve(); return }
      resolve()
    })
  })
  if (done) return next()

  await new Promise<void>((resolve) => {
    authAdmin(req as any, res, (err?: any) => {
      if (!err) { done = true; resolve(); return }
      resolve()
    })
  })
  if (done) return next()

  res.status(401).json({ status: "error", message: "Unauthorized" })
}
