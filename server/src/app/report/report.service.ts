// server/src/app/report/report.service.ts
import { ReportRepository } from "./report.repository"
import { OverdueQuery } from "./report.model"

export class ReportService {
  static overdue(q: OverdueQuery) {
    return ReportRepository.overdue(q)
  }
  static exportCsv(courseId?: number) {
    return ReportRepository.exportCsv(courseId)
  }
}
