-- AlterTable
ALTER TABLE `TutonItem` ADD COLUMN `openAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `MasterDeadline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis` ENUM('DISKUSI', 'ABSEN', 'TUGAS', 'QUIZ') NOT NULL,
    `sesi` INTEGER NOT NULL,
    `openAt` DATETIME(3) NULL,
    `closeAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MasterDeadline_openAt_idx`(`openAt`),
    INDEX `MasterDeadline_closeAt_idx`(`closeAt`),
    UNIQUE INDEX `MasterDeadline_jenis_sesi_key`(`jenis`, `sesi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionWindow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sesi` INTEGER NOT NULL,
    `jenis` ENUM('DISKUSI', 'ABSEN', 'TUGAS', 'QUIZ') NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `SessionWindow_sesi_idx`(`sesi`),
    INDEX `SessionWindow_jenis_idx`(`jenis`),
    INDEX `SessionWindow_startAt_idx`(`startAt`),
    INDEX `SessionWindow_endAt_idx`(`endAt`),
    UNIQUE INDEX `SessionWindow_sesi_jenis_key`(`sesi`, `jenis`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `TutonItem_openAt_idx` ON `TutonItem`(`openAt`);
