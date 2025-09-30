import { JenisTugas, ReminderStatus, ReminderSource, ReminderChannel } from "@prisma/client"

/** Query untuk list reminders (ADMIN) */
export type ReminderListQuery = {
  page: number
  limit: number
  status?: ReminderStatus            // default: PENDING
  /** listkan reminder yang “akan jatuh tempo” dalam N menit ke depan */
  dueWithinMin?: number              // default: 1440 (H-1)
  courseId?: number
  studentId?: number
  jenis?: JenisTugas
}

/** Body generate reminders otomatis (ADMIN) */
export type GenerateDueBody = {
  /** default offset jika student belum set preferensi (menit) */
  defaultOffsetMin?: number          // default 1440
  /** horizon berapa hari ke depan untuk discan */
  horizonDays?: number               // default 14
}

/** Bentuk item list (kaya join-an biar ops enak baca) */
export type ReminderListItem = {
  id: number
  status: ReminderStatus
  source: ReminderSource
  channel: ReminderChannel
  note: string | null
  active: boolean
  offsetMin: number
  dueAt: Date | null                 // = deadlineAt - offsetMin (kalau ada deadline)
  itemId: number
  jenis: JenisTugas
  sesi: number
  deadlineAt: Date | null
  studentId: number
  studentNama: string
  courseId: number
  courseNama: string
  createdAt: Date
  sentAt: Date | null
}
