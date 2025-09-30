import type { Student } from "@prisma/client"
import type { Request as ExpressRequest } from "express"

/** DTO aman untuk dikirim ke client */
export type StudentPublic = Pick<
  Student,
  "id" | "nim" | "noHp" | "nama" | "createdAt" | "updatedAt"
>

/** Mapper Prisma -> DTO publik */
export function toStudentPublic(s: Student): StudentPublic {
  const { id, nim, noHp, nama, createdAt, updatedAt } = s
  return { id, nim, noHp, nama, createdAt, updatedAt }
}

/** Alias Request Express dengan generics, seperti gaya di project lainmu */
export type ERequest<P = any, ResB = any, ReqB = any, ReqQ = any> =
  ExpressRequest<P, ResB, ReqB, ReqQ>

/** Params */
export type IdParam = { id: string }

/** Query untuk list admin (raw dari URL, masih string) */
export type StudentListQueryRaw = {
  q?: string
  nim?: string
  noHp?: string
  courseId?: string
  sort?: "createdAt:asc" | "createdAt:desc" | "nama:asc" | "nama:desc"
  page?: string
  limit?: string
}

/** Body */
export type RegisterStudentBody = {
  nim: string
  noHp: string
  nama: string
}

export type LoginStudentBody = {
  nim?: string
  noHp?: string
}

export type UpdateMeBody = {
  nama?: string
  noHp?: string
}

export type AdminCreateStudentBody = RegisterStudentBody

export type AdminUpdateStudentBody = Partial<RegisterStudentBody>
