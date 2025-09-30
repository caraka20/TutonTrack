-- AlterTable
ALTER TABLE `Reminder` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `offsetMin` INTEGER NULL DEFAULT 1440;

-- CreateTable
CREATE TABLE `CourseDeadline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `jenis` ENUM('DISKUSI', 'ABSEN', 'TUGAS', 'QUIZ') NOT NULL,
    `sesi` INTEGER NOT NULL,
    `deadlineAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CourseDeadline_courseId_idx`(`courseId`),
    INDEX `CourseDeadline_deadlineAt_idx`(`deadlineAt`),
    UNIQUE INDEX `CourseDeadline_courseId_jenis_sesi_key`(`courseId`, `jenis`, `sesi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CourseDeadline` ADD CONSTRAINT `CourseDeadline_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
