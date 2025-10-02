import { JenisTugas } from "@prisma/client"

export type SessionWindowItem = {
  sesi: number
  jenis: JenisTugas
  startAt: Date
  endAt: Date
}

export type PutSessionWindowsBody = {
  items: SessionWindowItem[]
}
