import type { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt" 
import { prismaClient } from "../config/database"

function bearer(req: Request) {
  const h = req.headers.authorization || ""
  return h.startsWith("Bearer ") ? h.slice(7) : null
}

export async function requireStudentAuth(req: Request, res: Response, next: NextFunction) {
  const token = bearer(req)
  if (!token) return res.status(401).json({ ok: false, error: { message: "Unauthorized" } })
  const payload = verifyToken(token)
  if (!payload) return res.status(401).json({ ok: false, error: { message: "Invalid token" } })

  // payload.username = nim
  const s = await prismaClient.student.findUnique({ where: { nim: payload.username } })
  if (!s) return res.status(401).json({ ok: false, error: { message: "Invalid token" } })

  ;(req as any).user = { id: s.id, nim: s.nim }  // tanpa UserRequest type
  next()
}
