import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { prismaClient } from '../config/database'

const bearer = (req: Request) => {
  const h = req.headers.authorization || ''
  return h.startsWith('Bearer ') ? h.slice(7) : null
}

/** Auth ADMIN: payload { username } → lookup Admin + role */
export async function authAdmin(req: Request, res: Response, next: NextFunction) {
  const token = bearer(req)
  if (!token) return res.status(401).json({ status: 'error', message: 'Unauthorized' })

  const payload = verifyToken(token) // { username }
  if (!payload?.username) {
    return res.status(401).json({ status: 'error', message: 'Invalid token' })
  }

  const admin = await prismaClient.admin.findUnique({ where: { username: payload.username } })
  if (!admin || !admin.isActive) {
    return res.status(401).json({ status: 'error', message: 'Invalid token' })
  }

  req.admin = { id: admin.id, username: admin.username, role: admin.role as 'OWNER' | 'ADMIN' }
  next()
}
