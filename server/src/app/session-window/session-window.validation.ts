import z, { ZodType } from "zod"
import { JenisTugas } from "@prisma/client"
import { PutSessionWindowsBody } from "./session-window.model"

/** aturan sesi per jenis */
function sesiValid(jenis: JenisTugas, sesi: number): boolean {
  if (jenis === "DISKUSI" || jenis === "ABSEN") return sesi >= 1 && sesi <= 8
  if (jenis === "TUGAS") return [3, 5, 7].includes(sesi)
  if (jenis === "QUIZ") return sesi >= 1
  return false
}

/** koersi tanggal (string/number/Date -> Date) */
const AS_DATE = z.preprocess((v) => {
  if (v instanceof Date) return v
  const d = new Date(String(v ?? ""))
  return isNaN(d.getTime()) ? undefined : d
}, z.date())

const ITEM = z.object({
  sesi: z.coerce.number().int().positive(),
  jenis: z.nativeEnum(JenisTugas),
  startAt: AS_DATE,
  endAt: AS_DATE
}).superRefine((v, ctx) => {
  if (!sesiValid(v.jenis, v.sesi)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Sesi tidak valid untuk ${v.jenis}` })
  }
  if (v.startAt.getTime() >= v.endAt.getTime()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["endAt"], message: "endAt harus > startAt" })
  }
})

export const PUT_SESSION_WINDOWS_BODY: ZodType<PutSessionWindowsBody> = z.object({
  items: z.array(ITEM).min(1, "Minimal 1 window")
})
