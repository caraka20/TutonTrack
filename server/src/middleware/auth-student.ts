import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { prismaClient } from '../config/database'

const bearer = (req: Request) => {
  const h = req.headers.authorization || ''
  return h.startsWith('Bearer ') ? h.slice(7) : null
}

/** Auth STUDENT: payload { username: nim } */
export async function authStudent(req: Request, res: Response, next: NextFunction) {
  const token = bearer(req)
  if (!token) return res.status(401).json({ status: 'error', message: 'Unauthorized' })

  const payload = verifyToken(token) // { username }
  if (!payload?.username) {
    return res.status(401).json({ status: 'error', message: 'Invalid token' })
  }

  const student = await prismaClient.student.findUnique({ where: { nim: payload.username } })
  if (!student) {
    return res.status(401).json({ status: 'error', message: 'Invalid token' })
  }

  req.user = { id: student.id, nim: student.nim }
  next()
}
