/*
  Warnings:

  - You are about to drop the `CourseDeadline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterDeadline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CourseDeadline` DROP FOREIGN KEY `CourseDeadline_courseId_fkey`;

-- DropTable
DROP TABLE `CourseDeadline`;

-- DropTable
DROP TABLE `MasterDeadline`;
