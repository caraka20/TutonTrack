import type { Request, Response, NextFunction } from 'express'

export function requireAdminRole(...roles: Array<'OWNER' | 'ADMIN'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.admin?.role
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ status: 'error', message: 'Forbidden' })
    }
    next()
  }
}
