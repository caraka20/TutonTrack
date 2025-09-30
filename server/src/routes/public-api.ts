import { Router } from 'express'
import { StudentController } from '../app/student/student.controller'
import { authStudent } from '../middleware/auth-student'
import { authAdmin } from '../middleware/auth-admin'
import { requireAdminRole } from '../middleware/require-admin-role'
import { EnrollmentController } from '../app/enrollment/enrollment.controller'
import { authAny } from '../middleware/auth-any'
import { CourseController } from '../app/course/course.controller'
import { ProgressController } from '../app/progress/progress.controller'
import { AdminController } from '../app/admin/admin.controller'
import { ReminderController } from '../app/reminder/reminder.controller'
import { ReportController } from '../app/report/report.controller'
import { DashboardController } from '../app/dashboard/dashboard.controller'

export const route = Router()

// PUBLIC — pendaftaran & login student
route.post('/api/students/register', StudentController.register)
route.post('/api/students/login', StudentController.login)

// SELF (token student)
route.get('/api/students/me', authStudent, StudentController.me)
route.patch('/api/students/me', authStudent, StudentController.updateMe)

// ADMIN area (lihat/list/edit/hapus student)
route.get('/api/students', authAdmin, requireAdminRole('OWNER'), StudentController.list)
route.get('/api/students/:id', authAdmin, requireAdminRole('OWNER','ADMIN'), StudentController.detail)
route.patch('/api/students/:id', authAdmin, requireAdminRole('OWNER'), StudentController.update)
route.delete('/api/students/:id', authAdmin, requireAdminRole('OWNER'), StudentController.remove)

// (opsional) cek ketersediaan nim/noHp — boleh public kalau mau
route.post('/api/students/exists', StudentController.exists)


// ENROLLMENTS (student self)
route.post("/api/enrollments", authStudent, EnrollmentController.add)
route.get("/api/me/enrollments", authStudent, EnrollmentController.myEnrollments)
route.get("/api/enrollments/:enrollId/items", authStudent, EnrollmentController.listItems)
route.patch("/api/items/:itemId/status", authStudent, EnrollmentController.updateItemStatus)
route.patch("/api/items/:itemId/nilai", authStudent, EnrollmentController.updateItemNilai)
route.put("/api/items/:itemId/reminder", authStudent, EnrollmentController.putReminder)
route.delete("/api/enrollments/:enrollId", authStudent, EnrollmentController.delete)
route.post("/api/enrollments/:enrollId/sync-deadlines", authStudent, EnrollmentController.syncDeadlines)

route.get("/api/items/:itemId", authAny, EnrollmentController.getItem)
route.patch("/api/items/:itemId/desc", authAny, EnrollmentController.updateItemDesc)

// COURSES
route.get('/api/courses/suggest', CourseController.suggest)
route.get('/api/courses', authAdmin, requireAdminRole('OWNER','ADMIN'), CourseController.list)
route.get('/api/courses/:id', authAdmin, requireAdminRole('OWNER','ADMIN'), CourseController.detail)
route.post('/api/courses', authStudent, CourseController.create) // student boleh create
route.patch('/api/courses/:id', authAdmin, requireAdminRole('OWNER','ADMIN'), CourseController.update)
route.delete('/api/courses/:id', authAdmin, requireAdminRole('OWNER','ADMIN'), CourseController.remove)
route.put('/api/courses/:courseId/deadlines', authAdmin, requireAdminRole('OWNER','ADMIN'), CourseController.putDeadlines)
route.get('/api/courses/:courseId/deadlines', authAdmin, requireAdminRole('OWNER','ADMIN'), CourseController.getDeadlines)
route.post('/api/courses/:courseId/deadlines/apply', authAdmin, requireAdminRole('OWNER','ADMIN'), CourseController.applyDeadlines)

// PROGRESS & DASHBOARD
route.get('/api/me/progress', authStudent, ProgressController.me)
route.get('/api/admin/students/:sid/progress', authAdmin, requireAdminRole('OWNER','ADMIN'), ProgressController.student)
route.get('/api/admin/enrollments', authAdmin, requireAdminRole('OWNER','ADMIN'), ProgressController.adminEnrollments)

// ADMIN AUTH
route.post('/api/admin/login', AdminController.login)

route.post("/api/admin/deadlines/apply", authAdmin, requireAdminRole("OWNER","ADMIN"), AdminController.apply)
route.post("/api/admin/deadlines/shift", authAdmin, requireAdminRole("OWNER","ADMIN"), AdminController.shift)

// REMINDERS (ADMIN)
route.get("/api/admin/reminders", authAdmin, requireAdminRole("OWNER","ADMIN"), ReminderController.list)
route.post("/api/admin/reminders/:id/send", authAdmin, requireAdminRole("OWNER","ADMIN"), ReminderController.send)
route.post("/api/admin/reminders/generate-due", authAdmin, requireAdminRole("OWNER","ADMIN"), ReminderController.generateDue)


// REPORTS & EXPORT (OWNER/ADMIN)
route.get('/api/admin/reports/overdue', authAdmin, requireAdminRole('OWNER','ADMIN'), ReportController.overdue)
route.get('/api/admin/reports/export.csv', authAdmin, requireAdminRole('OWNER'), ReportController.exportCsv)

// DASHBOARD (ADMIN)
route.get("/api/admin/dashboard/summary",     authAdmin, requireAdminRole("OWNER","ADMIN"), DashboardController.summary)
route.get("/api/admin/dashboard/top-risk",    authAdmin, requireAdminRole("OWNER","ADMIN"), DashboardController.topRisk)
route.get("/api/admin/dashboard/courses/heatmap", authAdmin, requireAdminRole("OWNER","ADMIN"), DashboardController.coursesHeatmap)