/*
  Warnings:

  - You are about to drop the column `createdAt` on the `CourseDeadline` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CourseDeadline` table. All the data in the column will be lost.
  - Made the column `offsetMin` on table `Reminder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `CourseDeadline` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `deadlineAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Reminder` MODIFY `offsetMin` INTEGER NOT NULL DEFAULT 1440;
